import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dotenv from "dotenv";
function Signup() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("apiUrl: ", apiUrl);

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(
        `${apiUrl}/api/register`,
        { username, email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((result) => {
        navigate("/login");
        console.log(result);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="topcontainer">
      <div className="container">
        <h1>Sign Up</h1>
        <form className="form signup-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p>Sign up to explore new opportunities</p>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <span className="input-icon">👤</span>
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="input-icon">📧</span>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-icon">🔒</span>
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
          <p className="switch-text">
            Already have an account?{" "}
            <span className="toggle-form" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
