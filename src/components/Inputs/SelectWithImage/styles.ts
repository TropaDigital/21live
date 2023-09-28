import styled from 'styled-components';

export const ContainerSelect = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .client-option {
    display: flex;
    align-items: center;
    gap: 12px;

    .client-image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

export const LabelSelect = styled.div`
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);
  color: var(--gray-700);
  margin-bottom: 5px;
`;
