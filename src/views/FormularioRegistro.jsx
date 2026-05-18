import React from 'react';
import './Registro.css';

const FormularioRegistro = () => {
  // Generamos los arreglos para las listas desplegables (Dropdowns) dinámicamente
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  // Genera un rango de 100 años hacia atrás desde el año actual
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="register" style={{ padding: '20px' }}> 
      <div className="register-container">
        <h2 className="register-title">CREATE AN ACCOUNT</h2>
        <form id="registrationForm">

          {/* NAME & LAST NAME (Agrupados en una fila) */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="regName">Name</label>
              <input type="text" className="form-control" id="regName" name="regName" placeholder="First Name" required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="regLastName">Last Name</label>
              <input type="text" className="form-control" id="regLastName" name="regLastName" placeholder="Last Name" required />
            </div>
          </div>

          {/* GENDER */}
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="regGender">Gender</label>
            <select className="form-control" id="regGender" name="regGender" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* E-MAIL */}
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="regEmail">E-mail Address</label>
            <input type="email" className="form-control" id="regEmail" name="regEmail" placeholder="your.email@example.com" required />
          </div>

          {/* PASSWORD & CONFIRM PASSWORD */}
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="regPassword">Password</label>
            <input type="password" className="form-control" id="regPassword" name="regPassword" placeholder="At least 8 characters" required />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="regConfirmPassword">Confirm Password</label>
            <input type="password" className="form-control" id="regConfirmPassword" name="regConfirmPassword" placeholder="Repeat Password" required />
          </div>

          {/* AGE */}
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="regAge">Age</label>
            <input type="number" className="form-control" id="regAge" name="regAge" min="5" max="120" placeholder="Age" required />
          </div>

          {/* BIRTH DATE (Listas dinámicas) */}
          <fieldset className="form-group" style={{ marginBottom: '15px' }}>
            <legend className="dob-legend">Birth Date</legend>
            <div className="dob-group" style={{ display: 'flex', gap: '10px' }}>
              
              <div style={{ flex: 1 }}>
                <label htmlFor="regDobDay">Day</label>
                <select className="form-control" id="regDobDay" name="regDobDay" required>
                  <option value="">Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label htmlFor="regDobMonth">Month</label>
                <select className="form-control" id="regDobMonth" name="regDobMonth" required>
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>{month}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label htmlFor="regDobYear">Year</label>
                <select className="form-control" id="regDobYear" name="regDobYear" required>
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

            </div>
          </fieldset>

          {/* COUNTRY */}
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="regCountry">Country</label>
            <input type="text" className="form-control" id="regCountry" name="regCountry" placeholder="Country" required />
          </div>

          {/* STATE & CITY (Agrupados en una fila) */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="regState">State / Department</label>
              <input type="text" className="form-control" id="regState" name="regState" placeholder="State / Dept." required />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="regCity">City</label>
              <input type="text" className="form-control" id="regCity" name="regCity" placeholder="City" required />
            </div>
          </div>

          <button type="submit" className="btn btn-register">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;