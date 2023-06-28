/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const ModalShowTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TableFlag = styled.td`
  svg {
    width: 20px;
    height: 20px;
  }

  &.flagged {
    svg {
      path {
        fill: #F04438;
      }
    }
  }
`;
