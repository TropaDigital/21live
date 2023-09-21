import styled from 'styled-components';

interface OpenCard {
  showInfos: boolean;
}

export const ViewRequestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 30px;
`;

export const RequestInfosCard = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: 1px solid var(--gray-300);
  background: var(--background-primary);
`;

export const RequestInfoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  border-bottom: 1px solid var(--gray-300);

  padding: 12px 24px;

  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
`;

export const RequestInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px;
`;

export const RequestInfosTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .request-name {
    display: flex;
    align-items: center;
    gap: 4px;

    color: var(--gray-800);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);

    span {
      color: var(--gray-500);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);
    }
  }

  .request-status {
    display: flex;
    align-items: center;
    gap: 8px;

    color: var(--gray-800);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);

    .status {
      display: flex;
      align-items: center;

      padding: 4px 8px;
      width: fit-content;
      border-radius: 35px;
      background: var(--warning-100);

      color: var(--warning-700);
      font-size: var(--text-small-sm);
      font-weight: var(--weight-medium);

      &.progress {
        color: var(--primary-700);
        background: var(--primary-050);
      }

      &.finished {
        color: var(--secundary-700);
        background: var(--secundary-100);
      }
    }
  }

  .request-date {
    display: flex;
    align-items: center;
    gap: 4px;

    color: var(--gray-800);
    font-size: var(--text-small-md);
    font-weight: var(--weight-semibold);

    span {
      color: var(--gray-800);
      font-size: var(--text-small-md);
      font-weight: var(--weight-regular);
    }
  }
`;

export const RequestBottomCard = styled.div<OpenCard>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  min-height: 48px;
  height: ${(props) => (props.showInfos ? 'fit-content' : '48px')};
  overflow: hidden;

  padding: 12px 16px;

  border-radius: 4px;
  border: 1px solid var(--gray-300);
  background: var(--gray-50);
  box-shadow: 3px 3px 6px 0 var(--gray-200);
`;

export const BottomCardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-semibold);

  margin-bottom: 6px;

  cursor: pointer;
`;

export const BottomCardInfos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;

  background: var(--background-primary);
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);

  padding: 12px;
`;

export const BottomCardInfoSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoSideCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  .side-title {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-bold);
  }

  .side-info {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);

    white-space: pre-wrap;
  }
`;

export const BottomCardHistory = styled.div<OpenCard>`
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;

  opacity: ${(props) => (props.showInfos ? '1' : '0')};

  background: var(--background-primary);
  border: 1px solid var(--gray-300);
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 8px;

  color: var(--gray-900);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);

  span {
    color: var(--gray-400);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-regular);
  }
`;

export const PublicInteraction = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  border: 1px solid var(--gray-300);
  background: var(--background-primary);
`;

export const PublicTopCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--gray-300);

  padding: 12px 24px;

  color: var(--gray-900);
  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);
`;

export const PublicBottomCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;

  padding: 24px;
`;

export const PublicMessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  padding: 12px 0;
`;

export const PublicMessageImage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 55%;

  #react-doc-viewer #header-bar {
    display: none;
  }
`;

export const PublicImageWrapper = styled.div`
  width: 210px;
  height: 130px;

  border-radius: 4px;
  overflow: hidden;

  .image-interaction {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

export const PublicMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  .message-user {
    color: var(--gray-900);
    font-weight: var(--weight-bold);
    font-size: var(--text-small-md);
  }

  .message-body {
    color: var(--gray-900);
    font-size: var(--text-small-md);
    font-weight: var(--weight-medium);
  }
`;

export const MessageUser = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
`;

export const MessageResponseDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AvatarUser = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

export const ClockTimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 20px;
    height: 20px;
  }

  color: var(--gray-500);
  font-size: var(--text-small-md);
  font-weight: var(--weight-regular);
`;

export const ResponseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  background: none;
  color: var(--secundary-300);
  font-size: var(--text-small-lg);
  font-weight: var(--weight-semibold);

  transition: all 0.3s;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const BottomCardImages = styled.div`
  display: block;
  width: 100%;

  background: var(--background-primary);
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);

  padding: 12px;
`;

export const ImagesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  justify-items: center;
  gap: 24px;
`;

export const ImageCard = styled.div`
  display: flex;
  flex-direction: column;

  width: 250px;
  height: 250px;
  background: rgb(140, 203, 255);
  background: linear-gradient(100deg, rgba(140, 203, 255, 1) 0%, rgba(0, 70, 181, 1) 57%);

  border-radius: 8px;
  position: relative;
  overflow: hidden;

  .image {
    width: 250px;
    height: 150px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const DownloadIconBtn = styled.button`
  width: 250px;
  height: 50px;
  padding: 0 12px;
  background-color: transparent;
  opacity: 0;
  transition: all 0.3s;

  svg {
    margin-left: 90%;
    color: white;
  }

  ${ImageCard}:hover & {
    opacity: 1;
  }
`;

export const HoverIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 80%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0 0 8px 8px;

  opacity: 0;
  transition: all 0.4s;

  position: absolute;
  bottom: 0;
  left: -100px;

  font-size: 40px;

  svg {
    color: var(--primary-500);
  }

  ${ImageCard}:hover & {
    opacity: 1;
    left: 0;
  }
`;

export const ModalImage = styled.div`
  width: 70vw;
  height: 80vh;

  /* border: 2px solid var(--primary); */
  border-radius: 12px;

  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  position: relative;

  .close-button {
    width: 20px;
    height: 20px;
    transition: all 0.3s;
    cursor: pointer;

    position: absolute;
    top: 0;
    right: 0;
    margin-top: -35px;

    svg {
      font-size: 20px;
      font-weight: 600;
      color: var(--gray-500);
    }

    &:hover {
      transform: scale(1.3);
    }
  }
`;

export const ModalInteractionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ModalInteractionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 1000px;
  height: 60px;

  border-bottom: 1px solid var(--gray-300);

  color: var(--title-color);
  font-size: var(--text-small-md);
  font-weight: var(--weight-medium);

  .header-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .close-button {
    cursor: pointer;
    transition: all 0.3s;

    svg {
      color: #868e96;
    }

    &:hover {
      transform: scale(1.2);
      svg {
        color: var(--Danger);
      }
    }
  }
`;

export const ModalMessageInfo = styled.div`
  width: 100%;
`;
