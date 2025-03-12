import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log("ProtectedRoute -> isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.warn("🔴 Usuário não autenticado! Redirecionando para login...");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
