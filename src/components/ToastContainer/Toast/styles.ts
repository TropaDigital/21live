import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';

interface ContainerProps {
  type?: 'success' | 'danger' | 'warning' | 'info' | 'light';
  hasdescription: number;
}

const toastTypeVariations = {
  success: css`
    background: #06d6a0;
    color: #fff;
  `,
  danger: css`
    background: #e62965;
    color: #fff;
  `,
  warning: css`
    background: #faae42;
    color: #fff;
  `,
  info: css`
    background: #039be5;
    color: #fff;
  `,
  light: css`
    background: #6c757d;
    color: #fff;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  position: relative;
  width: 360px;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  & + div {
    margin-top: 16px;
  }
  ${(props) => toastTypeVariations[props.type || 'info']}
  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }
  button {
    position: absolute;
    right: 16px;
    top: 19px;
    background: transparent;
    border: 0;
    color: inherit;
  }
  ${(props) =>
    !props.hasdescription &&
    css`
      align-items: center;
      svg {
        margin-top: 0;
      }
    `}
`;
