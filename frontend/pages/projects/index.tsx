import { GetStaticProps } from "next";
import { getAllProjects } from "../../db/database";
import { Project } from "../../interface/interface";
import Menu from "../../components/Menu";
import ProjectsDetails from "../../components/ProjectsDetails";

interface ProjectMainComponentProps {
	projectList: Project[];
}

const ProjectMainComponent = ({ projectList }: ProjectMainComponentProps) => {
	return (
		<main>
			<header>
				<h1>/wdg/.one</h1>
				<Menu />
			</header>
			<section>
				<h2>Projects</h2>
				<ProjectsDetails data={projectList} />
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
