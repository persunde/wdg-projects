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
			<div>Repo: {projectData.repo}</div>
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

// Helper function for getDate
const _leadingZero = (number) => {
	return ("0" + number).slice(-2);
}

const getDate = (value) => {
	const date = new Date(value);
	const month = _leadingZero(date.getMonth() + 1);
	const day = _leadingZero(date.getDate());
	const year = date.getFullYear().toString().substr(-2);
	const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
	const hours = _leadingZero(date.getHours());
	const minutes = _leadingZero(date.getMinutes());
	const seconds = _leadingZero(date.getSeconds());
	return `${month}/${day}/${year}(${weekday})${hours}:${minutes}:${seconds}`;
};

const ProgressUpdate = ({ post }: ProgressUpdateProps) => {
	const [imgExpanded, setImgExpanded] = useState(false);

	return (
		<div className="progress">
			<div className="progress-head">Date: {getDate(post.updated_at)}</div>
				{ post.image !== "" ? <div>
					<img
						className={styles.img}
						src={`data:image/jpeg;base64,${post.image}`}
						data-expand={imgExpanded}
						onClick={() => setImgExpanded(!imgExpanded)}
					/>
				</div> : ""}
				Progress: {post.progress}
		</div>
	);
};

export default ProjectDetails;
