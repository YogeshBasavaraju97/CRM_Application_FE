import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/constants';
import axios from 'axios';

const useCallRecords = () => {

  const [callData, setCallData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchMetrics = async () => {
    setLoading(false);
    try {
      const res = await axios.get(BASE_URL + "/admin/call-records", { withCredentials: true });
      setCallData(res.data.callRecords);
      console.log(res.data.callRecords);
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


  return { callData, loading, error };


};


export default useCallRecords;