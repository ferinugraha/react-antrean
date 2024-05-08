import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import HomeUser from "./pages/users/HomeUser";
import HomeDoctors from "./pages/doctor/HomeDoctor";
import HomeStaff from "./pages/staff/HomeStaff";
import NotFound from "./pages/NotFoundPage";
import AboutPage from "./pages/users/AboutPage";
import AntreanPage from "./pages/users/AntreanPage";
import NavbarWidget from "./widget/NavbarWidget";
import HomeAdmin from "./pages/admin/HomeAdmin";
import ReportPage from "./pages/admin/ReportPage";
import HistoryPage from "./pages/users/HistoryPage";
import ListUser from "./pages/admin/akun/PageList";
import KuotaPage from "./pages/admin/KuotaPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");

    if (token) {
      setIsLoggedIn(true);
      setRole(token);

      if (lastVisitedPage) {
        navigate(lastVisitedPage);
      }
    }
  }, []);

  const authenticateUser = (role) => {
    setIsLoggedIn(true);
    setRole(role);
    localStorage.setItem("token", role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("lastVisitedPage");
  };

  const navigate = (path) => {
    window.location.href = path;
    localStorage.setItem("lastVisitedPage", path);
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
              ) : role === "dokter" ? (
                <Navigate to="/home-doctor" replace />
              ) : role === "staff" ? (
                <Navigate to="/home-staff" replace />
              ) : role === "admin" ? (
                <Navigate to="/home-admin" replace />
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
              ) : role === "dokter" ? (
                <Navigate to="/home-doctor" replace />
              ) : role === "staff" ? (
                <Navigate to="/home-staff" replace />
              ) : role === "admin" ? (
                <Navigate to="/home-admin" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <RegisterPage authenticateUser={authenticateUser} />
            )
          }
        />

        <Route path="/home-user">
          <Route
            index
            element={
              <div>
                <NavbarWidget handleLogout={handleLogout} role={role} />
                {checkRoleAndRender(HomeUser, "user")}
              </div>
            }
          />
        </Route>

        <Route
          path="/about"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(AboutPage, "user")}
            </div>
          }
        />

        <Route
          path="/antrean"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(AntreanPage, "user")}
            </div>
          }
        />

        <Route
          path="/history"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(HistoryPage, "user")}
            </div>
          }
        />

        <Route
          path="/home-doctor"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(HomeDoctors, "dokter")}
            </div>
          }
        />

        <Route
          path="/home-admin"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(HomeAdmin, "admin")}
            </div>
          }
        />

        <Route
          path="/akun"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(ListUser, "admin")}
            </div>
          }
        />

        <Route
          path="/kuota"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(KuotaPage, "admin")}
            </div>
          }
        />

        <Route
          path="/report"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(ReportPage, "admin")}
            </div>
          }
        />

        <Route
          path="/home-staff"
          element={
            <div>
              <NavbarWidget handleLogout={handleLogout} role={role} />
              {checkRoleAndRender(HomeStaff, "staff")}
            </div>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
