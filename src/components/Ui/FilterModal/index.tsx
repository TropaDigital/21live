import { BiX } from 'react-icons/bi';

import * as Dialog from '@radix-ui/react-dialog';

import FilterMenu from '../../Filter';
import { CloseButton } from './styles';

interface Props {
  isOpen: boolean;
  onOpenChange?(open: boolean): void;
  closeBtn?: boolean;
  maxWidth?: string;
  filterProps?: SelectedFilters;
  applyFilters: any;
  clearFilters: any;
}

interface SelectedFilters {
  code: string;
  format: string;
  status: string;
  delivery: string;
  fromDate: string;
  toDate: string;
}

export default function FilterModal({
  onOpenChange,
  isOpen,
  closeBtn,
  maxWidth,
  filterProps,
  applyFilters,
  clearFilters
}: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="Overlay" />
        <Dialog.Content className="ModalContent" style={{ maxWidth: maxWidth }}>
          <FilterMenu applyFilters={applyFilters} clearFilters={clearFilters} />
          {closeBtn && (
            <Dialog.Close asChild>
              <CloseButton>
                <BiX size={30} color="#868E96" />
              </CloseButton>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
