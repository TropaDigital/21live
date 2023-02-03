import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  border-bottom: 1px solid #e3e5ea;
  padding-bottom: 4px;
  margin-bottom: 1.87rem;

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
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 60px;
  letter-spacing: -0.02em;
  color: var(--title-color);
`;

export const SubTitleHeader = styled.span`
  font-size: .875rem;
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
`