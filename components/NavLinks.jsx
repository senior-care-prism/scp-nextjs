import { Link, animateScroll as scroll } from 'react-scroll';
import PropTypes from 'prop-types';

function NavLinks({ styles }) {
  const navLinks = [
    { id: 1, to: 'about-us', scroll: true },
    { id: 2, to: 'news', scroll: true },
    { id: 3, to: 'our-team', scroll: true },
    { id: 4, to: 'contact', scroll: true },
  ];
  return (
    <div className={styles.navbar}>
      <nav role="navigation">
        <ul>
          {navLinks.map((link) => (
            <li key={link.id} className={styles.navlink}>
              <Link
                to={link.to}
                activeClass="active"
                offset={-100}
                duration={500}
                spy
                smooth
              >
                {link.to.replace('-', '\u00a0')}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

NavLinks.propTypes = {
  styles: PropTypes.object.isRequired,
};

export default NavLinks;
