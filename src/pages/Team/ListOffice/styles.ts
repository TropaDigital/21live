import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PermissionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PermissionsTitle = styled.h4`
  color: var(--gray-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);
`;

export const PermissionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 22px 18px;

  .permission-field {
    display: flex;
    align-items: center;
    gap: 10px;

    color: var(--gray-600);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
    line-height: 18px;
    text-transform: capitalize;
  }
`;
