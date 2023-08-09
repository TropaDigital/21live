/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useState } from 'react';

// Icons
import { BiFilter, BiSearchAlt } from 'react-icons/bi';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { FilterGroup } from '../../../components/Table/styles';
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
import { RequestsWrapper } from './styles';

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
  const { data, pages } = useFetch(`solicitacoes?search=${search}&page=${selected}`);

  const handleViewRequest = (id: any) => {
    console.log('log request to view', id);
  };

  const handleApplyFilters = (filters: any) => {
    console.log('log apply filters', filters);
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

  // FakeData
  const requests: RequestsProps[] = [
    {
      id: 1,
      title: 'Request 1',
      format: 'Type A',
      status: 'Pending',
      user: 'User A',
      unit: 'Unit X',
      startDate: '2023-08-07',
      finishDate: '2023-08-12'
    },
    {
      id: 2,
      title: 'Request 2',
      format: 'Type B',
      status: 'finished',
      user: 'User B',
      unit: 'Unit Y',
      startDate: '2023-08-08',
      finishDate: '2023-08-15'
    },
    {
      id: 3,
      title: 'Request 3',
      format: 'Type C',
      status: 'progress',
      user: 'User C',
      unit: 'Unit Z',
      startDate: '2023-08-09',
      finishDate: '2023-08-14'
    },
    {
      id: 4,
      title: 'Request 4',
      format: 'Type A',
      status: 'Pending',
      user: 'User D',
      unit: 'Unit X',
      startDate: '2023-08-10',
      finishDate: '2023-08-17'
    },
    {
      id: 5,
      title: 'Request 5',
      format: 'Type B',
      status: 'finished',
      user: 'User E',
      unit: 'Unit Y',
      startDate: '2023-08-11',
      finishDate: '2023-08-16'
    }
  ];

  return (
    <ContainerDefault>
      <HeaderPage title="Solicitações" />

      <RequestsWrapper>
        <Table>
          <FilterGroup>
            <InputDefault
              label=""
              name="search"
              placeholder="Busque pelo título..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
                debouncedCallback(event.target.value);
              }}
              value={searchTerm}
              icon={BiSearchAlt}
              isLoading={isLoading}
              className="search-field"
            />

            <ButtonDefault typeButton="lightWhite" isOutline onClick={() => setModalFilters(true)}>
              <BiFilter />
              Filtros
            </ButtonDefault>
          </FilterGroup>
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
                <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((row: RequestsProps, index: number) => (
                <tr key={index}>
                  <td>#{String(row.id).padStart(5, '0')}</td>
                  <td>{row.title}</td>
                  <td>{row.format}</td>
                  <td>
                    <div
                      className={
                        row.status === 'progress'
                          ? 'status progress'
                          : row.status === 'finished'
                          ? 'status finished'
                          : 'status'
                      }
                    >
                      {row.status === 'progress'
                        ? 'Em progresso'
                        : row.status === 'finished'
                        ? 'Concluída'
                        : 'Pendente'}
                    </div>
                  </td>
                  <td>{row.user}</td>
                  <td>{row.unit}</td>
                  <td>{moment(row.startDate).format('DD/MM/YYYY')}</td>
                  <td>{moment(row.finishDate).format('DD/MM/YYYY')}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable typeButton="view" onClick={() => handleViewRequest('1')} />
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

      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={(filters: any) => handleApplyFilters(filters)}
        clearFilters={handleClearFilters}
      />
    </ContainerDefault>
  );
}
