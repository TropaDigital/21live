import styled from 'styled-components';

interface CloseBtnProps {
  marginRigth: string;
  marginTop: string;
}

export const ContainerBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseButton = styled.button<CloseBtnProps>`
  width: 24px;
  height: 24px;

  position: absolute;
  top: 0;
  right: 0;
  margin-right: ${({ marginRigth }) => (marginRigth ? marginRigth : '0px')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0px')};
  background: var(--background-primary);

  svg {
    transition: all 0.3s;
    color: var(--gray-400);
  }

  &:hover {
    svg {
      color: var(--Danger);
      transform: scale(1.2);
    }
  }
`;
