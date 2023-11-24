import styled from 'styled-components';

export const ParametersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  margin: 32px;
  padding: 32px;

  background-color: var(--background-primary);
  border-radius: 10px;
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.05);
`;

export const ParametersTitle = styled.h2`
  color: var(--title-color);
  font-size: var(--text-small-lg);
  font-weight: var(--weight-semibold);
`;

export const FieldsLine = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const SaveButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  width: 100%;
`;
