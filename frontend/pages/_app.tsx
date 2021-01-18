import 'normalize.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <script async defer data-website-id="171e983d-1e4d-48ae-8f26-e11d63cc1567" src="https://analytics.nordictechjobs.com/umami.js"></script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
