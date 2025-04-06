import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useCallback, useEffect, useState } from "react";

const useGetLeads = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(BASE_URL + "/retrieve/leads", { withCredentials: true });
      console.log(response.data?.leads);

      if (response.status === 200) {
        setData(response.data?.leads);
      }

    } catch (err) {
      console.log(err);

      setError(err.message || "Something went wrong while fetching leads");
    } finally {
      setLoading(false);
    }

  }, []);
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return { data, error, loading, refetch: fetchLeads };


};

export default useGetLeads;