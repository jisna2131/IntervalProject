import React from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TotalEmployeesPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Sample employees data
  const employees = [
    { id: 1, name: "Alice Johnson", department: "HR" },
    { id: 2, name: "Bob Smith", department: "Engineering" },
    { id: 3, name: "Charlie Brown", department: "Marketing" },
    { id: 4, name: "Diana Prince", department: "Finance" },
    { id: 5, name: "Ethan Hunt", department: "Security" },
    { id: 6, name: "Fiona Gallagher", department: "HR" },
    { id: 7, name: "George Michael", department: "Engineering" },
    { id: 8, name: "Hannah Baker", department: "Marketing" },
    { id: 9, name: "Ian Fleming", department: "Finance" },
    { id: 10, name: "Jane Doe", department: "Security" },
  ];

  // Department colors mapping
  const deptColors = {
    HR: "primary",
    Engineering: "success",
    Marketing: "warning",
    Finance: "info",
    Security: "error",
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
          letterSpacing: 1,
          color: theme.palette.primary.main,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Total Employees Details
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, textAlign: "center", color: theme.palette.text.secondary }}
      >
        Detailed info about all employees in the company.
      </Typography>

      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          mb: 4,
          borderRadius: 3,
          overflowX: "auto",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <Table
          sx={{ minWidth: 350 }}
          aria-label="employees table"
          size={isMobile ? "small" : "medium"}
        >
          <TableHead
            sx={{
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            <TableRow>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", fontSize: isMobile ? 14 : 16 }}
              >
                #
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", fontSize: isMobile ? 14 : 16 }}
              >
                Employee Name
              </TableCell>
              <TableCell
                sx={{ color: "white", fontWeight: "bold", fontSize: isMobile ? 14 : 16 }}
              >
                Department
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(({ id, name, department }, index) => (
              <TableRow
                key={id}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? theme.palette.action.hover : "inherit",
                  cursor: "default",
                }}
              >
                <TableCell sx={{ fontWeight: "medium", fontSize: isMobile ? 13 : 15 }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ fontSize: isMobile ? 13 : 15 }}>{name}</TableCell>
                <TableCell>
                  <Chip
                    label={department}
                    color={deptColors[department] || "default"}
                    variant="outlined"
                    sx={{ fontWeight: "medium", fontSize: isMobile ? 12 : 14 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ maxWidth: 400, mx: "auto" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
          fullWidth
          size={isMobile ? "medium" : "large"}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
}
