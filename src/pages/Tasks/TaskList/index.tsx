/* eslint-disable import-helpers/order-imports */
//  React
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Icons
import { BiFilter, BiPlus, BiSearchAlt, BiX } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';
import { IconContext } from 'react-icons';

// Hooks
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/toast';
import { useParamsHook } from '../../../hooks/useParams';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { Table } from '../../../components/Table';
import { TableHead } from '../../../components/Table/styles';
import Alert from '../../../components/Ui/Alert';
import { ContainerDefault } from '../../../components/UiElements/styles';
import Pagination from '../../../components/Pagination';
import ModalDefault from '../../../components/Ui/ModalDefault';
import {
  Summary,
  SummaryInfoWrapper,
  SummaryTaskDescription,
  SummaryTaskInfo
} from '../ComponentSteps/SummaryTasks/styles';
import ProgressBar from '../../../components/Ui/ProgressBar';
import Loader from '../../../components/LoaderSpin';
import FilterModal from '../../../components/Ui/FilterModal';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';

// Api
import api from '../../../services/api';

// Libraries
import moment from 'moment';

// Styles
import { ModalShowTaskWrapper, Flag, StatusTable, FilterTasks } from './styles';

export default function TaskList() {
  const { addToast } = useToast();
  const { parameters } = useParamsHook();
  const [modalViewTask, setModalViewTask] = useState({
    isOpen: false,
    type: '',
    task: {
      task_id: '',
      title: '',
      tenant_id: '',
      tenant: '',
      total_time: '',
      project_product_id: '',
      product_period: '',
      project: '',
      project_category: '',
      type: '',
      flow_id: '',
      flow: '',
      description: '',
      creation_description: '',
      creation_date_end: '',
      copywriting_description: '',
      copywriting_date_end: '',
      deadlines: '',
      step: '',
      name: ''
    }
  });
  const [modalFilters, setModalFilters] = useState<boolean>(false);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    status: '',
    client: ''
  });
  const [selected, setSelected] = useState(1);
  const [search, setSearch] = useState('');
  const { data, pages, fetchData, isFetching } = useFetch<any[]>(
    `tasks?search=${search.replace(/[^\w ]/g, '')}&page=${selected}&status=${
      filter.status
    }&tenant=${filter.client}`
  );
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [clientFilter, setClientFilter] = useState({
    value: '',
    label: '',
    image: '',
    color: ''
  });

  const handleOnDelete = async (id: any) => {
    try {
      const response = await api.delete(`tasks/${id}`);
      if (response.data.status === 'success') {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Tarefa foi deletada!'
        });
        fetchData();
      }
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleCloseModal = () => {
    setModalViewTask({
      isOpen: false,
      type: '',
      task: {
        task_id: '',
        title: '',
        tenant_id: '',
        tenant: '',
        total_time: '',
        project_product_id: '',
        product_period: '',
        project: '',
        project_category: '',
        type: '',
        flow_id: '',
        flow: '',
        description: '',
        creation_description: '',
        creation_date_end: '',
        copywriting_description: '',
        copywriting_date_end: '',
        deadlines: '',
        step: '',
        name: ''
      }
    });
  };

  const handleEditTask = (task: any) => {
    if (task.status !== 'Pendente') {
      addToast({
        type: 'warning',
        title: 'ATENÇÃO',
        description: 'Não é possivel editar tarefas "EM PROGRESSO" ou "CONCLUÍDAS"'
      });
    } else {
      getInfoTask(task.task_id);
    }
  };

  async function getInfoTask(id: number) {
    try {
      const response = await api.get(`tasks/${id}`);
      // console.log('log do response', response.data.result);
      navigate('/criar-tarefa', { state: response.data.result[0] });
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  }

  async function handleChangeUrgency(taskId: string) {
    try {
      const response = await api.put(`/task/urgent/${taskId}`);
      if (response.data.status === 'success') {
        fetchData();
      }
    } catch (error) {
      console.log('log error change urgency of task', error);
    }
  }

  const handleViewTask = (taskId: string) => {
    console.log('log do id da task para ser visualizada', taskId);
    const idTask = {
      id: taskId
    };
    navigate(`/tarefa/${taskId}`, { state: idTask });
  };

  const handleApplyFilters = (filters: any) => {
    setFilter(filters);
    setModalFilters(false);
  };

  const handleClearFilters = () => {
    setFilter({
      status: '',
      client: ''
    });
    setModalFilters(false);
  };

  const hasFilters = Object.values(filter).every((obj) => obj === null || obj === '');

  return (
    <ContainerDefault>
      <HeaderPage title="Tarefas">
        <Link to={'/criar-tarefa'}>
          <ButtonDefault typeButton="success">
            <BiPlus color="#fff" />
            Nova tarefa
          </ButtonDefault>
        </Link>
      </HeaderPage>

      {isFetching && <Loader />}

      {!isFetching && (
        <Table>
          <TableHead>
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
            <FilterTasks>
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

              {!hasFilters && (
                <ButtonDefault typeButton="danger" isOutline onClick={handleClearFilters}>
                  <div className="close-icon">
                    <BiX size={30} />
                  </div>
                  Limpar filtros
                </ButtonDefault>
              )}

              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => setModalFilters(true)}
              >
                <BiFilter />
                Filtros
              </ButtonDefault>
            </FilterTasks>
          </TableHead>
          {/* <FilterGroup>
            <div>
              Filtros utilizados: {filter.client !== '' ? filter.client : ''}{' '}
              {filter.status !== '' ? filter.status : ''}
            </div>
          </FilterGroup> */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Tempo utilizado</th>
                <th>Tempo estimado</th>
                <th>Status</th>
                <th>Cliente</th>
                {/* <th>Equipe</th> */}
                <th style={{ color: '#F9FAFB' }}>-</th>
              </tr>
            </thead>
            <tbody>
              {data !== null &&
                data?.length > 0 &&
                data?.map((row) => (
                  <tr key={row.task_id}>
                    <td>#{String(row.task_id).padStart(5, '0')}</td>
                    <td
                      style={{ textTransform: 'capitalize', cursor: 'pointer' }}
                      onClick={() => handleViewTask(row.task_id)}
                    >
                      {row.title}
                    </td>
                    <td
                      style={{
                        width: '180px',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{ marginBottom: '4px', display: 'block' }}>
                        {row.time_consumed}
                      </span>
                      <ProgressBar
                        totalHours={convertToMilliseconds(
                          row.total_time !== 'undefined' ? row.total_time : row.time_consumed
                        )}
                        restHours={convertToMilliseconds(row.time_consumed)}
                      />
                    </td>
                    <td>{row.total_time !== 'undefined' ? row.total_time : '00:00:00'}</td>
                    <td>
                      <StatusTable
                        className={
                          row.status === 'Em Andamento'
                            ? 'status progress'
                            : row.status === 'Concluida'
                            ? 'status finished'
                            : 'status'
                        }
                      >
                        {row.status === 'Em Andamento'
                          ? 'Em progresso'
                          : row.status === 'Concluida'
                          ? 'Concluída'
                          : row.status === 'Aguardando Aprovação'
                          ? 'Aguardando Aprovação'
                          : 'Pendente'}
                      </StatusTable>
                    </td>
                    <td>{row.tenant}</td>
                    {/* <td>
                      <Avatar data={avatarAll} />
                    </td> */}
                    <td>
                      <div className="fieldTableClients">
                        <Flag
                          style={{ textAlign: 'center' }}
                          className={row.urgent === 'true' ? 'flagged' : ''}
                          onClick={() => handleChangeUrgency(row.task_id)}
                        >
                          {row.urgent === 'true' ? (
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
                        {/* <ButtonTable typeButton="view" onClick={() => handleOpenModalView(row)} /> */}
                        <ButtonTable
                          typeButton="view"
                          onClick={() => handleViewTask(row.task_id)}
                        />
                        <ButtonTable
                          typeButton="edit"
                          onClick={() => {
                            handleEditTask(row);
                          }}
                        />
                        <Alert
                          title="Atenção"
                          subtitle="Certeza que gostaria de deletar esta Tarefa? Ao excluir esta ação não poderá ser desfeita."
                          confirmButton={() => handleOnDelete(row.task_id)}
                        >
                          <ButtonTable typeButton="delete" />
                        </Alert>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={100}>
                  <Pagination
                    total={pages.total}
                    perPage={pages.perPage}
                    currentPage={selected}
                    lastPage={pages.lastPage}
                    onClickPage={(e) => setSelected(e)}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </Table>
      )}

      {/* Modal view task */}
      <ModalDefault
        isOpen={modalViewTask.isOpen}
        title={modalViewTask.type}
        onOpenChange={handleCloseModal}
      >
        <ModalShowTaskWrapper>
          <Summary>
            <div className="title">Informações da tarefa</div>
            <SummaryInfoWrapper>
              <SummaryTaskInfo>
                <div className="title-info">Título da tarefa:</div>
                <div className="info">{modalViewTask.task.title}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Cliente:</div>
                <div className="info">{modalViewTask.task.tenant}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Projeto/Contrato:</div>
                <div className="info">
                  {modalViewTask.task.project_category} |{' '}
                  {modalViewTask.task.total_time.slice(0, -6)}
                  <span style={{ textTransform: 'lowercase' }}>h</span>/
                  {modalViewTask.task.product_period === 'anual' ? 'ANO' : 'MÊS'}
                </div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Fluxo:</div>
                <div className="info">{modalViewTask.task.flow}</div>
              </SummaryTaskInfo>
              {modalViewTask.task.copywriting_date_end !== '' && (
                <SummaryTaskInfo>
                  <div className="title-info">
                    Data De Input {parameters.input !== '' ? parameters.input : 'Pré-requisito'}:
                  </div>
                  <div className="info">
                    {moment(modalViewTask.task.copywriting_date_end).format('DD/MM/YYYY')}
                  </div>
                </SummaryTaskInfo>
              )}

              <SummaryTaskInfo>
                <div className="title-info">Data De Input de Criação:</div>
                <div className="info">
                  {moment(modalViewTask.task.creation_date_end).format('DD/MM/YYYY')}
                </div>
              </SummaryTaskInfo>

              <SummaryTaskDescription>
                <div className="description-title">Contexto geral</div>
                <div
                  className="description-info"
                  dangerouslySetInnerHTML={{ __html: modalViewTask?.task?.description }}
                >
                  {/* {modalViewTask.task.description.replace('<p>', '').replace('</p>', '')} */}
                </div>
              </SummaryTaskDescription>
            </SummaryInfoWrapper>
          </Summary>
        </ModalShowTaskWrapper>
      </ModalDefault>

      {/* Modal filters */}
      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={handleApplyFilters}
        clearFilters={handleClearFilters}
        clientSelected={setClientFilter}
        filterType="task"
      />
    </ContainerDefault>
  );
}
