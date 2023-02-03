import styled, { css } from "styled-components";

interface Props {
  length: number
}

interface AvatarProps {
  isImage: boolean;
}

export const ContainerAvatar = styled.div<AvatarProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  .avatarDefault {
    display: grid;
    place-items: center;

    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 3px solid #fff;

    /* ${({isImage}) => isImage && css`
      border: 3px solid #ced4da;
    `} */

    > img {
      border-radius: 50%;
      width: 36px;
      height: 36px;
    }

    .avatarBadg {
      display: grid;
      place-items: center;

      width: 100%;
      height: 100%;
      border-radius: 50%;

      color: #fff;
      text-transform: uppercase;
    }
  }
`;

export const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ul {
    display: grid;

    ${({ length }) => css`
      grid-template-columns: ${`repeat(${length + 1}, 1.2rem)`};
    `}

    .avatar-ui {
      width: 2.37rem;
      height: 2.37rem;
      border-radius: 50%;
      border: 3px solid #fff;
      display: grid;
      place-items: center;

      &.isOnline {
        border: 3px solid #93E088;
      }

      &.isAvatar {
        border: 3px solid #ced4da;
      }
  
      img {
        max-width: 100%;
        border-radius: 50%;
        height: 100%;
      }
      transition: transform 300ms;
    }
  
    .avatar-ui:hover ~ .avatar-ui  {
      transform: translateX(.625rem);
    }
  }
`;

export const SectionAllAvatars = styled.div`
  display: grid;
  place-items: end;
`;