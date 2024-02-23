import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  width: 100%;
  height: fit-content;
  /* height: 86px; */
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

  border-right: 2px solid var(--gray-300);

  cursor: pointer;
`;

export const RightSideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* height: 100%; */
`;

export const HeaderTitleInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding-left: 20px;
`;

export const TitleTopInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .id {
    color: var(--gray-500);
  }

  .task-name {
    color: var(--gray-900);
    text-transform: capitalize;
  }

  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
`;

export const TitleBottomInfos = styled.div`
  color: var(--gray-500);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);

  text-transform: capitalize;
`;

export const RightButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderProductInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  padding-left: 20px;

  border-left: 2px solid var(--gray-300);
`;

export const TitleProductInfos = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .id {
    color: var(--gray-500);
  }

  .product-name {
    color: var(--gray-900);
    text-transform: capitalize;
  }

  .product-description {
    color: var(--gray-900);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    text-transform: capitalize;
  }

  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);
`;

export const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  background-color: transparent;
  border-radius: 8px;

  position: relative;

  .change-user {
    position: absolute;
    bottom: -5px;
    right: -5px;
  }
`;
