import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Home from "./Home";
import PayoutCalculator from "./PayoutCalculator";
import PayoutDetails from "./PayoutDetails";
import NewsAnalytics from "./NewsAnalytics";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const ProtectedRoute = ({ element, isAuth }) => {
    return isAuth ? element : <Navigate to="/login" />;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/PayoutCalculator"
            element={<PayoutCalculator />}
          ></Route>
          <Route path="/PayoutDetails" element={<PayoutDetails />}></Route>
          <Route
            path="/login"
            element={<Login setisAuthenticated={setisAuthenticated} />}
          ></Route>
          <Route path="/NewsAnalytics" element={<NewsAnalytics />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute element={<Home />} isAuth={isAuthenticated} />
            }
          />

          <Route path="/logout" element={<Logout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
