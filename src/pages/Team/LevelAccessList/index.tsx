/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Components
import { BiLock } from 'react-icons/bi';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { Table } from '../../../components/Table';
import Alert from '../../../components/Ui/Alert';
import { ContainerDefault } from '../../../components/UiElements/styles';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import Pagination from '../../../components/Pagination';
import ModalLoader from '../../../components/Ui/ModalLoader';

// Styles
import { ButtonIcon, CardPermission, ModalWrapper, WrapperPermissionsCard } from './styles';
import { ModalButtons } from '../ListTeam/styles';

// Types
import { PermissionsProps, RoleProps } from '../../../types';

// Service
import api from '../../../services/api';

export default function AccessLevel() {
  const [modalPermissions, setModalPermissions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [pages, setPages] = useState<any>();
  const [dataRoles, setDataRoles] = useState<RoleProps[]>([]);
  const [selectedPermissions, setSelectePermissions] = useState<PermissionsProps[]>([]);
  const [search, setSearch] = useState<string>('');

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
  }, [selectedPage]);

  const handleOnDelete = async (id: any) => {
    try {
      console.log('log do delete', id);
      // await api.delete(`team/${id}`);
      // addToast({
      //   type: 'success',
      //   title: 'Sucesso',
      //   description: 'Equipe foi deletada!'
      // });

      // fetchData();
    } catch (error: any) {
      // addToast({
      //   type: 'danger',
      //   title: 'ATENÇÃO',
      //   description: error.response.data.message
      // });
    }
  };

  const handleOnEdit = (item: any) => {
    console.log('log do edit', item);
    // setData(item);

    // setModal({
    //   isOpen: true,
    //   type: `Alterar usuário: ${item.name}`
    // });
  };

  const handleOnView = (item: any) => {
    console.log('log do view', item);
  };

  const handleEditPermissions = (obj: RoleProps) => {
    console.log('log do edit permissions', obj);
    setSelectePermissions(obj.permissions);
    setModalPermissions(true);
  };

  useEffect(() => {
    console.log('log do selectedPermissions =>', selectedPermissions);
  }, [selectedPermissions]);

  return (
    <ContainerDefault>
      <HeaderPage title="Níveis de acesso" />

      {!loading && (
        <Table>
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
                  <td>{row.description}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable typeButton="view" onClick={() => handleOnView(row)} />

                      <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />

                      <ButtonIcon onClick={() => handleEditPermissions(row)}>
                        <BiLock size={20} />
                      </ButtonIcon>

                      <Alert
                        title="Atenção"
                        subtitle="Certeza que gostaria de deletar esta Equipe? Ao excluir a acão não poderá ser desfeita."
                        confirmButton={() => handleOnDelete(row)}
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

      {/* Modal permissions */}
      <ModalDefault
        isOpen={modalPermissions}
        onOpenChange={() => setModalPermissions(false)}
        title="Editar permissões do cargo"
      >
        <ModalWrapper>
          <WrapperPermissionsCard>
            <CardPermission>
              <div className="card-title">
                <CheckboxDefault label="" id="subtasks" checked={false} onChange={() => ''} />
                Projetos
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Visualizar todos"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />
              <CheckboxDefault label="Criar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Editar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Deletar" id="subtasks" checked={false} onChange={() => ''} />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault label="" id="subtasks" checked={false} onChange={() => ''} />
                Tarefas
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Visualizar todos"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />
              <CheckboxDefault label="Criar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Editar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Deletar" id="subtasks" checked={false} onChange={() => ''} />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault label="" id="subtasks" checked={false} onChange={() => ''} />
                Produtos
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault label="Criar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Editar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Deletar" id="subtasks" checked={false} onChange={() => ''} />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault label="" id="subtasks" checked={false} onChange={() => ''} />
                Usuário
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Contabilizar horas"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault label="Criar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Editar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Deletar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault
                label="Horários de jornada"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />
              <CheckboxDefault
                label="Editar cargos"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault label="" id="subtasks" checked={false} onChange={() => ''} />
                Fluxos
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault label="Criar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Editar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Deletar" id="subtasks" checked={false} onChange={() => ''} />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault label="" id="subtasks" checked={false} onChange={() => ''} />
                Atas de reunião
              </div>

              <CheckboxDefault
                label="Visualizar"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault label="Criar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Editar" id="subtasks" checked={false} onChange={() => ''} />
              <CheckboxDefault label="Deletar" id="subtasks" checked={false} onChange={() => ''} />
            </CardPermission>

            <CardPermission>
              <div className="card-title">
                <CheckboxDefault label="" id="subtasks" checked={false} onChange={() => ''} />
                Dashboard
              </div>

              <CheckboxDefault
                label="Geral total"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Atendimento próprio"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Atendimento total"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Operação próprio"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault
                label="Operação total"
                id="subtasks"
                checked={false}
                onChange={() => ''}
              />

              <CheckboxDefault label="Tráfego" id="subtasks" checked={false} onChange={() => ''} />

              <CheckboxDefault
                label="Gerar relatório"
                id="subtasks"
                checked={false}
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
