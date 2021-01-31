import { GetStaticPaths, GetStaticProps } from "next";
import { getAllProjects, getProject, getProjectPosts } from "../../db/database";
import { ProjectPost, Project } from "../../interface/interface";
import Menu from "../../components/Menu";
import ProjectDetails from "../../components/ProjectDetails";

interface ProjectComponentProps {
	projectData: Project;
	projectPostList: ProjectPost[];
}
const ProjectComponent = ({
	projectData,
	projectPostList,
}: ProjectComponentProps) => {
	return (
		<main>
			<h1>/wdg/ - Web Dev General</h1>
			<Menu />
			<ProjectDetails projectData={projectData} postData={projectPostList} />
		</main>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const id = Number(context.params.id);
	const projectData: Project = getProject(id);
	const projectPostsDataList: ProjectPost[] = getProjectPosts(id);

	return {
		props: {
			projectData: projectData,
			projectPostList: projectPostsDataList, // Project data is sent as props to the render function Project
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	// Here it finds all the paths that needs to be generated!
	// We get a list of ProjectPosts. We send all the IDs to getStaticProps, then a page will be generated for each ID
	const projectIdList: ProjectPost[] = getAllProjects();

	return {
		paths: projectIdList.map((projectPost) => {
			return {
				params: {
					id: projectPost.id.toString(),
				},
			};
		}),
		// Fallback does not work with export and is ignored, unless you run a Nextjs server as a backend instead of pure static export.
		fallback: false,
	};
};

export default ProjectComponent;
