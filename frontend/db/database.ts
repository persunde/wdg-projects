import Sqlite, { Database } from "better-sqlite3"

const PAGINATION_SIZE = Number(15)

// Open the database and return a new db connection object
function openDB() {
	const db = new Sqlite('../database/wdgprojects.db', { 
		fileMustExist: true,
		verbose: console.log,
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
/**
 * Returns a list of all the job IDs for posts in english
 * TODO: only return IDs of posts that are still active
 */
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