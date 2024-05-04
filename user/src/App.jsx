/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

import NotFound from "./pages/NotFoundPage";
import HomeUser from "./users/HomeUser";
import HomeDoctor from "./doctor/HomeDoctor";
import HomeStaff from "./staff/HomeStaff";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setRole(token);
    }
  }, []);

  const authenticateUser = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem("token");
  };

  const checkRoleAndRender = (Component, expectedRole) => {
    return isLoggedIn && role === expectedRole ? (
      <Component role={role} handleLogout={handleLogout} />
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              role === "user" ? (
                <Navigate to="/home-user" replace />
              ) : role === "doctor" ? (
                <Navigate to="/home-doctor" replace />
              ) : role === "staff" ? (
                <Navigate to="/home-staff" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <LoginPage authenticateUser={authenticateUser} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              role === "user" ? (
                <Navigate to="/home-user" replace />
              ) : role === "doctor" ? (
                <Navigate to="/home-doctor" replace />
              ) : role === "staff" ? (
                <Navigate to="/home-staff" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <RegisterPage authenticateUser={authenticateUser} />
            )
          }
        />
        <Route
          path="/home-user"
          element={checkRoleAndRender(HomeUser, "user")}
        />
        <Route
          path="/home-doctor"
          element={checkRoleAndRender(HomeDoctor, "doctor")}
        />
        <Route
          path="/home-staff"
          element={checkRoleAndRender(HomeStaff, "staff")}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;