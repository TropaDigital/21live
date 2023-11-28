/* eslint-disable react-hooks/exhaustive-deps */
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
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';

// Styles
// import { PermissionsList, PermissionsTitle, PermissionsWrapper } from './styles';
import { SwitchField } from './styles';

// Libraries
import Switch from 'react-switch';
import { useParamsHook } from '../../../hooks/useParams';

interface OfficeProps {
  function_id: number;
  tenant_id: string;
  function: string;
  description: string;
  show_hours: string;
}

// interface PermissionProps {
//   permission_id: string;
//   name: string;
//   checked: boolean;
// }

export default function ListOffice() {
  const { addToast } = useToast();
  const { parameters, getParams } = useParamsHook();
  const { formData, setData, handleOnChange } = useForm({
    function_id: 0,
    tenant_id: '',
    function: '',
    description: '',
    show_hours: 'false'
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
  const [showHours, setShowHours] = useState<boolean>(false);

  useEffect(() => {
    getParams();
  }, []);

  useEffect(() => {
    if (formData.show_hours === 'true') {
      setShowHours(true);
    } else {
      setShowHours(false);
    }
  }, [formData]);

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
      type: `Editar cargo: ${item.function}`
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

        const { function: AsFunction, description } = formData;

        const newFormData = {
          function: AsFunction,
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

      <SectionDefault>
        <ContentDefault>
          <FieldGroupFormDefault>
            <InputDefault
              label="Busca"
              name="search"
              placeholder="Buscar..."
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
                  <th>Exibe horas</th>
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
                      <div style={{ paddingLeft: '20px' }}>
                        <CheckboxDefault
                          label=""
                          name=""
                          onChange={() => ''}
                          checked={row.show_hours === 'true' ? true : false}
                        />
                      </div>
                    </td>
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

          <FieldDefault>
            <SwitchField>
              <Switch
                onChange={(value: any) => setShowHours(value)}
                checked={showHours}
                uncheckedIcon={false}
                checkedIcon={false}
                onColor="#0046B5"
                width={40}
                height={21}
              />
              Exibir horas
            </SwitchField>
          </FieldDefault>

          {showHours && (
            <FieldDefault>
              <SelectDefault
                label="Tipo de horas"
                placeholder="Selecione"
                name="hours_type"
                onChange={(e) => console.log('log do select hours', e.target.value)}
                value={''}
              >
                <option key={'hours_creation'} value={'hours_creation'}>
                  Horas de atividade
                </option>
                <option key={'hours_essay'} value={'hours_essay'}>
                  Horas de {parameters.input_name !== '' ? parameters.input_name : 'Pré-requisito'}
                </option>
              </SelectDefault>
            </FieldDefault>
          )}

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
