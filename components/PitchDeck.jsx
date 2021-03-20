import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from '../styles/PitchDeck.module.scss';

function PitchDeck({ heading }) {
  return (
    <section className={styles.pitch}>
      <div className={styles.container}>
        <h2>{heading}</h2>
        <a
          href="/uploads/SCP-Pitch-Deck.pdf"
          className={cn(styles.button, styles.inverted)}
          download
        >
          Download Our Pitch and Find Out How
        </a>
      </div>
    </section>
  );
}

PitchDeck.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default PitchDeck;
