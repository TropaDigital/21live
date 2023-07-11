/* eslint-disable import-helpers/order-imports */
// Icons
import { BiFilter, BiSearchAlt } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';
import { IconContext } from 'react-icons';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';

// Styles
import { Flag } from '../../../pages/Tasks/TaskList/styles';
import { TaskContainer, TaskDate, TaskDateWrapper, TaskFilter, TasksTable } from './styles';

// Components
import ButtonDefault from '../../Buttons/ButtonDefault';
import { InputDefault } from '../../Inputs/InputDefault';

// Libraries
import ProgressBar from '../ProgressBar';
import moment from 'moment';
import 'moment/dist/locale/pt-br';

interface TableProps {
  data: TaskProps[];
  loading: boolean;
  searchInput: any;
  searchInfo: string;
  addFilter: any;
  taskSelected: any;
}

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

export default function TaskTable({
  data,
  loading,
  searchInput,
  searchInfo,
  addFilter,
  taskSelected
}: TableProps) {
  return (
    <TaskContainer>
      <TaskFilter>
        <InputDefault
          label=""
          name="search"
          placeholder="Buscar..."
          onChange={(event) => searchInput(event.target.value)}
          value={searchInfo}
          icon={BiSearchAlt}
          isLoading={loading}
          className="search-field"
        />

        <ButtonDefault typeButton="lightWhite" isOutline onClick={addFilter}>
          <BiFilter />
          Filtros
        </ButtonDefault>
      </TaskFilter>

      {data.map((row: TaskProps, index: number) => (
        <TaskDateWrapper key={index}>
          <TaskDate>{moment(row.date).format('DD/MM/YYYY')}</TaskDate>
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
                  <tr
                    key={tasks.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => taskSelected(tasks.id)}
                  >
                    <td>
                      <div className="column info">
                        <div>
                          {String(tasks.id).padStart(5, '0')} - {tasks.projectInfo.taskTitle} -{' '}
                          {tasks.projectInfo.month}
                        </div>
                        <span>
                          {tasks.projectInfo.client} / {tasks.projectInfo.type} |{' '}
                          {tasks.projectInfo.quantity}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {tasks.consumedTime}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(tasks.estimatedTime)}
                        restHours={convertToMilliseconds(tasks.consumedTime)}
                      />
                    </td>
                    <td>
                      <div className="flag-info">
                        <Flag
                          style={{ textAlign: 'center' }}
                          className={tasks.status === 'true' ? 'flagged' : ''}
                        >
                          {tasks.status === 'true' ? (
                            <IconContext.Provider
                              value={{ color: '#F04438', className: 'global-class-name' }}
                            >
                              <FiFlag />
                            </IconContext.Provider>
                          ) : (
                            <IconContext.Provider
                              value={{ color: '#667085', className: 'global-class-name' }}
                            >
                              <FiFlag />
                            </IconContext.Provider>
                          )}
                        </Flag>
                        {tasks.estimatedTime}
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {moment(tasks.startDate).format('DD/MMM/YYYY')}
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {moment(tasks.endDate).format('DD/MMM/YYYY')}
                    </td>
                    <td>{tasks.deliveries}</td>
                    <td>
                      <div className="column">
                        {tasks.stage}
                        <span>Fluxo: {tasks.flow}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        className={
                          tasks.status === 'progress'
                            ? 'status progress'
                            : tasks.status === 'finished'
                            ? 'status finished'
                            : 'status'
                        }
                      >
                        {tasks.status === 'progress'
                          ? 'Em progresso'
                          : tasks.status === 'finished'
                          ? 'Concluída'
                          : 'Pendente'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TasksTable>
        </TaskDateWrapper>
      ))}
    </TaskContainer>
  );
}
