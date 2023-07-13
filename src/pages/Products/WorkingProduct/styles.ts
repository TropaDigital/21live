import styled from 'styled-components';

export const SectionCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 24px 40px;
`;

export const CardsTopWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const TabsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  height: 36px;

  margin: 0 40px;
  border-bottom: 1px solid var(--gray-200);
`;

export const TaskTab = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;

  width: fit-content;
  height: 100%;
  background: transparent;
  border-bottom: 1px solid transparent;

  color: var(--gray-500);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-semibold);

  transition: all 0.3s;

  svg {
    width: 16px;
    height: 16px;
    path {
      stroke: var(--gray-500);
    }
  }

  &:hover,
  &.active {
    color: var(--primary-900);
    border-radius: 0;
    border: none;
    border-bottom: 1px solid var(--primary-900);

    svg {
      path {
        stroke: var(--primary-900);
      }
    }
  }

  .notification {
    width: 5px;
    height: 5px;
    background-color: var(--error-500);
    border-radius: 100%;
  }
`;

export const WorkSection = styled.div`
  margin: 24px 40px 0 40px;
  padding-bottom: 100px;

  .ProseMirror {
    height: 260px;
  }

  @media (min-height: 800px) {
    .ProseMirror {
      height: 400px;
    }
  }
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.error {
    border: 2px solid var(--input-error);
    border-radius: 4px;
    padding: 4px 8px;
  }

  .ProseMirror {
    height: 160px;
  }
`;

export const InputFieldTitle = styled.div`
  color: var(--gray-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-medium);

  span {
    color: var(--input-error);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
    margin-bottom: 6px;
  }
`;

export const SectionChatComments = styled.div`
  height: 50vh;
  position: relative;
  overflow-y: auto;

  @media (max-height: 800px) {
    height: 40vh;
  }
`;

export const InputChat = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  gap: 8px;

  padding: 10px 14px;
  position: absolute;
  bottom: 0;
  left: 0;

  height: 44px;
  width: 100%;

  border-bottom: 2px solid var(--gray-200);
  background: var(--gray-50);

  input {
    background: transparent;
    border: none;
  }
`;

export const ChatSendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: transparent;
  transition: all 0.3s;

  svg {
    path {
      stroke: var(--gray-400);
    }
  }

  &:hover {
    transform: scale(1.2);
    background: var(--success-200);

    svg {
      path {
        stroke: var(--success-800);
      }
    }
  }
`;
