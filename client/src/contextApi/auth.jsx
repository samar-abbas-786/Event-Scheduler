import React, { createContext, useState } from "react";

// Create the context
export const authContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  // The value provided to the context consumers
  const contextValue = { authorized, setAuthorized, user, setUser };

  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};
