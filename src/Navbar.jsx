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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    handleMenuClose();
  };

  return (
    <AppBar position="fixed"
      elevation={1}
      className="bg-blue-600 shadow-sm">
      <Toolbar className="flex justify-between px-4">
        {/* Logo or Title */}
        <Typography variant="h6" className="text-gray-800 font-bold">
          CRM
        </Typography>

        {/* Avatar & Dropdown */}
        {isUserLoggedIn && <Box>
          <IconButton onClick={handleMenuOpen} size="small">
            <Avatar sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}>
              YB
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
            <MenuItem onClick={() => console.log("Profile Clicked")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>}

      </Toolbar>
    </AppBar>
  );
};


export default Navbar;