/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div`

   div > table {
        tbody {
            td {
                padding: 16px;
            }
        }
    }
`;

export const ModalShowProjectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
`

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: var(--gray-800);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
` 
