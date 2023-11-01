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
    min-width: 712px;
    max-width: 792px;
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

    display: flex;
    align-items: center;
    justify-content: space-between;

    &.small {
      height: 56px;
    }
  }

  &.hidden {
    display: none;
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
  font-weight: var(--weight-medium);
  line-height: 24px;
  text-transform: capitalize;

  .description-wrap {
    max-width: 270px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-weight: var(--weight-semibold);
    color: var(--gray-900);
  }
`;

export const SummaryTasksAbout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 526px;
  height: fit-content;
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

    .negative {
      color: var(--Danger);
    }
  }

  .splitter {
    height: 1px;
    background-color: var(--gray-200);
  }
`;

export const SummaryButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: fit-content;
`;

export const SummaryInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: var(--background-primary);
  width: 100%;
  padding: 24px;
`;

export const SummaryTaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 24px;
  height: fit-content;

  .title-info {
    color: var(--gray-600);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
    line-height: 24px;
  }

  .info {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
    line-height: 24px;
    text-transform: uppercase;
  }
`;

export const SummaryTaskDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .description-title {
    color: var(--gray-600);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
    line-height: 24px;
  }

  .description-info {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
    line-height: 24px;
  }
`;

export const DeliveriesWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

export const DeliveriesTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 60px;
  background-color: var(--gray-100);
  border: 1px solid var(--gray-400);

  color: var(--gray-500);
  font-size: var(--text-small-lg);
  font-weight: var(--weight-medium);
`;

export const CreateTicketOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
