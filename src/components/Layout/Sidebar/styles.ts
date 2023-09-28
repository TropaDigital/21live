import styled, { css } from 'styled-components';

interface sidebarProps {
  modalActive?: boolean;
  active?: boolean;
}

export const Container = styled.div<sidebarProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 60px);
  width: ${(props) => (props.modalActive ? '78px' : '220px')};
  background: var(--background-primary);
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.03);
  padding: 6px 14px;
  transition: all 0.5s ease;
  position: relative;

  overflow-y: scroll;
  z-index: 1;

  ::-webkit-scrollbar {
    display: none;
  }

  .scrolltrack {
    position: absolute;
    width: 6px;
    right: 0px;
    bottom: 2px;
    top: 2px;
    border-radius: 100px;
    background: #0046b5;
    > div {
      background: #3a6ec1 !important;
    }
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  margin-top: 20px;
`;

export const Li = styled.li<sidebarProps>`
  width: 100%;
  height: 50px;
  list-style: none;
  line-height: 50px;
  border-radius: 12px;
  position: relative;
  ${(props) =>
    props.active &&
    css`
      background: var(--primary-050);
    `}
  a {
    display: flex;
    align-items: center;
    white-space: nowrap;
    text-decoration: none;
    border-radius: 12px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
  span {
    font-size: var(--text-small-md);
    color: var(--primary-light);
    font-weight: ${(props) => (props.active ? 'var(--weight-semibold)' : 'var(--weight-medium)')};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .tooltip {
    position: absolute;
    left: 133px;
    top: 0;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    height: 35px;
    width: 122px;
    line-height: 35px;
    text-align: center;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0s;
    opacity: 0;
    pointer-events: none;
    display: ${(props) => (props.modalActive ? 'block' : 'none')};
    z-index: 9;
  }
  svg {
    min-width: 50px;
    line-height: 50px;
    text-align: center;
    transition: all 0.5s;
    transform: ${(props) => (props.active ? 'scale(1.2)' : 'scale(1)')};
    color: var(--primary-light);
  }
  &:hover {
    svg {
      transition: all 0.5s;
      transform: scale(1.3);
    }
    .tooltip {
      top: 50%;
      transition: all 0.5s ease;
      opacity: 1;
    }
  }
`;

// export const SectionNotification = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   border-radius: 16px;
//   padding: 12px;

//   background: var(--background);

//   position: relative;

//   button {
//     display: grid;
//     place-items: center;

//     width: 100%;
//     height: 48px;

//     border: none;
//     border-radius: 12px;
//     background: linear-gradient(
//       90deg,
//       rgba(103, 116, 236, 1) 0%,
//       rgba(137, 236, 242, 1) 100%
//     );
//     font-size: 16px;
//     font-weight: bold;
//     color: #fff;

//     margin-top: 16px;
//   }

// `;

// export const NotificationImage = styled.div`
//   display: grid;
//   place-items: center;

//   position: absolute;
//   top: -28px;

//   img {
//     width: 60px;
//     height: 60px;
//     object-fit: cover;
//     border-radius: 50%;
//   }
// `;

// export const Message = styled.div`
//   display: grid;
//   place-items: center;
//   width: 80%;

//   margin-top: 40px;

//   span {
//     font-size: 16px;
//     font-weight: bold;
//     color: var(--primary);
//     text-align: center;
//   }
// `;
