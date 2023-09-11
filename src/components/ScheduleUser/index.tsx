/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Styles
import {
  ArrowButton,
  EndTaskDate,
  HoursTable,
  HoursTitle,
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
import { InputDefault } from '../Inputs/InputDefault';
import ButtonDefault from '../Buttons/ButtonDefault';
import { CheckboxDefault } from '../Inputs/CheckboxDefault';

// Planby
import { useApp } from './useApp';
import { Epg, Layout } from 'planby';
import { Program, Timeline } from './components';

// Libraries
import moment from 'moment';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';
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
  product_id: string;
  user_alocated: (value: any) => void;
  closeModal: () => void;
}

interface NewTaskItem {
  end: string;
  start: string;
  task_id: string;
  title: string;
  type: string;
}

export default function ScheduleUser({
  task_title,
  estimated_time,
  flow,
  product_id,
  user_alocated,
  closeModal
}: TaskExchangeProps) {
  const { addToast } = useToast();
  const [DTOTaskSelect, setDTOTaskSelect] = useState<ScheduleProps>({
    scheduleDay: '',
    user_selected: '',
    starterHour: '00:00:00'
  });
  const [hours, setHours] = useState<string>('00');
  const [minutes, setMinutes] = useState<string | number | null>('00');
  const [dayCounter, setDayCounter] = useState<number>(0);
  const [dataUserSchedule, setDataUserSchedule] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkAvailability, setCheckAvailability] = useState<boolean>(false);
  const [responseScheduleInfos, setResponseScheduleInfos] = useState({
    start_job: '',
    end_job: '',
    user_id: ''
  });

  const dinamicDate = moment().startOf('day').add(dayCounter, 'days').format('YYYY-MM-DD HH:mm:ss');
  const starterDate = moment(dinamicDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
  const finishDate = moment(dinamicDate).format('YYYY-MM-DD') + 'T24:00:00';

  useEffect(() => {
    async function getUserSchedule() {
      try {
        setLoading(true);
        const response = await api.get(
          `/task/next?flow=${flow}&product_id=${product_id}&step=1&date=${moment(
            dinamicDate
          ).format('YYYY-MM-DD')}`
        );

        if (response.data.result.length > 0) {
          setDataUserSchedule(response.data.result);
        }

        setLoading(false);
      } catch (error: any) {
        console.log('log error getSchedule', error);
        setLoading(false);
      }
    }

    getUserSchedule();
  }, [dayCounter]);

  const addNewObjectToAgenda = (userId: string, newTaskItem: any) => {
    setDataUserSchedule((prevUserData) => {
      return prevUserData.map((user) => {
        if (user.user_id === userId) {
          const updatedUser = {
            ...user,
            agenda: [...user.agenda, newTaskItem]
          };
          return updatedUser;
        }
        return user;
      });
    });
  };

  // const { data: dataUserSchedule } = useFetch<UserData[]>(
  //   `/task/next?flow=${flow}&product_id=${product_id}&step=1&date=${moment(dinamicDate).format(
  //     'YYYY-MM-DD'
  //   )}`
  // );

  // const dataTest: UserData[] = [
  //   {
  //     user_id: '15853',
  //     name: 'Robert Fox',
  //     function: 'Gerente de Projeto',
  //     work: {
  //       start_work: '09:30',
  //       end_work: '17:30'
  //     },
  //     agenda: [
  //       {
  //         task_id: '170',
  //         start: '2023-09-05 09:30',
  //         end: '2023-09-05 13:30',
  //         type: 'job',
  //         title: 'Tarefa 1'
  //       },
  //       {
  //         start: '2023-09-05 13:30',
  //         end: '2023-09-05 14:00',
  //         type: 'pause'
  //       },
  //       {
  //         task_id: '170',
  //         start: '2023-09-05 14:00',
  //         end: '2023-09-05 16:00',
  //         type: 'job',
  //         title: 'Tarefa 2'
  //       },
  //       {
  //         start: '2023-09-05 16:00',
  //         end: '2023-09-05 16:30',
  //         type: 'pause'
  //       },
  //       {
  //         task_id: '170',
  //         start: '2023-09-05 16:30',
  //         end: '2023-09-05 17:30',
  //         type: 'job',
  //         title: 'Tarefa 3'
  //       }
  //     ]
  //   },
  //   {
  //     user_id: '15854',
  //     name: 'Darlene Robertson',
  //     function: 'Gerente de Projeto',
  //     work: {
  //       start_work: '10:00',
  //       end_work: '19:00'
  //     },
  //     agenda: [
  //       {
  //         task_id: '171',
  //         start: '2023-09-05 10:30',
  //         end: '2023-09-05 13:30',
  //         type: 'job',
  //         title: 'Tarefa 1'
  //       },
  //       {
  //         start: '2023-09-05 13:30',
  //         end: '2023-09-05 14:00',
  //         type: 'pause'
  //       },
  //       {
  //         task_id: '170',
  //         start: '2023-09-05 14:00',
  //         end: '2023-09-05 16:00',
  //         type: 'job',
  //         title: 'Tarefa 2'
  //       },
  //       {
  //         start: '2023-09-05 16:00',
  //         end: '2023-09-05 16:30',
  //         type: 'pause'
  //       },
  //       {
  //         task_id: '170',
  //         start: '2023-09-05 16:30',
  //         end: '2023-09-05 17:30',
  //         type: 'job',
  //         title: 'tarefa 3'
  //       }
  //     ]
  //   }
  // ];

  function handleOnChange(name: string, value: string) {
    const newDTO: any = DTOTaskSelect;
    newDTO[name] = value;
    setDTOTaskSelect({ ...newDTO });
  }

  const handleDayOfUSer = (value: any) => {
    setDayCounter(dayCounter + value);
  };

  function handleHoursMinutes(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'hours_task') {
      if (Number(value) > 23) {
        setHours('23');
      } else {
        setHours(String(value));
      }
    }

    if (name === 'minutes_task') {
      if (Number(value) > 59) {
        setMinutes('59');
      } else {
        setMinutes(String(value));
      }
    }
  }

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
      if (response.data.result.message === 'Agenda livre') {
        const newTaskItem = {
          start: response.data.result.start_job,
          end: response.data.result.end_job,
          title: task_title,
          type: 'new'
        };

        setResponseScheduleInfos({
          start_job: response.data.result.start_job,
          end_job: response.data.result.end_job,
          user_id: user
        });

        addNewObjectToAgenda(DTOTaskSelect.user_selected, newTaskItem);
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
    }
  }

  useEffect(() => {
    const hoursAndMinutes = `${hours}:${minutes}:00`;
    handleOnChange('starterHour', hoursAndMinutes);
  }, [hours, minutes]);

  useEffect(() => {
    handleOnChange('scheduleDay', moment(dinamicDate).format('YYYY-MM-DD'));
  }, [dayCounter]);

  // useEffect(() => {
  //   console.log('log do DTO', DTOTaskSelect);
  // }, [DTOTaskSelect]);

  // useEffect(() => {
  //   console.log('log do response', responseScheduleInfos);
  // }, [responseScheduleInfos]);

  return (
    <ScheduleWrapper>
      <ScheduleSubtitle>
        <SubtitleInfo>
          <div className="title">Título da tarefa:</div>
          <div className="info">{task_title ? task_title : 'Teste'}</div>
        </SubtitleInfo>
        <div>•</div>
        <SubtitleInfo>
          <div className="title">Tempo estimado:</div>
          <div className="info">{estimated_time ? estimated_time : '02:00:00'}</div>
        </SubtitleInfo>

        <button className="close" onClick={closeModal}>
          <IconClose />
        </button>
      </ScheduleSubtitle>

      <ScheduleDate>
        <ArrowButton onClick={() => handleDayOfUSer(-1)}>
          <BsArrowLeft />
        </ArrowButton>

        <div className="date">
          {moment(dinamicDate).format('DD')} <span>de</span> {moment(dinamicDate).format('MMMM')}
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
            <InputDefault
              label=""
              name="hours_task"
              onChange={handleHoursMinutes}
              value={hours ? hours : ''}
              placeholder="00"
              type="number"
              min="0"
              max="23"
              step="1"
              required
            />
            :
            <InputDefault
              label=""
              name="minutes_task"
              onChange={handleHoursMinutes}
              value={minutes ? minutes : '00'}
              placeholder="00"
              type="number"
              min="0"
              max="59"
              step="1"
              required
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
          {!checkAvailability && (
            <ButtonDefault
              typeButton={DTOTaskSelect.user_selected ? 'primary' : 'blocked'}
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
    </ScheduleWrapper>
  );
}
