import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  padding-bottom: 100px;
`;

export const FormWrapper = styled.div`
  padding: 40px 30px;

  .label-observation {
    .label {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        color: var(--gray-700);
        font-size: var(--text-small-sm);
        font-weight: var(--weight-medium);
        margin-bottom: 6px;
      }

      span {
        color: var(--input-error);
        font-size: var(--text-small-sm);
        font-weight: var(--weight-medium);
        margin-bottom: 6px;
      }
    }

    &.error {
      border: 2px solid var(--input-error);
      border-radius: 4px;
      padding: 4px 8px;
    }
  }

  /* .flex-title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }*/
`;

export const FormTitle = styled.h2`
  color: var(--title-color);
  font-size: var(--text-headline-sm);
  font-weight: var(--weight-bold);

  margin-bottom: 24px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 30px;
  background: var(--background-primary);
  position: absolute;
  bottom: 0;
  width: 100%;

  border-left: 2px solid var(--gray-200);

  .fieldGroup {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

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

export const EstimatedHoursOfProducst = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .info-title {
    color: var(--gray-700);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
  }

  .info-hours {
    color: var(--success);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);

    &.more-30 {
      color: var(--Warning);
    }
    &.more-50 {
      color: var(--Danger);
    }
  }
`;

export const CloseModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: transparent;

  &:hover {
    svg {
      transition: all 0.3s;
      transform: scale(1.5);
      color: var(--Danger);
    }
  }
`;

export const ProductListWrapper = styled.div`
  height: fit-content;
  border: 1px solid var(--gray-100);
  border-radius: 8px;
`;

export const SearchProductsModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 68px;
  padding: 16px 12px;
`;

export const ProductListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 145px 136px;
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
  grid-template-columns: 1fr 1fr 145px 136px;
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
    display: flex;
    align-items: center;
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

export const ProductGridHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: fit-content;
  border-bottom: 1px solid var(--gray-200);
  padding: 6px 12px;

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
    display: flex;
    align-items: center;
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
  max-width: 910px;
`;

export const DeliverySplitRadio = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 56px;
  padding-top: 20px;

  color: var(--gray-600);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);
`;

export const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  height: fit-content;

  div {
    overflow-y: auto;

    border-left: 1px solid var(--gray-200);
    border-right: 1px solid var(--gray-200);

    table {
      tbody {
        tr {
          td {
            height: 48px;
          }
        }
      }
    }
  }
`;

export const ShowAllUsers = styled.div`
  display: flex;
  align-items: center;

  padding: 6px;
  padding-left: 24px;
`;
