import styled from 'styled-components';

export const ButtonIcon = styled.div`
  display: grid;
  place-items: center;

  background: transparent;
  border: none;
  border-radius: 4px;
  padding: 8px;
  height: 36px;
  width: 36px;
  transition: all 0.35s ease;

  cursor: pointer;

  &:hover {
    svg {
      fill: var(--success-800);
    }
    background: var(--success-200);
  }
`;

export const FilterRoles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const WrapperPermissionsCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 60px 1rem;
  margin-top: 1rem;

  width: 900px;
`;

export const CardPermission = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .card-title {
    display: flex;
    align-items: center;

    margin-bottom: 8px;

    color: var(--gray-700);
    font-size: var(--text-small-xl);
    font-weight: var(--weight-bold);
  }
`;

export const DescriptionView = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  flex: 1 0 0;
  padding: 14px;
  min-height: 10vh;

  border-radius: var(--spacing-spacing-08, 8px);
  border: 1px solid var(--gray-200);
  background: var(--background-primary);

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
  line-height: 24px;
`;

export const DescriptionInfo = styled.div`
  color: var(--gray-600);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);

  p {
    color: var(--gray-600);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
  }
`;
