//  React
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { BiLogOut, BiUser } from 'react-icons/bi';
import { FiMenu, FiXCircle } from 'react-icons/fi';
import { IoMdPause } from 'react-icons/io';
import { IconPlay, LogoIcon } from '../../../assets/icons';

// Hooks
import { useAuth } from '../../../hooks/AuthContext';
import { useStopWatch } from '../../../hooks/stopWatch';
import { useToast } from '../../../hooks/toast';

// Styles
import {
  ButtonBurguer,
  ButtonConfigProfile,
  Container,
  HeaderTimerWrapper,
  IconGear,
  ImageProfile,
  Logo,
  PlayPauseButton,
  Profile,
  SectionPopUpHeader,
  SectionProfile,
  StopWatchTimer,
  TaskInfoPlayer
} from './styles';

// Utils
import formatTime from '../../../utils/convertSecondsToHours';

// Services
import api from '../../../services/api';

interface HeaderProps {
  handleOnMenu: () => void;
  modalActive: boolean;
}

export default function Header({ handleOnMenu, modalActive }: HeaderProps) {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { state, start, stop, titleTaskInfos, clockInfos } = useStopWatch();
  const [menuUser, setMenuUser] = useState(false);

  const handlePlayingTime = async (value?: any) => {
    if (clockInfos.delivery_id !== undefined) {
      const taskClock = {
        task_id: clockInfos.task_id,
        delivery_id: clockInfos.delivery_id
      };

      try {
        // setLoading(true);
        const responseClock = await api.post(`/clock`, taskClock);
        // console.log('log do responseClock', responseClock);
        if (responseClock.data.status === 'success' && value === 'toast') {
          addToast({
            title: 'Sucesso',
            type: 'success',
            description: 'Tarefa pausada, para dar ao play novamente entre na tarefa'
          });
        }
        // setLoading(false);
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
        // setLoading(false);
      }
    }

    if (clockInfos.products_delivery_id !== undefined) {
      const taskClock = {
        task_id: clockInfos.task_id,
        products_delivery_id: clockInfos.products_delivery_id
      };

      try {
        // setLoading(true);
        const responseClock = await api.post(`/clock`, taskClock);
        // console.log('log do responseClock', responseClock);
        if (responseClock.data.status === 'success' && value === 'toast') {
          addToast({
            title: 'Sucesso',
            type: 'success',
            description: 'Tarefa pausada, para dar ao play novamente entre na tarefa'
          });
        }
        // setLoading(false);
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
        // setLoading(false);
      }
    }
  };

  const handleStartStop = (value: string) => {
    if (value === 'start') {
      start();
      handlePlayingTime();
    }

    if (value === 'stop') {
      stop();
      handlePlayingTime('toast');
    }
  };

  return (
    <Container>
      <SectionProfile>
        <Logo modalActive={modalActive}>
          <LogoIcon />
          <ButtonBurguer modalActive={modalActive} onClick={handleOnMenu}>
            {modalActive ? <FiMenu /> : <FiXCircle />}
          </ButtonBurguer>
        </Logo>
        {state.elapsedTime !== 0 && state.isRunning && (
          <HeaderTimerWrapper>
            {!state.isRunning && (
              <PlayPauseButton className="stop" onClick={() => handleStartStop('play')}>
                <IconPlay />
              </PlayPauseButton>
            )}

            {state.isRunning && (
              <PlayPauseButton className="play" onClick={() => handleStartStop('stop')}>
                <IoMdPause />
              </PlayPauseButton>
            )}

            {/* <div onClick={reset}>reset</div> */}

            {/* <div
              onClick={() =>
                setInitialTime({
                  isRunning: true,
                  elapsedTime: 120
                })
              }
            >
              time
            </div> */}

            <StopWatchTimer className={state.isRunning ? 'running' : 'stopped'}>
              {formatTime(state.elapsedTime)}
            </StopWatchTimer>

            <TaskInfoPlayer>
              <div className="id-task">#{String(titleTaskInfos.idNumber).padStart(5, '0')}</div>|
              <div className="task-delivery-id">
                {String(titleTaskInfos?.numberTask).padStart(2, '0')} - {titleTaskInfos.titleTask}
              </div>
              |
              <div className="extra-task-infos">
                {titleTaskInfos.client_task} / {titleTaskInfos.typeTask} |{' '}
                {titleTaskInfos.contract_task}
              </div>
            </TaskInfoPlayer>
          </HeaderTimerWrapper>
        )}

        <Profile onClick={() => setMenuUser(!menuUser)}>
          <ButtonConfigProfile>
            <IconGear />
          </ButtonConfigProfile>
          <h2>{user.name}</h2>
          <ImageProfile onClick={() => setMenuUser(!menuUser)}>
            {user.avatar ? (
              <img src={user.avatar} alt="profile" />
            ) : (
              <BiUser size={26} color="#fff" />
            )}
          </ImageProfile>
        </Profile>
      </SectionProfile>
      <SectionPopUpHeader menuUser={menuUser}>
        <ul>
          <li>
            <button
              onClick={() => {
                navigate('/perfil');
                setMenuUser(false);
              }}
            >
              <BiUser size={24} color="#6C757D" />
              Meu perfil
            </button>
          </li>
          <li>
            <button onClick={signOut}>
              <BiLogOut size={24} color="#6C757D" />
              Sair
            </button>
          </li>
        </ul>
      </SectionPopUpHeader>
    </Container>
  );
}
