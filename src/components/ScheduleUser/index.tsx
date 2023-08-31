import { useEffect, useRef, useState } from 'react';

import {
  ArrowButton,
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
import { IconClose } from '../../assets/icons';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { InputDefault } from '../Inputs/InputDefault';
import ButtonDefault from '../Buttons/ButtonDefault';
import { CheckboxDefault } from '../Inputs/CheckboxDefault';
import { HourDate } from '../../utils/dataDefault';

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

export default function ScheduleUser() {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const dataTest: UserData[] = [
    {
      user_id: '15853',
      name: 'Robert Fox',
      function: 'Gerente de Projeto',
      work: {
        start_work: '09:30',
        end_work: '17:30'
      },
      agenda: [
        {
          task_id: '170',
          start: '2023-08-31 09:30',
          end: '2023-08-31 13:30',
          type: 'job',
          title: 'Tarefa 1'
        },
        {
          start: '2023-08-31 13:30',
          end: '2023-08-31 14:00',
          type: 'pause'
        },
        {
          task_id: '170',
          start: '2023-08-31 14:00',
          end: '2023-08-31 16:00',
          type: 'job',
          title: 'Tarefa 2'
        },
        {
          start: '2023-08-31 16:00',
          end: '2023-08-31 16:30',
          type: 'pause'
        },
        {
          task_id: '170',
          start: '2023-08-31 16:30',
          end: '2023-08-31 17:30',
          type: 'job',
          title: 'Tarefa 3'
        }
      ]
    },
    {
      user_id: '15853',
      name: 'Darlene Robertson',
      function: 'Gerente de Projeto',
      work: {
        start_work: '10:00',
        end_work: '19:00'
      },
      agenda: [
        {
          task_id: '171',
          start: '2023-08-31 10:30',
          end: '2023-08-31 13:30',
          type: 'job',
          title: 'Tarefa 1'
        },
        {
          start: '2023-08-31 13:30',
          end: '2023-08-31 14:00',
          type: 'pause'
        },
        {
          task_id: '170',
          start: '2023-08-31 14:00',
          end: '2023-08-31 16:00',
          type: 'job',
          title: 'Tarefa 2'
        },
        {
          start: '2023-08-31 16:00',
          end: '2023-08-31 16:30',
          type: 'pause'
        },
        {
          task_id: '170',
          start: '2023-08-31 16:30',
          end: '2023-08-31 17:30',
          type: 'job',
          title: 'tarefa 3'
        }
      ]
    }
  ];

  return (
    <ScheduleWrapper>
      <ScheduleSubtitle>
        <SubtitleInfo>
          <div className="title">Título da tarefa:</div>
          <div className="info">Plano de comunicação</div>
        </SubtitleInfo>
        <div>•</div>
        <SubtitleInfo>
          <div className="title">Tempo estimado:</div>
          <div className="info">02:00:00</div>
        </SubtitleInfo>

        <button className="close">
          <IconClose />
        </button>
      </ScheduleSubtitle>

      <ScheduleDate>
        <ArrowButton>
          <BsArrowLeft />
        </ArrowButton>

        <div className="date">16 de Agosto</div>

        <ArrowButton>
          <BsArrowRight />
        </ArrowButton>
      </ScheduleDate>

      {/* Aqui vai a tabela */}
      <ScheduleTable>
        <UserTable>
          <div className="user-title">Usuário</div>
          {dataTest.map((row: UserData) => (
            <UserCard key={row.user_id}>
              <CheckboxDefault
                label=""
                name="necessary_responsible"
                onChange={() => ''}
                checked={false}
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
          <HoursTitle>
            {HourDate.map((row: any, index: number) => (
              <div className="hours" key={index}>
                {row.hour}
              </div>
            ))}
          </HoursTitle>
          <div style={{ height: '72px' }}></div>
        </HoursTable>
      </ScheduleTable>

      <ScheduleSelectUser>
        <UserFields>
          <InputDefault
            label="Hora início"
            name="hours_creation"
            onChange={(value) => setHours(Number(value))}
            value={hours}
            type="number"
            min="0"
            max="23"
            step="1"
            required
          />
          :
          <InputDefault
            label="Hora final"
            name="minutes_creation"
            onChange={(value) => setMinutes(Number(value))}
            value={minutes}
            type="number"
            min="0"
            max="59"
            step="1"
            required
          />
        </UserFields>

        <UserFields>
          <div className="selectedUser">
            Usuário selecionado: <strong>Cara da gestão</strong>
          </div>
          <ButtonDefault typeButton="blocked">Alocar usuário</ButtonDefault>
        </UserFields>
      </ScheduleSelectUser>
    </ScheduleWrapper>
  );
}
