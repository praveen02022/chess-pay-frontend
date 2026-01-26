import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/auth-store';

interface Props {
  children: React.ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuthStore((state) => state);

  // If already logged in → redirect away from login/register
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
