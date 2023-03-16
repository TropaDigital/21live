import { BiX } from 'react-icons/bi';

import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  title: string;
  isOpen: boolean;
  onOpenChange?(open: boolean): void;
  children: JSX.Element;
}

export default function ModalDefault({ children, onOpenChange, isOpen, title }: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          {children}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <BiX size={30} color="#6C757D" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
