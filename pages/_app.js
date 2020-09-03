import MatomoProvider from "../contexts/matomoContext"

import '../styles/globals.css'
import 'remixicon/fonts/remixicon.css'
import 'pure-react-carousel/dist/react-carousel.es.css';

function MyApp({ Component, pageProps }) {
  return (
  <MatomoProvider>
    <Component {...pageProps} />
    </MatomoProvider>
  )
}

export default MyApp
