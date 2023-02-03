import styled from "styled-components";
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ContentBoard = styled.div`
  display: flex;
  gap: 12px;
  
  height: 100%;
  width: 100%;
`;

export const CardBord = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #E3E5EA;

  width: 320px;

  padding: 10px;
  border: 1px solid #c6c7c7;
  border-radius: 0.625rem;
  box-shadow: var(--shadow);
`;

export const HeaderBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleBoard = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--gray-600);
  text-transform: uppercase;
  margin-bottom: 5px;
`;

export const ButtonHeaderBoard = styled.button`
  display: grid;
  place-items: center;
  background-color: transparent;
  padding: 2px;
  border: none;
  border-radius: 50%;

  :hover {
    background-color: ${shade(0.25, '#E3E5EA')};
  }

  :focus {
    box-shadow: 0 0 0 2px #c6c7c7;
  }

  transition: all 0.35s ease;
`;

export const InfoBoard = styled.div`
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
