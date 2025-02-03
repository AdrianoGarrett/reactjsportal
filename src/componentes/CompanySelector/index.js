import { useState, useEffect } from "react";
import axios from "axios";
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";

const CompanySelector = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId"); // Obtém o ID do usuário

        if (!userId) {
            console.error("Erro: Nenhum userId encontrado no localStorage");
            return;
        }

        axios.get(`http://localhost:8080/companies/user/${userId}`)
            .then(response => setCompanies(response.data))
            .catch(error => console.error("Erro ao buscar empresas:", error));
    }, []);

    const handleCompanySelect = (event) => {
        const companyId = event.target.value;
        setSelectedCompany(companyId);
        localStorage.setItem("companyId", companyId);
        console.log("Empresa selecionada:", companyId);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", mt: 2 }}>
            <FormControl fullWidth sx={{ minWidth: 200, mb: 4 }}>
                <InputLabel >Selecione a Empresa</InputLabel>
                <Select value={selectedCompany} onChange={handleCompanySelect}>
                    <MenuItem value="">
                        <em>Selecione uma empresa</em>
                    </MenuItem>
                    {companies.map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                            {company.companyName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {selectedCompany && (
                <Typography variant="body1">
                    Empresa selecionada:{" "}
                    <strong>{companies.find((c) => c.id === Number(selectedCompany))?.companyName}</strong>
                </Typography>
            )}
        </Box>
    );
};

export default CompanySelector;
