import React from 'react';

const UsuarioCard = ({ usuario }) => {
  return (
    <div style={{ 
      border: '1px solid #db5cc8', 
      padding: '25px', 
      borderRadius: '15px', 
      minWidth: '240px', 
      backgroundColor: 'rgba(30, 2, 50, 0.8)',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(10px)'
    }}>
      
      {usuario.imagen && (
        <img 
          src={usuario.imagen} 
          alt={usuario.nombre} 
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%',
            objectFit: 'contain', 
            backgroundColor: '#ffffff', 
            padding: '5px',
            marginBottom: '20px', 
            border: '4px solid #db5cc8',
            boxShadow: '0 0 15px rgba(219, 92, 200, 0.5)' 
          }} 
        />
      )}

      <h3 style={{ margin: '0 0 10px 0', color: '#db5cc8', fontSize: '1.4em' }}>{usuario.nombre}</h3>
      <p style={{ margin: '5px 0', fontSize: '0.95em' }}><strong>{usuario.rol}</strong></p>
      <p style={{ margin: '8px 0', fontSize: '0.85em', color: '#B0A5C8', fontStyle: 'italic' }}>{usuario.email}</p>
    </div>
  );
};

export default UsuarioCard;