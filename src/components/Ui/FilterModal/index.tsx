// Icons
import { BiX } from 'react-icons/bi';

// Libraries
import * as Dialog from '@radix-ui/react-dialog';

import FilterMenu from '../../Filter';
import { CloseButton } from './styles';
import FilterTask from '../../FilterTask';
import FilterProduct from '../../FilterProduct';
import FilterTeam from '../../FilterTeam';
import FilterMeeting from '../../FilterMeeting';
import FilterDash from '../../FilterDash';

interface Props {
  isOpen: boolean;
  onOpenChange?(open: boolean): void;
  closeBtn?: boolean;
  maxWidth?: string;
  filterProps?: SelectedFilters;
  applyFilters: any;
  clearFilters: any;
  filterType: string;
  clientSelected?: any;
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
  clearFilters,
  clientSelected,
  filterType
}: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="Overlay" />
        <Dialog.Content className="ModalContent" style={{ maxWidth: maxWidth }}>
          {filterType === 'ticket' && (
            <FilterMenu applyFilters={applyFilters} clearFilters={clearFilters} />
          )}
          {filterType === 'task' && (
            <FilterTask
              applyFilters={applyFilters}
              clearFilters={clearFilters}
              selectedClient={clientSelected}
            />
          )}
          {filterType === 'product' && (
            <FilterProduct applyFilters={applyFilters} clearFilters={clearFilters} />
          )}
          {filterType === 'team' && (
            <FilterTeam
              applyFilters={applyFilters}
              clearFilters={clearFilters}
              roleSelected={clientSelected}
            />
          )}
          {filterType === 'meet' && (
            <FilterMeeting applyFilters={applyFilters} clearFilters={clearFilters} />
          )}
          {filterType === 'dash' && (
            <FilterDash applyFilters={applyFilters} clearFilters={clearFilters} />
          )}
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
