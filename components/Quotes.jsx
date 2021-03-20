import PropTypes from 'prop-types';
import { Slide } from 'pure-react-carousel';
import styles from '../styles/Quotes.module.scss';
import SlideProvider from './SlideProvider';

function Quotes({ quotes }) {
  const quoteSlides = quotes.map((quote) => (
    <Slide index={quote.id} key={quote.id} className={styles.slide}>
      <div className={styles.container}>
        <div className={styles.quote}>{quote.text}</div>
        <div className={styles.byline}>
          {'- '}
          {quote.byline}
        </div>
      </div>
    </Slide>
  ));

  return (
    <section className={styles.quotes}>
      <SlideProvider slides={quoteSlides} styles={styles} />
    </section>
  );
}

Quotes.propTypes = {
  quotes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Quotes;
