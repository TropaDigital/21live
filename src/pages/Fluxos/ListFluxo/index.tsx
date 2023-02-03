import React from 'react'

import { Container } from './styled';
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { BiEdit, BiPlus, BiSearchAlt, BiTrash } from 'react-icons/bi';
import { ContainerGroupTable, ContentDefault, FieldGroupFormDefault } from '../../../components/UiElements/styles';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import { TableDefault } from '../../../components/TableDefault';
import { dataFake } from '../../../utils/dataDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';

export default function ListFluxo() {
  return (
    <Container>
      <HeaderPage title="Fluxos">
        <ButtonDefault typeButton="success" onClick={() => console.log('OPEN')}>
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
                      <ButtonDefault typeButton="danger" onClick={() => console.log('!OPEN')}>
                        <BiTrash  />
                      </ButtonDefault>
                      <ButtonDefault typeButton="info" onClick={() => console.log(row)}>
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
    </Container>
  )
}
