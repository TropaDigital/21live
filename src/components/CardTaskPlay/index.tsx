/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect } from 'react';

// Styles
import {
  CardTitle,
  CardWrapper,
  EstimatedTime,
  PlayPauseButton,
  PlayTimer,
  StopWatchTimer
} from './styles';

// Icons
import { IconPlay } from '../../assets/icons';
import { IoMdPause } from 'react-icons/io';

// Utils
import formatTime from '../../utils/convertSecondsToHours';

// Hooks
import { useStopWatch } from '../../hooks/stopWatch';
import { useToast } from '../../hooks/toast';
import { useParamsHook } from '../../hooks/useParams';

interface CardTaskPlayProps {
  cardTitle: string;
  dataTime?: DataTimeProps;
  blockPlay: boolean;
  handlePlay: (value: any) => void;
}

interface DataTimeProps {
  time_essay: string;
  time_creation: string;
}

export default function CardTaskPlay({
  dataTime,
  cardTitle,
  blockPlay,
  handlePlay
}: CardTaskPlayProps) {
  const { state, start, stop } = useStopWatch();
  const { addToast } = useToast();
  const { parameters, getParams } = useParamsHook();
  // const [startTime, setStartTime] = useState<number | null>(null);
  // const [elapsedTime, setElapsedTime] = useState<number>(0);

  // useEffect(() => {
  //   if (elapsedTimeBack !== 0 && elapsedTimeBack !== undefined && stopThePlay) {
  //     setElapsedTime(elapsedTimeBack);
  //     setStartTime(Date.now());
  //     // isPlayingTime(true);
  //   } else {
  //     setElapsedTime(elapsedTimeBack);
  //   }
  // }, [elapsedTimeBack, stopThePlay]);

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;

  //   if (startTime !== null && !taskIsFinished) {
  //     intervalId = setInterval(() => {
  //       const now = Date.now();
  //       setElapsedTime((prevElapsedTime) => prevElapsedTime + now - startTime);
  //       setStartTime(now);
  //     }, 1000);
  //   } else {
  //     setStartTime(null);
  //   }

  //   return () => {
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [startTime, elapsedTime, taskIsFinished]);

  // const handleStartStop = () => {
  //   if (!blockPlay) {
  //     if (startTime === null) {
  //       setStartTime(Date.now());
  //       isPlayingTime();
  //     } else {
  //       setStartTime(null);
  //       isPlayingTime();
  //     }
  //   }
  // };

  // const formatTime = (time: number): string => {
  //   const hours = Math.floor(time / 3600000);
  //   const minutes = Math.floor((time % 3600000) / 60000);
  //   const seconds = Math.floor((time % 60000) / 1000);

  //   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
  //     seconds
  //   ).padStart(2, '0')}`;
  // };

  // useEffect(() => {
  //   console.log('log do dataTime =>', dataTime);
  // }, [dataTime]);

  useEffect(() => {
    getParams();
  }, []);

  const handlePassPlayProps = (value: any) => {
    if (value === 'play' && !blockPlay) {
      start();
      handlePlay('play');
    }
    if (value === 'stop') {
      stop();
      handlePlay('stop');
    }

    if (blockPlay && cardTitle === 'Atividade concluída') {
      addToast({
        title: 'Atenção',
        type: 'warning',
        description: 'Atividade concluída'
      });
    }

    if (blockPlay && cardTitle !== 'Atividade concluída') {
      addToast({
        title: 'Atenção',
        type: 'warning',
        description: 'Esta ação não pode ser executada nesse local'
      });
      // O play pode ter sido dado por entrega ou para dar play por produto é necessário dar o play dentro do produto escolhido
    }
  };

  return (
    <CardWrapper>
      <CardTitle>{cardTitle}</CardTitle>
      <PlayTimer>
        {!state.isRunning && (
          <PlayPauseButton onClick={() => handlePassPlayProps('play')} className="stop">
            <IconPlay />
          </PlayPauseButton>
        )}
        {state.isRunning && (
          <PlayPauseButton onClick={() => handlePassPlayProps('stop')} className="play">
            <IoMdPause />
          </PlayPauseButton>
        )}
        <StopWatchTimer className={state.isRunning ? 'running' : 'stopped'}>
          {formatTime(state.elapsedTime)}
        </StopWatchTimer>
      </PlayTimer>
      <EstimatedTime>
        Tempo {parameters?.input_name}:{' '}
        <span>{dataTime?.time_essay !== '' ? dataTime?.time_essay : 'Livre'}</span>
      </EstimatedTime>
      <EstimatedTime>
        Tempo estimado:{' '}
        <span>{dataTime?.time_creation !== '' ? dataTime?.time_creation : 'Livre'}</span>
      </EstimatedTime>
    </CardWrapper>
  );
}
