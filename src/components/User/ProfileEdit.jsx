import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const ProfileEdit = ({ profile, setProfile, authToken, setIsEditing }) => {
  const [formData, setFormData] = useState(profile);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setProfileImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (profileImageFile) data.append("profileImage", profileImageFile);

      const res = await axios.put("/api/user/profile", data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data.user);
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  return (
    <>
      <h2 className="text-center font-bold text-xl mb-8">Edit Profile</h2>
      <div className="max-w-4xl mx-auto flex gap-12">
        <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-2 gap-6">
          {["fullName", "phoneNumber", "email"].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-semibold text-sm">
                {field === "fullName"
                  ? "Full Name"
                  : field === "phoneNumber"
                  ? "Phone Number"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-semibold text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-1/2 pr-8"
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
          </div>

          <div className="col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-teal-700 text-white px-8 py-2 rounded hover:bg-teal-800 transition"
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
