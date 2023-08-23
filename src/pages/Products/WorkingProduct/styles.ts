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
  padding-bottom: 40px;

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
  height: 55vh;
  position: relative;

  @media (max-height: 800px) {
    height: 50vh;
  }
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  background: var(--background-primary);
  overflow-y: auto;

  border: 2px solid var(--gray-200);
  border-radius: 8px;
  box-shadow: 3px 5px 6px 1px rgba(0, 0, 0, 0.2);
  padding: 12px 12px 60px 12px;

  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--gray-900);
  &::-webkit-scrollbar {
    width: 8px;
    background: #e2e2e2;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background: #86848d;
    border-radius: 12px;
  }
`;

export const ChatMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const MessageInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  max-width: 300px;
  padding: 16px;
  border-radius: 4px;

  /* background: var(--gray-100); */
  background: var(--primary-050);

  &.left {
    margin-left: auto;
  }
`;

export const UserMessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 0;

  .user-name {
    color: var(--gray-700);
    font-size: 10px;
    font-weight: var(--weight-bold);
    text-transform: uppercase;
  }

  .date-message {
    color: var(--gray-400);
    font-size: 10px;
    font-weight: var(--weight-bold);
    text-transform: uppercase;
  }
`;

export const UserMessage = styled.div`
  color: var(--gray-700);
  font-size: var(--text-small-sm);
  font-weight: var(--weight-regular);
`;

export const ChatUserImg = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 40px;

  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-size: contain;
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
  bottom: 6px;
  left: 12px;

  height: 44px;
  width: 98%;

  border-bottom: 2px solid var(--gray-200);
  border-radius: 4px;
  background: var(--gray-100);
  box-shadow: 1px 1px 6px 1px rgba(0, 0, 0, 0.3);

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

export const FooterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  padding-top: 16px;
`;

export const EssayInfo = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  flex: 1 0 0;
  padding: 14px;
  min-height: 50vh;

  border-radius: var(--spacing-spacing-08, 8px);
  border: 1px solid var(--gray-200);
  background: var(--background-primary);

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
  line-height: 24px;
`;
