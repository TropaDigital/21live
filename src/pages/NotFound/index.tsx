/* eslint-disable import-helpers/order-imports */
// Icons
import { RiArrowGoBackLine } from 'react-icons/ri';
import { LogoIcon } from '../../assets/icons';

// Components
import ButtonDefault from '../../components/Buttons/ButtonDefault';

// Styles
import { CenterSection, ImageSection, LogoSection, NumberSection, PageWrapper } from './styles';

// Images
import Mascote from '../../assets/Mascote.png';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <LogoSection>
        <LogoIcon />
      </LogoSection>

      <CenterSection>
        <NumberSection>
          404
          <div className="ops-text">Ops! Página não encontrada.</div>
          <div className="back-button">
            <ButtonDefault typeButton="secondary" onClick={() => navigate('/dashboard')}>
              <RiArrowGoBackLine />
              Voltar
            </ButtonDefault>
          </div>
        </NumberSection>

        <ImageSection>
          <div className="img" style={{ backgroundImage: `url(${Mascote})` }}></div>
          <div className="circle"></div>
        </ImageSection>
      </CenterSection>
    </PageWrapper>
  );
}
