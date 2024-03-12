/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaDownload } from 'react-icons/fa';
import { IconBigCheck } from '../../../assets/icons';
import { BiCalendar, BiShow, BiX } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';

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
  EstimatedTime,
  ModalButtons,
  StopWatchTimer
} from '../../Tasks/ViewTask/styles';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { TextAreaDefault } from '../../../components/Inputs/TextAreaDefault';
import UploadFiles from '../../../components/Upload/UploadFiles';
import UploadFinalFile from '../../../components/UploadFinal/UploadFinalFiles';
import { Table } from '../../../components/Table';
import ModalLoader from '../../../components/Ui/ModalLoader';
import { InputDefault } from '../../../components/Inputs/InputDefault';

// Styles
import {
  ArrowSection,
  CardTimeInfo,
  CardsWrapper,
  CloseButton,
  DataInfos,
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
  TimeAndDates,
  TimeLine,
  TimeLineIcon,
  TimeWrapper,
  TimelineExtraInfo,
  TimelineInfo,
  TimelineStep,
  TotalTaskHours,
  UserInfo
} from './styles';
import { ButtonIcon } from '../WorkingProduct/styles';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import Switch from 'react-switch';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useStopWatch } from '../../../hooks/stopWatch';
import { useAuth } from '../../../hooks/AuthContext';

// Types
import {
  ClockProps,
  ClockUpdateProps,
  StepTimeline,
  TaskFile,
  TaskHistoric,
  TaskHistoryProps,
  UploadedFilesProps
} from '../../../types';

