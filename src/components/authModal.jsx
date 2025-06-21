// components/AuthModal.jsx
import React, { useState } from "react";
import { X } from "lucide-react";
import LoginForm from "./auth/loginForm";
import RegisterForm from "./auth/registerForm";

export default function AuthModal({ show, onClose }) {
  const [isLogin,setIsLogin]=useState(false);
  // function setIsLogin(state){
  //   isLogin = state; 
  // };

  console.log("setIsLogin:", setIsLogin);
  if (!show) return null;

  const handleSwitchToRegister = () => {
    setIsLogin(false);
  };
  const handleSwitchToLogin = () => setIsLogin(true);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="relative w-full max-w-sm bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center">
        <button
          onClick={onClose}
          className="absolute top-1.5 right-1.5 z-10 text-gray-500 hover:text-red-500"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Conditionally render login/register form */}
        {isLogin ? (
          <LoginForm switchToRegister={handleSwitchToRegister} />
        ) : (
          <RegisterForm switchToLogin={handleSwitchToLogin} />
        )}
      </div>
    </div>
  );
}
