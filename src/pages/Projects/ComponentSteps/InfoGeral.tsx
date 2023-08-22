/* eslint-disable import-helpers/order-imports */
// React
import React from 'react';

// Icons
import { BiCalendar } from 'react-icons/bi';

// Utils
import { TenantProps } from '../../../utils/models';
import { OrganizationsProps } from '../../../types';

// Components
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';

// Styles
import { FlexLine } from './styles';
import { useAuth } from '../../../hooks/AuthContext';

interface FormProps {
  [key: string]: any;
}

interface Props {
  data: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  clients?: TenantProps[] | null;
  organizations?: OrganizationsProps[] | null;
  error: FormProps;
}

export default function InfoGeral({
  data,
  handleInputChange,
  clients,
  organizations,
  error
}: Props) {
  const { user } = useAuth();

  return (
    <div>
      <FlexLine>
        <InputDefault
          label="Titulo do Projeto/Contrato"
          placeholder="Nome do projeto"
          name="title"
          value={data.title}
          onChange={handleInputChange}
          error={error?.title}
        />
        {user.organizations.length <= 0 && (
          <SelectDefault
            label="Cliente"
            name="tenant_id"
            value={data.tenant_id}
            onChange={handleInputChange}
            error={error?.tenant_id}
          >
            {clients?.map((row) => (
              <option key={row.tenant_id} value={row.tenant_id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>
        )}

        {user.organizations.length > 0 && (
          <SelectDefault
            label="Cliente"
            name="organization_id"
            value={data.organization_id}
            onChange={handleInputChange}
            error={error?.organization_id}
          >
            {organizations?.map((row) => (
              <option key={row.organization_id} value={row.organization_id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>
        )}
      </FlexLine>

      <FlexLine>
        <SelectDefault
          label="Fee ou Spot"
          name="category"
          value={data.category}
          onChange={handleInputChange}
          error={error?.category}
        >
          <option value="fee">Fee</option>
          <option value="spot">Spot</option>
        </SelectDefault>

        <SelectDefault
          label="Tipo de contrato"
          name="contract_type"
          value={data.contract_type}
          onChange={handleInputChange}
          error={error?.contract_type}
        >
          <option value="free">Livre</option>
          <option value="product">Por Produto</option>
        </SelectDefault>
      </FlexLine>

      <FlexLine>
        <InputDefault
          label="Data inicial"
          name="date_start"
          type="date"
          icon={BiCalendar}
          value={data.date_start}
          onChange={handleInputChange}
          error={error?.date_start}
        />

        <InputDefault
          label="Data final"
          name="date_end"
          type="date"
          icon={BiCalendar}
          value={data.date_end}
          onChange={handleInputChange}
          error={error?.date_end}
        />
      </FlexLine>
    </div>
  );
}
