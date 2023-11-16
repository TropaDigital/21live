import styled from 'styled-components';

interface ContainerProps {
  type?:
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'creation'
    | 'jobSpot'
    | 'jobFee'
    | 'newFee'
    | 'newSpot'
    | 'team'
    | 'jobs';
}

// const cardTypeVariations = {
//   success: css`
//     background: var(--degrade-green);
//     color: #fff;
//   `,
//   danger: css`
//     background: var(--degrade-red);
//     color: #fff;
//   `,
//   warning: css`
//     background: var(--degrade-yellow);
//     color: #fff;
//   `,
//   info: css`
//     background: var(--degrade-blue);
//     color: #fff;
//   `,
//   creation: css`
//     background: var(--degrade-purple);
//     color: #fff;
//   `
// };

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  align-items: center;
  gap: 24px;

  border-radius: 10px;
  height: 110px;
  background-color: var(--background-primary);
  padding: 24px;

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    width: 100%;

    span {
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      color: var(--gray-500);
    }

    .numberCard {
      font-size: var(--text-headline-md);
      font-weight: var(--weight-semibold);
      color: var(--gray-800);
      line-height: 40px;
    }
  }

  .info-icon {
    height: 100%;
    font-size: 12px;

    svg {
      color: var(--gray-600);
      width: 24px;
      height: 24px;
    }
  }
`;
