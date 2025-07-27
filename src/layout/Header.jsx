import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserCircle, LogOut } from "lucide-react";
import logo from "../assets/logo/medilogo.png";

export function Header({ onProfileClick }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate("/profile");
    } else {
      onProfileClick(); // Opens Auth Modal
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload(); // Optional to refresh app state
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="MediQueue Logo" className="w-12 h-10" />
        <span className="text-2xl font-semibold text-teal-600">MediQueue</span>
      </div>

      {/* Navigation + Profile */}
      <div className="flex-1 flex justify-end items-center gap-6 text-teal-600">
        <nav className="space-x-6 text-teal-600 font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/doctor">Doctors</NavLink>
        </nav>

        {/* Profile Icon */}
        <UserCircle
          className="w-8 h-8 text-teal-600 cursor-pointer"
          onClick={handleProfileClick}
        />

        {/* Logout Icon (only if logged in) */}
        {isLoggedIn && (
          <LogOut
            className="w-7 h-7 text-teal-500 cursor-pointer hover:text-teal-700"
            onClick={handleLogout}
          />
        )}
      </div>
    </header>
  );
}  