/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div`
`;

export const EstimatedTime = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: fit-content;

    span {
        font-size: var(--text-small-sm);
        font-weight: var(--weight-medium);
        color: var(--gray-700);
    }
`

export const EstimatedTimeInputs = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 220px;
`
