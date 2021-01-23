import { GetStaticPaths, GetStaticProps } from "next";
import { getAllProjects, getProject } from "../../db/database";
import { ProjectPost } from "../../interface/interface";
import Menu from '../../components/menu/menu'

interface ProjectProps {
	projectID: number
	projectPostList: ProjectPost[]
}
const Project = ({projectID, projectPostList}: ProjectProps) => {
	const projectPost = projectPostList[0]
	// TODO: present a list of progress for the project here
	return (
		<main>
			<h1>/wdg/ - Web Dev General</h1>
			<Menu/>
			<section>
				<div>
					<h2>{projectPost.title}</h2>
					<img src={`data:image/jpeg;base64,${projectPost.image}`}/>
					<div>Developer: {projectPost.dev}</div>
					<div>Progress: {projectPost.progress}</div>
					<div>Repo: {projectPost.repo}</div>
					<div>Tools: {projectPost.tools}</div>
					<div>Link <a href={projectPost.link}>{projectPost.link}</a></div>
				</div>
			</section>
		</main>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const id = Number(context.params.id)
	const projectDataList: ProjectPost[] = getProject(id)

	return {
		props: {
			projectID: id,
			projectPostList: projectDataList // Project data is sent as props to the render function Project
		},
// 		// Next.js will attempt to re-generate the page:
// 		// - When a request comes in
// 		// - At most once every second
// 		revalidate: 180, // In second
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	// Here it finds all the paths that needs to be generated!
	// We get a list of ProjectPosts. We send all the IDs to getStaticProps, then a page will be generated for each ID
	const projectIdList: ProjectPost[] = getAllProjects()

	return {
		paths: projectIdList.map(projectPost => {
			return {
				params: {
					id: projectPost.id.toString()
				},
			}
		}),
		// TODO: set fallback: true, and create a fallback page that handles when people copy/paste a search URL ???? Does this work with next export?
		// IF it does not work with next export, then add a ?params=... to the /jobs URL and use that to fetch the requested data
		fallback: false,
	}
}

export default Project