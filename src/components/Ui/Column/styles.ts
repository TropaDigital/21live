import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #E3E5EA;

  width: 320px;

  padding: 10px;
  border: 1px solid #c6c7c7;
  border-radius: 0.625rem;
  box-shadow: var(--shadow);
`;

export const HeaderColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleColumn = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--gray-600);
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const ButtonHeaderColumn = styled.button`
  display: grid;
  place-items: center;
  background-color: transparent;
  padding: 2px;
  border: none;
  border-radius: 50%;

  :hover {
    background-color: ${shade(0.1, '#F0F0F0')};
  }

  :focus {
    box-shadow: 0 0 0 2px #c6c7c7;
  }

  transition: all 0.35s ease;
`;

export const InfoColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  .infoBoxIcon {
    display: flex;
    align-items: center;
    gap: 4px;

    span {
      font-size: 14px;
      color: #6C757D;
      font-weight: 700;
    }
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;