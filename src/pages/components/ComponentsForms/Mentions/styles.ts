import styled from "styled-components";

export const ContainerMentions = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  >div {
    width: 100%;
  }
`;

export const ContainerButtonsMentions = styled.div`

  button {
    font-size: inherit;
    font-family: inherit;
    color: #000;
    margin: 0.1rem;
    border: 1px solid black;
    border-radius: 0.3rem;
    padding: 0.1rem 0.4rem;
    background: white;
    accent-color: black;
    
    &.is-active {
      background: black;
      color: #fff;
    }
  }

`

export const MentionsItems = styled.div`
  padding: 0.2rem;
  position: relative;
  border-radius: 0.5rem;
  background: #FFF;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  font-size: 0.9rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05),
    0px 10px 20px rgba(0, 0, 0, 0.1);

  .item {
    display: block;
    margin: 0;
    width: 100%;
    text-align: left;
    background: transparent;
    border-radius: 0.4rem;
    border: 1px solid transparent;
    padding: 0.2rem 0.4rem;
    color: #000;


    &.is-selected {
      border-color: #000;
    }
  }
`;