import Head from 'next/head';
import Layout from '../../components/Layout';
import NewsFeed from '../../components/NewsFeed';
import { getNewsEntries, getNewsMaxPage } from '../../lib/api';

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

export async function getServerSideProps({ query }) {
  const pageNum = query.p !== undefined ? parseInt(query.p, 10) : 1;
  const newsEntries = await getNewsEntries({ pageNum });
  const maxPage = await getNewsMaxPage({ limitPerPage: 8 });
  return {
    props: {
      newsEntries,
      pageNum,
      maxPage,
    },
  };
}
