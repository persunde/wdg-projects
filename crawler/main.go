package main

import (
	"github.com/persunde/wdg-projects/crawler/chanparser"
	"github.com/persunde/wdg-projects/crawler/db"
)

func main() {
	db.InitDatabaseTables()

	postsWithProjectContent := chanparser.GetWDGProjectPosts()
	if len(postsWithProjectContent) > 0 {
		// TODO:
		// 1. Insert content into DB
		// 2. trigger an action to re-generate the website
		// 3? Update Github repo with the latest DB?
		for _, post := range postsWithProjectContent {
			db.InsertProjectPost(post)
		}

		// Somehow trigger the static website to be regenerated? Or should it be done by a different program/script?
	}

}
