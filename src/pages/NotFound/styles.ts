import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(45deg, #0046b5 20%, #00c49a 100%);
  position: relative;
  overflow: hidden;
`;

export const LogoSection = styled.div`
  width: fit-content;
  height: fit-content;

  position: absolute;
  top: 30px;
  left: 120px;

  /* 
  svg {
    width: 160px;
    height: 50px;
  } */
`;

export const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const NumberSection = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--light);
  font-size: 250px;
  font-weight: 900;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translateY(-50%);

  .ops-text {
    font-size: var(--text-headline-xl);
    font-weight: var(--weight-bold);

    margin-top: -50px;
  }

  .back-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
  }
`;

export const ImageSection = styled.div`
  width: 100%;
  height: 50%;

  .circle {
    width: 570px;
    height: 570px;
    flex-shrink: 0;

    background: #00bfa5;
    border-radius: 50%;

    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) translateX(17%);
  }

  .img {
    width: 570px;
    height: 570px;
    z-index: 9;
    background-size: contain;
    background-repeat: no-repeat;

    position: absolute;
    top: 60%;
    right: 0;
    transform: translateY(-50%);
  }
`;
