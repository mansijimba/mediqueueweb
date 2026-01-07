import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePasswordComplexity, scorePassword } from "../../utils/passwordUtils";

const ProfileEdit = ({ profile, setProfile, authToken, setIsEditing }) => {
  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    phone: profile.phone || "",
    email: profile.email || "",
    password: "",
    currentPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [pwDetails, setPwDetails] = useState({});
  const [pwScore, setPwScore] = useState(0);
  const [pwLabel, setPwLabel] = useState("Very weak");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authToken) {
      toast.error("No authentication token found. Please login again.");
      return;
    }

    // If user provided a new password, ensure it meets complexity rules
    if (formData.password && !validatePasswordComplexity(formData.password, { minLength: 8, requireCategories: 3 }).isValid) {
      toast.error("Password does not meet complexity requirements.");
      return;
    }

    // If user is changing password, require their current password
    if (formData.password && !formData.currentPassword) {
      toast.error("Current password is required to change your password.");
      return;
    }

    // show loading toast and prevent double submits
    const savingToastId = toast.loading("Saving changes...");
    setIsSubmitting(true);
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
        toast.update(savingToastId, { render: "Profile updated successfully", type: "success", isLoading: false, autoClose: 3000 });
      } else {
        toast.update(savingToastId, { render: "Unexpected response from server.", type: "error", isLoading: false, autoClose: 4000 });
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.update(savingToastId, { render: err.response?.data?.message || "Failed to update profile. Please try again later.", type: "error", isLoading: false, autoClose: 4000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setFormData({
      fullName: profile.fullName || "",
      phone: profile.phone || "",
      email: profile.email || "",
      password: "",
      currentPassword: "",
    });
  }, [profile]);

  useEffect(() => {
    const pw = formData.password || "";
    const details = validatePasswordComplexity(pw, { minLength: 8, requireCategories: 3 });
    const s = scorePassword(pw);
    setPwDetails(details);
    setPwScore(s.score);
    setPwLabel(s.label);
  }, [formData.password]);

  return (
    <>
      <h2 className="text-center font-extrabold text-3xl mb-10 text-teal-900 tracking-wide drop-shadow-md">
        Edit Your Profile
      </h2>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-teal-300 p-10">
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-teal-600 hover:underline font-medium"
          >
            ← Back to Profile
          </button>
        </div>

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

          {/* Current Password (required when changing password) */}
          <div className="relative col-span-2 max-w-md">
            <label
              htmlFor="currentPassword"
              className="mb-3 text-lg font-semibold text-teal-800 uppercase tracking-wide"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password to change"
              className="border-2 border-teal-300 rounded-lg px-5 py-3 w-full font-medium text-teal-900
                placeholder-teal-400 focus:outline-none focus:border-teal-600
                focus:shadow-[0_0_8px_rgba(20,184,166,0.5)] transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute top-14 right-4 -translate-y-1/2 text-teal-600 hover:text-teal-900 transition"
              aria-label={showCurrentPassword ? "Hide password" : "Show password"}
            >
              {showCurrentPassword ? (
                <Eye className="h-6 w-6" />
              ) : (
                <EyeOff className="h-6 w-6" />
              )}
            </button>
            {formData.password !== "" && !formData.currentPassword && (
              <p className="mt-2 text-xs text-red-600">Current password is required to change your password.</p>
            )}
          </div>

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

            {/* Password requirements + strength */}
            {formData.password !== "" && (
              <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-700">Password Strength: <span className="font-bold">{pwLabel}</span></div>
                  <div className={`text-xs font-medium ${pwScore <= 1 ? 'text-red-600' : pwScore === 2 ? 'text-yellow-600' : pwScore === 3 ? 'text-lime-600' : 'text-green-600'}`}>{pwScore}/4</div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    {pwDetails.lengthOk ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={pwDetails.lengthOk ? 'text-green-700' : 'text-gray-600'}>Minimum 8 characters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {pwDetails.hasLower ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={pwDetails.hasLower ? 'text-green-700' : 'text-gray-600'}>Lowercase letter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {pwDetails.hasUpper ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={pwDetails.hasUpper ? 'text-green-700' : 'text-gray-600'}>Uppercase letter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {pwDetails.hasDigit ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={pwDetails.hasDigit ? 'text-green-700' : 'text-gray-600'}>Number</span>
                  </li>
                  <li className="flex items-center gap-2 col-span-2">
                    {pwDetails.hasSymbol ? <CheckCircle className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-gray-400" />}
                    <span className={pwDetails.hasSymbol ? 'text-green-700' : 'text-gray-600'}>Symbol (e.g. !@#$%)</span>
                  </li>
                </ul>
                <div className="text-xs text-gray-500 mt-2">Password must meet at least 3 of the character requirements and be at least 8 characters long.</div>
              </div>
            )}
          </div>

          <div className="col-span-2 flex justify-center mt-10">
            <button
              type="submit"
              disabled={formData.password !== "" && !validatePasswordComplexity(formData.password, { minLength: 8, requireCategories: 3 }).isValid}
              className={`font-bold rounded-xl px-14 py-3 shadow-lg transition transform ${
                formData.password !== "" && !validatePasswordComplexity(formData.password, { minLength: 8, requireCategories: 3 }).isValid
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-teal-600 to-teal-500 text-white hover:from-teal-700 hover:to-teal-600'
              }`}
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
