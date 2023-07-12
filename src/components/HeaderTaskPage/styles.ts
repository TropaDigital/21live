import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 16px 30px;
  background: var(--gray-025);
  border-left: 2px solid var(--gray-200);

  border-bottom: 1px solid #eaecf0;
  /* margin-bottom: 1.5rem; */

  /* @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  } */
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
