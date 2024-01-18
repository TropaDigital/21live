import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface TotalInfoProps {
  requestsTotal: number;
  tasksTotal: number;
}

const TotalInfosContext = createContext<TotalInfoProps | undefined>(undefined);

export const TotalInfosProvider: React.FC<{ children: React.ReactNode }> = ({ children }: any) => {
  const [infos, setInfos] = useState<TotalInfoProps>({
    requestsTotal: 0,
    tasksTotal: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/notification');
        const data = response.data.result;

        setInfos({
          requestsTotal: data.ticket_notifications,
          tasksTotal: data.task_notifications
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return <TotalInfosContext.Provider value={infos}>{children}</TotalInfosContext.Provider>;
};

export const useTotalInfos = (): TotalInfoProps => {
  const context = useContext(TotalInfosContext);
  if (!context) {
    throw new Error('useTotalInfos must be used within a NumberProvider');
  }
  return context;
};
