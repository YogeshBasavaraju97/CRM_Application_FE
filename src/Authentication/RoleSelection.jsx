import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation, useNavigate } from 'react-router-dom';

const RoleSelection = () => {

  const navigate = useNavigate();

  const handleRoleClick = (role) => {
    navigate("/login", { state: { role: `${role}` } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <Box
        className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-md text-center space-y-8"
      >
        <Typography variant="h5" className="text-gray-700 font-semibold">
          Welcome CRM Application
        </Typography>

        <Typography variant="h4" className="text-gray-900 font-bold">
          Select the Role
        </Typography>

        <div className="flex flex-col gap-3 mt-3 ">
          <Button
            variant="outlined"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            className="!rounded-xl !py-3 !text-black hover:!bg-gray-100"
            onClick={() => handleRoleClick('admin')}
          >
            Login as Admin
          </Button>

          <Button
            variant="outlined"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            className="!rounded-xl !py-3 !text-black hover:!bg-gray-100 mt-3 "
            onClick={() => handleRoleClick('telecaller')}
          >
            Login as TeleCaller
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default RoleSelection;