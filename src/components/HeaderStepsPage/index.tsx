import { Link } from 'react-router-dom';

import { IconArrowLeft } from '../../assets/icons';

import { BackButton, Container, SectionTitleHeader, StepCounter, TitleHeader } from './styles';

interface HeaderProps {
  title: string;
  backButton?: boolean;
  stepSelected: number;
  // children?: JSX.Element;
}

export default function HeaderStepsPage({ title, backButton, stepSelected }: HeaderProps) {
  return (
    <>
      <Container>
        {backButton && (
          <Link to={'/projetos'}>
            <BackButton>
              <IconArrowLeft />
              Voltar
            </BackButton>
          </Link>
        )}
        <SectionTitleHeader>
          <TitleHeader>{title}</TitleHeader>
        </SectionTitleHeader>

        <StepCounter>
          <div className={stepSelected >= 1 ? 'step active' : 'step'}></div>
          <div className={stepSelected >= 2 ? 'step active' : 'step'}></div>
          <div className={stepSelected >= 3 ? 'step active' : 'step'}></div>
          <div className={stepSelected >= 4 ? 'step active' : 'step'}></div>
        </StepCounter>
      </Container>
    </>
  );
}
