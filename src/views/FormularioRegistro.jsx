import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../services/api';
import './Registro.css';

const FormularioRegistro = () => {
  const navigate = useNavigate();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

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
        ubicacion: {
          pais: form.pais,
          departamento: form.departamento,
          ciudad: form.ciudad
        }
      });
      await Swal.fire({ icon: 'success', title: '¡Cuenta creada!', text: 'Ya puedes iniciar sesión', timer: 1800, showConfirmButton: false });
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al registrar. Intenta nuevamente.';
      Swal.fire({ icon: 'error', title: 'Error', text: msg });
    }
  };

  return (
    <div className="register" style={{ padding: '20px' }}>
      <div className="register-container">
        <h2 className="register-title">CREATE AN ACCOUNT</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="nombre">Name</label>
              <input type="text" className="form-control" id="nombre" name="nombre" placeholder="First Name" value={form.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="apellido">Last Name</label>
              <input type="text" className="form-control" id="apellido" name="apellido" placeholder="Last Name" value={form.apellido} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="genero">Gender</label>
            <select className="form-control" id="genero" name="genero" value={form.genero} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Masculino">Male</option>
              <option value="Femenino">Female</option>
              <option value="Otro">Other</option>
              <option value="Prefiero no decir">Prefer not to say</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="email">E-mail Address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="your.email@example.com" value={form.email} onChange={handleChange} required />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" name="password" placeholder="At least 8 characters" value={form.password} onChange={handleChange} required />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Repeat Password" value={form.confirmPassword} onChange={handleChange} required />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="edad">Age</label>
            <input type="number" className="form-control" id="edad" name="edad" min="5" max="120" placeholder="Age" value={form.edad} onChange={handleChange} required />
          </div>

          <fieldset className="form-group" style={{ marginBottom: '15px' }}>
            <legend className="dob-legend">Birth Date</legend>
            <div className="dob-group" style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="regDobDay">Day</label>
                <select className="form-control" id="regDobDay" name="regDobDay">
                  <option value="">Day</option>
                  {days.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="regDobMonth">Month</label>
                <select className="form-control" id="regDobMonth" name="regDobMonth">
                  <option value="">Month</option>
                  {months.map((month, index) => <option key={index} value={index + 1}>{month}</option>)}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="regDobYear">Year</label>
                <select className="form-control" id="regDobYear" name="regDobYear">
                  <option value="">Year</option>
                  {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>
            </div>
          </fieldset>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="pais">Country</label>
            <input type="text" className="form-control" id="pais" name="pais" placeholder="Country" value={form.pais} onChange={handleChange} required />
          </div>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="departamento">State / Department</label>
              <input type="text" className="form-control" id="departamento" name="departamento" placeholder="State / Dept." value={form.departamento} onChange={handleChange} required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="ciudad">City</label>
              <input type="text" className="form-control" id="ciudad" name="ciudad" placeholder="City" value={form.ciudad} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn btn-register">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;
