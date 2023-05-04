import styled from 'styled-components';

export const ProductsWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 30px;
  padding-bottom: 28px;
  margin-left: -30px;
  margin-top: -42px;

  .teste {
    width: 322px;
    height: 300px;
    background-color: red;
  }
`;

export const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 12px 16px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 4px;
  background: var(--gray-100);
  box-sizing: border-box;
  border-radius: 6px;
`;

export const WrapperCard = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  min-width: 320px;
  max-width: 320px;
  height: fit-content;
  border-radius: 12px;
  background: var(--background-primary);

  margin-top: 40px;
  overflow: hidden;
`;

export const SaveButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
`;
