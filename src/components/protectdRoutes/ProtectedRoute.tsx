import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUser } from "../../features/auth/auththunks";
// import type { RootState } from "../../store/store";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {

  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;