import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

`;

export const Main = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  background-color: #f6f7fb;

  .contentMain {
    /* padding: 0 30px; */
    width: 100%;
    height: 100%;
    flex: 1;
  }
`;
