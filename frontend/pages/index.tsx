import Head from "next/head";
import Menu from "../components/Menu";

export default function Home() {
	return (
		<>
			<Head>
				<title>/wdg/ - Web Dev General</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h1>/wdg/ - Web Dev General</h1>
				<Menu />
				<section>
					<h2>Submitting a project update</h2>
					<p>
						If you have a project you'd like to include an update for then make
						a post in the latest thread with the format of:
					</p>
					<p>
						:: my-project-title ::
						<br />
						dev:: anon
						<br />
						tools:: node, react, etc
						<br />
						link:: https://my.website.com
						<br />
						repo:: github.com/user/repo
						<br />
						progress:: sdgsghsghdsfgdfgsdf sfgsdfg sfgd sdg df gdsf g
					</p>
				</section>
			</main>
		</>
	);
}
