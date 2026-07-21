import { useContext } from "react";
import { Auth } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(Auth);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
