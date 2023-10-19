import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f6f7fb;
`;

export const HeaderPlayBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;

  .sectionPlayHoursBars {
    display: flex;
    align-items: center;
    gap: 8px;

    > div {
      display: grid;
      place-items: center;
      background-color: transparent;
    }

    .timePlayBar {
      font-size: 14px;
      color: #6c757d;
    }
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
