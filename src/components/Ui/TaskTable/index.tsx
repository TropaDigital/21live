/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */

// React
import { useState, useEffect } from 'react';

// Icons
import { BiSearchAlt } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';

// Styles
import { Flag } from '../../../pages/Tasks/TaskList/styles';
import {
  FlagTitleWrapper,
  PaginationWrapper,
  TaskContainer,
  TaskDate,
  TaskDateWrapper,
  TaskFilter,
  TasksTable,
  TimeWrapperCard
} from './styles';
import { FilterGroup } from '../../Table/styles';
import { ButtonsFilter, FilterButton } from '../../../pages/Meeting/ListMeeting/styles';

// Components
import { InputDefault } from '../../Inputs/InputDefault';

// Libraries
import ProgressBar from '../ProgressBar';
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import Pagination from '../../Pagination';

// Hooks
import { useAuth } from '../../../hooks/AuthContext';

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
                  {user.deduct_hours !== '' && (
                    <>
                      <th>Iniciar</th>
                      <th>Finalizar</th>
                    </>
                  )}
                  <th>Tempo consumido</th>
                  <th>Tempo estimado</th>
                  <th>Produtos</th>
                  <th>Status</th>
                  <th>Data Cliente</th>
                </tr>
              </thead>

              <tbody>
                {row[1].map((task: any, index: number) => (
                  <tr
                    key={task.task_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleGoToDelivery(task, index + 1)}
                    className={
                      moment(task?.creation_date_end).isBefore(new Date()) &&
                      task.status !== 'Concluida'
                        ? 'delayed'
                        : ''
                    }
                  >
                    <td>
                      <div className="id-column">#{String(task.task_id).padStart(5, '0')}</div>
                    </td>
                    <td>
                      <FlagTitleWrapper>
                        {task.urgent === 'true' && (
                          <Flag
                            style={{ textAlign: 'center' }}
                            className={task.urgent === 'true' ? 'flagged' : ''}
                          >
                            <FiFlag fill="#F04438" color="#F04438" />
                          </Flag>
                        )}
                        <div className="column info">
                          <div className={task.urgent === 'true' ? 'title danger' : 'title'}>
                            {task.title}
                          </div>
                          <span className={task.urgent === 'true' ? 'danger' : ''}>
                            {task.tenant} / {task.project_category} | {task.product_period}
                          </span>
                        </div>
                      </FlagTitleWrapper>
                    </td>
                    {user.deduct_hours !== '' && (
                      <>
                        <td>
                          <TimeWrapperCard>
                            {moment(task?.start_job).format('HH:mm')}
                          </TimeWrapperCard>
                        </td>
                        <td>
                          <TimeWrapperCard>{moment(task?.end_job).format('HH:mm')}</TimeWrapperCard>
                        </td>
                      </>
                    )}

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
                      {task.total_time !== 'undefined' && task.type !== 'Livre'
                        ? task.total_time
                        : 'Livre'}
                    </td>
                    <td style={{ textAlign: 'center' }}>{task?.deliverys[0]?.products.length}</td>
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
                    <td>{moment(task?.creation_date_end).format('DD/MM/YYYY')}</td>
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
