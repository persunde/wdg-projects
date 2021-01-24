package db

import (
	"errors"
	"log"

	"github.com/persunde/wdg-projects/crawler/db/model"
	"gorm.io/gorm"
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

func GetProjectID(projectTitle string) (uint, error) {
	db, err := Connect()
	if err != nil {
		log.Println(err)
		return 0, err
	}

	project := model.Project{}
	result := db.Where("title LIKE ?", projectTitle).First(project)
	// if Record is not found, return 0. 0 means no row/record found
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return 0, nil
	}
	if result.Error != nil {
		return 0, result.Error
	}

	return project.ID, nil
}
