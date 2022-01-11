import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';
import Layout from '../components/Layout';
import '../styles/globals.css';
import 'remixicon/fonts/remixicon.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

function App({ Component, pageProps }) {
	const router = useRouter();
	useEffect(
		() => {
			const handleRouteChange = (url) => {
				gtag.pageview(url);
			};
			router.events.on('routeChangeComplete', handleRouteChange);
			return () => {
				router.events.off('routeChangeComplete', handleRouteChange);
			};
		},
		[
			router.events
		]
	);

	/* eslint-disable react/jsx-props-no-spreading */
	return (
			<Layout>
				<Component {...pageProps} />
			</Layout>
	);
}

/* eslint-disable react/forbid-prop-types */
/*App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};*/

export default App;
