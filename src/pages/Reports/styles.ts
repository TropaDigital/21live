import styled from 'styled-components';

interface LogoProps {
  bgColor: string;
}

export const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  background: var(--background-primary);
  border-radius: 12px;

  margin: 40px 30px;

  padding: 20px;
`;

export const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 20px;

  border-bottom: 2px solid var(--gray-200);
`;

export const ClientWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ClientLogo = styled.div<LogoProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  background: ${({ bgColor }) => (bgColor ? bgColor : 'black')};
  border-radius: 8px;

  .logo-img {
    background-size: cover;
    background-repeat: no-repeat;
    width: 90%;
    height: 90%;
  }
`;

export const ClientInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  height: 140px;

  .report-title {
    color: var(--title-color);
    font-size: var(--text-headline-sm);
    font-weight: var(--weight-bold);
    text-transform: uppercase;
  }

  .client-name {
    color: var(--title-color);
    font-size: var(--text-small-md);
    font-weight: var(--weight-bold);
    text-transform: uppercase;
  }

  .infos {
    color: var(--title-color);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
  }
`;

export const ReportMonth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  height: 140px;

  .title-info {
    color: var(--title-color);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-bold);
    text-transform: uppercase;
  }

  .month {
    color: var(--title-color);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
  }
`;

export const ReportCards = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 50%;
  height: 380px;

  border-radius: 12px;

  padding: 18px 24px;

  .card-title {
    display: flex;
    flex-direction: column;
    gap: 8px;

    margin-bottom: 24px;

    color: var(--title-color);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-bold);
    text-transform: uppercase;

    span {
      color: var(--title-color);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      text-transform: uppercase;
    }
  }

  .card-subtitle {
    color: var(--title-color);
    font-size: var(--text-small-md);
    font-weight: var(--weight-bold);
    text-transform: uppercase;

    margin-top: 12px;
  }

  .info-line {
    color: var(--title-color);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
    text-transform: uppercase;
  }

  &.light {
    background: var(--gray-100);
  }

  &.dark {
    background: var(--gray-300);
  }
`;

export const BulletPointInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;

  .bullet {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);

    text-transform: uppercase;

    &.space {
      margin-top: 20px;
    }
  }

  span {
    text-transform: none;
  }

  .bullet::before {
    content: '▪';
    margin-right: 12px;
  }
`;

export const ReportCardTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;

  gap: 10px;

  background-color: var(--background-primary);
  padding: 10px 20px 20px 20px;

  border: 1px solid var(--gray-200);
  border-radius: 10px;
  box-shadow: var(--shadow);

  .card-title {
    color: var(--title-color);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-bold);
  }
`;
