import { Navigate, Outlet } from "react-router-dom";

// This will check if a token exists in cookies
const isLoggedIn = () => {
  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("auth_token="))
    ?.split("=")[1];
  return !!token;
};

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children || <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;