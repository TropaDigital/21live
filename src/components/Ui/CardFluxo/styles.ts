import styled, { keyframes } from "styled-components";
import { shade } from "polished";

const bounceIn = keyframes`
  0% { 
    opacity: 0; 
    transform: scale(.3);
  }
  50% { 
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(.9);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;

  width: 320px;

  padding: 10px;
  border: 1px solid #DEE2E6;
  border-radius: 0.625rem;
  box-shadow: var(--shadow);

  position: relative;

  animation: ${bounceIn} 0.5s linear;


  .buttonCardFluxo {
    position: absolute;
    top: 50%;
    left: 110%;
    transform: translate(-50%, -50%);

    &:hover {
      background: ${shade(0.2, '#0046b5')};
    }
  }

  .arrowCardFluxo {
    display: grid;
    place-items: center;
    
    position: absolute;
    top: 50%;
    left: 116%;
    transform: translate(-50%, -50%);
  }
`;

export const HeaderCardFluxo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;

  position: absolute;
  right: 10px;
`;

export const TitleCardFluxo = styled.h1`
  font-size: 1.125rem;
  font-weight: 700;
  color: #444444;
  text-transform: uppercase;
  margin-bottom: 12px;
  padding-right: 50px;
`;

export const SectionButtonsHeaderFluxo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ButtonHeaderCardFluxo = styled.button`
  display: grid;
  place-items: center;
  background-color: transparent;
  padding: 4px;
  border: none;
  border-radius: 2px;

  :hover {
    background-color: ${shade(0.1, '#F0F0F0')};
  }

  :focus {
    box-shadow: 0 0 0 2px #c6c7c7;
  }

  transition: all 0.35s ease;
`;

export const FormCardFluxo = styled.form`

  .inputCardFluxo {
    width: 80%;
    min-width: 0px;
    outline: transparent solid 2px;
    outline-offset: 2px;
    appearance: none;
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    transition-duration: 200ms;
    font-size: 1.125rem;
    font-weight: 700;
    color: #444444;
    /* height: 2rem; */
    padding-inline-end: 4px;
    border-radius: 2px;
    border-width: 0px;
    border-style: solid;
    border-image: initial;
    border-color: inherit;
    background: inherit;
    margin-bottom: 10px;

    &::placeholder {
      color: #cccccc;
    }

    &:focus-visible {
      z-index: 1;
      border-color: rgb(49, 130, 206);
      box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
    }

  }

  fieldset {
    margin-top: 12px;
    min-inline-size: auto;
    border: 0;
  }

  legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    font-size: 14px;
    font-weight: 600;
    color: #6C757D;
  }

`;

// POPUP

export const ContainerPopupCard = styled.div`

`;