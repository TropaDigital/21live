import React from "react";
import { AuthProvider } from "./AuthContext";
import { ToastProvider } from "./toast";

type BoxProps = {
  children: React.ReactNode; // 👈️ type children
};

const AppProvider: React.FC<BoxProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;