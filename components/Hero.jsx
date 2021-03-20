import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from '../styles/Hero.module.scss';
import Header from './Header';
import NavLinks from './NavLinks';

function Hero({ tagline, intro }) {
  const headerTheme = {
    foreground: 'white',
  };
  return (
    <>
      <Header home theme={headerTheme} />
      <section className={cn(styles.banner, styles.columns)}>
        <div className={cn(styles.column, styles.left)}>
          <div className={styles.logo}>
            <img src="images/logo/scp--light-amber.svg" alt="Senior Care Prism logo" />
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
          <NavLinks styles={styles} />
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
