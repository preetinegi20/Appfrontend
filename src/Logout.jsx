import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.FRONTEND_API_URL || "http://localhost:3000";

  const handleLogout = async () => {
    try {
      // Get the access token from cookies or localStorage depending on your storage method
      await axios
        .post(
          `${apiUrl}/api/logout`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          navigate("/login"); // Redirect to login after logout
        });
    } catch (err) {
      const allCookies = document.cookie;
      console.log("All cookies:", allCookies);
      console.error("Logout Error:", err);
      // Handle specific error cases
      // if (err.response?.status === 401) {
      //   // If unauthorized, clear local storage and redirect to login anyway
      //   localStorage.clear();
      //   sessionStorage.clear();
      //   // navigate("/login");
      // }
    }
  };

  return (
    <button onClick={handleLogout} className="logout">
      Logout
    </button>
  );
}

export default Logout;
