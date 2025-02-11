import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    axios
      .post(`${apiUrl}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        navigate("/login"); // Redirect to login after logout
      })
      .catch((err) => console.error("Logout Error:", err));
  };

  return (
    <button onClick={handleLogout} className="logout">
      Logout
    </button>
  );
}

export default Logout;
