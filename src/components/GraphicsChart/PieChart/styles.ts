import styled from 'styled-components';

export const Container = styled.div`
  width: 220px;
  height: 180px;

  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;

  position: absolute;
  bottom: 0;
  left: 35px;
  margin-bottom: -20px;

  .recharts-legend-item-text {
    color: var(--gray-500) !important;
    font-size: var(--text-small-xs);
    font-weight: var(--weight-medium);
  }
`;
