import styled from 'styled-components';

export const FilterBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EssayView = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  flex: 1 0 0;
  padding: 14px;
  min-height: 50vh;

  border-radius: var(--spacing-spacing-08, 8px);
  border: 1px solid var(--gray-200);
  background: var(--background-primary);

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
  line-height: 24px;
`;
