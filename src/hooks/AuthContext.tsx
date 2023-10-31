import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export interface User {
  user_id?: number;
  organizations: string[];
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
  permissions: string[];
}

interface AuthState {
  token: string;
  user: User;
  roles: any;
  ticket_generate: string | any;
}

interface SignInCredentials {
  email: string;
  password: string;
  tenant_id: any;
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
  const navigate = useNavigate();
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@live:token');
    const user = localStorage.getItem('@live:user');
    const ticket_generate = localStorage.getItem('@live:ticket');
    const roles = localStorage.getItem('@live:rules');
    const permissions = localStorage.getItem('@live:permissions');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user), roles, permissions, ticket_generate };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password, tenant_id }: any) => {
    const response = await api.post('/login', {
      email,
      password,
      tenant_id
    });

    const { token, user, roles, ticket_generate } = response.data.result;
    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@live:token', token);
    localStorage.setItem('@live:user', JSON.stringify(user));
    localStorage.setItem('@live:rules', roles);
    localStorage.setItem('@live:ticket', ticket_generate);
    localStorage.setItem('@live:permissions', JSON.stringify(user.permissions));

    setData({ token, user, roles, ticket_generate });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@live:token');
    localStorage.removeItem('@live:user');
    localStorage.removeItem('@live:rules');
    localStorage.removeItem('@live:permissions');
    localStorage.removeItem('@live:ticket');
    localStorage.removeItem('elapsedTime');
    sessionStorage.removeItem('tenant_id');
    sessionStorage.removeItem('bucket');

    const instanceName = sessionStorage.getItem('tenantName');

    if (instanceName) {
      navigate(`/login/${instanceName}`);
    }

    setData({} as AuthState);
  }, [navigate]);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@live:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
        roles: data.roles,
        ticket_generate: data.ticket_generate
      });
    },
    [data.token, data.roles, data.ticket_generate]
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
