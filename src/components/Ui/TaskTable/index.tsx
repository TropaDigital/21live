/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */

// React
import { useState, useEffect } from 'react';

// Icons
import { BiPencil, BiSearchAlt } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import { IconText } from '../../../assets/icons';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';

// Styles
import { Flag } from '../../../pages/Tasks/TaskList/styles';
import {
  PaginationWrapper,
  TaskContainer,
  TaskDate,
  TaskDateWrapper,
  TaskFilter,
  TasksTable
} from './styles';

// Components
import { InputDefault } from '../../Inputs/InputDefault';

// Libraries
import ProgressBar from '../ProgressBar';
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import Pagination from '../../Pagination';

// Hooks
import { useAuth } from '../../../hooks/AuthContext';
import { FilterGroup } from '../../Table/styles';
import { ButtonsFilter, FilterButton } from '../../../pages/Meeting/ListMeeting/styles';

interface TableProps {
  data: any;
  loading: boolean;
  searchInput: any;
  searchInfo: string;
  addFilter: any;
  taskSelected: any;
  pages: any;
  pageSelected: any;
  orderSelected: (value: any) => void;
}

export default function TaskTable({
  data,
  loading,
  searchInput,
  searchInfo,
  taskSelected,
  pages,
  pageSelected,
  orderSelected
}: TableProps) {
  const { user } = useAuth();
  const arrayData = Object.entries(data);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [filterOrder, setFilterOrder] = useState('desc');

  useEffect(() => {
    pageSelected(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    orderSelected(filterOrder);
  }, [filterOrder]);

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
        <div className="groupTable">
          <h2>
            Lista de tarefas{' '}
            {pages !== null && pages?.total > 0 ? (
              <strong>
                {pages?.total <= 1 ? `${pages?.total} tarefa` : `${pages?.total} tarefas`}{' '}
              </strong>
            ) : (
              <strong>0 tarefa</strong>
            )}
          </h2>
        </div>

        <div>
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
        </div>
      </TaskFilter>

      <FilterGroup>
        <ButtonsFilter>
          <FilterButton
            onClick={() => {
              setFilterOrder('desc');
            }}
            className={filterOrder === 'desc' ? 'selected' : ''}
          >
            Mais recente
          </FilterButton>
          <FilterButton
            onClick={() => {
              setFilterOrder('asc');
            }}
            className={filterOrder === 'asc' ? 'selected' : ''}
          >
            Mais antigo
          </FilterButton>
        </ButtonsFilter>
      </FilterGroup>

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
                        {user.permissions.includes('jobs_tasks_essay') && (
                          <div>
                            <IconText /> {task.title}
                          </div>
                        )}

                        {user.permissions.includes('jobs_tasks_execute') && (
                          <div>
                            <BiPencil /> {task.title}
                          </div>
                        )}
                        <span>
                          {task.tenant} / {task.project_category} | {task.product_period}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {task.time_consumed}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(
                          task.total_time !== 'undefined' ? task.total_time : task.time_consumed
                        )}
                        restHours={convertToMilliseconds(task.time_consumed)}
                      />
                    </td>
                    <td>
                      <div className="flag-info">
                        <Flag
                          style={{ textAlign: 'center' }}
                          className={task.urgent === 'true' ? 'flagged' : ''}
                        >
                          {task.urgent === 'true' ? (
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
                        {task.total_time !== 'undefined' ? task.total_time : 'Livre'}
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {moment(task.start_job).format('DD/MMM/YYYY')}
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
                        {task.card_name}
                        <span>Fluxo: {task.flow}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        className={
                          task.status === 'Em Andamento'
                            ? 'status progress'
                            : task.status === 'Concluida'
                            ? 'status finished'
                            : 'status'
                        }
                      >
                        {task.status === 'Em Andamento'
                          ? 'Em progresso'
                          : task.status === 'Concluida'
                          ? 'Concluída'
                          : task.status === 'Aguardando Aprovação'
                          ? 'Aguardando Aprovação'
                          : task.status === 'Alteração Interna'
                          ? 'Alteração interna'
                          : task.status === 'Alteração Externa'
                          ? 'Alteração externa'
                          : task.status === 'Parcial'
                          ? 'Parcial'
                          : task.status === 'Avaliada'
                          ? 'Avaliada'
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

      {arrayData.length === 0 && (
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
              <tr>
                <td colSpan={9} style={{ textAlign: 'center' }}>
                  Sem tarefas
                </td>
              </tr>
            </tbody>
          </table>
        </TasksTable>
      )}

      <PaginationWrapper>
        <Pagination
          total={pages.total}
          perPage={pages.perPage}
          currentPage={selectedPage}
          lastPage={pages.lastPage}
          onClickPage={(e: any) => setSelectedPage(e)}
        />
      </PaginationWrapper>
    </TaskContainer>
  );
}
