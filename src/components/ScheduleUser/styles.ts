import styled from 'styled-components';

export const ScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 85vw;
`;

export const ScheduleSubtitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  position: relative;

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: transparent;

    position: absolute;
    top: -40px;
    right: 0;
    transition: all 0.3s;

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

export const SubtitleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .title {
    color: var(--gray-600);
    font-size: var(--text-small-md);
    font-weight: var(--weight-regular);
  }

  .info {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
  }
`;

export const ScheduleDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 36px;

  .date {
    color: var(--gray-700);
    font-size: var(--text-small-xl);
    font-weight: var(--weight-semibold);

    text-transform: capitalize;

    span {
      text-transform: lowercase;
    }
  }
`;

export const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;

  border-radius: 4px;
  border: 1px solid var(--gray-200, #eaecf0);
  background: transparent;

  /* Shadow/xs */
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
`;

export const ScheduleSelectUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 68px;
`;

export const UserFields = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  &.hours {
    max-width: 150px;
    position: relative;
  }

  .hour-label {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: -24px;
  }

  .selectedUser {
    color: var(--gray-700);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    margin-right: 8px;
  }

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

export const ScheduleTable = styled.div`
  display: flex;
  align-items: flex-start;

  border-radius: 4px;
  border: 1px solid var(--gray-200, #eaecf0);
  background: var(--White, #fff);
`;

export const UserTable = styled.div`
  display: flex;
  flex-direction: column;

  width: 240px;

  /* box-shadow: 8px 0 10px -1px #eaecf0; */
`;

export const UserTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  border-right: 2px solid var(--gray-200);
  border-bottom: 2px solid var(--gray-200);

  .user-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding: 12px 24px;
    height: 60px;

    color: var(--gray-500);
    font-size: var(--text-small-xs);
    font-weight: var(--weight-medium);
  }

  .ext-users {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    padding-left: 12px;

    color: var(--gray-500);
    font-size: var(--text-small-xs);
    font-weight: var(--weight-medium);
  }
`;

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 240px;
  height: 72px;

  border-right: 2px solid var(--gray-200);
  border-bottom: 2px solid var(--gray-200);
`;

export const UserInfosCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .user-name {
    color: var(--gray-700);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-semibold);

    text-transform: capitalize;
  }

  .working-hours {
    color: var(--gray-500);
    font-size: var(--text-small-xs);
    font-weight: var(--weight-regular);

    span {
      color: var(--gray-600);
      font-weight: var(--weight-semibold);
    }
  }
`;

export const HoursTable = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 211px);
  padding-left: 4px;

  overflow-y: hidden;
  overflow-x: auto;

  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) #ced4da;
  ::-webkit-scrollbar {
    width: 4px;
    height: 11px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #adb5bd;
    border-radius: 4px;
    border: 3px solid #ced4da;
  }
  ::-webkit-scrollbar-track {
    border-radius: 4px;
    background: #ced4da;
  }
`;

export const HoursTitle = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--gray-200);
  height: 44px;

  .hours {
    width: 84px;

    padding: 12px 24px;
  }

  .actual-time {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 40px;
      top: 0;
      right: 0;
      border-right: 2px solid red;
      z-index: 99;
    }
  }
`;

export const EndTaskDate = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;

  .date-title {
    position: absolute;
    top: 0;
    left: 0;
    margin-top: -24px;
  }

  .end-date {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 40px;
    padding: 8px;

    border: 1px solid var(--gray-200);
    border-radius: 4px;
  }
`;

export const EstimatedTimeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .hour-label {
    width: 240px;
  }

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
