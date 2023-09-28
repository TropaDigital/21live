import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: 'success' | 'danger' | 'warning' | 'info' | 'creation';
}

const cardTypeVariations = {
  success: css`
    background: var(--degrade-green);
    color: #fff;
  `,
  danger: css`
    background: var(--degrade-red);
    color: #fff;
  `,
  warning: css`
    background: var(--degrade-yellow);
    color: #fff;
  `,
  info: css`
    background: var(--degrade-blue);
    color: #fff;
  `,
  creation: css`
    background: var(--degrade-purple);
    color: #fff;
  `
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 10px;
  height: 100px;
  /* padding: 0.875rem 2rem; */

  .info {
    display: flex;
    align-items: center;
    gap: 0.875rem;

    .numberCard {
      font-size: 2.5rem;
      font-weight: 700;
      color: #fff;
      line-height: 40px;
    }
  }
  ${(props) => cardTypeVariations[props.type || 'info']}
`;
