import Head from 'next/head';
import PropTypes from 'prop-types';
import ResourceFeed from '../../components/ResourceFeed';

import { getResourceEntries, getResourceMaxPage } from '../../lib/api';
import { RESOURCES_SHAPE } from '../../shared/constants';

export default function Resources({ resourceEntries, pageNum, maxPage }) {
	return (
		<>
			<Head>
				<title>Senior Care Prism - Resources</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ResourceFeed className="no-scroll" resources={resourceEntries} pageNum={pageNum} maxPage={maxPage} />
		</>
	);
}

Resources.propTypes = {
	resourceEntries : RESOURCES_SHAPE.isRequired,
	pageNum     : PropTypes.number.isRequired,
	maxPage     : PropTypes.number.isRequired
};

export async function getServerSideProps({ query }) {
	const pageNum = query.p !== undefined ? parseInt(query.p, 10) : 1;
	const search = query.search !== undefined ? query.search : '';
	const resourceEntries = await getResourceEntries({ pageNum, search });
	const maxPage = await getResourceMaxPage({ limitPerPage: 9, search });
	return {
		props : {
			resourceEntries,
			pageNum,
			maxPage
		}
	};
}
