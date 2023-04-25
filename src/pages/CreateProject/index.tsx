import { useState } from 'react';

import HeaderStepsPage from '../../components/HeaderStepsPage';

import { Container } from './styles';

export default function CreateProject() {
  const [steps, setSteps] = useState<number>(1);

  return (
    <Container>
      <HeaderStepsPage
        title="Criar novo projeto/contrato"
        backButton={steps === 1}
        stepSelected={steps}
      ></HeaderStepsPage>
    </Container>
  );
}
