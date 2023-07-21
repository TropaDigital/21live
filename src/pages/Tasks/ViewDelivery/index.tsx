/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IconBigCheck, IconClose } from '../../../assets/icons';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import ProductTable from '../../../components/Ui/ProductTable';
import { ContainerDefault } from '../../../components/UiElements/styles';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';

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
import ModalDefault from '../../../components/Ui/ModalDefault';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { BiSearchAlt } from 'react-icons/bi';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';

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
  const [workForProducts, setWorkForProducts] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');
  const [timeLineData, setTimelineData] = useState<TimelineProps>();
  const [hideTimeLine, setHideTimeLine] = useState<boolean>(false);
  const [playingForSchedule, setPlayingForSchedule] = useState<boolean>(false);
  const [modalSendToUser, setModalSendToUser] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearchTerm(search),
    700
  );

  const titleInfos = {
    idNumber: '1768',
    numberTask: '01',
    titleTask: 'Cronograma',
    monthTask: 'Julho 2023',
    client_task: 'G.WIND',
    typeTask: 'FEE',
    quantityTask: 'PACK 8 POSTS',
    contract_task: 'MÊS'
  };

  const mockData = [
    {
      id: '001',
      title: 'Plano de comunicação',
      consumedTime: '00:30:00',
      estimatedTime: '01:00:00',
      description: 'Plano de comunicação padrão',
      format: '.Docx',
      formatType: 'Digital',
      type: 'Criação',
      status: 'progress'
    },
    {
      id: '002',
      title: 'Plano de descomunicação',
      consumedTime: '00:27:00',
      estimatedTime: '04:20:00',
      description: 'Plano de comunicação padrão',
      format: '.Docx',
      formatType: 'Impresso',
      type: 'Criação',
      status: 'pending'
    }
  ];

  const dataText = {
    data: 'Mussum Ipsum, cacilds vidis litro abertis.Posuere libero varius.Nullam a nisl ut ante blandit hendrerit.Aenean sit amet nisi.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet.Sed non consequat odio.Não sou faixa preta cumpadi, sou preto inteiris, inteiris.Leite de capivaris, leite de mula manquis sem cabeça. Cevadis im ampola pa arma uma pindureta.Per aumento de cachacis, eu reclamis.Mé faiz elementum girarzis, nisi eros vermeio.Sapien in monti palavris qui num significa nadis i pareci latim. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Aenean aliquam molestie leo, vitae iaculis nisl.Viva Forevis aptent taciti sociosqu ad litora torquent.Quem manda na minha terra sou euzis! Admodum accumsan disputationi eu sit.Vide electram sadipscing et per.Nec orci ornare consequat.Praesent lacinia ultrices consectetur.Sed non ipsum felis.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Quem num gosta di mim que vai caçá sua turmis!Não sou faixa preta cumpadi, sou preto inteiris, inteiris.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet.Sed non consequat odio.Admodum accumsan disputationi eu sit.Vide electram sadipscing et per.'
  };

  const data = {
    estimatedTime: '03:00:00'
  };

  useEffect(() => {
    async function getTimelineData() {
      try {
        const response = await api.get(`task/timeline/126`);
        setTimelineData(response.data.result);
      } catch (error: any) {
        console.log('log timeline error', error);
      }
    }

    // getTimelineData();
  }, []);

  const handlePlayingType = (value: boolean) => {
    if (value) {
      setPlayingForSchedule(true);
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
            dataText={dataText.data}
            isPlayingTime={() => ''}
          />
        </CardsWrapper>

        <ProductTable
          data={mockData}
          workForProduct={setWorkForProducts}
          isPlayingForSchedule={playingForSchedule}
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
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Responsável:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Etapa:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Formato:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">I/D:</div>
              <div className="info-description">Digital</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Prioridade:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Data inicial:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Data final:</div>
              <div className="info-description">02:00:00</div>
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
          <div className="close-button">
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
                // onChange={(event) => {
                //   setSearchTerm(event.target.value);
                //   debouncedCallback(event.target.value);
                // }}
                onChange={(event) => setSearchTerm(event.target.value)}
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
