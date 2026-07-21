import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";

const AuthProtected = () => {
  const { loggedInUser } = useAuth();

  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthProtected;
