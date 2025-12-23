// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  if (!isLoggedIn()) {
    // Redirect to login with return path
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
  
  return children;
};

export default ProtectedRoute;
