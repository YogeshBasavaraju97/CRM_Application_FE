import React, { useEffect } from "react";
import Navbar from './Authentication/Navbar';
import { BASE_URL } from "../utils/constants";

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.addUser);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user", {
        withCredentials: true,
      });

      if (response) {
        dispatch(addUser(response.data));
      }

    } catch (error) {
      if (error.status === 401) {
        navigate("/role-selection");
      }
    }
  };
  useEffect(() => {
    if (!user) {
      fetchData();
    }
  }, []);


  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Body;
