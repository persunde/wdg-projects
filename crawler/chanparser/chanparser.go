package chanparser

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/persunde/wdg-projects/crawler/types"
	"github.com/pkg/errors"
	"golang.org/x/net/html"
)

var catalogListTechnologyURL = "https://a.4cdn.org/g/catalog.json"
var threadTechnologyURL = "https://a.4cdn.org/g/thread/%d.json"
var imageURL = "https://i.4cdn.org/g/%d%s"

// GetWDGProjectPosts returns a list of processed /wdg/ posts with the project content
func GetWDGProjectPosts() []types.PostResult {
	var catalogJSON []types.CatalogPageJSON
	err := FetchFourChanThreadsList(&catalogJSON)
	if err != nil {
		log.Println(err)
	}
	catalogThread, err := FindWebDevGeneralThread(catalogJSON)
	if err != nil {
		fmt.Println("error:", err)
	}
	threadID := catalogThread.No
	thread, err := FetchThreadWithReplies(threadID)

	postsWithProjectContent := ParseWdgThread(thread)

	return postsWithProjectContent
}

// FetchFourChanThreadsList gets the list of threads in the Technology board
func FetchFourChanThreadsList(target *[]types.CatalogPageJSON) error {
	myClient := &http.Client{Timeout: 10 * time.Second}
	res, err := myClient.Get(catalogListTechnologyURL)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	err = json.NewDecoder(res.Body).Decode(target)

	return err
}

// FindWebDevGeneralThread finds the current /wdg/ thread(s)
// Returns an error on failure (and an empty struct)
func FindWebDevGeneralThread(catalogJSON []types.CatalogPageJSON) (latestThread types.CatalogThreadJSON, err error) {
	foundThread := false
	for _, page := range catalogJSON {
		for _, thread := range page.Threads {
			if strings.Contains(thread.Sub, "wdg") {
				if latestThread.No < thread.No {
					latestThread = thread
					foundThread = true
				}
			}
		}
	}

	if !foundThread {
		// On failure return empty struct with error
		var empty types.CatalogThreadJSON
		customErr := errors.Errorf("Did not find any /wdg/ thread")
		return empty, customErr
	}

	return latestThread, nil
}

// FetchThreadWithReplies returns a thread with all its replies from /g/
func FetchThreadWithReplies(threadID uint) (types.ThreadJSON, error) {
	var target types.ThreadJSON
	url := fmt.Sprintf(threadTechnologyURL, threadID)
	myClient := &http.Client{Timeout: 10 * time.Second}
	res, err := myClient.Get(url)
	if err != nil {
		return target, err
	}
	defer res.Body.Close()
	err = json.NewDecoder(res.Body).Decode(&target)

	return target, nil
}

// ParseWdgThread checks if post contains the keywords to search for: country, search (keywords) and remote
// such as: country, position, tech etc.
func ParseWdgThread(thread types.ThreadJSON) []types.PostResult {
	var threadResultList []types.PostResult
	for _, post := range thread.Posts {
		postResult, err := ParsePost(post)
		if err != nil {
			//fmt.Println(err)
			continue
		}
		threadResultList = append(threadResultList, postResult)
	}
	return threadResultList
}

// ParsePost finds if the post contains a job search
func ParsePost(post types.PostJSON) (types.PostResult, error) {
	var postResult types.PostResult
	postResult.PostNo = post.No
	foundTitle := false
	commentList := parseHTMLText(post.Com) // TODO: parseHTMLText() splits on <wbr> (Word Break Opportunity), it should not split. Ignore and remove the tag
	for _, line := range commentList {
		re := regexp.MustCompile("::(.*?)::")
		match := re.FindStringSubmatch(line) // If no match, it returns an empty list
		if len(match) > 0 {
			postResult.Title = strings.TrimSpace(match[1])
			foundTitle = true
		}
		if strings.Contains(line, "dev::") {
			devArr := strings.Split(line, "dev::")
			if len(devArr) > 1 {
				postResult.Dev = strings.TrimSpace(devArr[1])
			}
		}
		if strings.Contains(line, "link::") {
			linkArr := strings.Split(line, "link::")
			if len(linkArr) > 1 {
				postResult.Link = strings.TrimSpace(linkArr[1])
			}
		}
		if strings.Contains(line, "tools::") {
			toolsArr := strings.Split(line, "tools::")
			if len(toolsArr) > 1 {
				postResult.Tools = strings.TrimSpace(toolsArr[1])
			}
		}
		if strings.Contains(line, "progress::") {
			progressArr := strings.Split(line, "progress::")
			if len(progressArr) > 1 {
				postResult.Progress = progressArr[1]
			}
		}
		if strings.Contains(line, "repo::") {
			repoArr := strings.Split(line, "repo::")
			if len(repoArr) > 1 {
				postResult.Repo = strings.TrimSpace(repoArr[1])
			}
		}
	}

	if !foundTitle {
		customErr := errors.Errorf("Post must have a Title. No title found!")
		return postResult, customErr
	}

	if post.ImageID > 0 {
		imageBase64, err := getImageAsBase64(post.ImageID, post.ImageExtention)
		if err != nil {
			fmt.Println("Promlem with getting the image for PostNo:", post.No)
			fmt.Println(err)
		} else {
			postResult.Image = imageBase64
		}
	}

	return postResult, nil
}

// parseHTMLText parses HTML as a string and returns the text inside the html tags as a list of strings
func parseHTMLText(htmlString string) []string {
	lines := []string{}
	domDocTest := html.NewTokenizer(strings.NewReader(htmlString))
	for tokenType := domDocTest.Next(); tokenType != html.ErrorToken; {
		// TODO: need to check if this token is of type <wbr>, if so then it should be handled as a TextToken
		// this should fix this issue: https://github.com/persunde/wdg-projects/issues/18
		if tokenType != html.TextToken {
			tokenType = domDocTest.Next()
			continue
		}
		TxtContent := strings.TrimSpace(html.UnescapeString(string(domDocTest.Text())))
		if len(TxtContent) > 0 {

			lines = append(lines, TxtContent)
		}
		tokenType = domDocTest.Next()
	}

	return lines
}

func getImageAsBase64(imageID uint, imageExtention string) (string, error) {
	content, err := getImageSource(imageID, imageExtention)
	if err != nil {
		return "", err
	}

	return base64.StdEncoding.EncodeToString(content), nil
}

func getImageSource(imageID uint, imageExtention string) ([]byte, error) {
	// https://i.4cdn.org/[board]/[4chan image ID].[file extension]
	url := fmt.Sprintf(imageURL, imageID, imageExtention)
	myClient := &http.Client{Timeout: 10 * time.Second}
	res, err := myClient.Get(url)
	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	imageSource, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	return imageSource, nil
}
