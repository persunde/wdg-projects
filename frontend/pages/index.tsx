import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Link from 'next/link'

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>/wdg/ Projects</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to /wdg/ projects!
				</h1>

				<div className={styles.description}>
					Lets show off the cool projects people at /wdg/ are making!
				</div>
				<Link href="/projects">
					<a>Click here to see a list of all the projects</a>
				</Link>
			</main>
		</div>
	)
}
