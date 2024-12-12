// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode'; // Use named import


// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//       const decodedToken = jwtDecode(token); // Decode the token to get user data
//       setUser(decodedToken); // Set user data
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token); // Store token
//     setIsAuthenticated(true);              // Set authenticated state
//     const decodedToken = jwtDecode(token); // Decode the token
//     setUser(decodedToken);                  // Store user data (e.g., user ID, roles, etc.)
//   };

//   const logout = () => {
//     localStorage.removeItem('token');      // Remove token
//     setIsAuthenticated(false);              // Reset authenticated state
//     setUser(null);                          // Clear user data
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
