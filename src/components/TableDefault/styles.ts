import styled from 'styled-components';

interface TitleProps {
  titleSize?: string;
  titleWeight?: string;
  titleColor?: string;
}

export const Container = styled.div`
  background: #ffffff;
  box-shadow: var(--shadow);
  border-radius: 10px;
  padding: 15px 20px;

  table {
    width: 100%;
    border-spacing: 5px 0;

    tbody > tr:nth-child(2n) td {
      background-color: var(--gray-50);
    }

    th {
      background-color: var(--primary);
      border-radius: 5px;
      text-transform: capitalize;
      font-size: var(--text-small-sm);
      font-weight: var(--weight-bold);
      color: var(--light);
      padding: 8px 24px;
      text-align: center;
      line-height: 20px;
    }
    td {
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      color: var(--gray-700);
      border: 0;
      padding: 1rem 2rem;
      background: #ffffff;
      border-radius: 5px;
      text-align: center;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 38ch;

      .fieldTableClients {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
    }

    .container {
      margin: 100px auto;
      width: 500px;
      text-align: center;
    }
  }

  @media (max-width: 1600px) {
    max-width: 1280px;
    overflow-x: auto;
  }
`;

export const TitleTable = styled.h1<TitleProps>`
  font-size: ${({ titleSize }) => (titleSize ? titleSize : 'var(--text-small-xl)')};
  font-weight: ${({ titleWeight }) => (titleWeight ? titleWeight : 'var(--weight-semibold)')};
  color: ${({ titleColor }) => (titleColor ? titleColor : 'var(--title-color)')};
  text-transform: capitalize;
  margin-bottom: 1rem;
  margin-left: 5px;
`;
