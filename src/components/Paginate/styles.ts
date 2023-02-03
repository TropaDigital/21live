import { shade } from "polished";
import styled, { css } from "styled-components"

interface ButtonProps {
    isActive?: boolean;
    isDirect?: boolean;
}

export const ContainerPaginate = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 20px;
`;

export const ButtonPaginate = styled.button<ButtonProps>`
    border: 1px solid rgba(0,0,0,.1);
    width: 40px;
    height: 40px;
    text-align: center;
    color: var(--text-color-light);
    background-color: transparent;
    font-size: .875rem;
    font-weight: 600;
    transition: .2s;

    &:hover {
        background: ${shade(0.1, '#3A6EC1')};
        color: #fff;
    }

    ${({ isActive }) => isActive && css`
        color: #3A6EC1;
        font-size: 1.075rem;
    `}
`;