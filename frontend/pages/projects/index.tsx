import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllProjects } from "../../db/database";
import { Project } from "../../interface/interface";
import Menu from "../../components/menu/menu";

interface ProjectMainComponentProps {
	projectList: Project[];
}

const ProjectMainComponent = ({ projectList }: ProjectMainComponentProps) => {
	const projectLinkList = projectList.map((project) => {
		return (
			<li key={project.id.toString()}>
				<Link href={`/projects/${project.id}`}>
					<a>{project.title}</a>
				</Link>
			</li>
		);
	});

	return (
		<main>
			<h1>/wdg/ - Web Dev General</h1>
			<Menu />
			<section>
				<h2>Projects</h2>
				<ul>{projectLinkList}</ul>
			</section>
		</main>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const projectList: Project[] = getAllProjects();

	return {
		props: {
			projectList: projectList,
		},
	};
};

export default ProjectMainComponent;
