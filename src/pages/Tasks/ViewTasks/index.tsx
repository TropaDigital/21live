/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';
import { BiFilter, BiSearchAlt } from 'react-icons/bi';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { ContainerDefault } from '../../../components/UiElements/styles';

// Styles
import { TaskContainer, TaskDate, TaskDateWrapper, TaskFilter, TasksTable } from './styles';

// Hooks
import useDebouncedCallback from '../../../hooks/useDebounced';

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
      date: '15/07/2023',
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
          startDate: '26/06/2023',
          endDate: '15/07/2023',
          deliveries: '4 entregas',
          stage: 'Criação',
          flow: 'Campanha',
          status: 'In progress'
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
          startDate: '16/07/2023',
          endDate: '25/072023',
          deliveries: '4 entregas',
          stage: 'Criação',
          flow: 'Campanha',
          status: 'In progress'
        }
      ]
    },
    {
      date: '02/06/2023',
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
          startDate: '26/06/2023',
          endDate: '15/07/2023',
          deliveries: '4 entregas',
          stage: 'Criação',
          flow: 'Campanha',
          status: 'pending'
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
          startDate: '16/07/2023',
          endDate: '25/072023',
          deliveries: '4 entregas',
          stage: 'Criação',
          flow: 'Campanha',
          status: 'pending'
        }
      ]
    }
  ];

  return (
    <ContainerDefault>
      <HeaderPage title="Suas tarefas" />

      <TaskContainer>
        <TaskFilter>
          <InputDefault
            label=""
            name="search"
            placeholder="Buscar..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
              debouncedCallback(event.target.value);
            }}
            value={searchTerm}
            icon={BiSearchAlt}
            isLoading={isLoading}
            className="search-field"
          />

          <ButtonDefault
            typeButton="lightWhite"
            isOutline
            onClick={() => console.log('Log do button filter')}
          >
            <BiFilter />
            Filtros
          </ButtonDefault>
        </TaskFilter>

        {data.map((row: TaskProps, index: number) => (
          <TaskDateWrapper key={index}>
            <TaskDate>{row.date}</TaskDate>
            <TasksTable>
              <table>
                <thead>
                  <tr>
                    <th>Tarefas</th>
                    <th>Tempo consumido</th>
                    <th>Tempo estimado</th>
                    <th>Data inicial</th>
                    <th>Data final</th>
                    <th>Entregas</th>
                    <th>Etapa</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {row.tasks.map((tasks: Task) => (
                    <tr key={tasks.id}>
                      <td className="infos">
                        <div>
                          {String(index + 1).padStart(5, '0')} - {tasks.projectInfo.taskTitle} -{' '}
                          {tasks.projectInfo.month}
                        </div>
                        <span>
                          {tasks.projectInfo.client} - {tasks.projectInfo.type}
                        </span>
                      </td>
                      <td>{tasks.consumedTime}</td>
                      <td>{tasks.estimatedTime}</td>
                      <td>{tasks.startDate}</td>
                      <td>{tasks.endDate}</td>
                      <td>{tasks.deliveries}</td>
                      <td>{tasks.stage}</td>
                      <td>{tasks.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TasksTable>
          </TaskDateWrapper>
        ))}
      </TaskContainer>
    </ContainerDefault>
  );
}
