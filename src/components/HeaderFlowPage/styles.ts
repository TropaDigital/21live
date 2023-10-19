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
  align-items: center;
  gap: 24px;
`;

export const TitleHeader = styled.h1`
  font-size: var(--text-headline-md);
  font-weight: var(--weight-bold);
  line-height: 38px;
  /* letter-spacing: -0.02em; */
  color: var(--title-color);
`;

export const HeaderBackButton = styled.button`
  display: flex;
  align-items: center;

  width: 100px;
  height: 38px;

  background-color: transparent;

  border-right: 1px solid var(--gray-300);
`;
