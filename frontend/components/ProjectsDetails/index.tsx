import styles from "./style.module.scss";
import Link from "next/link";
import { Project } from "../../interface/interface";

interface Props {
	data: Project[];
}

const ProjectsDetails = ({ data }: Props) => {
	const elmenents = data
		.map((project) => ({
			...project,
			updated_at_obj: Date.parse(project.updated_at),
		}))
		.sort((a, b) => a.updated_at_obj - b.updated_at_obj)
		.map((project) => {
			return (
				<tr key={project.id.toString()}>
					<td>
						<Link href={`/projects/${project.id}`}>
							<a>{project.title}</a>
						</Link>
					</td>
					<td>{project.dev}</td>
					<td>{project.tools}</td>
				</tr>
			);
		});

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<td>Name</td>
					<td>Dev</td>
					<td>Tools</td>
				</tr>
			</thead>
			<tbody>{elmenents}</tbody>
		</table>
	);
};

export default ProjectsDetails;
