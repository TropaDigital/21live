import { useState } from 'react'
import HeaderPage from '../../../components/HeaderPage';

import { Container, HeaderEditPlus, ContentEditFluxo } from './styled';
import { useParams } from 'react-router-dom';

export default function EditFluxo() {
  let { id } = useParams();

  console.log('ID', id)
  return (
    <Container>
      <HeaderPage title="Fluxos" />

      <HeaderEditPlus>
        <h1>Fase do fluxo <span>Campanha</span></h1>
        <h3>Adicione ou remova etapas do seu fluxo.</h3>
      </HeaderEditPlus>

      <ContentEditFluxo>

      </ContentEditFluxo>
      
    </Container>
  )
}
