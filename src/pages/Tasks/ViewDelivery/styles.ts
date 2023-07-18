import styled from 'styled-components';

interface HideCardProps {
  hideCard: string;
}

export const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  overflow: hidden;
`;

export const CardsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 0 40px;
`;

export const ShowInfosButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  position: absolute;
  top: 42%;
  right: 15px;

  border-radius: 50%;
  background-color: transparent;

  transition: all 0.5s;

  svg {
    path {
      fill: var(--primary-200);
    }
  }

  &:hover {
    background-color: var(--primary);
    transform: scale(1.2);
    right: 25px;

    svg {
      path {
        fill: var(--gray-200);
      }
    }
  }
`;

export const RightInfosCard = styled.div<HideCardProps>`
  display: flex;
  flex-direction: column;
  width: 352px;
  height: 100vh;
  background: var(--background-primary);
  overflow-y: auto;
  padding: 24px;
  transition: all 0.7s;

  position: absolute;
  top: 0;
  right: ${({ hideCard }) => (hideCard === 'show' ? '0' : '-352px')};

  z-index: 2;
  box-shadow: -4px 5px 10px 1px rgba(0, 0, 0, 0.2);

  cursor: pointer;
`;

export const RightInfosTitle = styled.div`
  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
`;

export const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TasksInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TaskInfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

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
