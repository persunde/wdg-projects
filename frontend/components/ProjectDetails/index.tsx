import styles from "./style.module.scss";
import { Project, ProjectPost } from "../../interface/interface";
import { useState } from "react";

interface Props {
	projectData: ProjectPost[];
	postData: Project;
}

const ProjectDetails = ({ projectData, postData }) => {
	const updates = postData.map((post) => (
		<ProgressUpdate key={post.id} post={post} />
	));

	return (
		<section>
			<h2>{projectData.title}</h2>
			<h3>Project details</h3>
			<div>Developer: {projectData.dev}</div>
			<div>
				Repo:{" "}
				<a target="_blank" href={projectData.repo}>
					{projectData.repo}
				</a>
			</div>
			<div>Tools: {projectData.tools}</div>
			<div>
				Link: <a href={projectData.link}>{projectData.link}</a>
			</div>
			<h3>Progress updates</h3>
			{updates}
		</section>
	);
};

interface ProgressUpdateProps {
	post: ProjectPost;
}

const ProgressUpdate = ({ post }: ProgressUpdateProps) => {
	const [imgExpanded, setImgExpanded] = useState(false);
	const dateStr = new Date(post.updated_at).toLocaleString();
	const img = post.image ? (
		<img
			className={styles.img}
			src={`data:image/jpeg;base64,${post.image}`}
			data-expand={imgExpanded}
			onClick={() => setImgExpanded(!imgExpanded)}
		/>
	) : null;

	return (
		<div className="progress">
			<div className="progress-head">{dateStr}</div>
			{img}
			{post.progress}
		</div>
	);
};

export default ProjectDetails;
