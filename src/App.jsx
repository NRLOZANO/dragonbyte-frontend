import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import FormularioRegistro from './views/FormularioRegistro';
import ListaUsuarios from './views/ListaUsuarios';
import Login from './views/Login';
import NoEncontrado from './views/NoEncontrado'; 
import PaginaPrincipal from './views/PaginaPrincipal';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<FormularioRegistro />} />
          <Route path="/comunidad" element={<ListaUsuarios />} />
          <Route path="/principal" element={<PaginaPrincipal />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;