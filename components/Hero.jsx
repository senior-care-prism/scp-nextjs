import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from '../styles/Hero.module.scss';

function Hero({ tagline, intro, home }) {
  return (
    <>
      <section  id="about-us" className={cn(styles.banner, styles.columns)}>
        <div className={cn(styles.column, styles.left)}>
          <div className={styles.logo}>
          </div>
          <div className={styles.tagline}>
            <div>
              <h1>{tagline}</h1>
              <p>{intro}</p>
              <a href="/uploads/SCP-Pitch-Deck.pdf" className={cn(styles.button, styles.primary)} download>
                About Us
              </a>
            </div>
          </div>
        </div>
        <div className={cn(styles.column, styles.right)}>
          <div className={styles.spacer}></div>
          <div className={styles.hero} />
        </div>
      </section>
    </>
  );
}

Hero.propTypes = {
  tagline: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
};

export default Hero;
