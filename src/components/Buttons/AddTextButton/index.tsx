// Icons
import { IconPlus } from '../../../assets/icons';

// Styles
import { ButtonWrapper } from './styles';

interface ButtonProps {
  title: string;
  marginTop?: string;
  click: () => void;
}

export default function AddTextButton({ title, click, marginTop }: ButtonProps) {
  return (
    <ButtonWrapper onClick={click} style={{ marginTop: marginTop }}>
      <IconPlus />
      {title}
    </ButtonWrapper>
  );
}
