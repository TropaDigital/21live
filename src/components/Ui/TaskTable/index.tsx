/* eslint-disable import-helpers/order-imports */
// Icons
import { BiFilter, BiSearchAlt } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { IconText } from '../../../assets/icons';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';

// Styles
import { Flag } from '../../../pages/Tasks/TaskList/styles';
import { TaskContainer, TaskDate, TaskDateWrapper, TaskFilter, TasksTable } from './styles';

// Components
import { InputDefault } from '../../Inputs/InputDefault';

// Libraries
import ProgressBar from '../ProgressBar';
import moment from 'moment';
import 'moment/dist/locale/pt-br';

interface TableProps {
  data: any;
  loading: boolean;
  searchInput: any;
  searchInfo: string;
  addFilter: any;
  taskSelected: any;
}

export default function TaskTable({
  data,
  loading,
  searchInput,
  searchInfo,
  addFilter,
  taskSelected
}: TableProps) {
  const arrayData = Object.entries(data);

  const handleGoToDelivery = (taskInfos: any, taskIndex: any) => {
    const allTaskInfo = {
      task_index: taskIndex,
      task: taskInfos
    };
    taskSelected(allTaskInfo);
  };

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

        {/* <ButtonDefault typeButton="lightWhite" isOutline onClick={addFilter}>
          <BiFilter />
          Ordenar por
        </ButtonDefault> */}
      </TaskFilter>

      {arrayData?.map((row: any, index: number) => (
        <TaskDateWrapper key={index}>
          <TaskDate>{moment(row[0]).format('DD/MM/YYYY')}</TaskDate>
          <TasksTable>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
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
                {row[1].map((task: any, index: number) => (
                  <tr
                    key={task.task_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleGoToDelivery(task, index + 1)}
                  >
                    <td>
                      <div className="id-column">#{String(task.task_id).padStart(5, '0')}</div>
                    </td>
                    <td>
                      <div className="column info">
                        <div>
                          <IconText /> {task.title}
                        </div>
                        <span>
                          {task.tenant} / {task.project_category} | {task.product_period}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {task.timeConsumed}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(task.totalTime)}
                        restHours={convertToMilliseconds(task.timeConsumed)}
                      />
                    </td>
                    <td>
                      <div className="flag-info">
                        <Flag
                          style={{ textAlign: 'center' }}
                          className={task.status === 'true' ? 'flagged' : ''}
                        >
                          {task.status === 'true' ? (
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
                        {task.totalTime}
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {moment(task.copywriting_date_end).format('DD/MMM/YYYY')}
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {moment(task.creation_date_end).format('DD/MMM/YYYY')}
                    </td>
                    <td>
                      {task?.deliverys?.length <= 1
                        ? `${task?.deliverys?.length} entrega`
                        : `${task?.deliverys?.length} entregas`}
                    </td>
                    <td>
                      <div className="column">
                        {task.step}???
                        <span>Fluxo: {task.flow}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        className={
                          task.status === 'progress'
                            ? 'status progress'
                            : task.status === 'finished'
                            ? 'status finished'
                            : 'status'
                        }
                      >
                        {task.status === 'progress'
                          ? 'Em progresso'
                          : task.status === 'finished'
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
