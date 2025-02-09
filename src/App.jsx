import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Home from "./Home";
import PayoutCalculator from "./PayoutCalculator";
import PayoutDetails from "./PayoutDetails";
import NewsAnalytics from "./NewsAnalytics";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Toggle from "./menu/Toggle";
import Dashboard from "./Dashboard";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/PayoutCalculator"
            element={<PayoutCalculator />}
          ></Route>
          <Route path="/PayoutDetails" element={<PayoutDetails />}></Route>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/NewsAnalytics" element={<NewsAnalytics />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
