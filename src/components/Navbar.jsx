import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ background: '#1a1a2e', padding: '15px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: '#d4af37', textDecoration: 'none' }}>
          DRAGONBYTE
        </Link>
      </h2>
      
      <div>
        <Link to="/principal" style={{ marginRight: '15px', padding: '8px 15px', background: '#d4af37', color: '#1a1a2e', textDecoration: 'none', borderRadius: '5px', display: 'inline-block', fontWeight: 'bold' }}>
          Modules
        </Link>

        <Link to="/registro" style={{ marginRight: '15px', padding: '8px 15px', background: '#6b21a8', color: 'white', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>
          Create Account
        </Link>
        <Link to="/comunidad" style={{ padding: '8px 15px', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '5px', display: 'inline-block' }}>
          Community
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;