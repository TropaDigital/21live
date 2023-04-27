import styled from 'styled-components';

export const Container = styled.div``;

export const FormWrapper = styled.div`
  padding: 40px 30px;

  .label-observation {
    p {
      color: var(--gray-700);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
      margin-bottom: 6px;
    }
  }
`;

export const FormTitle = styled.h2`
  color: var(--title-color);
  font-size: var(--h4-font-size);
  font-weight: var(--weight-bold);

  margin-bottom: 24px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 30px;
  background: var(--background-primary);
  position: absolute;
  bottom: 0;
  width: 100%;

  border-left: 2px solid var(--gray-200);

  .fieldGroup {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;
