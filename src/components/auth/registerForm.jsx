import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = ({ onSuccess, switchToLogin }) => {
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("FULL name is required"),
      username: Yup.string().required("Username is required"),
      phoneNumber: Yup.string().required("PhoneNumber is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("http://localhost:5050/api/auth/register", {
          fullName: values.fullName,
          username: values.username,
          phoneNumber: values.phoneNumber,
          email: values.email,
          password: values.password,
        });

        if (response.data.success) {
          toast.success("Registration successful!");
          resetForm();
          setTimeout(() => {
            if (onSuccess) onSuccess();  // ✅ trigger switch to login
          }, 1000);
        } else {
          setApiError(response.data.message || "Registration failed");
          toast.error(response.data.message || "Registration failed");
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Server error";
        setApiError(errorMsg);
        toast.error(errorMsg);
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
        {/* Full Name */}
        <InputField
          name="fullName"
          placeholder="Full Name"
          icon={<User />}
          formik={formik}
        />
        {/* Username */}
        <InputField
          name="username"
          placeholder="Username"
          icon={<User />}
          formik={formik}
        />
        {/* Phone Number */}
        <InputField
          name="phoneNumber"
          placeholder="Phone Number"
          icon={<User />}
          formik={formik}
        />
        {/* Email */}
        <InputField
          name="email"
          placeholder="Email"
          icon={<Mail />}
          formik={formik}
        />
        {/* Password */}
        <PasswordField
          name="password"
          placeholder="Password"
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
          formik={formik}
        />
        {/* Confirm Password */}
        <PasswordField
          name="confirmPassword"
          placeholder="Confirm Password"
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
          formik={formik}
        />

        {apiError && (
          <p className="text-red-500 text-xs text-left">{apiError}</p>
        )}

        <button
          type="submit"
          className="w-full bg-teal-700 text-white py-2 rounded-md font-semibold hover:bg-teal-800 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToLogin}
          className="text-teal-600 font-medium hover:underline"
        >
          Log In
        </button>
      </p>

      <ToastContainer />
    </div>
  );
};

// Helper Components
const InputField = ({ name, placeholder, icon, formik }) => (
  <div className="relative text-left">
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md p-2 pl-8 text-sm"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
    />
    <div className="absolute left-2.5 top-3 w-4 h-4 text-gray-400">{icon}</div>
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
    )}
  </div>
);

const PasswordField = ({ name, placeholder, showPassword, togglePassword, formik }) => (
  <div className="relative text-left">
    <input
      type={showPassword ? "text" : "password"}
      name={name}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-md p-2 pl-8 pr-8 text-sm"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
    />
    <Lock className="absolute left-2.5 top-3 w-4 h-4 text-gray-400" />
    <button
      type="button"
      onClick={togglePassword}
      className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-700"
    >
      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
    </button>
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
    )}
  </div>
);

export default RegisterForm;
