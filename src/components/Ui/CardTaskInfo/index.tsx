/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect } from 'react';

// Icons
import { IconClose, IconPlay } from '../../../assets/icons';
import { IoMdPause } from 'react-icons/io';

// Styles
import {
  CardInfo,
  CardInfoField,
  CardTitle,
  CardWrapper,
  EstimatedTime,
  ModalTextCard,
  PlayPauseButton,
  PlayTimer,
  StopWatchTimer,
  TextCard
} from './styles';

// Components
import ModalDefault from '../ModalDefault';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/AuthContext';

interface CardTaskInfoProps {
  cardTitle: string;
  cardType: 'text' | 'info';
  dataText?: string | any;
  dataTime?: any;
  dataInfos?: DataInfosProps;
  dataClock?: any;
  isPlayingTime: () => void;
  taskIsFinished?: boolean;
}

interface DataInfosProps {
  estimatedTime: string;
  responsible: string;
  stage: string;
  flow: string;
  priority: string;
  startDate: string;
  endDate: string;
}

export default function CardTaskInfo({
  cardTitle,
  cardType,
  dataText,
  dataInfos,
  dataTime,
  dataClock,
  isPlayingTime,
  taskIsFinished
}: CardTaskInfoProps) {
  // const [time, setTime] = useState<number>(0);
  // const [timerOn, setTimerOn] = useState<boolean>(false);
  const [modalContext, setModalContext] = useState<boolean>(false);

  // const [startTime, setStartTime] = useState<number | null>(null);
  // const [elapsedTime, setElapsedTime] = useState<number>(0);
  // const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const savedElapsedTime = localStorage.getItem('elapsedTime');
  //   if (savedElapsedTime !== '0') {
  //     setElapsedTime(Number(savedElapsedTime));
  //     // setStartTime(Date.now());
  //     // isPlayingTime(true);
  //   }
  // }, []);

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

  //   // Save elapsed time to local storage whenever it changes
  //   localStorage.setItem('elapsedTime', String(elapsedTime));

  //   return () => {
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [startTime, elapsedTime]);

  // const handleStartStop = () => {
  //   if (startTime === null) {
  //     setStartTime(Date.now());
  //     // isPlayingTime();
  //   } else {
  //     setStartTime(null);
  //     // isPlayingTime();
  //   }
  // };

  // const handleReset = () => {
  //   setStartTime(null);
  //   setElapsedTime(0);
  //   localStorage.removeItem('elapsedTime');
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
  //   let interval: any = null;

  //   if (timerOn) {
  //     isPlayingTime(true);
  //     interval = setInterval(() => {
  //       setTime((prevTime) => prevTime + 10);
  //     }, 10);
  //   } else {
  //     isPlayingTime(false);
  //     clearInterval(interval);
  //   }

  //   return () => clearInterval(interval);
  // }, [timerOn]);

  // Function to get diff time
  // useEffect(() => {
  //   const x = moment(Date.now());
  //   const y = moment(Number(localStorage.getItem('playStart')));
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

  //   console.log('log do duration', convertMsToTime(Milliseconds));
  // }, [timerOn]);

  // useEffect(() => {
  //   console.log('log do time', time);
  // }, [time]);

  return (
    <>
      <CardWrapper cardSize={cardType}>
        <CardTitle>{cardTitle}</CardTitle>
        {cardType === 'text' && (
          <TextCard>
            <div dangerouslySetInnerHTML={{ __html: dataText }} />
            <div className="infos" onClick={() => setModalContext(!modalContext)}>
              Saiba mais
            </div>
          </TextCard>
        )}
        {/* {cardType === 'time' && (
          <>
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
              </StopWatchTimer>
            </PlayTimer>
            <EstimatedTime>
              Tempo estimado: <span>{dataTime}</span>
            </EstimatedTime>
          </>
        )} */}
        {cardType === 'info' && (
          <CardInfo>
            <CardInfoField>
              <div className="info-title">Tempo estimado</div>
              <div className="info-description">{dataInfos?.estimatedTime}</div>
            </CardInfoField>
            <CardInfoField>
              <div className="info-title">Responsável:</div>
              <div className="info-description">{dataInfos?.responsible}</div>
            </CardInfoField>
            <CardInfoField>
              <div className="info-title">Etapa:</div>
              <div className="info-description">{dataInfos?.stage}</div>
            </CardInfoField>
            <CardInfoField>
              <div className="info-title">Fluxo:</div>
              <div className="info-description">{dataInfos?.flow}</div>
            </CardInfoField>
            <CardInfoField>
              <div className="info-title">Prioridade:</div>
              <div className="info-description">{dataInfos?.priority}</div>
            </CardInfoField>
            <CardInfoField>
              <div className="info-title">Data inicial:</div>
              <div className="info-description">{dataInfos?.startDate}</div>
            </CardInfoField>
            <CardInfoField>
              <div className="info-title">Data final:</div>
              <div className="info-description">{dataInfos?.endDate}</div>
            </CardInfoField>
          </CardInfo>
        )}
      </CardWrapper>

      <ModalDefault
        isOpen={modalContext}
        title="Contexto geral"
        onOpenChange={() => setModalContext(false)}
      >
        <ModalTextCard>
          <div className="close" onClick={() => setModalContext(false)}>
            <IconClose />
          </div>
          <div dangerouslySetInnerHTML={{ __html: dataText }} />
        </ModalTextCard>
      </ModalDefault>
    </>
  );
}
