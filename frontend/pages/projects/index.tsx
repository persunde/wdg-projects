import { GetStaticProps } from "next";
import Link from "next/link";
import { getAllProjectIDs } from "../../db/database";
import { ProjectPost } from "../../interface/interface";

interface ProjectProps {
	idList: Number[]
}

const Project = ({ idList }: ProjectProps) => {
	const projectLinkList = idList.map(id => {
		return (
			<Link href={`/projects/${id}`}>
				<a>
					<div>
						Click here to go to Project {id}
					</div>
				</a>
			</Link>
		)
	})

	return (
		<>
			{projectLinkList}
		</>
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