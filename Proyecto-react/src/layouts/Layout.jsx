import NavbarComponent from 'components/NavbarCoponent';
import Footer from 'components/Footer';
import React from 'react';
const Layout = ({ children }) => {
  return (
    <div className='mainContainer'>
      <NavbarComponent />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
