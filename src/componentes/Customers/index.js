import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import Sidebar from '../components/Sidebar';

export default function Customers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    gender: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        const data = response.data.map((customer, index) => ({
          id: customer.id || index + 1,
          ...customer,
        }));
        setRows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/customers", newCustomer)
      .then((response) => {
        setRows([...rows, { id: response.data.id, ...response.data }]);
        setNewCustomer({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          city: "",
          state: "",
          country: "",
          gender: "",
        });
      })
      .catch((error) => {
        console.error("Erro ao adicionar cliente:", error);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 150 },
    { field: "city", headerName: "City", width: 120 },
    { field: "state", headerName: "State", width: 120 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "gender", headerName: "Gender", width: 120 },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
    {/* Sidebar */}
    <Sidebar />
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      {/* Lateral esquerda com 30% da tela */}
      <div style={{ width: "20%", backgroundColor: "#800000" }}></div>

      {/* Conteúdo principal com 70% da tela */}
      <div style={{ width: "70%", padding: "20px" }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", gap: 2, padding: 2 }}>
          <TextField label="First Name" name="firstName" value={newCustomer.firstName} onChange={handleInputChange} required />
          <TextField label="Last Name" name="lastName" value={newCustomer.lastName} onChange={handleInputChange} required />
          <TextField label="Email" name="email" value={newCustomer.email} onChange={handleInputChange} required />
          <TextField label="Phone" name="phoneNumber" value={newCustomer.phoneNumber} onChange={handleInputChange} required />
          <TextField label="City" name="city" value={newCustomer.city} onChange={handleInputChange} required />
          <TextField label="State" name="state" value={newCustomer.state} onChange={handleInputChange} required />
          <TextField label="Country" name="country" value={newCustomer.country} onChange={handleInputChange} required />
          <TextField label="Gender" name="gender" value={newCustomer.gender} onChange={handleInputChange} required />
          <Button type="submit" variant="contained" color="primary">
            Add Customer
          </Button>
        </Box>

        <div style={{ height: 400 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} density="compact" hideFooter />
          )}
        </div>
      </div>
    </div>
    </Box>
  );
}
