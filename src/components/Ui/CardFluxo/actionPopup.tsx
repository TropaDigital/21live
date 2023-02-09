import * as Popover from '@radix-ui/react-popover';
import Alert from '../Alert';

import { FiMoreHorizontal } from 'react-icons/fi';
import { BiLeftArrowAlt, BiRightArrowAlt, BiX } from 'react-icons/bi';

import { ButtonHeaderCardFluxo, ContainerPopupCard } from './styles'

interface PropsPopup {
  handleOnDelete: (ai: any) => void;
  handleOnPosition: (index: number) => void;
  index: any
  length: number;
}

export default function ActionPopup({ handleOnDelete, handleOnPosition, index, length }: PropsPopup) {

  return (
    <ContainerPopupCard>
      <Popover.Root>
        <Popover.Trigger asChild>
          <ButtonHeaderCardFluxo
            aria-label="Update dimensions"
          >
            <FiMoreHorizontal />
          </ButtonHeaderCardFluxo>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content  className="PopoverContentActionCard" sideOffset={5}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <p className="Text" style={{ marginBottom: 2 }}>
                Ações
              </p>
              <ul className="listActionsCardFluxo">
                {index !== 0 && (
                  <li>
                    <Popover.Close asChild>
                      <button type='button' onClick={() => handleOnPosition(index - 1)}>
                        <BiLeftArrowAlt size={18} color='#444444' />
                        Mover para esquerda
                      </button>
                    </Popover.Close>
                  </li>
                )}
                {(index + 1 < length) && (
                  <li>
                    <Popover.Close asChild>
                      <button type='button' onClick={() => handleOnPosition(index + 1)}>
                        <BiRightArrowAlt size={18} color='#444444' />
                        Mover para direita
                      </button>
                    </Popover.Close>
                  </li>
                )}
                <li className='listDeleteCardFluxo'>
                  <Alert
                    title='Atenção'
                    subtitle='Certeza que gostaria de remover esse card? Ao excluir a acão não poderá ser desfeita.'
                    cancelButton={() => {}}
                    confirmButton={handleOnDelete}
                  >
                    <button 
                      className='buttonDeleteCardFluxo'
                    >
                      Excluir etapa
                    </button>
                  </Alert>
                </li>
              </ul>
            </div>
            <Popover.Close className="PopoverCloseCardFluxo" aria-label="Close">
              <BiX />
            </Popover.Close>
            <Popover.Arrow className="PopoverArrow" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

    </ContainerPopupCard>
  )
}
