import styled from 'styled-components';

export const SummaryWrapper = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
`;

export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  border: 1px solid var(--gray-200);
  border-radius: 8px;

  overflow: hidden;

  &.big {
    max-width: 712px;
  }

  .title {
    background: var(--gray-50);
    border-bottom: 1px solid var(--gray-200);
    width: 100%;
    height: 60px;

    color: var(--gray-500);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-medium);

    padding: 16px 24px;
    text-align: left;

    &.small {
      height: 56px;
    }
  }
`;

export const SummaryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 110px;

  padding: 24px;
  background: var(--background-primary);
  border-bottom: 1px solid var(--gray-200);
`;

export const SummaryCardTitle = styled.h3`
  color: var(--gray-600);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-bold);
  line-height: 30px;
  text-transform: uppercase;
`;

export const SummaryCardSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  color: var(--gray-500);
  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);
  line-height: 24px;
`;

export const SummaryTasksInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 526px;
  background: var(--background-primary);
  border: 1px solid var(--gray-200);
  border-radius: 13px;

  padding: 40px;

  .title {
    color: var(--gray-700);
    font-size: var(--text-headline-sm);
    font-weight: var(--weight-semibold);
  }

  .item-hours {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--gray-700);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-medium);
  }
`;

export const SummaryButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: fit-content;
`;
