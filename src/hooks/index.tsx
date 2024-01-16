import React from 'react';

import { AuthProvider } from './AuthContext';
import { ToastProvider } from './toast';
import { StopwatchProvider } from './stopWatch';
import { ParamsProvider } from './useParams';
import { TotalInfosProvider } from './useCounter';

type BoxProps = {
  children: React.ReactNode; // 👈️ type children
};

const AppProvider: React.FC<BoxProps> = ({ children }) => {
  return (
    <AuthProvider>
      <StopwatchProvider>
        <TotalInfosProvider>
          <ParamsProvider>
            <ToastProvider>{children}</ToastProvider>
          </ParamsProvider>
        </TotalInfosProvider>
      </StopwatchProvider>
    </AuthProvider>
  );
};

export default AppProvider;
