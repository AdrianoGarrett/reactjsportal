import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { text: "Overview", path: "/" },
    { text: "Customers", path: "/customers" },
    { text: "Dashboard", path: "/dashboard" },
    { text: "Companies", path: "/companies" },
    { text: "Account", path: "/account" },
    { text: "Settings", path: "/settings" },
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
    { text: "Error", path: "/error" },
  ];

  return (
     <Box sx={{ width: "250px", backgroundColor: "#800000", color: "white", padding: "20px" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Easy CM
      </Typography>
      <List>
        {menuItems.map(({ text, path }) => (
          <ListItem button key={text} component={Link} to={path} sx={{ color: "white", textDecoration: "none" }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
