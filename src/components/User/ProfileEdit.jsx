import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ProfileEdit = ({ profile, setProfile, authToken, setIsEditing }) => {
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    phone: profile.phone || "",
    email: profile.email || "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      alert("No authentication token found. Please login again.");
      return;
    }

    try {
      const res = await axios.patch(
        "http://localhost:5050/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data && res.data.user) {
        setProfile(res.data.user);
        setIsEditing(false);
      } else {
        alert("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      alert(
        err.response?.data?.message ||
          "Failed to update profile. Please try again later."
      );
    }
  };

  useEffect(() => {
    setFormData({
      fullName: profile.fullName || "",
      phone: profile.phone || "",
      email: profile.email || "",
      password: "",
    });
  }, [profile]);

  return (
    <>
      <h2 className="text-center font-extrabold text-3xl mb-10 text-teal-900 tracking-wide drop-shadow-md">
        Edit Your Profile
      </h2>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-teal-300 p-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {["fullName", "phone", "email"].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="mb-3 text-lg font-semibold text-teal-800 uppercase tracking-wide"
              >
                {field === "fullName"
                  ? "Full Name"
                  : field === "phone"
                  ? "Phone Number"
                  : "Email Address"}
              </label>
              <input
                id={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="border-2 border-teal-300 rounded-lg px-5 py-3 font-medium text-teal-900
                  placeholder-teal-400 focus:outline-none focus:border-teal-600
                  focus:shadow-[0_0_8px_rgba(20,184,166,0.5)] transition"
                placeholder={`Enter your ${field === "fullName" ? "full name" : field === "phone" ? "phone number" : "email"}`}
              />
            </div>
          ))}

          <div className="relative col-span-2 max-w-md">
            <label
              htmlFor="password"
              className="mb-3 text-lg font-semibold text-teal-800 uppercase tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep unchanged"
              className="border-2 border-teal-300 rounded-lg px-5 py-3 w-full font-medium text-teal-900
                placeholder-teal-400 focus:outline-none focus:border-teal-600
                focus:shadow-[0_0_8px_rgba(20,184,166,0.5)] transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-teal-600 hover:text-teal-900 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
            <p className="mt-2 text-sm text-teal-400 italic">
              Leave blank if you do not want to change your password.
            </p>
          </div>

          <div className="col-span-2 flex justify-center mt-10">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold rounded-xl px-14 py-3
                hover:from-teal-700 hover:to-teal-600 shadow-lg shadow-teal-300/50 transition transform hover:-translate-y-1"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileEdit;
