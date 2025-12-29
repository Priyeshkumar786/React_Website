import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Agar login nahi hai → login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Agar login hai → requested page
  return <Outlet />;
};

export default ProtectedRoute;
