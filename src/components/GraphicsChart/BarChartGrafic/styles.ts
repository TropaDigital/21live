import styled from 'styled-components';

interface SizeProps {
  height: string;
}

export const Container = styled.div<SizeProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : '380px')};
  padding: 1rem;

  display: flex;
  align-content: center;
  flex-direction: column;
  gap: 12px;

  background-color: #fff;
  box-shadow: var(--shadow);
  border-radius: 1rem;

  .sectionInfo {
    span {
      color: var(--title-color);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-bold);
    }
  }
`;
