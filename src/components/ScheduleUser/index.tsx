/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Styles
import {
  ArrowButton,
  EndTaskDate,
  EstimatedTimeSelector,
  HoursTable,
  ScheduleDate,
  ScheduleSelectUser,
  ScheduleSubtitle,
  ScheduleTable,
  ScheduleWrapper,
  SubtitleInfo,
  UserCard,
  UserFields,
  UserInfosCard,
  UserTable,
  UserTitle
} from './styles';

// Icons
import { IconClose } from '../../assets/icons';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

// Components
import ButtonDefault from '../Buttons/ButtonDefault';
import { CheckboxDefault } from '../Inputs/CheckboxDefault';

// Planby
import { useApp } from './useApp';
import { Epg, Layout } from 'planby';
import { Program, Timeline } from './components';

// Libraries
import moment from 'moment';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

// Services
import api from '../../services/api';

// Hooks
import { useToast } from '../../hooks/toast';

interface Task {
  task_id?: string | null;
  start: string;
  end: string;
  type: 'job' | 'pause';
  title?: string;
}

interface WorkSchedule {
  start_work: string;
  end_work: string;
}

interface UserData {
  user_id: string;
  name: string;
  function: string;
  work: WorkSchedule;
  agenda: Task[];
}

interface ScheduleProps {
  scheduleDay: string;
  user_selected: string;
  starterHour: string | null;
}

interface TaskExchangeProps {
  task_title: string;
  taskId: string;
  estimated_time: {
    time_essay: string;
    time_creation: string;
    total_time: string;
  };
  flow: string;
  project_product_id: string;
  step?: string | number | any;
  limitDate?: string;
  taskType?: string;
  user_alocated: (value: any) => void;
  closeModal: () => void;
  manualOverrideDate?: boolean;
  loadingSubmit?: boolean;
  deductHours?: string;
}

// interface NewTaskItem {
//   end: string;
//   start: string;
//   task_id: string;
//   title: string;
//   type: string;
// }

