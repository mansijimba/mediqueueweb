import React, { useState, useEffect } from "react";
import axios from "axios";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { validatePasswordComplexity, scorePassword } from "../../utils/passwordUtils";

const ProfileEdit = ({ profile, setProfile, setIsEditing, csrfToken }) => {
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

    if (!csrfToken) {
      toast.error("Security token missing. Please refresh the page.");
      return;
    }

    if (
      formData.password &&
      !validatePasswordComplexity(formData.password, {
        minLength: 8,
        requireCategories: 3,
      }).isValid
    ) {
      toast.error("Password does not meet complexity requirements.");
      return;
    }

    if (formData.password && !formData.currentPassword) {
      toast.error("Current password is required to change password.");
      return;
    }

    const savingToastId = toast.loading("Saving changes...");
    setIsSubmitting(true);

    try {
      const res = await axios.patch(
        "http://localhost:5050/api/auth/profile",
        formData,
        {
          withCredentials: true, // ✅ cookie-based auth
          headers: {
            "X-CSRF-Token": csrfToken, // ✅ CSRF protection
          },
        }
      );

      if (res.data?.user) {
        setProfile(res.data.user);
        setIsEditing(false);
        toast.update(savingToastId, {
          render: "Profile updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      toast.update(savingToastId, {
        render:
          err.response?.data?.message ||
          "Failed to update profile. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
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
    const details = validatePasswordComplexity(pw, {
      minLength: 8,
      requireCategories: 3,
    });
    const score = scorePassword(pw);
    setPwDetails(details);
    setPwScore(score.score);
    setPwLabel(score.label);
  }, [formData.password]);

  return (
    <>
      <h2 className="text-center font-extrabold text-3xl mb-10 text-teal-900">
        Edit Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
        {["fullName", "phone", "email"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="border p-3 rounded"
            placeholder={field}
          />
        ))}

        {/* Current Password */}
        <input
          type={showCurrentPassword ? "text" : "password"}
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Current password"
          className="border p-3 rounded col-span-2"
        />

        {/* New Password */}
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="New password (optional)"
          className="border p-3 rounded col-span-2"
        />

        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-teal-600 text-white px-8 py-3 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileEdit;
