import Sqlite, { Database } from "better-sqlite3";
import { Project, ProjectPost } from "../interface/interface";

const PAGINATION_SIZE = Number(15);

// Open the database and return a new db connection object
function openDB() {
	const db = new Sqlite("../database/wdgprojects.db", {
		fileMustExist: true,
	});
	return db;
}

// Close the database
function closeDB(db: Database) {
	db.close();
}

// Fix date formats to parse correctly across all browsers
// Safari deskop and mobile won't parse how it comes from the DB
function fixDates(list: Project[]): Project[];
function fixDates(list: ProjectPost[]): ProjectPost[] {
	return list.map((item) => ({
		...item,
		created_at: new Date(item.created_at).toISOString(),
		updated_at: new Date(item.updated_at).toISOString(),
	}));
}

function fixDate(item: Project): Project;
function fixDate(item: ProjectPost): ProjectPost {
	return {
		...item,
		created_at: new Date(item.created_at).toISOString(),
		updated_at: new Date(item.updated_at).toISOString(),
	};
}

interface QueryID {
	id: number;
}

export function getAllProjectIDs(): number[] {
	const db = openDB();
	const query = db.prepare("SELECT ID FROM project_posts");
	const result = query.all();
	const idList = result.map((row: QueryID) => {
		return row.id;
	});
	closeDB(db);
	return idList;
}

export function getAllProjects(): Project[] {
	const db = openDB();
	const query = db.prepare("SELECT * FROM projects");
	const result: Project[] = query.all();
	closeDB(db);

	result.forEach(project => {
		const latestUpdate = getLatestUpdateOnProject(project.id)
		project.updated_at = latestUpdate
	})

	console.log(result[0].title, result[0].updated_at)
	return fixDates(result);
}

export function getProjectPosts(id: number): ProjectPost[] {
	const db = openDB();
	const query = db.prepare(`
		SELECT * 
		FROM project_posts 
		WHERE project_id = ?
		ORDER BY post_no DESC
	`);
	const result = query.all(id);
	closeDB(db);
	return fixDates(result);
}

export function getProject(id: number): Project {
	const db = openDB();
	const query = db.prepare("SELECT * FROM projects WHERE id = ?");
	const result = query.get(id) as Project;
	closeDB(db);

	const latestUpdate = getLatestUpdateOnProject(result.id)
	result.updated_at = latestUpdate

	return fixDate(result);
}

export function getLatestUpdateOnProject(id: number): string {
	const db = openDB();
	const query = db.prepare(`
		SELECT updated_at
		FROM project_posts 
		WHERE project_id = ?
		ORDER BY id DESC
		LIMIT 1
	`);
	const result = query.get(id);
	closeDB(db);
	
	return result.updated_at
}