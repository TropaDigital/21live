import React from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './toast';
import { StopwatchProvider } from './stopWatch';

type BoxProps = {
  children: React.ReactNode; // 👈️ type children
};

const AppProvider: React.FC<BoxProps> = ({ children }) => {
  return (
    <AuthProvider>
      <StopwatchProvider>
        <ToastProvider>{children}</ToastProvider>
      </StopwatchProvider>
    </AuthProvider>
  );
};

export default AppProvider;
