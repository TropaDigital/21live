import styled from 'styled-components';

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  min-width: 264px;
  width: '264px';

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
