import styled from 'styled-components';

export const Container = styled.div`
  div > table {
    tbody {
      td {
        padding: 16px;
      }
    }
  }
`;

export const ModalShowProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: var(--gray-800);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  padding: 6px 12px;

  background: var(--gray-100);
  border-radius: 6px;

  .file-name {
    width: 100%;
    max-width: 85%;

    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .file-icons {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const DownloadFileBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  background-color: transparent;
  border-radius: 8px;

  transition: all 0.3s;

  &:hover {
    background-color: var(--secundary-100);

    svg {
      color: var(--secundary-900);
    }
  }
`;

export const ViewFileBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;

  background-color: transparent;
  border-radius: 8px;

  transition: all 0.3s;

  &:hover {
    background-color: var(--primary-100);

    svg {
      color: var(--primary-900);
    }
  }
`;

export const ProjectStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;
  width: fit-content;
  border-radius: 35px;
  background: var(--warning-100);

  color: var(--warning-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);

  &.progress {
    background: var(--primary-050);
    color: var(--primary-700);
  }

  &.finished {
    background: var(--secundary-100);
    color: var(--secundary-700);
  }

  &.overdue {
    background: var(--error-100);
    color: var(--error-700);
  }
`;

export const FilterProjects = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ModalTasksOnProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding: 12px;
  position: relative;

  min-width: 500px;
`;

export const TaskListOnUse = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: -12px;
  max-height: 300px;

  overflow-y: auto;

  .list-title {
    color: var(--title-color);
    font-weight: var(--weight-medium);
    margin-left: -24px;
  }

  padding-left: 24px;
`;

export const TaskListItem = styled.li`
  display: list-item;

  list-style: disc !important;
`;

export const TaskInfosItem = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  background-color: var(--gray-100);
  padding: 4px 6px;
  border-radius: 4px;

  .task {
    span {
      color: var(--gray-500);
      font-weight: var(--weight-bold);
    }
  }
`;

export const AlertDelete = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;
