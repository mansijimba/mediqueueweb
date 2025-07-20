import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ProfileView = ({ profile, onEdit }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <>
      <h2 className="text-center font-bold text-xl mb-8">Profile</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-x-12 gap-y-6">
        <div>
          <label className="block mb-1 font-semibold text-sm">Full Name</label>
          <input
            type="text"
            value={profile.fullName}
            disabled
            className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">
            Phone Number
          </label>
          <input
            type="text"
            value={profile.phoneNumber}
            disabled
            className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-sm">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="border border-gray-300 rounded px-2 py-1 w-full bg-gray-100"
          />
        </div>

        <div className="relative col-span-2">
          <label className="block mb-1 font-semibold text-sm">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={profile.password || "********"}
            disabled
            className="border border-gray-300 rounded px-2 py-1 w-1/2 bg-gray-100 pr-8"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <Eye className="h-4 w-5" />
            ) : (
              <EyeOff className="h-4 w-5" />
            )}
          </button>
        </div>

        <div className="col-span-2 flex justify-center mt-6">
          <button
            onClick={onEdit}
            className="bg-teal-700 text-white px-8 py-2 rounded hover:bg-teal-800 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
