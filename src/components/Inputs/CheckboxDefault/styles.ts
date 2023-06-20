import styled, { css } from 'styled-components';
import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
  isIcon: boolean;
}

export const Container = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  .labelInput {
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    color: var(--gray-500);
    user-select: none;
  }

  input {
    position: absolute;
    transform: scale(0);

    /* &:checked ~ .checkbox {
    background-color: ##0046B5;
  } */

  /* &:checked ~ .checkbox .checkbox-tick {
    opacity: 1;
  } */
  }

  input:checked ~ .checkbox {
    background-color: #0046B5;
    border-color: #0046B5;
  }

  input:checked ~ .checkbox .checkbox-tick {
    opacity: 1;
    border-color: #0046B5;
  }

  .checkbox {
    /* display: grid;
    place-items: center;
    width: 1rem;
    height: 1rem;
    border-radius: 0.125rem;
    background-color: rgba(255, 255, 255, 0.175);
    transition: all 0.35s; */

    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    vertical-align: top;
    user-select: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    transition-property: box-shadow;
    transition-duration: 200ms;
    border-width: 2px;
    border-style: solid;
    border-image: initial;
    border-radius: 0.125rem;
    border-color: #6C757D;
    color: #fff;
    --checkbox-size:1rem;
  }

  
`;

export const ContainerInput = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  position: relative;

  border-color: #e2e8f0;
  word-wrap: break-word;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #E62965;
    `}
`;

export const Error = styled(Tooltip)`
  /* height: 20px; */
  z-index: 3;
  right: 0px;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  /* pointer-events: none; */
  svg {
    margin: 0px;
  }
  span {
    background: #E62965;
    color: #fff;
    &::before {
      border-color: #E62965 transparent;
    }
  }
`;
