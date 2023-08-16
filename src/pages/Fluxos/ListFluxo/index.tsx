/* eslint-disable import-helpers/order-imports */
//  React
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { BiPlus, BiSearchAlt } from 'react-icons/bi';

// Services
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
import Alert from '../../../components/Ui/Alert';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { Table } from '../../../components/Table';
import { TableHead } from '../../../components/Table/styles';
import Pagination from '../../../components/Pagination';

// Styles
import {
  ContainerDefault,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal,
  SectionDefault
} from '../../../components/UiElements/styles';

export default function ListFluxo() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { formData, setData, handleOnChange } = useForm({
    name: ''
  });

  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const { data, pages, fetchData } = useFetch<any[]>(`flow?search=${search}&page=${selected}`);

  const handleOnCancel = useCallback(() => {
    setModal(!modal);
    setData({
      name: ''
    });
  }, [setData, modal]);

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`/flow/${id}`);

      addToast({
        title: 'Sucesso',
        description: 'Fluxo deletado com sucesso!',
        type: 'success'
      });

      fetchData();
    } catch (err: any) {
      console.log('ERR =>', err);

      addToast({
        title: 'Atenção',
        description: err.data.result,
        type: 'warning'
      });
    }
  };

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();

        const response = await api.post('flow', formData);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Fluxo cadastrado com sucesso!'
        });

        fetchData();
        setModal(!modal);
        setData({
          name: ''
        });

        navigate(`/fluxo/editar/${formData.name.replaceAll(' ', '_')}`, {
          state: { id: response.data.result, name: formData.name }
        });
      } catch (e: any) {
        if (e.response.data.result.length !== 0) {
          e.response.data.result.map((row: any) => {
            addToast({
              type: 'danger',
              title: 'ATENÇÃO',
              description: row.error
            });
          });
        } else {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: e.response.data.message
          });
        }
      }
    },
    [formData, addToast, fetchData, modal, setData, navigate]
  );

  return (
    <ContainerDefault>
      <HeaderPage title="Fluxos">
        <ButtonDefault typeButton="success" onClick={() => setModal(!modal)}>
          <BiPlus color="#fff" />
          Novo Fluxo
        </ButtonDefault>
      </HeaderPage>

      <SectionDefault>
        <ContentDefault>
          <FieldGroupFormDefault>
            <InputDefault
              label="Busca"
              name="search"
              placeholder="Busque pelo nome..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
                debouncedCallback(event.target.value);
              }}
              icon={BiSearchAlt}
              isLoading={isLoading}
              value={searchTerm}
            />
          </FieldGroupFormDefault>
        </ContentDefault>
        <div style={{ margin: '-24px -30px' }}>
          <Table>
            <TableHead>
              <div className="groupTable">
                <h2>
                  Lista de fluxos{' '}
                  {/* <strong>
                    {data && data?.length < 1 ? `${data?.length} tarefa` : `${data?.length} tarefas`}{' '}
                  </strong> */}
                </h2>
              </div>
            </TableHead>
            <table>
              <thead>
                <tr style={{ whiteSpace: 'nowrap' }}>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Etapas</th>
                  {/* <th>Projetos</th> */}
                  <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((row) => (
                  <tr key={row.flow_id}>
                    <td>#{String(row.flow_id).padStart(5, '0')}</td>
                    <td>{row.name}</td>
                    <td>{row.steps}</td>
                    {/* <td>5</td> */}
                    <td>
                      <div className="fieldTableClients">
                        <ButtonTable
                          typeButton="edit"
                          onClick={() =>
                            navigate(`/fluxo/editar/${row.name.replaceAll(' ', '_')}`, {
                              state: { id: row.flow_id, name: row.name }
                            })
                          }
                        />
                        <Alert
                          title="Atenção"
                          subtitle="Certeza que gostaria de remover esse fluxo? Ao excluir a acão não poderá ser desfeita."
                          confirmButton={() => handleOnDelete(row.flow_id)}
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
                      total={pages.total}
                      perPage={pages.perPage}
                      currentPage={selected}
                      lastPage={pages.lastPage}
                      onClickPage={(e) => setSelected(e)}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </Table>
        </div>
      </SectionDefault>

      <ModalDefault isOpen={modal} title={'Novo Fluxo'} onOpenChange={handleOnCancel}>
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Nome do Fluxo"
              placeholder="Digite aqui..."
              name="name"
              onChange={handleOnChange}
              value={formData.name}
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
