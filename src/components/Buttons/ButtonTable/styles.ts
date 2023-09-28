import styled, { css } from 'styled-components';
interface ButtonProps {
  typeButton?: 'view' | 'delete' | 'edit' | 'work';
}

const buttonVariations = {
  view: css`
    &:hover {
      svg {
        fill: #dc6803;
      }
      background: #fef0c7;
      color: #fff;
    }
  `,
  delete: css`
    &:hover {
      svg {
        fill: #d92d20;
      }
      background: #fee4e2;
      color: #fff;
    }
  `,
  edit: css`
    &:hover {
      svg {
        fill: #1570ef;
      }
      background: #d1e9ff;
      color: #fff;
    }
  `,
  work: css`
    &:hover {
      svg {
        fill: #027a48;
      }
      background: #d1fadf;
      color: #fff;
    }
  `
};

export const Container = styled.button<ButtonProps>`
  display: grid;
  place-items: center;

  background: transparent;
  border: none;
  border-radius: 4px;
  padding: 8px;
  height: 36px;
  width: 36px;
  transition: all 0.35s ease;

  svg {
    fill: #344054;
  }

  ${(props) => buttonVariations[props.typeButton || 'view']}
`;
