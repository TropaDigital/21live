import styled from 'styled-components';

export const Container = styled.div`
  background: #ffffff;
  box-shadow: var(--shadow);
  border-radius: 10px;
  padding: 15px 20px;

  table {
    width: 100%;
    border-spacing: 5px 0;

    tbody > tr:nth-child(2n) td {
      background-color: #f6f7fb;
    }

    th {
      color: var(--light);
      background-color: var(--primary);
      border-radius: 5px;
      text-transform: capitalize;
      font-weight: 700;
      font-size: var(--small-font-size);
      padding: 1rem 2rem;
      text-align: center;
      line-height: 1.5rem;
    }
    td {
      font-size: var(--small-font-size);
      font-weight: 400;
      color: var(--text-color-light);
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
`;

export const TitleTable = styled.h1`
  font-size: var(--small-font-size);
  text-transform: capitalize;
  font-weight: 700;
  color: var(--title-color);
  margin-bottom: 10px;
`;
