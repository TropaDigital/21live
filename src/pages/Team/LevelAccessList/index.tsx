/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useCallback, useEffect, useState } from 'react';

// Icons
import { BiLock, BiPlus, BiSearchAlt } from 'react-icons/bi';

// Components
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { Table } from '../../../components/Table';
import Alert from '../../../components/Ui/Alert';
import { ContainerDefault, FieldDefault, FooterModal } from '../../../components/UiElements/styles';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import Pagination from '../../../components/Pagination';
import ModalLoader from '../../../components/Ui/ModalLoader';
import WrapperEditor from '../../../components/WrapperEditor';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { TableHead } from '../../../components/Table/styles';

// Styles
import {
  ButtonIcon,
  CardPermission,
  DescriptionInfo,
  DescriptionView,
  FilterRoles,
  ModalWrapper,
  WrapperPermissionsCard
} from './styles';
import { ModalButtons } from '../ListTeam/styles';
import { FieldEditor } from '../../Meeting/ListMeeting/styles';

// Types
import { PermissionsProps, RoleProps } from '../../../types';

// Service
import api from '../../../services/api';

// Hooks
import useForm from '../../../hooks/useForm';
import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';

interface ModalAccessLevel {
  isOpen: boolean;
  type: 'view' | 'edit' | 'create' | '';
}

