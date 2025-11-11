import React, { createContext, useContext, useState } from "react";

type User = { // Represents a user in the application
  username: string;
};

type AuthContextType = { // Context type for authentication
  user: User | null; // Current authenticated user or null if not authenticated
  login: (username: string) => void; // Function to log in a user
  logout: () => void; // Function to log out the current user
};

const AuthContext = createContext<AuthContextType | undefined>(undefined); // Create a context for authentication

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { // AuthProvider component to provide authentication context
  const [user, setUser] = useState<User | null>(null); // State to hold the current user

  const login = (username: string) => { // Function to log in a user
    setUser({ username }); // Set the user state with the provided username
  };

  const logout = () => { // Function to log out the current user
    setUser(null);// Clear the user state
  };

  return (
    // Provide the authentication context to children components
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => { // Custom hook to use the authentication context
  const context = useContext(AuthContext); // Get the authentication context
  if (!context) { // If context is undefined, it means useAuth is used outside of AuthProvider
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
