import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore, { Role } from '@/store/auth-store';

interface Props {
  allowedRoles: Role[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const IS_DEV = import.meta.env.MODE === 'development';

  if (IS_DEV) return <Outlet />;

  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (
    !user ||
    (!allowedRoles.includes(user.role as Role) &&
      !allowedRoles.includes(user.role.toUpperCase() as Role))
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
