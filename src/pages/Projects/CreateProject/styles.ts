import styled from 'styled-components';

export const Container = styled.div``;

export const FormWrapper = styled.div`
  padding: 40px 30px;

  .label-observation {
    .label {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        color: var(--gray-700);
        font-size: var(--text-small-sm);
        font-weight: var(--weight-medium);
        margin-bottom: 6px;
      }

      span {
        color: var(--input-error);
        font-size: var(--text-small-sm);
        font-weight: var(--weight-medium);
        margin-bottom: 6px;
      }
    }

    &.error {
      border: 1px solid var(--input-error);
      border-radius: 4px;
      padding: 4px 8px;
    }
  }

  .flex-title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const FormTitle = styled.h2`
  color: var(--title-color);
  font-size: var(--text-headline-sm);
  font-weight: var(--weight-bold);

  margin-bottom: 24px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 30px;
  background: var(--background-primary);
  position: absolute;
  bottom: 0;
  width: 100%;

  border-left: 2px solid var(--gray-200);

  .fieldGroup {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

export const EmailButton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  height: 24px;
  background: transparent;

  color: var(--primary);
  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);
  text-underline-offset: 2px;
`;

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

  &.small {
    max-width: 100%;
  }

  &.big {
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

export const SummaryContractCard = styled.div`
  width: 100%;
  height: 70px;
  padding: 20px 24px;

  .products {
    color: var(--gray-700);
    font-size: var(--text-small-xl);
    font-weight: var(--weight-semibold);
    line-height: 30px;
  }

  .hours {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--gray-700);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-medium);
    line-height: 28px;

    strong {
      font-weight: var(--weight-semibold);
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--gray-700);
    font-size: var(--text-headline-sm);
    font-weight: var(--weight-bold);
    line-height: 32px;
  }
`;

export const FinishModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* padding: 24px; */
  background: var(--background-primary);
  border-radius: 12px;
`;

export const FinishModalMessage = styled.div`
  .modal-title {
    color: var(--gray-900);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-semibold);
    line-height: 28px;
  }

  .modal-subtitle {
    color: var(--gray-500);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
    line-height: 20px;
  }
`;

export const FinishModalButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;

  button {
    width: 100%;
  }
`;

export const FinishButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
