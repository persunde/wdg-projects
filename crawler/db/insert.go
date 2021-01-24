package db

import (
	"log"

	"github.com/persunde/wdg-projects/crawler/db/model"
	"github.com/persunde/wdg-projects/crawler/types"
)

// InsertProjectPost inserts into the database that this post has now been replied to
func InsertProjectPost(post types.PostResult) error {
	db, err := Connect()
	if err != nil {
		log.Println(err)
		return err
	}

	projectID, err := GetProjectID(post.Title)
	if err != nil {
		return err
	}

	// Create a new Project Row if project does NOT already exist
	if projectID == 0 {
		projectID, err = InsertProject(post)
		if err != nil {
			return err
		}
	} else {
		// TODO update the project row if the title, dev, tools, link or repo is changed!
	}

	projectPost := model.ProjectPost{
		ID:        post.PostNo,
		ProjectID: projectID,
		Progress:  post.Progress,
		PostNo:    post.PostNo,
		Image:     post.Image,
	}

	result := db.Create(&projectPost) // pass pointer of data to create a new row in table project_post
	if result.Error != nil {
		return result.Error
	}

	return nil
}

// InsertProject inserts a new row in table project, based on the data from a post
func InsertProject(post types.PostResult) (uint, error) {
	db, err := Connect()
	if err != nil {
		log.Println(err)
		return 0, err
	}

	project := model.Project{
		Title: post.Title,
		Dev:   post.Dev,
		Tools: post.Tools,
		Link:  post.Link,
		Repo:  post.Repo,
	}

	result := db.Create(&project) // pass pointer of data to Create a new row in table project
	if result.Error != nil {
		return 0, result.Error
	}

	return project.ID, nil
}
