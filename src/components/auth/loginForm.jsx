import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../../auth/AuthProvider";  // Import AuthContext

const LoginForm = ({ switchToRegister, onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  // Get login function from context
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
        setApiError("");
        const adminEmail = "admin@mediqueue.com";
        const adminPassword = "Mediqueue@08";

        if (
          values.email.toLowerCase() === adminEmail &&
          values.password === adminPassword
        ) {
          const adminUser = { email: adminEmail, role: "admin", name: "Admin" };
          const fakeToken = "fake-admin-token";

          // Use context login function instead of localStorage directly
          login(adminUser, fakeToken);

          if (onSuccess) onSuccess();
          navigate("/admin");
          return;
        }

        const endpoint =
          values.email.toLowerCase() === adminEmail
            ? "http://localhost:5050/api/admins/login"
            : "http://localhost:5050/api/auth/login";

        const response = await axios.post(endpoint, values);

        if (response.data?.token && response.data?.user) {
          // Use context login function
          login(response.data.user, response.data.token);

          if (onSuccess) onSuccess();

          const role = response.data.user.role;
          if (role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          setApiError(response.data.message || "Login failed");
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
      <h2 className="text-teal-700 font-semibold text-lg mb-4">
        Welcome To MediQueue
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>

        {apiError && <p className="text-red-500 text-xs text-left">{apiError}</p>}

        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-md font-semibold hover:bg-teal-800 transition"
        >
          Log In
        </button>
      </form>

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
