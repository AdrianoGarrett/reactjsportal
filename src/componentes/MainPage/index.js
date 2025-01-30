import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e6f7ff',
      }}
    >
      <h1>Bem-vindo ao Dashboard!</h1>
    </div>
    </Box>
  );
};

export default Dashboard;
