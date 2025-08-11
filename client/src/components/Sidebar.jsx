// Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  Box
} from "@mui/material";
import {
  Dashboard,
  ExitToApp,
  People,
  Assignment,
  EventAvailable,
  TimeToLeave,
  BarChart,
  Settings,
  Menu as MenuIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const LogoBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
});

export default function Sidebar({ mobileOpen, handleDrawerToggle }) {
  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Employee Management", icon: <People /> },
    { text: "Requirements", icon: <Assignment /> },
    { text: "Attendance", icon: <EventAvailable /> },
    { text: "Leave", icon: <TimeToLeave /> },
    { text: "Reports", icon: <BarChart /> },
    { text: "Settings", icon: <Settings /> },
    { text: "Logout", icon: <ExitToApp /> },
  ];

  const drawerContent = (
    <div>
      {/* Logo */}
      <LogoBox>
        <img
          src="/logo.png" // Place your uploaded image in public folder & rename to logo.png
          alt="Interval Logo"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </LogoBox>

      <Divider />

      {/* Menu Items */}
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text}>
            <ListItemIcon sx={{ color: "#1976d2" }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
