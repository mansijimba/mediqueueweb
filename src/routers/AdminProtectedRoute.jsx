import { Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthProvider";

export default function AdminProtectedRoute({ children }) {
  const { user } = useContext(AuthContext); // your logged-in user
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // if user is already logged in and role is admin
    if (user && user.role === "admin") {
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    // otherwise, verify with backend
    axios
      .get("http://localhost:5050/api/admins", { withCredentials: true })
      .then(() => setIsAdmin(true))
      .catch(() => setIsAdmin(false))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <p>Checking admin access...</p>;

  // If logged in as admin, render children
  return isAdmin ? children : <Navigate to="/" />; // redirect non-admins to homepage
}
