import { Link } from 'react-router-dom';

import { IconArrowLeft, IconCheckedBlue } from '../../assets/icons';

import { BackButton, Container, SectionTitleHeader, StepCounter, TitleHeader } from './styles';

interface HeaderProps {
  title: string;
  backButton?: boolean;
  stepSelected: number;
  backPage?: string;
  // children?: JSX.Element;
}

export default function HeaderStepsPage({
  title,
  backButton,
  stepSelected,
  backPage
}: HeaderProps) {
  return (
    <>
      <Container>
        {backButton && (
          <Link to={backPage ? backPage : '/'}>
            <BackButton>
              <IconArrowLeft />
              Voltar
            </BackButton>
          </Link>
        )}
        <SectionTitleHeader>
          <TitleHeader>{title}</TitleHeader>
        </SectionTitleHeader>

        <StepCounter
          className={
            stepSelected === 1
              ? 'one'
              : stepSelected === 2
              ? 'two'
              : stepSelected === 3
              ? 'three'
              : stepSelected === 4
              ? 'four'
              : ''
          }
        >
          <div className={stepSelected === 1 ? 'step active' : 'step'}>
            {stepSelected > 1 && (
              <div className="checked">
                <IconCheckedBlue />
              </div>
            )}
          </div>
          <div className={stepSelected === 2 ? 'step active' : 'step'}>
            {stepSelected > 2 && (
              <div className="checked">
                <IconCheckedBlue />
              </div>
            )}
          </div>
          <div className={stepSelected === 3 ? 'step active' : 'step'}>
            {stepSelected > 3 && (
              <div className="checked">
                <IconCheckedBlue />
              </div>
            )}
          </div>
          <div className={stepSelected === 4 ? 'step active' : 'step'}>
            {stepSelected > 4 && (
              <div className="checked">
                <IconCheckedBlue />
              </div>
            )}
          </div>
        </StepCounter>
      </Container>
    </>
  );
}
