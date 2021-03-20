import Head from 'next/head';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useEffect } from 'react';

import Layout from '../components/Layout';
import ThreeColumn from '../components/ThreeColumn';
import PitchDeck from '../components/PitchDeck';
import Team from '../components/Team';
import Quotes from '../components/Quotes';
import { teamMembers, columnContent, quotes } from '../shared/pageContent';

export default function Home() {
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView();
  }, []);

  return (
    <Layout home>
      <Head>
        <title>Senior Care Prism</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThreeColumn columns={columnContent} />
      <PitchDeck
        heading="We transform aging communities into inclusive communities of care."
      />
      <Team heading="Our Team" members={teamMembers} />
      <Quotes quotes={quotes} />
    </Layout>
  );
}
