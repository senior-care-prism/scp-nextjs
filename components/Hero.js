import styles from "../styles/Hero.module.scss";
import cn from "classnames";
import Header from "./Header";
import NavLinks from "./NavLinks";


export default function Hero(props) {
  return (
    <>
    <Header home />
    <section className={cn(styles.banner, styles.columns)}>
      <div className={cn(styles.column, styles.left)}>
        <div className={styles.logo}>
          <img src="images/logo-transparent.png" alt="Senior Care Prism logo" />
        </div>
        <div className={styles.tagline}>
          <div>
            <h1>{props.tagline}</h1>
            <p>{props.intro}</p>
            <button className={cn(styles.button, styles.primary)}>
              About Us
            </button>
          </div>
        </div>
      </div>
      <div className={cn(styles.column, styles.right)}>
        <NavLinks styles={styles} />
        <div className={styles.hero} />
      </div>
    </section>
    </>
  );
}
