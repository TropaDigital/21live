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
  UserTable
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
  starterHour: string;
}

interface TaskExchangeProps {
  task_title: string;
  estimated_time: string;
  flow: string;
  project_product_id: string;
  step?: string | number | any;
  limitDate?: string;
  user_alocated: (value: any) => void;
  closeModal: () => void;
  manualOverrideDate?: boolean;
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
  estimated_time,
  flow,
  project_product_id,
  step,
  limitDate,
  user_alocated,
  closeModal,
  manualOverrideDate
}: TaskExchangeProps) {
  const { addToast } = useToast();
  const [DTOTaskSelect, setDTOTaskSelect] = useState<ScheduleProps>({
    scheduleDay: '',
    user_selected: '',
    starterHour: '00:00:00'
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

  async function getUserSchedule() {
    try {
      setLoading(true);
      const response = await api.get(
        `/task/next?flow=${flow}&project_product_id=${project_product_id}&step=${
          step ? step : 1
        }&date=${moment(dinamicDate).format('YYYY-MM-DD')}`
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

    if (name === 'user_selected') {
      getUserSchedule();
      setCheckAvailability(false);
    }
  }

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
      } else {
        addToast({
          type: 'warning',
          title: 'Aviso',
          description: response.data.result.message
        });
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
    if (value > estimated_time) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Tempo máximo para tarefa excedido!'
      });
    } else {
      setManualEstimatedTime(value);
    }
  };

  useEffect(() => {
    handleOnChange('scheduleDay', moment(dinamicDate).format('YYYY-MM-DD'));
  }, [dayCounter]);

  // useEffect(() => {
  //   console.log('log do DTO', DTOTaskSelect);
  // }, [DTOTaskSelect]);

  return (
    <ScheduleWrapper>
      {!loading && (
        <>
          <ScheduleSubtitle>
            <SubtitleInfo>
              <div className="title">Título da tarefa:</div>
              <div className="info">{task_title ? task_title : 'Teste'}</div>
            </SubtitleInfo>
            <div>•</div>
            {!manualOverrideDate && (
              <SubtitleInfo>
                <div className="title">Tempo estimado:</div>
                <div className="info">{estimated_time ? estimated_time : '--:--:--'}</div>
              </SubtitleInfo>
            )}
            {manualOverrideDate && (
              <EstimatedTimeSelector>
                <div className="hour-label">Tempo estimado:</div>
                <TimePicker
                  onChange={(value: any) => handleSetEstimatedTime(value)}
                  // onChange={() => ''}
                  value={manualEstimatedTime}
                  clearIcon={null}
                  clockIcon={null}
                  locale="pt-BR"
                  disableClock={true}
                  maxDetail="second"
                />
              </EstimatedTimeSelector>
            )}

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
              <div className="user-title">Usuário</div>
              {dataUserSchedule?.map((row: UserData) => (
                <UserCard key={row.user_id}>
                  <CheckboxDefault
                    label=""
                    name="user_selected"
                    onChange={() => handleOnChange('user_selected', row.user_id)}
                    checked={DTOTaskSelect.user_selected === row.user_id ? true : false}
                  />
                  <UserInfosCard>
                    <div className="user-name">{row.name}</div>
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
                  typeButton={DTOTaskSelect.user_selected ? 'primary' : 'blocked'}
                  disabled={!DTOTaskSelect.user_selected ? true : false}
                  onClick={() =>
                    checkIfIsAvaliable(
                      DTOTaskSelect.user_selected,
                      `${DTOTaskSelect.scheduleDay} ${DTOTaskSelect.starterHour}`,
                      estimated_time
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
