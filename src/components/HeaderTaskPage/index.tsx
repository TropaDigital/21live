// React
import { Link } from 'react-router-dom';

// Icons
import { IconArrowLeft } from '../../assets/icons';

// Styles
import { BackButton, Container } from './styles';

interface HeaderTaskProps {
  title: string;
  backPage?: string;
  buttonType?: 'finish' | 'send';
  disableButton?: boolean;
}

export default function HeaderOpenTask({
  title,
  backPage,
  buttonType,
  disableButton
}: HeaderTaskProps) {
  return (
    <Container>
      <Link to={backPage ? backPage : '/dashboard'}>
        <BackButton>
          <IconArrowLeft />
          Voltar
        </BackButton>
      </Link>
    </Container>
  );
}
