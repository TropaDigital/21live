import styled from 'styled-components';

export const ContainerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 150px;

  background-color: #f6f7fb;
  border-radius: 10px;

  padding: 12px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  .user-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: purple;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .user-name {
    display: flex;
    flex-direction: column;
    gap: 4px;

    min-width: 120px;
    max-width: 180px;

    color: var(--primary-900);
    font-size: var(--text-headline-sm);
    font-weight: var(--weight-bold);

    span {
      color: var(--title-color);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-bold);
    }
  }
`;

export const GraphicsCard = styled.div`
  width: 50%;
`;

export const MensalReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 180px;

  .report-bold {
    color: var(--title-color);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-bold);
  }

  .report-info {
    color: var(--gray-500);
    font-size: var(--text-small-md);
    font-weight: var(--weight-regular);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 160px;

    position: relative;
  }
`;
