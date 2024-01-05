import styled from 'styled-components';

export const InputTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.error {
    border: 2px solid var(--input-error);
    border-radius: 4px;
    padding: 4px 8px;
  }
`;

export const InputFieldTitle = styled.div`
  color: var(--gray-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);

  text-transform: capitalize;

  span {
    color: var(--input-error);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    margin-bottom: 6px;
  }
`;
