import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import RegisterForm from "../components/auth/registerForm";
import Dashboard from "../pages/Dashboard";
import MainLayout from "../layout/MainLayout";
import AuthContextProvider from "../auth/AuthProvider";
import UserDoctor from "../pages/doctor/DoctorsPage";
import BookAppointmentPage from "../pages/doctor/BookAppoitmentPage";
import Profile from "../pages/ProfilePage";
import Queue from "../pages/QueueStatusPage";
import Homepage from "../pages/Homepage";
import AboutUs from "../pages/AboutUs";

// Admin pages
import AdminPage from "../pages/admin/AdminPage";
import PatientsPage from "../pages/admin/Patients";
import AppointmentTable from "../components/admin/AppointmentTable";
import QueueTable from "../components/admin/QueueTable";
import AddDoctor from "../pages/admin/AddDoctor";
import Doctors from "../pages/admin/Doctors";
import Message from "../pages/admin/MessagePage";

import AuthModal from "../components/authModal";
import AdminProtectedRoute from "../routers/AdminProtectedRoute"; // <-- import your protected route

import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentFailure from "../pages/PaymentFailure";
export default function AppRouter() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        {/* Render AuthModal conditionally */}
        {showAuthModal && <AuthModal onClose={closeAuthModal} />}

        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout onProfileClick={openAuthModal} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registerForm" element={<RegisterForm />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/doctor" element={<UserDoctor />} />
            <Route path="/doctor/book/:id" element={<BookAppointmentPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failure" element={<PaymentFailure />} />
          </Route>

          {/* Admin Routes (Protected) */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminPage />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="appointments" element={<AppointmentTable />} />
            <Route path="queues" element={<QueueTable />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/addDoctor" element={<AddDoctor />} />
            <Route path="patients" element={<PatientsPage />} />
            <Route path="messages" element={<Message />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}
