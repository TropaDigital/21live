import styled from 'styled-components';

export const CardWellcomeDash = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  position: relative;

  .infoCardWellcome {
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 4px;

    h1 {
      font-size: var(--text-headline-sm);
      font-weight: var(--weight-semibold);
      color: var(--gray-900);
      line-height: 32px;
    }

    span {
      font-size: var(--text-small-md);
      font-weight: var(--weight-regular);
      color: var(--gray-500);
    }
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FilterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
