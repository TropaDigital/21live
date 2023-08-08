import { BiX } from 'react-icons/bi';

import * as Dialog from '@radix-ui/react-dialog';

import FilterMenu from '../../Filter';

interface Props {
  isOpen: boolean;
  onOpenChange?(open: boolean): void;
  closeBtn?: boolean;
  maxWidth?: string;
  filterProps?: SelectedFilters;
  clearFilters: any;
  applyFilters: any;
  selectedFilters: any;
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
  clearFilters,
  applyFilters,
  selectedFilters
}: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="Overlay" />
        <Dialog.Content className="ModalContent" style={{ maxWidth: maxWidth }}>
          <FilterMenu
            clearFilters={clearFilters}
            applyFilters={applyFilters}
            selectedFilters={selectedFilters}
          />
          {closeBtn && (
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <BiX size={30} color="#6C757D" />
              </button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
