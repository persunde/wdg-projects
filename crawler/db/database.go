package db

import (
	"log"

	"github.com/persunde/wdg-projects/crawler/db/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var databasePath string = "../database/wdgprojects.db"
var connection *gorm.DB = nil

// TODO: replace this with a config for prod, test etc.
func getDatabasePath() string {
	return databasePath
}

// Connect returns a connection to the database
func Connect() (*gorm.DB, error) {
	return ConnectWithLogLevel(logger.Error) // Now this only works the first time when the connection is initialized
}

// Close closes the database connection
// NOTE: It is rare to Close a DB, as the DB handle is meant to be long-lived and shared between many goroutines.
func Close(db *gorm.DB) error {
	sqlDb, err := db.DB()
	if err != nil {
		return err
	}
	sqlDb.Close()

	return nil
}

// ConnectWithLogLevel returns a connection to the database with the specified logLevel, but that is only set the first time the connection is created
func ConnectWithLogLevel(logLevel logger.LogLevel) (*gorm.DB, error) {

	databasePath := getDatabasePath()
	// github.com/mattn/go-sqlite3
	db, err := gorm.Open(sqlite.Open(databasePath), &gorm.Config{
		Logger: logger.Default.LogMode(logLevel),
	})
	if err != nil {
		log.Fatal(err)
	}
	connection = db

	return db, nil
}

// InitDatabaseTables creates the database tables if they dont already exist
func InitDatabaseTables() error {
	db, err := Connect()
	if err != nil {
		log.Fatal(err)
		return err
	}
	hasTableProject := db.Migrator().HasTable(&model.Project{})
	if !hasTableProject {
		err := db.Migrator().CreateTable(&model.Project{})
		if err != nil {
			return err
		}
	}

	hasTableProjectPost := db.Migrator().HasTable(&model.ProjectPost{})
	if !hasTableProjectPost {
		err := db.Migrator().CreateTable(&model.ProjectPost{})
		if err != nil {
			return err
		}
	}

	return nil
}
