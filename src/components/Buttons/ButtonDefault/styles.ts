import styled, { css } from 'styled-components';

import { shade } from 'polished';
interface ButtonProps {
  isOutline?: boolean;
  isDashed?: boolean;
  sizeButton?: 'small' | 'big';
  typeButton?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'lightWhite'
    | 'dark';
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: var(--text-small-sm);
  color: var(--background-primary);
  font-weight: var(--weight-semibold);
  white-space: nowrap;

  background: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 4px;
  padding: 0 10px;
  height: 40px;
  transition: background-color 0.35s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  ${(props) =>
    props.typeButton === 'primary' &&
    css`
      background-color: var(--primary);
      border: 1px solid var(--primary);
      color: #fff;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#0046B5')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: var(--primary);
      `}

      ${props.isDashed &&
      css`
          border: 2px dashed var(--primary);
          backgro-coloruntransparentd
        `}
    `}

  ${(props) =>
    props.typeButton === 'secondary' &&
    css`
      background-color: #00c899;
      border: 1px solid #00c899;
      color: #fff;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#00C899')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #00c899;
      `}

      ${props.isDashed &&
      css`
          border: 2px dashed #00c899;
          backgro-coloruntransparentd
        `}
    `}

  ${(props) =>
    props.typeButton === 'success' &&
    css`
      background-color: #06d6a0;
      border: 1px solid #06d6a0;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#06D6A0')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #06d6a0;
      `}

      ${props.isDashed &&
      css`
          border: 2px dashed #06d6a0;
          backgro-coloruntransparentd
        `}
    `}

  ${(props) =>
    props.typeButton === 'danger' &&
    css`
      background-color: #e62965;
      border: 1px solid #e62965;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#E62965')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #e62965;
      `}

      ${props.isDashed &&
      css`
          border: 2px dashed #e62965;
          backgro-coloruntransparentd
        `}
    `}

  ${(props) =>
    props.typeButton === 'warning' &&
    css`
      background-color: #faae42;
      border: 1px solid #faae42;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#FAAE42')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #faae42;
      `}

      ${props.isDashed &&
      css`
          border: 2px dashed #faae42;
          backgro-coloruntransparentd
        `}
    `}

  ${(props) =>
    props.typeButton === 'info' &&
    css`
      background-color: #039be5;
      border: 1px solid #039be5;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#039BE5')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #039be5;
      `}

      ${props.isDashed &&
      css`
          border: 2px dashed #039be5;
          backgro-coloruntransparentd
        `}
    `}

  ${(props) =>
    props.typeButton === 'light' &&
    css`
      background-color: #e9ecef;
      border: 1px solid #e9ecef;
      color: #6c757d;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#E9ECEF')};
        color: #6c757d;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #e9ecef;
      `}

      ${props.isDashed &&
      css`
          border: 2px dashed #e9ecef;
          backgro-coloruntransparentd
        `}
    `}

  ${(props) =>
    props.typeButton === 'dark' &&
    css`
      background-color: #343a40;
      border: 1px solid #343a40;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#343A40')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #343a40;
      `}

      ${props.isDashed &&
      css`
        border: 2px dashed #343a40;
        background-color: transparent;
      `}
    `}

  ${(props) =>
    props.typeButton === 'lightWhite' &&
    css`
      background-color: #fff;
      border: none;
      outline: none;
      color: #000;

      &:hover {
        background: ${props.isDashed ? 'transparent' : shade(0.2, '#FFF')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #343a40;
      `}

      ${props.isDashed &&
      css`
        border: 2px dashed #343a40;
        background-color: transparent;
      `}
    `}

  ${(props) =>
    props.sizeButton === 'small' &&
    css`
      height: 24px;

      svg {
        width: 16px;
        height: 16px;
      }
    `}

  ${(props) =>
    props.sizeButton === 'big' &&
    css`
      height: 48px;
      font-size: var(--h5-font-size);

      svg {
        width: 22px;
        height: 22px;
      }
    `}
`;
