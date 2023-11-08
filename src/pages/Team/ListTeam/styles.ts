import styled from 'styled-components';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 430px;
`;

export const ModalSubtitle = styled.div`
  width: 398px;
  height: 40px;

  color: var(--gray-600);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-regular);
`;

export const TabsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 36px;

  border-bottom: 1px solid var(--gray-200);
`;

export const SelectedTab = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;

  width: fit-content;
  height: 100%;
  background: transparent;
  border-bottom: 1px solid transparent;

  color: var(--gray-500);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-semibold);

  transition: all 0.3s;

  svg {
    width: 16px;
    height: 16px;
    path {
      stroke: var(--gray-500);
    }
  }

  &:hover,
  &.active {
    color: var(--primary-900);
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--primary-900);

    svg {
      path {
        stroke: var(--primary-900);
      }
    }
  }

  .notification {
    width: 5px;
    height: 5px;
    background-color: var(--error-500);
    border-radius: 100%;
  }
`;

export const CardsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardWorkPause = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;

  border-radius: 8px;
  border: 1px solid var(--gray-300);
  background: var(--background-primary);

  &.selected {
    border-color: var(--primary);
  }
`;

export const CardTitleCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  color: var(--gray-800);
  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);
  text-transform: capitalize;

  .trash-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export const CardHours = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  width: 100%;
`;

export const DivHour = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  width: 100%;

  color: var(--gray-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);

  .react-time-picker {
    width: 100%;
    .react-time-picker__wrapper {
      display: flex;
      flex-grow: 1;
      flex-shrink: 0;
      border: 1px solid var(--gray-300);
      border-radius: 4px;
    }

    .react-time-picker__inputGroup {
      min-width: calc((4px * 3) + 0.54em * 6 + 0.217em * 2);
      flex-grow: 1;
      padding: 10px 14px;
      box-sizing: content-box;
    }
  }
`;

export const BreakName = styled.div`
  display: flex;
  align-items: center;

  height: fit-content;

  cursor: pointer;
`;

export const ChangeNameField = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  width: 100%;
  margin-right: 12px;
`;

export const ModalButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;
