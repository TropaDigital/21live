/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Styles
import { ContainerFilter, FilterButtons, FilterHeader, FilterOptions, FilterTitle } from './styles';

// Components
import { InputDefault } from '../Inputs/InputDefault';
import ButtonDefault from '../Buttons/ButtonDefault';
// Icons
import { BiCalendar } from 'react-icons/bi';

type HandleOnChange = (
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
) => void;

interface FilterProps {
  applyFilters: any;
  clearFilters: any;
}

interface SelectedFilters {
  fromDate: string;
  toDate: string;
}

export default function FilterDash({ applyFilters, clearFilters }: FilterProps) {
  const [choosenFilters, setChoosenFilter] = useState<SelectedFilters>({
    fromDate: '',
    toDate: ''
  });

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
  };

  const handleClearFilters = () => {
    setChoosenFilter({
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
            label="Data inicial"
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
            label="Data final"
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
