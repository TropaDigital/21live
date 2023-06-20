// Icons
import { IconPlus } from '../../../assets/icons';

// Styles
import { ButtonWrapper } from './styles';

interface ButtonProps {
  title: string;
  click: () => void;
}

export default function AddTextButton({ title, click }: ButtonProps) {
  return (
    <ButtonWrapper onClick={click}>
      <IconPlus />
      {title}
    </ButtonWrapper>
  );
}
