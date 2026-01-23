import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/auth-store";

interface Props {
  children: React.ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated } = useAuthStore((state) => state);

  // If logged in, allow access
  return children;
};

export default PublicRoute;
