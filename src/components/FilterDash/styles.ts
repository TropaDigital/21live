import styled from 'styled-components';

export const ContainerFilter = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  background: var(--background-primary);
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
`;

export const FilterTitle = styled.div`
  color: var(--gray-900);
  font-size: var(--text-small-lg);
  font-weight: var(--weight-semibold);
`;

export const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;

  padding: 24px;
`;

export const FilterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
`;
