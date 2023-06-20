import { ReactNode } from 'react';

import ScrollAreas from '../Ui/ScrollAreas';
import { Container, ContainerTable } from './styles';

interface DataTable {
  children: ReactNode;
}

export function Table({ children }: DataTable) {
  return (
    <ContainerTable>
      <ScrollAreas>
        <Container style={{ marginTop: '1rem' }}>{children}</Container>
      </ScrollAreas>
    </ContainerTable>
  );
}
