package main

import (
	"github.com/persunde/wdg-projects/crawler/chanparser"
	"github.com/persunde/wdg-projects/crawler/db"
)

func main() {
	db.InitDatabaseTables()

	postsWithProjectContent := chanparser.GetWDGProjectPosts()
	if len(postsWithProjectContent) > 0 {
		for _, post := range postsWithProjectContent {
			db.InsertProjectPost(post)
		}

		// Somehow trigger the static website to be regenerated? Or should it be done by a different program/script?
	}

}
