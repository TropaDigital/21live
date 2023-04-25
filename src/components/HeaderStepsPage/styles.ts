import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 30px;

  border-left: 2px solid var(--gray-200);

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
  width: 450px;
  font-size: var(--text-headline-md);
  font-weight: var(--weight-bold);
  line-height: 38px;
  /* letter-spacing: -0.02em; */
  color: var(--title-color);

  padding-left: 40px;
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 4px;

  padding-right: 48px;

  color: var(--gray-700);
  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);

  border-right: 2px solid var(--gray-200);
`;

export const StepCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 620px;
  height: 4px;
  background: var(--gray-300);
  margin-left: 48px;

  .step {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;
    
    background: var(--gray-300);
    /* border: 4px solid red; */
    box-sizing: content-box;

    position: relative;

    &.active {
      background: var(--primary);
      border: 4px solid var(--primary-50);
    }

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      background: var(--light);
    }
  }
`;
