import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
	return (
		<div className="flex justify-center min-h-screen">
			<Head>
				<title>/wdg/ Projects</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="self-center">
				<h1 className="flex justify-center text-6xl">
					Welcome to /wdg/ projects!
				</h1>

				<h3 className="flex justify-center">
					Lets show off the cool projects people at /wdg/ are making!
				</h3>
				<Link href="/projects">
					<a className="flex justify-center">
						Click here to see a list of all the projects
					</a>
				</Link>

				<div className="flex justify-center space-x-1">
					<div>
						Our Github repository
					</div>
					<Link href="https://github.com/persunde/wdg-projects" >
						<a target="_blank" rel="noopener noreferrer">https://github.com/persunde/wdg-projects</a>
					</Link>
				</div>
			</main>
		</div>
	)
}