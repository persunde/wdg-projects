package model

import (
	"time"
)

// Project contains data about a project
type Project struct {
	ID        uint
	Title     string
	Dev       string
	Tools     string
	Link      string
	Repo      string
	CreatedAt time.Time
	UpdatedAt time.Time
}

// ProjectPost contains the data about a /wdg/ project post
type ProjectPost struct {
	ID        uint
	ProjectID uint
	Title     string
	Dev       string
	Tools     string
	Link      string
	Repo      string
	Progress  string
	PostNo    uint
	Image     string // as Base64
	CreatedAt time.Time
	UpdatedAt time.Time
}

// TODO: remove Title, Dev, Tools, Link, Repo from ProjectPost. That is data that is part of the Project, and not the ProjectPost
// ProjectPost only has the Progress and Image,
