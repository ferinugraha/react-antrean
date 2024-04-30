import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import NotFound from "./pages/NotFoundPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setRole("user");
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

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage authenticateUser={authenticateUser} />
            )
          }
        />
        <Route
          path="/register"
          element={<RegisterPage authenticateUser={authenticateUser} />}
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home role={role} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/about"
          element={
            isLoggedIn ? (
              <About role={role} handleLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
