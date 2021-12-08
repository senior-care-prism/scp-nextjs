import Head from 'next/head';

import Layout from '../components/Layout';
import NewsPreview from '../components/NewsPreview';
import PitchDeck from '../components/PitchDeck';
import Team from '../components/Team';
import Quotes from '../components/Quotes';
import { teamMembers, quotes } from '../shared/pageContent';
import { getNewsEntries } from '../lib/api';
import { ARTICLE_FEED_SHAPE } from '../shared/constants';

export default function Home({ newsEntries }) {
  return (
    <Layout home>
      <Head>
        <title>Senior Care Prism</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PitchDeck
        heading="We transform aging communities into inclusive communities of care."
      />
      <Team heading="Our Team" members={teamMembers} />
      <NewsPreview newsEntries={newsEntries} />
      <Quotes quotes={quotes} />
    </Layout>
  );
}

Home.propTypes = {
  newsEntries: ARTICLE_FEED_SHAPE.isRequired,
};

export async function getStaticProps() {
  const newsEntries = await getNewsEntries({ limit: 4 });

  return {
    props: {
      newsEntries,
    },
  };
}
