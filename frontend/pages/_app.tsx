import 'normalize.css'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  let analytics = null
  if (process.env.NODE_ENV === "production") {
    analytics = <script async defer data-website-id="5da6576d-1382-444c-8aed-592906a467a8" src="https://analytics.nordictechjobs.com/umami.js"></script>
  }
  
  return (
    <>
      {analytics}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
