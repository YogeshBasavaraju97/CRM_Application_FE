import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { removeUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from "react-confirm-alert";
import toast from "react-hot-toast";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ FIXED

  const user = useSelector((store) => store.user);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
              dispatch(removeUser());
              toast.success('Logged out successfully');
              navigate("/role-selection");
            } catch (error) {
              console.error("Logout failed:", error);
              toast.error("Logout failed");
            }
          }
        },
        {
          label: 'No',
          onClick: () => {
            console.log('Logout cancelled');
          }
        }
      ]
    });
  };

  return (
    <AppBar position="fixed" elevation={1} className="bg-blue-600 shadow-sm">
      <Toolbar className="flex justify-between px-4">
        <Typography variant="h6" className="text-gray-800 font-bold">
          {user ? `${user.role}` : "CRM"}
        </Typography>

        {user && (
          <Box>
            <IconButton onClick={handleMenuOpen} size="small">
              <Avatar sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}>
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                className: 'mt-2',
                style: {
                  minWidth: 150,
                },
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
