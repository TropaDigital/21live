/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

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
  console.log('log do dataTime', dataTime);
  const [playPause, setPlayPause] = useState<string>('stop');

  return (
    <CardWrapper cardSize={cardType}>
      <CardTitle>{cardTitle}</CardTitle>
      {cardType === 'text' && <TextCard>{dataText}</TextCard>}
      {cardType === 'time' && (
        <>
          <PlayTimer>
            <PlayPauseButton
              onClick={() => setPlayPause(playPause === 'play' ? 'stop' : 'play')}
              className={playPause}
            >
              {playPause === 'play' ? <IoMdPause /> : <IconPlay />}
            </PlayPauseButton>
            <StopWatchTimer className={playPause !== 'play' ? 'stopped' : 'running'}>
              00:00:00
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
