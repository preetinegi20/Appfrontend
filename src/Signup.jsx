import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const apiUrl = import.meta.env.BACKEND_API_URL || "http://localhost:3000";

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };
  function validateInput(type, value) {
    const EMAIL_REGEX =
      /^[^\s@]+@[^\s@]+\.(com|net|org|io|gov|edu|in|co|dev)$/i;
    const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
    const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    switch (type) {
      case "username": {
        return USERNAME_REGEX.test(value)
          ? ""
          : "Username must be 3-20 characters (letters, numbers, underscores only).";
      }
      case "email": {
        return EMAIL_REGEX.test(value) ? "" : "Invalid email format.";
      }
      case "password": {
        return PASSWORD_REGEX.test(value)
          ? ""
          : "Password must be at least 6 characters and contain 1 letter & 1 number.";
      }
      default:
        return "Invalid Input type";
    }
  }
  const validateUsernameERROR = validateInput("username", formData.username);
  const validateEmailERROR = validateInput("email", formData.email);
  const validatePassERROR = validateInput("password", formData.password);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (validateUsernameERROR || validateEmailERROR || validatePassERROR) {
      setError(
        validateUsernameERROR || validateEmailERROR || validatePassERROR
      );
      console.log(error);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setSuccess("Signup successful! Redirecting to login...");
        setFormData({ username: "", email: "", password: "" });
        navigate("/login");
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Signup error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (!err.response) {
        console.log(err.response);
        setError("Network error. Please check your connection.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // Rest of the component remains the same...

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
            />
            <span className="input-icon" aria-hidden="true">
              👤
            </span>
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
            />
            <span className="input-icon" aria-hidden="true">
              📧
            </span>
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
            />
            <span className="input-icon" aria-hidden="true">
              🔒
            </span>
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