export default function ScheduleUser({
  task_title,
  taskId,
  estimated_time,
  flow,
  project_product_id,
  step,
  user_alocated,
  closeModal,
  manualOverrideDate,
  loadingSubmit,
  taskType,
  deductHours
}: TaskExchangeProps) {
  const { addToast } = useToast();
  const [DTOTaskSelect, setDTOTaskSelect] = useState<ScheduleProps>({
    scheduleDay: '',
    user_selected: '',
    starterHour: null
  });
  const [dayCounter, setDayCounter] = useState<number>(0);
  const [dataUserSchedule, setDataUserSchedule] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkAvailability, setCheckAvailability] = useState<boolean>(false);
  const [responseScheduleInfos, setResponseScheduleInfos] = useState({
    start_job: '',
    end_job: '',
    user_id: ''
  });
  const [manualEstimatedTime, setManualEstimatedTime] = useState<string>('00:00:00');

  const dinamicDate = moment().startOf('day').add(dayCounter, 'days').format('YYYY-MM-DD HH:mm:ss');
  const starterDate = moment(dinamicDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
  const finishDate = moment(dinamicDate).format('YYYY-MM-DD') + 'T24:00:00';
  const [outsideUsers, setOutsideUsers] = useState<boolean>(false);

  async function getUserSchedule() {
    try {
      setLoading(true);

      const response = await api.get(
        `/task/next?flow=${flow}&project_product_id=${project_product_id}&step=${
          step ? step : 1
        }&date=${moment(dinamicDate).format('YYYY-MM-DD')}&task_id=${taskId}&ignore_project=${
          outsideUsers ? 'true' : 'false'
        }`
      );

      if (response.data.result.length > 0) {
        setDataUserSchedule(response.data.result);
      } else {
        addToast({
          type: 'warning',
          title: 'Aviso',
          description: 'Sem usuários disponíveis para a data escolhida'
        });
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log error getSchedule', error);
      setLoading(false);
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
    }
  }

  useEffect(() => {
    getUserSchedule();
  }, [dayCounter]);

  // useEffect(() => {
  //   const date = moment(dinamicDate).format('YYYY-MM-DD');
  //   if (moment(date).isSame(limitDate)) {
  //     addToast({
  //       type: 'warning',
  //       title: 'Aviso',
  //       description: 'Data limite para a 1ª entrega!'
  //     });
  //   }
  //   if (moment(date).isAfter(limitDate)) {
  //     addToast({
  //       type: 'warning',
  //       title: 'Aviso',
  //       description: 'Data ultrapassa a data da 1ª entrega!'
  //     });
  //   }
  // }, [limitDate, dinamicDate]);

  const addNewObjectToAgenda = (userId: string, newTaskItem: any) => {
    // console.log('log add new object =>', newTaskItem);
    const taskNewInfos = newTaskItem.map((item: any) => {
      let title = '';
      if (item.type === 'new') {
        title = task_title;
      } else if (item.type === 'pause' && item.title === '') {
        title = 'Pausa';
      }
      return { ...item, title };
    });

    setDataUserSchedule((prevUserData) => {
      return prevUserData.map((user) => {
        if (user.user_id === userId) {
          const updatedUser = {
            ...user,
            agenda: taskNewInfos
          };
          return updatedUser;
        }
        return user;
      });
    });
  };

  function handleOnChange(name: string, value: string) {
    const newDTO: any = DTOTaskSelect;
    newDTO[name] = value;
    setDTOTaskSelect({ ...newDTO });

    if (name === 'starterHour') {
      setCheckAvailability(false);
    }

    if (name === 'user_selected') {
      getUserSchedule();
      setCheckAvailability(false);
      setTimeout(() => {
        handleUserSelect(DTOTaskSelect.user_selected);
      }, 1000);
    }
  }

  useEffect(() => {
    getUserSchedule();
  }, [outsideUsers]);

  const handleDayOfUSer = (value: any) => {
    setDayCounter(dayCounter + value);
  };

  const { getEpgProps, getLayoutProps } = useApp({
    starterDate: starterDate,
    finishDate: finishDate,
    data: dataUserSchedule,
    taskDate: moment(dinamicDate).format('YYYY-MM-DD')
  });

  const userSelected = dataUserSchedule?.filter(
    (obj: UserData) => obj.user_id === DTOTaskSelect.user_selected
  );

  async function checkIfIsAvaliable(user: any, date: any, time: any) {
    try {
      const timeValue =
        deductHours === 'creation'
          ? estimated_time.time_creation
          : deductHours === 'essay'
          ? estimated_time.time_essay
          : estimated_time.total_time;

      if (DTOTaskSelect.starterHour === '' || DTOTaskSelect.starterHour === null) {
        addToast({
          type: 'warning',
          title: 'ATENÇÃO',
          description: 'Escolha a hora inicial antes consultar a disponibilidade!'
        });
        throw new Error();
      }

      if (!manualOverrideDate) {
        const response = await api.get(
          `/task/verify-agenda?user_id=${user}&date=${date}&total_time=${timeValue}`
        );
        if (response.data.result.agenda.length > 0) {
          // const newTaskItem = {
          //   start: response.data.result.start_job,
          //   end: response.data.result.end_job,
          //   title: task_title,
          //   type: 'new'
          // };

          setResponseScheduleInfos({
            start_job: response.data.result.start_job,
            end_job: response.data.result.end_job,
            user_id: user
          });

          addNewObjectToAgenda(DTOTaskSelect.user_selected, response.data.result.agenda);
          setCheckAvailability(true);

          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Usuário disponível no horário escolhido!'
          });
        } else {
          addToast({
            type: 'warning',
            title: 'Aviso',
            description: response.data.result.message
          });
        }
      }

      if (manualOverrideDate) {
        const response = await api.get(
          `/task/verify-agenda?user_id=${user}&date=${date}&total_time=${time}`
        );
        if (response.data.result.agenda.length > 0) {
          // const newTaskItem = {
          //   start: response.data.result.start_job,
          //   end: response.data.result.end_job,
          //   title: task_title,
          //   type: 'new'
          // };

          setResponseScheduleInfos({
            start_job: response.data.result.start_job,
            end_job: response.data.result.end_job,
            user_id: user
          });

          addNewObjectToAgenda(DTOTaskSelect.user_selected, response.data.result.agenda);
          setCheckAvailability(true);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Usuário disponível no horário escolhido!'
          });
        } else {
          addToast({
            type: 'warning',
            title: 'Aviso',
            description: response.data.result.message
          });
        }
      }
    } catch (error: any) {
      console.log('log do error verify', error);
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
    }
  }

  const handleSetEstimatedTime = (value: string) => {
    const timeValue =
      dataUserSchedule[0].function === 'Criação'
        ? estimated_time.time_creation
        : dataUserSchedule[0].function === 'Redação'
        ? estimated_time.time_essay
        : estimated_time.total_time;

    if (value > timeValue && taskType !== 'Livre') {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Tempo máximo para tarefa excedido!'
      });
    } else {
      setManualEstimatedTime(value);
    }
  };

  const handleUserSelect = (selectedUserId: string) => {
    const selectedIndex = dataUserSchedule.findIndex((user) => user.user_id === selectedUserId);
    if (selectedIndex !== -1) {
      const selectedUser = dataUserSchedule.splice(selectedIndex, 1)[0];
      setDataUserSchedule([selectedUser, ...dataUserSchedule]);
    }
  };

  useEffect(() => {
    handleOnChange('scheduleDay', moment(dinamicDate).format('YYYY-MM-DD'));
  }, [dayCounter]);

  return (
    <ScheduleWrapper>
      {!loading && (
        <>
          <ScheduleSubtitle>
            <SubtitleInfo>
              <div className="title">Título da tarefa:</div>
              <div className="info">{task_title ? task_title : 'Teste'}</div>
            </SubtitleInfo>
            <div>|</div>
            <SubtitleInfo>
              <div className="title">Tempo da tarefa:</div>
              <div className="info">{estimated_time?.total_time}</div>
            </SubtitleInfo>
            <div>|</div>
            {!manualOverrideDate && (
              <SubtitleInfo>
                <div className="title">Tempo estimado:</div>
                <div className="info">
                  {deductHours === 'creation'
                    ? estimated_time.time_creation
                    : deductHours === 'essay'
                    ? estimated_time.time_essay
                    : estimated_time.total_time}
                </div>
              </SubtitleInfo>
            )}
            {manualOverrideDate && (
              <EstimatedTimeSelector>
                <div className="hour-label">Tempo estimado:</div>
                <TimePicker
                  onChange={(value: any) => handleSetEstimatedTime(value)}
                  // onChange={(value: any) => setManualEstimatedTime(value)}
                  value={manualEstimatedTime}
                  clearIcon={null}
                  clockIcon={null}
                  locale="pt-BR"
                  disableClock={true}
                  maxDetail="second"
                />
              </EstimatedTimeSelector>
            )}

            {/* <div>
              {dataUserSchedule[0]?.function === 'Criação'
                ? estimated_time.time_creation
                : dataUserSchedule[0]?.function === 'Redação'
                ? estimated_time.time_essay
                : estimated_time.total_time}
            </div> */}

            <button className="close" onClick={closeModal}>
              <IconClose />
            </button>
          </ScheduleSubtitle>

          <ScheduleDate>
            <ArrowButton onClick={() => handleDayOfUSer(-1)}>
              <BsArrowLeft />
            </ArrowButton>

            <div className="date">
              {moment(dinamicDate).format('DD')} <span>de</span>{' '}
              {moment(dinamicDate).format('MMMM')}
            </div>

            <ArrowButton onClick={() => handleDayOfUSer(1)}>
              <BsArrowRight />
            </ArrowButton>
          </ScheduleDate>

          <ScheduleTable>
            <UserTable>
              <UserTitle>
                <div className="user-title">Usuário</div>
              </UserTitle>
              {dataUserSchedule?.map((row: UserData) => (
                <UserCard key={row.user_id}>
                  <CheckboxDefault
                    label=""
                    name="user_selected"
                    onChange={() => handleOnChange('user_selected', row.user_id)}
                    checked={DTOTaskSelect.user_selected === row.user_id ? true : false}
                  />
                  <UserInfosCard>
                    <div className="user-name">
                      {row.name.split(' ')[0]} {row.name.split(' ')[1]}
                    </div>
                    <div className="working-hours">
                      Jornada:{' '}
                      <span>
                        {row.work.start_work} - {row.work.end_work}
                      </span>{' '}
                    </div>
                  </UserInfosCard>
                </UserCard>
              ))}
            </UserTable>

            <HoursTable>
              <div style={{ backgroundColor: 'white' }}>
                <Epg {...getEpgProps()}>
                  <Layout
                    {...getLayoutProps()}
                    renderTimeline={(props) => <Timeline {...props} />}
                    renderProgram={({ program, ...rest }) => (
                      <Program key={program.data.id} program={program} {...rest} />
                    )}
                  />
                </Epg>
              </div>
            </HoursTable>
          </ScheduleTable>

          <div className="ext-users">
            <CheckboxDefault
              label="Mostrar todos"
              name="outsiders"
              onChange={() => setOutsideUsers(outsideUsers ? false : true)}
              checked={outsideUsers}
            />
          </div>

          <ScheduleSelectUser>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UserFields className="hours">
                <div className="hour-label">Hora inicial</div>
                <TimePicker
                  onChange={(value: any) => handleOnChange('starterHour', value)}
                  // onChange={() => ''}
                  value={DTOTaskSelect?.starterHour}
                  clearIcon={null}
                  clockIcon={null}
                  locale="pt-BR"
                  disableClock={true}
                  maxDetail="second"
                />
              </UserFields>
              {responseScheduleInfos.end_job !== '' && (
                <EndTaskDate>
                  <div className="date-title">Data / Hora final</div>
                  <div className="end-date">
                    {moment(responseScheduleInfos.end_job).format('DD/MM/YYYY - HH:mm')}
                  </div>
                </EndTaskDate>
              )}
            </div>

            <UserFields>
              <div className="selectedUser">
                Usuário selecionado: <strong>{userSelected ? userSelected[0]?.name : ''}</strong>
              </div>
              {!checkAvailability && !manualOverrideDate && (
                <ButtonDefault
                  typeButton={
                    DTOTaskSelect.user_selected && DTOTaskSelect.starterHour !== ''
                      ? 'primary'
                      : 'blocked'
                  }
                  disabled={
                    DTOTaskSelect.starterHour === '' && !DTOTaskSelect.user_selected ? true : false
                  }
                  onClick={() =>
                    checkIfIsAvaliable(
                      DTOTaskSelect.user_selected,
                      `${DTOTaskSelect.scheduleDay} ${DTOTaskSelect.starterHour}`,
                      '00:00:00'
                    )
                  }
                >
                  Verificar disponibilidade
                </ButtonDefault>
              )}

              {!checkAvailability && manualOverrideDate && (
                <ButtonDefault
                  typeButton={manualEstimatedTime === '00:00:00' ? 'blocked' : 'primary'}
                  disabled={manualEstimatedTime === '00:00:00' ? true : false}
                  onClick={() =>
                    checkIfIsAvaliable(
                      DTOTaskSelect.user_selected,
                      `${DTOTaskSelect.scheduleDay} ${DTOTaskSelect.starterHour}`,
                      manualEstimatedTime
                    )
                  }
                >
                  Verificar disponibilidade
                </ButtonDefault>
              )}

              {checkAvailability && (
                <ButtonDefault
                  loading={loadingSubmit}
                  typeButton={DTOTaskSelect.user_selected ? 'primary' : 'blocked'}
                  onClick={() => user_alocated(responseScheduleInfos)}
                >
                  Alocar usuário
                </ButtonDefault>
              )}
            </UserFields>
          </ScheduleSelectUser>
        </>
      )}
    </ScheduleWrapper>
  );
}
