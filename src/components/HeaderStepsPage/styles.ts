import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 12px 30px;
  background: #fff;
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
  margin-left: auto;

  &.one {
    background: linear-gradient(to right, #0046b5 0%, #0046b5 0%, #d0d5dd 0%, #d0d5dd 100%);
    background: -moz-linear-gradient(
      left,
      #0046b5 0%,
      #0046b5 0%,
      #d0d5dd 7%,
      #d0d5dd 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      #0046b5 0%,
      #0046b5 0%,
      #d0d5dd 0%,
      #d0d5dd 100%
    ); /* Chrome10-25,Safari5.1-6 */
  }
  &.two {
    background: linear-gradient(to right, #0046b5 0%, #0046b5 25%, #d0d5dd 25%, #d0d5dd 100%);
    background: -moz-linear-gradient(
      left,
      #0046b5 0%,
      #0046b5 25%,
      #d0d5dd 25%,
      #d0d5dd 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      #0046b5 0%,
      #0046b5 25%,
      #d0d5dd 25%,
      #d0d5dd 100%
    ); /* Chrome10-25,Safari5.1-6 */
  }
  &.three {
    background: linear-gradient(to right, #0046b5 0%, #0046b5 68%, #d0d5dd 68%, #d0d5dd 100%);
    background: -moz-linear-gradient(
      left,
      #0046b5 0%,
      #0046b5 68%,
      #d0d5dd 68%,
      #d0d5dd 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      #0046b5 0%,
      #0046b5 68%,
      #d0d5dd 68%,
      #d0d5dd 100%
    ); /* Chrome10-25,Safari5.1-6 */
  }
  &.four {
    background: linear-gradient(to right, #0046b5 0%, #0046b5 99%, #d0d5dd 99%, #d0d5dd 100%);
    background: -moz-linear-gradient(
      left,
      #0046b5 0%,
      #0046b5 100%,
      #d0d5dd 100%,
      #d0d5dd 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      #0046b5 0%,
      #0046b5 100%,
      #d0d5dd 100%,
      #d0d5dd 100%
    ); /* Chrome10-25,Safari5.1-6 */
  }

  .step {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    overflow: hidden;

    background: var(--gray-300);
    /* border: 4px solid red; */
    box-sizing: content-box;

    position: relative;

    .checked {
      width: 100%;
      height: 100%;
      background-color: var(--primary);
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
    }

    &.active {
      background: var(--primary);
      border: 4px solid var(--primary-50);
    }

    &::after {
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

    &:nth-last-child(1) {
      margin-left: 2px;
    }
  }
`;
