import { useState } from "react";
import { 
    Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    Select, MenuItem, FormControl, InputLabel, Typography, IconButton 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Close";
import Sidebar from '../components/Sidebar';

const InvoiceForm = () => {
    const [rows, setRows] = useState([
        { id: 1, tipo: "", loja: "", invoice: "", data: "", qtd: 1, item: "", preco: 0, tax: 0, total: 0 }
    ]);

    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    });

    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];

        // Garantir que valores numéricos sejam positivos e convertidos corretamente
        if (["qtd", "preco", "tax"].includes(field)) {
            value = parseFloat(value) >= 0 ? parseFloat(value) : 0;
        }

        updatedRows[index][field] = value;

        // Recalcula o total automaticamente
        if (["qtd", "preco", "tax"].includes(field)) {
            const qtd = parseFloat(updatedRows[index].qtd) || 0;
            const preco = parseFloat(updatedRows[index].preco) || 0;
            const tax = parseFloat(updatedRows[index].tax) || 0;
            updatedRows[index].total = (qtd * preco) + tax;
        }

        setRows(updatedRows);
    };

    const addRow = () => {
        setRows([...rows, { id: Date.now(), tipo: "", loja: "", invoice: "", data: "", qtd: 1, item: "", preco: 0, tax: 0, total: 0 }]);
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("https://suaapi.com/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(rows),
            });

            if (!response.ok) {
                throw new Error("Erro ao enviar os dados");
            }

            const data = await response.json();
            console.log("Resposta da API:", data);
            alert("Dados enviados com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar:", error);
            alert("Erro ao enviar os dados.");
        }
    };

    // Calcula o total acumulado da última coluna
    const totalGeral = rows.reduce((sum, row) => sum + row.total, 0);

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Sidebar />

            <Box sx={{ padding: 3, maxWidth: 1200, margin: "auto", width: "100%" }}>
                
                {/* Total Geral */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Total Products Cost: {currencyFormatter.format(totalGeral)}
                    </Typography>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Store</TableCell>
                                <TableCell>Invoice</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Unity Price</TableCell>
                                <TableCell>Tax</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <FormControl fullWidth>
                                            <InputLabel>Type</InputLabel>
                                            <Select
                                                value={row.tipo}
                                                onChange={(e) => handleChange(index, "tipo", e.target.value)}
                                            >
                                                <MenuItem value="Fuel">Fuel</MenuItem>
                                                <MenuItem value="Consumption">Consumption</MenuItem>
                                                <MenuItem value="Food">Food</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <TextField fullWidth value={row.loja} onChange={(e) => handleChange(index, "loja", e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField fullWidth value={row.invoice} onChange={(e) => handleChange(index, "invoice", e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField fullWidth type="date" value={row.data} onChange={(e) => handleChange(index, "data", e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            type="number" 
                                            value={row.qtd} 
                                            onChange={(e) => handleChange(index, "qtd", e.target.value)} 
                                            inputProps={{ min: 0 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField fullWidth value={row.item} onChange={(e) => handleChange(index, "item", e.target.value)} />
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            type="number" 
                                            value={row.preco} 
                                            onChange={(e) => handleChange(index, "preco", e.target.value)} 
                                            inputProps={{ min: 0 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            type="number" 
                                            value={row.tax} 
                                            onChange={(e) => handleChange(index, "tax", e.target.value)} 
                                            inputProps={{ min: 0 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField 
                                            fullWidth 
                                            value={currencyFormatter.format(row.total)} 
                                            disabled 
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleDeleteRow(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Botões */}
                <Box sx={{ marginTop: 3, display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button variant="contained" color="primary" onClick={addRow}>+ Add</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default InvoiceForm;
