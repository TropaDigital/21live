import styled from 'styled-components';

interface OpenCard {
  height: boolean;
}

export const ViewRequestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 30px;
`;

export const RequestInfosCard = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: 1px solid var(--gray-300);
  background: var(--background-primary);
`;

export const RequestInfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  border-bottom: 1px solid var(--gray-300);

  padding: 12px 24px;

  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
`;

export const RequestInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px;
`;

export const RequestInfosTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .request-name {
    display: flex;
    align-items: center;
    gap: 4px;

    color: var(--gray-800);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);

    span {
      color: var(--gray-500);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
    }
  }

  .request-status {
    display: flex;
    align-items: center;
    gap: 8px;

    color: var(--gray-800);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);

    .status {
      display: flex;
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
    }
  }

  .request-date {
    display: flex;
    align-items: center;
    gap: 4px;

    color: var(--gray-800);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);

    span {
      color: var(--gray-800);
      font-size: var(--text-small-md);
      font-weight: var(--weight-regular);
    }
  }
`;

export const RequestBottomCard = styled.div<OpenCard>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  height: ${(props) => (props.height ? '48px' : 'fit-content')};

  padding: 12px 16px;

  border-radius: 4px;
  border: 1px solid var(--gray-200);
  background: var(--gray-50);

  cursor: pointer;
`;

export const BottomCardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);
`;

export const PublicInteraction = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: 1px solid var(--gray-300);
  background: var(--background-primary);
`;

export const PublicTopCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-300);

  padding: 12px 24px;

  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
`;
