import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Layout ahora decide si centra el contenido según la ruta
const Layout = ({ children }) => {
  const location = useLocation();

  // Rutas que deben aparecer centradas (Login y Registro)
  const centeredPaths = ['/', '/registro'];
  const centered = centeredPaths.includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', justifyContent: centered ? 'center' : 'flex-start', alignItems: centered ? 'center' : 'stretch' }}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;