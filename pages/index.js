import Head from "next/head";

import Hero from '../components/Hero'
import ThreeColumn from '../components/ThreeColumn'

const columnContent = [
  {"id": 1, "heading": "Connect", "subtitle": "We connect you with senior diversity & inclusion experts"},
  {"id": 2, "heading": "Consult", "subtitle": "We demystify learning ‘what you don’t yet know’"},
  {"id": 3, "heading": "Co-learn", "subtitle": "We help you collaborate with our community of communities"},
]

const introText = "We bridge the gap between the needs of equity seeking seniors groups and today’s senior sector. No organization is too small to improve inclusivity, we work with small, medium and large businesses and organizations in both the private and public sectors."


export default function Home() {
  return (
    <>
      <Head>
        <title>Senior Care Prism</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero 
          tagline="Amplifying Inclusive Voices for All Seniors in Canada"
          intro={introText}
          navLinks={["About Us", "Services", "Blog", "Contact"]}
        />
        <ThreeColumn columns={columnContent} />
      </main>
      <footer className="footer"></footer>
    </>
  );
}
