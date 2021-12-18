import { useRouter } from 'next/router';
import cn from 'classnames';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  const { asPath } = useRouter();
  return (
    <>
      <Header id="#" path={asPath} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  news: false,
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  news: PropTypes.bool,
};

export default Layout;
