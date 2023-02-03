import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const HeaderPlayBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  >button {
    display: grid;
    place-items: center;
    background-color: transparent;
  }

  .qtdTaskPlayBar {
    display: flex;
    align-items: center;

    span {
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--gray-600);
    }

    svg {
      transform: rotate(90deg);
    }
  }
`;