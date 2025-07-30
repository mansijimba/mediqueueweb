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

// Admin pages
import AdminPage from "../pages/admin/AdminPage";
import PatientsPage from "../pages/admin/Patients";
import AppointmentTable from "../components/admin/AppointmentTable";
import QueueTable from "../components/admin/QueueTable";
import Homepage from "../pages/Homepage";
import AddDoctor from "../pages/admin/AddDoctor";
import Doctors from "../pages/admin/Doctors";
import AboutUs from "../pages/AboutUs";
import Message from "../pages/admin/MessagePage";

import AuthModal from "../components/authModal";  // Assuming you have this modal component

export default function AppRouter() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Function to open login modal
  const openAuthModal = () => setShowAuthModal(true);
  // Function to close login modal
  const closeAuthModal = () => setShowAuthModal(false);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        {/* Render AuthModal conditionally */}
        {showAuthModal && <AuthModal onClose={closeAuthModal} />}

        {/* Pass onProfileClick to MainLayout (which should pass it down to Header) */}
        <Routes>
          {/* Public Routes */}
          <Route
            element={<MainLayout onProfileClick={openAuthModal} />}
          >
            <Route path="/login" element={<Login />} />
            <Route path="/registerForm" element={<RegisterForm />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/doctor" element={<UserDoctor />} />
            <Route path="/doctor/book/:id" element={<BookAppointmentPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/queue" element={<Queue />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />}>
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
