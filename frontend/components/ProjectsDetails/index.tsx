import styles from "./style.module.scss";
import Link from "next/link";
import { Project } from "../../interface/interface";

interface Props {
	data: Project[];
}

const ProjectsDetails = ({ data }: Props) => {
	const elements = data
		.map((project) => ({
			...project,
			updated_at_num: Date.parse(project.updated_at),
		}))
		.sort((a, b) => b.updated_at_num - a.updated_at_num)
		.map((project) => {
			const dateStr = new Date(project.updated_at).toLocaleDateString();
			return (
				<tr key={project.id.toString()}>
					<td>
						<Link href={`/projects/${project.id}`}>
							<a>{project.title}</a>
						</Link>
					</td>
					<td>{project.dev}</td>
					<td>{project.tools}</td>
					<td>{dateStr}</td>
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
					<td>Updated</td>
				</tr>
			</thead>
			<tbody>{elements}</tbody>
		</table>
	);
};

export default ProjectsDetails;
