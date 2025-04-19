import React from 'react';
import { Navigate } from 'react-router-dom';


interface NotProtectedRouteProps {
  children: React.ReactNode
 
}

export const NotProtectedRoute: React.FC<NotProtectedRouteProps> = ({ children }) => {
  const isLogin = localStorage.getItem('token');
 

  // Check if the user is logged in
  if (isLogin) {
    
    return <Navigate to="/dashboard" />;
  }
 



  return <>{children}</>;
};
