import * as AlertDialog from '@radix-ui/react-alert-dialog';
import ButtonDefault from '../../Buttons/ButtonDefault';
import React from 'react';

interface Props {
  title: string;
  subtitle: string;
  cancelButton: () => void;
  confirmButton: (id: any) => void;
  children: JSX.Element,
}

export default function Alert({ 
  children, 
  cancelButton,
  confirmButton,
  title, 
  subtitle,
}: Props) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        {children}

        {/* <button className="Button violet">Delete account</button> */}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AlertDialogContent">
          <AlertDialog.Title className="AlertDialogTitle">{title}</AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            {subtitle}
          </AlertDialog.Description>
          <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <ButtonDefault onClick={cancelButton} typeButton='light'>Cancelar</ButtonDefault>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <ButtonDefault onClick={confirmButton} typeButton='danger'>Sim, Deletar card</ButtonDefault>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}