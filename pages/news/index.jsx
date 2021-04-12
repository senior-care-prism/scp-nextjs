import Head from 'next/head';

import Layout from '../../components/Layout';
import NewsFeed from '../../components/NewsFeed';
import { getNewsEntries } from '../../lib/api';

export default function News({ newsEntries }) {
  return (
    <Layout>
      <Head>
        <title>Senior Care Prism - News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewsFeed entries={newsEntries} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const newsEntries = await getNewsEntries();
  return {
    props: {
      newsEntries,
    },
  };
}
