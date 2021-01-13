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

	projectPost := model.ProjectPost{
		ID:       post.PostNo,
		Title:    post.Title,
		Dev:      post.Dev,
		Tools:    post.Tools,
		Link:     post.Link,
		Repo:     post.Repo,
		Progress: post.Progress,
		PostNo:   post.PostNo,
		Image:    post.Image,
	}
	result := db.Create(&projectPost) // pass pointer of data to Create a new row
	if result.Error != nil {
		return result.Error
	}

	return nil
}
