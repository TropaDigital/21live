import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .contentData {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
`;
