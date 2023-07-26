/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IconBigCheck, IconClose } from '../../../assets/icons';
import { BiSearchAlt } from 'react-icons/bi';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import ProductTable from '../../../components/Ui/ProductTable';
import { ContainerDefault } from '../../../components/UiElements/styles';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';

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

interface StepTimeline {
  step: string;
  name: string;
}

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface ModalUsersProps {
  id: string;
  user_name: string;
  role: string;
  availability: string;
  tasks_on_file: string;
}

export default function ViewDelivery() {
  const location = useLocation();
  const navigate = useNavigate();
  const [workForProducts, setWorkForProducts] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');
  const [timeLineData, setTimelineData] = useState<TimelineProps>();
  const [hideTimeLine, setHideTimeLine] = useState<boolean>(false);
  const [playingForSchedule, setPlayingForSchedule] = useState<boolean>(false);
  const [modalSendToUser, setModalSendToUser] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [dataTask, setDataTask] = useState<any>();

  useEffect(() => {
    setDataTask(location.state.task);
  }, [location]);

  const titleInfos = {
    idNumber: location.state.task.task_id,
    numberTask: location.state.task_index,
    titleTask: location.state.task.title,
    monthTask: '',
    client_task: location.state.task.tenant,
    typeTask: location.state.task.project_category,
    quantityTask: '',
    contract_task: location.state.task.product_period
  };

  const data = {
    estimatedTime: location.state.task.totalTime
  };

  // Timeline function
  useEffect(() => {
    async function getTimelineData() {
      try {
        const response = await api.get(`task/timeline/${location.state.task.task_id}`);
        setTimelineData(response.data.result);
      } catch (error: any) {
        console.log('log timeline error', error);
      }
    }

    getTimelineData();
  }, [location.state.task.task_id]);

  const handlePlayingType = (value: boolean) => {
    if (value) {
      setPlayingForSchedule(true);
      // handleStartPlayingTime();
    }
  };

  const handleCheckBox = (id: string) => {
    if (selectedUser === id) {
      setSelectedUser('');
    } else {
      setSelectedUser(id);
    }
  };

  const handleAssignTask = () => {
    console.log('log do assign task');
    setModalSendToUser(false);
  };

  // const handleStartPlayingTime = async () => {
  //   const playType = {
  //     task_id: '126',
  //     type_play: 'delivery'
  //   };
  //   console.log('começou a contar o tempo', playType);

  //   try {
  //     const response = await api.post(`/task/switch/play`, playType);
  //     console.log('log do response', response.data.result);
  //   } catch (error: any) {
  //     console.log('log do error play', error);
  //   }
  // };

  // Function to get diff time
  // useEffect(() => {
  //   const x = moment(Date.now());
  //   const y = moment(new Date('July 19, 2023 17:24:00'));
  //   const duration = moment.duration(x.diff(y));
  //   const Milliseconds = duration.asMilliseconds();

  //   function padTo2Digits(num: any) {
  //     return num.toString().padStart(2, '0');
  //   }

  //   function convertMsToTime(milliseconds: any) {
  //     let seconds = Math.floor(milliseconds / 1000);
  //     let minutes = Math.floor(seconds / 60);
  //     const hours = Math.floor(minutes / 60);

  //     seconds = seconds % 60;
  //     minutes = minutes % 60;

  //     return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  //   }

  //   console.log('log Milliseconds', Milliseconds);
  //   console.log('log do duration', convertMsToTime(Milliseconds));
  // }, []);

  const handleNavigateProduct = (id: any) => {
    navigate(`/produto/${id}`);
  };

  const mockUsers: ModalUsersProps[] = [
    {
      id: '001',
      user_name: 'Leandro Eusebio',
      role: 'Redator',
      availability: '30/06/2023',
      tasks_on_file: '1'
    },
    {
      id: '002',
      user_name: 'Guilherme Augusto',
      role: 'Designer',
      availability: '01/07/2023',
      tasks_on_file: '3'
    }
  ];

  return (
    <ContainerDefault>
      <DeliveryWrapper>
        <HeaderOpenTask
          title={titleInfos}
          disableButton={false}
          backPage="/suas-tarefas"
          buttonType="send"
          sendToNext={() => setModalSendToUser(true)}
        />

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
            dataText={location.state.task.description}
            isPlayingTime={() => ''}
          />
        </CardsWrapper>

        <ProductTable
          data={dataTask}
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
              <div className="info-description">{location.state.task.totalTime}</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Responsável:</div>
              <div className="info-description">???</div>
            </TaskInfoField>

            {/* <TaskInfoField>
              <div className="info-title">Etapa:</div>
              <div className="info-description">{location.state.task.step}</div>
            </TaskInfoField> */}

            <TaskInfoField>
              <div className="info-title">Formato:</div>
              <div className="info-description">{location.state.task.status}???</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">I/D:</div>
              <div className="info-description">Digital</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Prioridade:</div>
              <div className="info-description">???</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Data inicial:</div>
              <div className="info-description">
                {moment(location.state.task.copywriting_date_end).format('DD/MM/YYYY')}
              </div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Data final:</div>
              <div className="info-description">
                {moment(location.state.task.creation_date_end).format('DD/MM/YYYY')}
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
                error={''}
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
                  {mockUsers.map((row: ModalUsersProps, index: number) => (
                    <tr key={index} className={selectedUser === row.id ? 'selected' : ''}>
                      <td>
                        <div className="check-name">
                          <CheckboxDefault
                            label=""
                            name="user_selected"
                            onChange={() => handleCheckBox(row.id)}
                            checked={selectedUser === row.id ? true : false}
                          />
                          {row.user_name}
                        </div>
                      </td>
                      <td>{row.role}</td>
                      <td>{row.availability}</td>
                      <td style={{ textAlign: 'center' }}>{row.tasks_on_file}</td>
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
