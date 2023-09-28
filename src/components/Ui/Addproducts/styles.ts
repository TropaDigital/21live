import styled from "styled-components";

export const Container = styled.li`
  display: flex;
  padding: 16px;
  border: 1px solid #D0D5DD;

  :not(:last-child) {
    border-bottom: 1px solid #fff;
    padding-bottom: 14px;
  }

  :last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  :first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  
  .cardInfoProductsProject {
    h2 {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #101828;
    }
    margin-top: 0px;
    flex-direction: column;
    align-items: baseline;
    gap: 2px;
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

    .boxInfoMonthlyOrYearly {
      display: flex;
      align-items: center;
      span:first-of-type {
        margin-right: 8px
      }
      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #475467;
      }
    }

  .boxRightProducts {
    display: flex;
    align-items: center;
    gap: 12px;

    .resultCountPost {
      width: 40px;
    }

    .inputProducts {
      width: 100%;
      min-width: 0px;
      outline: transparent solid 2px;
      outline-offset: 2px;
      /* position: relative; */
      appearance: none;
      transition-property: background-color, border-color, color, fill, stroke,
        opacity, box-shadow, transform;
      transition-duration: 200ms;
      font-size: var(--text-small-md);
      font-weight: var(--weight-reular);
      color: var(--gray-700);

      height: 26px;
      border-radius: 4px;
      border-width: 0px;
      border-style: solid;
      border-image: initial;
      border-color: inherit;
      background: inherit;
      line-height: 20px;
      text-align: center;

      &:focus-visible {
        z-index: 1;
        border-color: rgb(49, 130, 206);
        box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
      }
    }
  }

  .countPost {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;

    background: #FFFFFF;
    border: 1px solid #EAECF0;
    border-radius: 4px;
    padding: 8px;

    button {
      display: grid;
      place-items: center;

      padding: 4px;
      border: none;
      background: transparent;

      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #475467;

      :disabled {
        cursor: not-allowed;

        svg {
          path {
            fill: #D0D5DD;
          }
        }
        /* opacity: 2; */
      }
    }
  }
`;