import styled from 'styled-components';

export const Container = styled.div``;

export const HeaderEditPlus = styled.div`
  .titleEditFluxo {
    display: flex;
    align-items: center;
    gap: 6px;

    font-weight: 600;
    font-size: 20px;
    color: #6c757d;

    > span {
      color: #444444;
      cursor: pointer;
    }

    .editFlowName {
      display: flex;
      align-items: center;
      gap: 6px;
    }
  }

  .subTitleEditFluxo {
    font-weight: 400;
    font-size: 14px;
    color: #6c757d;
    margin-top: 4px;
  }
`;

export const ContentEditFluxo = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;

  margin-top: 44px;
  padding: 0 66px 0 0;
`;
