import styles from "../styles/PitchDeck.module.scss";
import cn from "classnames";

export default function PitchDeck(props) {
  console.log(this)
  return (
    <section className={styles.pitch}>
      <div className={styles.container}>
        <h2>{props.heading}</h2>
        <a href="/uploads/SCP-Pitch-Deck.pdf" className={cn(styles.button, styles.inverted)} download>
          Download Our Pitch and Find Out How
        </a>
      </div>
    </section>
  );
}
