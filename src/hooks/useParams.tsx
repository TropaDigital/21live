// React
import { createContext, useState, useEffect, useContext } from 'react';

// Services
import api from '../services/api';

interface TenantParams {
  input: string;
  dismemberment: string;
  change: string;
}

interface ParamsContextData {
  parameters: TenantParams;
}

const ParamsContext = createContext<ParamsContextData>({} as ParamsContextData);

function ParamsProvider({ children }: any) {
  const [data, setData] = useState<TenantParams>({
    input: '',
    dismemberment: '',
    change: ''
  });

  async function getParams() {
    try {
      const response = await api.get(`/config/input`);
      setData(response.data.result);
      localStorage.setItem('@jobs:params', JSON.stringify(response.data.result));
    } catch (error: any) {
      console.log('log do error catch Params', error);
    }
  }

  useEffect(() => {
    getParams();
  }, []);

  return <ParamsContext.Provider value={{ parameters: data }}>{children}</ParamsContext.Provider>;
}

function useParamsHook(): ParamsContextData {
  const context = useContext(ParamsContext);

  if (!context) {
    throw new Error('useParams must be used within an AuthProvider');
  }

  return context;
}

export { ParamsProvider, useParamsHook };
