import { useState } from 'react'
import Mentions from './Mentions';
import Details from './Tip';

import { Container } from './styles';

export default function ComponentsForms() {
  const [description, setDescription] = useState('Um bom texto')

  return (
    <Container>
      <Mentions setDescription={setDescription} description={description} />
      <Details description={description} />
    </Container>
  );
}
