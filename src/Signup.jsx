import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get API URL from environment variable with fallback
  const apiUrl =
    import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

  const navigate = useNavigate();

  // Input validation rules
  const validationRules = {
    username: {
      pattern: /^[a-zA-Z0-9_]{3,20}$/,
      message:
        "Username must be 3-20 characters (letters, numbers, underscores only).",
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.(com|net|org|io|gov|edu|in|co|dev)$/i,
      message: "Invalid email format.",
    },
    password: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
      message:
        "Password must be at least 6 characters and contain 1 letter & 1 number.",
    },
  };

  // Validate single field
  const validateField = (name, value) => {
    if (!value.trim()) {
      return "This field is required.";
    }
    const rule = validationRules[name];
    return rule.pattern.test(value) ? "" : rule.message;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear general error when user starts typing
    setError("");

    // Validate field on change
    const fieldError = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  // Check if form is valid
  const isFormValid = () => {
    const errors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const fieldError = validateField(field, formData[field]);
      errors[field] = fieldError;
      if (fieldError) isValid = false;
    });

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Please fix the errors in the form.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Add timeout to axios request
      const response = await axios.post(`${apiUrl}/api/register`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        timeout: 5000, // 5 second timeout
      });

      if (response.data.success) {
        setSuccess("Signup successful! Redirecting to login...");
        setFormData({ username: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Signup error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        origin: window.location.origin,
      });

      // Handle different types of errors
      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please try again.");
      } else if (!err.response) {
        setError(
          `Cannot connect to server at ${apiUrl}. Please check if the server is running.`
        );
      } else if (err.response.status === 409) {
        setError(
          err.response.data.message || "Username or email already exists."
        );
      } else if (err.response.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="topcontainer">
      <div className="container">
        <h1>Sign Up</h1>
        <form className="form signup-form" onSubmit={handleSubmit} noValidate>
          <h2>Create Account</h2>
          <p>Sign up to explore new opportunities</p>

          {error && (
            <div className="error-message text-red-500 mb-4 resultmsg">
              {error}
            </div>
          )}
          {success && (
            <div className="success-message text-green-500 mb-4 resultmsg">
              {success}
            </div>
          )}

          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              aria-label="Username"
              className={formErrors.username ? "error" : ""}
            />
            <span className="input-icon" aria-hidden="true">
              👤
            </span>
            {formErrors.username && (
              <div className="field-error text-red-500 text-sm mt-1">
                {formErrors.username}
              </div>
            )}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              aria-label="Email"
              className={formErrors.email ? "error" : ""}
            />
            <span className="input-icon" aria-hidden="true">
              📧
            </span>
            {formErrors.email && (
              <div className="field-error text-red-500 text-sm mt-1">
                {formErrors.email}
              </div>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              aria-label="Password"
              className={formErrors.password ? "error" : ""}
            />
            <span className="input-icon" aria-hidden="true">
              🔒
            </span>
            {formErrors.password && (
              <div className="field-error text-red-500 text-sm mt-1">
                {formErrors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span
              className="toggle-form"
              onClick={() => navigate("/login")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
