package db

import (
	"github.com/persunde/wdg-projects/crawler/db/model"
)

// GetProjectPostList returns a list of all ProjectPosts
func GetProjectPostList() ([]model.ProjectPost, error) {
	projectPostList := []model.ProjectPost{}

	db, err := Connect()
	if err != nil {
		return nil, err
	}

	result := db.Find(&projectPostList)
	if result.Error != nil {
		return nil, result.Error
	}

	return projectPostList, nil
}

// GetImageBase64 returns an image for testing
func GetImageBase64() (model.ProjectPost, error) {
	projectPost := model.ProjectPost{}

	db, err := Connect()
	if err != nil {
		return projectPost, err
	}

	result := db.
		Where("ID = ?", 79665841).
		First(&projectPost)
	if result.Error != nil {
		return projectPost, result.Error
	}

	return projectPost, nil
}
