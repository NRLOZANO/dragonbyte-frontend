import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, rol, nombre } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);
      localStorage.setItem('nombre', nombre);
      await Swal.fire({
        icon: 'success',
        title: `¡Bienvenido, ${nombre}!`,
        text: 'Inicio de sesión exitoso',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/principal');
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Correo o contraseña incorrectos',
      });
    }
  };

  return (
    <div className="home">
      <div className="login-container">
        <h1 className="login-title">DRAGONBYTES</h1>
        <form id="loginForm" onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Link to="/registro" style={{ color: '#db5cc8', fontWeight: 'bold', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </p>
      </div>

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
