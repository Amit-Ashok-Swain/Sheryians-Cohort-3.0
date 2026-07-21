import { useEffect, useRef } from "react";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { loggedInUser } = useAuth();
  const hasToasted = useRef(false);

  useEffect(() => {
    if (!loggedInUser && !hasToasted.current) {
      toast.error("Not authorized, please log in", {
        duration: 3000,
        position: "bottom-right",
        id: "auth-guard-error",
      });
      hasToasted.current = true;
    }
  }, [loggedInUser]);

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
