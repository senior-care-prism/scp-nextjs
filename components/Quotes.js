import { Slide } from "pure-react-carousel";
import styles from "../styles/Quotes.module.scss";
import SlideProvider from "./SlideProvider"

export default function Quotes(props) {

  const quotes = props.quotes.map((quote) => (
    <Slide index={quote.id} key={quote.id} className={styles.slide}>
      <div className={styles.container}>
        <div className={styles.quote}>{quote.text}</div>
        <div className={styles.byline}>- {quote.byline}</div>
      </div>
    </Slide>
    
  ));

  return (
    <section className={styles.quotes}>
      <SlideProvider slides={quotes} styles={styles}/>
    </section>
  );
}
