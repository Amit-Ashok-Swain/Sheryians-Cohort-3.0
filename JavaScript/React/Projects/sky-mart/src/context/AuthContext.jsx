import { createContext, useState, useEffect } from "react";

export const Auth = createContext(null);

export const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("reg-user");
      return storedUser ? JSON.parse(storedUser) : [];
    } catch (error) {
      console.error("Failed to parse registered users:", error);
      return [];
    }
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      const storedLogUser = localStorage.getItem("log-user");
      return storedLogUser ? JSON.parse(storedLogUser) : undefined;
    } catch (error) {
      console.error("Failed to parse logged in user:", error);
      return undefined;
    }
  });

  return (
    <Auth.Provider
      value={{
        registeredUser,
        setRegisteredUser,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
