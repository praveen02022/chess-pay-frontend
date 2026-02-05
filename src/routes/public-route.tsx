import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/auth-store';

interface Props {
  children: React.ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore((state) => state);

  // If already logged in → redirect away from login/register
  if (isAuthenticated) {
    if (user?.role === 'ORGANIZER') {
      return <Navigate to="/organizer" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
