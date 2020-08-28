import Header from "./Header"
import Hero from "./Hero";
import Footer from "./Footer";
import styles from "../styles/Layout.module.scss"
import cn from "classnames"


const introText = "We bridge the gap between the needs of equity seeking seniors groups and today’s senior sector. No organization is too small to improve inclusivity, we work with small, medium and large businesses and organizations in both the private and public sectors.";

export default function Layout({ children, home }) {
  return (
    <>
      { home ? <Hero
        tagline="Amplifying Inclusive Voices for All Seniors in Canada"
        intro={introText}
      /> : <Header />}
      <main className={cn({[styles['not-home']]: !home})}>{children}</main>

      <Footer />
    </>
  );
}
