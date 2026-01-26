import { useState, useEffect } from "react";
import axios from "axios";

export function useAdminPatients() {
  const [patients, setPatients] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/admin/patients",{ withCredentials: true });
        console.log("Fetched patients:", res.data.patients); // Should be array of users
        setPatients(res.data.patients);
        setIsPending(false);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setError(err);
        setIsPending(false);
      }
    };

    fetchPatients();
  }, []);

  return { patients, isPending, error };
}
