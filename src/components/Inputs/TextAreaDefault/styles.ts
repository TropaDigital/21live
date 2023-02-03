import styled, { css } from 'styled-components';
import Tooltip from '../../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    font-weight: 700;
    color: #6c757d;
    margin-bottom: 5px;
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

  textarea {
    width: 100%;
    min-width: 0px;
    outline: transparent solid 2px;
    outline-offset: 2px;
    position: relative;
    appearance: none;
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform;
    transition-duration: 200ms;
    font-size: 14px;
    color: #6c757d;
    padding-inline-start: 1rem;
    padding-inline-end: 1rem;
    height: 2.5rem;
    border-radius: 0.375rem;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-color: inherit;
    background: inherit;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    min-height: 5rem;
    line-height: 1.375;
    vertical-align: top;

    &::placeholder {
      color: #cccccc;
    }

    &:focus-visible {
      z-index: 1;
      border-color: rgb(49, 130, 206);
      box-shadow: rgb(49 130 206) 0px 0px 0px 1px;
    }
  }
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
