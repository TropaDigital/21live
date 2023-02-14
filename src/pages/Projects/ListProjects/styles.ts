import styled from "styled-components";

export const Container = styled.div`
`;

export const ContentCardProject = styled.div`
  display: grid;
  /* grid-template-columns: minmax(260px, max-content) repeat(auto-fill, 180px) 15%; */
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
  width: 100%;
`;

export const CardProject = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  background-color: #F6F7FB;
  border-radius: 10px;
`;

export const TitleCardProject = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #222222;
  margin-bottom: 1rem;
`;

export const InfoCardProject = styled.div`
  
  h3 {
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    color: #6C757D;
    margin-bottom: 10px;
    span {
      font-weight: 400;
      margin-left: 4px;
    }
  }

  .sectionProgressCardProject {
    display: flex;
    flex-direction: column;
  }
`;

export const FooterProjectCard = styled.div`
  margin-top: 12px;
`;

export const FieldGroupCardProject = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 12px;
`;
