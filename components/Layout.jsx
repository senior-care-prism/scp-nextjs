import { useRouter } from 'next/router';
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

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
