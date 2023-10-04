import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 180px;
  padding: 1rem;

  display: flex;
  align-content: center;
  flex-direction: column;
  gap: 12px;
  margin-left: -10%;

  /* background-color: #fff;
  box-shadow: var(--shadow);
  border-radius: 1rem; */

  .sectionInfo {
    span {
      color: var(--title-color);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-bold);
    }
  }
`;
