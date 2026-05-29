import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', overflow: 'auto', minHeight: 0 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
