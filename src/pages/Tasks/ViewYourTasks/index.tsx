/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Components
import HeaderPage from '../../../components/HeaderPage';
import { ContainerDefault } from '../../../components/UiElements/styles';
import TaskTable from '../../../components/Ui/TaskTable';
import ModalLoader from '../../../components/Ui/ModalLoader';

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
  const [taskOrder, setTaskOrder] = useState<string>('desc');
  const { data, pages, isFetching } = useFetch<any[]>(
    `my-tasks?search=${search.replace(/[^\w ]/g, '')}&page=${selected}&order=${taskOrder}`
  );

  const handleFilters = () => {
    console.log('log do filters on task');
  };

  const handleNavigateTask = (infos: any) => {
    // console.log('log do navigate task =>', infos.task);
    // const taskId = infos?.task?.task_id;
    // navigate(`/entregas/${infos.task.task_id}`, { state: taskId });
    if (infos.task.deliverys.length > 1) {
      // const taskId = infos?.task?.task_id;
      const taskDetails = {
        delivery: infos.task.deliverys[0],
        task: infos.task,
        task_index: infos.task_index
      };
      navigate(`/entregas/${infos.task.task_id}`, { state: taskDetails });
    }

    if (infos.task.deliverys.length <= 1) {
      const taskDetails = {
        delivery: infos.task.deliverys[0],
        task: infos.task,
        task_index: infos.task_index
      };
      navigate(`/entrega/${infos.task.task_id}`, { state: taskDetails });
    }
  };

  return (
    <ContainerDefault>
      <HeaderPage title="Minhas tarefas" />

      {!isFetching && (
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
          orderSelected={setTaskOrder}
        />
      )}

      {/* Modal loading submit */}
      <ModalLoader isOpen={isFetching} />
    </ContainerDefault>
  );
}
