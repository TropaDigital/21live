import { ReactNode } from 'react';

import { Container, ContainerTable } from './styles';
import ScrollAreas from '../Ui/ScrollAreas';

interface DataTable {
  children: ReactNode;
}

export function Table({ children }: DataTable) {
  return (
    <ContainerTable>
      <ScrollAreas>
        <Container style={{ marginTop: '1rem' }}>
          {children}
        </Container>
      </ScrollAreas>
    </ContainerTable>
  );
}
