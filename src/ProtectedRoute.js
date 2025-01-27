import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Verifica se está autenticado

  // Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Renderiza o componente protegido se autenticado
  return children;
};

export default ProtectedRoute;
