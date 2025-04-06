import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { role } = location.state || {};
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();


  const handleClick = async () => {
    setError("");
    {
      try {
        if (signup) {
          const response = await axios.post(BASE_URL + "/signup", { name, emailId, password, role }, { withCredentials: true });
          toast.success("signup successful");
          console.log(response.status);
          if (response.status === 200) {
            setSignup(!signup);
            setEmailId("");
            setPassword("");
          }

        }
        if (!signup) {
          const response = await axios.post(BASE_URL + "/login", { emailId, password, role }, { withCredentials: true });
          toast.success("login successful");
          dispatch(addUser(response.data));


          if (response.status === 200) {
            if (role === 'admin') {
              navigate("/admin");
            }
            if (role === 'telecaller') {
              navigate("/telecaller");
            }
            setEmailId("");
            setPassword("");
          }
        }
      } catch (error) {
        setError(error.response.data);
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Box
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <Typography variant="h5" className="text-center text-gray-700 font-bold">
          {role + " "} {signup ? "Signup" : "Login"}
        </Typography>
        <div className=" flex flex-col  gap-3 mt-3">
          {signup &&
            <TextField
              label="name"
              name="name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          }

          <TextField
            label="EmailId"
            name="emailId"
            fullWidth
            variant="outlined"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
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
        {error && <p className="text-red-400">{error}</p>}

        <Button onClick={handleClick} variant="contained" fullWidth color="primary" >
          {signup ? "Signup" : "Login"}
        </Button>
        <div className="mt-3">
          <Typography variant="body2" className="text-center text-gray-500">
            {" "}
            <Button onClick={() => setSignup(!signup)} className="text-blue-600 hover:underline"
            >
              {signup ? "have an account? Login" : " Don’t have an account? signup"}
            </Button>
          </Typography>
        </div>
      </Box>
    </div>
  );
};


export default Login;