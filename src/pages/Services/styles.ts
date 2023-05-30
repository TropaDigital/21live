/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div``;

export const EstimatedTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;

  span {
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    color: var(--gray-700);
  }
`;

export const EstimatedTimeInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 220px;
`;

export const ModalProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .info {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 24px;

    color: var(--gray-500);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
    
    span {
      color: var(--gray-700);
      font-size: var(--text-small-md);
      font-weight: var(--weight-semibold);
    }
  }
`;
