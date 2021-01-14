import Sqlite, { Database } from "better-sqlite3"
import { ProjectPost } from "../interface/interface";

const PAGINATION_SIZE = Number(15)

// Open the database and return a new db connection object
function openDB() {
	const db = new Sqlite('../database/wdgprojects.db', { 
		fileMustExist: true,
	});
	return db
}

// Close the database
function closeDB(db: Database) {
    db.close()
}

interface QueryID {
	id: Number
}

export function getAllProjectIDs(): Number[] {
	const db = openDB()
	const query = db.prepare('SELECT ID FROM project_posts')
	const result = query.all()
	const idList = result.map((row: QueryID) => {
		return row.id
	})
	closeDB(db)
	return idList
}

export function getAllProjects(): ProjectPost[] {
	const db = openDB()
	const query = db.prepare('SELECT * FROM project_posts')
	const result = query.all()
	closeDB(db)
	return result
}

export function getProject(id: number): ProjectPost {
	const db = openDB()
	const query = db.prepare('SELECT * FROM project_posts WHERE id = ?')
	const result = query.get(id)
	closeDB(db)
	return result
}