/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect } from 'react';

// Icons
import { IconPlay } from '../../../assets/icons';

// Styles
import {
  CardInfo,
  CardInfoField,
  CardTitle,
  CardWrapper,
  EstimatedTime,
  PlayPauseButton,
  PlayTimer,
  StopWatchTimer,
  TextCard
} from './styles';
import { IoMdPause } from 'react-icons/io';

interface CardTaskInfoProps {
  cardTitle: string;
  cardType: 'text' | 'time' | 'info';
  dataText?: string;
  dataTime?: any;
  dataInfos?: DataInfosProps;
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
  dataTime
}: CardTaskInfoProps) {
  // console.log('log do dataTime', dataTime);
  const [time, setTime] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <CardWrapper cardSize={cardType}>
      <CardTitle>{cardTitle}</CardTitle>
      {cardType === 'text' && <TextCard>{dataText}</TextCard>}
      {cardType === 'time' && (
        <>
          <PlayTimer>
            {!timerOn && (
              <PlayPauseButton
                onClick={() => {
                  setTimerOn(true);
                }}
                className="stop"
              >
                <IconPlay />
              </PlayPauseButton>
            )}
            {timerOn && (
              <PlayPauseButton
                onClick={() => {
                  setTimerOn(false);
                }}
                className="play"
              >
                <IoMdPause />
              </PlayPauseButton>
            )}
            <StopWatchTimer className={!timerOn ? 'stopped' : 'running'}>
              {('0' + Math.floor((time / 3600000) % 60)).slice(-2)}:
              {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
              {('0' + Math.floor((time / 1000) % 60)).slice(-2)}
              {/* Milémisimos de segundos */}
              {/* {('0' + Math.floor((time / 10) % 100)).slice(-2)} */}
            </StopWatchTimer>
          </PlayTimer>
          <EstimatedTime>
            Tempo estimado: <span>00:30:00</span>
          </EstimatedTime>
        </>
      )}
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
  );
}
