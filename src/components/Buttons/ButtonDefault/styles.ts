import styled, { css } from 'styled-components';
import { shade } from 'polished';
interface ButtonProps {
  isOutline?: boolean;
  sizeButton?: 'small' | 'big';
  typeButton?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
}

const colorButtonVariations = {
  primary: css`
    background: #0046B5;
    border: 1px solid #0046B5;
    color: #fff;

    &:hover {
      background: ${shade(0.2, '#0046B5')};
      color: #fff;
    }
  `,
  secondary: css`
    background: #00c899;
    border: 1px solid #00c899;
    color: #fff;

    &:hover {
      background: ${shade(0.2, '#00c899')};
      color: #fff;
    }
  `,
  success: css`
    background: #06d6a0;
    border: 1px solid #06d6a0;
    color: #fff;

    &:hover {
      background: ${shade(0.2, '#06d6a0')};
      color: #fff;
    }
  `,
  danger: css`
    background: #e62965;
    border: 1px solid #e62965;
    color: #fff;

    &:hover {
      background: ${shade(0.2, '#e62965')};
      color: #fff;
    }
  `,
  warning: css`
    background: #faae42;
    border: 1px solid #faae42;
    color: #fff;

    &:hover {
      background: ${shade(0.2, '#faae42')};
      color: #fff;
    }
  `,
  info: css`
    background: #039be5;
    border: 1px solid #039be5;
    color: #fff;

    &:hover {
      background: ${shade(0.2, '#039be5')};
      color: #fff;
    }
  `,
  light: css`
    background: #e9ecef;
    border: 1px solid #e9ecef;
    color: #6c757d;

    &:hover {
      background: ${shade(0.2, '#e9ecef')};
      color: #6c757d;
    }
  `,
  dark: css`
    background: #343a40;
    border: 1px solid #343a40;
    color: #fff;

    &:hover {
      background: ${shade(0.2, '#343a40')};
      color: #fff;
    }
  `,
};

export const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-size: var(--small-font-size);
  color: var(--background-primary);
  font-weight: var(--font-bold);
  white-space: nowrap;

  background: #0046b5;
  border: 1px solid #0046b5;
  border-radius: 4px;
  padding: 0 10px;
  height: 40px;
  transition: background-color 0.35s ease;

  svg {
    width: 18px;
    height: 18px;
  }

  /* ${(props) => colorButtonVariations[props.typeButton || 'primary']} */


  ${(props) =>
    props.typeButton === 'primary' &&
    css`
      background-color: #0046b5;
      border: 1px solid #0046b5;
      color: #fff;

      &:hover {
        background: ${shade(0.2, '#0046B5')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #0046b5;
      `}
    `}

  ${(props) =>
    props.typeButton === 'secondary' &&
    css`
      background-color: #00c899;
      border: 1px solid #00c899;
      color: #fff;

      &:hover {
        background: ${shade(0.2, '#00C899')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #00c899;
      `}
    `}

  ${(props) =>
    props.typeButton === 'success' &&
    css`
      background-color: #06d6a0;
      border: 1px solid #06d6a0;

      &:hover {
        background: ${shade(0.2, '#06D6A0')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #06d6a0;
      `}
    `}

  ${(props) =>
    props.typeButton === 'danger' &&
    css`
      background-color: #e62965;
      border: 1px solid #e62965;

      &:hover {
        background: ${shade(0.2, '#E62965')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #e62965;
      `}
    `}

  ${(props) =>
    props.typeButton === 'warning' &&
    css`
      background-color: #faae42;
      border: 1px solid #faae42;

      &:hover {
        background: ${shade(0.2, '#FAAE42')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #faae42;
      `}
    `}

  ${(props) =>
    props.typeButton === 'info' &&
    css`
      background-color: #039be5;
      border: 1px solid #039be5;

      &:hover {
        background: ${shade(0.2, '#039BE5')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #039be5;
      `}
    `}

  ${(props) =>
    props.typeButton === 'light' &&
    css`
      background-color: #e9ecef;
      border: 1px solid #e9ecef;
      color: #6c757d;

      &:hover {
        background: ${shade(0.2, '#E9ECEF')};
        color: #6c757d;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #e9ecef;
      `}
    `}

  ${(props) =>
    props.typeButton === 'dark' &&
    css`
      background-color: #343a40;
      border: 1px solid #343a40;

      &:hover {
        background: ${shade(0.2, '#343A40')};
        color: #fff;
      }

      ${props.isOutline &&
      css`
        background-color: transparent;
        color: #343a40;
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
