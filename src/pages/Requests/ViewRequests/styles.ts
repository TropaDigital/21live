import styled from 'styled-components';

interface OpenCard {
  showInfos: boolean;
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

  min-height: 48px;
  height: ${(props) => (props.showInfos ? 'fit-content' : '48px')};
  overflow: hidden;

  padding: 12px 16px;

  border-radius: 4px;
  border: 1px solid var(--gray-300);
  background: var(--gray-50);
  box-shadow: 3px 3px 6px 0 var(--gray-200);

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

  margin-bottom: 6px;
`;

export const BottomCardInfos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  background: var(--background-primary);
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);

  padding: 12px;
`;

export const BottomCardInfoSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoSideCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .side-title {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-bold);
  }

  .side-info {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
  }
`;

export const BottomCardHistory = styled.div<OpenCard>`
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;

  opacity: ${(props) => (props.showInfos ? '1' : '0')};

  background: var(--background-primary);
  border: 1px solid var(--gray-300);
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 8px;

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);

  span {
    color: var(--gray-400);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
  }
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

export const PublicBottomCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  padding: 24px;
`;

export const PublicMessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const PublicMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;

  .message-user {
    color: var(--gray-900);
    font-weight: var(--weight-bold);
    font-size: var(--text-small-md);
  }

  .message-body {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
  }
`;

export const MessageUser = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

export const MessageResponseDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AvatarUser = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;

  background-repeat: none;
  background-position: center center;
  background-size: contain;
`;

export const ClockTimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 20px;
    height: 20px;
  }

  color: var(--gray-500);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
`;

export const ResponseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  background: none;
  color: var(--secundary-300);
  font-size: var(--text-small-lg);
  font-weight: var(--weight-semibold);

  transition: all 0.3s;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;
