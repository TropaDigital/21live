// Icons
import { IconArrowLeft } from '../../assets/icons';

// Styles
import { Container, HeaderBackButton, SectionTitleHeader, TitleHeader } from './styles';

interface Props {
  title: string;
  backButton?: () => void;
}

export default function HeaderFlow({ title, backButton }: Props) {
  return (
    <Container>
      <SectionTitleHeader>
        <HeaderBackButton onClick={backButton}>
          <IconArrowLeft />
          Voltar
        </HeaderBackButton>
        <TitleHeader>{title}</TitleHeader>
      </SectionTitleHeader>
    </Container>
  );
}
