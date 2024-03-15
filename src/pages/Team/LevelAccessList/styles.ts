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
