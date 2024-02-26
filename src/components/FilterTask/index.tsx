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
import SelectReactDefault from '../Inputs/SelectReactDefault';

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
  user: string;
  user_name: string;
  sub_tasks: boolean;
}

interface UserProps {
  avatar: string;
  birthday: string;
  cost_per_hour: string;
  email: string;
  friday?: any;
  function: string;
  function_id: number;
  hiring_date: string;
  monday?: any;
  name: string;
  phone: string;
  saturday?: any;
  sunday?: any;
  tasks: number;
  tenant_id: number;
  thursday?: any;
  tuesday?: any;
  user_id: string;
  username: string;
  wednesday?: any;
  journey?: string;
  password: string;
  confirmPassword: string;
}

export default function FilterTask({ applyFilters, clearFilters, selectedClient }: FilterProps) {
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataUsers } = useFetch<UserProps[]>(`team`);
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
    client: '',
    status: '',
    user: '',
    user_name: '',
    sub_tasks: true
  });

  const defaultOptionsTeam = dataUsers?.filter((member) => member.user_id === choosenFilters.user);

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
  };

  const handleAddUserFilter = (user: any) => {
    setChoosenFilter({ ...choosenFilters, user: user.value, user_name: user.label });
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
      user: '',
      user_name: '',
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
              value={initialValue.value !== '' ? initialValue : null}
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
          <SelectReactDefault
            label="Usuários"
            dataOptions={dataUsers?.map((row: UserProps) => ({
              value: row.user_id,
              label: row.name
            }))}
            value={defaultOptionsTeam?.map((row) => ({
              value: row.user_id,
              label: row.name
            }))}
            onChange={handleAddUserFilter}
            placeholder="Selecione o usuário..."
          />
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
