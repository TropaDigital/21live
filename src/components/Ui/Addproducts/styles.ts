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

  .postsInfo {
    display: flex;
    flex-direction: column;
    gap: 4px;

    h2 {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #101828;
    }

    .quantityAndHours {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
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
  }

  .boxRightProducts {
    display: flex;
    align-items: center;
    gap: 12px;
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