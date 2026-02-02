import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/store/auth-store";

interface Props {
  allowedRoles: Array<"ADMIN" | "ORGANIZER" | "USER">;
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  // 🔥 DEV BYPASS
  const IS_DEV = import.meta.env.DEV;

  if (IS_DEV) {
    return <Outlet />;
  }

  // 🔐 REAL LOGIC (will work later)
  const { isAuthenticated, user } = useAuthStore((state) => state);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
