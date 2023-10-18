import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 1px solid rgba(0, 0, 0, 0.7);
  object-fit: contain;
  overflow: hidden;

  .client-image {
    width: 50px;
    height: 50px;

    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;
