/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaDownload } from 'react-icons/fa';
import { IconBigCheck } from '../../../assets/icons';
import { BiShow } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';
import ProductTable from '../../../components/Ui/ProductTable';
import { ContainerDefault } from '../../../components/UiElements/styles';
import ModalDefault from '../../../components/Ui/ModalDefault';
import CardTaskPlay from '../../../components/CardTaskPlay';
import ScheduleUser from '../../../components/ScheduleUser';
import WorkingProduct from '../WorkingProduct';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import UploadFilesTicket from '../../../components/UploadTicket/UploadFilex';
import { UsersWrapper } from '../../Tasks/CreateTasks/styles';
import { ProductsTable } from '../../Tasks/ComponentSteps/InfoDeliverables/styles';
import {
  CardTitle,
  CardWrapper,
  EstimatedTime,
  ModalButtons,
  StopWatchTimer
} from '../../Tasks/ViewTask/styles';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { TextAreaDefault } from '../../../components/Inputs/TextAreaDefault';
import UploadFiles from '../../../components/Upload/UploadFiles';
import UploadFinalFile from '../../../components/UploadFinal/UploadFinalFiles';
import Loader from '../../../components/LoaderSpin';
import { Table } from '../../../components/Table';

// Styles
import {
  ArrowSection,
  CardsWrapper,
  DeliveryWrapper,
  FilePreview,
  FileProductList,
  FileProductsWrapper,
  ModalProductsWrapper,
  ModalReturnFlow,
  ModalUploadWrapper,
  ProductAndMotiveInfos,
  ProductAndMotiveLi,
  ProductsAndMotivesWrapper,
  RightInfosCard,
  RightInfosTitle,
  SelectProductField,
  ShowInfosButton,
  TaskInfoField,
  TasksInfos,
  TextInfo,
  TimeLine,
  TimeLineIcon,
  TimelineExtraInfo,
  TimelineInfo,
  TimelineStep
} from './styles';
import { ButtonIcon } from '../WorkingProduct/styles';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useStopWatch } from '../../../hooks/stopWatch';
import { useAuth } from '../../../hooks/AuthContext';

// Types
import {
  StepTimeline,
  TaskFile,
  TaskHistoric,
  TaskHistoryProps,
  UploadedFilesProps
} from '../../../types';

// Utils
import { UsersNoSchedule } from '../../../utils/models';
import { ModalProductWrapper } from '../styles';

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface ReturnProps {
  chosenStep: string;
  returnMotive: string;
}

interface ProductProps {
  products_delivery_id: string;
  delivery_id: string;
  service: string;
  description: string;
  reason_change: string;
  type: string;
  size: string;
  flag: string;
  minutes: string;
  quantity: string;
  period: string;
  category: string;
  job_service_id: string;
  status: string;
  minutes_consumed: string;
  minutes_creation: string;
  minutes_essay: string;
  ticket_interaction_id: string;
  essay: string;
  task_file_id: string;
  product_return_id: string;
  file_status: string;
  status_interaction: string;
}

