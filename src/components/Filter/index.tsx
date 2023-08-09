/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Styles
import { ContainerFilter, FilterButtons, FilterHeader, FilterOptions, FilterTitle } from './styles';

// Icons
import { IconClose } from '../../assets/icons';
import { BiCalendar, BiSearchAlt } from 'react-icons/bi';

// Components
import { InputDefault } from '../Inputs/InputDefault';
import { SelectDefault } from '../Inputs/SelectDefault';
import ButtonDefault from '../Buttons/ButtonDefault';

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
  const [searchTerm, setSearchTerm] = useState<string>('');
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
    console.log('log do add filter', name, value);
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
            name="search"
            placeholder="Busque pelo título..."
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
            icon={BiSearchAlt}
            className="search-field"
          />
        </div>

        <div style={{ maxHeight: '62px' }}>
          <SelectDefault
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
          </SelectDefault>
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
            <option key={'pendente'} value={'pendente'}>
              Pendente
            </option>
          </SelectDefault>
        </div>

        <div style={{ maxHeight: '62px' }}>
          <SelectDefault
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
          </SelectDefault>
        </div>

        <div style={{ maxHeight: '62px' }}>
          <InputDefault
            label="De"
            placeholder="dd/mm/aaaa"
            name="dateStart"
            type="date"
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
