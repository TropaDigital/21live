/* eslint-disable prettier/prettier */
import styled from 'styled-components';

export const Container = styled.div``;

export const EstimatedTime = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;

  span {
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    color: var(--gray-700);
  }
`;

export const EstimatedTimeInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 220px;
`;

export const ModalProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* .info {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 24px;

    color: var(--gray-500);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);

    span {
      color: var(--gray-700);
      font-size: var(--text-small-md);
      font-weight: var(--weight-semibold);
    }
  } */

  .category-input {
    min-width: 420px;
  }
`;

export const ModalCategoryButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 8px;
`;

export const TableKits = styled.table`
  .fieldLongText {
    max-width: 150px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ShowServicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: scroll;

  @media (min-width: 768px) {
    overflow-x: visible;
  }
`;

export const ShowServiceData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  max-height: 215px;
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: var(--gray-100);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray-500);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--gray-700);
  }

  .service-show-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    min-height: 40px;
    transition: all 300ms ease-in-out;

    &:hover {
      background-color: var(--gray-50);
    }
  }

  .service-data {
    width: 200px;
    height: 40px;
    text-transform: capitalize;
    padding: 10px 15px;
    color: var(--gray-800);

    &.header {
      font-weight: var(--weight-semibold);
      background-color: var(--gray-100);
    }

    &.center {
      text-align: center;
      display: flex;
      justify-content: center;
    }

    &.service {
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.chevron {
      transition: all 300ms;

      &.show {
        transform: rotate(180deg);
      }
    }
  }
`;

export const ShowServiceDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 80px;
  gap: 15px;
  text-align: center;
  overflow: hidden;
  transition: height 300ms;

  &.isOpen {
    height: 115px;
  }

  &.hidden {
    height: 0;
  }

  .detailsContainer {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .detailTitle {
    font-size: var(--text-small-sm);
    color: var(--gray-500);
  }

  .detailValue {
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
  }
`;

export const ModalSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  border: 1px solid var(--gray-200);
  border-radius: 8px;

  &.big {
    min-width: 712px;
    max-width: 792px;
  }

  .title {
    background: var(--gray-50);
    border-bottom: 1px solid var(--gray-200);
    width: 100%;
    height: 60px;

    color: var(--gray-500);
    font-size: var(--text-small-lg);
    font-weight: var(--weight-medium);

    padding: 16px 24px;
    text-align: left;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &.small {
      height: 56px;
    }
  }
`;
