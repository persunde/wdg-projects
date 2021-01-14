import { GetStaticPaths, GetStaticProps } from "next";

interface ProjectProps {
	id: string
}

const Project = ({ id }: ProjectProps) => {
	return (
		<div>
			Hello. I am page: {id}
		</div>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params.id

	// TODO: fetch project data from /api/projects/id

	return {
		props: {
			id,
			// TODO: add all the data we send as props to the render function Project
		},
// 		// Next.js will attempt to re-generate the page:
// 		// - When a request comes in
// 		// - At most once every second
// 		revalidate: 180, // In second
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	// Here it finds all the paths that needs to be generated!
	// We return a list of IDs, that is then sent to getStaticProps for each page/ID
	const response = await fetch("http://localhost:3000/api/projects")
	const projectIdList: Number[] = await response.json() // List with all the IDs of the projects

	return {
		paths: projectIdList.map(id => {
			return {
				params: {
					id: id.toString()
				},
			}
		}),
		// TODO: set fallback: true, and create a fallback page that handles when people copy/paste a search URL ???? Does this work with next export?
		// IF it does not work with next export, then add a ?params=... to the /jobs URL and use that to fetch the requested data
		fallback: false,
	}
}

export default Project