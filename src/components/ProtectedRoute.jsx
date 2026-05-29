import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token) return <Navigate to="/" replace />;
  if (requiredRole && rol !== requiredRole) return <Navigate to="/principal" replace />;

  return children;
};

export default ProtectedRoute;
