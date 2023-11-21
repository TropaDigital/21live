/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useState } from 'react';

// Icons
import { BiFilter, BiSearchAlt, BiX } from 'react-icons/bi';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { FilterGroup, TableHead } from '../../../components/Table/styles';
import FilterModal from '../../../components/Ui/FilterModal';
import { ContainerDefault } from '../../../components/UiElements/styles';
import { Table } from '../../../components/Table';
import Pagination from '../../../components/Pagination';

// Hooks
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import ButtonTable from '../../../components/Buttons/ButtonTable';

// Libraries
import moment from 'moment';

// Styles
import { FiltersRequests, RequestsWrapper } from './styles';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/LoaderSpin';

interface ChoosenFilters {
  code: string;
  format: string;
  status: string;
  delivery: string;
  fromDate: string;
  toDate: string;
}

interface RequestsProps {
  id: number;
  title: string;
  format: string;
  status: string;
  user: string;
  unit: string;
  startDate: string;
  finishDate: string;
}

export default function Requests() {
  const navigate = useNavigate();
  const [modalFilters, setModalFilters] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(1);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [choosenFilters, setChoosenFilter] = useState<ChoosenFilters>({
    code: '',
    format: '',
    status: '',
    delivery: '',
    fromDate: '',
    toDate: ''
  });
  const { data, pages, isFetching } = useFetch<any[]>(
    `ticket?search=${search.replace(/[^\w ]/g, '')}&page=${selected}&id=${
      choosenFilters.code
    }&formato=${choosenFilters.format}&status=${choosenFilters.status}&entrega=${
      choosenFilters.delivery
    }&date_start=${choosenFilters.fromDate}&date_end=${choosenFilters.toDate}`
  );

  const handleViewRequest = (request: any) => {
    navigate(`/solicitacao/${request.ticket_id}`, { state: request.ticket_id });
  };

  const handleApplyFilters = (filters: any) => {
    setChoosenFilter(filters);
    setModalFilters(false);
  };

  const handleClearFilters = () => {
    setChoosenFilter({
      code: '',
      format: '',
      status: '',
      delivery: '',
      fromDate: '',
      toDate: ''
    });
    setModalFilters(false);
  };

  const hasFilters = Object.values(choosenFilters).every((obj) => obj === null || obj === '');

  return (
    <ContainerDefault>
      <HeaderPage title="Solicitações" />

      {isFetching && <Loader />}

      {!isFetching && (
        <RequestsWrapper>
          <Table>
            <TableHead>
              <div className="groupTable">
                <h2>
                  Lista de solicitações{' '}
                  {pages !== null && pages?.total > 0 ? (
                    <strong>
                      {pages?.total <= 1
                        ? `${pages?.total} solicitação`
                        : `${pages?.total} solicitações`}{' '}
                    </strong>
                  ) : (
                    <strong>0 solicitações</strong>
                  )}
                </h2>
              </div>

              {/* <div>
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
              </div> */}
            </TableHead>

            <FiltersRequests>
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

              {!hasFilters && (
                <ButtonDefault typeButton="danger" isOutline onClick={handleClearFilters}>
                  <div className="close-icon">
                    <BiX size={30} />
                  </div>
                  Limpar filtros
                </ButtonDefault>
              )}

              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => setModalFilters(true)}
              >
                <BiFilter />
                Filtros
              </ButtonDefault>
            </FiltersRequests>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Formato da peça</th>
                  <th>Status</th>
                  <th>Usuário</th>
                  <th>Unidade</th>
                  <th>Data de criação</th>
                  <th>Data de entrega</th>
                  <th style={{ color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((row: any, index: number) => (
                  <tr key={index}>
                    <td>#{String(row.ticket_id).padStart(5, '0')}</td>
                    <td onClick={() => handleViewRequest(row)} style={{ cursor: 'pointer' }}>
                      {row.title}
                    </td>
                    <td>{row.media_name}</td>
                    <td>
                      <div
                        className={
                          row.status === 'Em Análise'
                            ? 'status progress'
                            : row.status === 'Entregue'
                            ? 'status finished'
                            : row.status === 'Cancelado'
                            ? 'status canceled'
                            : row.status === 'Criação'
                            ? 'status creation'
                            : row.status === 'Aguardando Finalização'
                            ? 'status awaiting'
                            : row.status === 'Stand by'
                            ? 'status hold'
                            : 'status'
                        }
                      >
                        {row.status === 'Em Análise'
                          ? 'Em Análise'
                          : row.status === 'Entregue'
                          ? 'Entregue'
                          : row.status === 'Cancelado'
                          ? 'Cancelado'
                          : row.status === 'Criação'
                          ? 'Criação'
                          : row.status === 'Aguardando Finalização'
                          ? 'Aguardando Finalização'
                          : row.status === 'Stand by'
                          ? 'Stand by'
                          : 'Aguardando Aprovação'}
                      </div>
                    </td>
                    <td>{row.user_name}</td>
                    <td>{row.organization_name}</td>
                    <td style={{ minWidth: '150px' }}>
                      {moment(row.created).format('DD/MM/YYYY')}
                    </td>
                    <td style={{ minWidth: '150px' }}>
                      {row.finished ? moment(row.finished).format('DD/MM/YYYY') : 'A concluir'}
                    </td>
                    <td>
                      <div className="fieldTableClients">
                        <ButtonTable typeButton="view" onClick={() => handleViewRequest(row)} />
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
        </RequestsWrapper>
      )}

      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={handleApplyFilters}
        clearFilters={handleClearFilters}
        filterType="ticket"
      />
    </ContainerDefault>
  );
}
