// Libraries
import * as Dialog from '@radix-ui/react-dialog';

// Styles
import { PandaContainer } from './styles';

// Images
import PandaLoader from '../../../assets/LoadingPanda.gif';

interface Props {
  title?: string;
  isOpen: boolean;
  onOpenChange?(open: boolean): void;
  closeBtn?: boolean;
  maxWidth?: string;
}

export default function ModalLoader({ onOpenChange, isOpen, maxWidth }: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlayLoader" />
        <Dialog.Content className="DialogContentLoader" style={{ maxWidth: maxWidth }}>
          <PandaContainer>
            <img src={PandaLoader} alt="" />
          </PandaContainer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