// Utils
import { UsersNoSchedule } from '../../../utils/models';

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface ReturnProps {
  chosenStep: string;
  returnMotive: string;
  returnType: string;
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

interface UpdateDateProps {
  isOn: boolean;
  date_end: string;
}

interface UpdateHoursProps {
  step_name: string;
  user_name: string;
  user_function: string;
  description: string;
  date_start: string;
  date_end: string;
  alocated_time: string;
  active: boolean;
}

export default function ViewProductsDeliveries() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const { stop } = useStopWatch();
  const { id } = useParams();
  const dateRef = useRef<any>();
  const { state, setInitialTime, setTaskInfo, handleClock } = useStopWatch();
  const openRightRef = useRef<any>();
  const [modalSendToUser, setModalSendToUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    returnMotive: '',
    returnType: ''
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
  const [modalPreviewImage, setModalPreviewImage] = useState<any>({
    isOpen: false,
    productId: ''
  });
  const [modalSelectFinalFiles, setModalSelectFinalfiles] = useState<boolean>(false);
  const [updateDateTask, setUpdateDateTask] = useState<UpdateDateProps>({
    isOn: false,
    date_end: ''
  });
  const [modalUpdateHours, setModalUpdateHours] = useState<boolean>(false);
  const [clockData, setClockData] = useState<ClockUpdateProps[]>();
  // const [clockUpdateData, setClockUpdateData] = useState<ClockUpdateProps[]>();

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

  const oneFile = dataTask?.files.find(
    (file: any) => file.products_delivery_id === modalPreviewImage.productId
  );

  let userInfos = {
    next_user: '',
    start_job: '',
    end_job: ''
  };

  const deliveryId = dataTask?.deliverys.filter((obj: any) => Number(obj.order) === 1);

  const userProps = {
    name: dataTask?.actual_user_name,
    avatar: dataTask?.actual_user_avatar
  };

  const titleInfos = {
    idNumber: dataTask?.task_id,
    numberTask: location?.state?.task_index ? location.state.task_index : 1,
    titleTask: dataTask?.title,
    client_task: dataTask?.tenant,
    typeTask: dataTask?.project_category,
    contract_task: dataTask?.project,
    creator_user: dataTask?.creator?.name,
    creator_time: dataTask?.created
  };

  const onlyOneProductInfo = {
    title: dataProducts?.products[0]?.service,
    description: dataProducts?.products[0]?.description,
    id: dataProducts?.products[0]?.products_delivery_id,
    size: dataProducts?.products[0]?.size,
    type: dataProducts?.products[0]?.type,
    reason_change:
      dataProducts?.products[0]?.reason_change === '1'
        ? 'Criação'
        : dataProducts?.products[0]?.reason_change === '2'
        ? 'Desmembramento'
        : 'Alteração'
  };

  const selectedProductInfo = {
    title: selectedProduct?.productInfo?.service,
    description: selectedProduct?.productInfo?.description,
    id: selectedProduct?.productInfo?.products_delivery_id,
    size: selectedProduct?.productInfo?.size,
    type: selectedProduct?.productInfo?.type,
    reason_change:
      selectedProduct?.productInfo?.reason_change === '1'
        ? 'Criação'
        : selectedProduct?.productInfo?.reason_change === '2'
        ? 'Desmembramento'
        : 'Alteração'
  };

  const allTimes = {
    time_essay: dataProducts?.time_essay,
    time_creation: dataProducts?.time_creation,
    total_time: dataTask?.total_time
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

  const stepsWithTenantApprove: any[] | undefined = timeLineData?.steps.filter(
    (obj) => obj.tenant_approve === 'true'
  );

  // const myTaskShowHours = nextStep[0]?.show_hours;
  const taskDeductHours = nextStep[0]?.deduct_hours;

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

  let conditionExtra = true;

  hasAllBeenRejected.map((obj: any) => {
    files.map((prod: any) => {
      if (prod.status === '' && prod.created > obj.created) {
        conditionExtra = false;
      }
    });
  });

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

        // if (typeOfPlay === 'schedule') {
        //   const response = await api.get(
        //     `/clock/consumed?delivery_id=${deliveryId[0]?.delivery_id}`
        //   );
        //   if (response.data.result.play === true) {
        //     setPlayingForSchedule(true);
        //     setInitialTime({
        //       isRunning: true,
        //       elapsedTime: response.data.result.diff / 1000
        //     });
        //     setTaskInfo({
        //       idNumber: dataTask?.task_id,
        //       numberTask: location.state?.task_index,
        //       titleTask: dataTask?.title,
        //       monthTask: '',
        //       client_task: dataTask?.tenant,
        //       typeTask: dataTask?.project_category,
        //       quantityTask: '',
        //       contract_task: dataTask?.product_period
        //     });
        //   } else {
        //     setInitialTime({
        //       isRunning: false,
        //       elapsedTime: response.data.result.diff / 1000
        //     });
        //     setTaskInfo({
        //       idNumber: dataTask?.task_id,
        //       numberTask: location.state?.task_index,
        //       titleTask: dataTask?.title,
        //       monthTask: '',
        //       client_task: dataTask?.tenant,
        //       typeTask: dataTask?.project_category,
        //       quantityTask: '',
        //       contract_task: dataTask?.product_period
        //     });
        //   }
        // }

        // if (typeOfPlay === 'product' && selectedProduct === '') {
        //   setInitialTime({
        //     isRunning: false,
        //     elapsedTime: 0
        //   });
        //   setTaskInfo({
        //     idNumber: dataTask?.task_id,
        //     numberTask: location.state?.task_index,
        //     titleTask: dataTask?.title,
        //     monthTask: '',
        //     client_task: dataTask?.tenant,
        //     typeTask: dataTask?.project_category,
        //     quantityTask: '',
        //     contract_task: dataTask?.product_period
        //   });
        // }

        // if (typeOfPlay === 'product' && selectedProduct !== '') {
        //   const response = await api.get(
        //     `/clock/consumed?products_delivery_id=${selectedProduct?.productInfo?.products_delivery_id}`
        //   );
        //   if (response.data.result.play === true) {
        //     setPlayingForSchedule(true);
        //     setInitialTime({
        //       isRunning: true,
        //       elapsedTime: response.data.result.diff / 1000
        //     });
        //     setTaskInfo({
        //       idNumber: dataTask?.task_id,
        //       numberTask: location.state?.task_index,
        //       titleTask: dataTask?.title,
        //       monthTask: '',
        //       client_task: dataTask?.tenant,
        //       typeTask: dataTask?.project_category,
        //       quantityTask: '',
        //       contract_task: dataTask?.product_period
        //     });
        //   } else {
        //     setInitialTime({
        //       isRunning: false,
        //       elapsedTime: response.data.result.diff / 1000
        //     });
        //     setTaskInfo({
        //       idNumber: dataTask?.task_id,
        //       numberTask: location.state?.task_index,
        //       titleTask: dataTask?.title,
        //       monthTask: '',
        //       client_task: dataTask?.tenant,
        //       typeTask: dataTask?.project_category,
        //       quantityTask: '',
        //       contract_task: dataTask?.product_period
        //     });
        //   }
        // }

        const response = await api.get(
          `/clock/consumed?products_delivery_id=${selectedProduct?.productInfo?.products_delivery_id}`
        );
        if (response.data.result.play === true) {
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
        setUpdateDateTask({
          isOn: false,
          date_end: response.data.result[0].creation_date_end
        });
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

  useEffect(() => {
    getTaskInfos();
    getTimelineData();
    getTaskHistory();
  }, []);

  useEffect(() => {
    // setDataTask(location.state.task);
    // console.log('log do params =>', id);

    // if (dataTask?.type_play === 'delivery') {
    //   setTypeOfPlay('schedule');
    // }

    if (dataTask?.type_play === 'product') {
      setTypeOfPlay('product');
    }

    const timeDataInfo = {
      totalTime: dataTask?.total_time,
      timeConsumed: dataTask?.time_consumed
    };
    setTimeData(timeDataInfo);
    setDataProducts(dataTask?.deliverys[0]);

    if (dataTask?.deliverys[0].products.length === 1) {
      setViewProduct(true);
      const taskCompleteInfo = {
        productInfo: dataTask?.deliverys[0].products[0],
        taskInfos: dataTask
      };
      setSelectedProduct(taskCompleteInfo);
    }
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
    // if (typeOfPlay === 'schedule') {
    //   setPlayingForSchedule(true);
    //   handleSwitchPlayType(false);
    //   handleStartPlayingTime('schedule');
    // }

    if (typeOfPlay === 'product' && selectedProduct !== '') {
      // setPlayingForSchedule(false);
      // handleSwitchPlayType(true);
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
    // if (value === 'schedule') {
    //   const taskClock = {
    //     task_id: dataTask?.task_id,
    //     delivery_id: deliveryId[0].delivery_id
    //   };

    //   handleClock(taskClock);

    //   try {
    //     setLoading(true);
    //     const responseClock = await api.post(`/clock`, taskClock);
    //     // console.log('log do responseClock', responseClock);
    //     setLoading(false);
    //   } catch (error: any) {
    //     console.log('log do error play', error);

    //     if (error.response.data.result.length !== 0) {
    //       error.response.data.result.map((row: any) => {
    //         addToast({
    //           title: 'Atenção',
    //           description: row.error,
    //           type: 'warning'
    //         });
    //       });
    //     } else {
    //       addToast({
    //         title: 'Atenção',
    //         description: error.response.data.message,
    //         type: 'danger'
    //       });
    //     }
    //     setLoading(false);
    //   }
    // }

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
    }
    // else {
    //   const playType = {
    //     task_id: dataTask?.task_id,
    //     type_play: 'delivery'
    //   };
    //   try {
    //     const response = await api.post(`/task/switch-play`, playType);
    //     // console.log('log do response task/switch-play', response.data.result);
    //     if (response.data.result === 1) {
    //       setTypeOfPlay('schedule');
    //     }
    //   } catch (error: any) {
    //     addToast({
    //       title: 'Atenção',
    //       description: 'Tarefa iniciada, não alterar o tipo do play',
    //       type: 'warning'
    //     });
    //   }
    // }
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

      if (dataTask?.status !== 'Concluida' && selectedProduct !== '' && typeOfPlay === 'product') {
        // if (selectedProduct.status !== 'Concluida') {
        //   const response = await api.put(
        //     `/task/product-conclude/${selectedProduct?.productInfo.products_delivery_id}`
        //   );

        //   if (response.data.result === 1) {
        //     addToast({
        //       title: 'Sucesso',
        //       type: 'success',
        //       description: 'Entrega finalizada com sucesso'
        //     });
        //     stop();
        //     navigate('/minhas-tarefas');
        //     localStorage.removeItem('stopwatchState');
        //   }
        // } else {
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
          stop();
          localStorage.removeItem('stopwatchState');
        }
        // }
      }

      if (dataTask?.status !== 'Concluida' && selectedProduct === '' && typeOfPlay === 'product') {
        // addToast({
        //   title: 'Aviso',
        //   description: 'Conclua todos os produtos para conseguir avançar.',
        //   type: 'warning'
        // });

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

  const handleUploadForProduct = (value: any) => {
    setProductForUpload(value);
    if (!finalCard && !uploadClient) {
      setModalUpload(true);
    }
    if (finalCard && enableUpload) {
      setModalFinalFile(true);
    }
    if (uploadClient && dataTask?.files.length > 0) {
      setModalTenantApprove(true);
    }
    if (uploadClient && dataTask?.files.length <= 0) {
      setModalFinalFile(true);
    }
  };

  async function handleSaveUpload() {
    try {
      setLoading(true);

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

      setLoading(false);

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
      setLoading(false);
    }
  }

  async function handleSaveUploadFinal() {
    try {
      setLoading(true);

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

      setLoading(false);

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

      setLoading(false);
    }
  }

  async function handleSaveUploadClient() {
    try {
      setLoading(true);

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

      setLoading(false);

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

      setLoading(false);
    }
  }

  // Check to go back or next step
  async function checkFlow(checkType: string) {
    try {
      setLoading(true);

      if (checkMandatoryUpload() && mandatoryUpload) {
        addToast({
          title: 'Aviso',
          description: 'Upload obrigatório antes de avançar!',
          type: 'warning'
        });
        console.log('log do checkFlow 1 - Upload obrigatório');
      } else if (
        hasAllBeenRejected.length >= dataProducts?.products.length &&
        hasAllBeenAccepted.length < dataProducts?.products.length &&
        checkType === 'next' &&
        dataTask?.status !== 'Aguardando Aprovação' &&
        dataTask.status !== 'Alteração Externa' &&
        conditionExtra &&
        uploadClient
      ) {
        setModalReturnAllRejected(true);

        console.log('log do checkFlow 2 - Dismember all');
      } else if (
        hasToDismemberTask &&
        !mandatoryUpload &&
        checkType === 'next' &&
        dataTask.status !== 'Alteração Externa' &&
        dataTask.status !== 'Alteração Interna' &&
        dataTask?.status !== 'Aguardando Aprovação' &&
        dataProducts?.products.length > 1 &&
        conditionExtra &&
        !hasDismemberedProduct
      ) {
        setModalDismemberment(true);
        console.log('log do checkFlow 3 - Dismember');
      } else if (
        uploadClient &&
        checkType === 'next' &&
        dataTask?.files.length > 0 &&
        dataTask?.status !== 'Aguardando Aprovação' &&
        dataTask?.status !== 'Avaliada' &&
        !hasProductsBeenEvaluated
      ) {
        setModalTenantApprove(true);
        console.log('log do checkFlow 4 - Tenant approve');
      } else if (checkType === 'next' && !finalCard) {
        console.log('log do checkFlow 5 - Flow function');
        const response = await api.get(
          `/flow-function?step=${Number(actualStep) + 1}&flow_id=${dataTask?.flow_id}`
        );

        if (response.data.result[0].show_hours === 'true') {
          // if (
          //   dataTask?.status !== 'Concluida' &&
          //   selectedProduct === '' &&
          //   typeOfPlay === 'product'
          // ) {
          //   addToast({
          //     title: 'Aviso',
          //     description: 'Conclua todos os produtos para conseguir avançar.',
          //     type: 'warning'
          //   });
          // } else {
          //   setModalSendToUser(true);
          // }
          setModalSendToUser(true);
        }
        if (response.data.result[0].show_hours === 'false') {
          handleNextUser('next');
        }
      } else if (checkType === 'next' && finalCard) {
        if (dataTask.ticket_id !== '' && dataTask?.ticket_id !== '0' && mandatoryUpload) {
          console.log('checkFlow 6 - Final card + mandatory upload');
          setModalFinalFile(true);
        }

        if (
          dataTask?.ticket_id !== '' &&
          dataTask?.ticket_id !== '0' &&
          !mandatoryUpload &&
          dataTask?.files.length > 0
        ) {
          console.log('checkFlow 7 - Final card not mandatory upload');
          setModalSelectFinalfiles(true);
          // handleUploadApproved();
        }

        if (
          dataTask?.ticket_id !== '' &&
          dataTask?.ticket_id !== '0' &&
          !mandatoryUpload &&
          dataTask.files.length === 0 &&
          dataProducts.products.length >= 1
        ) {
          setModalFinalFile(true);
          console.log('checkFlow 8 - Final card not mandatory upload +1 product');
          // abrir modal para questionar sobre enviar sem arquivos
          // if () {
          // }
          // handleConcludeTask();
        }

        if (
          dataTask?.ticket_id !== '' &&
          dataTask?.ticket_id !== '0' &&
          !mandatoryUpload &&
          dataTask.files.length === 0
        ) {
          console.log('checkFlow 9 - Final card check if upload or not');
          // abrir modal para questionar sobre enviar sem arquivos
          // if () {
          // }
          // handleConcludeTask();
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
          stop();
        }
        if (response.data.result[0].show_hours === 'false') {
          handleNextUser('back');
          setShowHoursBack(true);
          setModalReturnFlow(false);
          stop();
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

  const handleChangeTypeOnReturn = (e: any) => {
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
        end_job: infos.end_job,
        return_type: returnInfos.returnType
      };

      // console.log('log do returnParams =>', returnParams);
      // console.log('log do back or next =>', showHoursBack);

      const response = await api.put(`/task/return-task`, returnParams);

      if (response.data.status === 'success') {
        stop();
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
      returnMotive: '',
      returnType: ''
    });
    setModalReturnFlow(false);
  };

  const handleCancelReturnReject = () => {
    setReturnInfos({
      chosenStep: '',
      returnMotive: '',
      returnType: ''
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

  const compareFilesAndProducts = () => {
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
    if (compareFilesAndProducts().length < dataProducts?.products?.length) {
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
      link.setAttribute('download', `${file.original_name}`);

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
    setModalSelectFinalfiles(false);
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
              console.log('log do success upload');
              addToast({
                title: 'Sucesso',
                description: 'Arquivo enviado, aguarde a aprovação do cliente.',
                type: 'success'
              });
              setModalTenantApprove(false);
              setModalSelectFinalfiles(false);
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
    // console.log('log do product selected =>', product);
    if (dataTask?.files.length > 0) {
      setModalPreviewImage({
        isOpen: true,
        productId: product.products_delivery_id
      });
    }
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
    const { name, value } = event.target;

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

        getTaskInfos();
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
      console.log('log do response clock =>', response.data.result);
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
        getTaskInfos();
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
    // console.log('log do type of play', typeOfPlay);
    // console.log('log allRejected', hasAllBeenRejected);
  }, [typeOfPlay]);

  return (
    <ContainerDefault>
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
              product={
                viewProduct
                  ? dataProducts.products.length <= 1
                    ? onlyOneProductInfo
                    : selectedProductInfo
                  : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
              }
              avatar_infos={userProps}
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

          {/* {dataTask?.status !== 'Concluida' &&
            !viewProduct &&
            typeOfPlay === 'schedule' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
                disableButton={false}
                goBack
                buttonType={uploadClient && !hasProductsBeenEvaluated ? 'client' : 'send'}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )} */}

          {/* {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct === '' &&
            typeOfPlay === 'schedule' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
                disableButton={false}
                goBack
                buttonType="finish"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )} */}

          {/* {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct !== '' &&
            typeOfPlay === 'schedule' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
                disableButton={false}
                goBack
                buttonType="finish"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )} */}

          {/* {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            viewProduct &&
            typeOfPlay === 'schedule' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
                disableButton={false}
                goBack
                buttonType={uploadClient && !hasProductsBeenEvaluated ? 'client' : 'send'}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )} */}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct === '' &&
            typeOfPlay === 'product' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
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
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
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
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
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

          {/* {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct !== '' &&
            typeOfPlay === 'product' &&
            selectedProduct.status !== 'Concluida' &&
            finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
                disableButton={true}
                goBack
                buttonType="send"
                // sendToNext={handleConcludeTask}
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backToDelivery={() => setViewProduct(false)}
                isInsideProduct={true}
                backFlow={() => setModalReturnFlow(true)}
              />
            )} */}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct === '' &&
            typeOfPlay === 'product' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
                disableButton={false}
                goBack
                buttonType="send"
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
                avatar_infos={userProps}
                product={
                  viewProduct
                    ? dataProducts.products.length <= 1
                      ? onlyOneProductInfo
                      : selectedProductInfo
                    : { title: '', type: '', size: '', description: '', reason_change: '', id: '' }
                }
                disableButton={false}
                goBack
                buttonType="send"
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
            </ArrowSection>
          </RightInfosCard>

          <ShowInfosButton onClick={() => setHideRightCard('show')}>
            <FaArrowLeft />
          </ShowInfosButton>

          <CardsWrapper>
            {dataTask?.status === 'Concluida' && (
              <CardTimeInfo
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
              </CardTimeInfo>
            )}

            {dataTask?.status !== 'Concluida' && !showClock && !viewProduct && (
              <CardTimeInfo
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
              </CardTimeInfo>
            )}

            {dataTask?.status !== 'Concluida' && !showClock && viewProduct && (
              <CardTimeInfo
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
              </CardTimeInfo>
            )}

            {dataTask?.status !== 'Concluida' && showClock && !viewProduct && (
              <CardTimeInfo
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
              </CardTimeInfo>
            )}

            {dataTask?.status !== 'Concluida' && showClock && viewProduct && (
              <CardTaskPlay
                cardTitle={state.isRunning ? 'Atividade iniciada' : 'Iniciar atividade'}
                dataTime={
                  user.deduct_hours === 'creation' && dataTask?.type !== 'Livre'
                    ? selectedProduct.productInfo.minutes_creation
                    : user.deduct_hours === 'essay' && dataTask?.type !== 'Livre'
                    ? selectedProduct.productInfo.minutes_essay
                    : dataTask?.type === 'Livre'
                    ? ''
                    : dataTask?.total_time
                }
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
              productSelected={(value: any) => handleNavigateProduct('view', value)}
              typeOfPlay={typeOfPlay}
              uploadProduct={handleUploadForProduct}
              viewFile={handleShowFiles}
              fileList={dataTask?.files}
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
          manualOverrideDate={showHoursBack || dataTask?.type === 'Livre'}
          loadingSubmit={loading}
          taskType={dataTask?.type}
          deductHours={taskDeductHours}
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
                loading={loading}
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
                loading={loading}
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
            <ButtonDefault loading={loading} typeButton="primary" onClick={handleSaveUpload}>
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

              <ButtonDefault loading={loading} typeButton="primary" onClick={handleSaveUploadFinal}>
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

              <ButtonDefault
                loading={loading}
                typeButton="primary"
                onClick={handleSaveUploadClient}
              >
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
          {stepsWithTenantApprove && stepsWithTenantApprove?.length < 1 && (
            <SelectDefault
              label="Escolha o tipo da alteração"
              name="returnType"
              onChange={handleChangeTypeOnReturn}
              value={returnInfos.returnType}
            >
              <option value="1">Alteração Interna</option>
              <option value="2">Alteração Externa</option>
            </SelectDefault>
          )}

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
            {stepsWithTenantApprove && stepsWithTenantApprove?.length < 1 && (
              <ButtonDefault
                typeButton={
                  returnInfos.chosenStep === '' ||
                  returnInfos.returnMotive === '' ||
                  returnInfos.returnType === ''
                    ? 'blocked'
                    : 'primary'
                }
                onClick={handleBackFlow}
                disabled={
                  returnInfos.chosenStep === '' ||
                  returnInfos.returnMotive === '' ||
                  returnInfos.returnType === ''
                }
              >
                Retornar
              </ButtonDefault>
            )}

            {stepsWithTenantApprove && stepsWithTenantApprove?.length >= 1 && (
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
            )}
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
            <ButtonDefault loading={loading} typeButton="warning" onClick={handleDismemberment}>
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
              <ButtonDefault
                typeButton={filesToTenantApprove.length <= 0 ? 'blocked' : 'primary'}
                disabled={filesToTenantApprove.length <= 0}
                onClick={() =>
                  filesToTenantApprove.length > 0 ? setToClientConfirmation(true) : ''
                }
              >
                Salvar
              </ButtonDefault>
            </ModalButtons>
          )}

          {toClientConfirmation && (
            <ModalButtons>
              <ButtonDefault typeButton="dark" isOutline onClick={handleCancelSendToTenant}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault loading={loading} typeButton="primary" onClick={handleUploadTenant}>
                Enviar
              </ButtonDefault>
            </ModalButtons>
          )}
        </FileProductsWrapper>
      </ModalDefault>

      {/* Modal preview file */}
      <ModalDefault
        isOpen={modalPreviewImage.isOpen}
        onOpenChange={() =>
          setModalPreviewImage({
            isOpen: false,
            productId: ''
          })
        }
        title="Preview dos arquivos"
      >
        <ModalProductsWrapper>
          {dataTask?.files.filter(
            (file: any) => file.products_delivery_id === modalPreviewImage.productId
          ).length > 1 && (
            <FileProductList>
              <div style={{ width: '1000px' }}>
                <Table>
                  <table>
                    <thead>
                      <tr>
                        <th>File ID</th>
                        <th>Produto ID</th>
                        <th>Nome do produto</th>
                        <th>Nome do arquivo</th>
                        <th>Data</th>
                        <th>Detalhes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTask?.files
                        .filter(
                          (file: any) => file.products_delivery_id === modalPreviewImage.productId
                        )
                        .map((row: TaskFile, index: number) => (
                          <tr key={row.task_file_id}>
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
            </FileProductList>
          )}

          {dataTask?.files.filter(
            (file: any) => file.products_delivery_id === modalPreviewImage.productId
          ).length === 1 && (
            <div style={{ width: '900px' }}>
              <FilePreview
                style={{
                  backgroundImage: `url(https://${oneFile?.bucket}.s3.amazonaws.com/${oneFile?.key})`
                }}
              >
                <div
                  className="close-button"
                  onClick={() =>
                    setModalPreviewImage({
                      isOpen: false,
                      productId: ''
                    })
                  }
                >
                  <MdClose />
                </div>
              </FilePreview>
            </div>
          )}
        </ModalProductsWrapper>
      </ModalDefault>

      {/* Modal to select files to final card */}
      <ModalDefault
        isOpen={modalSelectFinalFiles}
        onOpenChange={() => setModalSelectFinalfiles(false)}
        title="Escolha o arquivo final"
      >
        <FileProductsWrapper>
          {!toClientConfirmation && (
            <div className="title-list">Selecione o arquivo que deseja enviar.</div>
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
                O arquivo escolhido será enviado para a área do cliente. <br />
                Essa ação não pode ser revertida.
              </div>
            )}
          </FileProductList>

          {!toClientConfirmation && (
            <ModalButtons>
              <ButtonDefault typeButton="dark" isOutline onClick={handleCancelSendToTenant}>
                Descartar
              </ButtonDefault>
              <ButtonDefault
                typeButton={filesToTenantApprove.length <= 0 ? 'blocked' : 'primary'}
                disabled={filesToTenantApprove.length <= 0}
                onClick={() =>
                  filesToTenantApprove.length > 0 ? setToClientConfirmation(true) : ''
                }
              >
                Salvar
              </ButtonDefault>
            </ModalButtons>
          )}

          {toClientConfirmation && (
            <ModalButtons>
              <ButtonDefault typeButton="dark" isOutline onClick={handleCancelSendToTenant}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault loading={loading} typeButton="primary" onClick={handleUploadApproved}>
                Enviar
              </ButtonDefault>
            </ModalButtons>
          )}
        </FileProductsWrapper>
      </ModalDefault>

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
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ textDecoration: 'line-through', fontSize: '12px' }}>
                              {row.first_time_lapse}
                            </span>
                            {row.time_lapse}
                          </div>
                        </td>
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

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading} />
    </ContainerDefault>
  );
}
