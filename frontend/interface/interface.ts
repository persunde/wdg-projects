export interface ProjectPost {
	id: number,
	project_id?: 	number,
	progress?: 		string,
	post_no?: 		string,
	image?: 		string,
	created_at?: 	string,
	updated_at?:	string,
}

export interface Project {
	id: 			number,
	title:     		string,
	dev?:       	string,
	tools?: 		string,
	link?:      	string,
	repo?:      	string,
	created_at?: 	string,
	updated_at?: 	string,
}