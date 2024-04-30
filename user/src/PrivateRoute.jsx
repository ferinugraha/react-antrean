import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
  element: Element,
  isLoggedIn,
  allowedRoles,
  userRole,
  ...rest
}) => {
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" />;
  }

  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
