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

interface CardTaskInfoProps {
  cardTitle: string;
  cardType: 'text' | 'time' | 'info';
  dataText?: string;
  dataTime?: any;
  dataInfos?: DataInfosProps;
  isPlayingTime: (value: any) => void;
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
  isPlayingTime
}: CardTaskInfoProps) {
  const [time, setTime] = useState<number>(0);
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [modalContext, setModalContext] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;

    if (timerOn) {
      isPlayingTime(true);
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      isPlayingTime(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  return (
    <>
      <CardWrapper cardSize={cardType}>
        <CardTitle>{cardTitle}</CardTitle>
        {cardType === 'text' && (
          <TextCard>
            {dataText}
            <div className="infos" onClick={() => setModalContext(!modalContext)}>
              Saiba mais
            </div>
          </TextCard>
        )}
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
              Tempo estimado: <span>{dataTime}</span>
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

      <ModalDefault
        isOpen={modalContext}
        title="Contexto geral"
        onOpenChange={() => setModalContext(false)}
      >
        <ModalTextCard>
          {dataText}
          <div className="close" onClick={() => setModalContext(false)}>
            <IconClose />
          </div>
        </ModalTextCard>
      </ModalDefault>
    </>
  );
}
