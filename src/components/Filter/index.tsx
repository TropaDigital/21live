/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Styles
import { ContainerFilter, FilterButtons, FilterHeader, FilterOptions, FilterTitle } from './styles';

// Icons
import { BiCalendar, BiSearchAlt } from 'react-icons/bi';

// Components
import { InputDefault } from '../Inputs/InputDefault';
import { SelectDefault } from '../Inputs/SelectDefault';
import ButtonDefault from '../Buttons/ButtonDefault';
import api from '../../services/api';

type HandleOnChange = (
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
) => void;

interface FilterProps {
  filterProps?: SelectedFilters;
  applyFilters: any;
  clearFilters: any;
}

interface SelectedFilters {
  code: string;
  format: string;
  status: string;
  delivery: string;
  fromDate: string;
  toDate: string;
}

export default function FilterMenu({ filterProps, applyFilters, clearFilters }: FilterProps) {
  const [dataStatus, setDataStatus] = useState<any[]>([]);
  const tenantId = localStorage.getItem('tenant_id');

  useEffect(() => {
    const getDataTicketStatus = async () => {
      try {
        const response = await api.get(`ticket-status/${tenantId}`);
        setDataStatus(response.data.result);
      } catch (error: any) {
        console.log('log do error', error);
      }
    };

    getDataTicketStatus();
  }, [tenantId]);

  const [choosenFilters, setChoosenFilter] = useState<SelectedFilters>({
    code: '',
    format: '',
    status: '',
    delivery: '',
    fromDate: '',
    toDate: ''
  });

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
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
    clearFilters();
  };

  const handleApplyFilters = () => {
    applyFilters(choosenFilters);
  };

  return (
    <ContainerFilter>
      <FilterHeader>
        <FilterTitle>Filtros</FilterTitle>
      </FilterHeader>

      <FilterOptions>
        <div style={{ maxHeight: '62px' }}>
          <InputDefault
            label="Código"
            name="code"
            placeholder="Busque pelo código..."
            onChange={handleAddFilters}
            value={choosenFilters.code}
            icon={BiSearchAlt}
            className="search-field"
          />
        </div>

        <div style={{ maxHeight: '62px' }}>
          <InputDefault
            label="Formato"
            name="format"
            placeholder="JPG, PNG, PDF..."
            onChange={handleAddFilters}
            value={choosenFilters.format}
            icon={BiSearchAlt}
            className="search-field"
          />
          {/* <SelectDefault
            label="Formato"
            placeholder="Selecione"
            name="format"
            onChange={handleAddFilters}
            value={choosenFilters.format}
            required
          >
            <option key={'impresso'} value={'impresso'}>
              Impresso
            </option>
            <option key={'digital'} value={'digital'}>
              Digital
            </option>
          </SelectDefault> */}
        </div>

        <div style={{ maxHeight: '62px' }}>
          <SelectDefault
            label="Status"
            placeholder="Selecione"
            name="status"
            onChange={handleAddFilters}
            value={choosenFilters.status}
            required
          >
            {dataStatus?.map((row: any, index: any) => (
              <option key={index} value={row.ticket_status_id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>
        </div>

        <div style={{ maxHeight: '62px' }}>
          <InputDefault
            label="Entrega"
            placeholder="dd/mm/aaaa"
            name="delivery"
            type="date"
            max={'9999-12-31'}
            icon={BiCalendar}
            onChange={handleAddFilters}
            value={choosenFilters.delivery}
          />
          {/* <SelectDefault
            label="Entrega"
            placeholder="Selecione"
            name="delivery"
            onChange={handleAddFilters}
            value={choosenFilters.delivery}
            required
          >
            <option key={'pendente'} value={'pendente'}>
              Pendente
            </option>
          </SelectDefault> */}
        </div>

        <div style={{ maxHeight: '62px' }}>
          <InputDefault
            label="De"
            placeholder="dd/mm/aaaa"
            name="fromDate"
            type="date"
            max={'9999-12-31'}
            icon={BiCalendar}
            onChange={handleAddFilters}
            value={choosenFilters.fromDate}
          />
        </div>

        <div style={{ maxHeight: '62px' }}>
          <InputDefault
            label="Até"
            placeholder="dd/mm/aaaa"
            name="toDate"
            type="date"
            max={'9999-12-31'}
            icon={BiCalendar}
            onChange={handleAddFilters}
            value={choosenFilters.toDate}
          />
        </div>
      </FilterOptions>

      <FilterButtons>
        <ButtonDefault typeButton="lightWhite" isOutline onClick={handleClearFilters}>
          Limpar filtros
        </ButtonDefault>
        <ButtonDefault typeButton="primary" onClick={handleApplyFilters}>
          Aplicar filtros
        </ButtonDefault>
      </FilterButtons>
    </ContainerFilter>
  );
}
