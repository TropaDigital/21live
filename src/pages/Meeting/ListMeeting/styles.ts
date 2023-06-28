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
