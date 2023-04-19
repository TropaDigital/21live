import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 30px;

  border-bottom: 1px solid #eaecf0;
  /* margin-bottom: 1.5rem; */

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SectionTitleHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleHeader = styled.h1`
  font-size: var(--text-headline-md);
  font-weight: var(--weight-bold);
  line-height: 38px;
  /* letter-spacing: -0.02em; */
  color: var(--title-color);
`;

export const SubTitleHeader = styled.span`
  font-size: 0.875rem;
  line-height: 18px;
  color: var(--text-color-light);
`;

export const SectionActionsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 760px) {
    width: 100%;

    button {
      width: 100%;
    }
  }

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;
