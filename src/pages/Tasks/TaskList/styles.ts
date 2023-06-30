/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const ModalShowTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Flag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

  svg {
    width: 20px;
    height: 20px;
  }

  &.flagged {
    svg {
      path {
        fill: #f04438;
      }
    }
  }
`;
