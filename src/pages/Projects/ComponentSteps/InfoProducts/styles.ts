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
