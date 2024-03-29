import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 20px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;
    & + li {
      margin-top: 15px;
    }
    background-color: #e2f2ff;
    border: 1px solid var(--primary);
    border-radius: 6px;
    padding: 8px;

    &.error {
      border: 1px solid #d92d20;
      background-color: #fef3f2;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;

    strong {
      font-weight: 500;
      font-size: 14px;
      color: #344054;
      &.error {
        color: #e57878;
      }
    }

    span {
      font-weight: 400;
      font-size: 14px;
      color: #667085;
      margin-top: 2px;
      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
`;

export const Preview = styled.div`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 10px;
`;
