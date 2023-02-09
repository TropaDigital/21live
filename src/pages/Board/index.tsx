import { useCallback, useEffect, useState } from 'react';
import { FiClock, FiMoreHorizontal } from 'react-icons/fi';
import { RiStackLine } from 'react-icons/ri';

import { v4 as uuidv4 } from 'uuid';
import { loadLists } from '../../components/dataBoard';

import HeaderPage from '../../components/HeaderPage';
import Column from '../../components/Ui/Column';
import ScrollAreas from '../../components/Ui/ScrollAreas';
import Task from '../../components/Ui/Task';

import {
  Container,
  ContentBoard,
  CardBord,
  HeaderBoard,
  TitleBoard,
  ButtonHeaderBoard,
  InfoBoard,
} from './styles';
import useLocalStorage from '../../hooks/useLocalStorage';
import useColumn from '../../hooks/useColumn';
import useTask from '../../hooks/useTask';
import { useFetch } from '../../hooks/useFetch';
import { ColumnModel } from '../../utils/models';
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


const upTask = {
  id: 1,
  column: 'TRAFEGO',
  title: 'Novo create',
  users: [],
  date: '10 mar',
  progress: {
    hoursinvested: '14:00:00',
    hoursLeft: '05:00:00',
  },
  completed: '6/10',
};

const createTask = {
  id: 11,
  column: 'TRAFEGO',
  title: 'NOVA TASK',
  users: [],
  date: '10 mar',
  progress: {
    hoursinvested: '14:00:00',
    hoursLeft: '05:00:00',
  },
  completed: '6/10',
}

const styleButtonTask = {
  padding: '4px',
  borderRadius: '4px',
  backgroundColor: 'lightcoral',
  color: '#fff',
};

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
