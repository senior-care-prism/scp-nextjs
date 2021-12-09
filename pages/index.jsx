import Head from 'next/head';

import Layout from '../components/Layout';
import NewsPreview from '../components/NewsPreview';
import PitchDeck from '../components/PitchDeck';
import Team from '../components/Team';
import Quotes from '../components/Quotes';
import { quotes } from '../shared/pageContent';
import { getNewsEntries, getTeamMembers } from '../lib/api';
import { ARTICLE_FEED_SHAPE, TEAM_MEMBERS_SHAPE } from '../shared/constants';

export default function Home({ newsEntries, teamMembers }) {
	return (
		<Layout home>
			<Head>
				<title>Senior Care Prism</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<PitchDeck heading="We transform aging communities into inclusive communities of care." />
			<Team heading="Our Team" members={teamMembers} />
			<NewsPreview newsEntries={newsEntries} />
			<Quotes quotes={quotes} />
		</Layout>
	);
}

Home.propTypes = {
	newsEntries: ARTICLE_FEED_SHAPE.isRequired,
	teamMembers: TEAM_MEMBERS_SHAPE.isRequired
};

export async function getStaticProps() {
	const newsEntries = await getNewsEntries({ limit: 4 });
	const teamMembers = await getTeamMembers({ limit: 6 });
	return {
		props : {
			newsEntries,
			teamMembers
		}
	};
}
