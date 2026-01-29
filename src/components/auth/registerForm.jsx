import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  validatePasswordComplexity,
  scorePassword,
} from "../../utils/passwordUtils.js";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Shield,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = ({ onSuccess, switchToLogin }) => {
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [securityQuestions, setSecurityQuestions] = useState([
    { question: "What is your favorite hobby?", answer: "" },
    { question: "What is your favorite book?", answer: "" },
  ]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must contain exactly 10 digits"),
      email: Yup.string()
        .email("Invalid email")
        .matches(/\.com$/, "Email must end with .com")
        .required("Email is required"),
      password: Yup.string()
        .test(
          "password-complexity",
          "Password must meet complexity rules",
          (value) => {
            if (!value) return false;
            const res = validatePasswordComplexity(value, {
              minLength: 8,
              requireCategories: 3,
            });
            return res.isValid;
          }
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setApiError("");

        if (securityQuestions.some((q) => !q.answer.trim())) {
          toast.error("Please answer all security questions");
          return;
        }

        const response = await axios.post(
          "http://localhost:5050/api/auth/register",
          {
            fullName: values.fullName,
            phone: values.phoneNumber,
            email: values.email,
            password: values.password,
            securityQuestions,
          }
        );

        toast.success("Account created successfully!");
        resetForm();
        setSecurityQuestions(
          securityQuestions.map((q) => ({ ...q, answer: "" }))
        );

        setTimeout(() => onSuccess && onSuccess(), 1200);
      } catch (err) {
        const msg = err.response?.data?.message || "Registration failed";
        setApiError(msg);
        toast.error(msg);
      }
    },
  });

  const [pwScore, setPwScore] = useState(0);
  const [pwLabel, setPwLabel] = useState("Weak");
  const [pwDetails, setPwDetails] = useState({});

  useEffect(() => {
    const pw = formik.values.password;
    setPwDetails(
      validatePasswordComplexity(pw, {
        minLength: 8,
        requireCategories: 3,
      })
    );
    const s = scorePassword(pw);
    setPwScore(s.score);
    setPwLabel(s.label);
  }, [formik.values.password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-gray-200 p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="text-white w-8 h-8" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-purple-700">
            Create Your ClinicFlow Account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Secure access to smarter healthcare
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* User Info */}
          <section>
            <h3 className="section-title">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              <InputField
                name="fullName"
                placeholder="Full Name"
                icon={<User />}
                formik={formik}
              />
              <InputField
                name="phoneNumber"
                placeholder="Phone Number"
                icon={<User />}
                formik={formik}
              />
              <InputField
                name="email"
                placeholder="Email Address"
                icon={<Mail />}
                formik={formik}
              />
            </div>
          </section>

          {/* Passwords */}
          <section>
            <h3 className="section-title">Account Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <PasswordField
                name="password"
                placeholder="Create Password"
                showPassword={showPassword}
                togglePassword={() => setShowPassword(!showPassword)}
                formik={formik}
              />
              <PasswordField
                name="confirmPassword"
                placeholder="Confirm Password"
                showPassword={showConfirmPassword}
                togglePassword={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                formik={formik}
                showValidation
                isValid={
                  formik.values.confirmPassword ===
                  formik.values.password
                }
              />
            </div>

            <PasswordStrength
              pwScore={pwScore}
              pwLabel={pwLabel}
              pwDetails={pwDetails}
            />
          </section>

          {/* Security Questions */}
          <section className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="section-title text-blue-900">
              Security Questions
            </h3>
            <p className="text-xs text-blue-700 mb-4">
              These protect your account if someone else tries to log in.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {securityQuestions.map((q, idx) => (
                <div key={idx}>
                  <label className="text-xs font-medium text-gray-700">
                    {q.question}
                  </label>
                  <input
                    type="text"
                    value={q.answer}
                    onChange={(e) => {
                      const updated = [...securityQuestions];
                      updated[idx].answer = e.target.value;
                      setSecurityQuestions(updated);
                    }}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-teal-500"
                    placeholder="Your secret answer"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex-1 py-3 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition disabled:bg-gray-300"
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={switchToLogin}
              className="flex-1 py-3 rounded-lg border-2 border-purple-700 text-purple-700 hover:bg-purple-50 transition"
            >
              Back to Login
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

/* ----------------- Reusable UI Components ----------------- */

const sectionTitleClass =
  "text-sm font-semibold text-gray-700 uppercase tracking-wide";

const InputField = ({ name, placeholder, icon, formik }) => (
  <div className="relative">
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className="w-full rounded-lg border border-gray-300 px-10 py-2 text-sm focus:ring-2 focus:ring-purple-500"
    />
    <div className="absolute left-3 top-2.5 text-gray-400">{icon}</div>
  </div>
);

const PasswordField = ({
  name,
  placeholder,
  showPassword,
  togglePassword,
  formik,
}) => (
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      name={name}
      placeholder={placeholder}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className="w-full rounded-lg border border-gray-300 px-10 py-2 text-sm focus:ring-2 focus:ring-purple-500"
    />
    <Lock className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
   <button
  type="button"
  onClick={togglePassword}
  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
>
  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
</button>

  </div>
);

const PasswordStrength = ({ pwScore, pwLabel, pwDetails }) => (
  <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
    <div className="flex justify-between text-xs font-semibold">
      <span>Password Strength</span>
      <span className="text-purple-700">{pwLabel}</span>
    </div>

    <div className="mt-2 h-2 bg-gray-300 rounded-full overflow-hidden">
      <div
        className="h-full bg-purple-600 transition-all"
        style={{ width: `${(pwScore / 4) * 100}%` }}
      />
    </div>

    <ul className="mt-3 grid grid-cols-2 gap-2 text-xs">
      {[
        ["Min 8 chars", pwDetails.lengthOk],
        ["Uppercase", pwDetails.hasUpper],
        ["Lowercase", pwDetails.hasLower],
        ["Number", pwDetails.hasDigit],
        ["Symbol", pwDetails.hasSymbol],
      ].map(([text, ok]) => (
        <li key={text} className="flex items-center gap-1">
          {ok ? (
            <CheckCircle className="w-3 h-3 text-green-600" />
          ) : (
            <XCircle className="w-3 h-3 text-gray-400" />
          )}
          {text}
        </li>
      ))}
    </ul>
  </div>
);

export default RegisterForm;
