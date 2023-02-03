import styled from 'styled-components';
export const CardWellcomeDash = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  background: var(--degrade-blue);
  border-radius: 10px;
  
  position: relative;

  .infoCardWellcome {
    display: flex;
    flex-direction: column;
    align-content: center;
    margin-left: 2rem;

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #fff;
    }

    span {
      font-size: 0.875rem;
      font-weight: 400;
      color: #fff;
    }
  }

  .WellcomeImage {
    display: grid;
    place-items: center;

    margin-left: 20px;
  }
`;