export default function ViewProductsDeliveries() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const { stop } = useStopWatch();
  const { id } = useParams();
  const { state, setInitialTime, setTaskInfo, handleClock } = useStopWatch();
  const openRightRef = useRef<any>();
  const [modalSendToUser, setModalSendToUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [playingForSchedule, setPlayingForSchedule] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');
  const [dataTask, setDataTask] = useState<any>();
  const [dataProducts, setDataProducts] = useState<any>();
  const [timeData, setTimeData] = useState<any>();
  const [timeLineData, setTimelineData] = useState<TimelineProps>();
  const [hideTimeLine, setHideTimeLine] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>('');
  const [typeOfPlay, setTypeOfPlay] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [modalUpload, setModalUpload] = useState<boolean>(false);
  const [modalFinalFile, setModalFinalFile] = useState<boolean>(false);
  const [productForUpload, setProductForUpload] = useState<any>({});
  const [enableUpload, setEnableUpload] = useState<boolean>(false);
  const [viewProduct, setViewProduct] = useState<boolean>(false);
  const [modalWithoutSchedule, setModalWithoutSchedule] = useState<boolean>(false);
  const [usersWithoutSchedule, setUsersWithoutSchedule] = useState<UsersNoSchedule[]>([]);
  const [selectedInitialUser, setSelectedInitalUser] = useState<UsersNoSchedule>();
  const [modalReturnFlow, setModalReturnFlow] = useState<boolean>(false);
  const [returnInfos, setReturnInfos] = useState<ReturnProps>({
    chosenStep: '',
    returnMotive: ''
  });
  const [toClientConfirmation, setToClientConfirmation] = useState<boolean>(false);
  const [showHoursBack, setShowHoursBack] = useState<boolean>(false);
  const [modalProducts, setModalProducts] = useState<boolean>(false);
  const [modalDismemberment, setModalDismemberment] = useState<boolean>(false);
  const [modalTenantApprove, setModalTenantApprove] = useState<boolean>(false);
  const [filesToTenantApprove, setFilesToTenantApprove] = useState<TaskFile[]>([]);
  const [showClock, setShowClock] = useState<boolean>(false);
  const [taskHistory, setTaskHistory] = useState<TaskHistoric>();
  const [modalReturnAllRejected, setModalReturnAllRejected] = useState<boolean>(false);
  const [modalPreviewImage, setModalPreviewImage] = useState<boolean>(false);

  const [previewImage, setPreviewImage] = useState({
    isOpen: false,
    imageInfos: {
      bucket: '',
      created: '',
      file_name: '',
      key: '',
      task_file_id: '',
      task_id: '',
      size: '',
      updated: '',
      url: ''
    }
  });

  let userInfos = {
    next_user: '',
    start_job: '',
    end_job: ''
  };

  const deliveryId = dataTask?.deliverys.filter((obj: any) => Number(obj.order) === 1);

  const titleInfos = {
    idNumber: dataTask?.task_id,
    numberTask: location?.state?.task_index ? location.state.task_index : 1,
    titleTask: dataTask?.title,
    monthTask: '',
    client_task: dataTask?.tenant,
    typeTask: dataTask?.project_category,
    quantityTask: '',
    contract_task: dataTask?.product_period
  };

  const allTimes = {
    time_essay: dataProducts?.time_essay,
    time_creation: dataProducts?.time_creation,
    total_time: dataTask?.total_time
  };

  const data = {
    estimatedTime: user.permissions.includes('jobs_tasks_essay')
      ? dataProducts?.time_essay
      : user.permissions.includes('jobs_tasks_execute')
      ? dataProducts?.time_creation
      : dataTask?.total_time
  };

  const InputsTask = {
    copywriting_description: dataTask?.copywriting_description,
    creation_description: dataTask?.creation_description
  };

  const actualDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const actualStep = timeLineData?.currentStep;
  const uploadIsTrue = timeLineData
    ? timeLineData.steps.filter((obj) => obj.step === actualStep)
    : '';

  const nextStep = timeLineData
    ? timeLineData.steps.filter((obj) => Number(obj.step) === Number(actualStep) + 1)
    : [];

  const finalCard = uploadIsTrue && uploadIsTrue[0].final_card === 'true';

  const uploadClient = uploadIsTrue && uploadIsTrue[0].tenant_approve === 'true';

  const mandatoryUpload = uploadIsTrue && uploadIsTrue[0].necessary_upload === 'true';

  const stepsToReturn: any[] = timeLineData
    ? timeLineData.steps.filter((obj) => Number(obj.step) < Number(actualStep))
    : [];

  const productsNames: string[] = dataTask?.files.map((file: any) => {
    const matchingDelivery = dataTask?.deliverys.find((delivery: any) =>
      delivery.products.some(
        (product: any) => product.products_delivery_id === file.products_delivery_id
      )
    );

    if (matchingDelivery) {
      const matchingProduct = matchingDelivery.products.find(
        (product: any) => product.products_delivery_id === file.products_delivery_id
      );
      return matchingProduct ? matchingProduct.service : '';
    }

    return '';
  });

  // const checkAllFinished: any[] = dataProducts.products.every(
  //   (product: any) => product.status === 'Concluida'
  // );

  const hasDismemberedProductInDeliveries = (delivery: any): boolean => {
    return delivery.products.some((product: any) => product.status === 'Desmembrada');
  };

  const hasDismemberedProduct = dataTask?.deliverys.some(hasDismemberedProductInDeliveries);

  const hasToDismemberTask = dataTask?.files?.some((obj: any) => obj.status === 'fail');

  const hasProductsBeenEvaluated =
    dataTask?.deliverys &&
    dataTask.deliverys.every((delivery: any) =>
      delivery.products?.every((product: any) => product.status_interaction !== '')
    );

  // const hasTicketInteraction: any[] = dataTask?.files.filter(
  //   (obj: any) => obj.ticket_interaction_id !== ''
  // );
  const hasTicketInteraction: any[] = [];
  const files: any[] = dataTask?.files.toReversed();
  files?.map((obj: any) => {
    if (
      obj.ticket_interaction_id !== '' &&
      !hasTicketInteraction.some((e) => e.products_delivery_id === obj.products_delivery_id)
    ) {
      hasTicketInteraction.push(obj);
    }
  });

  const hasAllBeenRejected =
    hasTicketInteraction?.length > 0
      ? hasTicketInteraction?.filter((obj: any) => obj.status === 'fail')
      : [];

  const hasAllBeenAccepted =
    hasTicketInteraction?.length > 0
      ? hasTicketInteraction?.filter((obj: any) => obj.status === 'pass')
      : [];

  // const hasMissingFilesToApprove = dataTask?.deliverys.some(hasProductsBeenEvaluated);

  const fetchClockInfo = useCallback(async () => {
    try {
      const response = await api.get(`/clock/verify`);
      if (response.data.result.show_hours === 'true') {
        setShowClock(true);
      }
      if (response.data.result.show_hours === 'false') {
        setShowClock(false);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }, [showClock]);

  useEffect(() => {
    fetchClockInfo();
  }, [fetchClockInfo]);

  useEffect(() => {
    // console.log('log do params =>', id);

    async function getClockIsOpen() {
      try {
        setLoading(true);

        if (typeOfPlay === 'schedule') {
          const response = await api.get(
            `/clock/consumed?delivery_id=${deliveryId[0]?.delivery_id}`
          );
          if (response.data.result.play === true) {
            setPlayingForSchedule(true);
            setInitialTime({
              isRunning: true,
              elapsedTime: response.data.result.diff / 1000
            });
            setTaskInfo({
              idNumber: dataTask?.task_id,
              numberTask: location.state?.task_index,
              titleTask: dataTask?.title,
              monthTask: '',
              client_task: dataTask?.tenant,
              typeTask: dataTask?.project_category,
              quantityTask: '',
              contract_task: dataTask?.product_period
            });
          } else {
            setInitialTime({
              isRunning: false,
              elapsedTime: response.data.result.diff / 1000
            });
            setTaskInfo({
              idNumber: dataTask?.task_id,
              numberTask: location.state?.task_index,
              titleTask: dataTask?.title,
              monthTask: '',
              client_task: dataTask?.tenant,
              typeTask: dataTask?.project_category,
              quantityTask: '',
              contract_task: dataTask?.product_period
            });
          }
        }

        if (typeOfPlay === 'product' && selectedProduct === '') {
          setInitialTime({
            isRunning: false,
            elapsedTime: 0
          });
          setTaskInfo({
            idNumber: dataTask?.task_id,
            numberTask: location.state?.task_index,
            titleTask: dataTask?.title,
            monthTask: '',
            client_task: dataTask?.tenant,
            typeTask: dataTask?.project_category,
            quantityTask: '',
            contract_task: dataTask?.product_period
          });
        }

        if (typeOfPlay === 'product' && selectedProduct !== '') {
          const response = await api.get(
            `/clock/consumed?products_delivery_id=${selectedProduct?.productInfo?.products_delivery_id}`
          );
          if (response.data.result.play === true) {
            setPlayingForSchedule(true);
            setInitialTime({
              isRunning: true,
              elapsedTime: response.data.result.diff / 1000
            });
            setTaskInfo({
              idNumber: dataTask?.task_id,
              numberTask: location.state?.task_index,
              titleTask: dataTask?.title,
              monthTask: '',
              client_task: dataTask?.tenant,
              typeTask: dataTask?.project_category,
              quantityTask: '',
              contract_task: dataTask?.product_period
            });
          } else {
            setInitialTime({
              isRunning: false,
              elapsedTime: response.data.result.diff / 1000
            });
            setTaskInfo({
              idNumber: dataTask?.task_id,
              numberTask: location.state?.task_index,
              titleTask: dataTask?.title,
              monthTask: '',
              client_task: dataTask?.tenant,
              typeTask: dataTask?.project_category,
              quantityTask: '',
              contract_task: dataTask?.product_period
            });
          }
        }

        setLoading(false);
      } catch (error) {
        console.log('log error rescue clock', error);
        setLoading(false);
      }
    }

    getClockIsOpen();
  }, [typeOfPlay, selectedProduct]);

  async function getTaskInfos() {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/${id}`);
      // console.log('log do response get task', response.data.result);

      if (response.data.result.length > 0) {
        setDataTask(response.data.result[0]);
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

  useEffect(() => {
    getTaskInfos();
  }, []);

  useEffect(() => {
    // setDataTask(location.state.task);
    // console.log('log do params =>', id);

    if (dataTask?.type_play === 'delivery') {
      setTypeOfPlay('schedule');
    }

    if (dataTask?.type_play === 'product') {
      setTypeOfPlay('product');
    }

    const timeDataInfo = {
      totalTime: dataTask?.total_time,
      timeConsumed: dataTask?.time_consumed
    };
    setTimeData(timeDataInfo);
    setDataProducts(dataTask?.deliverys[0]);

    async function getTimelineData() {
      try {
        const response = await api.get(`task/timeline/${id}`);
        setTimelineData(response.data.result);
      } catch (error: any) {
        console.log('log timeline error', error);
      }
    }

    async function getTaskHistory() {
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

    getTimelineData();
    getTaskHistory();
  }, [dataTask]);

  useEffect(() => {
    if (
      (uploadIsTrue && uploadIsTrue[0].necessary_upload === 'true') ||
      (uploadIsTrue && uploadIsTrue[0].tenant_approve === 'true')
    ) {
      setEnableUpload(true);
    }
  }, [timeLineData]);

  const handlePlayingType = () => {
    if (typeOfPlay === 'schedule') {
      setPlayingForSchedule(true);
      handleSwitchPlayType(false);
      handleStartPlayingTime('schedule');
    }

    if (typeOfPlay === 'product' && selectedProduct !== '') {
      setPlayingForSchedule(false);
      handleSwitchPlayType(true);
      handleStartPlayingTime('product');
    }

    if (typeOfPlay === 'product' && selectedProduct === '') {
      addToast({
        title: 'Atenção',
        description:
          'Para dar play por produto é necessário dar o play dentro do produto escolhido',
        type: 'warning'
      });
    }
  };

  const handleStartPlayingTime = async (value: string) => {
    if (value === 'schedule') {
      const taskClock = {
        task_id: dataTask?.task_id,
        delivery_id: deliveryId[0].delivery_id
      };

      handleClock(taskClock);

      try {
        setLoading(true);
        const responseClock = await api.post(`/clock`, taskClock);
        // console.log('log do responseClock', responseClock);
        setLoading(false);
      } catch (error: any) {
        console.log('log do error play', error);

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

    if (value === 'product') {
      const taskClock = {
        task_id: dataTask?.task_id,
        products_delivery_id: selectedProduct?.productInfo?.products_delivery_id
      };

      handleClock(taskClock);

      try {
        setLoading(true);
        const responseClock = await api.post(`/clock`, taskClock);
        // console.log('log do responseClock', responseClock);
        setLoading(false);
      } catch (error: any) {
        console.log('log do error play', error);

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
  };

  const handleSwitchPlayType = async (value: any) => {
    if (value) {
      const playType = {
        task_id: dataTask?.task_id,
        type_play: 'product'
      };
      try {
        const response = await api.post(`/task/switch-play`, playType);
        // console.log('log do response task/switch-play', response.data.result);
        if (response.data.result === 1) {
          setTypeOfPlay('product');
        }
      } catch (error: any) {
        console.log('log do switch play', error);
        addToast({
          title: 'Atenção',
          description: 'Tarefa iniciada, não alterar o tipo do play',
          type: 'warning'
        });
      }
    } else {
      const playType = {
        task_id: dataTask?.task_id,
        type_play: 'delivery'
      };
      try {
        const response = await api.post(`/task/switch-play`, playType);
        // console.log('log do response task/switch-play', response.data.result);
        if (response.data.result === 1) {
          setTypeOfPlay('schedule');
        }
      } catch (error: any) {
        addToast({
          title: 'Atenção',
          description: 'Tarefa iniciada, não alterar o tipo do play',
          type: 'warning'
        });
      }
    }
  };

  const handleNavigateProduct = (type: string, infoProduct: any) => {
    if (type === 'view' && infoProduct === 'task') {
      navigate(`/tarefa/${dataTask.parents[0].task_id}`);
    }

    if (type === 'view' && infoProduct !== 'task') {
      const taskCompleteInfo = {
        productInfo: infoProduct,
        taskInfos: dataTask
      };
      setSelectedProduct(taskCompleteInfo);
      setViewProduct(true);
    }

    if (type === 'select') {
      const taskCompleteInfo = {
        productInfo: JSON.parse(infoProduct.target.value),
        taskInfos: dataTask
      };
      setSelectedProduct(taskCompleteInfo);
    }
  };

  const handleAssignTask = (values: any) => {
    if (!showHoursBack) {
      setModalSendToUser(false);
      handleSendToNextUser(values);
    }

    if (showHoursBack) {
      setModalSendToUser(false);
      handleReturnTask(values);
    }
  };

  const handleSendToNextUser = async (values: any) => {
    try {
      setLoading(true);
      const next_user = {
        next_user: values.user_id,
        start_job: values.start_job,
        end_job: values.end_job
      };

      if (dataTask?.type === 'Livre') {
        const responseNextDate = await api.get(
          `/task/nextdate=${moment(new Date()).format('YYYY-MM-DD')}&task_id=${dataTask?.task_id}`
        );

        const response = await api.get(`/task/next-user/${dataTask?.task_id}`);

        if (response.data.result.length > 0) {
          const payload = {
            user_id: response.data.result[0].user_id,
            task_id: dataTask?.task_id
          };

          const responseConclude = await api.put(`/task/send-for-evaluation`, payload);

          addToast({
            title: 'Sucesso',
            description: 'Tarefa avançou para a próxima etapa.',
            type: 'success'
          });
          stop();
          navigate('/minhas-tarefas');
          localStorage.removeItem('stopwatchState');
        }
      }

      if (dataTask?.status !== 'Concluida' && typeOfPlay === 'schedule') {
        const response = await api.put(
          `/task/delivery-conclude/${deliveryId[0].delivery_id}`,
          next_user
        );
        // console.log('log do response', response.data.result);

        if (response.data.result === 1) {
          addToast({
            title: 'Sucesso',
            description: 'Tarefa avançou para a próxima etapa.',
            type: 'success'
          });
          stop();
          navigate('/minhas-tarefas');
          localStorage.removeItem('stopwatchState');
        }
      }

      if (dataTask?.status !== 'Concluida' && selectedProduct !== '' && typeOfPlay === 'product') {
        if (selectedProduct.status !== 'Concluida') {
          const response = await api.put(
            `/task/product-conclude/${selectedProduct?.productInfo.products_delivery_id}`
          );

          if (response.data.result === 1) {
            addToast({
              title: 'Sucesso',
              type: 'success',
              description: 'Entrega finalizada com sucesso'
            });
            stop();
            navigate('/minhas-tarefas');
            localStorage.removeItem('stopwatchState');
          }
        } else {
          const response = await api.put(
            `/task/delivery-conclude/${deliveryId[0].delivery_id}`,
            next_user
          );
          // console.log('log do response', response.data.result);

          if (response.data.result === 1) {
            navigate('/minhas-tarefas');
            stop();
            localStorage.removeItem('stopwatchState');
          }
        }
      }

      if (dataTask?.status !== 'Concluida' && selectedProduct === '' && typeOfPlay === 'product') {
        addToast({
          title: 'Aviso',
          description: 'Conclua todos os produtos para conseguir avançar.',
          type: 'warning'
        });

        const response = await api.put(
          `/task/delivery-conclude/${deliveryId[0].delivery_id}`,
          next_user
        );

        if (response.data.result === 1) {
          addToast({
            title: 'Sucesso',
            description: 'Tarefa avançou para a próxima etapa.',
            type: 'success'
          });
          stop();
          navigate('/minhas-tarefas');
          localStorage.removeItem('stopwatchState');
        }
        // if (location.state.delivery.products.length === 1) {
        //   if (location.state.delivery.products.status === 'Concluida') {
        //   } else {
        //     const response = await api.put(
        //       `/task/product-conclude/${location.state.delivery.products[0].products_delivery_id}`
        //     );

        //     if (response.data.result === 1) {
        //       addToast({
        //         title: 'Sucesso',
        //         type: 'success',
        //         description: 'Entrega finalizada com sucesso'
        //       });
        //       navigate('/minhas-tarefas');
        //       localStorage.removeItem('stopwatchState');
        //     }
        //   }
        // }

        if (location.state?.delivery.products.length > 1) {
          userInfos = next_user;
          // setModalProducts(true);
          // setHideRightCard('hide');
        }
      }

      // if (
      //   dataProducts?.status === 'Concluida' &&
      //   selectedProduct === '' &&
      //   typeOfPlay === 'product'
      // ) {
      //   const response = await api.put(
      //     `/task/delivery-conclude/${deliveryId[0].delivery_id}`,
      //     next_user
      //   );
      //   console.log('log do response', response.data.result);

      //   if (response.data.result === 1) {
      //     navigate('/minhas-tarefas');
      //     localStorage.removeItem('stopwatchState');
      //   }
      // }

      setLoading(false);
    } catch (error: any) {
      console.log('log error next user', error);
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
  };

  async function handleSendToManager() {
    try {
      setLoading(true);

      const responseNextDate = await api.get(
        `/task/nextdate=${moment(new Date()).format('YYYY-MM-DD')}&task_id=${dataTask?.task_id}`
      );

      const response = await api.get(`/task/next-user/${dataTask?.task_id}`);

      if (response.data.result.length > 0) {
        const payload = {
          user_id: response.data.result[0].user_id,
          task_id: dataTask?.task_id
        };

        const responseConclude = await api.put(`/task/send-for-evaluation`, payload);

        navigate('/minhas-tarefas');
        localStorage.removeItem('stopwatchState');

        // console.log('log do response conclude', responseConclude.data.result);
      }
      navigate('/minhas-tarefas');
      localStorage.removeItem('stopwatchState');
      setLoading(false);
    } catch (error: any) {
      console.log('log error send to manager', error);
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
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [hideRightCard]);

  const handleUploadForProduct = (value: any) => {
    setProductForUpload(value);
    if (!finalCard && !uploadClient) {
      setModalUpload(true);
    }
    if (finalCard && enableUpload) {
      setModalFinalFile(true);
    }
    if (uploadClient && dataTask.files.length > 0) {
      setModalTenantApprove(true);
    }
    if (uploadClient && dataTask.files.length <= 0) {
      setModalFinalFile(true);
    }
  };

  async function handleSaveUpload() {
    try {
      const uploadInfos = {
        task_id: dataTask?.task_id,
        file_name: uploadedFiles[0].file_name,
        original_name: uploadedFiles[0].original_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        products_delivery_id: productForUpload?.products_delivery_id
      };

      const response = await api.put(`/task/upload`, uploadInfos);

      if (response.data.status === 'success') {
        setUploadedFiles([]);
        setModalUpload(false);
        getTaskInfos();
        // navigate('/minhas-tarefas');
      }

      // console.log('log do response do saveUpload', response.data.result);
    } catch (error: any) {
      console.log('log save upload for product', error);
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

  async function handleSaveUploadFinal() {
    try {
      const uploadInfos = {
        task_id: dataTask?.task_id,
        file_name: uploadedFiles[0].file_name,
        original_name: uploadedFiles[0].original_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        last_archive: 'true',
        products_delivery_id:
          productForUpload.products_delivery_id || dataProducts.products[0].products_delivery_id
      };

      const response = await api.put(`/task/upload`, uploadInfos);

      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          description: 'Sucesso, upload final concluído.',
          type: 'success'
        });
        setUploadedFiles([]);
        setModalUpload(false);
        setModalFinalFile(false);
        setToClientConfirmation(false);
        getTaskInfos();
        handleConcludeTask();
      }

      // console.log('log do response do saveUpload', response.data.result);
    } catch (error: any) {
      console.log('log save upload final file', error);
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

  async function handleSaveUploadClient() {
    try {
      const uploadInfos = {
        task_id: dataTask?.task_id,
        file_name: uploadedFiles[0].file_name,
        original_name: uploadedFiles[0].original_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        products_delivery_id: productForUpload.products_delivery_id
      };
      const response = await api.put(`/task/upload-tenant-approve`, uploadInfos);

      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          description: 'Arquivo enviado, aguarde a aprovação do cliente.',
          type: 'success'
        });
        setUploadedFiles([]);
        setModalFinalFile(false);
        setToClientConfirmation(false);
        getTaskInfos();
        // navigate('/minhas-tarefas');
        // setTimeout(() => {
        // }, 1500);
      }

      // console.log('log do response do saveUpload', response.data.result);
    } catch (error: any) {
      console.log('log save upload tenant file', error);
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

  async function checkFlow(checkType: string) {
    try {
      setLoading(true);
      if (
        hasAllBeenRejected.length >= dataProducts?.products.length &&
        hasAllBeenAccepted.length < dataProducts?.products.length &&
        checkType === 'next' &&
        dataTask?.status !== 'Aguardando Aprovação' &&
        dataTask.status !== 'Alteração Externa' &&
        uploadClient
      ) {
        setModalReturnAllRejected(true);

        console.log('log do checkFlow 1 - Dismember all');
      } else if (
        hasToDismemberTask &&
        checkType === 'next' &&
        dataTask.status !== 'Alteração Externa' &&
        dataTask.status !== 'Alteração Interna' &&
        dataTask?.status !== 'Aguardando Aprovação' &&
        !hasDismemberedProduct
      ) {
        setModalDismemberment(true);
        console.log('log do checkFlow 2 - Dismember');
      } else if (
        uploadClient &&
        checkType === 'next' &&
        dataTask?.files.length > 0 &&
        dataTask?.status !== 'Aguardando Aprovação' &&
        dataTask?.status !== 'Avaliada' &&
        !hasProductsBeenEvaluated
      ) {
        setModalTenantApprove(true);
        console.log('log do checkFlow 3 - Tenant approve');
      } else if (checkType === 'next' && !finalCard) {
        console.log('log do checkFlow 4 - Flow function');
        const response = await api.get(
          `/flow-function?step=${Number(actualStep) + 1}&flow_id=${dataTask?.flow_id}`
        );

        if (response.data.result[0].show_hours === 'true') {
          if (
            dataTask?.status !== 'Concluida' &&
            selectedProduct === '' &&
            typeOfPlay === 'product'
          ) {
            addToast({
              title: 'Aviso',
              description: 'Conclua todos os produtos para conseguir avançar.',
              type: 'warning'
            });
          } else {
            setModalSendToUser(true);
          }
        }
        if (response.data.result[0].show_hours === 'false') {
          handleNextUser('next');
        }
      } else if (checkType === 'next' && finalCard) {
        if (dataTask.ticket_id !== '' && mandatoryUpload) {
          setModalFinalFile(true);
        }
        if (dataTask?.ticket_id !== '' && !mandatoryUpload) {
          handleUploadApproved();
        }
        if (dataTask?.ticket_id === '') {
          handleConcludeTask();
        }
      }

      if (checkType === 'back') {
        const response = await api.get(
          `/flow-function?step=${returnInfos.chosenStep}&flow_id=${dataTask?.flow_id}`
        );

        if (response.data.result[0].show_hours === 'true') {
          setModalSendToUser(true);
          setShowHoursBack(true);
          setModalReturnFlow(false);
        }
        if (response.data.result[0].show_hours === 'false') {
          handleNextUser('back');
          setShowHoursBack(true);
          setModalReturnFlow(false);
        }
      }

      // console.log('log do mandatoryUpload =>', mandatoryUpload);
      // console.log('log do checkMandatoryUpload =>', checkMandatoryUpload());

      // if (mandatoryUpload && checkMandatoryUpload()) {
      //   addToast({
      //     title: 'Atenção',
      //     description: 'é necessário fazer upload para todos os produtos',
      //     type: 'warning'
      //   });
      //   throw new Error('');
      // }

      setLoading(false);
    } catch (error: any) {
      console.log('log do error check flow', error);
      setLoading(false);
    }
  }

  async function handleNextUser(type: string) {
    try {
      setLoading(true);

      if (type === 'next') {
        const response = await api.get(
          `/task/next?flow=${dataTask?.flow_id}&project_product_id=${
            dataTask?.project_product_id
          }&step=${Number(actualStep) + 1}&task_id=${dataTask?.task_id}`
        );
        setUsersWithoutSchedule(response.data.result);
        setModalWithoutSchedule(true);
        stop();
      }

      if (type === 'back') {
        const response = await api.get(
          `/task/next?project_product_id=${dataTask?.project_product_id}&flow=${dataTask?.flow_id}&step=${returnInfos.chosenStep}&task_id=${dataTask?.task_id}`
        );
        setUsersWithoutSchedule(response.data.result);
        setModalWithoutSchedule(true);
        stop();
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log error handleNextUser', error);

      setLoading(false);
    }
  }

  const handleSetUserWithoutSchedule = async () => {
    try {
      setLoading(true);

      const next_user = {
        next_user: selectedInitialUser?.user_id,
        start_job: actualDate,
        end_job: ''
      };

      const response = await api.put(
        `/task/delivery-conclude/${deliveryId[0].delivery_id}`,
        next_user
      );
      // console.log('log do response', response.data.result);

      if (response.data.result === 1) {
        addToast({
          title: 'Sucesso',
          description: 'Tarefa avançou para a próxima etapa.',
          type: 'success'
        });
        navigate('/minhas-tarefas');
        localStorage.removeItem('stopwatchState');
      }
      setLoading(false);
    } catch (error: any) {
      console.log('log error next user', error);
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
  };

  const handleChooseStepAndMotive = (e: any) => {
    const { name, value } = e.target;

    setReturnInfos((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleBackFlow = () => {
    const selectedStep = timeLineData?.steps.filter((obj) => obj.step === returnInfos.chosenStep);

    checkFlow('back');
    setModalReturnAllRejected(false);

    // console.log('log do selectedStep =>', selectedStep);
  };

  async function handleReturnTask(infos: any) {
    try {
      setLoading(true);

      const returnParams = {
        task_id: dataTask?.task_id,
        reason: returnInfos.returnMotive,
        step: returnInfos.chosenStep,
        user_id: infos.user_id,
        start_job: infos.start_job,
        end_job: infos.end_job
      };

      // console.log('log do returnParams =>', returnParams);
      // console.log('log do back or next =>', showHoursBack);

      const response = await api.put(`/task/return-task`, returnParams);

      if (response.data.status === 'success') {
        navigate('/minhas-tarefas');
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log return task error', error);
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

  const handleCancelReturn = () => {
    setReturnInfos({
      chosenStep: '',
      returnMotive: ''
    });
    setModalReturnFlow(false);
  };

  const handleCancelReturnReject = () => {
    setReturnInfos({
      chosenStep: '',
      returnMotive: ''
    });
    setModalReturnAllRejected(false);
  };

  const handleSelectProduct = () => {
    const user_info = {
      start_job: userInfos.start_job,
      end_job: userInfos.end_job,
      user_id: userInfos.next_user
    };

    setModalProducts(false);
    handleSendToNextUser(user_info);
  };

  async function handleDismemberment() {
    try {
      setLoading(true);

      const response = await api.put(`/task/dismember/${dataTask?.task_id}`);
      if (response.data.result) {
        setModalDismemberment(false);
        navigate('/nova-tarefa', { state: { id: response.data.result } });
      }

      setLoading(false);
    } catch (error: any) {
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

  async function handleConcludeTask() {
    try {
      setLoading(true);

      const response = await api.put(`/task/delivery-conclude/${deliveryId[0].delivery_id}`);

      if (response.data.result) {
        addToast({
          title: 'Sucesso',
          description: 'Tarefa concluída com sucesso',
          type: 'success'
        });
        navigate('/minhas-tarefas');
      }

      setLoading(false);
    } catch (error: any) {
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
      // console.log('log error conclude task', error);
      setLoading(false);
    }
  }

  const compareArrays = () => {
    const matchingItems: any[] = [];
    dataTask?.deliverys?.map((item1: any) => {
      item1?.products?.map((product1: any) => {
        const matchingItem2 = dataTask?.files.find(
          (obj: any) => obj.products_delivery_id === product1.products_delivery_id
        );
        if (matchingItem2) {
          matchingItems.push(matchingItem2);
        }
      });
    });
    return matchingItems;
  };

  const checkMandatoryUpload = () => {
    if (compareArrays().length < dataProducts?.products?.length) {
      return true;
    } else {
      return false;
    }
  };

  async function downloadFile(file: any) {
    try {
      const response = await api.get(
        `https://app.21live.com.br:3000/archive?bucket=${file.bucket}&key=${file.key}`,
        { responseType: 'arraybuffer' }
      );

      // console.log('log do response download =>', response);

      const blob = new Blob([response.data]);
      const urlResponse = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlResponse;
      link.setAttribute('download', `${file.file_name}`);

      setLoading(true);

      document.body.appendChild(link);
      link.click();

      setLoading(false);
    } catch (error: any) {
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: error.response.data.message
        });
      }
      setLoading(false);
    }
  }

  const handleSelectFile = (file: TaskFile) => {
    if (filesToTenantApprove.find((obj) => obj.task_file_id === file.task_file_id)) {
      setFilesToTenantApprove(
        filesToTenantApprove.filter((obj) => obj.task_file_id !== file.task_file_id)
      );
    } else {
      setFilesToTenantApprove((prevState) => [...prevState, file]);
    }
  };

  const handleCancelSendToTenant = () => {
    setToClientConfirmation(false);
    setModalTenantApprove(false);
    setFilesToTenantApprove([]);
  };

  async function handleUploadTenant() {
    try {
      setLoading(true);

      await Promise.all(
        filesToTenantApprove.map(async (imageUrl: TaskFile) => {
          const fileData = new FormData();

          const response = await api.get(
            `https://app.21live.com.br:3000/archive?bucket=${imageUrl.bucket}&key=${imageUrl.key}`,
            { responseType: 'arraybuffer' }
          );

          const blob = new Blob([response.data]);
          const newFile: any = new File([blob], imageUrl.file_name, { type: blob.type });

          fileData.append('archive', newFile);
          fileData.append('ticket_id', dataTask?.ticket_id);
          fileData.append('original_name', imageUrl.original_name);
          fileData.append('task_file_id', imageUrl.task_file_id);
          console.log('log do originalName (upload tenant) =>', imageUrl.original_name);

          const responseFile = await api.post('/archive/upload/ticket', fileData);

          if (responseFile.data.status === 'success') {
            const uploadInfos = {
              task_id: dataTask?.task_id,
              file_name: responseFile.data.result.file_name,
              original_name: imageUrl.original_name,
              size: responseFile.data.result.size,
              key: responseFile.data.result.key,
              bucket: responseFile.data.result.bucket,
              products_delivery_id: imageUrl.products_delivery_id
            };
            const response = await api.put(`/task/upload-tenant-approve`, uploadInfos);

            if (response.data.status === 'success') {
              addToast({
                title: 'Sucesso',
                description: 'Arquivo enviado, aguarde a aprovação do cliente.',
                type: 'success'
              });
              setModalTenantApprove(false);
              setToClientConfirmation(false);
              getTaskInfos();
              // setTimeout(() => {
              //   navigate('/minhas-tarefas');
              // }, 1500);
            }
          }
        })
      );

      setLoading(false);
    } catch (error: any) {
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

  async function handleUploadApproved() {
    try {
      setLoading(true);

      const approvedFiles = dataTask?.files.filter((file: any) => file.status === 'pass');

      if (approvedFiles.length < 1) {
        setModalFinalFile(true);
      }

      await Promise.all(
        approvedFiles.map(async (imageUrl: TaskFile) => {
          const fileData = new FormData();

          const response = await api.get(
            `https://app.21live.com.br:3000/archive?bucket=${imageUrl.bucket}&key=${imageUrl.key}`,
            { responseType: 'arraybuffer' }
          );

          const blob = new Blob([response.data]);
          const newFile: any = new File([blob], imageUrl.file_name, { type: blob.type });

          fileData.append('archive', newFile);
          fileData.append('original_name', imageUrl.original_name);
          // fileData.append('task_file_id', imageUrl.task_file_id);

          const responseFile = await api.post(
            `/archive/upload/final/${dataTask?.task_id}`,
            fileData
          );

          if (responseFile.data.status === 'success') {
            const uploadInfos = {
              task_id: dataTask?.task_id,
              file_name: responseFile.data.result.file_name,
              original_name: imageUrl.original_name,
              size: responseFile.data.result.size,
              key: responseFile.data.result.key,
              bucket: responseFile.data.result.bucket,
              last_archive: 'true',
              products_delivery_id: imageUrl.products_delivery_id
            };
            const response = await api.put(`/task/upload`, uploadInfos);

            if (response.data.status === 'success') {
              handleConcludeTask();
            }
          }
        })
      );

      // console.log('log approvedFiles =>', approvedFiles);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const handleShowFiles = (product: ProductProps) => {
    console.log('log do product selected =>', product);
    if (product.task_file_id !== '') {
      setModalPreviewImage(true);
    }
  };

  useEffect(() => {
    // console.log('log do type of play', typeOfPlay);
    console.log('log do files', files);
    console.log('log ticket', hasTicketInteraction);
  }, [typeOfPlay, files, hasTicketInteraction]);

  return (
    <ContainerDefault>
      {loading && <Loader />}

      {!loading && (
        <DeliveryWrapper>
          {/* {uploadClient && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={true}
              goBack
              buttonType="client"
              nextStepInfo={timeLineData}
              hideButtonNext={true}
              sendToNext={() => setModalFinalFile(true)}
              backFlow={() => ''}
            />
          )} */}

          {dataTask?.status === 'Concluida' && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={true}
              goBack
              hideButtonNext={true}
              buttonType="send"
              nextStepInfo={timeLineData}
              backFlow={() => setModalReturnFlow(true)}
            />
          )}

          {/* {dataTask?.status !== 'Concluida' && !viewProduct && typeOfPlay === 'schedule' && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={false}
              goBack
              buttonType={
                // uploadClient && dataTask?.files.length < 1 && dataTask?.status !== 'Avaliada'
                //   ? 'client'
                //   : 'send'
                uploadClient ? 'client' : 'send'
              }
              sendToNext={() => checkFlow('next')}
              nextStepInfo={timeLineData}
              backFlow={() => setModalReturnFlow(true)}
            />
          )} */}

          {dataTask?.status !== 'Concluida' &&
            !viewProduct &&
            typeOfPlay === 'schedule' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType={uploadClient && !hasProductsBeenEvaluated ? 'client' : 'send'}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct === '' &&
            typeOfPlay === 'schedule' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType="finish"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct !== '' &&
            typeOfPlay === 'schedule' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType="finish"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            viewProduct &&
            typeOfPlay === 'schedule' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType={uploadClient && !hasProductsBeenEvaluated ? 'client' : 'send'}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct === '' &&
            typeOfPlay === 'product' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType="finish"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct !== '' &&
            typeOfPlay === 'product' &&
            selectedProduct.status !== 'Concluida' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={typeOfPlay === 'product' ? false : true}
                goBack
                buttonType="finish"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backToDelivery={() => setViewProduct(false)}
                isInsideProduct={true}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct !== '' &&
            typeOfPlay === 'product' &&
            selectedProduct.status === 'Concluida' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={true}
                goBack
                buttonType="finish"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backToDelivery={() => setViewProduct(false)}
                isInsideProduct={true}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct !== '' &&
            typeOfPlay === 'product' &&
            selectedProduct.status !== 'Concluida' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={true}
                goBack
                buttonType="finish"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backToDelivery={() => setViewProduct(false)}
                isInsideProduct={true}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct === '' &&
            typeOfPlay === 'product' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType="finish"
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataTask?.status !== 'Concluida' &&
            selectedProduct !== '' &&
            typeOfPlay === 'product' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType="finish"
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backToDelivery={() => {
                  setViewProduct(false);
                  setSelectedProduct('');
                }}
                isInsideProduct={true}
                backFlow={() => setModalReturnFlow(true)}
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
                  {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                </div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Tempo consumido:</div>
                <div className="info-description">{dataTask?.time_consumed}</div>
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

              <TaskInfoField>
                <div className="info-title">Data inicial:</div>
                <div className="info-description">
                  {moment(dataTask?.copywriting_date_end).format('DD/MM/YYYY')}
                </div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Data final:</div>
                <div className="info-description">
                  {moment(dataTask?.creation_date_end).format('DD/MM/YYYY')}
                </div>
              </TaskInfoField>
            </TasksInfos>
            <ArrowSection onClick={() => setHideRightCard('hide')}>
              <MdClose />
            </ArrowSection>
          </RightInfosCard>

          <ShowInfosButton onClick={() => setHideRightCard('show')}>
            <FaArrowLeft />
          </ShowInfosButton>

          <CardsWrapper>
            {dataTask?.status === 'Concluida' && (
              <CardWrapper>
                <CardTitle>Atividade concluída</CardTitle>
                <StopWatchTimer className="stopped">{dataTask?.time_consumed}</StopWatchTimer>
                <EstimatedTime>
                  Tempo estimado:{' '}
                  <span>
                    {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                  </span>
                </EstimatedTime>
              </CardWrapper>
            )}

            {dataTask?.status !== 'Concluida' && !showClock && (
              <CardWrapper>
                <CardTitle>Tempo utilizado</CardTitle>
                <StopWatchTimer className="stopped">{dataTask?.time_consumed}</StopWatchTimer>
                <EstimatedTime>
                  Tempo estimado:{' '}
                  <span>
                    {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                  </span>
                </EstimatedTime>
              </CardWrapper>
            )}

            {dataTask?.status !== 'Concluida' && showClock && (
              <CardTaskPlay
                cardTitle={state.isRunning ? 'Atividade iniciada' : 'Iniciar atividade'}
                dataTime={data ? data?.estimatedTime : '00:00:00'}
                blockPlay={typeOfPlay === 'product' && !viewProduct ? true : false}
                handlePlay={handlePlayingType}
              />
            )}

            <CardTaskInfo
              cardTitle="Contexto geral"
              cardType="text"
              dataText={dataTask?.description}
            />
          </CardsWrapper>

          {!viewProduct && (
            <ProductTable
              data={dataProducts}
              timeData={timeData}
              workForProduct={handleSwitchPlayType}
              isPlayingForSchedule={playingForSchedule}
              productSelected={(value: any) => handleNavigateProduct('view', value)}
              isFinished={dataTask?.status === 'Concluida' ? true : false}
              typeOfWorkFinished={dataTask?.type_play}
              typeOfPlay={typeOfPlay}
              uploadProduct={handleUploadForProduct}
              viewFile={handleShowFiles}
              uploadEnabled={enableUpload}
            />
          )}

          {viewProduct && (
            <WorkingProduct
              productDeliveryId={selectedProduct?.productInfo?.products_delivery_id}
              productInfos={selectedProduct.productInfo}
              taskInputs={InputsTask}
              taskId={dataTask?.task_id}
              ticket_id={dataTask?.ticket_id}
              taskFiles={dataTask?.files}
              taskTenant={dataTask?.tenant_id}
              uploadEnabled={enableUpload}
              stepToReturn={uploadIsTrue !== '' ? uploadIsTrue[0]?.previous_step : ''}
              sendToApprove={nextStep && nextStep[0]?.manager_approve === 'true' ? true : false}
              timelineData={timeLineData}
              toApprove={handleSendToManager}
              backButtonTitle="Voltar para produtos"
              goBack={() => setViewProduct(false)}
              returnReasons={dataTask?.reason_return}
              updateInfos={getTaskInfos}
              allProducts={dataProducts.products}
            />
          )}
        </DeliveryWrapper>
      )}

      {/* Modal Schedule user */}
      <ModalDefault
        isOpen={modalSendToUser}
        title="Lista de pessoas"
        onOpenChange={() => setModalSendToUser(false)}
      >
        <ScheduleUser
          task_title={dataTask?.title}
          taskId={dataTask?.task_id}
          estimated_time={allTimes}
          flow={dataTask?.flow_id}
          project_product_id={dataTask?.project_product_id}
          step={showHoursBack ? returnInfos.chosenStep : Number(dataTask?.step) + 1}
          user_alocated={handleAssignTask}
          closeModal={() => setModalSendToUser(false)}
          manualOverrideDate={showHoursBack}
        />
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
        title="Escolha o usuário que receberá a tarefa"
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
            {!showHoursBack && (
              <ButtonDefault
                typeButton="primary"
                onClick={() => {
                  handleSetUserWithoutSchedule();
                  setModalWithoutSchedule(false);
                }}
              >
                Escolher
              </ButtonDefault>
            )}

            {showHoursBack && (
              <ButtonDefault
                typeButton="primary"
                onClick={() => {
                  handleReturnTask({
                    user_id: selectedInitialUser?.user_id,
                    start_job: actualDate,
                    end_job: ''
                  });
                  setModalWithoutSchedule(false);
                }}
              >
                Escolher
              </ButtonDefault>
            )}
          </ModalButtons>
        </UsersWrapper>
      </ModalDefault>

      {/* Modal upload files */}
      <ModalDefault
        isOpen={modalUpload}
        onOpenChange={() => {
          setModalUpload(false);
          setUploadedFiles([]);
        }}
        title="Upload de arquivo"
      >
        <ModalUploadWrapper>
          <UploadFiles
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            tenant={dataTask?.tenant_id}
            isDisabed={!dataTask?.tenant_id}
            loading={loading}
            setLoading={setLoading}
            folderInfo="tasks"
          />

          <div className="modal-buttons">
            <ButtonDefault
              typeButton="lightWhite"
              isOutline
              onClick={() => {
                setModalUpload(false);
                setUploadedFiles([]);
              }}
            >
              Cancelar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" onClick={handleSaveUpload}>
              Salvar
            </ButtonDefault>
          </div>
        </ModalUploadWrapper>
      </ModalDefault>

      {/* Modal to upload last file or tenant approve */}
      <ModalDefault
        isOpen={modalFinalFile}
        onOpenChange={() => setModalFinalFile(false)}
        title={
          finalCard
            ? 'Upload de arquivo final para o 21Clients'
            : 'Upload de arquivo para aprovação do cliente no 21Clients'
        }
      >
        <ModalUploadWrapper>
          {finalCard && !toClientConfirmation && (
            <UploadFinalFile
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={dataTask?.tenant_id}
              isDisabed={!dataTask?.tenant_id}
              loading={loading}
              setLoading={setLoading}
              folderInfo="tasks"
              taskId={dataTask?.task_id}
            />
          )}

          {finalCard && !toClientConfirmation && (
            <div className="modal-buttons">
              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => setModalFinalFile(false)}
              >
                Cancelar
              </ButtonDefault>

              <ButtonDefault typeButton="primary" onClick={() => setToClientConfirmation(true)}>
                Enviar para o cliente
              </ButtonDefault>
            </div>
          )}

          {finalCard && toClientConfirmation && (
            <div className="confirmation">
              <span>Atenção:</span> <br />
              Os arquivos serão enviados para a área do cliente. <br />
              Essa ação não pode ser revertida.
            </div>
          )}

          {finalCard && toClientConfirmation && (
            <div className="modal-buttons">
              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => {
                  setModalFinalFile(false);
                  setToClientConfirmation(false);
                  setUploadedFiles([]);
                }}
              >
                Cancelar
              </ButtonDefault>

              <ButtonDefault typeButton="primary" onClick={handleSaveUploadFinal}>
                OK
              </ButtonDefault>
            </div>
          )}

          {uploadClient && dataTask?.ticket_id && !toClientConfirmation && (
            <UploadFilesTicket
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              ticket_id={dataTask?.ticket_id}
              isDisabled={false}
              loading={loading}
              setLoading={setLoading}
              folderInfo="tasks"
            />
          )}

          {uploadClient && !toClientConfirmation && (
            <div className="modal-buttons">
              <ButtonDefault
                typeButton="dark"
                isOutline
                onClick={() => {
                  setModalFinalFile(false);
                  setUploadedFiles([]);
                }}
              >
                Descartar
              </ButtonDefault>

              <ButtonDefault typeButton="primary" onClick={() => setToClientConfirmation(true)}>
                Enviar para o cliente
              </ButtonDefault>
            </div>
          )}

          {uploadClient && toClientConfirmation && (
            <div className="confirmation">
              <span>Atenção:</span> <br />
              Os arquivos serão enviados para a área do cliente. <br />
              Essa ação não pode ser revertida.
            </div>
          )}

          {uploadClient && toClientConfirmation && (
            <div className="modal-buttons">
              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => {
                  setModalFinalFile(false);
                  setToClientConfirmation(false);
                  setUploadedFiles([]);
                }}
              >
                Cancelar
              </ButtonDefault>

              <ButtonDefault typeButton="primary" onClick={handleSaveUploadClient}>
                Confirmar
              </ButtonDefault>
            </div>
          )}
        </ModalUploadWrapper>
      </ModalDefault>

      {/* Modal return flow */}
      <ModalDefault
        isOpen={modalReturnFlow}
        onOpenChange={handleCancelReturn}
        title="Para qual etapa deseja retornar?"
      >
        <ModalReturnFlow>
          <SelectDefault
            label="Escolha a etapa"
            name="chosenStep"
            onChange={handleChooseStepAndMotive}
            value={returnInfos.chosenStep}
          >
            {stepsToReturn?.map((row: StepTimeline) => (
              <option key={row.card_id} value={row.step}>
                {row.name}
              </option>
            ))}
          </SelectDefault>

          <TextAreaDefault
            label="Descreva o motivo para retornar"
            placeholder="Digite o motivo..."
            name="returnMotive"
            onChange={handleChooseStepAndMotive}
            value={returnInfos.returnMotive}
            required
          />

          <div className="modal-buttons">
            <ButtonDefault typeButton="dark" isOutline onClick={handleCancelReturn}>
              Descartar
            </ButtonDefault>
            <ButtonDefault
              typeButton={
                returnInfos.chosenStep === '' || returnInfos.returnMotive === ''
                  ? 'blocked'
                  : 'primary'
              }
              onClick={handleBackFlow}
              disabled={returnInfos.chosenStep === '' || returnInfos.returnMotive === ''}
            >
              Retornar
            </ButtonDefault>
          </div>
        </ModalReturnFlow>
      </ModalDefault>

      {/* Modal select product to conclude */}
      <ModalDefault
        isOpen={modalProducts}
        title="Qual produto deseja finalizar?"
        onOpenChange={() => setModalProducts(false)}
      >
        <ModalProductsWrapper>
          <SelectProductField>
            <SelectDefault
              label="Produtos dessa entrega"
              placeholder="Selecione..."
              name="product"
              onChange={(value) => handleNavigateProduct('select', value)}
              value={selectedProduct.products_delivery_id}
              required
            >
              {dataProducts?.products.map((row: any, index: number) => (
                <option key={row.products_delivery_id} value={JSON.stringify(row)}>
                  ID: {String(index + 1).padStart(2, '0')} - Nome: {row.service} - Descrição:
                  {row.description}
                </option>
              ))}
            </SelectDefault>
          </SelectProductField>

          <ModalButtons>
            <ButtonDefault
              typeButton="dark"
              isOutline
              onClick={() => {
                setSelectedProduct('');
                setModalProducts(false);
              }}
            >
              Descartar
            </ButtonDefault>

            <ButtonDefault typeButton="primary" onClick={handleSelectProduct}>
              Escolher
            </ButtonDefault>
          </ModalButtons>
        </ModalProductsWrapper>
      </ModalDefault>

      {/* Modal inform dismemberment */}
      <ModalDefault
        isOpen={modalDismemberment}
        title="Desmembramento"
        onOpenChange={() => setModalDismemberment(false)}
      >
        <ModalProductsWrapper>
          <TextInfo>
            <span>Atenção!</span>
            <span>Existem produtos reprovados.</span>
            <span>Para continuar, a entrega será dividida!</span>
          </TextInfo>

          <ModalButtons>
            <ButtonDefault typeButton="warning" onClick={handleDismemberment}>
              OK
            </ButtonDefault>
          </ModalButtons>
        </ModalProductsWrapper>
      </ModalDefault>

      {/* Modal inform dismemberment with all rejected */}
      <ModalDefault
        isOpen={modalReturnAllRejected}
        onOpenChange={handleCancelReturnReject}
        title="Necessário retornar etapa"
      >
        <ModalReturnFlow>
          <TextInfo>
            <span>Atenção!</span>
            <span>
              Todos os produtos foram recusados, é necessário retornar a etapa para correção.
            </span>
          </TextInfo>

          <SelectDefault
            label="Escolha a etapa"
            name="chosenStep"
            onChange={handleChooseStepAndMotive}
            value={returnInfos.chosenStep}
          >
            {stepsToReturn?.map((row: StepTimeline) => (
              <option key={row.card_id} value={row.step}>
                {row.name}
              </option>
            ))}
          </SelectDefault>

          <ProductsAndMotivesWrapper>
            <div className="list-title">Lista com produtos recusados e motivos</div>
            {dataProducts?.products.map((row: any) => (
              <ProductAndMotiveLi key={row.products_delivery_id}>
                <ProductAndMotiveInfos>
                  <div className="product id">
                    <span>ID:</span> #{String(row.products_delivery_id).padStart(3, '0')}
                  </div>
                  <div className="product name">
                    {' '}
                    <span>Produto:</span> {row.service}
                  </div>
                  <div className="product motive">
                    <span>Motivo:</span>
                    <div className="info" dangerouslySetInnerHTML={{ __html: row.fail_reason }} />
                  </div>
                </ProductAndMotiveInfos>
              </ProductAndMotiveLi>
            ))}
          </ProductsAndMotivesWrapper>

          <TextAreaDefault
            label="Descreva o motivo para retornar"
            placeholder="Digite o motivo..."
            name="returnMotive"
            onChange={handleChooseStepAndMotive}
            value={returnInfos.returnMotive}
            required
          />

          <div className="modal-buttons">
            <ButtonDefault typeButton="dark" isOutline onClick={handleCancelReturnReject}>
              Descartar
            </ButtonDefault>
            <ButtonDefault
              typeButton={
                returnInfos.chosenStep === '' || returnInfos.returnMotive === ''
                  ? 'blocked'
                  : 'primary'
              }
              onClick={handleBackFlow}
              disabled={returnInfos.chosenStep === '' || returnInfos.returnMotive === ''}
            >
              Retornar
            </ButtonDefault>
          </div>
        </ModalReturnFlow>
      </ModalDefault>

      {/* Modal Tenant approve */}
      <ModalDefault
        isOpen={modalTenantApprove}
        onOpenChange={() => setModalTenantApprove(false)}
        title="Aprovação do cliente"
      >
        <FileProductsWrapper>
          {!toClientConfirmation && (
            <div className="title-list">Selecione os arquivos para o cliente aprovar.</div>
          )}

          <FileProductList>
            {!toClientConfirmation && (
              <div style={{ width: '1000px' }}>
                <Table>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th>File ID</th>
                        <th>Produto ID</th>
                        <th>Nome do produto</th>
                        <th>Nome do arquivo</th>
                        <th>Data</th>
                        <th>Detalhes</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dataTask?.files.map((row: TaskFile, index: number) => (
                        <tr key={row.task_file_id}>
                          <td>
                            <CheckboxDefault
                              label=""
                              id="subtasks"
                              checked={
                                filesToTenantApprove.find(
                                  (obj) => obj.task_file_id === row.task_file_id
                                )
                                  ? true
                                  : false
                              }
                              onChange={() => handleSelectFile(row)}
                            />
                          </td>
                          <td>#{row.task_file_id}</td>
                          <td>{row.products_delivery_id}</td>
                          <td>{productsNames[index]}</td>
                          <td>
                            {row.original_name !== ''
                              ? row.original_name
                              : row.file_name.split('-').pop()}
                          </td>
                          <td>{moment(row.created).format('DD/MM/YYYY - HH:mm')}h</td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <ButtonIcon
                                className="view"
                                onClick={() =>
                                  setPreviewImage({
                                    isOpen: true,
                                    imageInfos: {
                                      bucket: row.bucket,
                                      created: row.created,
                                      file_name: row.file_name,
                                      key: row.key,
                                      task_file_id: row.task_file_id,
                                      task_id: row.task_id,
                                      size: row.size,
                                      updated: row.updated,
                                      url: row.url
                                    }
                                  })
                                }
                              >
                                <BiShow size={20} />
                              </ButtonIcon>

                              <ButtonIcon className="download" onClick={() => downloadFile(row)}>
                                <FaDownload />
                              </ButtonIcon>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Table>
                {previewImage.isOpen &&
                  previewImage.imageInfos.file_name.split('.').pop() !== 'pdf' && (
                    <FilePreview
                      style={{
                        backgroundImage: `url(https://${previewImage.imageInfos.bucket}.s3.amazonaws.com/${previewImage.imageInfos.key})`
                      }}
                    >
                      <div
                        className="close-button"
                        onClick={() =>
                          setPreviewImage({
                            isOpen: false,
                            imageInfos: {
                              bucket: '',
                              created: '',
                              file_name: '',
                              key: '',
                              task_file_id: '',
                              task_id: '',
                              size: '',
                              updated: '',
                              url: ''
                            }
                          })
                        }
                      >
                        <MdClose />
                      </div>
                    </FilePreview>
                  )}
              </div>
            )}

            {toClientConfirmation && (
              <div className="confirmation">
                <span>Atenção:</span> <br />
                Os arquivos serão enviados para a área do cliente. <br />
                Essa ação não pode ser revertida.
              </div>
            )}
          </FileProductList>

          {!toClientConfirmation && (
            <ModalButtons>
              <ButtonDefault typeButton="dark" isOutline onClick={handleCancelSendToTenant}>
                Descartar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={() => setToClientConfirmation(true)}>
                Salvar
              </ButtonDefault>
            </ModalButtons>
          )}

          {toClientConfirmation && (
            <ModalButtons>
              <ButtonDefault typeButton="dark" isOutline onClick={handleCancelSendToTenant}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={handleUploadTenant}>
                Enviar
              </ButtonDefault>
            </ModalButtons>
          )}
        </FileProductsWrapper>
      </ModalDefault>

      {/* Modal preview file */}
      <ModalDefault
        isOpen={modalPreviewImage}
        onOpenChange={() => setModalPreviewImage(false)}
        title="Preview dos arquivos"
      >
        <ModalProductWrapper>
          <div>Preview de image</div>
        </ModalProductWrapper>
      </ModalDefault>
    </ContainerDefault>
  );
}
