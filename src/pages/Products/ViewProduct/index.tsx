/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect } from 'react';
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
import { useFetch } from '../../../hooks/useFetch';

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
  const [modalSendToUser, setModalSendToUser] = useState<boolean>(false);
  const [workForProducts, setWorkForProducts] = useState<boolean>(false);
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

  const deliveryId = location.state.task.deliverys[0].delivery_id;

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

  const handleStartPlayingTime = async () => {
    const playType = {
      task_id: location.state.task.task_id,
      type_play: 'delivery'
    };

    const taskClock = {
      task_id: location.state.taskInfos.task_id
    };

    try {
      const response = await api.post(`/task/switch/play`, playType);
      const responseClock = await api.post(`/clock`, taskClock);
      console.log('log do response', response.data.result);
      console.log('log do responseClock', responseClock);
    } catch (error: any) {
      console.log('log do error play', error);
    }
  };

  const handlePlayingType = (value: boolean) => {
    // console.log('log do playing type', value);
    if (value) {
      setPlayingForSchedule(true);
      handleStartPlayingTime();
    }
  };

  const handleNavigateProduct = (infoProduct: any, idProduct: any) => {
    const taskCompleteInfo = {
      productInfo: infoProduct,
      titleInfos: titleInfos,
      id_product: idProduct,
      taskInfos: dataTask,
      playType: playingForSchedule
    };
    navigate(`/produto/${idProduct}`, { state: taskCompleteInfo });
  };

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

  const handleAssignTask = () => {
    setModalSendToUser(false);
    handleFinishDelivery();
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
      const response = await api.post(`/task/delivery-conclude/${deliveryId}`);
      console.log('log do response', response.data.result);
    } catch (error: any) {
      console.log('log error finish delivery');
    }
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

  // useEffect(() => {
  //   console.log('log do playStart =>', localStorage.getItem('playStart'));
  //   console.log('log do pausePlay ||', localStorage.getItem('pausePlay'));
  // }, [playingForSchedule]);

  // const mockUsers: ModalUsersProps[] = [
  //   {
  //     id: '001',
  //     user_name: 'Leandro Eusebio',
  //     role: 'Redator',
  //     availability: '30/06/2023',
  //     tasks_on_file: '1'
  //   },
  //   {
  //     id: '002',
  //     user_name: 'Guilherme Augusto',
  //     role: 'Designer',
  //     availability: '01/07/2023',
  //     tasks_on_file: '3'
  //   }
  // ];

  return (
    <ContainerDefault>
      <DeliveryWrapper>
        {Number(dataProducts.order) < dataTask.deliverys.length && (
          <HeaderOpenTask
            title={titleInfos}
            disableButton={workForProducts}
            goBack
            buttonType="send"
            sendToNext={handleFinishDelivery}
          />
        )}
        {Number(dataProducts.order) === dataTask.deliverys.length && (
          <HeaderOpenTask
            title={titleInfos}
            disableButton={workForProducts}
            goBack
            buttonType="send"
            sendToNext={() => setModalSendToUser(true)}
          />
        )}

        <CardsWrapper>
          {!workForProducts && (
            <CardTaskInfo
              cardTitle="Iniciar atividade"
              cardType="time"
              dataTime={data ? data?.estimatedTime : ''}
              isPlayingTime={handlePlayingType}
            />
          )}
          <CardTaskInfo
            cardTitle="Contexto geral"
            cardType="text"
            dataText={dataTask?.description}
            isPlayingTime={() => ''}
          />
        </CardsWrapper>

        <ProductTable
          data={dataProducts}
          timeData={timeData}
          workForProduct={setWorkForProducts}
          isPlayingForSchedule={playingForSchedule}
          productSelected={handleNavigateProduct}
        />

        <RightInfosCard hideCard={hideRightCard}>
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

            <TaskInfoField>
              <div className="info-title">Responsável:</div>
              <div className="info-description">Qual???</div>
            </TaskInfoField>

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
