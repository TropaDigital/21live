import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';

import * as Dialog from '@radix-ui/react-dialog';
import { BiEdit, BiPlus, BiSearchAlt, BiX } from 'react-icons/bi';

import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import { TableDefault } from '../../../components/TableDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';

import { ContainerGroupTable, ContentDefault, FieldDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';
import { Container } from './styled';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';

export default function ListFluxo() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    name: ''
  })
  const { data, fetchData } = useFetch<any[]>('flow');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      // Inserir lógica
      await api.post('flow', formData);
   
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

    } catch (e: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });
    }
  }, [formData, open]);

  return (
    <Container>
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
            placeholder="Faça sua busca..."
            onChange={(event) => console.log(event.target.value)}
            icon={BiSearchAlt}
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
                      <ButtonDefault 
                        typeButton="info" 
                        onClick={() => navigate(`/fluxo/editar/${row.name.replaceAll(' ', '_')}`, {state: {id: row.flow_id, name: row.name }})}
                      >
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
    </Container>
  )
}
