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

            &.awaiting {
              background: var(--warning-100);
              color: var(--warning-700);
            }

            &.canceled {
              background: var(--error-100);
              color: var(--error-600);
            }

            &.creation {
              background-color: #cebbff;
              color: #3f2289;
            }

            &.finished {
              background: var(--secundary-100);
              color: var(--secundary-700);
            }

            &.progress {
              background: var(--primary-050);
              color: var(--primary-700);
            }

            &.hold {
              background-color: var(--gray-200);
              color: var(--gray-800);
            }
          }
        }
      }
    }
  }
`;

export const FiltersRequests = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 24px;

  /* width: 100%; */
  padding: 0 1.5rem;
  margin-bottom: 16px;

  div {
    flex: none;
  }

  .search-field {
    max-width: 300px;
  }

  .close-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;
