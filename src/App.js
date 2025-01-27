import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './componentes/Login';
import MainPage from './componentes/MainPage';
import Dashboard from './componentes/Dashboard';
import ListPaginas from './componentes/ListPaginas';

const App = () => {
  return (
    <AuthProvider> {/* Provedor do contexto de autenticação */}
      <Router>
        <Routes>
          {/* Rota pública */}
          <Route path="/" element={<Login />} />

          {/* Rota protegida */}
          <Route
            path="/mainpage"
            element={
              <ProtectedRoute>
                <MainPage />
                <ListPaginas/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
