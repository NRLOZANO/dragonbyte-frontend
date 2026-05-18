import { Link } from 'react-router-dom';

const NoEncontrado = () => {
  return (
    <div className="vista-error" style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
      <h1 style={{ fontSize: '4rem', color: '#ff4444', margin: '0' }}>404</h1>
      <h2>Página no encontrada</h2>
      <p>Te equivocaste de página. La ruta que buscas no existe.</p>
      
      
      <Link to="/" style={{
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        background: '#5D3B8C',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
      }}>
        Regresar a lugar seguro (Inicio)
      </Link>
    </div>
  );
}

export default NoEncontrado;