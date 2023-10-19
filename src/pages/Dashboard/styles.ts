import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .contentData {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }
`;

export const GraphicLine = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  gap: 16px;
`;

export const CardBase = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  gap: 10px;

  background-color: var(--background-primary);
  padding: 10px 20px 20px 20px;

  border-radius: 10px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);

  .card-title {
    color: var(--title-color);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-bold);
  }
`;

export const JobStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;

  width: fit-content;
  height: 24px;
  border-radius: 35px;
  background: var(--warning-100);

  color: var(--warning-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);
  text-transform: capitalize;

  &.progress {
    color: var(--primary-700);
    background: var(--primary-050);
  }

  &.finished {
    color: var(--secundary-700);
    background: var(--secundary-100);
  }
`;

export const ServicePerformance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  background-color: var(--background-primary);
  padding: 10px 20px 20px 20px;

  border-radius: 10px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);

  .title-service {
    color: var(--title-color);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-bold);
  }
`;

export const UserCardService = styled.div`
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

export const MensalReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 150px;

  .report-bold {
    color: var(--title-color);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-bold);
  }

  .report-info {
    color: var(--gray-500);
    font-size: var(--text-small-md);
    font-weight: var(--weight-regular);
  }
`;

export const BlueCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 215px;
  height: 120px;
  border-radius: 10px;
  background-color: var(--primary-050);

  .numberCard {
    color: var(--primary-900);
    font-size: var(--text-headline-xl);
    font-weight: var(--weight-bold);
  }

  .blueCard-title {
    color: var(--primary-900);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
  }

  &.small {
    height: 76px;
  }
`;

export const GridServiceWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 215px;
  gap: 12px;
  width: 100%;
  height: fit-content;
  background-color: #f6f7fb;
  border-radius: 10px;

  padding: 12px;
`;
