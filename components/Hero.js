import styles from "../styles/Hero.module.scss";
import cn from "classnames";

export default function Hero(props) {
  return (
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
        <div className={styles.navbar}>
          <nav role="navigation">
            <ul>
              {props.navLinks.map((navLink, i) => (
                <li key={i}>{navLink}</li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.hero} />
      </div>
    </section>
  );
}
