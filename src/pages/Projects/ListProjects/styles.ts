/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div``;

export const ModalShowProjectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const ModalShowProjectField = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 30px;

    .title-label {
        color: var(--gray-700);
        font-size: var(--text-small-sm);
        font-weight: var(--weight-medium);
    }

    .info-field {
        color: var(--gray-700);
        font-size: var(--text-small-md);
        font-weight: var(--weight-semibold);
        /* text-transform: capitalize; */
    }
`
