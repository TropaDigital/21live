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
