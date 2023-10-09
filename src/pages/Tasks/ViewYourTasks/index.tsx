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
  const { data, pages } = useFetch<any[]>(`my-tasks?search=${search}&page=${selected}`);

  const handleFilters = () => {
    console.log('log do filters on task');
  };

  const handleNavigateTask = (infos: any) => {
    const taskId = infos?.task?.task_id;
    navigate(`/entregas/${infos.task.task_id}`, { state: taskId });
  };

  return (
    <ContainerDefault>
      <HeaderPage title="Minhas tarefas" />

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
        pages={pages}
        pageSelected={setSelected}
      />
    </ContainerDefault>
  );
}