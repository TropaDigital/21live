import styled from 'styled-components';

import { shade } from 'polished';
export const Container = styled.div``;

export const Calender = styled.aside`
  width: 780px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(
      .DayPicker-Day--outside
    ):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const ButtonsFilter = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 40px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  overflow: hidden;
`;

export const FilterButton = styled.button`
  height: 100%;
  padding: 10px 16px;
  background: transparent;

  color: var(--gray-800);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);

  cursor: pointer;
  transition: all 0.3s;

  &.selected {
    background-color: var(--gray-200);
  }

  &.borders {
    border-left: 1px solid var(--gray-300);
    border-right: 1px solid var(--gray-300);
    padding: 10px 16px;
  }

  &:hover {
    background-color: var(--gray-300);
  }
`;

export const ModalInfosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 500px;

  padding-top: 20px;

  position: relative;

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: transparent;

    position: absolute;
    top: -40px;
    right: 0;
    transition: all 0.3s;

    svg {
      width: 32px;
      height: 32px;
      path {
        stroke: var(--gray-600);
      }
    }

    &:hover {
      transform: scale(1.3);

      svg {
        path {
          stroke: var(--Danger);
        }
      }
    }
  }
`;

export const ModalField = styled.div`
  display: flex;
  gap: 12px;
  height: fit-content;

  .title-info {
    color: var(--gray-600);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
    line-height: 24px;
  }

  .info {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
    line-height: 24px;
    text-transform: uppercase;

    text-align: justify;
  }

  &.info-description {
    flex-direction: column;

    .info {
      text-transform: none;
    }
  }
`;

export const NamesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const NameField = styled.div`
  width: fit-content;
  height: 24px;

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
`;

export const FilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  background-color: var(--gray-100);
  border-radius: 4px;
  padding: 6px 8px;

  color: var(--title-color);

  .file-icons {
    display: flex;
    align-items: center;
    gap: 12px;
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
