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
import FilterProject from '../../FilterProject';

interface Props {
  isOpen: boolean;
  onOpenChange?(open: boolean): void;
  closeBtn?: boolean;
  maxWidth?: string;
  applyFilters: any;
  clearFilters: any;
  filterType: string;
  clientSelected?: any;
  responsible?: any;
}

export default function FilterModal({
  onOpenChange,
  isOpen,
  closeBtn,
  maxWidth,
  applyFilters,
  clearFilters,
  clientSelected,
  filterType,
  responsible
}: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="Overlay" />
        <Dialog.Content className="ModalContent" style={{ maxWidth: maxWidth }}>
          {filterType === 'ticket' && (
            <FilterMenu
              applyFilters={applyFilters}
              clearFilters={clearFilters}
              selectedStatus={clientSelected}
            />
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
            <FilterMeeting
              applyFilters={applyFilters}
              clearFilters={clearFilters}
              selectedClient={clientSelected}
              selectedResponsible={responsible}
            />
          )}
          {filterType === 'dash' && (
            <FilterDash applyFilters={applyFilters} clearFilters={clearFilters} />
          )}
          {filterType === 'project' && (
            <FilterProject
              applyFilters={applyFilters}
              clearFilters={clearFilters}
              selectedClient={clientSelected}
            />
          )}
          {closeBtn && (
            <Dialog.Close asChild>
              <CloseButton>
                <BiX size={30} />
              </CloseButton>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
