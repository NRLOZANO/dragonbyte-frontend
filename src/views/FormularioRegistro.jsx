import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';
import './Registro.css';

const FormularioRegistro = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '', apellido: '', genero: '', email: '',
    password: '', confirmPassword: '', edad: '',
    pais: '', departamento: '', ciudad: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Las contraseñas no coinciden' });
      return;
    }
    try {
      await api.post('/usuarios', {
        nombre: form.nombre,
        apellido: form.apellido,
        genero: form.genero,
        edad: parseInt(form.edad),
        email: form.email,
        password: form.password,
        rol: 'JUGADOR',
        ubicacion: { pais: form.pais, departamento: form.departamento, ciudad: form.ciudad }
      });
      await Swal.fire({ icon: 'success', title: '¡Cuenta creada!', text: 'Ya puedes iniciar sesión', timer: 1800, showConfirmButton: false });
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al registrar. Intenta nuevamente.';
      Swal.fire({ icon: 'error', title: 'Error', text: msg });
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2 className="register-title">CREATE AN ACCOUNT</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" name="nombre" placeholder="First Name" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" name="apellido" placeholder="Last Name" value={form.apellido} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select className="form-control" name="genero" value={form.genero} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Masculino">Male</option>
                <option value="Femenino">Female</option>
                <option value="Otro">Other</option>
                <option value="Prefiero no decir">Prefer not to say</option>
              </select>
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" className="form-control" name="edad" min="5" max="120" placeholder="Age" value={form.edad} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group full-width">
            <label>E-mail Address</label>
            <input type="email" className="form-control" name="email" placeholder="your.email@example.com" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" placeholder="Min. 8 characters" value={form.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" name="confirmPassword" placeholder="Repeat Password" value={form.confirmPassword} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Country</label>
              <input type="text" className="form-control" name="pais" placeholder="Country" value={form.pais} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>State / Department</label>
              <input type="text" className="form-control" name="departamento" placeholder="State / Dept." value={form.departamento} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group full-width">
            <label>City</label>
            <input type="text" className="form-control" name="ciudad" placeholder="City" value={form.ciudad} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-register">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;
