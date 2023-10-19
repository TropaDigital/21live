import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  background: var(--background-primary);
  /* box-shadow: var(--shadow-light); */
  border-radius: 8px;
`;

export const ContentTask = styled.div`
  padding: 10px;
`;

export const HeaderTask = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .colorTask {
    display: flex;
    align-items: center;
    gap: 4px;

    .colorTask:first-child {
      background-color: #ffd66e;
    }

    .colorTask {
      width: 44px;
      height: 6px;
      border-radius: 5px;
      background-color: #37c3ff;
    }
  }
`;

export const HeaderTaskButton = styled.button`
  display: grid;
  place-items: center;

  border-radius: 50%;
  background-color: transparent;

  :hover {
    background-color: ${shade(0.1, '#E3E5EA')};
  }

  :focus {
    box-shadow: 0 0 0 2px #c6c7c7;
  }
`;

export const MainTask = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const TitleTask = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: var(--title-color);
`;

export const FieldGroupTask = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;

  .sectionDataTask {
    display: flex;
    align-items: center;

    .buttonFlagTask {
      display: grid;
      place-items: center;

      background-color: transparent;
      margin-left: 6px;
    }
  }
`;

export const DataSpan = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: #0046b5;
`;

export const FooterTask = styled.div`
  width: 100%;
`;
