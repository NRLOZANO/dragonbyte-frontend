import React, { useState, useEffect } from 'react';
import UsuarioCard from '../components/UsuarioCard'; 
import fotoNelson from '../assets/img/Nelson.jpg';
import fotoPaola from '../assets/img/Paola.jpg';
import fotoSalome from '../assets/img/Salome.jpg';
import fotoPaulina from '../assets/img/Paulina.jpg';
import fondoFAQDragon from '../assets/img/FAQDragon.jpeg';
import api from '../services/api';
import './ListaUsuarios.css';

const mapaImagenes = {
  'Nelson Lozano': fotoNelson,
  'Paola Molina': fotoPaola,
  'Salome Alzate': fotoSalome,
  'Paulina Londoño': fotoPaulina
};

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await api.get('/usuarios');
        
        const usuariosConFotos = response.data.map(user => ({
          ...user,
          imagen: mapaImagenes[user.nombre] || null
        }));

        setUsuarios(usuariosConFotos); 
      } catch (error) {
        console.error(error);
      }
    };

    obtenerUsuarios();
  }, []); 

  return (
    <div className="lista-usuarios-wrapper" style={{ 
      backgroundImage: `url(${fondoFAQDragon})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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