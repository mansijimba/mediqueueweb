import React from "react";
import { NavLink } from "react-router-dom";
import { UserCircle } from "lucide-react";
import logo from "../assets/logo/medilogo.png"

export function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="MediQueue Logo" className="w-12 h-10" />
        <span className="text-2xl font-semibold text-teal-600">MediQueue</span>
      </div>
      {/* Spacer and Navigation */}
      <div className="flex-1 flex justify-end items-center gap-6">
        <nav className="space-x-6 text-teal-600 font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/doctors">Doctors</NavLink>
        </nav>

        {/* Profile Icon */}
        <UserCircle className="w-8 h-8 text-teal-600" />
      </div>
    </header>
  );
};


