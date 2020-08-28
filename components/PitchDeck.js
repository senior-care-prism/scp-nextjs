import styles from "../styles/PitchDeck.module.scss";
import cn from "classnames";

export default function PitchDeck(props) {
  return (
    <section className={styles.pitch}>
      <div className={styles.container}>
        <h2>{props.heading}</h2>
        <a href="#download" className={cn(styles.button, styles.inverted)}>
          Download Our Pitch and Find Out Why
        </a>
      </div>
    </section>
  );
}