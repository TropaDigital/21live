import styled from 'styled-components';
import { FiSettings } from 'react-icons/fi';

interface sidebarProps {
  modalActive?: boolean;
  active?: boolean;
}

interface PropsMenu {
  menuUser?: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
  background-color: var(--primary);
  padding: 10px 30px;
`;

export const SectionProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  position: relative;
`;

export const Logo = styled.div<sidebarProps>`
  display: flex;
  align-items: center;
`;

export const ButtonBurguer = styled.button<sidebarProps>`
  display: flex;
  place-items: center;
  background-color: transparent;
  margin-left: 60px;

  > svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export const Profile = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  h2 {
    font-size: var(--text-small-sm);
    font-weight: var(--font-bold);
    white-space: nowrap;
    color: var(--background-primary);
  }
`;

export const ButtonConfigProfile = styled.div`
  display: grid;
  place-items: center;
`;

export const IconGear = styled(FiSettings)`
  width: 22px;
  height: 22px;
  color: var(--background-primary);
`;

export const ImageProfile = styled.div`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const SectionPopUpHeader = styled.div<PropsMenu>`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 245px;
  padding: 20px;
  border-radius: 10px;

  background-color: var(--background-primary);
  box-shadow: var(--shadow);

  position: absolute;
  top: ${(props) => (props.menuUser ? '50px' : '-170px')};
  opacity: ${(props) => (props.menuUser ? '1' : '0.5')};

  transition: all 0.5s ease-in-out;
  z-index: 10;

  ul {
    display: flex;
    flex-direction: column;
    gap: 14px;

    li:not(:last-child) {
      border-bottom: 2px solid #e3e5ea;
      padding-bottom: 14px;
    }

    li {
      display: flex;
      align-items: center;

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        background-color: transparent;

        font-size: 1rem;
        color: var(--text-color-light);
      }
    }
  }
`;

export const HeaderTimerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 0 12px;

  width: fit-content;
  max-width: 900px;
  height: 100%;

  background-color: white;

  border-radius: 8px;
  /* box-shadow: 1px 1px 1px 1px rgba(255, 255, 255, 0.5); */
`;

export const PlayPauseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  padding: 4px;

  border-radius: 4px;

  transition: ease-in-out 0.3s;

  cursor: pointer;

  &.play {
    background-color: var(--success-500);
  }

  &.stop {
    background-color: var(--primary);
  }

  svg {
    path {
      fill: var(--light);
    }
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export const StopWatchTimer = styled.div`
  display: flex;
  align-items: center;
  width: 92px;
  height: 32px;

  font-size: var(--text-small-xl);
  font-weight: var(--weight-semibold);

  &.stopped {
    color: var(--primary);
  }

  &.running {
    color: var(--success-500);
  }
`;

export const TaskInfoPlayer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  color: var(--gray-800);
  font-size: var(--text-small-lg);
  font-weight: var(--weight-semibold);

  .id-task {
    color: var(--gray-500);
  }

  .extra-task-infos {
    color: var(--gray-500);
    font-size: var(--text-small-sm);
    font-weight: var(--weight-medium);
  }
`;
