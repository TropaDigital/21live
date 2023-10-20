import styled from 'styled-components';

export const ContainerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  height: fit-content;

  background-color: #f6f7fb;
  border-radius: 10px;

  padding: 12px;
`;

export const GraphicsCard = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%;

  .graphicTitle {
    color: var(--primary);
    font-size: 30px;
    font-weight: 700;
    line-height: 38px; /* 126.667% */
  }
`;

export const JobStatusTable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  height: fit-content;
  width: 100%;
  max-width: 460px;

  border-radius: 12px;
  border: 1px solid var(--gray-200);
  overflow: hidden;

  table {
    width: 100%;
    border-spacing: 0;

    th {
      background-color: var(--gray-100);
      border-bottom: 1px solid #eaecf0;
      text-transform: capitalize;
      font-size: var(--text-small-xs);
      font-weight: var(--weight-medium);
      color: var(--gray-500);
      padding: 10px 1.5rem;
      text-align: left;
    }

    td {
      max-height: 40px;

      color: var(--gray-600);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      text-align: left;

      padding: 8px 1.5rem;

      background: #ffffff;
      border-bottom: 1px solid #eaecf0;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 38ch;
    }

    tbody {
      tr:nth-child(even) {
        td {
          background-color: var(--gray-50);
        }
      }
    }

    tfoot {
      td {
        padding: 0 1rem;
        border-bottom: none;
      }
    }
  }

  .status {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    width: fit-content;
    height: 24px;

    background-color: var(--warning-100);
    border-radius: 35px;

    padding: 2px 12px;

    color: var(--warning-700);

    &.progress {
      background-color: var(--primary-050);
      color: var(--primary-700);
    }

    &.finished {
      background-color: var(--secundary-050);
      color: var(--secundary-700);
    }
  }
`;

export const MensalReport = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

    .overflow-text {
      opacity: 0;
      background-color: #f6f7fb;

      position: absolute;
      top: 0;
      left: 0;
    }

    :hover {
      overflow: visible;
      .overflow-text {
        opacity: 1;
      }
    }
  }
`;
