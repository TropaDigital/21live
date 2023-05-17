import styled from 'styled-components';

export const ProductsModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ProductsModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductModalTitle = styled.h5`
  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
  line-height: 30px;
`;

export const CloseModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: transparent;
`;

export const ProductListWrapper = styled.div`
  height: fit-content;
  border: 1px solid var(--gray-100);
  border-radius: 8px;
`;

export const SearchProductsModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  padding: 16px 12px;
`;

export const ProductListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 136px;
  height: 44px;
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-200);
  padding: 13px 0;

  .list-title {
    color: var(--gray-500);
    font-size: var(--text-small-xs);
    font-weight: var(--weight-medium);
    padding-left: 24px;

    &.center {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 0;
    }
  }
`;

export const Product = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 136px;
  height: 72px;
  border-bottom: 1px solid var(--gray-200);
  padding: 26px 0;

  .product {
    display: flex;
    align-items: center;
    gap: 8px;

    color: var(--gray-700);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
    padding-left: 24px;
  }

  .category {
    color: var(--gray-700);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    padding-left: 24px;

    text-transform: uppercase;
  }

  .quantity {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const AddProductButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 44px;
`;

export const SplitDeliveries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Deliveries = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 82px;
  max-width: 656px;
`;

export const ProductsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 38px;

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
`;
