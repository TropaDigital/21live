import styled from 'styled-components';

export const Container = styled.div`
  padding: 40px 30px;
`;

export const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const FormTitle = styled.h1`
  color: var(--title-color);
  font-size: var(--text-headline-sm);
  font-weight: var(--weight-bold);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormLine = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;
