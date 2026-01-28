import React from "react";
import { Outlet } from "react-router-dom";
import DoctorTable from "../../components/admin/DoctorTable";

export default function Doctors() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-md mb-6">
        <h1 className="text-3xl font-bold mb-2">Doctors Management</h1>
        <p className="text-sm text-purple-100">
          View, edit, and manage doctor profiles and their availability.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <DoctorTable />
      </div>

      {/* Nested Routes */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}

