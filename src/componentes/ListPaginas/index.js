import React from 'react';
import { Card, List } from 'antd';
import { useNavigate } from 'react-router-dom'; // Importando o hook de navegação

const data = [
  {
    title: 'Dashboard',
    route: '/dashboard', // Definindo a rota de navegação
  },
  {
    title: 'Title 2',
    route: '/title2',
  },
  {
    title: 'Title 3',
    route: '/title3',
  },
  {
    title: 'Title 4',
    route: '/title4',
  },
];

const ListPaginas = () => {
  const navigate = useNavigate(); // Inicializando o hook de navegação

  // Função para redirecionar ao clicar
  const handleClick = (route) => {
    navigate(route);
  };

  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title} onClick={() => handleClick(item.route)} style={{ cursor: 'pointer' }}>
            {item.title}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ListPaginas;
