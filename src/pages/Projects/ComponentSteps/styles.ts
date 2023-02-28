import styled, { css } from "styled-components";

interface Props {
  isDisabed?: boolean;
}

export const Container = styled.div<Props>`
  ${(props) => props.isDisabed && css`
    opacity: 0.4;
    background: #e2e8f0;
  `}

  cursor: not-allowed;
  width: 100%;
  height: 100%;
`;

export const ContainerInfoProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .quantityAndHours {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .boxInfopost {
      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #475467;

        strong {
          color: #101828;
        }
      }
    }
`;

export const ContainerListproducts = styled.div`
  margin-top: 12px;
  border-top: 1px solid #cecece;
  padding-top: 12px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    li {

    }
  }
`
