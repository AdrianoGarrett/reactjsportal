import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/"); // Redireciona corretamente para a tela de login
  };

  const menuItems = [
    { text: "Main Page", path: "/mainpage" },
    { text: "Customers", path: "/customers" },
    { text: "Dashboard", path: "/dashboard" },
    { text: "Products", path: "/products" },
    { text: "Account", path: "/account" },
    { text: "Settings", path: "/settings" },
    { text: "Logout", onClick: handleLogout, isLogout: true },
  ];

  return (
    <Box sx={{ width: "250px", backgroundColor: "#800000", color: "white", padding: "20px" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Easy CM
      </Typography>
      <List>
        {menuItems.map(({ text, path, onClick, isLogout }) => (
          <ListItem
            button
            key={text}
            component={path ? Link : "div"} // Se tiver path, usa Link; senão, usa div
            to={path || undefined}
            onClick={onClick}
            sx={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
