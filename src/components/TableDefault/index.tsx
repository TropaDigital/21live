import { ReactNode } from 'react';
import { Container, TitleTable } from './styles';

interface DataTable {
  title: string;
  children: ReactNode;
}

export function TableDefault({ title, children }: DataTable) {
  return (
    <Container>
      <TitleTable>{title}</TitleTable>

      <table>
        {children}
      </table>
    </Container>
  );
}
