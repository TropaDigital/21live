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
import { CheckboxDefault } from '../Inputs/CheckboxDefault';
import SelectReactDefault from '../Inputs/SelectReactDefault';

// Utils
import { TenantProps } from '../../utils/models';

// Hooks
import { useFetch } from '../../hooks/useFetch';

// Types
import { IProjectCreate, ServicesProps } from '../../types';

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
  product: any;
  product_name: string;
  contract: string;
  contract_name: string;
  contract_type: string;
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
  const { data: dataProducts } = useFetch<ServicesProps[]>(`services`);
  const { data: dataProject } = useFetch<IProjectCreate[]>(`project`);
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
    product: '',
    product_name: '',
    contract: '',
    contract_name: '',
    contract_type: '',
    sub_tasks: true
  });

  const defaultOptionsTeam = dataUsers?.filter((member) => member.user_id === choosenFilters.user);

  const defaultOptionsProduct = dataProducts?.filter(
    (obj) => obj.job_service_id === choosenFilters.product
  );

  const defaultOptionsContract = dataProject?.filter(
    (obj) => obj.project_id === choosenFilters.contract
  );

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
  };

  const handleAddUserFilter = (user: any) => {
    setChoosenFilter({ ...choosenFilters, user: user.value, user_name: user.label });
  };

  const handleAddContractFilter = (contract: any) => {
    setChoosenFilter({
      ...choosenFilters,
      contract: contract.value,
      contract_name: contract.label
    });
  };

  const handleAddProductFilter = (obj: any) => {
    setChoosenFilter({
      ...choosenFilters,
      product: obj.value,
      product_name: obj.label
    });
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
      product: '',
      product_name: '',
      contract: '',
      contract_name: '',
      contract_type: '',
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

  useEffect(() => {
    console.log('log do choosenFilters =>', choosenFilters);
  }, [choosenFilters]);

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
          <SelectReactDefault
            label="Produtos"
            dataOptions={dataProducts?.map((row) => ({
              value: row.job_service_id,
              label: row.service
            }))}
            value={defaultOptionsProduct?.map((row) => ({
              value: row.job_service_id,
              label: row.service
            }))}
            onChange={handleAddProductFilter}
            placeholder="Selecione o produto..."
          />
        </div>

        <div style={{ maxHeight: '62px' }}>
          <SelectReactDefault
            label="Projeto / Contrato"
            dataOptions={dataProject?.map((row) => ({
              value: row.project_id,
              label: row.title
            }))}
            value={defaultOptionsContract?.map((row) => ({
              value: row.project_id,
              label: row.title
            }))}
            onChange={handleAddContractFilter}
            placeholder="Selecione o projeto..."
          />
        </div>

        <div style={{ maxHeight: '62px' }}>
          <SelectDefault
            label="Tipo do contrato"
            placeholder="Selecione..."
            name="contract_type"
            onChange={handleAddFilters}
            value={choosenFilters.contract_type}
            required
          >
            <option value="free">Livre</option>
            <option value="product">Por produto</option>
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
