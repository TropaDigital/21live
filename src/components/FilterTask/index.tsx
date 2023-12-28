/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Styles
import { ContainerFilter, FilterButtons, FilterHeader, FilterOptions, FilterTitle } from './styles';

// Components
import { SelectDefault } from '../Inputs/SelectDefault';
import ButtonDefault from '../Buttons/ButtonDefault';
import SelectImage from '../Inputs/SelectWithImage';

// Utils
import { TenantProps } from '../../utils/models';

// Hooks
import { useFetch } from '../../hooks/useFetch';
import { CheckboxDefault } from '../Inputs/CheckboxDefault';

type HandleOnChange = (
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
) => void;

interface FilterProps {
  applyFilters: any;
  clearFilters: any;
  selectedClient: any;
}

interface SelectedFilters {
  client: any;
  status: any;
  sub_tasks: boolean;
}

export default function FilterTask({ applyFilters, clearFilters, selectedClient }: FilterProps) {
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [initialValue, setInitialValue] = useState({
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
    client: '',
    status: '',
    sub_tasks: true
  });

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
  };

  const handleCheckFilter = (event: any) => {
    const value = event.currentTarget?.checked;
    setChoosenFilter({ ...choosenFilters, ['sub_tasks']: value });
  };

  const handleAddClientFilter = (client: any) => {
    setChoosenFilter({ ...choosenFilters, ['client']: client.value });
    setInitialValue(client);
  };

  const handleClearFilters = () => {
    setChoosenFilter({
      client: '',
      status: '',
      sub_tasks: false
    });
    clearFilters();
    setInitialValue({
      value: '',
      label: '',
      image: '',
      color: ''
    });
  };

  const handleApplyFilters = () => {
    applyFilters(choosenFilters);
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
          <div style={{ flex: '1' }}>
            <SelectImage
              label={'Cliente'}
              dataOptions={clientsOptions}
              value={initialValue}
              onChange={handleAddClientFilter}
              placeholder={'Selecione o cliente...'}
            />
          </div>
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
            <option value="Concluida">Concluída</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em progresso</option>
            <option value="Alteração Interna">Alteração interna</option>
            <option value="Alteração Externa">Alteração externa</option>
          </SelectDefault>
        </div>

        <div style={{ maxHeight: '62px' }}>
          <CheckboxDefault
            label="Mostrar subtarefas"
            id="subtasks"
            checked={choosenFilters.sub_tasks}
            onChange={handleCheckFilter}
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
