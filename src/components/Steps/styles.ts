import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0px 0px 0px 4px #E2F2FF;
  }
  50% {
    box-shadow: 0px 0px 0px 8px #E2F2FF;
  }
  100% {
    box-shadow: 0px 0px 0px 4px #E2F2FF;
  }
`;

export const Container = styled.div`
  display: flex;
  align: center;
  justify-content: space-between;
  margin: 24px 0;
  position: relative;

  .progressStep {
    height: 2px;
    background-color: #EAECF0;
    border-radius: 4px;
    transition: 0.4s linear;
    transition-property: width, background-color;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    .progress-bar-step {
      background-color: #FAAE42;
      width: 0%;
      height: 2px;
      /* background-image: linear-gradient(
        45deg,
        rgb(252, 163, 17) 25%,
        transparent 25%,
        transparent 50%,
        rgb(252, 163, 17) 50%,
        rgb(252, 163, 17) 75%,
        transparent 75%,
        transparent
      ); */
    }
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
    width: 60px;
    background: #fff;

    span {
      font-size: var(--text-smal-xs);
      font-weight: var(--weight-bold);
      color: var(--gray-200);
    }
  }

  .stepButton {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--gray-200);
  }

  .stepButtonInner {
    display: grid;
    place-items: center;
    position: absolute;
    z-index: 2;
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.35s;
  }

  .stepActive {
    span {
      color: var(--primary);
    }

    .stepButton {
      box-shadow: 0px 0px 0px 4px #E2F2FF;
      animation: ${pulse} 0.5s linear;
      background-color: #0046B5;

    }

    .stepButtonInner {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
      background-color: #fff;

    }

    .stepPulse {
      opacity: 1;
      display: block;
    }

  }
  .stepSuccess {
    span {
      color: var(--gray-700);
      font-weight: var(--weight-medium);
    }
    .stepButtonInner {
      background-color: #0046B5;
    }

    .stepButton {
      box-shadow: none;
    }
  }
`;