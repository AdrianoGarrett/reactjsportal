import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Card, CardContent } from "@mui/material";
import CompanySelector from '../CompanySelector';

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />
    <CompanySelector />
    </Box>
  );
};

export default Dashboard;
