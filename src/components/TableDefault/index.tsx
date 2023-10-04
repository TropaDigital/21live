import { ReactNode } from 'react';

import { Container, TitleTable } from './styles';

interface DataTable {
  title: string;
  children: ReactNode;
  titleSize?: string;
  titleWeight?: string;
  titleColor?: string;
}

export function TableDefault({ title, children, titleColor, titleSize, titleWeight }: DataTable) {
  return (
    <Container>
      <TitleTable titleColor={titleColor} titleSize={titleSize} titleWeight={titleWeight}>
        {title}
      </TitleTable>

      <table>{children}</table>
    </Container>
  );
}
