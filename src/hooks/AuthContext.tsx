import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import api from '../services/api';

export interface User {
  user_id?: number;
  organization_id: number;
  tenant_id: number;
  username: string;
  email?: string;
  name: string;
  avatar?: string;
  principalTenant?: string;
  function?: string;

  profiles: any;
  language?: string;
  hiring_date?: string;
  birthday?: string;
  phone?: string;
  companySince?: string;
  office?: string;
  cost_per_hour?: string;
}

interface AuthState {
  token: string;
  user: User;
  roles: any;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: TransactionsProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@live:token');
    const user = localStorage.getItem('@live:user');
    const roles = localStorage.getItem('@live:rules');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user), roles };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: any) => {
    const response = await api.post('/login', {
      email,
      password
    });

    const { token, user, roles } = response.data.result;
    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@live:token', token);
    localStorage.setItem('@live:user', JSON.stringify(user));
    localStorage.setItem('@live:rules', JSON.stringify(user.permissions));

    setData({ token, user, roles });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@live:token');
    localStorage.removeItem('@live:user');
    localStorage.removeItem('@live:rules');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@live:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
        roles: data.roles
      });
    },
    [setData, data.token, data.roles]
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
