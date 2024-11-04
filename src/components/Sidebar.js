// src/components/Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import List from "@mui/material/List";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const DrawerList = (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <ListItemIcon>
              <DashboardIcon sx={{ color: "#98E1DA" }} />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} sx={{ color: "#98E1DA" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <AccountBoxIcon sx={{ color: "#98E1DA" }} />
            </ListItemIcon>
            <ListItemText primary={"My Profile"} sx={{ color: "#98E1DA" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  /*
    <div className="sidebar">
        <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-purchase">Add Purchase</Link></li>
            <li><Link to="/add-goal">Add Goals</Link></li>
            <li><Link to="/user-profile">Profile</Link></li>
            <li><Link to="/goals">View Goals</Link></li>
        </ul>
    </div>
    */

  return (
    <div>
      <Drawer
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { backgroundColor: "#017d84" } }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Sidebar;
