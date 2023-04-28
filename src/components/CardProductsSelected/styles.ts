import styled from 'styled-components';

interface CardProps {
  openOptions: boolean;
}

export const WrapperCard = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 320px;
  max-width: 320px;
  height: fit-content;
  border-radius: 12px;
  background: var(--background-primary);
  overflow: hidden;
`;

export const CardProduct = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 320px;
  height: ${({ openOptions }) => (openOptions ? '160px' : '56px')};
  /* background: var(--background-primary); */
  border-bottom: 1px solid var(--gray-200);
  padding: 16px 24px;
`;

export const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
`;

export const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  gap: 24px;
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
  width: 100%;
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
