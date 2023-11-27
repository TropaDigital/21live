import React from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './toast';
import { StopwatchProvider } from './stopWatch';
import { ParamsProvider } from './useParams';

type BoxProps = {
  children: React.ReactNode; // 👈️ type children
};

const AppProvider: React.FC<BoxProps> = ({ children }) => {
  return (
    <AuthProvider>
      <StopwatchProvider>
        <ParamsProvider>
          <ToastProvider>{children}</ToastProvider>
        </ParamsProvider>
      </StopwatchProvider>
    </AuthProvider>
  );
};

export default AppProvider;