export default function AccessLevel() {
  const { addToast } = useToast();
  const [modalPermissions, setModalPermissions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [pages, setPages] = useState<any>();
  const [dataRoles, setDataRoles] = useState<RoleProps[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [text, setText] = useState<string>('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [modalAccessLevel, setModalAccessLevel] = useState<ModalAccessLevel>({
    isOpen: false,
    type: ''
  });
  const { formData, setData, handleOnChange } = useForm({
    title: '',
    description: '',
    level: '',
    role_id: '',
    tenant_id: '',
    permissions: []
  } as RoleProps);

  async function getRolesData() {
    try {
      setLoading(true);

      const response = await api.get(`/roles?search=${search}`);
      setDataRoles(response.data.result.data);
      setPages(response.data.result.pagination);

      setLoading(false);
    } catch (error: any) {
      console.log('log error get roles', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getRolesData();
  }, [selectedPage, search]);

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        setLoading(true);
        event.preventDefault();

        const { title, permissions } = formData;

        const newFormData = {
          title,
          description: text,
          permissions
        };

        if (modalAccessLevel.type === 'create') {
          await api.post(`/roles`, newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Nível de acesso criado com sucesso!'
          });
        } else {
          await api.put(`/roles/${formData.role_id}`, newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Nível de acesso editado com sucesso!'
          });
        }

        setModalAccessLevel({
          isOpen: false,
          type: ''
        });
        setData({
          title: '',
          description: '',
          level: '',
          role_id: '',
          tenant_id: '',
          permissions: []
        } as RoleProps);
        setText('');
        getRolesData();

        setLoading(false);
      } catch (error: any) {
        console.log('ERROR submit template =>', error);
        if (error.response.data.result.length !== 0) {
          error.response.data.result.map((row: any) => {
            addToast({
              title: 'Atenção',
              description: row.error,
              type: 'warning'
            });
          });
        } else {
          addToast({
            title: 'Atenção',
            description: error.response.data.message,
            type: 'danger'
          });
        }
        setLoading(false);
      }
    },
    [formData, setData]
  );

  const handleOnDelete = async (id: any) => {
    try {
      console.log('log do delete', id);
      await api.delete(`roles/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Nível de acesso foi deletado!'
      });

      getRolesData();
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleOnEdit = (item: RoleProps) => {
    console.log('log do edit', item);
    setData(item);
    setText(item.description);

    setModalAccessLevel({
      isOpen: true,
      type: ''
    });
  };

  const handleOnView = (item: RoleProps) => {
    setData(item);
    setText(item.description);
    setModalAccessLevel({
      isOpen: true,
      type: 'view'
    });
  };

  const handleEnableEditPermissions = (obj: RoleProps) => {
    setData(obj);

    const extractPermissionIds = () => {
      return obj.permissions.map((permission) => permission.permission_id);
    };

    setSelectedPermissions(extractPermissionIds());

    setModalPermissions(true);
  };

  const handleOnCancel = () => {
    setModalAccessLevel({
      isOpen: false,
      type: ''
    });
    setData({
      title: '',
      description: '',
      level: '',
      role_id: '',
      tenant_id: '',
      permissions: []
    } as RoleProps);
    setText('');
  };

  useEffect(() => {
    console.log('log do selectedPermissions =>', selectedPermissions);
  }, [selectedPermissions]);

  return (
    <ContainerDefault>
      <HeaderPage title="Níveis de acesso">
        <ButtonDefault
          typeButton="success"
          onClick={() =>
            setModalAccessLevel({
              isOpen: true,
              type: 'create'
            })
          }
        >
          <BiPlus color="#fff" />
          Novo nível
        </ButtonDefault>
      </HeaderPage>

      {!loading && (
        <Table>
          <TableHead>
            <div className="groupTable">
              <h2>
                Roles
                {pages !== null && pages?.total > 0 ? (
                  <strong>
                    {pages?.total <= 1 ? `${pages?.total} role` : `${pages?.total} roles`}{' '}
                  </strong>
                ) : (
                  <strong>0 Roles</strong>
                )}
              </h2>
            </div>

            <FilterRoles>
              <InputDefault
                label=""
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
            </FilterRoles>
          </TableHead>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Descrição</th>
                <th style={{ color: '#F9FAFB' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {dataRoles?.map((row) => (
                <tr key={row.role_id}>
                  <td>#{String(row.role_id).padStart(5, '0')}</td>
                  <td>{row.title}</td>
                  <td>
                    <DescriptionInfo dangerouslySetInnerHTML={{ __html: row.description }} />
                  </td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable typeButton="view" onClick={() => handleOnView(row)} />

                      <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />

                      <ButtonIcon onClick={() => handleEnableEditPermissions(row)}>
                        <BiLock size={20} />
                      </ButtonIcon>

                      <Alert
                        title="Atenção"
                        subtitle="Certeza que gostaria de deletar este Nível de acesso? Ao excluir a acão não poderá ser desfeita."
                        confirmButton={() => handleOnDelete(row.role_id)}
                      >
                        <ButtonTable typeButton="delete" />
                      </Alert>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={100}>
                  <Pagination
                    total={pages?.total}
                    perPage={pages?.perPage}
                    currentPage={selectedPage}
                    lastPage={pages?.lastPage}
                    onClickPage={(e) => setSelectedPage(e)}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </Table>
      )}

      {/* Modal Role level */}
      <ModalDefault
        isOpen={modalAccessLevel.isOpen}
        onOpenChange={() =>
          setModalAccessLevel({
            isOpen: false,
            type: ''
          })
        }
        title={
          modalAccessLevel.type === 'create'
            ? 'Criar novo nível de acesso'
            : modalAccessLevel.type === 'edit'
            ? 'Editar nível de acesso'
            : modalAccessLevel.type === 'view'
            ? 'Ver nível de acesso'
            : ''
        }
      >
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Titulo"
              placeholder="Titulo do novo nível de acesso"
              name="title"
              onChange={handleOnChange}
              value={formData.title}
              alert="Titulo é obrigatório"
              required={true}
              disabled={modalAccessLevel.type === 'view' ? true : false}
              // error={errors?.title}
            />
          </FieldDefault>

          <FieldEditor style={{ width: '500px' }}>
            {modalAccessLevel.type === 'view' && (
              <DescriptionView>
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </DescriptionView>
            )}

            {modalAccessLevel.type !== 'view' && (
              <WrapperEditor
                mentionData={[]}
                value={text}
                handleOnDescription={(value: any) => setText(value)}
              />
            )}
          </FieldEditor>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            {modalAccessLevel.type === 'view' && (
              <ButtonDefault
                loading={loading}
                typeButton="primary"
                isOutline
                onClick={handleOnCancel}
              >
                Fechar
              </ButtonDefault>
            )}
            {modalAccessLevel.type !== 'view' && (
              <>
                <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
                  Descartar
                </ButtonDefault>
                <ButtonDefault loading={loading} typeButton="primary" isOutline type="submit">
                  Salvar
                </ButtonDefault>
              </>
            )}
          </FooterModal>
        </form>
      </ModalDefault>

      {/* Modal permissions */}
      <ModalDefault
        isOpen={modalPermissions}
        onOpenChange={() => {
          setModalPermissions(false);
          setSelectedPermissions([]);
        }}
        title="Editar permissões do cargo"
      >
        <ModalWrapper>
          <WrapperPermissionsCard>
            <CardPermission>
              <div className="card-title">
                <CheckboxDefault
                  label=""
                  id="subtasks"
                  checked={selectedPermissions.includes('168')}
                  onChange={() => ''}
                />
                Projetos
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="subtasks"
                checked={selectedPermissions.includes('170')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Visualizar todos"
                id="subtasks"
                checked={selectedPermissions.includes('209')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Criar"
                id="subtasks"
                checked={selectedPermissions.includes('169')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Editar"
                id="subtasks"
                checked={selectedPermissions.includes('171')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Deletar"
                id="subtasks"
                checked={selectedPermissions.includes('172')}
                onChange={() => ''}
              />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault
                  label=""
                  id="jobs_tasks"
                  checked={selectedPermissions.includes('173')}
                  onChange={() => ''}
                />
                Tarefas
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="jobs_tasks_view"
                checked={selectedPermissions.includes('175')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Visualizar todos"
                id="jobs_tasks_viewall"
                checked={selectedPermissions.includes('181')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Criar"
                id="jobs_tasks_add"
                checked={selectedPermissions.includes('174')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Editar"
                id="jobs_tasks_edit"
                checked={selectedPermissions.includes('176')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Deletar"
                id="jobs_tasks_delete"
                checked={selectedPermissions.includes('177')}
                onChange={() => ''}
              />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault
                  label=""
                  id="jobs_products"
                  checked={selectedPermissions.includes('182')}
                  onChange={() => ''}
                />
                Produtos
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="jobs_products_view"
                checked={selectedPermissions.includes('184')}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Criar"
                id="jobs_products_add"
                checked={selectedPermissions.includes('183')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Editar"
                id="jobs_products_edit"
                checked={selectedPermissions.includes('185')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Deletar"
                id="jobs_products_delete"
                checked={selectedPermissions.includes('186')}
                onChange={() => ''}
              />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault
                  label=""
                  id="users"
                  checked={selectedPermissions.includes('1')}
                  onChange={() => ''}
                />
                Usuário
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="users_view"
                checked={selectedPermissions.includes('2')}
                onChange={() => ''}
              />

              {/* <CheckboxDefault
                label="Contabilizar horas"
                id="subtasks"
                checked={selectedPermissions.includes(permission.permission_id)}
                onChange={() => ''}
              /> */}

              <CheckboxDefault
                label="Criar"
                id="users_add"
                checked={selectedPermissions.includes('3')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Editar"
                id="users_edit"
                checked={selectedPermissions.includes('4')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Deletar"
                id="users_delete"
                checked={selectedPermissions.includes('5')}
                onChange={() => ''}
              />

              {/* <CheckboxDefault
                label="Horários de jornada"
                id="subtasks"
                checked={selectedPermissions.includes(permission.permission_id)}
                onChange={() => ''}
              /> */}

              <CheckboxDefault
                label="Editar cargos"
                id="roles_edit"
                checked={selectedPermissions.includes('19')}
                onChange={() => ''}
              />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault
                  label=""
                  id="jobs_flow"
                  checked={selectedPermissions.includes('197')}
                  onChange={() => ''}
                />
                Fluxos
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="jobs_flow_view"
                checked={selectedPermissions.includes('199')}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Criar"
                id="jobs_flow_add"
                checked={selectedPermissions.includes('198')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Editar"
                id="jobs_flow_edit"
                checked={selectedPermissions.includes('200')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Deletar"
                id="jobs_flow_delete"
                checked={selectedPermissions.includes('201')}
                onChange={() => ''}
              />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault
                  label=""
                  id="jobs_meetings"
                  checked={selectedPermissions.includes('187')}
                  onChange={() => ''}
                />
                Atas de reunião
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="jobs_meetings_view"
                checked={selectedPermissions.includes('189')}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Criar"
                id="jobs_meetings_add"
                checked={selectedPermissions.includes('188')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Editar"
                id="jobs_meetings_edit"
                checked={selectedPermissions.includes('190')}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Deletar"
                id="jobs_meetings_delete"
                checked={selectedPermissions.includes('191')}
                onChange={() => ''}
              />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault
                  label=""
                  id="jobs_dash_admin"
                  checked={selectedPermissions.includes('211')}
                  onChange={() => ''}
                />
                Dashboard
              </div>

              {/* <CheckboxDefault
                label="Geral total"
                id="jobs_dash_manager"
                checked={selectedPermissions.includes('202')}
                onChange={() => ''}
              /> */}

              {/* <CheckboxDefault
                label="Atendimento próprio"
                id="dashboard_user"
                checked={selectedPermissions.includes('103')}
                onChange={() => ''}
              /> */}

              {/* <CheckboxDefault
                label="Atendimento total"
                id="jobs_dash_executive"
                checked={selectedPermissions.includes('203')}
                onChange={() => ''}
              /> */}

              {/* <CheckboxDefault
                label="Operação próprio"
                id="subtasks"
                checked={selectedPermissions.includes(permission.permission_id)}
                onChange={() => ''}
              /> */}

              <CheckboxDefault
                label="Operação total"
                id="jobs_dash_operator"
                checked={selectedPermissions.includes('205')}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Tráfego"
                id="jobs_dash_traffic"
                checked={selectedPermissions.includes('204')}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Gerar relatório"
                id="jobs_tasks_report"
                checked={selectedPermissions.includes('179') ? true : false}
                onChange={() => ''}
              />
            </CardPermission>
          </WrapperPermissionsCard>

          <ModalButtons>
            <ButtonDefault typeButton="primary">Salvar</ButtonDefault>
          </ModalButtons>
        </ModalWrapper>
      </ModalDefault>

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading} />
    </ContainerDefault>
  );
}
