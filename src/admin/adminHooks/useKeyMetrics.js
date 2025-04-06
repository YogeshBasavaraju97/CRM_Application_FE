import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/constants';
import axios from 'axios';

const useKeyMetrics = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchMetrics = async () => {
    setLoading(false);
    try {
      const res = await axios.get(BASE_URL + "/admin/key-metrics", { withCredentials: true });
      console.log(res);
      setData(res.data);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch key metrics:", error);
    } finally {
      setLoading(true);
      setError("");
    }
  };
  useEffect(() => {
    fetchMetrics();
  }, []);


  return { data, loading, error };


};


export default useKeyMetrics;