import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5050/api/auth/register", {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          password: values.password,
        });

        if (response.data.success) {
          navigate("/login");
        } else {
          setApiError(response.data.message || "Registration failed");
        }
      } catch (err) {
        setApiError(err.response?.data?.message || "Server error");
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center border border-gray-200">
      <div className="flex justify-center mb-2">
        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">🩺</span>
        </div>
      </div>
      <h2 className="text-teal-700 font-semibold text-lg mb-4">Create Your MediQueue Account</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* First Name */}
        <div className="relative text-left">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md p-2 pl-8 text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          <User className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.firstName}</p>
          )}
        </div>

    

        {/* Username */}
        <div className="relative text-left">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border border-gray-300 rounded-md p-2 pl-8 text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          <User className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
          )}
        </div>
            {/* Last Name */}
        <div className="relative text-left">
          <input
            type="number"
            name="number"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded-md p-2 pl-8 text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.number}
          />
          <User className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
          {formik.touched.number && formik.errors.number && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.number}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative text-left">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-2 pl-8 text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <Mail className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative text-left">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md p-2 pl-8 pr-8 text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <Lock className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2.5 top-3 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative text-left">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full border border-gray-300 rounded-md p-2 pl-8 pr-8 text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <Lock className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
          )}
        </div>

        {/* API Error */}
        {apiError && (
          <p className="text-red-500 text-xs text-left">{apiError}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-md font-semibold hover:bg-teal-800 transition"
        >
          Sign Up
        </button>
      </form>

      {/* Link to Login */}
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <NavLink to="/login" className="text-teal-600 font-medium hover:underline">
          Log In
        </NavLink>
      </p>
    </div>
  );
};

export default RegisterForm;
