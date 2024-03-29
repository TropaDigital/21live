import styled from 'styled-components';

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 0;
  right: 0;
  margin-right: 44px;
  margin-top: 32px;
  background: var(--background-primary);

  svg {
    transition: all 0.3s;
    color: var(--gray-400);
  }

  &:hover {
    svg {
      color: var(--Danger);
    }
  }
`;
