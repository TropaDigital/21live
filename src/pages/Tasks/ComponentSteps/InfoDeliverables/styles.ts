import styled from 'styled-components';

interface DeliveryProps {
  openInfos: boolean;
}

export const ProductsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 38px;
  /* margin-bottom: 38px; */
  position: relative;

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

    .delete {
      cursor: pointer;

      svg {
        width: 18px;
        height: 18px;
        transition: all 0.3s;
        path {
          fill: red;
        }
        &:hover {
          transform: scale(1.3);
        }
      }
    }
  }
`;

export const EditableFormat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;

  &.edit {
    background-color: var(--primary-50);
    border-radius: 50%;
  }
`;

export const Deliveries = styled.div<DeliveryProps>`
  display: flex;
  flex-direction: column;
  height: ${({ openInfos }) => (openInfos ? 'fit-content' : '72px')};
  background: var(--background-primary);
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  margin-top: 28px;
  overflow: hidden;

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
  }

  .trash {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;

    color: var(--Danger);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);

    svg {
      width: 14px;
      height: 14px;
      transition: all 0.3s;
      path {
        fill: var(--Danger);
      }
      &:hover {
        transform: scale(1.3);
      }
    }
  }
`;

export const DeliveryTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--gray-200);

  .title-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    color: var(--gray-700);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-bold);

    .title-name {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }

    .date {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--success-600);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      cursor: pointer;

      &.add {
        color: var(--primary);
        cursor: pointer;
        svg {
          path {
            stroke: var(--primary);
          }
        }
      }
    }
  }

  .icon-arrow {
    cursor: pointer;
    width: 40px;
    text-align: right;
  }
`;

export const NewDelivery = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 132px;
  background: transparent;
  border: 2px dashed var(--gray-400);
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;
`;

export const AddNewDelivery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  color: var(--gray-600);
  font-size: var(--text-small-lg);
  font-weight: var(--weight-medium);

  .plus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--primary-100);
    border-radius: 50%;
  }
`;

export const TableDelivery = styled.div`
  border: 1px solid var(--gray-200);
  border-radius: 8px;

  .delete {
    cursor: pointer;

    svg {
      width: 18px;
      height: 18px;
      transition: all 0.3s;
      path {
        fill: red;
      }
      &:hover {
        transform: scale(1.3);
      }
    }
  }
`;

export const TotalHours = styled.div`
  position: absolute;
  top: 2%;
  right: 0;

  color: var(--gray-500);
  font-size: var(--text-small-md);
  font-weight: var(--weight-medium);

  span {
    color: var(--gray-800);
    font-weight: var(--weight-semibold);
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .container-title {
    color: var(--title-color);
    font-size: var(--text-small-xs);
    font-weight: var(--weight-medium);
  }

  .date {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--success-600);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    cursor: pointer;

    &.add {
      color: var(--primary);
      cursor: pointer;
      svg {
        path {
          stroke: var(--primary);
        }
      }
    }

    &.error {
      color: var(--Danger);
      cursor: pointer;
      svg {
        path {
          stroke: var(--Danger);
        }
      }
    }
  }
`;
