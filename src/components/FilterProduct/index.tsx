/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Styles
import { ContainerFilter, FilterButtons, FilterHeader, FilterOptions, FilterTitle } from './styles';

// Components
import { SelectDefault } from '../Inputs/SelectDefault';
import ButtonDefault from '../Buttons/ButtonDefault';
import api from '../../services/api';

type HandleOnChange = (
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
) => void;

interface FilterProps {
  applyFilters: any;
  clearFilters: any;
}

interface SelectedFilters {
  category: string;
  type: string;
}

export default function FilterProduct({ applyFilters, clearFilters }: FilterProps) {
  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get(`category`);
        setCategory(response.data.result);
      } catch (error: any) {
        console.log('log do error', error);
      }
    };

    getCategories();
  }, []);

  const [choosenFilters, setChoosenFilter] = useState<SelectedFilters>({
    category: '',
    type: ''
  });

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
  };

  const handleClearFilters = () => {
    setChoosenFilter({
      category: '',
      type: ''
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
            label="Categoria"
            placeholder="Selecione"
            name="category"
            onChange={handleAddFilters}
            value={choosenFilters.category}
            required
          >
            {category?.map((row: any, index: any) => (
              <option key={index} value={row.category}>
                {row.category}
              </option>
            ))}
          </SelectDefault>
        </div>

        <div style={{ maxHeight: '62px' }}>
          <SelectDefault
            label="Tipo"
            placeholder="Selecione"
            name="type"
            onChange={handleAddFilters}
            value={choosenFilters.type}
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
