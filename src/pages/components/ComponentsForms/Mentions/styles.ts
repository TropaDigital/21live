import styled from "styled-components";

export const ContainerMentions = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 10px; */

  width: 100%;

  >div {
    width: 100%;
  }
`;

export const ContainerButtonsMentions = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;

  padding: 10px 8px;
  background-color: #F2F4F7;
  border: 1px solid #EAECF0;
  border-radius: 8px 8px 0px 0px;

  .butonBarColor {
    display: grid;
    place-items: center;
    height: 28px;
    width: 28px;

    position: relative;

    input[type=color] {
      -webkit-appearance: none;
      position: absolute;

      width: 28px;
      height: 28px;
      opacity: 0;
    }
  }

`;

export const ButtonBar = styled.button`
  display: grid;
  place-items: center;
  height: 28px;
  width: 28px;

  border-radius: 0.3rem;
  background-color: transparent;
  border: none;
  transition: all 0.35s ease;
  &.is-active {
  transition: all 0.35s ease;
    svg {
      transform: scale(1.1);
      path {
        fill: #495057;
      }
    }
  }
`;

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