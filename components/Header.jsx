import { useState } from 'react';
import PropTypes from 'prop-types';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import cn from 'classnames';

import styles from '../styles/Header.module.scss';
import NavLinks from './NavLinks';

// import bgImg from "../public/images/scp"

function Header({ home, theme }) {
  const [isVisible, setIsVisible] = useState(!home);

  useScrollPosition(({ currPos }) => {
    if (home) {
      if (currPos.y < -100) {
        if (!isVisible) {
          setIsVisible(true);
        }
      } else if (isVisible) {
        setIsVisible(false);
      }
    }
  }, [isVisible]);

  return (
    <header className={cn(styles.header, { [styles.sticky]: isVisible })}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={`/images/logo/scp--${theme.foreground}.svg`} alt="Senior Care Prism logo" />
        </div>
        <NavLinks styles={styles} home={home} />
      </div>
    </header>
  );
}

Header.propTypes = {
  home: PropTypes.bool.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Header;
