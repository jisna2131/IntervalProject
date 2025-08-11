import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", data);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          p: 4,
          mt: 8,
          borderRadius: 3,
          background:
            "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Create Account
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mb: 3 }}
        >
          Fill in your details to register
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Name */}
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            {...register("name", {
              required: "Name is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              fontSize: "1rem",
              textTransform: "none",
              borderRadius: 2,
              background:
                "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
