import styled from 'styled-components';

export const HeaderRequestWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 64px;
  height: fit-content;

  background: var(--gray-025);
  border-left: 2px solid var(--gray-200);
  border-bottom: 1px solid var(--gray-200);

  padding: 12px 30px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 4px;
  background-color: transparent;

  padding-right: 24px;

  color: var(--gray-700);
  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);

  border-right: 2px solid var(--gray-300);

  cursor: pointer;
`;

export const RightSideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const RequestHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-left: 24px;

  .fixed-title {
    display: flex;
    align-items: center;
    gap: 8px;

    color: var(--gray-500);
    font-size: var(--text-small-xl);
    font-weight: var(--weight-semibold);

    svg {
      width: 24px;
      height: 24px;
      path {
        stroke: var(--gray-500);
      }
    }
  }

  .mutable-title {
    color: var(--gray-900);
    font-size: var(--text-small-xl);
    font-weight: var(--weight-semibold);
  }
`;
