import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const { auth, loading } = useContext(AuthContext);
  if (loading) {
    return null; // hoặc spinner
  }
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedAdminRoute;
