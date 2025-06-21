import { useState, useEffect } from "react";
import axios from "axios";

export function useAdminPatients() {
  const [patients, setPatients] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // to prevent setting state on unmounted component

    const fetchPatients = async () => {
      try {
        setIsPending(true);
        setError(null);

        const response = await axios.get("http://localhost:5050/api/admin/patients");
        if (isMounted) {
          setPatients(response.data.patients || []); // adjust if your data shape is different
          setIsPending(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data || { message: "Failed to fetch patients" });
          setIsPending(false);
        }
      }
    };

    fetchPatients();

    return () => {
      isMounted = false;
    };
  }, []);

  return { patients, isPending, error };
}
