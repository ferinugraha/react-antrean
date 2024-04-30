import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import NotFound from "./pages/NotFoundPage";

const roles = {
  guest: ["/", "/register"],
  user: ["/home", "/about"],
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Simulate retrieving user role from local storage or a context
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setIsLoggedIn(true);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem("userRole", role); // Simulate storing role in localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    localStorage.removeItem("userRole"); // Simulate removing role from localStorage
  };

  const isRouteAccessible = (route) => {
    if (!isLoggedIn) return false; // Redirect to login if not logged in
    return roles[userRole].includes(route);
  };

  const ProtectedRoute = ({ element, path }) => {
    return isRouteAccessible(path) ? element : <Navigate to="/not-found" />;
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} path="/home" />}
        />
        <Route
          path="/about"
          element={<ProtectedRoute element={<About />} path="/about" />}
        />
        <Route
          path="/logout"
          element={<button onClick={handleLogout}>Logout</button>}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
