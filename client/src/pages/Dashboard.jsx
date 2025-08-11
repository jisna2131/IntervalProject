import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  const totalEmployees = 10;
  const absentEmployees = 2;
  const presentEmployees = totalEmployees - absentEmployees;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isMobile ? mobileOpen : desktopOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#e3e3eaff",
            borderRight: "none",
          },
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` },
          marginLeft: { sm: desktopOpen ? `${drawerWidth}px` : 0 },
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          minHeight: "100vh",
          background: "linear-gradient(135deg, #3a416f 0%, #2f335c 100%)",
          color: "#E0E0E0",
        }}
      >
        {/* Menu Icon on Mobile */}
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ mb: 2, color: "#BB86FC" }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        )}

        <Container
          maxWidth="lg"
          sx={{
            borderRadius: 3,
            p: 4,
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
            backgroundColor: "rgba(255 255 255 / 0.1)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              mb: 4,
              textAlign: "center",
              letterSpacing: 2,
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: "#BB86FC",
            }}
          >
            Employee Dashboard
          </Typography>

          <Grid container spacing={5}>
            {[
              {
                label: "Total Employees",
                value: totalEmployees,
                bg: "linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%)",
                shadow: "0 12px 25px rgba(241, 7, 163, 0.7)",
                route: "/totalemployees",
              },
              {
                label: "Absent Employees",
                value: absentEmployees,
                bg: "linear-gradient(135deg, #ff5858 0%, #f09819 100%)",
                shadow: "0 12px 25px rgba(240, 152, 25, 0.7)",
                route: "/absentemployees",
              },
              {
                label: "Present Employees",
                value: presentEmployees,
                bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
                shadow: "0 12px 25px rgba(56, 239, 125, 0.7)",
                route: null,
              },
            ].map(({ label, value, bg, shadow, route }) => (
              <Grid item xs={12} sm={4} key={label}>
                <Paper
                  elevation={8}
                  onClick={() => route && navigate(route)}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: bg,
                    color: "white",
                    cursor: route ? "pointer" : "default",
                    transition: "transform 0.3s ease",
                    "&:hover": route
                      ? {
                          transform: "scale(1.05)",
                          boxShadow: shadow,
                        }
                      : {},
                    userSelect: "none",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {label}
                  </Typography>
                  <Box sx={{ fontSize: 60, fontWeight: "bold", mt: 2 }}>
                    {value}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
