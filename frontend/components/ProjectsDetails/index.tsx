import { useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { Project } from "../../interface/interface";

interface Props {
	data: Project[];
}

const ProjectsDetails = ({ data }: Props) => {
	const [filter, setFilter] = useState("");

	const elements = data
		.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
		.filter((project) => {
			return (
				project.tools.toLocaleLowerCase().includes(filter) ||
				project.dev.toLocaleLowerCase().includes(filter) ||
				project.title.toLocaleLowerCase().includes(filter)
			);
		})
		.map((project) => {
			const dateStr = new Date(project.updated_at).toLocaleDateString();
			return (
				<tr key={project.id.toString()}>
					<td>
						<Link href={`/projects/${project.id}`}>
							<a>{project.title}</a>
						</Link>
					</td>
					<td className={styles.devCol}>{project.dev}</td>
					<td className={styles.toolsCol}>{project.tools}</td>
					<td className={styles.dateCol}>
						<span className={styles.date}>{dateStr}</span>
					</td>
				</tr>
			);
		});

	return (
		<>
			<div className={styles.filter}>
				<input
					type="text"
					value={filter}
					onChange={(event) => setFilter(event.target.value)}
					placeholder="Filter"
				/>
			</div>
			<table className={styles.table}>
				<thead>
					<tr>
						<td>Name</td>
						<td className={styles.devCol}>Dev</td>
						<td className={styles.toolsCol}>Tools</td>
						<td className={styles.dateCol}>Updated</td>
					</tr>
				</thead>
				<tbody>{elements}</tbody>
			</table>
		</>
	);
};

export default ProjectsDetails;
