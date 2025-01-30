import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./componentes/Login";
import MainPage from "./componentes/MainPage";
import Dashboard from "./componentes/Dashboard";
import Customers from "./componentes/Customers";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/mainpage"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />

          {/* 🚀 Evita erro ao recarregar a página */}
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
