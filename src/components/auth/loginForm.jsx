import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { Mail, Lock, Eye, EyeOff, Link as LinkIcon } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../../auth/AuthProvider";

const LoginForm = ({ switchToRegister, onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [securityRequired, setSecurityRequired] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const [securityAnswers, setSecurityAnswers] = useState({});
  const [tempToken, setTempToken] = useState(null);
  const [accountLocked, setAccountLocked] = useState(false);
  const [unlockSubmitting, setUnlockSubmitting] = useState(false);
  const [unlockLink, setUnlockLink] = useState(""); 
  const [previewUrl, setPreviewUrl] = useState(""); // Ethereal preview

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "At least 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      setApiError("");
      if (isSubmitting) return;
      try {
        setIsSubmitting(true);

        // Security questions verification
        if (securityRequired && tempToken) {
          const answers = securityQuestions.map((q) => ({
            question: q.question,
            answer: securityAnswers[q.question] || "",
          }));

          const verifyResp = await axios.post(
            "http://localhost:5050/api/auth/security/verify",
            { email: values.email, tempToken, answers }
          );

          if (verifyResp.data?.token && verifyResp.data?.user) {
            login(verifyResp.data.user, verifyResp.data.token);
            if (onSuccess) onSuccess();
            navigate(verifyResp.data.user.role === "admin" ? "/admin" : "/");
            return;
          } else {
            setApiError(verifyResp.data?.message || "Security verification failed");
            return;
          }
        }

        // Normal login
        const response = await axios.post("http://localhost:5050/api/auth/login", values);

        if (response.data?.securityRequired) {
          setSecurityRequired(true);
          setSecurityQuestions(response.data.questions || []);
          setTempToken(response.data.tempToken);
          setApiError("Answer your security questions to proceed.");
          return;
        }

        if (response.data?.token && response.data?.user) {
          login(response.data.user, response.data.token);
          if (onSuccess) onSuccess();
          navigate(response.data.user.role === "admin" ? "/admin" : "/");
        } else {
          setApiError(response.data?.message || "Login failed");
        }
      } catch (err) {
        const resp = err.response?.data;
        if (/locked/i.test(resp?.message || "")) {
          setAccountLocked(true);
          setApiError("Your account is locked. Request an unlock link below.");
          toast.error("Account locked. Check your email or contact support.");
        } else {
          setApiError(resp?.message || "Server error. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Unlock request
  const handleRequestUnlock = async () => {
    const email = formik.values.email?.trim();
    if (!email) {
      toast.warn("Enter your email to request an unlock link.");
      return;
    }
    if (unlockSubmitting) return;

    try {
      setUnlockSubmitting(true);
      const resp = await axios.post("http://localhost:5050/api/auth/request-unlock", { email });

      toast.success(resp.data?.message || "Unlock instructions sent if account exists.");
      setAccountLocked(false);
      setApiError("");

      // Show both links
      if (resp.data?.unlockLink) setUnlockLink(resp.data.unlockLink);
      if (resp.data?.previewUrl) setPreviewUrl(resp.data.previewUrl);

    } catch (err) {
      const msg = err.response?.data?.message || "Failed to request unlock. Try later.";
      toast.error(msg);
    } finally {
      setUnlockSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center border border-gray-200">
      <h2 className="text-teal-700 font-semibold text-lg mb-4">Welcome To MediQueue</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Email always editable */}
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
        </div>

        {/* Password */}
        {!securityRequired && (
          <div className="relative text-left">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showPassword ? <Eye className="h-3 w-4" /> : <EyeOff className="h-3 w-4" />}
            </button>
          </div>
        )}

        {/* Security Questions */}
        {securityRequired && securityQuestions.length > 0 && (
          <div className="text-left bg-blue-50 p-3 rounded border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Answer your security questions</h3>
            {securityQuestions.map((q, idx) => (
              <div key={idx} className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-1">{q.question}</label>
                <input
                  type="text"
                  placeholder="Your answer"
                  value={securityAnswers[q.question] || ""}
                  onChange={(e) => setSecurityAnswers({ ...securityAnswers, [q.question]: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                />
              </div>
            ))}
          </div>
        )}

        {apiError && <p className="text-red-500 text-xs text-left">{apiError}</p>}

        {/* Account locked section */}
        {accountLocked && (
          <div className="flex flex-col gap-2 mt-2">
            <button
              type="button"
              onClick={handleRequestUnlock}
              disabled={unlockSubmitting}
              className={`text-sm px-3 py-1 rounded ${
                unlockSubmitting
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              }`}
            >
              {unlockSubmitting ? "Requesting..." : "Request unlock link"}
            </button>

            {/* Display backend unlock and preview URLs */}
            {unlockLink && (
              <div className="mt-2 text-xs text-left bg-gray-50 p-2 rounded border border-gray-200 break-all">
                <strong>Unlock Link:</strong>{" "}
                <a href={unlockLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {unlockLink}
                </a>
              </div>
            )}
            {previewUrl && (
              <div className="mt-1 text-xs text-left bg-gray-50 p-2 rounded border border-gray-200 break-all">
                <strong>Preview URL:</strong>{" "}
                <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {previewUrl}
                </a>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-md font-semibold transition ${
            isSubmitting ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-teal-700 text-white hover:bg-teal-800"
          }`}
        >
          {securityRequired ? (isSubmitting ? "Verifying..." : "Verify Answers") : isSubmitting ? "Signing in..." : "Log In"}
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
