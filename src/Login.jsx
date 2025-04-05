import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { role } = location.state || {};
  console.log("role", role);

  const handleChange = (e) => {

  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", credentials);
    // Add your auth logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Box
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <Typography variant="h5" className="text-center text-gray-700 font-bold">
          {role + " "}Login
        </Typography>
        <div className=" flex flex-col  gap-3 mt-3">
          <TextField
            label="Email"
            name="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

        </div>



        <Button type="submit" variant="contained" fullWidth color="primary" >
          Login
        </Button>
        <div className="mt-3">
          <Typography variant="body2" className="text-center text-gray-500">
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </Typography>

        </div>


      </Box>
    </div>
  );
};


export default Login;