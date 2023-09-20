package main

import (
	"fmt"

	"github.com/persunde/wdg-projects/crawler/chanparser"
	"github.com/persunde/wdg-projects/crawler/db"
)

func main() {
	err := db.InitDatabaseTables()
	if err != nil {
		fmt.Println(err)
	}

	postsWithProjectContent := chanparser.GetWDGProjectPosts()
	if len(postsWithProjectContent) > 0 {
		for _, post := range postsWithProjectContent {
			err := db.InsertProjectPost(post)
			if err != nil {
				fmt.Println(err)
			}
		}

		// Somehow trigger the static website to be regenerated? Or should it be done by a different program/script?
	}

}
