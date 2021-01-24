export interface ProjectPost {
	id: number,
	title: 			string,
	project_id?: 	number,
	dev?: 			string,
	tools?: 		string,
	link?: 			string,
	repo?: 			string,
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
	link?:      	string,
	repo?:      	string,
	created_at?: 	string,
	updated_at?: 	string,
}