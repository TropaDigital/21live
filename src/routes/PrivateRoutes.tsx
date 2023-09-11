import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

export function PrivateRoutes({ children }: any) {
  const { user } = useAuth();

  return !!user ? children : window.location.replace('https://app.21live.com.br/');
  // return !!user ? children : <Navigate to="/login" />
}