// Icons
import { BiX } from 'react-icons/bi';

// Styles
import { CloseButton, ContainerBtn } from './styles';

interface CloseBtnProps {
  close: () => void;
  marginRight?: string;
  marginTop?: string;
}

export default function CloseModalBtn({ close, marginRight, marginTop }: CloseBtnProps) {
  return (
    <ContainerBtn>
      <CloseButton
        onClick={close}
        marginRigth={marginRight ? marginRight : ''}
        marginTop={marginTop ? marginTop : ''}
      >
        <BiX size={30} />
      </CloseButton>
    </ContainerBtn>
  );
}
