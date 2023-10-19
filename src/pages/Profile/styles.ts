import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding: 0 30px;
`;

export const HeaderDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SectionTitleHeaderDefault = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  border-bottom: 1px solid #e3e5ea;
  padding-bottom: 10px;
`;

export const TitleHeaderDefault = styled.h1`
  font-size: var(--text-headline-xl);
  font-weight: var(--weight-bold);
  line-height: 60px;
  letter-spacing: -0.02em;
  color: var(--title-color);
`;

export const SubTitleHeaderDefault = styled.span`
  font-size: var(--text-small-sm);
  line-height: 18px;
  color: var(--text-color-light);
`;

export const ContentPerfil = styled.form`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;

  padding: 1.25rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: var(--shadow);

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const SectionInfoPerfilLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 20px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    /* height: 186px; */
    border-radius: 50%;
  }
  label {
    position: absolute;
    right: 0px;
    bottom: 0px;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #312e28;
    }
    &:hover {
      background: ${shade(0.1, '#ff9000')};
    }
  }
`;

export const SectionInfoPerfilRight = styled.div`
  width: 70%;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const SectionCustHours = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  padding: 20px;
  background: #f6f7fb;
  border-radius: 10px;

  .custPerHoursInfo {
    font-size: var(--text-small-xs);
    line-height: 16px;
    color: #6c757d;
    margin-top: 14px;
  }
`;

export const SectionActionForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
