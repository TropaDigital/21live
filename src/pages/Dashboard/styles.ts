import styled from 'styled-components';

interface NumberCardProps {
  height_size?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .contentData {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const GraphicLine = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 16px;
`;

export const CardBase = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  gap: 10px;

  background-color: var(--background-primary);
  padding: 10px 20px 20px 20px;

  border-radius: 10px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);

  .card-title {
    color: var(--title-color);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-bold);
  }
`;

export const JobStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;

  width: fit-content;
  height: 24px;
  border-radius: 35px;
  background: var(--warning-100);

  color: var(--warning-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);
  text-transform: capitalize;

  &.progress {
    color: var(--primary-700);
    background: var(--primary-050);
  }

  &.finished {
    color: var(--secundary-700);
    background: var(--secundary-100);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  .user-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: purple;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .user-name {
    display: flex;
    flex-direction: column;
    gap: 4px;

    min-width: 120px;
    max-width: 180px;

    color: var(--primary-900);
    font-size: var(--text-headline-sm);
    font-weight: var(--weight-bold);

    span {
      color: var(--title-color);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-bold);
    }
  }
`;

export const NumberCard = styled.div<NumberCardProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 215px;
  height: ${(props) => (props.height_size ? props.height_size : '120px')};
  border-radius: 10px;
  background-color: var(--primary-050);

  .numberCard {
    color: var(--primary-900);
    font-size: var(--text-headline-xl);
    font-weight: var(--weight-bold);
  }

  .numberCard-title {
    color: var(--primary-900);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
  }

  &.white {
    background-color: var(--gray-200);

    .numberCard {
      color: var(--gray-900);
    }

    .numberCard-title {
      color: var(--gray-900);
    }
  }
`;

export const GridServiceWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 215px;
  gap: 12px;
  width: 100%;
  height: fit-content;
  background-color: #f6f7fb;
  border-radius: 10px;

  padding: 12px;

  table {
    td {
      padding: 6px 2px !important;
    }
  }
`;

export const BaseTableGrey = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  height: fit-content;
  width: 100%;

  border-radius: 12px;
  border: 1px solid var(--gray-200);
  overflow: hidden;

  table {
    width: 100%;
    border-spacing: 0;

    th {
      background-color: var(--gray-100);
      border-bottom: 1px solid #eaecf0;
      text-transform: capitalize;
      font-size: var(--text-small-xs);
      font-weight: var(--weight-medium);
      color: var(--gray-500);
      padding: 10px 1.5rem;
      text-align: left;
    }

    td {
      max-height: 40px;

      color: var(--gray-600);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      text-align: left;

      padding: 8px 1.5rem;

      background: #ffffff;
      border-bottom: 1px solid #eaecf0;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 38ch;

      .fieldTableClients {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
    }

    tbody {
      tr:nth-child(even) {
        td {
          background-color: var(--gray-50);
        }
      }
    }

    tfoot {
      td {
        padding: 0 1rem;
        border-bottom: none;
      }
    }
  }

  .status {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    width: fit-content;
    height: 24px;

    background-color: var(--warning-100);
    border-radius: 35px;

    padding: 2px 12px;

    color: var(--warning-700);

    &.progress {
      background-color: var(--primary-050);
      color: var(--primary-700);
    }

    &.finished {
      background-color: var(--secundary-050);
      color: var(--secundary-700);
    }
  }
`;

export const WrapperTeamCards = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const TeamTimeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 280px;
  width: 100%;
  height: 220px;

  background: #f6f7fb;
  border-radius: 12px;

  padding: 10px;

  .avatar-user {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;

    background: var(--degrade-blue);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    overflow: hidden;
  }

  .user-name {
    color: var(--primary);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);
  }

  .user-role {
    color: var(--title-color);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);

    margin-bottom: 6px;
  }

  .free-time {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    padding: 8px 10px;

    background: var(--primary-600);
    border-radius: 10px;

    color: var(--light);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-bold);

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const UserTeamCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  height: fit-content;

  background: var(--gray-50);
  border-radius: 12px;

  padding: 10px;

  .user-section {
    display: flex;
    align-items: center;
    gap: 14px;

    .user-image {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 10px;

      background: var(--degrade-blue);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;

      overflow: hidden;
    }

    .user-infos {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;

      color: var(--primary-900);
      font-size: var(--text-small-xl);
      font-weight: var(--weight-bold);

      span {
        color: var(--title-color);
        font-size: var(--text-small-sm);
        font-weight: var(--weight-semibold);
      }
    }
  }
`;

export const UserJobs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .job-card {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 254px;
    height: 40px;

    border-radius: 12px;
    background-color: var(--primary-050);

    padding: 16px 10px;

    color: var(--primary-900);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-bold);

    span {
      font-size: var(--text-small-sm);
      font-weight: var(--weight-regular);
    }
  }

  .small-number-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 123px;
    height: 89px;

    border-radius: 12px;

    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);

    padding: 8px;

    text-align: center;

    &.worked {
      background: var(--warning-050);
      color: var(--warning-900);

      .numberCard {
        color: var(--warning-900);
        font-size: var(--text-headline-xl);
        font-weight: var(--weight-bold);
      }
    }

    &.free {
      background: var(--success-050);
      color: var(--secundary-900);

      .numberCard {
        color: var(--secundary-900);
        font-size: var(--text-headline-xl);
        font-weight: var(--weight-bold);
      }
    }
  }
`;

export const OperatorTopWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const TimeChartsTopCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 264px;
  height: 264px;

  border-radius: 12px;
  border: 1px solid var(--gray-200);
  background: var(--background-primary);

  padding: 24px;
  position: relative;

  .card-title {
    display: flex;
    flex-direction: column;
    gap: 8px;

    color: var(--gray-500);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);

    span {
      color: var(--gray-800);
      font-size: var(--text-headline-lg);
      font-weight: var(--weight-semibold);
    }
  }
`;

export const SmallCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  width: 100%;
  height: 264px;
  gap: 24px 30px;

  .small-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;

    padding: 24px;

    border-radius: 12px;
    border: 1px solid var(--gray-200);
    background: var(--background-primary);

    color: var(--gray-500);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);

    .big-number {
      color: var(--gray-800);
      font-size: var(--text-headline-md);
      font-weight: var(--weight-semibold);
    }
  }
`;

export const JobCellTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .top-cell {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
  }

  .bottom-cell {
    color: var(--gray-500);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
  }
`;
