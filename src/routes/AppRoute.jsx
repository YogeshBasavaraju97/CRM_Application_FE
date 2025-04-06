import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoleSelection from '../Authentication/RoleSelection';
import Login from '../Authentication/Login';
import Telecaller from '../telecaller/TeleCallerPage';
import Admin from "../admin/Admin";



const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/telecaller" element={<Telecaller />} />
        <Route path="/admin" element={<Admin />} />


      </Routes>

    </BrowserRouter>
  );
};

export default AppRoute;