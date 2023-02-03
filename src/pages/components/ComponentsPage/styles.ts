import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Content = styled.div`
  table {
    width: 100%;
    height: 100%;
    border-spacing: 0 0.5rem;
    display: inline-block;
    overflow: auto;
    border-collapse: separate !important;

    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) #ced4da;
    ::-webkit-scrollbar {
      width: 4px;
      height: 11px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #adb5bd;
      border-radius: 4px;
      border: 3px solid #ced4da;
    }
    ::-webkit-scrollbar-track {
      border-radius: 4px;
      background: #ced4da;
    }

    th {
      color: var(--title-color);
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.2rem;
      background: var(--gray-200);
    }
    td {
      padding: 0.5rem 1rem;
      border: 0;
      background: transparent;
      color: var(--title-color);
      border-radius: 0.25rem;
    }
  }
`;
