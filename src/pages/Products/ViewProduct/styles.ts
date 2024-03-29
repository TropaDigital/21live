import styled from 'styled-components';

interface HideCardProps {
  hideCard: string;
}

export const DeliveryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  min-height: 100vh;
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
  z-index: 4;

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

  z-index: 5;
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
    transition: all 0.3s;
    color: var(--gray-600);
  }

  &:hover {
    svg {
      transform: scale(1.8);
      color: var(--Danger);
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
  width: 90%;
  cursor: default;

  position: relative;

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

  min-width: 32px;
  min-height: 32px;

  border-radius: 50px;
  background: var(--gray-200);

  &.actual {
    background: var(--warning-400);
  }

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

export const TimelineExtraInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  padding: 6px;
  background-color: var(--gray-50);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  opacity: 0;

  position: absolute;
  top: -10px;
  left: 0;
  margin-top: 15px;
  margin-left: -5px;

  transition: all 0.3s;

  ${TimelineInfo}:hover & {
    opacity: 1;
    top: 5px;
  }

  z-index: 3;
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
    text-transform: capitalize;

    &.urgent {
      color: var(--Danger);
    }
  }

  .update-date {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const ModalUploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .modal-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
  }

  .confirmation {
    color: var(--title-color);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-semibold);

    span {
      color: var(--Warning);
    }
  }
`;

export const ModalReturnFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 500px;
  margin-top: 24px;

  .modal-buttons {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
  }
`;

export const ModalProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SelectProductField = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

export const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  color: var(--title-color);
  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);
`;

export const FileProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  margin-top: 24px;

  .title-list {
    color: var(--title-color);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
  }
`;

export const FileProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  min-width: fit-content;
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
  margin-bottom: 0;

  table {
    td {
      padding: 0.5rem 1rem;
    }
  }

  .confirmation {
    color: var(--title-color);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-semibold);
    padding: 24px;

    span {
      color: var(--Warning);
    }
  }
`;

export const FilePreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 400px;

  margin: 0 auto;

  border-radius: 12px;

  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;

  .close-button {
    width: 20px;
    height: 20px;
    transition: all 0.3s;
    cursor: pointer;

    position: absolute;
    top: 0;
    right: 0;
    margin-top: -20px;
    margin-right: -30px;

    svg {
      font-size: 20px;
      font-weight: 600;
      color: var(--gray-500);
    }

    &:hover {
      transform: scale(1.3);
      svg {
        color: var(--Danger);
      }
    }
  }
`;

export const ProductsAndMotivesWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .list-title {
    color: var(--title-color);
    font-weight: var(--weight-medium);
    margin-left: -24px;
  }

  padding-left: 24px;
`;

export const ProductAndMotiveLi = styled.li`
  display: list-item;

  list-style: disc !important;
`;

export const ProductAndMotiveInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  background-color: var(--gray-100);
  padding: 4px 6px;
  border-radius: 4px;

  .product {
    span {
      color: var(--gray-500);
      font-weight: var(--weight-bold);
    }

    &.motive {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  position: relative;

  > div {
    padding: 0;

    width: 85vw;

    td {
      padding: 8px 18px;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: var(--gray-700);

  .user-name {
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
  }

  .user-function {
    font-weight: var(--weight-semibold);
  }
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 0;
  right: 0;
  margin-top: -40px;
  background: var(--background-primary);

  svg {
    transition: all 0.3s;
    color: var(--gray-400);
  }

  &:hover {
    svg {
      color: var(--Danger);
    }
  }
`;

export const TotalTaskHours = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .total-task {
    color: var(--gray-700);
    font-size: var(--text-small-xl);
    font-weight: var(--weight-bold);
  }
`;

export const TimeAndDates = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;

  .card-info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    color: var(--gray-700);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);

    span {
      font-size: var(--text-small-lg);
      font-weight: var(--weight-bold);
    }
  }
`;

export const CardTimeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  min-width: 264px;
  width: '264px';

  background: var(--background-primary);
  border: 1px solid var(--gray-200);
  border-radius: 12px;

  padding: 24px;

  &.pointer {
    cursor: pointer;
  }
`;

export const DataInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .prev-date {
    color: var(--gray-900);
    font-size: var(--text-small-xs);
    font-weight: var(--weight-medium);
    text-decoration: line-through;

    padding-left: 8px;
  }
`;

export const ShowAllUsers = styled.div`
  display: flex;
  align-items: center;

  padding: 6px;
  padding-left: 24px;
`;

export const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  height: fit-content;

  table {
    border: 1px solid var(--gray-200);
    border-radius: 4px;
    tbody {
      tr {
        td {
          height: 48px;
        }
      }
    }
  }
`;
