import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc"; // For Google icon

const LoginForm = ({ switchToRegister }) => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "At least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        // Check if it's the admin email
        const isAdmin = values.email.toLowerCase() === "admin@mediqueue.com";

        const endpoint = isAdmin
          ? "http://localhost:5050/api/admins/login"
          : "http://localhost:5050/api/auth/login";

        const response = await axios.post(endpoint, values);
        console.log(response)

        if (response.data?.token && response.data?.user) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          

          const role = response.data.user.role;

          if (role == "admin") {
            console.log("redirecting to admin")
            navigate("/admin");
          } else {
            console.log("redirecting to homepage")
            navigate("/homepage");
          }
        } 
        else {
          setApiError(response.data.message || "Login failed");
        }
      } catch (err) {
        setApiError(err.response?.data?.message || "Server error");
      }
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center border border-gray-200">
      {/* Logo */}
      <div className="flex justify-center mb-2">
        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">🩺</span>
        </div>
      </div>
      <h2 className="text-teal-700 font-semibold text-lg mb-4">
        Welcome To MediQueue
      </h2>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="relative text-left">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md p-2 pl-10 text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative text-left">
          <Lock className="absolute left-3 top-5 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md p-2 pl-10 pr-10 text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? (
              <Eye className="h-3 w-4" />
            ) : (
              <EyeOff className="h-3 w-4" />
            )}
          </button>

          <NavLink
            to="/forgot-password"
            className="text-xs text-right text-gray-600 mt-1 inline-block w-full hover:underline"
          >
            Forgot Password
          </NavLink>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {apiError && (
          <p className="text-red-500 text-xs text-left">{apiError}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-md font-semibold hover:bg-teal-800 transition"
        >
          Log In
        </button>
      </form>

      {/* Sign Up */}
      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={switchToRegister}
          className="text-teal-600 font-medium hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
