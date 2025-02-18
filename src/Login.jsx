import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const apiUrl =
    import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

  async function handleSubmit(e) {
    const api = axios.create({
      baseURL: apiUrl,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    await e.preventDefault();
    api
      .post(`${apiUrl}/api/login`, { email, password })
      .then(() => navigate("/home"))
      .catch((error) => {
        console.log(error);

        alert("incorrect email or password");

        // setTimeout(() => {
        //   setEmail(""); // Reset state after alert
        //   setPassword("");
        // }, 100); // Small delay ensures state update
      });
  }

  return (
    <div className="topcontainer">
      <div className="container">
        <h1>Login</h1>
        <form className="form login-form active" onSubmit={handleSubmit}>
          <h2>Welcome Back!</h2>
          <p>Login to your account to continue</p>
          <div className="input-group">
            <input
              value={email}
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="input-icon">📧</span>
          </div>
          <div className="input-group">
            <input
              value={password}
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-icon">🔒</span>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p className="switch-text">
            Don’t have an account?{" "}
            <span className="toggle-form">
              {" "}
              <Link to="/register" className="toggle-form">
                Sign Up
              </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
