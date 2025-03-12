import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, TextField, Button, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import Sidebar from "../components/Sidebar";

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
  const companyId = localStorage.getItem("companyId");
  
  const fetchCustomers = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/customers/${companyId}`)
      .then((response) => {
        const data = response.data.map((customer) => ({
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phoneNumber: customer.phoneNumber || customer.PhoneNumber,
          city: customer.city,
          state: customer.state,
          country: customer.country,
          gender: customer.gender,
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
   const customerData = { ...newCustomer, companyId };

    axios
      .post("http://localhost:8080/api/customers", customerData)
      .then((response) => {
        const newRow = {
          id: response.data.id,
          companyId: companyId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber || response.data.PhoneNumber,
          city: response.data.city,
          state: response.data.state,
          country: response.data.country,
          gender: response.data.gender,
        };

        // Atualiza as linhas do DataGrid com o novo cliente
        setRows((prevRows) => [...prevRows, newRow]);

        // Limpa os campos após a submissão
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
        
        // Recarrega os dados do cliente para garantir que a inserção seja refletida
        fetchCustomers();
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
      <Sidebar />

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", padding: 2 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexWrap: "wrap", gap: 2, padding: 2 }}>
          <TextField label="First Name" name="firstName" value={newCustomer.firstName} onChange={handleInputChange} required />
          <TextField label="Last Name" name="lastName" value={newCustomer.lastName} onChange={handleInputChange} required />
          <TextField label="Email" name="email" value={newCustomer.email} onChange={handleInputChange} required />
          <TextField label="Phone" name="phoneNumber" value={newCustomer.phoneNumber} onChange={handleInputChange} required />
          <TextField label="City" name="city" value={newCustomer.city} onChange={handleInputChange} required />
          <TextField label="State" name="state" value={newCustomer.state} onChange={handleInputChange} required />
          <TextField label="Country" name="country" value={newCustomer.country} onChange={handleInputChange} required />
          <FormControl required sx={{ width: "20%"}}>
          <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={newCustomer.gender}
              onChange={handleInputChange}
              label="Gender"
            >
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Add Customer
          </Button>
        </Box>

        <Box sx={{ height: 400 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} density="compact" hideFooter />
          )}
        </Box>
      </Box>
    </Box>
  );
}
