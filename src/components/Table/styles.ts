import styled from 'styled-components';

export const Container = styled.div`
  background: #ffffff;
  box-shadow: var(--newShadow);
  border-radius: 8px;
  padding: 1rem 0;

  table {
    width: 100%;
    border-spacing: 0;

    /* tbody > tr:nth-child(2n) td {
      background-color: var(--gray-50);
    } */

    /* tr {
      background-color: var(--gray-50);
      width: 100%;
      border: 0;
    } */

    tfoot {
      td {
        padding: 0 1rem;
        border-bottom: none;
      }
    }

    th {
      background-color: var(--gray-50);
      border-bottom: 1px solid #eaecf0;
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
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      color: var(--gray-600);
      padding: 1rem 1.5rem;
      background: #ffffff;
      /* border-radius: 5px; */
      border-bottom: 1px solid #eaecf0;
      text-align: left;

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
    .container {
      margin: 100px auto;
      width: 500px;
      text-align: center;
    }

    .parent {
      td {
        background-color: var(--primary-025);
        border-bottom: 1px solid var(--primary-200);
      }
    }

    tbody > tr {
      &:hover {
        td {
          background-color: var(--gray-100);
          z-index: 1;
        }
      }
    }
  }
`;

export const TitleTable = styled.h1`
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
  color: var(--title-color);
  text-transform: capitalize;
  margin-bottom: 1rem;
  margin-left: 5px;
`;

export const TableHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.6rem;
  padding: 0 1.5rem;
  gap: 24px;

  .groupTable {
    display: flex;
    flex-direction: column;
    gap: 4px;

    h2 {
      font-weight: var(--weight-semibold);
      font-size: var(--text-small-lg);
      color: var(--gray-900);

      strong {
        font-weight: var(--weight-medium);
        font-size: var(--text-small-xs);
        color: var(--primary-700);

        background-color: var(--primary-050);
        padding: 3px 10px;
        border-radius: 16px;
        margin-left: 8px;
      }
    }

    span {
      font-weight: var(--weight-regular);
      font-size: var(--text-small-sm);
      color: var(--gray-500);
    }
  }
`;

export const FieldTogleButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 4px;
  background-color: #f2f4f7;
  border-radius: 4px;
`;

export const ContainerTable = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 24px 30px;

  .ScrollAreaRoot {
    border-radius: 8px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1.5rem;
  margin-bottom: 16px;

  .search-field {
    max-width: 300px;
  }
`;
