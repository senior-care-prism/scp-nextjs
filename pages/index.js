import Head from "next/head";
import styles from "../styles/Home.module.scss";
import cn from "classnames";

import ThreeColumn from '../components/ThreeColumn'

const columnContent = [
  {"id": 1, "heading": "Connect", "subtitle": "We connect you with senior diversity & inclusion experts"},
  {"id": 2, "heading": "Consult", "subtitle": "We demystify learning ‘what you don’t yet know’"},
  {"id": 3, "heading": "Co-learn", "subtitle": "We help you collaborate with our community of communities"},
]

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Senior Care Prism</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section className={cn(styles.banner, styles.columns)}>
          <div className={cn(styles.column, styles.left)}>
            <div className={styles.logo}>
              <img
                src="images/logo-transparent.png"
                alt="Senior Care Prism logo"
              />
            </div>
            <div className={styles.tagline}>
              <div>
                <h1>Amplifying Inclusive Voices for All Seniors in Canada</h1>
                <p>
                  We bridge the gap between the needs of equity seeking seniors
                  groups and today’s senior sector. No organization is too small
                  to improve inclusivity, we work with small, medium and large
                  businesses and organizations in both the private and public
                  sectors.
                </p>
                <button className={cn(styles.button, styles.primary)}>
                  About Us
                </button>
              </div>
            </div>
          </div>
          <div className={cn(styles.column, styles.right)}>
            <div className={styles.navbar}>
              <nav role="navigation">
                <ul>
                  <li>About Us</li>
                  <li>Services</li>
                  <li>Blog</li>
                  <li>Contact</li>
                </ul>
              </nav>
            </div>
            <div className={styles.hero} />
          </div>
        </section>
        <ThreeColumn columns={columnContent} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
