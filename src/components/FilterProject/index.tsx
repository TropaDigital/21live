/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Styles
import { ContainerFilter, FilterButtons, FilterHeader, FilterOptions, FilterTitle } from './styles';

// Components
import { InputDefault } from '../Inputs/InputDefault';
import ButtonDefault from '../Buttons/ButtonDefault';
import SelectImage from '../Inputs/SelectWithImage';

// Icons
import { BiCalendar } from 'react-icons/bi';

// Utils
import { TenantProps } from '../../utils/models';

// Hooks
import { useFetch } from '../../hooks/useFetch';
import { SelectDefault } from '../Inputs/SelectDefault';

type HandleOnChange = (
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
) => void;

interface FilterProps {
  applyFilters: any;
  clearFilters: any;
  selectedClient: any;
}

interface SelectedFilters {
  fromDate: string;
  toDate: string;
  client: string;
  category: string;
  status: string;
}

export default function FilterProject({ applyFilters, clearFilters, selectedClient }: FilterProps) {
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [initialValue, setInitialValue] = useState<any>({
    value: '',
    label: '',
    image: '',
    color: ''
  });

  const clientsOptions = dataClient?.map((row) => {
    return {
      value: row.tenant_id,
      label: row.name,
      image: row.bucket,
      color: row.colormain
    };
  });

  const [choosenFilters, setChoosenFilter] = useState<SelectedFilters>({
    fromDate: '',
    toDate: '',
    client: '',
    category: '',
    status: ''
  });

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
  };

  const handleClearFilters = () => {
    setChoosenFilter({
      fromDate: '',
      toDate: '',
      client: '',
      category: '',
      status: ''
    });
    clearFilters();
  };

  const handleApplyFilters = () => {
    applyFilters(choosenFilters);
  };

  const handleAddClientFilter = (client: any) => {
    setChoosenFilter({ ...choosenFilters, ['client']: client.value });
    setInitialValue(client);
  };

  useEffect(() => {
    if (initialValue.label !== '') {
      selectedClient(initialValue);
    }
  }, [initialValue]);

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

        <div style={{ maxHeight: '62px' }}>
          <div style={{ flex: '1' }}>
            <SelectImage
              label={'Cliente'}
              dataOptions={clientsOptions}
              value={initialValue.value !== '' ? initialValue : null}
              onChange={handleAddClientFilter}
              placeholder={'Selecione o cliente...'}
            />
          </div>
        </div>

        <div style={{ maxHeight: '62px' }}>
          <SelectDefault
            label="FEE/SPOT"
            placeholder="Selecione"
            name="category"
            onChange={handleAddFilters}
            value={choosenFilters.category}
            required
          >
            <option value="fee">FEE</option>
            <option value="spot">SPOT</option>
          </SelectDefault>
        </div>

        {/* <div style={{ maxHeight: '62px' }}>
          <SelectDefault
            label="Status"
            placeholder="Selecione"
            name="status"
            onChange={handleAddFilters}
            value={choosenFilters.status}
            required
          >
            <option value="Em Progresso">Em andamento</option>
            <option value="Concluido">Concluído</option>
            <option value="Stand By">Stand by</option>
            <option value="Vencido">Vencido</option>
          </SelectDefault>
        </div> */}
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
