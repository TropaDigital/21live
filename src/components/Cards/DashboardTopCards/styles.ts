import styled from 'styled-components';

export const WrapperCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
`;
