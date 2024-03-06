import styled from 'styled-components';

interface CardProps {
  openOptions: boolean;
}

export const ContainerCard = styled.div``;

export const CardProduct = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* width: 340px; */
  height: ${({ openOptions }) => (openOptions ? 'fit-content' : '56px')};
  /* background: var(--background-primary); */
  border-bottom: 1px solid var(--gray-200);
  overflow: hidden;
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 16px 24px;

  position: relative;
`;

export const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 200px; */
  max-height: 200px;
  gap: 24px;
  padding: 16px 24px;
`;

export const CardProductTitle = styled.h2`
  color: var(--title-color);
  font-size: var(--text-small-md);
  font-weight: var(--weight-bold);

  text-transform: uppercase;
`;

export const ArrowButton = styled.button`
  width: 24px;
  height: 24px;
  background-color: transparent;
`;

export const SwitchSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: 30px;
`;

export const EstimatedHours = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 30px;

  .hours {
    color: var(--gray-500);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);

    strong {
      font-weight: 600;
    }
  }
`;

export const QuantitySelected = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  color: var(--gray-500);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-regular);

  margin-top: -12px;
`;

export const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  right: 0;
  margin-top: 15px;

  .delete {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;

    margin-left: auto;

    color: var(--Danger);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);

    svg {
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
