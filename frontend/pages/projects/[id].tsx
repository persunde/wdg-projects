import { GetStaticPaths, GetStaticProps } from "next";
import { getAllProjects, getProject, getProjectPosts } from "../../db/database";
import { ProjectPost, Project } from "../../interface/interface";
import Menu from '../../components/menu/menu'

interface ProjectComponentProps {
	projectData: Project
	projectPostList: ProjectPost[]
}
const ProjectComponent = ({projectData, projectPostList}: ProjectComponentProps) => {
	const projectPost = projectPostList[0]
	// TODO: present a list of progress for the project here
	// projectData contains data about a Project. Such as the developer, tools, link and title
	// projectPostList is a list of the Progress reports. It contains images posted with the comment and the progress comment
	return (
		<main>
			<h1>/wdg/ - Web Dev General</h1>
			<Menu/>
			<section>
				<div>
					<h2>{projectData.title}</h2>
					<img src={`data:image/jpeg;base64,${projectPost.image}`}/>
					<div>Developer: {projectData.dev}</div>
					<div>Progress: {projectPost.progress}</div>
					<div>Repo: {projectData.repo}</div>
					<div>Tools: {projectData.tools}</div>
					<div>Link <a href={projectData.link}>{projectData.link}</a></div>
				</div>
			</section>
		</main>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const id = Number(context.params.id)
	const projectData: Project = getProject(id)
	const projectPostsDataList: ProjectPost[] = getProjectPosts(id)

	return {
		props: {
			projectData: projectData,
			projectPostList: projectPostsDataList // Project data is sent as props to the render function Project
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
		// Fallback does not work with export and is ignored, unless you run a Nextjs server as a backend instead of pure static export.
		fallback: false,
	}
}

export default ProjectComponent