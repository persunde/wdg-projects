import { GetStaticProps } from "next";
import Link from "next/link";

interface ProjectProps {
	idList: Number[]
}

const Project = ({ idList }: ProjectProps) => {
	console.log("idList:", idList)
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
	const response = await fetch("http://localhost:3000/api/projects")
	const projectIdList: Number[] = await response.json() // List with all the IDs of the projects

	// TODO: fetch project data from /api/projects/id

	return {
		props: {
			idList: projectIdList,
		},
// 		// Next.js will attempt to re-generate the page:
// 		// - When a request comes in
// 		// - At most once every second
// 		revalidate: 180, // In second
	}
}

export default Project