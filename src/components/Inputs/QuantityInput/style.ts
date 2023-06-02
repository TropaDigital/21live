/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const WrapperCounter = styled.div`
    display: flex;
    align-items: center;    
    width: 120px;
    height: 32px;

    border: 1px solid var(--gray-200);
    border-radius: 4px;
    overflow: hidden;
`

export const CounterButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--primary-100);
`;

export const NumberInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;

    input {
        text-align: center;
        border: none;
        height: 28px;
        width: 92%;
    }
`