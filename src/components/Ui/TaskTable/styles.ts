import styled from 'styled-components';

export const TaskContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
  background: var(--background-primary);
`;

export const TaskFilter = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 24px;
  width: 100%;
  height: 92px;
  box-sizing: border-box;

  padding: 24px;

  .search-field {
    max-width: 280px;
  }
`;

export const TaskDateWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 40px;
`;

export const TaskDate = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid var(--gray-300);
  padding: 0 24px;

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-medium);
`;

export const TasksTable = styled.div`
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
      height: 96px;
      max-height: 96px;
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

      .fieldTableClients {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
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
      &:hover {
        td {
          background-color: var(--primary-025);
        }
      }
    }

    .flag-info {
      display: flex;
      align-items: center;
    }

    .container {
      margin: 100px auto;
      width: 500px;
      text-align: center;
    }
  }

  @media (max-width: 1600px) {
    table {
      td {
        padding: 0 1rem;
      }
    }
  }
`;
