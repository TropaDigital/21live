import React from 'react'

import { Container } from './styled';
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { BiPlus } from 'react-icons/bi';

export default function ListFluxo() {
  return (
    <Container>
      <HeaderPage title="Fluxos">
        <ButtonDefault typeButton="success" onClick={() => console.log('OPEN')}>
          <BiPlus color="#fff" />
            Novo Fluxo
        </ButtonDefault>
      </HeaderPage>
    </Container>
  )
}
