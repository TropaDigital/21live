import styled from 'styled-components';

interface Props {
  bottom?: number;
}

export const ContainerDefault = styled.div`

`;

export const SectionDefault = styled.div`
  padding: 24px 30px;
  height: 100%;
`;

export const ContainerGroupTable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  box-shadow: var(--shadow);
`;

export const FieldDefault = styled.div`
  margin-bottom: 1.25rem;
`;

export const FieldGroup = styled.div`
  flex: 1;
  display: flex;
  gap: 24px;
`;

export const FieldFormDefault = styled.div<Props>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ bottom }) => (bottom ? bottom + 'px' : '24px')};

  @media (max-width: 800px) {
    margin-bottom: 12px;
  }
`;

export const FieldGroupFormDefault = styled.div`
  flex: 1;
  display: flex;
  gap: 24px;

  button,
  > div {
    width: 100%;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const FooterModal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  > div {
    display: flex;
    gap: 12px;
  }
`;

export const ContentDefault = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  height: 100%;

  padding: 1.25rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: var(--shadow);
`;
