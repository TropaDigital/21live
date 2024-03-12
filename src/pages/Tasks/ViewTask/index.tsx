/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IconBigCheck } from '../../../assets/icons';
import { BiArrowBack, BiCalendar, BiX } from 'react-icons/bi';
import { FiClock, FiCornerDownRight } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';
import { ContainerDefault } from '../../../components/UiElements/styles';
import { TasksTable } from '../../../components/Ui/TaskTable/styles';
import ProgressBar from '../../../components/Ui/ProgressBar';
import WorkingProduct from '../../Products/WorkingProduct';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ModalLoader from '../../../components/Ui/ModalLoader';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import {
  CloseButton,
  DataInfos,
  ShowAllUsers,
  TimeAndDates,
  TimeWrapper,
  TotalTaskHours,
  UserInfo
} from '../../Products/ViewProduct/styles';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { Table } from '../../../components/Table';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import ScheduleUser from '../../../components/ScheduleUser';
import { UsersWrapper } from '../CreateTasks/styles';

// Styles
import {
  ArrowSection,
  CardTitle,
  CardWrapper,
  CardsWrapper,
  TaskInfoWrapper,
  EstimatedTime,
  RightInfosCard,
  RightInfosTitle,
  ShowInfosButton,
  StopWatchTimer,
  TaskInfoField,
  TasksInfos,
  TimeLine,
  TimeLineIcon,
  TimelineInfo,
  TimelineStep,
  DeliveriesWrapper,
  TableWrapper,
  StatusTask,
  DeliveriesTopWrapper,
  TimelineExtraInfo,
  ModalButtons
} from './styles';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import Switch from 'react-switch';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/AuthContext';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { UsersNoSchedule } from '../../../utils/models';

// Types
import {
  ClockProps,
  ClockUpdateProps,
  StepTimeline,
  TaskHistoric,
  TaskHistoryProps
} from '../../../types';
import { ProductsTable } from '../ComponentSteps/InfoDeliverables/styles';

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface TaskInfos {
  delivery_id: string;
  task_id: string;
  date_end: string;
  description: string;
  created: string;
  updated: string;
  order: string;
  title: string;
  status: string;
  total_time: string;
  time_consumed: string;
  time_creation: string;
  time_essay: string;
  products: [];
}

interface ProductsProps {
  job_service_id: number;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  minutes_creation: any;
  minutes_consumed: any;
  minutes_essay: any;
  created: string;
  updated: string;
  category?: string;
  flag: string;
  quantity?: any;
  tenant_id?: string;
  products_delivery_id?: string;
  period?: string;
  essay?: string;
  status?: string;
  ticket_interaction_id: string;
  reason_change?: string;
}

interface UpdateDateProps {
  isOn: boolean;
  date_end: string;
}

