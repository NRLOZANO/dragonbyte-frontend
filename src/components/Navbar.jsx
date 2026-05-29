import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre');
    navigate('/');
  };

  return (
    <nav style={{ background: '#1a1a2e', padding: '15px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ margin: 0 }}>
        <Link to={token ? '/principal' : '/'} style={{ color: '#d4af37', textDecoration: 'none' }}>
          DRAGONBYTE
        </Link>
      </h2>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {!token && (
          <Link to="/registro" style={{ padding: '8px 15px', background: '#6b21a8', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Create Account
          </Link>
        )}

        {token && (
          <Link to="/principal" style={{ padding: '8px 15px', background: '#d4af37', color: '#1a1a2e', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            Modules
          </Link>
        )}

        {token && rol === 'ADMIN' && (
          <>
            <Link to="/comunidad" style={{ padding: '8px 15px', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
              Community
            </Link>
            <Link to="/graficos" style={{ padding: '8px 15px', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
              Analytics
            </Link>
          </>
        )}

        {token && (
          <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
