import Link from "next/link";
import Menu from "../components/Menu";

export default function Home() {
	return (
		<main>
			<header>
				<h1><Link href="/"><a>/wdg/.one</a></Link></h1>
				<Menu />
			</header>
			<section>
				<h2>Submitting a project update</h2>
				<p>
					If you have a project you'd like to include an update for then make
					a post in the latest thread with the format of:
				</p>
				<code>
					:: my-project-title ::
					<br />
					dev:: anon
					<br />
					tools:: node, react, etc
					<br />
					link:: https://my.website.com
					<br />
					repo:: https://github.com/user/repo
					<br />
					progress:: Lorem ipsum dolor sit amet, consetetur sadipscing elitr
				</code>
			</section>
		</main>
	);
}
