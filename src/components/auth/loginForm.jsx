import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../auth/AuthProvider";

const LoginForm = ({ switchToRegister, onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [tempUserId, setTempUserId] = useState(null);

  const [accountLocked, setAccountLocked] = useState(false);
  const [unlockSubmitting, setUnlockSubmitting] = useState(false);
  const [unlockLink, setUnlockLink] = useState("");

  const API_ENDPOINTS = {
    user: "http://localhost:5050/api/auth",
    admin: "http://localhost:5050/api/admins",
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (isSubmitting) return;
      setApiError("");
      setIsSubmitting(true);

      try {
        const API_ENDPOINT = API_ENDPOINTS[role];

        if (role === "user") {
          // ================= USER LOGIN (OTP flow) =================
          if (!otpSent) {
            const { data } = await axios.post(
              `${API_ENDPOINT}/login`,
              { email: values.email, password: values.password },
              { withCredentials: true }
            );

            if (data?.tempUserId) {
              setTempUserId(data.tempUserId);
              setOtpSent(true);
              toast.info("OTP sent to your email. Check your inbox.");
            }

            if (data?.locked) {
              setAccountLocked(true);
              setApiError("Account locked. Request unlock link below.");
              return;
            }
          } else {
            // Verify OTP
            if (!otp) {
              toast.warn("Enter the OTP sent to your email.");
              return;
            }

            const { data } = await axios.post(
              `${API_ENDPOINT}/verify-otp`,
              { userId: tempUserId, otp },
              { withCredentials: true }
            );

            if (!data?.user) throw new Error(data?.message || "OTP verification failed");

            login(data.user);
            toast.success("Login successful!");
            onSuccess?.();
            navigate("/homepage");
          }

        } else if (role === "admin") {
          // ================= ADMIN LOGIN (direct, no OTP) =================
          const { data } = await axios.post(
            `${API_ENDPOINT}/login`, // Make sure your backend allows direct login for admins
            { email: values.email, password: values.password },
            { withCredentials: true }
          );

          if (!data?.user) throw new Error(data?.message || "Login failed");

          login(data.user);
          toast.success("Admin login successful!");
          onSuccess?.();
          navigate("/admin");
        }
      } catch (err) {
        const msg = err.response?.data?.message || err.message || "Login failed";

        if (/locked/i.test(msg)) {
          setAccountLocked(true);
          setApiError("Your account is locked. Request an unlock link below.");
          toast.error(msg);
        } else {
          setApiError(msg);
          toast.error(msg);
        }
      } finally {
        setIsSubmitting(false);
      }
    }

  });

  const handleRequestUnlock = async () => {
    const email = formik.values.email.trim();
    if (!email) {
      toast.warn("Enter your email first");
      return;
    }
    if (unlockSubmitting) return;

    try {
      setUnlockSubmitting(true);

      const API_ENDPOINT = API_ENDPOINTS[role];

      const { data } = await axios.post(
        `${API_ENDPOINT}/request-unlock`,
        { email },
        { withCredentials: true }
      );

      toast.success(data?.message || "Unlock instructions sent");
      setUnlockLink(data?.unlockLink || "");
      setAccountLocked(false);
      setApiError("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to request unlock");
    } finally {
      setUnlockSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
      <h2 className="text-teal-700 font-semibold text-lg mb-4 text-center">
        Welcome To MediQueue
      </h2>

      <div className="flex justify-center gap-4 mb-4">
        <button
          type="button"
          className={`px-3 py-1 rounded ${role === "user" ? "bg-teal-700 text-white" : "bg-gray-200"}`}
          onClick={() => setRole("user")}
        >
          User
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded ${role === "admin" ? "bg-teal-700 text-white" : "bg-gray-200"}`}
          onClick={() => setRole("admin")}
        >
          Admin
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-md p-2 pl-10 text-sm"
            {...formik.getFieldProps("email")}
          />
        </div>

        {!otpSent && (
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border rounded-md p-2 pl-10 pr-10 text-sm"
              {...formik.getFieldProps("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
        )}

        {otpSent && (
          <div className="relative">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border rounded-md p-2 text-sm"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}

        {apiError && <p className="text-red-500 text-xs">{apiError}</p>}

        {accountLocked && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleRequestUnlock}
              disabled={unlockSubmitting}
              className="w-full bg-yellow-100 text-yellow-800 py-1 rounded text-sm"
            >
              {unlockSubmitting ? "Requesting..." : "Request unlock link"}
            </button>

            {unlockLink && (
              <a href={unlockLink} target="_blank" rel="noreferrer" className="text-xs text-blue-600 break-all">
                Unlock Link
              </a>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-700 text-white py-2 rounded-md font-semibold disabled:bg-gray-300"
        >
          {otpSent ? "Verify OTP" : "Log In"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <button onClick={switchToRegister} className="text-teal-600 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
