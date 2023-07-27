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

interface CardTaskInfoProps {
  cardTitle: string;
  cardType: 'text' | 'time' | 'info';
  dataText?: string | any;
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

  // Function to get diff time
  useEffect(() => {
    const x = moment(Date.now());
    const y = moment(localStorage.getItem('playStart'));
    const duration = moment.duration(x.diff(y));
    const Milliseconds = duration.asMilliseconds();

    function padTo2Digits(num: any) {
      return num.toString().padStart(2, '0');
    }

    function convertMsToTime(milliseconds: any) {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      seconds = seconds % 60;
      minutes = minutes % 60;

      return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    }

    console.log('log do duration', convertMsToTime(Milliseconds));
  }, []);

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
        {cardType === 'time' && (
          <>
            <PlayTimer>
              {!timerOn && (
                <PlayPauseButton
                  onClick={() => {
                    setTimerOn(true);
                    localStorage.setItem('playStart', JSON.stringify(Date.now()));
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
                    localStorage.setItem('pausePlay', JSON.stringify(Date.now()));
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
          <div className="close" onClick={() => setModalContext(false)}>
            <IconClose />
          </div>
          <div dangerouslySetInnerHTML={{ __html: dataText }} />
        </ModalTextCard>
      </ModalDefault>
    </>
  );
}
