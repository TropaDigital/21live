import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Main = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  background-color: #F6F7FB;

  .contentMain {
    padding: 30px;
    height: 100%;
    width: 100%;
  }
`;