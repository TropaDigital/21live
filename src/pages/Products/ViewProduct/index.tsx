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
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';

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
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useToast } from '../../../hooks/toast';
import WorkingProduct from '../WorkingProduct';
import { el } from 'date-fns/locale';

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface StepTimeline {
  step: string;
  name: string;
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
  const openRightRef = useRef<any>();
  const [modalSendToUser, setModalSendToUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [workForProducts, setWorkProducts] = useState<boolean>(false);
  const [playingForSchedule, setPlayingForSchedule] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');
  const [dataTask, setDataTask] = useState<any>();
  const [dataProducts, setDataProducts] = useState<any>();
  const [timeData, setTimeData] = useState<any>();
  const [timeLineData, setTimelineData] = useState<TimelineProps>();
  const [hideTimeLine, setHideTimeLine] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [dataUser, setDataUser] = useState<any[]>();
  const [selectedProduct, setSelectedProduct] = useState<any>('');

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
    estimatedTime: location.state.task.totalTime
  };

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await api.get(`task/next-user/${dataTask?.task_id}?search=${search}`);
        setDataUser(response.data.result);
      } catch (error: any) {
        console.log('log error getting user', error);
      }
    }

    if (dataTask?.task_id !== undefined) {
      getUserData();
    }
  }, [dataTask, search]);

  useEffect(() => {
    setDataTask(location.state.task);
    const timeDataInfo = {
      totalTime: location.state.task.totalTime,
      timeConsumed: location.state.task.timeConsumed
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

  const handleStartPlayingTime = async () => {
    const taskClock = {
      task_id: location.state.task.task_id,
      delivery_id: deliveryId[0].delivery_id
    };

    try {
      setLoading(true);
      const responseClock = await api.post(`/clock`, taskClock);
      console.log('log do responseClock', responseClock);
      setLoading(false);
    } catch (error: any) {
      console.log('log do error play', error);

      addToast({
        title: 'Atenção',
        description: error,
        type: 'warning'
      });
      setLoading(false);
    }
  };

  const handlePlayingType = () => {
    if (selectedProduct === '') {
      setPlayingForSchedule(true);
      handleStartPlayingTime();
    }
    if (selectedProduct !== '') {
      handleStartPlayingTime();
      setPlayingForSchedule(false);
    }
  };

  const handleSwitchPlayType = async (value: any) => {
    console.log('log do tipo de play', value);
    if (value) {
      setWorkProducts(true);
      const playType = {
        task_id: location.state.task.task_id,
        type_play: 'product'
      };

      try {
        const response = await api.post(`/task/switch-play`, playType);
        console.log('log do response task/switch-play', response.data.result);
      } catch (error: any) {
        addToast({
          title: 'Atenção',
          description: error,
          type: 'warning'
        });
      }
    } else {
      setWorkProducts(false);
      const playType = {
        task_id: location.state.task.task_id,
        type_play: 'delivery'
      };

      try {
        const response = await api.post(`/task/switch-play`, playType);
        console.log('log do response task/switch-play', response.data.result);
      } catch (error: any) {
        addToast({
          title: 'Atenção',
          description: error,
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
  };

  const handleAssignTask = () => {
    setModalSendToUser(false);
    handleSendToNextUser();
  };

  const handleCheckBox = (id: string) => {
    if (selectedUser === id) {
      setSelectedUser('');
    } else {
      setSelectedUser(id);
    }
  };

  const handleFinishDelivery = async () => {
    try {
      setLoading(true);
      const response = await api.put(`/task/delivery-conclude/${deliveryId[0].delivery_id}`);
      if (response.data.result === 1) {
        localStorage.removeItem('elapsedTime');
        addToast({
          title: 'Sucesso',
          type: 'success',
          description: 'Entrega finalizada com sucesso'
        });
        navigate('/minhas-tarefas');
      }
      if (response.data.result.last_delivery) {
        setModalSendToUser(true);
      }
      setLoading(false);
    } catch (error: any) {
      console.log('log error finish delivery');
      setLoading(false);
    }
  };

  async function handleFinishProduct() {
    try {
      setLoading(true);
      const response = await api.post(
        `/task/product-conclude/${selectedProduct?.productInfo.products_delivey_id}`
      );
      localStorage.removeItem('elapsedTime');
      console.log('log do response', response);
      setLoading(false);
    } catch (error: any) {
      console.log('log error getting user', error);
      setLoading(false);
    }
  }

  const handleSendToNextUser = async () => {
    try {
      const next_user = {
        next_user: selectedUser
      };

      const response = await api.put(
        `/task/delivery-conclude/${deliveryId[0].delivery_id}`,
        next_user
      );
      console.log('log do response', response.data.result);

      if (response.data.result === 1) {
        localStorage.removeItem('elapsedTime');
        navigate('/minhas-tarefas');
      }
    } catch (error) {
      console.log('log error next user', error);
    }
  };

  const handleFinishedPlay = () => {
    addToast({
      title: 'Atenção',
      type: 'warning',
      description: 'Atividade já concluída'
    });
  };

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

        {dataProducts?.status !== 'Concluida' && selectedProduct === '' && (
          <HeaderOpenTask
            title={titleInfos}
            disableButton={false}
            goBack
            buttonType="send"
            sendToNext={handleFinishDelivery}
            nextStepInfo={timeLineData}
          />
        )}

        {dataProducts?.status !== 'Concluida' && selectedProduct !== '' && (
          <HeaderOpenTask
            title={titleInfos}
            disableButton={workForProducts}
            goBack
            buttonType="finish"
            sendToNext={handleFinishProduct}
            nextStepInfo={timeLineData}
            backToDelivery={() => setSelectedProduct('')}
            isInsideProduct={true}
          />
        )}

        <CardsWrapper>
          {dataProducts?.status === 'Concluida' && (
            <CardTaskInfo
              cardTitle="Iniciar atividade"
              cardType="time"
              dataTime={data ? data?.estimatedTime : ''}
              isPlayingTime={handleFinishedPlay}
              taskIsFinished={dataTask?.status === 'Concluida' ? true : false}
            />
          )}
          {dataProducts?.status !== 'Concluida' && (
            <CardTaskInfo
              cardTitle="Iniciar atividade"
              cardType="time"
              dataTime={data ? data?.estimatedTime : ''}
              isPlayingTime={handlePlayingType}
              taskIsFinished={dataTask?.status === 'Concluida' ? true : false}
            />
          )}
          <CardTaskInfo
            cardTitle="Contexto geral"
            cardType="text"
            dataText={dataTask?.description}
            isPlayingTime={() => ''}
          />
        </CardsWrapper>

        {selectedProduct === '' && (
          <ProductTable
            data={dataProducts}
            timeData={timeData}
            workForProduct={handleSwitchPlayType}
            isPlayingForSchedule={playingForSchedule}
            productSelected={handleNavigateProduct}
            isFinished={dataTask?.status === 'Concluida' ? true : false}
            typeOfWorkFinished={dataTask?.type_play}
          />
        )}

        {selectedProduct !== '' && (
          <WorkingProduct taskId={selectedProduct?.productInfo?.products_delivey_id} />
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
              <div className="info-description">{dataTask?.totalTime}</div>
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
      </DeliveryWrapper>

      <ModalDefault
        isOpen={modalSendToUser}
        title="Lista de pessoas"
        onOpenChange={() => setModalSendToUser(false)}
      >
        <ModalWrapperList>
          <div className="close-button" onClick={() => setModalSendToUser(false)}>
            <IconClose />
          </div>
          <ModalSubtitle>Escolha alguém para atribuir esta tarefa.</ModalSubtitle>
          <ModalList>
            <ModalSearch>
              <InputDefault
                label=""
                placeholder="Buscar pelo nome..."
                name="search"
                icon={BiSearchAlt}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  debouncedCallback(event.target.value);
                }}
                value={searchTerm}
                isLoading={isLoading}
              />
            </ModalSearch>

            <ModalTable>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Disponível em</th>
                    <th>Tarefas na fila</th>
                  </tr>
                </thead>
                <tbody>
                  {dataUser?.map((row: ModalUsersProps, index: number) => (
                    <tr key={index} className={selectedUser === row.user_id ? 'selected' : ''}>
                      <td>
                        <div className="check-name">
                          <CheckboxDefault
                            label=""
                            name="user_selected"
                            onChange={() => handleCheckBox(row.user_id)}
                            checked={selectedUser === row.user_id ? true : false}
                          />
                          {row.name}
                        </div>
                      </td>
                      <td>{row.function}</td>
                      <td>30/08/2023</td>
                      <td style={{ textAlign: 'center' }}>{row.tasks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ModalTable>
          </ModalList>

          <ModalButtons>
            <ButtonDefault
              typeButton="lightWhite"
              isOutline
              onClick={() => {
                setSelectedUser('');
                setModalSendToUser(false);
                setSearchTerm('');
              }}
            >
              Cancelar
            </ButtonDefault>
            <ButtonDefault onClick={() => handleAssignTask()}>Atribuir tarefa</ButtonDefault>
          </ModalButtons>
        </ModalWrapperList>
      </ModalDefault>
    </ContainerDefault>
  );
}
