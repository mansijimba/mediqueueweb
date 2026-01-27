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
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [securityAnswers, setSecurityAnswers] = useState([]);

  const API_ENDPOINTS = {
    user: "http://localhost:5050/api/auth",
    admin: "http://localhost:5050/api/admins",
  };

  // Fetch security questions explicitly
  const fetchSecurityQuestions = async (email) => {
    try {
      const { data } = await axios.post(
        `${API_ENDPOINTS[role]}/request-unlock`,
        { email },
        { withCredentials: true }
      );

      if (data?.securityQuestions?.length) {
        setSecurityQuestions(data.securityQuestions);
        setSecurityAnswers(Array(data.securityQuestions.length).fill(""));
        setAccountLocked(true);
        setApiError(
          "Your account is locked. Answer the security question(s) to unlock."
        );
      } else {
        toast.error("No security questions found for this account.");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch security question"
      );
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (isSubmitting || accountLocked) return;
      setApiError("");
      setIsSubmitting(true);

      try {
        const API_ENDPOINT = API_ENDPOINTS[role];

        if (role === "user") {
          if (!otpSent) {
            const { data } = await axios.post(
              `${API_ENDPOINT}/login`,
              { email: values.email, password: values.password },
              { withCredentials: true }
            );

            // Check if account is locked FIRST
            if (data?.locked) {
              console.log("Account locked response:", data); // Debug log
              
              if (data.securityQuestions && data.securityQuestions.length > 0) {
                setSecurityQuestions(data.securityQuestions);
                setSecurityAnswers(Array(data.securityQuestions.length).fill(""));
                setAccountLocked(true);
                setApiError(data.message || "Your account is locked. Answer the security question(s) to unlock.");
              } else {
                setApiError("Account is locked but no security questions are set. Please contact support.");
              }
              setIsSubmitting(false);
              return; // Stop execution here
            }

            // If not locked, proceed with OTP
            if (data?.tempUserId) {
              setTempUserId(data.tempUserId);
              setOtpSent(true);
              toast.info("OTP sent to your email. Check your inbox.");
            }
          } else {
            // Verify OTP
            if (!otp) {
              toast.warn("Enter the OTP sent to your email.");
              setIsSubmitting(false);
              return;
            }

            const { data } = await axios.post(
              `${API_ENDPOINT}/verify-otp`,
              { userId: tempUserId, otp },
              { withCredentials: true }
            );

            if (!data?.user)
              throw new Error(data?.message || "OTP verification failed");

            login(data.user);
            toast.success("Login successful!");
            onSuccess?.();
            navigate("/homepage");
          }
        } else if (role === "admin") {
          const { data } = await axios.post(
            `${API_ENDPOINT}/login`,
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
        console.error("Login error:", err); // Debug log
        const msg =
          err.response?.data?.message || err.message || "Login failed";
        
        // Check if error response contains lock info
        if (err.response?.data?.locked) {
          const errorData = err.response.data;
          if (errorData.securityQuestions && errorData.securityQuestions.length > 0) {
            setSecurityQuestions(errorData.securityQuestions);
            setSecurityAnswers(Array(errorData.securityQuestions.length).fill(""));
            setAccountLocked(true);
            setApiError(errorData.message || "Your account is locked. Answer the security question(s) to unlock.");
          }
        } else {
          setApiError(msg);
          toast.error(msg);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleUnlockSubmit = async () => {
    // Only take first answer for now (assuming one question)
    const answer = securityAnswers[0] || "";
    if (!answer.trim()) {
      toast.warn("Please enter your answer.");
      return;
    }

    try {
      setUnlockSubmitting(true);

      const { data } = await axios.post(
        `${API_ENDPOINTS[role]}/verify-unlock`,
        { email: formik.values.email, answer },
        { withCredentials: true }
      );

      toast.success(data?.message || "Account unlocked. You can log in now!");
      setAccountLocked(false);
      setSecurityQuestions([]);
      setSecurityAnswers([]);
      setApiError("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to unlock account");
    } finally {
      setUnlockSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
      <h2 className="text-purple-700 font-semibold text-lg mb-4 text-center">
        Welcome To ClinicFlow
      </h2>

      <div className="flex justify-center gap-4 mb-4">
        <button
          type="button"
          className={`px-3 py-1 rounded ${
            role === "user" ? "bg-purple-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => setRole("user")}
        >
          User
        </button>
        <button
          type="button"
          className={`px-3 py-1 rounded ${
            role === "admin" ? "bg-purple-700 text-white" : "bg-gray-200"
          }`}
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

        {!otpSent && !accountLocked && (
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

        {accountLocked && securityQuestions.length > 0 && (
  <div className="space-y-2">
    {securityQuestions.map((sq, index) => (
      <div key={sq.id || index}>
        <p className="text-sm text-gray-700">{sq.question}</p>
        <input
          type="text"
          placeholder="Your Answer"
          value={securityAnswers[index]}
          onChange={(e) => {
            const newAnswers = [...securityAnswers];
            newAnswers[index] = e.target.value;
            setSecurityAnswers(newAnswers);
          }}
          className="w-full border rounded-md p-2 text-sm"
        />
      </div>
    ))}
    <button
      type="button"
      onClick={handleUnlockSubmit}
      disabled={unlockSubmitting}
      className="w-full bg-yellow-100 text-yellow-800 py-1 rounded text-sm"
    >
      {unlockSubmitting ? "Submitting..." : "Submit Answer"}
    </button>
  </div>
)}

        {apiError && <p className="text-red-500 text-xs">{apiError}</p>}

        <button
          type="submit"
          disabled={isSubmitting || accountLocked}
          className="w-full bg-purple-700 text-white py-2 rounded-md font-semibold disabled:bg-gray-300"
        >
          {otpSent ? "Verify OTP" : "Log In"}
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <button
          onClick={switchToRegister}
          className="text-purple-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
