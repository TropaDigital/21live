import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiEdit, BiPlus, BiSearchAlt, BiX } from 'react-icons/bi';

// HOOKS
import { useFetch } from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/toast';

// UTILS
import { useDebounce } from '../../../utils/useDebounce';

// COMPONENTS
import * as Dialog from '@radix-ui/react-dialog';
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import { TableDefault } from '../../../components/TableDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import Alert from '../../../components/Ui/Alert'
import ButtonTable from '../../../components/Buttons/ButtonTable';

// SERVICES
import api from '../../../services/api';

// STYLES

import { ContainerDefault, ContainerGroupTable, ContentDefault, FieldDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';

export default function ListFluxo() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: ''
  })
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [search, setSearch] = useState('');
  const [isSearching, setSearching] = useState(false);

  const { data, fetchData } = useFetch<any[]>(`flow?search=${search}`);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      setSearch(searchTerm);
      const handler = setTimeout(() => {
        setSearching(false);
      }, 500);
      return () => {
        clearTimeout(handler)
      }
    } else {
      setSearch('')
      setSearching(false);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value });
  };

  async function handleOnDelete(id: any) {
    try {
      const response = await api.delete(`/flow/${id}`)

      addToast({
        title: 'Sucesso',
        description: 'Fluxo deletado com sucesso!',
        type: 'success'
      })

      fetchData();

    } catch(err: any) {
      console.log('ERR =>', err)

      addToast({
        title: 'Atenção',
        description: err.data.result,
        type: 'warning'
      })
    }
  }

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      // Inserir lógica
      const response = await api.post('flow', formData);
   
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço cadastrado com sucesso!',
      });

      fetchData();
      setModal(!modal);
      setFormData({
        name: ''
      });

      navigate(`/fluxo/editar/${formData.name.replaceAll(' ', '_')}`, {state: {id: response.data.result, name: formData.name }})

    } catch (e: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });
    }
  }, [formData, open]);

  return (
    <ContainerDefault>
      <HeaderPage title="Fluxos">
        <ButtonDefault typeButton="success" onClick={() => setModal(!modal)}>
          <BiPlus color="#fff" />
            Novo Fluxo
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault style={{ position: 'relative' }}>
        <FieldGroupFormDefault>
          <InputDefault
            label="Busca"
            name="search"
            placeholder="Busque pelo nome..."
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={BiSearchAlt}
            isLoading={isSearching}
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
                  <td>
                    {row.name}
                  </td>
                  <td>{row.steps}</td>
                  <td>5</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable 
                        typeButton='edit'
                        onClick={() => navigate(`/fluxo/editar/${row.name.replaceAll(' ', '_')}`, {state: {id: row.flow_id, name: row.name }})}
                      />
                      <Alert
                        title='Atenção'
                        subtitle='Certeza que gostaria de remover esse fluxo? Ao excluir a acão não poderá ser desfeita.'
                        cancelButton={() => {}}
                        confirmButton={() => handleOnDelete(row.flow_id)}
                      >
                        <ButtonTable 
                          typeButton='delete'
                        />
                      </Alert>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableDefault>
        </ScrollAreas>
      </ContainerGroupTable>

      <Dialog.Root open={modal} onOpenChange={setModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Novo Fluxo</Dialog.Title>
            <form onSubmit={handleOnSubmit}>
              <FieldDefault>
                <InputDefault
                  label="Nome do Fluxo"
                  placeholder="Digite aqui..."
                  name="name"
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </FieldDefault>

              <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
                <ButtonDefault
                  typeButton="dark"
                  isOutline
                  onClick={() => setModal(!modal)}
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
    </ContainerDefault>
  )
}
