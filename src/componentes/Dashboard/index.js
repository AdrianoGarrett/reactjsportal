import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { BarChart, DoughnutChart } from "../components/Charts";
import Sidebar from "../components/Sidebar"; // Importando de 'components'

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Área Principal */}
      <Box sx={{ flex: 1, padding: "20px", backgroundColor: "#f4f6f8" }}>
        {/* Títulos */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>

        {/* Cards de Resumo */}
        <Box sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Budget</Typography>
              <Typography variant="h4">$24k</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Customers</Typography>
              <Typography variant="h4">1.6k</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Task Progress</Typography>
              <Typography variant="h4">75.5%</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Total Profit</Typography>
              <Typography variant="h4">$15k</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Gráficos */}
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Box sx={{ flex: 2 }}>
            <Typography variant="h6">Sales</Typography>
            <BarChart />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Traffic Source</Typography>
            <DoughnutChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;