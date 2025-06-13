import { useState } from "react";
import LoginForm from "../components/auth/loginForm"
import RegisterForm from "../components/auth/registerForm";

export function HomePage() {
  const [activeTab, setActiveTab] = useState("signin");

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tabs */}
      <div className="w-full mb-8">
        <div className="grid w-full grid-cols-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("signin")}
            className={`text-sm font-medium py-2 px-4 rounded-md transition-all duration-200 ${
              activeTab === "signin"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`text-sm font-medium py-2 px-4 rounded-md transition-all duration-200 ${
              activeTab === "signup"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Render forms conditionally */}
      {activeTab === "signin" && <LoginForm />}
      {activeTab === "signup" && <RegisterForm />}
    </div>
  );
}
