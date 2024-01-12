/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IconBigCheck } from '../../../assets/icons';

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
import UploadFinalFiles from '../../../components/Upload/UploadFiles';
import UploadFilesTicket from '../../../components/UploadTicket/UploadFilex';
import { UsersWrapper } from '../../Tasks/CreateTasks/styles';
import { ProductsTable } from '../../Tasks/ComponentSteps/InfoDeliverables/styles';
import { ModalButtons } from '../../Tasks/ViewTask/styles';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { TextAreaDefault } from '../../../components/Inputs/TextAreaDefault';

// Styles
import {
  ArrowSection,
  CardsWrapper,
  DeliveryWrapper,
  ModalProductsWrapper,
  ModalReturnFlow,
  ModalUploadWrapper,
  RightInfosCard,
  RightInfosTitle,
  SelectProductField,
  ShowInfosButton,
  TaskInfoField,
  TasksInfos,
  TextInfo,
  TimeLine,
  TimeLineIcon,
  TimelineInfo,
  TimelineStep
} from './styles';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useStopWatch } from '../../../hooks/stopWatch';

// Types
import { StepTimeline, UploadedFilesProps } from '../../../types';

// Utils
import { UsersNoSchedule } from '../../../utils/models';
import UploadFiles from '../../../components/Upload/UploadFiles';
import UploadFinalFile from '../../../components/UploadFinal/UploadFinalFiles';
import Loader from '../../../components/LoaderSpin';

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface ReturnProps {
  chosenStep: string;
  returnMotive: string;
}

