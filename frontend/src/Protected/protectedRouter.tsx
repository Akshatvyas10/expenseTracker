import React from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  children: React.ReactNode
 
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLogin = localStorage.getItem('token');
 

  // Check if the user is logged in
  if (!isLogin) {
    localStorage.clear()
    return <Navigate to="/" />;
  }
 



  return <>{children}</>;
};
