import styled from 'styled-components';

interface HideCardProps {
  hideCard: string;
}

export const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  height: 100vh;
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

  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--gray-900);
  &::-webkit-scrollbar {
    width: 8px;
    background: #e2e2e2;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: #86848d;
    border-radius: 12px;
  }
`;

export const ArrowSection = styled.div`
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translateY(-50%);

  cursor: pointer;

  svg {
    path {
      fill: var(--gray-400);
    }
  }

  .hide {
    display: block;
    position: absolute;
    top: -50px;
    right: 20px;
    opacity: 0;
    transition: all 0.3s;

    color: var(--gray-400);
    text-orientation: upright;
    writing-mode: vertical-rl;
  }

  &:hover {
    .hide {
      opacity: 1;
    }
  }
`;

export const RightInfosTitle = styled.div`
  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
`;

export const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-bottom: 40px;

  position: relative;

  .hide-menu {
    position: absolute;
    top: 5px;
    right: 0;
    cursor: pointer;
  }
`;

export const TimelineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: var(--text-small-sm);

  .info-title {
    color: var(--gray-500);
    font-weight: var(--weight-regular);
  }

  .timeline-info {
    color: var(--gray-900);
    font-weight: var(--weight-medium);
  }
`;

export const TimeLineIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;

  width: 32px;
  height: 32px;

  border-radius: 50px;
  background: var(--gray-200);

  &.checked {
    background: var(--success-600);
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--background-primary);
  }

  &::after {
    content: '';
    border-left: 4px solid var(--gray-200);
    height: 25px;
    position: absolute;
    bottom: 0;
    left: 14px;
    margin-bottom: -25px;
    z-index: 0;
  }
`;

export const TimelineStep = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;

  padding: 4px 0;

  &:last-child {
    ${TimeLineIcon} {
      &::after {
        content: '';
        border: none;
        height: 0;
      }
    }
  }
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

export const ModalWrapperList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  position: relative;

  .close-button {
    display: flex;
    align-items: center;
    position: absolute;
    top: -40px;
    right: 0;
    transition: all 0.3s;

    cursor: pointer;

    svg {
      width: 32px;
      height: 32px;
      path {
        stroke: var(--gray-600);
      }
    }

    &:hover {
      transform: scale(1.3);

      svg {
        path {
          stroke: var(--Danger);
        }
      }
    }
  }
`;

export const ModalSubtitle = styled.span`
  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
  margin-top: 8px;
`;

export const ModalList = styled.div`
  display: flex;
  flex-direction: column;
  width: 658px;
  height: fit-content;
  max-height: 472px;
  border: 1px solid var(--gray-300);
  border-radius: 12px;

  overflow: auto;
`;

export const ModalSearch = styled.div`
  height: 68px;
  padding: 12px 16px;
`;

export const ModalTable = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  table {
    width: 100%;
    border-spacing: 0;

    tfoot {
      td {
        padding: 0 1rem;
        border-bottom: none;
      }
    }

    th {
      background-color: var(--gray-50);
      border-bottom: 1px solid var(--gray-300);
      /* border-radius: 5px; */
      text-transform: capitalize;
      font-size: var(--text-small-xs);
      font-weight: var(--weight-medium);
      color: var(--gray-500);
      padding: 0.75rem 1.5rem;
      text-align: left;
      line-height: 20px;
    }

    td {
      height: 72px;
      max-height: 72px;
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      color: var(--gray-900);
      padding: 0 1.5rem;
      background: #ffffff;
      /* border-radius: 5px; */
      border-bottom: 1px solid #eaecf0;
      text-align: left;

      transition: all 0.3s;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 38ch;

      .check-name {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
      }
    }

    .column {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;

      &.info {
        color: var(--gray-900);
        font-size: var(--text-small-md);
        font-weight: var(--weight-medium);
      }

      span {
        color: var(--gray-500);
        font-size: var(--text-small-sm);
        font-weight: var(--weight-medium);
      }
    }

    .status {
      display: flex;
      justify-content: center;
      align-items: center;

      margin: 0 auto;
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

    tbody > tr {
      &.selected {
        td {
          background: var(--primary-050);
        }
      }

      &:hover {
        td {
          background-color: var(--primary-025);
        }
      }
    }
  }

  /* @media (max-width: 1600px) {
    table {
      td {
        padding: 0 1rem;
      }
    }
  } */
`;

export const ModalButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;
