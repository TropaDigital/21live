/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import { BiFilter, BiSearchAlt, BiX } from 'react-icons/bi';
import { FiFlag } from 'react-icons/fi';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { FilterGroup, TableHead } from '../../../components/Table/styles';
import FilterModal from '../../../components/Ui/FilterModal';
import {
  AppliedFilter,
  ContainerDefault,
  FilterTotal
} from '../../../components/UiElements/styles';
import { Table } from '../../../components/Table';
import Pagination from '../../../components/Pagination';
import ModalLoader from '../../../components/Ui/ModalLoader';

// Hooks
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import ButtonTable from '../../../components/Buttons/ButtonTable';

// Libraries
import moment from 'moment';

// Styles
import { ButtonIcon, FiltersRequests, RequestsWrapper } from './styles';

interface ChoosenFilters {
  code: string;
  format: string;
  status: string;
  delivery: string;
  fromDate: string;
  toDate: string;
  [key: string]: string;
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
  const [selectedStatus, setSelectedStatus] = useState<any>();

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

  const countNonEmptyProperties = () => {
    let count = 0;
    for (const key in choosenFilters) {
      if (Object.prototype.hasOwnProperty.call(choosenFilters, key)) {
        // Check if the property is not empty or null
        if (choosenFilters[key] !== '' && choosenFilters[key] !== null) {
          count++;
        }
      }
    }
    return count;
  };

  return (
    <ContainerDefault>
      <HeaderPage title="Solicitações" />

      {!isFetching && (
        <RequestsWrapper>
          <Table>
            <TableHead style={{ width: 'calc(100vw - 230px)' }}>
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
            </TableHead>
            {!hasFilters && (
              <FilterGroup style={{ width: 'calc(100vw - 260px)' }}>
                <FilterTotal>
                  <div className="filter-title">Filtros ({countNonEmptyProperties()}):</div>
                  {choosenFilters.code !== '' ? <span>Código</span> : ''}
                  {choosenFilters.format !== '' ? <span>Formato</span> : ''}
                  {choosenFilters.status !== '' ? <span>Status</span> : ''}
                  {choosenFilters.delivery !== '' ? <span>Entrega</span> : ''}
                  {choosenFilters.fromDate !== '' ? <span>Data</span> : ''}
                </FilterTotal>

                <AppliedFilter>
                  {choosenFilters.code !== '' ? (
                    <div className="filter-title">
                      Código: <span>{choosenFilters.code}</span>
                    </div>
                  ) : (
                    ''
                  )}

                  {choosenFilters.format !== '' ? (
                    <div className="filter-title">
                      Formato: <span>{choosenFilters.format}</span>
                    </div>
                  ) : (
                    ''
                  )}
                  {/* Ajustar */}
                  {choosenFilters.status !== '' ? (
                    <div className="filter-title">
                      Status: <span>{selectedStatus?.name}</span>
                    </div>
                  ) : (
                    ''
                  )}

                  {choosenFilters.delivery !== '' ? (
                    <div className="filter-title">
                      Entrega: <span>{moment(choosenFilters.delivery).format('DD/MM/YYYY')}</span>
                    </div>
                  ) : (
                    ''
                  )}

                  {choosenFilters.fromDate !== '' ? (
                    <div className="filter-title">
                      Data inicial:{' '}
                      <span>{moment(choosenFilters.fromDate).format('DD/MM/YYYY')}</span>
                    </div>
                  ) : (
                    ''
                  )}

                  {choosenFilters.toDate !== '' ? (
                    <div className="filter-title">
                      Data final: <span>{moment(choosenFilters.toDate).format('DD/MM/YYYY')}</span>
                    </div>
                  ) : (
                    ''
                  )}
                </AppliedFilter>
              </FilterGroup>
            )}

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
                    <td onClick={() => handleViewRequest(row)} style={{ cursor: 'pointer' }}>
                      #{String(row.ticket_id).padStart(5, '0')}
                    </td>
                    <td onClick={() => handleViewRequest(row)} style={{ cursor: 'pointer' }}>
                      {row.title}
                    </td>
                    <td onClick={() => handleViewRequest(row)} style={{ cursor: 'pointer' }}>
                      {row.media_name}
                    </td>
                    <td onClick={() => handleViewRequest(row)} style={{ cursor: 'pointer' }}>
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
                    <td onClick={() => handleViewRequest(row)} style={{ cursor: 'pointer' }}>
                      {row.user_name}
                    </td>
                    <td onClick={() => handleViewRequest(row)} style={{ cursor: 'pointer' }}>
                      {row.organization_name}
                    </td>
                    <td
                      style={{ minWidth: '150px', cursor: 'pointer' }}
                      onClick={() => handleViewRequest(row)}
                    >
                      {moment(row.created).format('DD/MM/YYYY')}
                    </td>
                    <td
                      style={{ minWidth: '150px', cursor: 'pointer' }}
                      onClick={() => handleViewRequest(row)}
                    >
                      {row.finished ? moment(row.finished).format('DD/MM/YYYY') : 'A concluir'}
                    </td>
                    <td>
                      <div className="fieldTableClients">
                        {row.task_id && (
                          <ButtonIcon onClick={() => navigate(`/tarefa/${row.task_id}`)}>
                            <FiFlag color={'#F04438'} />
                          </ButtonIcon>
                        )}
                        <ButtonTable typeButton="view" onClick={() => handleViewRequest(row)} />
                      </div>
                    </td>
                  </tr>
                ))}

                {data && data.length <= 0 && (
                  <tr>
                    <td colSpan={9} style={{ textAlign: 'center' }}>
                      Sem solicitações
                    </td>
                  </tr>
                )}
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

      {/* Modal loading submit */}
      <ModalLoader isOpen={isFetching} />

      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={handleApplyFilters}
        clearFilters={handleClearFilters}
        clientSelected={setSelectedStatus}
        filterType="ticket"
      />
    </ContainerDefault>
  );
}
