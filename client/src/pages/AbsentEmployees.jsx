import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const absentEmployees = [
  {
    id: 1,
    name: "John Doe",
    position: "Software Engineer",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Project Manager",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
  },
];

export default function AbsentEmployees() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f2f2f8ef 0%, #f4f4f8ff 100%)",
        color: "#0c0b0bff",
        p: isMobile ? 2 : 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Back button */}
      <Box sx={{ mb: 3 }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ color: "#90caf9" }}
          aria-label="go back"
          size={isMobile ? "small" : "medium"}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#4a5463ff",
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(8, 8, 8, 0.6)",
          p: 4,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            fontWeight: "700",
            mb: 4,
            textAlign: "center",
            color: "#90caf9",
            letterSpacing: 3,
          }}
        >
          Absent Employees ({absentEmployees.length})
        </Typography>

        <Paper
          sx={{
            maxHeight: "60vh",
            overflowY: "auto",
            bgcolor: "#0b0b0bff",
            borderRadius: 2,
          }}
          elevation={8}
        >
          <List>
            {absentEmployees.map(({ id, name, position, avatarUrl }) => (
              <React.Fragment key={id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={avatarUrl} alt={name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={position}
                    primaryTypographyProps={{ fontWeight: 600, color: "#fff" }}
                    secondaryTypographyProps={{ color: "#bbb" }}
                  />
                </ListItem>
                <Divider component="li" sx={{ bgcolor: "#ab9d9dff" }} />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
