import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface ProtectedRouteProps {
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = "/",
}) => {
  const { isAuthenticated, loading } = useAuth();

  // Show a loading spinner or placeholder while restoration is in progress
  if (loading) {
    return <div>Loading...</div>; // Replace with your preferred loading UI
  }

  // Redirect to the login page if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render child routes/components if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
