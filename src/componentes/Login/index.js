import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Importa o contexto de autenticação

const Login = () => {
  const navigate = useNavigate(); // Hook para redirecionamento
  const { login } = useAuth(); // Pega o método de login do contexto

  const onFinish = async (values) => {
    console.log('Form values:', values);

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response from API:', data);

        // Chama o método login do contexto
        login(); // Atualiza o estado global para "autenticado"

        // Redireciona para o dashboard
        navigate('/mainpage');
      } else {
        console.error('Erro ao realizar login:', response.statusText);
        alert('Erro no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se à API:', error);
      alert('Não foi possível conectar ao servidor.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
          width: '100%',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Por favor, insira seu nome de usuário!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor, insira sua senha!',
            },
          ]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembrar-me</Checkbox>
            </Form.Item>
            <a href="">Esqueceu sua senha?</a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          ou <a href="">Registrar agora!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
