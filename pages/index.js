import Head from "next/head";

import Layout from "../components/Layout"

import ThreeColumn from "../components/ThreeColumn";
import PitchDeck from "../components/PitchDeck";
import Team from "../components/Team";
import Quotes from "../components/Quotes";
import { useMatomo } from '@datapunt/matomo-tracker-react'
import { useEffect } from 'react'


const columnContent = [
  {"id": 1, "icon": "ri-team-fill ri-3x", "heading": "Connect", "subtitle": "We connect you with senior diversity & inclusion experts"},
  {"id": 2, "icon": "ri-chat-smile-2-fill ri-3x", "heading": "Consult", "subtitle": "We demystify learning ‘what you don’t yet know’"},
  {"id": 3, "icon": "ri-service-fill ri-3x", "heading": "Co-learn", "subtitle": "We help you collaborate with our community of communities"},
];

const teamMembers = [
  {
    id: "1", 
    name: "Cass Elliott", 
    pronouns: ["he", "him", "his"],
    position: "Executive Director", 
    avatar: "our-team/cass-elliott", 
    bio: "Cass is a change leader committed to developing people and organizations to do what they do better. By helping teams find their place of engagement and leveraging opportunities for growth, he positions organizations where they need to be to stay adaptive and thrive."
  },
  {
    id: "2", 
    name: "Martin Krajcik", 
    pronouns: ["he", "him", "his"],
    position: "Director, Development & Education", 
    avatar: "our-team/martin-krajcik", 
    bio: "Martin is a Human Rights activist and educator. He studies, breaks-down, and teaches the ways governments, institutions, and individuals can take action to improve the well-being of diverse communities across the globe."
  },
  {
    id: "3", 
    name: "Peter Chiu", 
    pronouns: ["he", "him", "his"],
    position: "Events & Development Advisor", 
    avatar: "our-team/peter-chiu", 
    bio: "Peter’s passion for global citizenship can be witnessed by his commitment to connecting people through memorable events and creating shared experiences that better the community and society through philanthropic giving."
  },
  {
    id: "4", 
    name: "Advisory Members",  
    avatar: "our-team/advisory-members", 
    bio: "Check back later to see more bios and photos of our Senior Sector Advisors and Community Champions."
  }
]

const quotes = [
  {"id": 1, "byline": "Jake", "text": "Connecting with Senior Care Prism allows us to provide culturally competent and informed care for all seniors, from all walks of life."},
  {"id": 2, "byline": "Sandra", "text": "We’re able to access expert voices of queer, racially diverse seniors across generations and geographies to discuss the challenges of an aging Canadian Population."},
  {"id": 3, "byline": "Aarushi", "text": "Senior Care Prism creates space for our community of communities to put their experience out there in a way that makes life better for anyone who’s struggled to be seen and heard"}
]

export default function Home() {
  const { trackPageView } = useMatomo()
 
  useEffect(() => {
    trackPageView()
  }, [])

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
      <Team heading="Our Team" members={teamMembers}/>
      <Quotes quotes={quotes} />
    </Layout>
  );
}
