/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Components
import HeaderPage from '../../../components/HeaderPage';
import { ContainerDefault } from '../../../components/UiElements/styles';
import TaskTable from '../../../components/Ui/TaskTable';

// Hooks
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<number>(1);
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const { data, pages } = useFetch<any[]>(`tasks?filter=task&search=${search}&page=${selected}`);

  // const data = [
  //   {
  //     date: '2023/07/15',
  //     tasks: [
  //       {
  //         id: '001',
  //         projectInfo: {
  //           taskTitle: 'Cronograma',
  //           month: 'Julho/2023',
  //           client: 'G.WIND',
  //           type: 'FEE',
  //           quantity: 'PACK 8 POSTS/MÊS'
  //         },
  //         consumedTime: '00:30:00',
  //         estimatedTime: '02:00:00',
  //         startDate: '2023/06/26',
  //         endDate: '2023/07/15',
  //         deliveries: '4 produtos',
  //         stage: 'Criação',
  //         flow: 'CAMPANHA',
  //         status: 'progress'
  //       },
  //       {
  //         id: '002',
  //         projectInfo: {
  //           taskTitle: 'Cronograma',
  //           month: 'Agosto/2023',
  //           client: 'G.WIND',
  //           type: 'FEE',
  //           quantity: 'PACK 8 POSTS/MÊS'
  //         },
  //         consumedTime: '00:00:00',
  //         estimatedTime: '02:00:00',
  //         startDate: '2023/07/16',
  //         endDate: '2023/07/25',
  //         deliveries: '4 produtos',
  //         stage: 'Criação',
  //         flow: 'CAMPANHA',
  //         status: 'pending'
  //       }
  //     ]
  //   },
  //   {
  //     date: '2023/06/02',
  //     tasks: [
  //       {
  //         id: '003',
  //         projectInfo: {
  //           taskTitle: 'Cronograma',
  //           month: 'Agosto/2023',
  //           client: 'G.WIND',
  //           type: 'FEE',
  //           quantity: 'PACK 4 POSTS/MÊS'
  //         },
  //         consumedTime: '00:00:00',
  //         estimatedTime: '02:00:00',
  //         startDate: '2023/06/26',
  //         endDate: '2023/07/15',
  //         deliveries: '4 produtos',
  //         stage: 'Criação',
  //         flow: 'CAMPANHA',
  //         status: 'pending'
  //       },
  //       {
  //         id: '004',
  //         projectInfo: {
  //           taskTitle: 'Cronograma',
  //           month: 'Agosto/2023',
  //           client: 'G.WIND',
  //           type: 'FEE',
  //           quantity: 'PACK 4 POSTS/MÊS'
  //         },
  //         consumedTime: '00:00:00',
  //         estimatedTime: '02:00:00',
  //         startDate: '2023/07/16',
  //         endDate: '2023/07/25',
  //         deliveries: '4 produtos',
  //         stage: 'Criação',
  //         flow: 'CAMPANHA',
  //         status: 'pending'
  //       }
  //     ]
  //   }
  // ];

  const handleFilters = () => {
    console.log('log do filters on task');
  };

  const handleNavigateTask = (infos: any) => {
    navigate(`/tarefa/${infos.task.task_id}`, { state: infos });
  };

  return (
    <ContainerDefault>
      <HeaderPage title="Suas tarefas" />

      <TaskTable
        data={data ? data : []}
        loading={isLoading}
        searchInput={(value: any) => {
          setSearchTerm(value);
          debouncedCallback(value);
        }}
        searchInfo={searchTerm}
        addFilter={handleFilters}
        taskSelected={handleNavigateTask}
      />
    </ContainerDefault>
  );
}
