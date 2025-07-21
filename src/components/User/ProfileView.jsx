import React, { useState } from "react";
import { Eye, EyeOff, User, Phone, Mail } from "lucide-react";

const ProfileView = ({ profile, onEdit }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!profile)
    return (
      <p className="text-center text-gray-500 animate-pulse mt-10">
        Loading profile...
      </p>
    );

  return (
    <>
      <h2 className="text-center font-extrabold text-4xl mb-12 text-gradient bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent select-none">
        Your Profile
      </h2>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-12 grid grid-cols-2 gap-10 border border-teal-100 hover:shadow-teal-400/40 transition-shadow duration-500">
        {/* Full Name */}
        <div className="relative">
          <label className="block mb-2 font-semibold text-teal-700 flex items-center gap-2">
            <User className="w-5 h-5 text-teal-500" /> Full Name
          </label>
          <input
            type="text"
            value={profile.fullName}
            disabled
            className="w-full border border-teal-300 rounded-xl px-5 py-3 bg-teal-50 text-teal-900 font-semibold shadow-inner focus:outline-none focus:ring-4 focus:ring-cyan-300 transition"
          />
        </div>

        {/* Phone Number */}
        <div className="relative">
          <label className="block mb-2 font-semibold text-teal-700 flex items-center gap-2">
            <Phone className="w-5 h-5 text-teal-500" /> Phone Number
          </label>
          <input
            type="text"
            value={profile.phone}
            disabled
            className="w-full border border-teal-300 rounded-xl px-5 py-3 bg-teal-50 text-teal-900 font-semibold shadow-inner focus:outline-none focus:ring-4 focus:ring-cyan-300 transition"
          />
        </div>

        {/* Email */}
        <div className="col-span-2 relative">
          <label className="block mb-2 font-semibold text-teal-700 flex items-center gap-2">
            <Mail className="w-5 h-5 text-teal-500" /> Email
          </label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full border border-teal-300 rounded-xl px-5 py-3 bg-teal-50 text-teal-900 font-semibold shadow-inner focus:outline-none focus:ring-4 focus:ring-cyan-300 transition"
          />
        </div>

        {/* Password */}
        <div className="relative col-span-2 max-w-full">
          <label className="block mb-2 font-semibold text-teal-700 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-teal-500" /> Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={profile.password ? profile.password : "********"}
            disabled
            className="w-full border border-teal-300 rounded-xl px-5 py-3 bg-teal-50 text-teal-900 font-semibold shadow-inner pr-14 focus:outline-none focus:ring-4 focus:ring-cyan-300 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-14 transform -translate-y-1/2 text-teal-600 hover:text-teal-800 transition"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye className="w-3 h-4" />
            ) : (
              <EyeOff className="w-3 h-4" />
            )}
          </button>
        </div>

        {/* Edit Button */}
        <div className="col-span-2 flex justify-center mt-10">
          <button
            onClick={onEdit}
            className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-extrabold px-14 py-4 rounded-3xl shadow-lg hover:shadow-cyan-400/60 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-300"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
