import styled, { keyframes } from "styled-components";

interface Props {
  value: number;
}

const progressAnimationStrike = (value: any) => keyframes`
  from { width: 0 }
  to   { width: ${value}% }
`;

export const Container = styled.div<Props>`
    background: #E3E5EA;
    border-radius: 6px;
    /* box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
      0 1px rgba(255, 255, 255, 0.08); */

    .progress-bar {
      height: 10px;
      background-color: #ee303c;
      border-radius: 4px;
      transition: 0.4s linear;
      transition-property: width, background-color;
    }

    .progress-striped .progress-bar {
      background-color: #FAAE42;
      width: ${({ value }) => value ? `${value+'%'}` : "0%"};
      background-image: linear-gradient(
        45deg,
        rgb(252, 163, 17) 25%,
        transparent 25%,
        transparent 50%,
        rgb(252, 163, 17) 50%,
        rgb(252, 163, 17) 75%,
        transparent 75%,
        transparent
      );
      animation: ${props => progressAnimationStrike(props.value)} 6s;
    }
`;