import { useCallback, useState } from 'react';
import { BiPlus, BiSearchAlt } from 'react-icons/bi';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';

import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { TableDefault } from '../../../components/TableDefault';
import Alert from '../../../components/Ui/Alert';
import ModalDefault from '../../../components/Ui/ModalDefault';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import {
  ContainerDefault,
  ContainerGroupTable,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal
} from '../../../components/UiElements/styles';

interface OfficeProps {
  function_id: number;
  tenant_id: number;
  function: string;
  description: string;
}

export default function ListOffice() {
  const { addToast } = useToast();
  const { formData, setData, handleOnChange } = useForm({
    function_id: 0,
    tenant_id: 0,
    function: '',
    description: ''
  } as OfficeProps);

  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Novo Cargo'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const { data, fetchData } = useFetch<OfficeProps[]>(`function?=${search}`);

  const handleOnCancel = useCallback(() => {
    setModal({
      isOpen: false,
      type: 'Novo serviço'
    });
    setData({
      function_id: 0,
      tenant_id: 0,
      function: '',
      description: ''
    } as OfficeProps);
  }, [setData]);

  const handleOnEdit = (item: OfficeProps) => {
    setData(item);

    setModal({
      isOpen: true,
      type: `Editar serviço: ${item.function}`
    });
  };

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`function/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço foi deletado!'
      });

      fetchData();
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();

        const { function: AsFuncation, description } = formData;

        // Inserir lógica
        const newFormData = {
          function: AsFuncation,
          description
        };

        if (modal.type === 'Novo Cargo') {
          await api.post('function', newFormData);
        } else {
          await api.put(`function/${formData.function_id}`, newFormData);
        }

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Serviço cadastrado com sucesso!'
        });

        handleOnCancel();
        fetchData();
      } catch (e: any) {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });
      }
    },
    [formData, addToast, fetchData, handleOnCancel, modal]
  );

  return (
    <ContainerDefault>
      <HeaderPage title="Cargos">
        <ButtonDefault
          typeButton="success"
          onClick={() =>
            setModal({
              isOpen: !modal.isOpen,
              type: 'Novo Cargo'
            })
          }
        >
          <BiPlus color="#fff" />
          Novo Cargo
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault>
        <FieldGroupFormDefault>
          <InputDefault
            label="BUSCA"
            name="search"
            placeholder="Faça sua busca..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
              debouncedCallback(event.target.value);
            }}
            value={searchTerm}
            icon={BiSearchAlt}
            isLoading={isLoading}
          />
        </FieldGroupFormDefault>
      </ContentDefault>

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
                  <td>{row.function}</td>
                  <td>{row.description}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />
                      <Alert
                        title="Atenção"
                        subtitle="Certeza que gostaria de deletar este Serviço? Ao excluir a acão não poderá ser desfeita."
                        confirmButton={() => handleOnDelete(row.function_id)}
                      >
                        <ButtonTable typeButton="delete" />
                      </Alert>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableDefault>
        </ScrollAreas>
      </ContainerGroupTable>

      <ModalDefault isOpen={modal.isOpen} title={modal.type} onOpenChange={handleOnCancel}>
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Nome do cargo"
              name="function"
              onChange={handleOnChange}
              value={formData.function}
            />
          </FieldDefault>
          <FieldDefault>
            <InputDefault
              label="Descrição"
              name="description"
              onChange={handleOnChange}
              value={formData.description}
            />
          </FieldDefault>
          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>
    </ContainerDefault>
  );
}
