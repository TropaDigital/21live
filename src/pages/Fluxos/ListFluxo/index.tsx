import React, { useState } from 'react'

import { Container } from './styled';
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { BiEdit, BiPlus, BiSearchAlt, BiTrash, BiX } from 'react-icons/bi';
import { ContainerGroupTable, ContentDefault, FieldDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import { TableDefault } from '../../../components/TableDefault';
import { dataFake } from '../../../utils/dataDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';

import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';


export default function ListFluxo() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    fluxo: ''
  })

  const handleInputChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [name]: event.target.value });
  };



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
              {dataFake?.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    {row.name}
                  </td>
                  <td>{row.step}</td>
                  <td>{row.project}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonDefault typeButton="info" onClick={() => {
                        navigate(`/fluxo/editar/${row.id}`)
                      }}>
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
            <form onSubmit={() => console.log('data')}>
              <FieldDefault>
                <InputDefault
                  label="Nome do Fluxo"
                  placeholder="Digite aqui..."
                  name="fluxo"
                  onChange={(event) => handleInputChange('fluxo', event)}
                  value={formData.fluxo}
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
