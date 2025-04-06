import { useState } from 'react';
import AppRoute from './routes/AppRoute';
import Navbar from './Authentication/Navbar';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import appStore from '../utils/appStore';

function App() {
  return (
    <>
      <Provider store={appStore}>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <AppRoute />
      </Provider>
    </>
  );
}

export default App;
