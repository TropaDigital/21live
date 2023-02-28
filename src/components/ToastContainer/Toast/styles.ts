import styled, { css } from 'styled-components';
import { animated } from '@react-spring/web';

interface ContainerProps {
  type?: 'success' | 'danger' | 'warning' | 'info' | 'light';
  hasdescription: number;
}

const toastTypeVariations = {
  success: css`
    background: #F6FEF9;
    color: #027A48;
    border-color: #6CE9A6;
  `,
  danger: css`
    background: #FFFBFA;
    color: #B42318;
    border-color: #D92D20;
  `,
  warning: css`
    background: #FFFCF5;
    color: #B54708;
    border-color: #F79009;
  `,
  info: css`
    background: #F5FAFF;
    color: #0045B5;
    border-color: #0089FA;
  `,
  light: css`
    background: #F5FAFF;
    color: #98A2B3;
    border-color: #D0D5DD;
  `,
};

export const Container = styled(animated.div)<ContainerProps>`
  position: relative;
  /* width: 480px; */
  padding: 4px 0px 2px 14px;
  border-radius: 4px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border-width: 1px 1px 1px 4px;
  border-style: solid;
  display: grid;
  grid-template-columns: 5% 1fr 20% 10%;
  align-items: center;
  gap: 16px;
  & + div {
    margin-top: 16px;
  }
  ${(props) => toastTypeVariations[props.type || 'info']}
  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
      color: ${(props) => toastTypeVariations[props.type || 'info']};
    }
  }

  .sectionMascote {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sectionButtonToast {
    display: grid;
    place-items: center;
    
    border-left: 1px solid #D0D5DD;
    
    button {
      background: transparent;
      border: 0;
      color: inherit;
    }
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
