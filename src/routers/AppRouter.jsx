import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import RegisterForm from '../components/auth/registerForm';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layout/MainLayout';
import AuthContextProvider from '../auth/AuthProvider';

// Admin pages
import AdminPage from '../pages/admin/AdminPage';
import AppointmentsPage from '../pages/admin/Appointment';
import QueuePage from '../pages/admin/Queue';
import DoctorsPage from '../pages/admin/Doctors';
import PatientsPage from '../pages/admin/Patients';

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
          </Route>

          {/* Admin Routes with Sidebar Layout */}
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="queue" element={<QueuePage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="patients" element={<PatientsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
