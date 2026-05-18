import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); 

    if (username === 'admin' && password === '1234') {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido a DragonBytes!',
        text: 'Inicio de sesión exitoso',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña incorrectos',
      });
    }
  };

  return (
    <div className="home">
      
      {/* LADO IZQUIERDO: Formulario de Login */}
      <div className="login-container">
        <h1 className="login-title">DRAGONBYTES</h1>
        
        <form id="loginForm" onSubmit={handleLogin}>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              id="username" 
              name="username" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-login">Login</button>
        </form>

        <p className="signup-link mt-3" style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/registro" className="fuenteColor" style={{ color: '#db5cc8', fontWeight: 'bold', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </div>

      {/* LADO DERECHO: Mensaje Inspiracional */}
      <div className="inspirational-container">
        <div className="inspirational-quote">
          <h2>Forja el Futuro</h2>
          <p>
            "El código no es solo lógica, es el lenguaje con el que damos vida a las ideas. Cada línea que escribes es una chispa; cada error superado, un escalón hacia la maestría. Entra, enciende tu mente y deja que tu curiosidad arda hasta conquistar lo imposible."
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;