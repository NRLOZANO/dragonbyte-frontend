import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import FormularioRegistro from './views/FormularioRegistro';
import Graficos from './views/Graficos';
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
          <Route path="/principal" element={<ProtectedRoute><PaginaPrincipal /></ProtectedRoute>} />
          <Route path="/comunidad" element={<ProtectedRoute requiredRole="ADMIN"><ListaUsuarios /></ProtectedRoute>} />
          <Route path="/graficos" element={<ProtectedRoute requiredRole="ADMIN"><Graficos /></ProtectedRoute>} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
