import React, { useState } from 'react';
import UsuarioCard from '../components/UsuarioCard'; 
import fotoNelson from '../assets/img/Nelson.jpg';
import fotoPaola from '../assets/img/Paola.jpg';
import fotoSalome from '../assets/img/Salome.jpg';
import fotoPaulina from '../assets/img/Paulina.jpg';
import fondoFAQDragon from '../assets/img/FAQDragon.jpeg';
import './ListaUsuarios.css';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Nelson Lozano', rol: 'Analista WFM', email: 'nelson@ejemplo.com', imagen: fotoNelson },
    { id: 2, nombre: 'Salome Alzate', rol: 'Estudiante', email: 'msalomealzatep@gmail.com', imagen: fotoSalome },
    { id: 3, nombre: 'Paulina Londoño', rol: 'Estudiante', email: 'paulinalondonodiaz45@gmail.com', imagen: fotoPaulina },
    { id: 4, nombre: 'Paola Molina', rol: 'Gerente de Proyecto', email: 'Pmova13@gmail.com', imagen: fotoPaola }
  ]);

  return (
    <div className="lista-usuarios-wrapper" style={{ 
      backgroundImage: `url(${fondoFAQDragon})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      /* Use scroll so background behaves per-page and doesn't create fixed viewport issues */
      backgroundAttachment: 'scroll',
      flex: 1,
      width: '100%',
      paddingBottom: '20px', 
      boxSizing: 'border-box'
    }}>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '40px', fontSize: '2.5em', textTransform: 'uppercase', letterSpacing: '2px' }}>
        DragonByte Team
      </h2>
      <div className="usuarios-grid">
        {usuarios.map((user) => (
          <UsuarioCard key={user.id} usuario={user} />
        ))}
      </div>
    </div>
  );
};

export default ListaUsuarios;