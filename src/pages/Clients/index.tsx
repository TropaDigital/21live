/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Icons
import { BiPlus, BiSearchAlt } from 'react-icons/bi';

// Components
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import HeaderPage from '../../components/HeaderPage';
import Loader from '../../components/LoaderSpin';
import { Table } from '../../components/Table';
import { TableHead } from '../../components/Table/styles';
import { InputDefault } from '../../components/Inputs/InputDefault';
import Pagination from '../../components/Pagination';
import ButtonTable from '../../components/Buttons/ButtonTable';

// Styles
import { Container, LogoContainer } from './styles';

// Hooks
import { useFetch } from '../../hooks/useFetch';
import useDebouncedCallback from '../../hooks/useDebounced';

interface TenantProps {
  bucket: string;
  colormain: string;
  name: string;
  slug: string;
  tenant_id: string;
  contact_name: string;
  email: string;
  meetings: string;
  reports: string;
  utils_information: string;
}

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [search, setSearch] = useState('');
  const [pageSelected, setPageSelected] = useState<number>(1);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const { data, pages, isFetching } = useFetch<TenantProps[]>(
    `tenant?search=${search.replace(/[^\w ]/g, '')}&page=${pageSelected}&perPage=15`
  );
  const instance = localStorage.getItem('tenantName');

  const handleNavigate = (tenantInfo: TenantProps) => {
    if (instance) {
      window.open(`https://app.21live.com.br/${instance}/tenants/edit/${tenantInfo.tenant_id}`);
    }
  };

  const handleNewClient = () => {
    if (instance) {
      window.open(`https://app.21live.com.br/${instance}/Flow/newTenant`, '_blank');
    }
  };

  return (
    <Container>
      <HeaderPage title="Clientes">
        <ButtonDefault typeButton="success" onClick={handleNewClient}>
          <BiPlus color="#fff" />
          Novo Cliente
        </ButtonDefault>
      </HeaderPage>

      {isFetching && <Loader />}

      {!isFetching && (
        <Table>
          <TableHead>
            <div className="groupTable">
              <h2>
                Lista de clientes
                {pages !== null && pages?.total > 0 ? (
                  <strong>
                    {pages?.total <= 1 ? `${pages?.total} cliente` : `${pages?.total} clientes`}{' '}
                  </strong>
                ) : (
                  <strong>0 clientes</strong>
                )}
              </h2>
            </div>

            <div>
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
                className="search-field"
              />
            </div>
          </TableHead>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row: TenantProps) => (
                <tr key={row.tenant_id}>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleNavigate(row)}>
                    #{row.tenant_id}
                  </td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleNavigate(row)}>
                    <LogoContainer>
                      <div
                        className="client-image"
                        style={{
                          backgroundColor: `#${row.colormain}`,
                          backgroundImage: `url(https://${row.bucket}.s3.amazonaws.com/tenant/logo.png)`
                        }}
                      />
                    </LogoContainer>
                  </td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleNavigate(row)}>
                    {row.name}
                  </td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleNavigate(row)}>
                    /{row.slug}
                  </td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable typeButton="edit" onClick={() => handleNavigate(row)} />
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
                    currentPage={pageSelected}
                    lastPage={pages.lastPage}
                    onClickPage={(e) => setPageSelected(e)}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </Table>
      )}
    </Container>
  );
}
