import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import logo from "../assets/logo/medilogo.png";
import { AuthContext } from "../auth/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";

export function Header({ onProfileClick }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      onProfileClick(); // Opens Auth Modal
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5050/api/auth/logout",
        {},
        { withCredentials: true },
      );
      logout();
      toast.info("You have successfully logged out");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="MediQueue Logo" className="w-12 h-10" />
        <span className="text-2xl font-semibold text-purple-600">
          ClinicFlow
        </span>
      </div>

      {/* Navigation + Profile */}
      <div className="flex-1 flex justify-end items-center gap-6 text-purple-700">
        <nav className="space-x-6 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-purple-700 hover:text-purple-900 transition-colors duration-200 ${
                isActive ? "underline" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-purple-700 hover:text-purple-900 transition-colors duration-200 ${
                isActive ? "underline" : ""
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/doctor"
            className={({ isActive }) =>
              `text-purple-700 hover:text-purple-900 transition-colors duration-200 ${
                isActive ? "underline" : ""
              }`
            }
          >
            Doctors
          </NavLink>
        </nav>

        {/* Profile Icon */}
        <UserCircle
          className="w-8 h-8 cursor-pointer hover:text-purple-800"
          onClick={handleProfileClick}
        />

        {/* Logout Icon (only if logged in) */}
        {isAuthenticated && (
          <LogOut
            className="w-7 h-7 cursor-pointer hover:text-purple-800"
            onClick={handleLogout}
          />
        )}
      </div>
    </header>
  );
}
