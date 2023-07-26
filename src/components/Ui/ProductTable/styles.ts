import styled from 'styled-components';

export const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 100px;
`;

export const ProductTitleInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 24px 40px;
  border-bottom: 1px solid var(--gray-300);
`;

export const ProductTitle = styled.div`
  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
`;

export const ProductDate = styled.div`
  color: var(--gray-700);
  font-size: var(--text-small-md);
  font-weight: var(--weight-medium);

  text-transform: capitalize;
`;

export const ProductSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
`;

export const ProductsTable = styled.div`
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

    .flex {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;

      &.info {
        color: var(--gray-900);
        font-size: var(--text-small-md);
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
  }

  /* @media (max-width: 1600px) {
    table {
      td {
        padding: 0 1rem;
      }
    }
  } */
`;
