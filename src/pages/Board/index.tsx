// react
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import { useFetch } from '../../hooks/useFetch';

// Components
import HeaderFlow from '../../components/HeaderFlowPage';
import Column from '../../components/Ui/Column';
import ScrollAreas from '../../components/Ui/ScrollAreas';
import Task from '../../components/Ui/Task';
import Loader from '../../components/LoaderSpin';

// Styles
import { Container, ContentBoard } from './styles';

interface ITask {
  task_id: string;
  title: string;
  tenant_id?: string;
  project_product_id?: string;
  flow_id?: string;
  description: string;
  creation_description?: string;
  creation_date_end?: string;
  copywriting_description?: string;
  copywriting_date_end?: string;
  created?: string;
  updated?: string;
  type: string;
  total_time?: string;
  status?: string;
  time_consumed?: string;
  team?: [];
  type_play?: string;
  user_id?: string;
  urgent?: string;
  ticket_id?: string;
  start_job?: string;
  end_job?: string;
  organization_id?: string;
  requester_id?: string;
}

interface ITaskColumn {
  card_id: string;
  flow_id: string;
  step: string;
  name: string;
  necessary_upload: string;
  tenant_approve?: string;
  manager_approve?: string;
  necessary_responsible?: string;
  email_alert: string;
  previous_step: string;
  function_id?: string;
  idCreator: string;
  nameCreator: string;
  next_step: string;
  tasks: ITask[];
}

export default function Board() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isFetching } = useFetch<ITaskColumn[]>(`/card-task/${location.state.id}`);

  // const updateTask = (
  //   columns: ITaskColumn[],
  //   taskId: number,
  //   updatedTask: ITask
  // ) => {
  //   setBoards(
  //     columns.map((column) => {
  //       if (column.id === taskId) {
  //         return {
  //           ...column,
  //           tasks: column.tasks.map((task) => {
  //             if (task.id === updatedTask.id) {
  //               return {...task, ...updatedTask};
  //             }
  //             return {...task};
  //           }),
  //         };
  //       }
  //       return {...column};
  //     })
  //   );
  // };

  // const handleCreateTask = (column: ITaskColumn, task: ITask) => {
  //   setBoards(
  //     boards.map((obj) => {
  //       if (obj.id === column.id) {
  //         return {
  //           ...column,
  //           tasks: [...column.tasks, {...task}],
  //         };
  //       }
  //       return {...column};
  //     })
  //   );
  // };

  // const handleDeleteTask = (column: ITaskColumn, taskId: number) => {
  //   setBoards(
  //     boards.map((obj) => {
  //       if (obj.id === column.id) {
  //         return {
  //           ...column,
  //           tasks: [...column.tasks.filter((task) => task.id !== taskId)],
  //         };
  //       }
  //       return {...column};
  //     })
  //   );
  // };

  return (
    <Container>
      <HeaderFlow title={location.state.name} backButton={() => navigate(-1)} />

      {isFetching && <Loader />}

      {!isFetching && (
        <ScrollAreas>
          <ContentBoard>
            {data?.map((row) => (
              <Column key={row.card_id} title={row.name} taskLength={row.tasks.length}>
                {row.tasks.map((item) => (
                  <Task key={item.task_id} data={item} />
                ))}
              </Column>
            ))}
          </ContentBoard>
        </ScrollAreas>
      )}
    </Container>
  );
}
