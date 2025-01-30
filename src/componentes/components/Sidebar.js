import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const Sidebar = () => {
  return (
    <Box sx={{ width: "250px", backgroundColor: "#800000", color: "white", padding: "20px" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Easy CM
      </Typography>
      <List>
        {["Overview", "Customers", "Companies", "Account", "Settings", "Login", "Register", "Error"].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
