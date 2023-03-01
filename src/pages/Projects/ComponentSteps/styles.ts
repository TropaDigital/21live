import styled, { css } from "styled-components";

interface Props {
  isDisabed?: boolean;
}

export const Container = styled.div<Props>`
  ${(props) => props.isDisabed && css`
    opacity: 0.4;
    background: #e2e8f0;
    cursor: not-allowed;
  `}

  width: 100%;
  height: 100%;

`;

export const ContainerInfoProducts = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */

  ul {
    margin-top: 12px;
    border-top: 1px solid var(--gray-200);
    padding-top: 12px;
  }

  .quantityAndHours {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 20px;
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

export const SectionProductsProject = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;

  width: 100%;
`;

export const BoxProductProject = styled.button`
  display: flex;
  flex-direction: column;

  padding: 14px;
  border-radius: 4px;
  background-color: var(--gray-50);
  border: none;
  /* transition: all 0.5s ease; */
  
  :hover {
    background-color: #E2F2FF;
    cursor: pointer;

    .quantityAndHours {
      margin-top: 8px;
      height: max-content;
    }

    .boxInfopost {
      opacity: 1;
      visibility: visible;

      span {
        font-size: 14px;
      }
    }

    .headerProductProject {
      .boxAdd {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .headerProductProject {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    .boxAdd {
      display: grid;
      place-items: center;
      width: 24px;
      height: 24px;

      border-radius: 4px;
      background-color: #8ccbff;

      visibility: hidden;
      opacity: 0;
    }

    h3 {
      font-weight: var(--weight-semibold);
      font-size: var(--text-smal-md);
      color: var(--gray-700);
    }
  }

  .quantityAndHours {
      align-items: baseline;
      flex-direction: column;
      gap: 4px;
      margin-top: 0px;
      height: 0;
      transition: all 0.5s ease;

    }

    .boxInfopost {
      transition: all .35s ease;

      opacity: 0;
      visibility: hidden;
      span {
        font-weight: 400;
        font-size: 0px;
        line-height: 20px;
        color: #475467;

        strong {
          color: #101828;
        }
      }
    }
`;

