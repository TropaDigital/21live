import styled from 'styled-components';

export const ContainerWrapper = styled.div``;

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
  font-size: var(--h4-font-size);
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
`;
