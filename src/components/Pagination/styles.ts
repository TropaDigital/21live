import styled, { css } from 'styled-components';

import { shade } from 'polished';

interface ButtonProps {
  isActive?: boolean;
  isDirect?: boolean;
}

export const ContainerPaginate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  .buttonPagination {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: transparent;
    padding: 4px 8px;

    font-weight: 500;
    font-size: 14px;
    color: #344054;

    :disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .currentButtonPAgination {
    display: grid;
    place-items: center;

    width: 40px;
    height: 40px;
    color: #667085;
    font-weight: 500;
    font-size: 14px;

    background-color: transparent;
    border-radius: 4px;
    transition: background-color 0.35s ease;

    :hover {
      transition: background-color 0.35s ease;
      background-color: #e2f2ff;
      color: #0077e6;
    }

    &.isActive {
      background-color: #e2f2ff;
      color: #0077e6;
    }
  }
`;

export const ButtonPaginate = styled.button<ButtonProps>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 40px;
  height: 40px;
  text-align: center;
  color: var(--text-color-light);
  background-color: transparent;
  font-size: 0.875rem;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    background: ${shade(0.1, '#3A6EC1')};
    color: #fff;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: #3a6ec1;
      font-size: 1.075rem;
    `}
`;
