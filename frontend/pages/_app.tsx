import Head from "next/head";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	let analytics = null;
	if (process.env.NODE_ENV === "production") {
		analytics = (
			<script
				async
				defer
				data-website-id="d28a4815-01a3-4a2a-87fc-b7d472516db8"
				src="https://umami.nordictechjobs.com/umami.js"
			></script>
		);
	}

	return (
		<>
			<Head>
				<title>/wdg/.one</title>
				<link rel="icon" href="/favicon.ico" />
				{analytics}
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
