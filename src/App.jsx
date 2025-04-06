
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoleSelection from './Authentication/RoleSelection';
import Login from './Authentication/Login';
import Telecaller from './telecaller/TeleCallerPage';
import Dashboard from "./admin/Dashboard";
import { Provider } from 'react-redux';
import appStore from './../utils/appStore';

import { Toaster } from "react-hot-toast";
import Body from './Body';





const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Body />} >
            <Route path="role-selection" element={<RoleSelection />} />
            <Route path="login" element={<Login />} />
            <Route path="telecaller" element={<Telecaller />} />
            <Route path="admin" element={<Dashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>


  );
};

export default App;