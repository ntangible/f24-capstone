// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import { Box } from "@mui/material";

const Sidebar = ({ children }) => (
  <Box sx={{ display: "flex" }}>
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/add-purchase">Add Purchase</Link>
        </li>
        <li>
          <Link to="/add-goal">Add Goals</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/goals">View Goals</Link>
        </li>
      </ul>
    </div>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      {children}
    </Box>
  </Box>
);

export default Sidebar;
