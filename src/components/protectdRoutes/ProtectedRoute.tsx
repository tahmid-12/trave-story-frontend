import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/store";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;