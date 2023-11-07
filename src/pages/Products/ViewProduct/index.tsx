/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IconBigCheck, IconClose } from '../../../assets/icons';
import { BiSearchAlt } from 'react-icons/bi';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';
import ProductTable from '../../../components/Ui/ProductTable';
import { ContainerDefault } from '../../../components/UiElements/styles';
import ModalDefault from '../../../components/Ui/ModalDefault';
import CardTaskPlay from '../../../components/CardTaskPlay';
import ScheduleUser from '../../../components/ScheduleUser';

// Styles
import {
  ArrowSection,
  CardsWrapper,
  DeliveryWrapper,
  ModalButtons,
  ModalList,
  ModalSearch,
  ModalSubtitle,
  ModalTable,
  ModalUploadWrapper,
  ModalWrapperList,
  RightInfosCard,
  RightInfosTitle,
  ShowInfosButton,
  TaskInfoField,
  TasksInfos,
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
import WorkingProduct from '../WorkingProduct';
import { useAuth } from '../../../hooks/AuthContext';
import { useStopWatch } from '../../../hooks/stopWatch';
import { UploadedFilesProps } from '../../../types';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import UploadFiles from '../../../components/Upload/UploadFiles';

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface StepTimeline {
  step: string;
  name: string;
  card_id: string;
  flow_id: string;
  necessary_upload: string;
  necessary_responsible: string;
  email_alert: string;
  tenant_approve: string;
  manager_approve: string;
  previous_step: string;
  function_id: string;
  final_card: string;
  ticket_status: string;
  ticket_status_id: string;
  tenant_id: string;
}

interface ModalUsersProps {
  user_id: string;
  name: string;
  function: string;
  tasks: string;
}

export default function ViewProductsDeliveries() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
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
  const [productForUpload, setProductForUpload] = useState<any>({});
  const [enableUpload, setEnableUpload] = useState<boolean>(false);
  const [viewProduct, setViewProduct] = useState<boolean>(false);

  const deliveryId = location.state.task.deliverys.filter(
    (obj: any) => Number(obj.order) === location.state.task_index
  );

  const titleInfos = {
    idNumber: dataTask?.task_id,
    numberTask: location.state.task_index,
    titleTask: dataTask?.title,
    monthTask: '',
    client_task: dataTask?.tenant,
    typeTask: dataTask?.project_category,
    quantityTask: '',
    contract_task: dataTask?.product_period
  };

  const data = {
    estimatedTime: location.state.task.total_time
  };

  const InputsTask = {
    copywriting_description: location.state.task.copywriting_description,
    creation_description: location.state.task.creation_description
  };

  const actualStep = timeLineData?.currentStep;
  const uploadIsTrue = timeLineData
    ? timeLineData.steps.filter((obj) => obj.step === actualStep)
    : '';
  const nextStep = timeLineData
    ? timeLineData.steps.filter((obj) => Number(obj.step) === Number(actualStep) + 1)
    : '';

  const finalCard = uploadIsTrue && uploadIsTrue[0].final_card === 'true';

  useEffect(() => {
    async function getClockIsOpen() {
      try {
        setLoading(true);

        if (typeOfPlay === 'schedule') {
          const response = await api.get(
            `/clock/consumed?delivery_id=${deliveryId[0].delivery_id}`
          );
          if (response.data.result.play === true) {
            setPlayingForSchedule(true);
            setInitialTime({
              isRunning: true,
              elapsedTime: response.data.result.diff / 1000
            });
            setTaskInfo({
              idNumber: location.state.task.task_id,
              numberTask: location.state.task_index,
              titleTask: location.state.task.title,
              monthTask: '',
              client_task: location.state.task.tenant,
              typeTask: location.state.task.project_category,
              quantityTask: '',
              contract_task: location.state.task.product_period
            });
          } else {
            setInitialTime({
              isRunning: false,
              elapsedTime: response.data.result.diff / 1000
            });
            setTaskInfo({
              idNumber: location.state.task.task_id,
              numberTask: location.state.task_index,
              titleTask: location.state.task.title,
              monthTask: '',
              client_task: location.state.task.tenant,
              typeTask: location.state.task.project_category,
              quantityTask: '',
              contract_task: location.state.task.product_period
            });
          }
        }

        if (typeOfPlay === 'product' && selectedProduct === '') {
          setInitialTime({
            isRunning: false,
            elapsedTime: 0
          });
          setTaskInfo({
            idNumber: location.state.task.task_id,
            numberTask: location.state.task_index,
            titleTask: location.state.task.title,
            monthTask: '',
            client_task: location.state.task.tenant,
            typeTask: location.state.task.project_category,
            quantityTask: '',
            contract_task: location.state.task.product_period
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
              idNumber: location.state.task.task_id,
              numberTask: location.state.task_index,
              titleTask: location.state.task.title,
              monthTask: '',
              client_task: location.state.task.tenant,
              typeTask: location.state.task.project_category,
              quantityTask: '',
              contract_task: location.state.task.product_period
            });
          } else {
            setInitialTime({
              isRunning: false,
              elapsedTime: response.data.result.diff / 1000
            });
            setTaskInfo({
              idNumber: location.state.task.task_id,
              numberTask: location.state.task_index,
              titleTask: location.state.task.title,
              monthTask: '',
              client_task: location.state.task.tenant,
              typeTask: location.state.task.project_category,
              quantityTask: '',
              contract_task: location.state.task.product_period
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

  useEffect(() => {
    setDataTask(location.state.task);

    if (location.state.task.type_play === 'delivery') {
      setTypeOfPlay('schedule');
    }

    if (location.state.task.type_play === 'product') {
      setTypeOfPlay('product');
    }

    const timeDataInfo = {
      totalTime: location.state.task.total_time,
      timeConsumed: location.state.task.time_consumed
    };
    setTimeData(timeDataInfo);
    setDataProducts(location.state.delivery);

    async function getTimelineData() {
      try {
        const response = await api.get(`task/timeline/${location.state.task.task_id}`);
        setTimelineData(response.data.result);
      } catch (error: any) {
        console.log('log timeline error', error);
      }
    }

    getTimelineData();
  }, [location]);

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
        task_id: location.state.task.task_id,
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
        task_id: location.state.task.task_id,
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
        task_id: location.state.task.task_id,
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
        task_id: location.state.task.task_id,
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

  const handleNavigateProduct = (infoProduct: any) => {
    const taskCompleteInfo = {
      productInfo: infoProduct,
      taskInfos: dataTask
    };
    setSelectedProduct(taskCompleteInfo);
    setViewProduct(true);
  };

  const handleAssignTask = (values: any) => {
    setModalSendToUser(false);
    handleSendToNextUser(values);
  };

  const handleFinishDelivery = async () => {
    try {
      setLoading(true);

      if (dataTask.type === 'Livre') {
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

          console.log('log do response conclude', responseConclude.data.result);
          navigate('/minhas-tarefas');
          localStorage.removeItem('stopwatchState');
        }

        setLoading(false);

        console.log('log do response for free task', response.data);
      } else {
        const response = await api.put(`/task/delivery-conclude/${deliveryId[0].delivery_id}`);
        if (response.data.result === 1) {
          addToast({
            title: 'Sucesso',
            type: 'success',
            description: 'Entrega finalizada com sucesso'
          });
          navigate('/minhas-tarefas');
          localStorage.removeItem('stopwatchState');
        }
        if (response.data.result.last_delivery) {
          setModalSendToUser(true);
        }
        setLoading(false);
      }
    } catch (error: any) {
      console.log('log error finish delivery', error);
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
  };

  async function handleFinishProduct() {
    try {
      setLoading(true);
      const response = await api.put(
        `/task/product-conclude/${selectedProduct?.productInfo.products_delivery_id}`
      );

      if (response.data.result === 1) {
        addToast({
          title: 'Sucesso',
          type: 'success',
          description: 'Entrega finalizada com sucesso'
        });
        navigate('/minhas-tarefas');
        localStorage.removeItem('stopwatchState');
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

  const handleSendToNextUser = async (values: any) => {
    try {
      setLoading(true);
      const next_user = {
        next_user: values.user_id,
        start_job: values.start_job,
        end_job: values.end_job
      };

      const response = await api.put(
        `/task/delivery-conclude/${deliveryId[0].delivery_id}`,
        next_user
      );
      console.log('log do response', response.data.result);

      if (response.data.result === 1) {
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
    setModalUpload(true);
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

      const response = await api.put(`/task/upload-manager-approve`, uploadInfos);

      if (response.data.status === 'success') {
        setUploadedFiles([]);
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

  useEffect(() => {
    // console.log('log do type of play', typeOfPlay);
    // console.log('log do selectedProducts', selectedProduct);
    // console.log('log do next step', nextStep);
    // console.log('log do upload', uploadIsTrue);
    console.log('log do final card', finalCard);
  }, [selectedProduct, typeOfPlay, nextStep, uploadIsTrue, finalCard]);

  return (
    <ContainerDefault>
      <DeliveryWrapper>
        {dataProducts?.status === 'Concluida' && (
          <HeaderOpenTask
            title={titleInfos}
            disableButton={true}
            goBack
            buttonType="send"
            nextStepInfo={timeLineData}
          />
        )}

        {dataProducts?.status !== 'Concluida' &&
          selectedProduct === '' &&
          typeOfPlay === 'schedule' &&
          !finalCard && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={false}
              goBack
              buttonType="send"
              sendToNext={handleFinishDelivery}
              nextStepInfo={timeLineData}
            />
          )}

        {dataProducts?.status !== 'Concluida' &&
          selectedProduct === '' &&
          typeOfPlay === 'schedule' &&
          finalCard && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={false}
              goBack
              buttonType="finish"
              sendToNext={handleFinishDelivery}
              nextStepInfo={timeLineData}
            />
          )}

        {dataProducts?.status !== 'Concluida' &&
          selectedProduct !== '' &&
          typeOfPlay === 'schedule' &&
          !finalCard && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={false}
              goBack
              buttonType="send"
              sendToNext={handleFinishDelivery}
              nextStepInfo={timeLineData}
            />
          )}

        {dataProducts?.status !== 'Concluida' &&
          selectedProduct === '' &&
          typeOfPlay === 'product' &&
          finalCard && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={false}
              goBack
              buttonType="finish"
              sendToNext={handleFinishDelivery}
              nextStepInfo={timeLineData}
            />
          )}

        {dataProducts?.status !== 'Concluida' &&
          selectedProduct !== '' &&
          typeOfPlay === 'product' &&
          selectedProduct.status !== 'Concluida' &&
          finalCard && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={typeOfPlay === 'product' ? false : true}
              goBack
              buttonType="finish"
              sendToNext={handleFinishProduct}
              nextStepInfo={timeLineData}
              backToDelivery={() => setSelectedProduct('')}
              isInsideProduct={true}
            />
          )}

        {dataProducts?.status !== 'Concluida' &&
          selectedProduct !== '' &&
          typeOfPlay === 'product' &&
          selectedProduct.status === 'Concluida' &&
          finalCard && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={true}
              goBack
              buttonType="finish"
              sendToNext={handleFinishProduct}
              nextStepInfo={timeLineData}
              backToDelivery={() => setSelectedProduct('')}
              isInsideProduct={true}
            />
          )}

        {dataProducts?.status !== 'Concluida' &&
          selectedProduct !== '' &&
          typeOfPlay === 'product' &&
          selectedProduct.status !== 'Concluida' &&
          finalCard && (
            <HeaderOpenTask
              title={titleInfos}
              disableButton={true}
              goBack
              buttonType="finish"
              sendToNext={handleFinishProduct}
              nextStepInfo={timeLineData}
              backToDelivery={() => setSelectedProduct('')}
              isInsideProduct={true}
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
          {dataProducts?.status === 'Concluida' && (
            <CardTaskPlay
              cardTitle="Atividade concluída"
              dataTime={data ? data?.estimatedTime : ''}
              blockPlay={true}
              handlePlay={() => ''}
            />
          )}

          {dataProducts?.status !== 'Concluida' && (
            <CardTaskPlay
              cardTitle={state.isRunning ? 'Atividade iniciada' : 'Iniciar atividade'}
              dataTime={data ? data?.estimatedTime : '00:00:00'}
              blockPlay={
                typeOfPlay === 'product' && selectedProduct === ''
                  ? true
                  : typeOfPlay === 'schedule' && selectedProduct !== ''
                  ? true
                  : false
              }
              handlePlay={handlePlayingType}
            />
          )}

          {/* {dataProducts?.status !== 'Concluida' &&
            typeOfPlay === 'schedule' &&
            selectedProduct === '' && (
              <CardTaskPlay
                cardTitle="Iniciar atividade"
                dataTime={data ? data?.estimatedTime : '00:00:00'}
                blockPlay={blockPlayButton}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            typeOfPlay === 'schedule' &&
            selectedProduct !== '' && (
              <CardTaskPlay
                cardTitle="Iniciar atividade"
                dataTime={data ? data?.estimatedTime : '00:00:00'}
                blockPlay={true}
              />
            )}

          {dataProducts?.status !== 'Concluida' &&
            typeOfPlay === 'product' &&
            selectedProduct === '' && (
              <CardTaskPlay
                cardTitle="Iniciar atividade"
                dataTime={data ? data?.estimatedTime : '00:00:00'}
                blockPlay={true}
              />
            )} */}
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
            productSelected={handleNavigateProduct}
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
            taskFiles={dataTask?.files}
            taskTenant={dataTask?.tenant_id}
            uploadEnabled={enableUpload}
            stepToReturn={uploadIsTrue !== '' ? uploadIsTrue[0]?.previous_step : ''}
            sendToApprove={nextStep && nextStep[0]?.manager_approve === 'true' ? true : false}
            timelineData={timeLineData}
            toApprove={handleSendToManager}
            backButtonTitle="Voltar para produtos"
            goBack={() => setViewProduct(false)}
          />
        )}
      </DeliveryWrapper>

      {/* Modal Schedule user */}
      <ModalDefault
        isOpen={modalSendToUser}
        title="Lista de pessoas"
        onOpenChange={() => setModalSendToUser(false)}
      >
        <ScheduleUser
          task_title={dataTask?.title}
          estimated_time={location.state.task.total_time}
          flow={location.state.task.flow_id}
          project_product_id={location.state.task.project_product_id}
          step={Number(location.state.task.step) + 1}
          user_alocated={handleAssignTask}
          closeModal={() => setModalSendToUser(false)}
        />
      </ModalDefault>

      {/* Modal upload files */}
      <ModalDefault
        isOpen={modalUpload}
        onOpenChange={() => {
          setModalUpload(false);
          setUploadedFiles([]);
        }}
        title="Upload para aprovação"
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
    </ContainerDefault>
  );
}
