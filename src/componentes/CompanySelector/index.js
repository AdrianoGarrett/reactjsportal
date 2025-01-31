import { useState, useEffect } from "react";
import axios from "axios";

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
    <div>
      <h2>Selecione a Empresa</h2>
      <select value={selectedCompany} onChange={handleCompanySelect}>
        <option value="">Selecione uma empresa</option>
        {companies.map(company => (
          <option key={company.id} value={company.id}>
            {company.companyName}
          </option>
        ))}
      </select>
      {selectedCompany && (
        <p>Empresa selecionada: {companies.find(c => c.id === Number(selectedCompany))?.companyName}</p>
      )}
    </div>
  );
};

export default CompanySelector;
