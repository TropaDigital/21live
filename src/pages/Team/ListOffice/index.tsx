import { useCallback, useEffect, useId, useState } from 'react';
import api from '../../../services/api';

import { BiEdit, BiFilter, BiPlus, BiSearchAlt, BiTrash, BiX, BiXCircle } from 'react-icons/bi';
import { HiOutlineEye } from 'react-icons/hi';
import * as Dialog from '@radix-ui/react-dialog';

import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { useDebounce } from '../../../utils/useDebounce';

import HeaderPage from '../../../components/HeaderPage';
import Avatar from '../../../components/Ui/Avatar';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import ProgressBar from '../../../components/Ui/ProgressBar';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { TableDefault } from '../../../components/TableDefault';

import { Container } from './styles';
import {
  ContainerGroupTable,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal,
} from '../../../components/UiElements/styles';
import { useFetch } from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/toast';

interface Avatar {
  id: number,
  name: string,
  url: string,
  isOnline: boolean,
}

interface OfficeProps {
  function_id: number;
  tenant_id: number;
  function: string;
  description: string;
}

export default function ListOffice() {
  const { addToast } = useToast();
  const [open, setOpen] = useState({
    isOpen: false,
    title: 'Novo cargo'
  });
  const [openModalDelete, setOpenModalDelete] = useState({
    isOpen: false,
    title: 'Deseja deletar cargo:',
    id: 0
  });
  const { data, fetchData } = useFetch<OfficeProps[]>(`function`);
  const [formData, setFormData] = useState<OfficeProps>({
    function_id: 0,
    tenant_id: 0,
    function: '',
    description: '',
  } as OfficeProps)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleOnModalEdit(data: OfficeProps) {
    setOpen({
      ...open,
      ['isOpen']: !open.isOpen,
      ['title']: `Editar cargo ${data.function}`
    });
    setFormData(data)
  }

  const handleOnToggleModal = (toggle: boolean, text: string) => {
    setOpen({
      ...open,
      ['isOpen']: toggle,
      ['title']: text
    });
    setFormData({
      function_id: 0,
      tenant_id: 0,
      function: '',
      description: '',
    } as OfficeProps);
  }

  const handleOnToggleModalDelete = (toggle: boolean, text: string) => {
    setOpenModalDelete({
      ...open,
      ['isOpen']: toggle,
      ['title']: text,
      ['id']: 0
    });
  }

  const handleOnModalDelete = (toggle: boolean, data: any) => {
    setOpenModalDelete({
      ...open,
      ['isOpen']: toggle,
      ['title']: `Deseja deletar cargo: ${data.function}`,
      ['id']: data.function_id
    });
  }

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      const { function: AsFuncation, description } = formData

      // Inserir lógica
      const newFormData = {
        function: AsFuncation,
        description
      }
 
      if(open.title === 'Novo cargo') {
        await api.post('function', newFormData);
      } else {
        await api.put(`function/${formData.function_id}`, newFormData);
      }
   
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço cadastrado com sucesso!',
      });
 
      setOpen({...open, ['isOpen']: false});
      setFormData({
      function_id: 0,
      tenant_id: 0,
      function: '',
      description: '',
    } as OfficeProps);
      fetchData();

    } catch (e: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });
    }
  }, [formData, open]);

  const handleOnDeleOffice = useCallback(async (event: any, data: any) => {
    try {
      event.preventDefault();
      await api.delete(`function/${data.id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: `Serviço deletado com sucesso!`,
      });

      setOpenModalDelete({...openModalDelete, ['isOpen']: false})
      fetchData();
    } catch(e: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });
    }
  }, [openModalDelete]);

  return (
    <Container>
      <HeaderPage title="Cargos">
        <ButtonDefault typeButton="success" onClick={() => setOpen({...open, ['isOpen']: !open.isOpen})}>
          <BiPlus color="#fff" />
            Novo Cargo
        </ButtonDefault>
      </HeaderPage>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Cargos">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>ID</th>
                <th>Cargo</th>
                <th>Descrição</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row) => (
                <tr key={row.function_id}>
                  <td>{row.function_id}</td>
                  <td>
                    {row.function}
                  </td>
                  <td>{row.description}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonDefault typeButton="danger" onClick={() => handleOnModalDelete(!openModalDelete.isOpen, row)}>
                        <BiTrash  />
                      </ButtonDefault>
                      <ButtonDefault typeButton="info" onClick={() => handleOnModalEdit(row)}>
                        <BiEdit />
                      </ButtonDefault>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableDefault>
        </ScrollAreas>
      </ContainerGroupTable>

      <Dialog.Root open={open.isOpen} onOpenChange={(open) => handleOnToggleModal(open, 'Novo cargo')}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">{open.title}</Dialog.Title>
            <form onSubmit={handleOnSubmit}>
              <FieldDefault>
                <InputDefault
                  label="Nome do cargo"
                  name="function"
                  onChange={handleChange}
                  value={formData.function}
                />
              </FieldDefault>
              <FieldDefault>
              <InputDefault
                  label="Descrição"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                />
              </FieldDefault>
              <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
                <ButtonDefault
                  typeButton="dark"
                  isOutline
                  onClick={() => handleOnToggleModal(!open.isOpen, 'Novo cargo')}
                >
                  Descartar
                </ButtonDefault>
                <ButtonDefault typeButton="primary" isOutline type="submit">
                  Salvar
                </ButtonDefault>
              </FooterModal>
            </form>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <BiX size={30} color="#6C757D" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={openModalDelete.isOpen} onOpenChange={(open) => handleOnToggleModalDelete(open, 'Deseja deletar cargo:')}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay"/>
          <Dialog.Content className="DialogContent" style={{ width: '480px' }}>
            <Dialog.Title className="DialogTitle">{openModalDelete.title}</Dialog.Title>
              <form onSubmit={(event) => handleOnDeleOffice(event, openModalDelete)}>
                <FieldGroupFormDefault style={{ marginTop: '40px' }}>
                  <ButtonDefault 
                    typeButton="dark" 
                    isOutline
                    onClick={() => handleOnToggleModalDelete(false, 'Deseja deletar cargo:')}
                  >
                    Cancelar
                  </ButtonDefault>
                  <ButtonDefault
                    typeButton="danger"
                    type="submit"
                    // onClick={(event) => handleOnDeleteService(event, dataDelete)}
                  >
                    Deletar                    
                  </ButtonDefault>
                </FieldGroupFormDefault>
              </form>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <BiX size={30} color="#6C757D" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Container>
  );
}
