import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import RegisterForm from "../components/auth/registerForm";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layout/MainLayout";
import AuthContextProvider from "../auth/AuthProvider";

// Admin pages
import AdminPage from "../pages/admin/AdminPage";
import DoctorsPage from "../pages/admin/Doctors";
import PatientsPage from "../pages/admin/Patients";
import AppointmentTable from "../components/admin/AppointmentTable";
import QueueTable from "../components/admin/QueueTable";
import Homepage from "../pages/Homepage";
import AddDoctor from "../pages/admin/AddDoctor";

export default function AppRouter() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registerForm" element={<RegisterForm />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/homepage" element={<Homepage />} />
          </Route>

          {/* Admin Routes with Sidebar Layout */}
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="appointments" element={<AppointmentTable />} />
            <Route path="queues" element={<QueueTable />} />
            <Route path="doctors" element={<DoctorsPage />}>
              {/* nested routes under doctors */}
              <Route path="addDoctor" element={<AddDoctor />} />
            </Route>
            <Route path="patients" element={<PatientsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
