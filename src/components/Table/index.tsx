import { ReactNode } from 'react';

import { Container } from './styles';

interface DataTable {
  children: ReactNode;
}

export function Table({ children }: DataTable) {
  return <Container style={{ marginTop: '1rem' }}>{children}</Container>;
}
