import { useEffect } from 'react';

import HeaderPage from '../../components/HeaderPage';
import Column from '../../components/Ui/Column';
import ScrollAreas from '../../components/Ui/ScrollAreas';
import Task from '../../components/Ui/Task';

import {
  Container,
  ContentBoard,
} from './styles';
import useLocalStorage from '../../hooks/useLocalStorage';
import useColumn from '../../hooks/useColumn';
import useTask from '../../hooks/useTask';
import { useLocation, useParams } from 'react-router-dom';

interface ITask {
  id: number;
  column: string;
  title: string;
  users: any[];
  date: string;
  progress: {
    hoursinvested: string;
    hoursLeft: string;
  };
  completed: string;
}

interface ITaskColumn {
  id: number;
  title: string;
  creatable: boolean;
  column: string;
  date: string;
  projects: number;
  tasks: ITask[];
}

export default function Board() {
  const [ state ] = useLocalStorage('COLUMN');
  const location = useLocation();
  const { deleteTask } = useTask();
  // const {id} = useParams();

  // const { data, isFetching } = useFetch<ColumnModel[]>(`card/${id}`);
  const { column, setColumn } = useColumn();
  // const lengthCard = column.length

  
  useEffect(() => {
    if(state.length > 0) {
      setColumn(state);
    }
  }, [state])

  console.log('state', column)

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
      <HeaderPage title={location.state.name}>
        <>
          {/* <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '5px'

            }}
          >
          <button
              style={{ padding: '4px', borderRadius: '4px' }}
              onClick={() => handleCreateBoard('New Item')}
            >
              Create
            </button>
            <button
              style={{ padding: '4px', borderRadius: '4px' }}
              onClick={() => handleUpdateBoard(update)}
            >
              Update
            </button>
            <button
              style={{ padding: '4px', borderRadius: '4px' }}
              onClick={() => handleDeleteBoard(1)}
            >
              Delete
            </button>
          </div> */}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '5px'
            }}
          >
            {/* <button
              style={styleButtonTask}
              onClick={() =>
                console.log('UPDATETASK', updateTask(boards, 1, upTask))
              }
            >
              UpdateT
            </button>
            <button
              style={styleButtonTask}
              onClick={() => handleCreateTask(state[0], createTask)}
            >
              CreateT
            </button>
            <button
              style={styleButtonTask}
              onClick={() => deleteTask(state[0], 2)}
            >
              DeleteT
            </button> */}
          </div>
        </>
      </HeaderPage>

      <ScrollAreas>
        <ContentBoard>
          {column.map((row: any) => (
            <Column key={row.card_id} title={row.name}>
              {[0, 1].map((row: any) => (
                <Task key={row.task_id} />
              ))}
            </Column>
          ))}
        </ContentBoard>
      </ScrollAreas>
    </Container>
  );
}
