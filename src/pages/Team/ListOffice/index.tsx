/* eslint-disable import-helpers/order-imports */
// react
import { useCallback, useEffect, useState } from 'react';
import { BiPlus, BiSearchAlt } from 'react-icons/bi';

// Api
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { Table } from '../../../components/Table';
import { TableHead } from '../../../components/Table/styles';
import Alert from '../../../components/Ui/Alert';
import ModalDefault from '../../../components/Ui/ModalDefault';
import {
  ContainerDefault,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal,
  SectionDefault
} from '../../../components/UiElements/styles';

// Styles
import { PermissionsList, PermissionsTitle, PermissionsWrapper } from './styles';

// Libraries
import Switch from 'react-switch';

interface OfficeProps {
  function_id: number;
  tenant_id: string;
  function: string;
  description: string;
  permissions?: string;
}

interface PermissionProps {
  permission_id: string;
  name: string;
  checked: boolean;
}

export default function ListOffice() {
  const { addToast } = useToast();
  const { formData, setData, handleOnChange } = useForm({
    function_id: 0,
    tenant_id: '',
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
  const [permissionFor, setPermissionFor] = useState<any[]>([]);
  const [permissionsData, setPermissionsData] = useState<PermissionProps[]>([]);

  const handleOnCancel = useCallback(() => {
    setModal({
      isOpen: false,
      type: 'Novo serviço'
    });
    setData({
      function_id: 0,
      tenant_id: '',
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
          description,
          permissions: permissionFor
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
    [formData, addToast, fetchData, handleOnCancel, modal, permissionFor]
  );

  const handlePermissions = (id: any) => {
    if (permissionFor.includes(id)) {
      setPermissionFor(permissionFor.filter((obj) => obj !== id));
    } else {
      setPermissionFor((prevState: any) => [...prevState, id]);
    }
  };

  useEffect(() => {
    const handleGetPermissions = async () => {
      try {
        const response = await api.get(`/permissions`);

        const allPermissions: PermissionProps[] = [];

        response.data.result.map((row: any) => {
          allPermissions.push({
            permission_id: row.permission_id,
            name: row.name,
            checked: false
          });
        });

        setPermissionsData(allPermissions);
      } catch (error) {
        console.log('log do error getting permissions');
      }
    };

    handleGetPermissions();
  }, []);

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

      <SectionDefault>
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
        <div style={{ margin: '-24px -30px' }}>
          <Table>
            <TableHead>
              <div className="groupTable">
                <h2>Lista de cargos</h2>
              </div>
            </TableHead>
            <table>
              <thead>
                <tr style={{ whiteSpace: 'nowrap' }}>
                  <th>ID</th>
                  <th>Cargo</th>
                  <th>Descrição</th>
                  <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((row) => (
                  <tr key={row.function_id}>
                    <td>#{String(row.function_id).padStart(5, '0')}</td>
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
            </table>
          </Table>
        </div>
      </SectionDefault>

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
          <PermissionsWrapper>
            <PermissionsTitle>Permissões</PermissionsTitle>
            <PermissionsList>
              {permissionsData.map((row: PermissionProps, index: number) => (
                <div className="permission-field" key={index}>
                  <Switch
                    onChange={() => handlePermissions(row.permission_id)}
                    checked={permissionFor.includes(row.permission_id) ? true : false}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#0046B5"
                    width={40}
                    height={21}
                  />
                  {row.name.split('_')[1]} - {row.name.split('_')[2]}
                </div>
              ))}
            </PermissionsList>
          </PermissionsWrapper>
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
