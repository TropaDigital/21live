/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Components
import HeaderPage from '../../../components/HeaderPage';
import { ContainerDefault } from '../../../components/UiElements/styles';

// Hooks
import useDebouncedCallback from '../../../hooks/useDebounced';

import TaskTable from '../../../components/Ui/TaskTable';

export interface TaskProps {
  date: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  projectInfo: ProjectInfo;
  consumedTime: string;
  estimatedTime: string;
  startDate: string;
  endDate: string;
  deliveries: string;
  stage: string;
  flow: string;
  status: string;
}

export interface ProjectInfo {
  taskTitle: string;
  month: string;
  client: string;
  type: string;
  quantity: string;
}

export default function ViewTaskList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearchTerm(search),
    700
  );

  const data = [
    {
      date: '2023/07/15',
      tasks: [
        {
          id: '001',
          projectInfo: {
            taskTitle: 'Cronograma',
            month: 'Julho/2023',
            client: 'G.WIND',
            type: 'FEE',
            quantity: 'PACK 8 POSTS/MÊS'
          },
          consumedTime: '00:30:00',
          estimatedTime: '02:00:00',
          startDate: '2023/06/26',
          endDate: '2023/07/15',
          deliveries: '4 entregas',
          stage: 'Criação',
          flow: 'CAMPANHA',
          status: 'progress'
        },
        {
          id: '002',
          projectInfo: {
            taskTitle: 'Cronograma',
            month: 'Agosto/2023',
            client: 'G.WIND',
            type: 'FEE',
            quantity: 'PACK 8 POSTS/MÊS'
          },
          consumedTime: '00:00:00',
          estimatedTime: '02:00:00',
          startDate: '2023/07/16',
          endDate: '2023/07/25',
          deliveries: '4 entregas',
          stage: 'Criação',
          flow: 'CAMPANHA',
          status: 'pending'
        }
      ]
    },
    {
      date: '2023/06/02',
      tasks: [
        {
          id: '003',
          projectInfo: {
            taskTitle: 'Cronograma',
            month: 'Agosto/2023',
            client: 'G.WIND',
            type: 'FEE',
            quantity: 'PACK 4 POSTS/MÊS'
          },
          consumedTime: '00:00:00',
          estimatedTime: '02:00:00',
          startDate: '2023/06/26',
          endDate: '2023/07/15',
          deliveries: '4 entregas',
          stage: 'Criação',
          flow: 'CAMPANHA',
          status: 'pending'
        },
        {
          id: '004',
          projectInfo: {
            taskTitle: 'Cronograma',
            month: 'Agosto/2023',
            client: 'G.WIND',
            type: 'FEE',
            quantity: 'PACK 4 POSTS/MÊS'
          },
          consumedTime: '00:00:00',
          estimatedTime: '02:00:00',
          startDate: '2023/07/16',
          endDate: '2023/07/25',
          deliveries: '4 entregas',
          stage: 'Criação',
          flow: 'CAMPANHA',
          status: 'pending'
        }
      ]
    }
  ];

  const handleFilters = () => {
    console.log('log do filters on task');
  };

  return (
    <ContainerDefault>
      <HeaderPage title="Suas tarefas" />

      <TaskTable
        data={data}
        loading={isLoading}
        searchInput={(value: any) => {
          setSearchTerm(value);
          debouncedCallback(value);
        }}
        searchInfo={searchTerm}
        addFilter={handleFilters}
        taskSelected={(value: any) => console.log('log da task selected', value)}
      />
    </ContainerDefault>
  );
}