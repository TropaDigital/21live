/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const ModalShowTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Flag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }

  &.flagged {
    svg {
      path {
        fill: #f04438;
      }
    }
  }
`;

export const StatusTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;
  width: fit-content;
  border-radius: 35px;
  background: var(--warning-100);

  color: var(--warning-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);

  &.progress {
    color: var(--primary-700);
    background: var(--primary-050);
  }

  &.finished {
    color: var(--secundary-700);
    background: var(--secundary-100);
  }
`;

export const FilterTasks = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
