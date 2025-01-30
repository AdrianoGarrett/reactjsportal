import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Importa o contexto de autenticação

const Login = () => { // ✅ Criamos a função que define o componente Login
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtém a função login do contexto de autenticação

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from API:', data);

        localStorage.setItem("token", data.token); // Salva o token no localStorage
        login(data.token); // Atualiza o contexto de autenticação

        navigate('/mainpage');
      } else {
        alert('Erro no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se à API:', error);
      alert('Não foi possível conectar ao servidor.');
    }
  };

  return ( // ✅ Agora o return está dentro da função Login()
    <div
      style={{
        display: 'flex',
        height: '100vh',
      }}
    >
      {/* Seção do formulário */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#800000', // Vermelho escuro
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ color: '#fff', fontWeight: 'bold' }}>Control your business</h1>
        <Form
          name="login"
          style={{ width: '300px' }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Por favor, insira seu login!' }]}
          >
            <Input placeholder="Login" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input type="password" placeholder="Senha" />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" style={{ backgroundColor: '#FFC107', border: 'none' }}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Seção do logotipo */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src="logo.png" alt="Easy Construction Management" style={{ maxWidth: '300px' }} />
      </div>
    </div>
  );
};

export default Login;