export default function ViewTask() {
  const location = useLocation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const openRightRef = useRef<any>();
  const dateRef = useRef<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');
  const [dataTask, setDataTask] = useState<any>();
  const [timeLineData, setTimelineData] = useState<TimelineProps>();
  const [hideTimeLine, setHideTimeLine] = useState<boolean>(false);
  const [deliveryProduct, setDeliveryProduct] = useState<ProductsProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>('');
  const [visualizationType, setVisualizationType] = useState<string>('deliveries');
  const [taskHistory, setTaskHistory] = useState<TaskHistoric>();
  const [updateDateTask, setUpdateDateTask] = useState<UpdateDateProps>({
    isOn: false,
    date_end: ''
  });
  const [modalUpdateHours, setModalUpdateHours] = useState<boolean>(false);
  const [clockData, setClockData] = useState<ClockUpdateProps[]>();
  const [usersWithoutSchedule, setUsersWithoutSchedule] = useState<UsersNoSchedule[]>([]);
  const [selectedInitialUser, setSelectedInitalUser] = useState<UsersNoSchedule>();
  const [modalChangeUser, setModalChangeUser] = useState<boolean>(false);
  const [modalWithoutSchedule, setModalWithoutSchedule] = useState<boolean>(false);
  const [outsideUsers, setOutsideUsers] = useState<boolean>(true);

  const titleInfos = {
    idNumber: dataTask?.task_id,
    numberTask: '',
    titleTask: dataTask?.title,
    client_task: dataTask?.tenant,
    typeTask: dataTask?.project_category,
    contract_task: dataTask?.project,
    creator_user: dataTask?.creator?.name,
    creator_time: dataTask?.created
  };

  const userProps = {
    name: dataTask?.actual_user_name,
    avatar: dataTask?.actual_user_avatar
  };

  const onlyOneProductInfo = {
    title: deliveryProduct[0]?.service,
    description: deliveryProduct[0]?.description,
    id: deliveryProduct[0]?.products_delivery_id,
    size: deliveryProduct[0]?.size,
    type: deliveryProduct[0]?.type,
    reason_change:
      deliveryProduct[0]?.reason_change === '1'
        ? 'Criação'
        : deliveryProduct[0]?.reason_change === '2'
        ? 'Desmembramento'
        : 'Alteração'
  };

  const InputsTask = {
    copywriting_description: dataTask?.copywriting_description,
    creation_description: dataTask?.creation_description
  };

  async function getTaskInfos(id: any) {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/${id}`);
      // console.log('log do response get task', response.data.result);

      if (response.data.result.length > 0) {
        setDataTask(response.data.result[0]);
        setUpdateDateTask({
          isOn: false,
          date_end: response.data.result[0].creation_date_end
        });
      }

      if (response.data.result[0].deliverys.length === 1) {
        setVisualizationType('delivery-products');
        setDeliveryProduct(response.data.result[0].deliverys[0].products);
      }

      if (response.data.result[0].parents?.length > 0) {
        setVisualizationType('subtasks');
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log do error getting task', error);
      addToast({
        title: 'Atenção',
        description: error.message,
        type: 'warning'
      });
      setLoading(false);
    }
  }

  async function getTimelineData(id: any) {
    try {
      const response = await api.get(`task/timeline/${id}`);
      setTimelineData(response.data.result);
    } catch (error: any) {
      console.log('log timeline error', error);
    }
  }

  async function getTaskHistory(id: any) {
    try {
      setLoading(true);
      const response = await api.get(`/task/historic/${id}`);
      setTaskHistory(response.data.result);

      setLoading(false);
    } catch (error: any) {
      console.log('log timeline error', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (location.state !== null) {
      getTimelineData(location.state.id);
      getTaskInfos(location.state.id);
      getTaskHistory(location.state.id);
    }
    if (location.state === null) {
      getTaskInfos(location.pathname.split('/')[2]);
      getTimelineData(location.pathname.split('/')[2]);
      getTaskHistory(location.pathname.split('/')[2]);
    }
  }, [location]);

  useEffect(() => {
    if (dataTask?.parents?.length > 0 && visualizationType === 'deliveries') {
      setVisualizationType('subtasks');
    }
  }, [visualizationType]);

  const handleNavigateProduct = (infoProduct: any) => {
    if (infoProduct.status === 'Desmembrada') {
      handleNavigateTask(dataTask.parents[0].task_id);
    }
    const taskCompleteInfo = {
      productInfo: infoProduct,
      taskInfos: dataTask
    };
    setSelectedProduct(taskCompleteInfo);
  };

  const handleNavigateTask = (taskId: string) => {
    const idTask = {
      id: taskId
    };
    navigate(`/tarefa/${taskId}`, { state: idTask });
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setUpdateDateTask({
        isOn: false,
        date_end: event.target.value
      });

      handleUpdateDate();
    }
  };

  const handleOnChangeDate = (event: any) => {
    const { value } = event.target;

    setUpdateDateTask((prevState: any) => ({ ...prevState, ['date_end']: value }));
  };

  async function handleUpdateDate() {
    try {
      setLoading(true);

      const updateDate = {
        creation_date_end: updateDateTask.date_end
      };

      const response = await api.put(`/task/date-update/${dataTask.task_id}`, updateDate);

      if (response.data.status === 'success') {
        setUpdateDateTask({
          isOn: false,
          date_end: updateDateTask.date_end
        });

        addToast({
          title: 'Sucesso',
          description: 'Data atualizada com sucesso!',
          type: 'success'
        });

        if (location.state !== null) {
          getTaskInfos(location.state.id);
        }

        if (location.state === null) {
          getTaskInfos(location.pathname.split('/')[2]);
        }
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log error update date', error);

      setLoading(false);

      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            title: 'Atenção',
            description: row.error,
            type: 'warning'
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error.response.data.message,
          type: 'danger'
        });
      }
    }
  }

  const updateClockFieldInfos = (
    stepIndex: number,
    clockIndex: number,
    fieldName: keyof ClockProps,
    value: string
  ) => {
    console.log('log active', stepIndex, clockIndex, fieldName, value);
    setClockData((prevData) => {
      const newData = [...(prevData || [])];
      newData[stepIndex] = {
        ...newData[stepIndex],
        clock: [...newData[stepIndex].clock]
      };
      newData[stepIndex].clock[clockIndex] = {
        ...newData[stepIndex].clock[clockIndex],
        [fieldName]: value
      };
      return newData;
    });
  };

  async function getClockInfos() {
    try {
      setLoading(true);

      const response = await api.get(`/clock/task/${dataTask.task_id}`);
      // console.log('log do response clock =>', response.data.result);
      setClockData(response.data.result);
      // setClockUpdateData(response.data.result);

      setLoading(false);
    } catch (error: any) {
      console.log('log error getClockInfo', error);
      addToast({
        title: 'Atenção',
        description: error.message,
        type: 'warning'
      });

      setLoading(false);
    }
  }

  const handleGetClock = () => {
    getClockInfos();
    setModalUpdateHours(true);
  };

  async function handleUpdateClockInfos(infos: ClockProps, stepInfo: string) {
    try {
      const clockId = infos.clock_id;
      const params = {
        play: infos.play,
        pause: infos.pause,
        step: stepInfo,
        observation: infos.observation,
        active: infos.active
      };

      // console.log('log infos edit clock =>', infos);
      // console.log('log stepInfos edit clock =>', stepInfo);

      setLoading(true);

      const response = await api.put(`/clock/edit/${clockId}`, params);

      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          description: 'Horas atualizadas com sucesso!',
          type: 'success'
        });

        setModalUpdateHours(false);
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log error put clock');

      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            title: 'Atenção',
            description: row.error,
            type: 'warning'
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error.response.data.message,
          type: 'danger'
        });
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        hideRightCard === 'show' &&
        openRightRef.current &&
        !openRightRef.current.contains(e.target)
      ) {
        setHideRightCard('hide');
      }

      if (updateDateTask.isOn && dateRef.current && !dateRef.current.contains(e.target)) {
        setUpdateDateTask({
          isOn: false,
          date_end: updateDateTask.date_end
        });
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [hideRightCard, updateDateTask]);

  const actualStep = timeLineData?.currentStep;
  const actualStepCard = timeLineData
    ? timeLineData.steps.filter((obj) => Number(obj.step) === Number(actualStep) + 1)
    : [];
  const taskDeductHours = actualStepCard[0]?.deduct_hours;

  const actualDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const allTimes = {
    time_essay: selectedProduct?.productInfo?.minutes_essay,
    time_creation: selectedProduct?.productInfo?.minutes_creation,
    total_time: selectedProduct?.productInfo?.minutes
  };

  async function handleNextUser() {
    try {
      setLoading(true);

      const response = await api.get(
        `/task/next?flow=${dataTask?.flow_id}&project_product_id=${
          dataTask?.project_product_id
        }&step=${Number(actualStep)}&task_id=${dataTask?.task_id}&ignore_project=${outsideUsers}`
      );
      setUsersWithoutSchedule(response.data.result);
      setModalWithoutSchedule(true);

      setLoading(false);
    } catch (error: any) {
      console.log('log error handleNextUser', error);

      setLoading(false);
    }
  }

  async function checkChangeUser() {
    try {
      setLoading(true);

      const response = await api.get(
        `/flow-function?step=${Number(actualStep)}&flow_id=${dataTask?.flow_id}`
      );

      if (response.data.result[0].show_hours === 'true') {
        console.log('log ShowHours!!!');
        setModalChangeUser(true);
      }

      if (response.data.result[0].show_hours === 'false') {
        console.log('log NOT showHours!!!');
        setModalWithoutSchedule(true);
        handleNextUser();
      }

      setLoading(false);
    } catch (error) {
      console.log('log error =>', error);
      setLoading(false);
    }
  }

  async function updateChangeUserNoSchedule() {
    try {
      setLoading(true);

      const next_user = {
        user_id: selectedInitialUser?.user_id,
        start_job: actualDate
      };

      const response = await api.put(`/task/change-user/${dataTask?.task_id}`, next_user);

      if (response.data.result === 1) {
        addToast({
          title: 'Sucesso',
          description: 'Usuário alterado com sucesso!',
          type: 'success'
        });
        setModalWithoutSchedule(false);
        setSelectedInitalUser({
          function: '',
          name: '',
          tasks: 0,
          user_id: ''
        });
        getTimelineData(dataTask?.task_id);
        getTaskInfos(dataTask?.task_id);
        getTaskHistory(dataTask?.task_id);
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log error =>', error);
      setLoading(false);
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            title: 'Atenção',
            description: row.error,
            type: 'warning'
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error.response.data.message,
          type: 'danger'
        });
      }
    }
  }

  async function updateChangeUserSchedule(values: any) {
    try {
      setLoading(true);

      const next_user = {
        user_id: values.user_id,
        start_job: values.start_job,
        end_job: values.end_job
      };

      const response = await api.put(`/task/change-user/${dataTask?.task_id}`, next_user);

      if (response.data.result === 1) {
        addToast({
          title: 'Sucesso',
          description: 'Usuário alterado com sucesso!',
          type: 'success'
        });
        setModalChangeUser(false);
        getTimelineData(dataTask?.task_id);
        getTaskInfos(dataTask?.task_id);
        getTaskHistory(dataTask?.task_id);
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log error =>', error);
      setLoading(false);
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            title: 'Atenção',
            description: row.error,
            type: 'warning'
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error.response.data.message,
          type: 'danger'
        });
      }
    }
  }

  useEffect(() => {
    if (modalWithoutSchedule) {
      handleNextUser();
    }
  }, [outsideUsers]);

  return (
    <ContainerDefault>
      {!loading && (
        <TaskInfoWrapper>
          <HeaderOpenTask
            title={titleInfos}
            product={
              visualizationType === 'product'
                ? onlyOneProductInfo
                : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
            }
            disableButton={true}
            avatar_infos={visualizationType === 'product' ? userProps : { name: '', avatar: '' }}
            goBack
            buttonType="send"
            nextStepInfo={timeLineData}
            hideButtonNext={true}
            backFlow={() => ''}
            changeUser={checkChangeUser}
          />

          <CardsWrapper>
            {dataTask?.status === 'Concluida' && (
              <CardWrapper
                className={user?.permissions?.includes('jobs_tasks_edittime') ? 'pointer' : ''}
                onClick={() =>
                  user?.permissions?.includes('jobs_tasks_edittime') ? handleGetClock() : ''
                }
              >
                <CardTitle>Atividade concluída</CardTitle>
                <StopWatchTimer className="stopped">
                  {dataTask?.time_consumed}
                  {user?.permissions?.includes('jobs_tasks_edittime') && (
                    <div className="clock">
                      <FiClock color="var(--primary)" />
                    </div>
                  )}
                </StopWatchTimer>
                <EstimatedTime>
                  Tempo estimado:{' '}
                  <span>
                    {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                  </span>
                </EstimatedTime>
              </CardWrapper>
            )}

            {dataTask?.status !== 'Concluida' && (
              <CardWrapper
                className={user?.permissions?.includes('jobs_tasks_edittime') ? 'pointer' : ''}
                onClick={() =>
                  user?.permissions?.includes('jobs_tasks_edittime') ? handleGetClock() : ''
                }
              >
                <CardTitle>Tempo utilizado</CardTitle>
                <StopWatchTimer className="stopped">
                  {dataTask?.time_consumed}
                  {user?.permissions?.includes('jobs_tasks_edittime') && (
                    <div className="clock">
                      <FiClock color="var(--primary)" />
                    </div>
                  )}
                </StopWatchTimer>
                <EstimatedTime>
                  Tempo estimado:{' '}
                  <span>
                    {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                  </span>
                </EstimatedTime>
              </CardWrapper>
            )}

            <CardTaskInfo
              cardTitle="Contexto geral"
              cardType="text"
              dataText={dataTask?.description}
            />
          </CardsWrapper>

          {visualizationType === 'subtasks' && (
            <>
              <DeliveriesWrapper>
                <DeliveriesTopWrapper>
                  <span className="title-info">Entregas</span>

                  {dataTask?.parent_id !== '' && (
                    <ButtonDefault
                      typeButton="primary"
                      onClick={() => handleNavigateTask(dataTask?.parent_id)}
                    >
                      Ir para tarefa mãe
                    </ButtonDefault>
                  )}
                </DeliveriesTopWrapper>

                <TableWrapper>
                  <span className="date-info">
                    {moment(dataTask?.start_job).format('DD/MM/YYYY')}
                  </span>
                  <TasksTable>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Título</th>
                          <th>Tempo consumido</th>
                          <th>Tempo estimado</th>
                          <th>Data inicial</th>
                          <th>Data final</th>
                          <th>Produtos</th>
                          <th>Etapa</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {dataTask?.deliverys.map((row: TaskInfos) => (
                          <tr
                            key={row.delivery_id}
                            onClick={() => {
                              setDeliveryProduct(row.products);
                              setVisualizationType('delivery-products');
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <td>#{String(row.delivery_id).padStart(2, '0')}</td>
                            <td>{row.title}</td>
                            <td>
                              <span style={{ marginBottom: '4px', display: 'block' }}>
                                {row.time_consumed}
                              </span>
                              <ProgressBar
                                totalHours={convertToMilliseconds(
                                  dataTask?.total_time !== 'undefined'
                                    ? dataTask?.total_time
                                    : row.time_consumed
                                )}
                                restHours={convertToMilliseconds(row.time_consumed)}
                              />
                            </td>
                            <td>
                              {dataTask?.total_time !== 'undefined'
                                ? dataTask?.total_time
                                : 'Livre'}
                            </td>
                            <td>{moment(row.date_end).format('DD/MM/YYYY')}</td>
                            <td>
                              {dataTask?.end_job !== '0000-00-00 00:00:00'
                                ? moment(dataTask?.end_job).format('DD/MM/YYYY')
                                : '------'}
                            </td>
                            <td>
                              {row.products.length <= 1
                                ? `${row.products.length} produto`
                                : `${row.products.length} produtos`}
                            </td>
                            <td>
                              <div className="column">
                                {dataTask?.card_name}
                                <span>Fluxo: {dataTask?.flow}</span>
                              </div>
                            </td>
                            <td>
                              <div
                                className={
                                  dataTask?.status === 'Em Andamento'
                                    ? 'status progress'
                                    : dataTask?.status === 'Concluida'
                                    ? 'status finished'
                                    : 'status'
                                }
                              >
                                {dataTask?.status === 'Em Andamento'
                                  ? 'Em progresso'
                                  : dataTask?.status === 'Concluida'
                                  ? 'Concluída'
                                  : dataTask?.status === 'Aguardando Aprovação'
                                  ? 'Aguardando Aprovação'
                                  : dataTask?.status === 'Alteração Interna'
                                  ? 'Alteração interna'
                                  : dataTask?.status === 'Alteração Externa'
                                  ? 'Alteração externa'
                                  : dataTask?.status === 'Parcial'
                                  ? 'Parcial'
                                  : 'Pendente'}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TasksTable>
                </TableWrapper>
              </DeliveriesWrapper>

              {dataTask.parents?.length > 0 && (
                <DeliveriesWrapper>
                  <span className="title-info">Sub Tarefas</span>

                  <TableWrapper>
                    <TasksTable>
                      <table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Tempo utilizado</th>
                            <th>Tempo estimado</th>
                            <th>Status</th>
                            <th>Cliente</th>
                          </tr>
                        </thead>

                        <tbody>
                          {dataTask?.parents.map((row: any) => (
                            <tr
                              key={row.task_id}
                              onClick={() => handleNavigateTask(row.task_id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <td
                                style={{
                                  display: 'table-cell',
                                  paddingRight: '0.5rem'
                                }}
                              >
                                <FiCornerDownRight
                                  color="var(--primary)"
                                  size={'1rem'}
                                  className="sub"
                                />
                                #{String(row.task_id).padStart(4, '0')}
                              </td>
                              <td style={{ textTransform: 'capitalize', cursor: 'pointer' }}>
                                {row.title}
                              </td>
                              <td>
                                <span style={{ marginBottom: '4px', display: 'block' }}>
                                  {row.time_consumed}
                                </span>
                                <ProgressBar
                                  totalHours={convertToMilliseconds(
                                    dataTask?.total_time !== 'undefined'
                                      ? dataTask?.total_time
                                      : row.time_consumed
                                  )}
                                  restHours={convertToMilliseconds(row.time_consumed)}
                                />
                              </td>
                              <td>
                                {dataTask?.total_time !== 'undefined'
                                  ? dataTask?.total_time
                                  : 'Livre'}
                              </td>
                              <td>
                                <StatusTask
                                  className={
                                    row.status === 'Em Andamento'
                                      ? 'progress'
                                      : row.status === 'Concluida'
                                      ? 'finished'
                                      : ''
                                  }
                                >
                                  {row.status === 'Em Andamento'
                                    ? 'Em progresso'
                                    : row.status === 'Concluida'
                                    ? 'Concluída'
                                    : row.status === 'Aguardando Aprovação'
                                    ? 'Aguardando Aprovação'
                                    : row.status === 'Alteração Interna'
                                    ? 'Alteração interna'
                                    : row.status === 'Alteração Externa'
                                    ? 'Alteração externa'
                                    : row.status === 'Parcial'
                                    ? 'Parcial'
                                    : row.status === 'Avaliada'
                                    ? 'Avaliada'
                                    : 'Pendente'}
                                </StatusTask>
                              </td>
                              <td>{row.tenant}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TasksTable>
                  </TableWrapper>
                </DeliveriesWrapper>
              )}
            </>
          )}

          {visualizationType === 'deliveries' && (
            <DeliveriesWrapper>
              <DeliveriesTopWrapper>
                <span className="title-info">Entregas</span>
                {dataTask?.parent_id !== '' && (
                  <ButtonDefault
                    typeButton="primary"
                    onClick={() => handleNavigateTask(dataTask?.parent_id)}
                  >
                    Ir para tarefa mãe
                  </ButtonDefault>
                )}
              </DeliveriesTopWrapper>

              <TableWrapper>
                <span className="date-info">
                  {moment(dataTask?.start_job).format('DD/MM/YYYY')}
                </span>
                <TasksTable>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Tempo consumido</th>
                        <th>Tempo estimado</th>
                        <th>Data inicial</th>
                        <th>Data final</th>
                        <th>Produtos</th>
                        <th>Etapa</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dataTask?.deliverys.map((row: TaskInfos) => (
                        <tr
                          key={row.delivery_id}
                          onClick={() => {
                            setDeliveryProduct(row.products);
                            setVisualizationType('delivery-products');
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>#{String(row.delivery_id).padStart(2, '0')}</td>
                          <td>{row.title}</td>
                          <td>
                            <span style={{ marginBottom: '4px', display: 'block' }}>
                              {row.time_consumed}
                            </span>
                            <ProgressBar
                              totalHours={convertToMilliseconds(
                                dataTask?.total_time !== 'undefined'
                                  ? dataTask?.total_time
                                  : row.time_consumed
                              )}
                              restHours={convertToMilliseconds(row.time_consumed)}
                            />
                          </td>
                          <td>
                            {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                          </td>
                          <td>{moment(row.date_end).format('DD/MM/YYYY')}</td>
                          <td>
                            {dataTask?.end_job
                              ? moment(dataTask?.end_job).format('DD/MM/YYYY')
                              : '----'}
                          </td>
                          <td>
                            {row.products.length <= 1
                              ? `${row.products.length} produto`
                              : `${row.products.length} produtos`}
                          </td>
                          <td>
                            <div className="column">
                              {dataTask?.card_name}
                              <span>Fluxo: {dataTask?.flow}</span>
                            </div>
                          </td>
                          <td>
                            <div
                              className={
                                dataTask?.status === 'Em Andamento'
                                  ? 'status progress'
                                  : dataTask?.status === 'Concluida'
                                  ? 'status finished'
                                  : 'status'
                              }
                            >
                              {dataTask?.status === 'Em Andamento'
                                ? 'Em progresso'
                                : dataTask?.status === 'Concluida'
                                ? 'Concluída'
                                : dataTask?.status === 'Aguardando Aprovação'
                                ? 'Aguardando Aprovação'
                                : dataTask?.status === 'Alteração Interna'
                                ? 'Alteração interna'
                                : dataTask?.status === 'Alteração Externa'
                                ? 'Alteração externa'
                                : dataTask?.status === 'Parcial'
                                ? 'Parcial'
                                : dataTask?.status === 'Avaliada'
                                ? 'Avaliada'
                                : 'Pendente'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TasksTable>
              </TableWrapper>
            </DeliveriesWrapper>
          )}

          {visualizationType === 'delivery-products' && (
            <DeliveriesWrapper>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="title-info">Produtos</span>
                {dataTask.deliverys.length > 1 && (
                  <button className="go-back" onClick={() => setVisualizationType('deliveries')}>
                    <BiArrowBack />
                    Voltar para entregas
                  </button>
                )}
              </div>

              <TableWrapper>
                <TasksTable>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Descrição</th>
                        <th>Formato</th>
                        <th>I/D</th>
                        <th>Tipo</th>
                        <th>Status</th>
                        {/* <th>Tempo consumido</th>
                        <th>Tempo estimado</th> */}
                      </tr>
                    </thead>

                    <tbody>
                      {deliveryProduct?.map((row: ProductsProps) => (
                        <tr
                          key={row.products_delivery_id}
                          onClick={() => {
                            handleNavigateProduct(row);
                            setVisualizationType('product');
                          }}
                          style={{ cursor: 'pointer' }}
                          className={row.status === 'Desmembrada' ? 'reject' : ''}
                        >
                          <td>#{String(row.products_delivery_id).padStart(2, '0')}</td>
                          <td>{row.service}</td>
                          <td>
                            <div dangerouslySetInnerHTML={{ __html: row.description }} />
                          </td>
                          <td>{row.size}</td>
                          <td>{row.type}</td>
                          <td>
                            {row.reason_change === '1'
                              ? 'Criação'
                              : row.reason_change === '2'
                              ? 'Desmembramento'
                              : row.reason_change === '3'
                              ? 'Alteração Interna'
                              : 'Alteração externa'}
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div
                                className={
                                  row.status === 'Em Andamento'
                                    ? 'status progress'
                                    : row.status === 'Concluida'
                                    ? 'status finished'
                                    : row.status === 'Desmembrada'
                                    ? 'status break'
                                    : 'status'
                                }
                              >
                                {row.status === 'Em Andamento'
                                  ? 'Em progresso'
                                  : row.status === 'Concluida'
                                  ? 'Concluída'
                                  : row.status === 'Aguardando Aprovação'
                                  ? 'Aguardando Aprovação'
                                  : row.status === 'Desmembrada'
                                  ? 'Reprovado'
                                  : 'Pendente'}
                              </div>
                              {/* {row.status === 'Desmembrada' && (
                                <MotiveBtn onClick={() => ''}>
                                  <BsChatText size={20} />
                                </MotiveBtn>
                              )} */}
                            </div>
                          </td>
                          {/* <td>
                            <span style={{ marginBottom: '4px', display: 'block' }}>
                              {row.minutes_consumed}
                            </span>
                            <ProgressBar
                              totalHours={convertToMilliseconds(row.minutes)}
                              restHours={convertToMilliseconds(row.minutes_consumed)}
                            />
                          </td>
                          <td>{row.minutes}</td> */}
                          {/* <td>{moment(row.date_end).format('DD/MM/YYYY')}</td>
                          <td>{moment(dataTask?.end_job).format('DD/MM/YYYY')}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TasksTable>
              </TableWrapper>
            </DeliveriesWrapper>
          )}

          {visualizationType === 'product' && (
            <WorkingProduct
              productDeliveryId={selectedProduct?.productInfo?.products_delivery_id}
              productInfos={selectedProduct.productInfo}
              taskInputs={InputsTask}
              taskId={dataTask?.task_id}
              taskFiles={dataTask?.files}
              goBack={() => setVisualizationType('delivery-products')}
              backButtonTitle={'Voltar para produtos'}
              returnReasons={dataTask?.reason_return}
              timelineData={timeLineData}
              updateInfos={() => ''}
              allProducts={dataTask.deliverys[0].products}
            />
          )}

          <RightInfosCard hideCard={hideRightCard} ref={openRightRef}>
            <TimeLine>
              <div className="hide-menu" onClick={() => setHideTimeLine(!hideTimeLine)}>
                {hideTimeLine && <FaChevronDown />}
                {!hideTimeLine && <FaChevronUp />}
              </div>
              <RightInfosTitle>Linha do tempo</RightInfosTitle>
              {!hideTimeLine &&
                timeLineData &&
                taskHistory &&
                taskHistory.steps.map((row: TaskHistoryProps, index: number) => (
                  <TimelineStep key={index}>
                    <TimeLineIcon
                      className={
                        row.step === timeLineData.currentStep && dataTask?.status !== 'Concluida'
                          ? 'actual'
                          : row.step <= timeLineData.currentStep
                          ? 'checked'
                          : ''
                      }
                    >
                      {Number(row.step) >= Number(timeLineData.currentStep) &&
                        dataTask?.status !== 'Concluida' && <div className="dot"></div>}

                      {(Number(row.step) < Number(timeLineData.currentStep) ||
                        dataTask?.status === 'Concluida') && <IconBigCheck />}
                    </TimeLineIcon>
                    <TimelineInfo>
                      {/* {row.step < timeLineData.currentStep && (
                        <div className="info-title">Etapa anterior:</div>
                      )}
                      {row.step === timeLineData.currentStep && (
                        <div className="info-title">Etapa atual:</div>
                      )}
                      {row.step > timeLineData.currentStep && (
                        <div className="info-title">Próxima etapa:</div>
                      )} */}
                      <div className="timeline-info">{row.name}</div>
                      {row.time_line.length > 0 &&
                      row.time_line.some((item) => item.action === 'Concluiu Entrega') ? (
                        <div className="info-title">
                          {' '}
                          - {moment(row.time_line[0]?.created).format('DD/MM/YYYY')}
                        </div>
                      ) : row.time_line.length > 0 &&
                        row.time_line.some((item) => item.action === 'Criou Ticket') ? (
                        <div className="info-title">
                          {' '}
                          - {moment(row.time_line[0]?.created).format('DD/MM/YYYY')}
                        </div>
                      ) : row.time_line.length > 0 &&
                        row.time_line.some((item) => item.action === 'Atualmente com a Tarefa') ? (
                        <div className="info-title">
                          {' '}
                          - {moment(row.time_line[0]?.created).format('DD/MM/YYYY')}
                        </div>
                      ) : (
                        ''
                      )}

                      {row.time_line.length > 0 &&
                      row.time_line.some((item) => item.action === 'Concluiu Entrega') ? (
                        <TimelineExtraInfo>
                          Concluído por:{' '}
                          {row.time_line.length > 1
                            ? row.time_line.find((item) => item.action === 'Concluiu Entrega')?.name
                            : row.time_line[0].name}
                          <div>
                            as{' '}
                            {moment(
                              row.time_line.find((item) => item.action === 'Concluiu Entrega')
                                ?.created
                            ).format('HH:mm')}
                            h
                          </div>
                        </TimelineExtraInfo>
                      ) : row.time_line.length > 0 &&
                        row.time_line.some((item) => item.action === 'Criou Ticket') ? (
                        <TimelineExtraInfo>
                          Ticket criado por:{' '}
                          {row.time_line.length > 1
                            ? row.time_line.find((item) => item.action === 'Criou Ticket')?.name
                            : row.time_line[0].name}
                          <div>
                            as{' '}
                            {moment(
                              row.time_line.find((item) => item.action === 'Criou Ticket')?.created
                            ).format('HH:mm')}
                            h
                          </div>
                        </TimelineExtraInfo>
                      ) : row.time_line.length > 0 &&
                        row.time_line.some((item) => item.action === 'Atualmente com a Tarefa') ? (
                        <TimelineExtraInfo>
                          Trabalhando:{' '}
                          {row.time_line.length > 1
                            ? row.time_line.find(
                                (item) => item.action === 'Atualmente com a Tarefa'
                              )?.name
                            : row.time_line[0].name}
                          <div>
                            as{' '}
                            {moment(
                              row.time_line.find((item) => item.action === 'Criou Ticket')?.created
                            ).format('HH:mm')}
                            h
                          </div>
                        </TimelineExtraInfo>
                      ) : (
                        ''
                      )}
                    </TimelineInfo>
                  </TimelineStep>
                ))}
            </TimeLine>
            <TasksInfos>
              <RightInfosTitle>Detalhes da tarefa</RightInfosTitle>
              <TaskInfoField>
                <div className="info-title">Tempo estimado:</div>
                <div className="info-description">
                  {dataTask?.deliverys[0]?.total_time !== 'undefined'
                    ? dataTask?.deliverys[0]?.total_time
                    : 'Livre'}
                </div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Tempo consumido:</div>
                <div className="info-description">{dataTask?.deliverys[0]?.time_consumed}</div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Fluxo:</div>
                <div className="info-description">{dataTask?.flow}</div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Etapa:</div>
                <div className="info-description">{dataTask?.card_name}</div>
              </TaskInfoField>

              {/* <TaskInfoField>
                <div className="info-title">I/D:</div>
                <div className="info-description">Digital</div>
              </TaskInfoField> */}

              <TaskInfoField>
                <div className="info-title">Prioridade:</div>
                <div
                  className={
                    dataTask?.urgent === 'false' ? 'info-description' : 'info-description urgent'
                  }
                >
                  {dataTask?.urgent === 'false' ? 'Normal' : 'Urgente'}
                </div>
              </TaskInfoField>

              <TaskInfoField
                onClick={() =>
                  setUpdateDateTask({
                    isOn: true,
                    date_end: updateDateTask.date_end
                  })
                }
                style={{ cursor: 'pointer' }}
              >
                <div className="info-title">Data final de entrega ao cliente:</div>
                {!updateDateTask.isOn && (
                  <div className="info-description">
                    {moment(dataTask?.creation_date_end).format('DD/MM/YYYY')}
                  </div>
                )}
                {updateDateTask.isOn && (
                  <div className="update-date" ref={dateRef}>
                    <InputDefault
                      label=""
                      placeholder="00/00/0000"
                      name="creation_date_end"
                      type="date"
                      max={'9999-12-31'}
                      icon={BiCalendar}
                      onChange={handleOnChangeDate}
                      value={updateDateTask.date_end}
                      onKeyDown={handleKeyDown}
                      error={updateDateTask.date_end === '' ? 'Data não permitida' : ''}
                    />

                    <ButtonDefault
                      typeButton={
                        updateDateTask.date_end === '' || updateDateTask.date_end === null
                          ? 'blocked'
                          : 'primary'
                      }
                      onClick={handleUpdateDate}
                      disabled={
                        updateDateTask.date_end === '' || updateDateTask.date_end === null
                          ? true
                          : false
                      }
                    >
                      OK
                    </ButtonDefault>
                  </div>
                )}
              </TaskInfoField>
            </TasksInfos>
            <ArrowSection onClick={() => setHideRightCard('hide')}>
              <MdClose />
              {/* <BsChevronDoubleRight />
              <div className="hide">Fechar</div> */}
            </ArrowSection>
          </RightInfosCard>

          <ShowInfosButton onClick={() => setHideRightCard('show')}>
            <FaArrowLeft />
          </ShowInfosButton>
        </TaskInfoWrapper>
      )}

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading} />

      {/* Modal change hours */}
      <ModalDefault
        isOpen={modalUpdateHours}
        onOpenChange={() => setModalUpdateHours(false)}
        title="Tempo na tarefa"
      >
        <TimeWrapper>
          <CloseButton onClick={() => setModalUpdateHours(false)}>
            <BiX size={30} />
          </CloseButton>

          <Table>
            <table>
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th>Colaborador</th>
                  <th>Observação</th>
                  <th>Início</th>
                  <th>Final</th>
                  <th>Tempo alocado</th>
                  <th>Ativo</th>
                  <th style={{ color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {clockData &&
                  clockData?.length > 0 &&
                  clockData?.map((step, index: number) =>
                    step?.clock.map((row, indexClock: number) => (
                      <tr key={index}>
                        <td>{step.name}</td>
                        <td>
                          <UserInfo>
                            <div className="user-name">{row.name_user}</div>
                            <div className="user-function">{row.function}</div>
                          </UserInfo>
                        </td>
                        <td>
                          <InputDefault
                            label=""
                            placeholder="Digite aqui..."
                            name="observation"
                            value={row.observation}
                            onChange={(e) => {
                              updateClockFieldInfos(
                                index,
                                indexClock,
                                'observation',
                                e.target.value
                              );
                              // removeError('date_start');
                            }}
                            error={''}
                          />
                        </td>
                        <td>
                          <DataInfos>
                            {row.first_play !== '' && (
                              <div className="prev-date">{row.first_play}</div>
                            )}
                            <InputDefault
                              label=""
                              placeholder="00/00/0000 00:00"
                              name="play"
                              type="datetime-local"
                              max={'9999-12-31'}
                              icon={BiCalendar}
                              onChange={(e) => {
                                updateClockFieldInfos(
                                  index,
                                  indexClock,
                                  'play',
                                  moment(e.target.value).format('YYYY-MM-DD HH:mm:ss')
                                );
                                // removeError('date_start');
                              }}
                              value={row.play}
                              // onKeyDown={handleKeyDown}
                              // error={
                              //   errorsForm.date_start || errorsForm.allFields ? 'Data inicial é obrigatória!' : ''
                              // }
                            />
                          </DataInfos>
                        </td>
                        <td>
                          <DataInfos>
                            {row.first_pause !== '' && (
                              <div className="prev-date">{row.first_pause}</div>
                            )}
                            <InputDefault
                              label=""
                              placeholder="00/00/0000 00:00:00"
                              name="pause"
                              type="datetime-local"
                              max={'9999-12-31'}
                              icon={BiCalendar}
                              onChange={(e) => {
                                updateClockFieldInfos(
                                  index,
                                  indexClock,
                                  'pause',
                                  moment(e.target.value).format('YYYY-MM-DD HH:mm:ss')
                                );
                                // removeError('date_start');
                              }}
                              value={row.pause}
                              // onKeyDown={handleKeyDown}
                              // error={
                              //   errorsForm.date_start || errorsForm.allFields ? 'Data inicial é obrigatória!' : ''
                              // }
                            />
                          </DataInfos>
                        </td>
                        <td>{row.time_lapse}</td>
                        <td>
                          <Switch
                            onChange={(e) =>
                              updateClockFieldInfos(
                                index,
                                indexClock,
                                'active',
                                e ? 'true' : 'false'
                              )
                            }
                            name="active"
                            checked={row.active === 'true' ? true : false}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#0046B5"
                          />
                        </td>
                        <td>
                          <ButtonDefault
                            typeButton="primary"
                            onClick={() => handleUpdateClockInfos(row, step.step)}
                          >
                            Salvar
                          </ButtonDefault>
                        </td>
                      </tr>
                    ))
                  )}
              </tbody>
            </table>
          </Table>

          <TotalTaskHours>
            <div className="total-task">Total tarefa</div>

            <TimeAndDates>
              <div className="card-info">
                Início
                <span>{moment(dataTask?.start_job).format('DD/MM/YYYY')}</span>
              </div>

              <div className="card-info">
                Final
                <span>{moment(dataTask?.creation_date_end).format('DD/MM/YYYY')}</span>
              </div>

              <div className="card-info">
                Tempo alocado:
                <span>{dataTask?.time_consumed}</span>
              </div>
            </TimeAndDates>
          </TotalTaskHours>
        </TimeWrapper>
      </ModalDefault>

      {/* Modal User without schedule */}
      <ModalDefault
        isOpen={modalWithoutSchedule}
        onOpenChange={() => {
          setModalWithoutSchedule(false);
          setSelectedInitalUser({
            function: '',
            name: '',
            tasks: 0,
            user_id: ''
          });
        }}
        title="Altere o usuário da tarefa"
      >
        <UsersWrapper>
          <ProductsTable>
            <table>
              <thead>
                <tr>
                  <th>Selecionar</th>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>Tarefas</th>
                </tr>
              </thead>

              <tbody>
                {usersWithoutSchedule.map((row: UsersNoSchedule) => (
                  <tr key={row.user_id}>
                    <td>
                      <CheckboxDefault
                        label=""
                        name={''}
                        onChange={() => setSelectedInitalUser(row)}
                        checked={selectedInitialUser?.user_id === row.user_id}
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.function}</td>
                    <td>{row.tasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ShowAllUsers>
              <CheckboxDefault
                label="Mostrar todos usuários"
                name="outsiders"
                onChange={() => setOutsideUsers(outsideUsers ? false : true)}
                checked={outsideUsers}
              />
            </ShowAllUsers>
          </ProductsTable>

          <ModalButtons>
            <ButtonDefault
              typeButton="dark"
              isOutline
              onClick={() => {
                setModalWithoutSchedule(false);
                setSelectedInitalUser({
                  function: '',
                  name: '',
                  tasks: 0,
                  user_id: ''
                });
              }}
            >
              Cancelar
            </ButtonDefault>

            <ButtonDefault
              typeButton="primary"
              loading={loading}
              onClick={updateChangeUserNoSchedule}
            >
              Escolher
            </ButtonDefault>
          </ModalButtons>
        </UsersWrapper>
      </ModalDefault>

      {/* Modal Schedule change user */}
      <ModalDefault
        isOpen={modalChangeUser}
        title="Lista de pessoas"
        onOpenChange={() => setModalChangeUser(false)}
      >
        <ScheduleUser
          task_title={dataTask?.title}
          taskId={dataTask?.task_id}
          estimated_time={allTimes}
          flow={dataTask?.flow_id}
          project_product_id={dataTask?.project_product_id}
          step={Number(dataTask?.step)}
          user_alocated={updateChangeUserSchedule}
          closeModal={() => setModalChangeUser(false)}
          manualOverrideDate={false}
          loadingSubmit={loading}
          taskType={dataTask?.type}
          deductHours={taskDeductHours}
        />
      </ModalDefault>
    </ContainerDefault>
  );
}
