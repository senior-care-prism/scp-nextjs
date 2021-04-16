import Head from 'next/head';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import NewsFeed from '../../components/NewsFeed';

import { getNewsEntries, getNewsMaxPage } from '../../lib/api';
import { ARTICLE_FEED_SHAPE } from '../../shared/constants';

export default function News({ newsEntries, pageNum, maxPage }) {
  return (
    <Layout>
      <Head>
        <title>Senior Care Prism - News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewsFeed entries={newsEntries} pageNum={pageNum} maxPage={maxPage} />
    </Layout>
  );
}

News.propTypes = {
  newsEntries: ARTICLE_FEED_SHAPE.isRequired,
  pageNum: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};

export async function getServerSideProps({ query }) {
  const pageNum = query.p !== undefined ? parseInt(query.p, 10) : 1;
  const search = query.search !== undefined ? query.search : '';
  const newsEntries = await getNewsEntries({ pageNum, search });
  const maxPage = await getNewsMaxPage({ limitPerPage: 8, search });
  return {
    props: {
      newsEntries,
      pageNum,
      maxPage,
    },
  };
}
