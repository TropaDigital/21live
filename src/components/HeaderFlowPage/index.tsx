// Icons
import { IconArrowLeft } from '../../assets/icons';

// Styles
import {
  Container,
  HeaderBackButton,
  SectionActionsHeader,
  SectionTitleHeader,
  TitleHeader
} from './styles';

interface Props {
  title: string;
  backButton?: () => void;
  children?: JSX.Element;
}

export default function HeaderFlow({ title, backButton, children }: Props) {
  return (
    <Container>
      <SectionTitleHeader>
        <HeaderBackButton onClick={backButton}>
          <IconArrowLeft />
          Voltar
        </HeaderBackButton>
        <TitleHeader>{title}</TitleHeader>
      </SectionTitleHeader>

      {children && <SectionActionsHeader>{children}</SectionActionsHeader>}
    </Container>
  );
}
