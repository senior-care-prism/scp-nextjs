import Head from 'next/head';
import Hero from '../components/Hero';
import NewsPreview from '../components/NewsPreview';
import PitchDeck from '../components/PitchDeck';
import Team from '../components/Team';
import Quotes from '../components/Quotes';
import { getNewsEntries, getTeamMembers, getQuotes } from '../lib/api';
import { ARTICLE_FEED_SHAPE, TEAM_MEMBERS_SHAPE, QUOTES_SHAPE } from '../shared/constants';

const introText = 'We bridge the gap between the needs of equity seeking seniors groups and today’s senior sector. No organization is too small to improve inclusivity, we work with small, medium and large businesses and organizations in both the private and public sectors.';

export default function Home({ newsEntries, teamMembers, quotes }) {
	const baseDomain = process.env.APP_ENV === 'staging' 
    ? process.env.APP_ENV + ".seniorcareprism.com"
		: "seniorcareprism.com";
	
	return (
		<>
			<Head>
				<title>Senior Care Prism</title>
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:title" content="Senior Care Prism" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
				<meta name="og:image" content={`https://${baseDomain}/images/seniors-in-the-park.jpg`} />
				<meta name="twitter:image" content={`https://${baseDomain}/images/seniors-in-the-park.jpg`} />
			</Head>
			<Hero
				tagline="Amplifying Inclusive Voices for All Seniors in Canada"
				intro={introText}
      />
			<PitchDeck heading="We transform aging communities into inclusive communities of care." />
			<Team heading="Our Team" members={teamMembers} />
			<NewsPreview newsEntries={newsEntries} />
			<Quotes quotes={quotes} />
		</>
	);
}


Home.propTypes = {
	newsEntries : ARTICLE_FEED_SHAPE.isRequired,
	teamMembers : TEAM_MEMBERS_SHAPE.isRequired,
	quotes      : QUOTES_SHAPE.isRequired
};

export async function getStaticProps() {
	const newsEntries = await getNewsEntries({ limit: 6 });
	const teamMembers = await getTeamMembers({ limit: 6 });
	const quotes = await getQuotes({ limit: 6 });
	return {
		props : {
			newsEntries,
			teamMembers,
			quotes
		}
	};
}