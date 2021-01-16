import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllProjectIDs } from "../../db/database";
import { ProjectPost } from "../../interface/interface";
import Menu from '../../components/menu/menu'

interface ProjectProps {
	idList: Number[]
}

const Project = ({ idList }: ProjectProps) => {
	const projectLinkList = idList.map(id => {
		return (
			<li key={id.toString()}>
				<Link href={`/projects/${id}`}>
					<a>{id}</a>
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
	const projectIDList: Number[] = getAllProjectIDs()

	return {
		props: {
			idList: projectIDList,
		},
// 		// Next.js will attempt to re-generate the page:
// 		// - When a request comes in
// 		// - At most once every second
// 		revalidate: 180, // In second
	}
}

export default Project