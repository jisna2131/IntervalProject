import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, Box, TextField, Typography, Button, Paper } from "@mui/material";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);
      alert(`Welcome ${res.data.user.name}`);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "flex-start", mt: 8 }}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Welcome! Please login to continue.
        </Typography>
        <Paper elevation={3} sx={{ p: 4, width: 400 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
