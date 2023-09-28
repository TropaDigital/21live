import styled from 'styled-components';

export const RequestsWrapper = styled.div`
  table {
    tbody {
      tr {
        td {
          .status {
            display: flex;
            align-items: center;

            padding: 4px 8px;
            width: fit-content;
            border-radius: 35px;
            background: var(--warning-100);

            color: var(--warning-700);
            font-size: var(--text-small-sm);
            font-weight: var(--weight-medium);

            &.progress {
              color: var(--primary-700);
              background: var(--primary-050);
            }

            &.finished {
              color: var(--secundary-700);
              background: var(--secundary-100);
            }
          }
        }
      }
    }
  }
`;
