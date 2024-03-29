import styled from 'styled-components';

interface CardProps {
  cardSize: string;
}

export const CardWrapper = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  min-width: 264px;
  width: ${({ cardSize }) => (cardSize !== 'time' ? '100%' : '264px')};
  height: 198px;

  background: var(--background-primary);
  border: 1px solid var(--gray-200);
  border-radius: 12px;

  padding: 24px;
`;

export const CardTitle = styled.div`
  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
  line-height: 30px;
`;

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

export const CardInfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  font-size: var(--text-small-md);

  .info-title {
    color: var(--gray-500);
    font-weight: var(--weight-regular);
  }

  .info-description {
    color: var(--gray-900);
    font-weight: var(--weight-semibold);
  }
`;

export const PlayTimer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PlayPauseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  padding: 4px;

  border-radius: 4px;

  transition: ease-in-out 0.3s;

  cursor: pointer;

  &.play {
    background-color: var(--success-500);
  }

  &.stop {
    background-color: var(--primary);
  }

  svg {
    path {
      fill: var(--light);
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const StopWatchTimer = styled.div`
  display: flex;
  align-items: center;
  width: 92px;
  height: 32px;

  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);

  &.stopped {
    color: var(--primary);
  }

  &.running {
    color: var(--success-500);
  }
`;

export const EstimatedTime = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;

  color: var(--gray-500);
  font-size: var(--text-small-md);
  font-weight: var(--weight-medium);

  span {
    color: var(--gray-900);
    font-weight: var(--weight-bold);
  }
`;

export const TextCard = styled.div`
  height: 80px;
  overflow: hidden;

  color: var(--gray-500);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
  line-height: 24px;
  position: relative;

  .infos {
    color: var(--primary);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);
    text-decoration: underline;

    cursor: pointer;
    background: var(--background-primary);
    padding: 0 4px;

    position: absolute;
    bottom: -2px;
    right: 0;
  }
`;

export const ModalTextCard = styled.div`
  min-width: 220px;
  color: var(--gray-500);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
  line-height: 24px;
  text-align: justify;
  padding: 20px;
  position: relative;

  .close {
    position: absolute;
    top: -36px;
    right: 0;
    transition: all 0.5s;

    cursor: pointer;

    svg {
      path {
        stroke: var(--gray-500);
      }
    }

    &:hover {
      transform: scale(1.3);
      svg {
        path {
          stroke: var(--Danger);
        }
      }
    }
  }
`;
