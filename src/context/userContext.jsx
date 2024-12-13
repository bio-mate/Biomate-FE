// import React, { createContext, useState, useContext } from "react";
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use named import
// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      //const decodedToken = jwtDecode(token); // Decode the token to get user data
      setUser(token); // Set user data
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token); // Store token
    setIsAuthenticated(true);              // Set authenticated state
    //const decodedToken = jwtDecode(token); // Decode the token
    setUser(token);                  // Store user data (e.g., user ID, roles, etc.)
  };

  const logout = () => {
    localStorage.removeItem('token');      // Remove token
    setIsAuthenticated(false);              // Reset authenticated state
    setUser(null);                          // Clear user data
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
