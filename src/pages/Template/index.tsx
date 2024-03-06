// React
import { useState } from 'react';

// Styles
import { FilterBtnWrapper } from './styles';

// Components
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import { Table } from '../../components/Table';
import { TableHead } from '../../components/Table/styles';
import { ContainerDefault, SectionDefault } from '../../components/UiElements/styles';
import ButtonDefault from '../../components/Buttons/ButtonDefault';

// Hooks
import useDebouncedCallback from '../../hooks/useDebounced';

// Icons
import { BiFilter, BiSearchAlt } from 'react-icons/bi';

export default function TemplateAgenda() {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  return (
    <ContainerDefault>
      <HeaderPage title="Templates" />

      <SectionDefault>
        <div style={{ margin: '-24px -30px' }}>
          <Table>
            <TableHead>
              <div className="groupTable">
                <h2>
                  Templates <strong>0 templates</strong>
                  {/* {pages !== null && pages?.total > 0 ? (
                    <strong>
                      {pages?.total <= 1 ? `${pages?.total} usuário` : `${pages?.total} usuários`}{' '}
                    </strong>
                  ) : (
                    <strong>0 usuário</strong>
                  )} */}
                </h2>
              </div>

              <FilterBtnWrapper>
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

                <ButtonDefault typeButton="lightWhite" isOutline onClick={() => ''}>
                  <BiFilter />
                  Filtros
                </ButtonDefault>
              </FilterBtnWrapper>
            </TableHead>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                </tr>
              </thead>
            </table>
          </Table>
        </div>
      </SectionDefault>
    </ContainerDefault>
  );
}
