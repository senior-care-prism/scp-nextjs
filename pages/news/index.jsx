import Head from 'next/head';
import PropTypes from 'prop-types';
import NewsFeed from '../../components/NewsFeed';

import { getNewsEntries, getNewsMaxPage } from '../../lib/api';
import { ARTICLE_FEED_SHAPE } from '../../shared/constants';

export default function News({ newsEntries, pageNum, maxPage }) {
	return (
		<>
			<Head>
				<title>Senior Care Prism - News</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NewsFeed className="no-scroll" entries={newsEntries} pageNum={pageNum} maxPage={maxPage} />
		</>
	);
}

News.propTypes = {
	newsEntries : ARTICLE_FEED_SHAPE.isRequired,
	pageNum     : PropTypes.number.isRequired,
	maxPage     : PropTypes.object.isRequired
};

export async function getServerSideProps({ query }) {
	const pageNum = query.p !== undefined ? parseInt(query.p, 10) : 1;
	const search = query.search !== undefined ? query.search : '';
	const newsEntries = await getNewsEntries({ pageNum, search });
	const maxPage = await getNewsMaxPage({ limitPerPage: 6, search });
	return {
		props : {
			newsEntries,
			pageNum,
			maxPage
		}
	};
}
