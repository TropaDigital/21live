import styled from "styled-components";

export const Container = styled.div`

`;

export const Content = styled.div`

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
