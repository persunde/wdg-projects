import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	let analytics = null;
	if (process.env.NODE_ENV === "production") {
		analytics = (
			<script
				async
				defer
				data-website-id="d28a4815-01a3-4a2a-87fc-b7d472516db8"
				src="https://analytics.nordictechjobs.com/umami.js"
			></script>
		);
	}

	return (
		<>
			{analytics}
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
