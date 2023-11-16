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
import SelectImage from '../Inputs/SelectWithImage';
import { TeamProps, TenantProps } from '../../utils/models';
import { InputDefault } from '../Inputs/InputDefault';
import { BiCalendar } from 'react-icons/bi';

type HandleOnChange = (
  event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
) => void;

interface FilterProps {
  applyFilters: any;
  clearFilters: any;
}

interface SelectedFilters {
  client: string;
  fromDate: string;
  toDate: string;
  user_id: string;
}

export default function FilterMeeting({ applyFilters, clearFilters }: FilterProps) {
  const { data } = useFetch<OfficeProps[]>(`function`);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataTeam } = useFetch<TeamProps[]>('team');

  const [choosenFilters, setChoosenFilter] = useState<SelectedFilters>({
    client: '',
    fromDate: '',
    toDate: '',
    user_id: ''
  });

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

  const handleAddFilters: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setChoosenFilter({ ...choosenFilters, [name]: value });
  };

  const handleAddClientFilter = (client: any) => {
    setChoosenFilter({ ...choosenFilters, ['client']: client.value });
    setInitialValue(client);
  };

  const handleClearFilters = () => {
    setChoosenFilter({
      client: '',
      fromDate: '',
      toDate: '',
      user_id: ''
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
            label="Responsável"
            placeholder="Selecione"
            name="user_id"
            onChange={handleAddFilters}
            value={choosenFilters.user_id}
            required
          >
            {dataTeam?.map((row) => (
              <option key={row.user_id} value={row.user_id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>
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
