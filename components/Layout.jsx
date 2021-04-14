import cn from 'classnames';
import PropTypes from 'prop-types';

import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import styles from '../styles/Layout.module.scss';

const introText = 'We bridge the gap between the needs of equity seeking seniors groups and today’s senior sector. No organization is too small to improve inclusivity, we work with small, medium and large businesses and organizations in both the private and public sectors.';

function Layout({ children, home }) {
  const theme = {
    foreground: 'white',
    background: 'sacramento',
  };

  return (
    <>
      { home
        ? (
          <Hero
            tagline="Amplifying Inclusive Voices for All Seniors in Canada"
            intro={introText}
          />
        )
        : <Header theme={theme} home={home} />}
      <main className={cn({ [styles['not-home']]: !home })}>{children}</main>

      <Footer />
    </>
  );
}

Layout.defaultProps = {
  home: false,
};

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  home: PropTypes.bool,
};

export default Layout;
