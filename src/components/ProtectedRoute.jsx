// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
