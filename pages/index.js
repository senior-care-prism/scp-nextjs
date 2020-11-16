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
    name: "Cass Elliot", 
    position: "chief executive officer", 
    avatar: "our-team/cass-elliott", 
    bio:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: "2", 
    name: "Sara Yates", 
    position: "chief technology officer", 
    avatar: "our-team/sara-yates", 
    titles: ["CPA", "CA"], 
    bio:"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: "3", 
    name: "Morgan Bass", 
    position: "community engagement chair", 
    avatar: "our-team/morgan-bass", 
    bio:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id: "4", 
    name: "Reed Taft", 
    position: "coastal health advisor", 
    avatar: "our-team/reed-taft", 
    titles: ["B.Sc", "P.Geo"], 
    bio:"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    id: "5", 
    name: "Kathryn Lowell", 
    position: "Marketing consultant", 
    avatar: "our-team/kathryn-lowell", 
    bio:"Lectus arcu bibendum at varius vel pharetra. "
  },
  {
    id: "6", 
    name: "Tobin Pierre", 
    position: "advisor", 
    avatar: "our-team/tobin-pierre", 
    bio:"Fusce ut placerat orci nulla pellentesque dignissim enim sit amet."
  },
]

const quotes = [
  {"id": 1, "byline": "Jake", "text": "Connecting with Senior Care Prism allows us to provide culturally competent and informed care for all seniors, from all walks of life."},
  {"id": 2, "byline": "Sandra", "text": "We’re able to access expert voices of queer, racially diverse seniors across generations and geographies to discuss the challenges of an aging Canadian Population."},
  {"id": 3, "byline": "Aarushi", "text": "Senior Care Prism creates space for our community of communities to put their experience out there in a way that makes life better for anyone who’s struggled to be seen and heard"}
]

export default function Home() {
  const { trackPageView } = useMatomo()
 
  React.useEffect(() => {
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
