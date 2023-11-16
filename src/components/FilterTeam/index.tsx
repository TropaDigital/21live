/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Styles
import { ContainerFilter, FilterButtons, FilterHeader, FilterOptions, FilterTitle } from './styles';

// Components
import { SelectDefault } from '../Inputs/SelectDefault';
import ButtonDefault from '../Buttons/ButtonDefault';
import { useFetch } from '../../hooks/useFetch';
import { OfficeProps } from '../../pages/Team/ListTeam';

type HandleOnChange = (
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
) => void;

interface FilterProps {
  applyFilters: any;
  clearFilters: any;
}

interface SelectedFilters {
  role: string;
}

export default function FilterTeam({ applyFilters, clearFilters }: FilterProps) {
  const { data } = useFetch<OfficeProps[]>(`function`);

  const [choosenFilters, setChoosenFilter] = useState<SelectedFilters>({
    role: ''
  });

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
  };

  const handleClearFilters = () => {
    setChoosenFilter({
      role: ''
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
          <SelectDefault
            label="Cargo"
            placeholder="Selecione"
            name="role"
            onChange={handleAddFilters}
            value={choosenFilters.role}
            required
          >
            {data?.map((row: any) => (
              <option key={row.function_id} value={row.function_id}>
                {row.function}
              </option>
            ))}
          </SelectDefault>
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
