import styled from 'styled-components';

interface CardProps {
  cardSize: string;
}

export const CardWrapper = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: ${({ cardSize }) => (cardSize !== 'time' ? '100%' : '264px')};
  height: 150px;

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

  padding: 24px;
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
