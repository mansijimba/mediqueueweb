import React, { useState } from "react";
import { X } from "lucide-react";
import LoginForm from "./auth/loginForm";
import RegisterForm from "./auth/registerForm";

export default function AuthModal({ show, onClose }) {
  const [isLogin, setIsLogin] = useState(false);

  if (!show) return null;

  const handleSwitchToRegister = () => setIsLogin(false);
  const handleSwitchToLogin = () => setIsLogin(true);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-lg border border-gray-200 text-center max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-1.5 right-1.5 z-10 text-gray-500 hover:text-red-500"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {isLogin ? (
          <LoginForm switchToRegister={handleSwitchToRegister} onSuccess={onClose} />
        ) : (
          <RegisterForm switchToLogin={handleSwitchToLogin} onSuccess={onClose} />
        )}
      </div>
    </div>
  );
}
