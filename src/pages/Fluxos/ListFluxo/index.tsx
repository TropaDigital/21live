import { useCallback, useState } from 'react';
import { BiPlus, BiSearchAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

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

export default function ListFluxo() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { formData, setData, handleOnChange } = useForm({
    name: ''
  });

  const [modal, setModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const { data, fetchData } = useFetch<any[]>(`flow?search=${search}`);

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
          description: 'Serviço cadastrado com sucesso!'
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
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });
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

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Cargos">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>#</th>
                <th>Nome</th>
                <th>Etapas</th>
                <th>Projetos</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row) => (
                <tr key={row.flow_id}>
                  <td>{row.flow_id}</td>
                  <td>{row.name}</td>
                  <td>{row.steps}</td>
                  <td>5</td>
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
          </TableDefault>
        </ScrollAreas>
      </ContainerGroupTable>

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
