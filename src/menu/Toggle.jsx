import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="hamburger-menu-container">
      <span className="hamburger-icon" onClick={toggleMenu}>
        {isOpen ? (
          <span className="close-icon">✖</span>
        ) : (
          <span className="hamburger-line">☰</span>
        )}
      </span>

      <div className={`menu ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard">DashBoard</NavLink>
          </li>
          <li>
            <NavLink to="/NewsAnalytics">NewsAnalytics</NavLink>
          </li>
          <li>
            <NavLink to="/PayoutCalculator">Payout Calculator</NavLink>
          </li>

          <li>
            <NavLink to="/PayoutDetails">PayoutDetails</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Toggle;
