
import { 
  Container,
  SectionTitleHeader,
  TitleHeader,
  SubTitleHeader,
  SectionActionsHeader,
} from './styles';

interface Props {
  title: string;
  subTitle?: string;
  children?: JSX.Element,
}

export default function HeaderPage({ title, subTitle, children }: Props) {
  return (
    <Container>
      <SectionTitleHeader>
        <TitleHeader>{title}</TitleHeader>
        <SubTitleHeader>{subTitle}</SubTitleHeader>
      </SectionTitleHeader>

      {children && (
        <SectionActionsHeader>
          {children}
        </SectionActionsHeader>
      )}
    </Container>
  )
}