export default function ViewProductsDeliveries() {
  const location = useLocation();
  const navigate = useNavigate();
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

  const data = {
    estimatedTime: dataTask?.total_time
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

  // const checkAllFinished: any[] = dataProducts.products.every(
  //   (product: any) => product.status === 'Concluida'
  // );

  const hasDismemberedProductInDeliveries = (delivery: any): boolean => {
    return delivery.products.some((product: any) => product.status === 'Desmembrada');
  };

  const hasDismemberedProduct = dataTask?.deliverys.some(hasDismemberedProductInDeliveries);

  const hasToDismemberTask = dataTask?.files?.some((obj: any) => obj.status === 'fail');

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

    getTimelineData();
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
    if (type === 'view') {
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

  // const handleFinishDelivery = async () => {
  //   try {
  //     setLoading(true);

  //     if (dataTask.type === 'Livre') {
  //       const responseNextDate = await api.get(
  //         `/task/nextdate=${moment(new Date()).format('YYYY-MM-DD')}&task_id=${dataTask?.task_id}`
  //       );

  //       const response = await api.get(`/task/next-user/${dataTask?.task_id}`);

  //       if (response.data.result.length > 0) {
  //         const payload = {
  //           user_id: response.data.result[0].user_id,
  //           task_id: dataTask?.task_id
  //         };

  //         const responseConclude = await api.put(`/task/send-for-evaluation`, payload);

  //         console.log('log do response conclude', responseConclude.data.result);
  //         navigate('/minhas-tarefas');
  //         localStorage.removeItem('stopwatchState');
  //       }

  //       setLoading(false);

  //       console.log('log do response for free task', response.data);
  //     } else {
  //       const response = await api.put(`/task/delivery-conclude/${deliveryId[0].delivery_id}`);
  //       if (response.data.result === 1) {
  //         addToast({
  //           title: 'Sucesso',
  //           type: 'success',
  //           description: 'Entrega finalizada com sucesso'
  //         });
  //         navigate('/minhas-tarefas');
  //         localStorage.removeItem('stopwatchState');
  //       }
  //       if (response.data.result.last_delivery) {
  //         setModalSendToUser(true);
  //       }
  //       setLoading(false);
  //     }
  //   } catch (error: any) {
  //     console.log('log error finish delivery', error);
  //     setLoading(false);

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
  //   }
  // };

  // async function handleFinishProduct() {
  //   try {
  //     setLoading(true);
  //     const response = await api.put(
  //       `/task/product-conclude/${selectedProduct?.productInfo.products_delivery_id}`
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
  //     setLoading(false);
  //   } catch (error: any) {
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
        console.log('log do response', response.data.result);

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
          console.log('log do response', response.data.result);

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

        console.log('log do response conclude', responseConclude.data.result);
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
    if ((finalCard && enableUpload) || uploadClient) {
      setModalFinalFile(true);
    }
  };

  async function handleSaveUpload() {
    try {
      const uploadInfos = {
        task_id: dataTask?.task_id,
        file_name: uploadedFiles[0].file_name,
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
      }

      console.log('log do response do saveUpload', response.data.result);
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
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        last_archive: 'true',
        products_delivery_id: productForUpload.products_delivery_id
      };

      const response = await api.post(`/task/upload`, uploadInfos);

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
      }

      console.log('log do response do saveUpload', response.data.result);
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
        // setTimeout(() => {
        //   navigate('/minhas-tarefas');
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
      if (hasToDismemberTask && checkType !== 'back' && !hasDismemberedProduct) {
        setModalDismemberment(true);
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

      if (checkType === 'next') {
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
          // console.log('log do checkFlow to show hours');
        }
        if (response.data.result[0].show_hours === 'false') {
          handleNextUser('next');
          // console.log('log do checkFlow to show schedule');
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
      console.log('log do response', response.data.result);

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

    console.log('log do selectedStep =>', selectedStep);
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
    } catch (error) {
      console.log('log return task error', error);
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
      console.log('log error conclude task', error);
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

  // useEffect(() => {
  //   console.log('log do hasDismemberedProduct =>', hasDismemberedProduct);
  // }, [hasDismemberedProduct]);

  useEffect(() => {
    // console.log('log do type of play', typeOfPlay);
    // console.log('log do selectedProducts', selectedProduct);
    // console.log('log do next step', nextStep);
    // console.log('log do upload', uploadIsTrue);
    // console.log('log do final card', finalCard);
    // console.log('log dataTask', dataTask);
    // console.log('log dataProducts =>', dataProducts);
  }, [selectedProduct, typeOfPlay, nextStep, uploadIsTrue, finalCard, dataTask, dataProducts]);

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

          {/* {dataTask?.status !== 'Concluida' &&
            typeOfPlay === 'schedule' &&
            selectedProduct === '' && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={true}
                goBack
                buttonType="send"
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )} */}

          {dataProducts?.status === 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            typeOfPlay === 'schedule' &&
            selectedProduct !== '' && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType="send"
                sendToNext={() => checkFlow('next')}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataTask?.status !== 'Concluida' &&
            selectedProduct === '' &&
            typeOfPlay === 'schedule' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType="send"
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
                sendToNext={handleConcludeTask}
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
                sendToNext={handleConcludeTask}
                nextStepInfo={timeLineData}
                backFlow={() => setModalReturnFlow(true)}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            dataTask?.status !== 'Concluida' &&
            selectedProduct !== '' &&
            typeOfPlay === 'schedule' &&
            !finalCard && (
              <HeaderOpenTask
                title={titleInfos}
                disableButton={false}
                goBack
                buttonType="send"
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
                sendToNext={handleConcludeTask}
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
                sendToNext={handleConcludeTask}
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
                sendToNext={handleConcludeTask}
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
                sendToNext={handleConcludeTask}
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
                timeLineData?.steps.map((row: StepTimeline, index: number) => (
                  <TimelineStep key={index}>
                    <TimeLineIcon className={row.step <= timeLineData.currentStep ? 'checked' : ''}>
                      {Number(row.step) >= Number(timeLineData.currentStep) && (
                        <div className="dot"></div>
                      )}

                      {Number(row.step) < Number(timeLineData.currentStep) && <IconBigCheck />}
                    </TimeLineIcon>
                    <TimelineInfo>
                      {row.step < timeLineData.currentStep && (
                        <div className="info-title">Etapa anterior:</div>
                      )}
                      {row.step === timeLineData.currentStep && (
                        <div className="info-title">Etapa atual:</div>
                      )}
                      {row.step > timeLineData.currentStep && (
                        <div className="info-title">Próxima etapa:</div>
                      )}
                      <div className="timeline-info">{row.name}</div>
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

              {/* <TaskInfoField>
                <div className="info-title">Responsável:</div>
                <div className="info-description">Qual???</div>
              </TaskInfoField> */}

              <TaskInfoField>
                <div className="info-title">Etapa:</div>
                <div className="info-description">{dataTask?.card_name}</div>
              </TaskInfoField>

              {/* <TaskInfoField>
                <div className="info-title">Formato:</div>
                <div className="info-description">Do que???</div>
              </TaskInfoField> */}

              <TaskInfoField>
                <div className="info-title">I/D:</div>
                <div className="info-description">Digital</div>
              </TaskInfoField>

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
              <BsChevronDoubleRight />
              <div className="hide">Fechar</div>
            </ArrowSection>
          </RightInfosCard>

          <ShowInfosButton onClick={() => setHideRightCard('show')}>
            <FaArrowLeft />
          </ShowInfosButton>

          <CardsWrapper>
            {dataTask?.status === 'Concluida' && (
              <CardTaskPlay
                cardTitle="Atividade concluída"
                dataTime={data ? data?.estimatedTime : ''}
                blockPlay={true}
                handlePlay={() => ''}
              />
            )}

            {dataTask?.status !== 'Concluida' && (
              <CardTaskPlay
                cardTitle={state.isRunning ? 'Atividade iniciada' : 'Iniciar atividade'}
                dataTime={data ? data?.estimatedTime : '00:00:00'}
                blockPlay={
                  typeOfPlay === 'schedule' && viewProduct
                    ? true
                    : typeOfPlay === 'product' && !viewProduct
                    ? true
                    : false
                }
                handlePlay={handlePlayingType}
              />
            )}

            <CardTaskInfo
              cardTitle="Contexto geral"
              cardType="text"
              dataText={dataTask?.description}
              isPlayingTime={() => ''}
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
          estimated_time={dataTask?.total_time}
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
        onOpenChange={() => setModalWithoutSchedule(false)}
        title="Escolha o usuário que receberá a tarefa"
      >
        <UsersWrapper>
          <ProductsTable>
            <table>
              <thead>
                <tr>
                  <th>Selecionar</th>
                  <th>Nome</th>
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
                Salvar
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
    </ContainerDefault>
  );
}
