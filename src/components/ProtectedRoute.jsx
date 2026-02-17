import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Optional: show loading while checking auth state
  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  // If user is not logged in, redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // If user is logged in, render children (protected component)
  return children;
};

export default ProtectedRoute;
