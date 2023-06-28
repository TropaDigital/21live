import styled from "styled-components";
import { FiSettings } from 'react-icons/fi';

interface sidebarProps {
  modalActive?: boolean;
  active?: boolean;
}

interface PropsMenu {
  menuUser?: boolean;
}

export const Container = styled.div`
  display: grid;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;
  background-color: var(--primary);
  padding: 10px 30px;
`

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
  top: ${(props) => (props.menuUser ? '55px' : '-130px')};
  opacity: ${(props) => (props.menuUser ? '1' : '0.5')};

  transition: all .5s ease-in-out;
  z-index: 10;

  ul {
    display: flex;
    flex-direction: column;
    gap: 14px;


    li:not(:last-child) {
      border-bottom: 2px solid #E3E5EA;
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