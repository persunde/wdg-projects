import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllProjects } from "../../db/database";
import { ProjectPost } from "../../interface/interface";
import Menu from '../../components/menu/menu'

interface ProjectProps {
	projectList: ProjectPost[]
}

const Project = ({ projectList }: ProjectProps) => {
	const projectLinkList = projectList.map(project => {
		return (
			<li key={project.id.toString()}>
				<Link href={`/projects/${project.id}`}>
					<a>{project.title}</a>
				</Link>
			</li>
		)
	})

	return (
		<main>
			<h1>/wdg/ - Web Dev General</h1>
			<Menu/>
			<section>
				<h2>Projects</h2>
				<ul>
					{projectLinkList}
				</ul>
			</section>
		</main>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const projectList: ProjectPost[] = getAllProjects()

	return {
		props: {
			projectList: projectList,
		},
// 		// Next.js will attempt to re-generate the page:
// 		// - When a request comes in
// 		// - At most once every second
// 		revalidate: 180, // In second
	}
}

export default Project