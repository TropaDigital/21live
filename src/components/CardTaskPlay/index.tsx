// React
import { useState, useEffect } from 'react';

import {
  CardTitle,
  CardWrapper,
  EstimatedTime,
  PlayPauseButton,
  PlayTimer,
  StopWatchTimer
} from './styles';
import { IconPlay } from '../../assets/icons';
import { IoMdPause } from 'react-icons/io';

interface CardTaskPlayProps {
  cardTitle: string;
  dataTime?: any;
  isPlayingTime: () => void;
  taskIsFinished?: boolean;
  elapsedTimeBack?: any;
  stopThePlay: any;
  blockPlay: boolean;
}

export default function CardTaskPlay({
  dataTime,
  cardTitle,
  elapsedTimeBack,
  taskIsFinished,
  stopThePlay,
  blockPlay,
  isPlayingTime
}: CardTaskPlayProps) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (elapsedTimeBack !== 0 && elapsedTimeBack !== undefined && stopThePlay) {
      setElapsedTime(elapsedTimeBack);
      setStartTime(Date.now());
      // isPlayingTime(true);
    } else {
      setElapsedTime(elapsedTimeBack);
    }
  }, [elapsedTimeBack, stopThePlay]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (startTime !== null && !taskIsFinished) {
      intervalId = setInterval(() => {
        const now = Date.now();
        setElapsedTime((prevElapsedTime) => prevElapsedTime + now - startTime);
        setStartTime(now);
      }, 1000);
    } else {
      setStartTime(null);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [startTime, elapsedTime, taskIsFinished]);

  const handleStartStop = () => {
    if (!blockPlay) {
      if (startTime === null) {
        setStartTime(Date.now());
        isPlayingTime();
      } else {
        setStartTime(null);
        isPlayingTime();
      }
    }
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
  };

  return (
    <CardWrapper>
      <CardTitle>{cardTitle}</CardTitle>
      <PlayTimer>
        {startTime === null && (
          <PlayPauseButton onClick={handleStartStop} className="stop">
            <IconPlay />
          </PlayPauseButton>
        )}
        {startTime !== null && (
          <PlayPauseButton onClick={handleStartStop} className="play">
            <IoMdPause />
          </PlayPauseButton>
        )}
        <StopWatchTimer className={!startTime ? 'stopped' : 'running'}>
          {formatTime(elapsedTime)}
          {/* {('0' + Math.floor((time / 3600000) % 60)).slice(-2)}:
                {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
                {('0' + Math.floor((time / 1000) % 60)).slice(-2)} */}
          {/* Milémisimos de segundos */}
          {/* {('0' + Math.floor((time / 10) % 100)).slice(-2)} */}
        </StopWatchTimer>
      </PlayTimer>
      <EstimatedTime>
        Tempo estimado: <span>{dataTime}</span>
      </EstimatedTime>
    </CardWrapper>
  );
}
