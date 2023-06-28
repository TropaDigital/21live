/* eslint-disable import-helpers/order-imports */
// React
import React from 'react';

// Utils
import { TenantProps } from '../../../utils/models';

// Components
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { FlexLine } from '../../Projects/ComponentSteps/styles';

interface FormProps {
  [key: string]: any;
}

interface Props {
  data: any;
  dataProjects: any;
  dataFlow: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  clients: TenantProps[] | null;
  error: FormProps;
}

interface FlowProps {
  flow_id: string;
  tenant_id: string;
  name: string;
  steps: string;
  user_id: string;
}

export default function InfoGeral({
  data,
  dataProjects,
  dataFlow,
  handleInputChange,
  clients,
  error
}: Props) {
  return (
    <div>
      <FlexLine>
        <InputDefault
          label="Titulo da tarefa"
          placeholder="Nome da tarefa"
          name="title"
          value={data.title}
          onChange={handleInputChange}
          error={error?.title}
        />

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
      </FlexLine>

      <FlexLine>
        <SelectDefault
          label="Projeto/Contrato"
          name="product_id"
          value={data.product_id}
          onChange={handleInputChange}
          error={error?.product_id}
        >
          {dataProjects?.map((row: any) => (
            <option key={row.product_id} value={row.product_id}>
              {row.select}
            </option>
          ))}
        </SelectDefault>

        <SelectDefault
          label="Fluxo"
          name="flow_id"
          value={data.flow_id}
          onChange={handleInputChange}
          error={error?.flow_id}
        >
          {dataFlow?.map((row: FlowProps) => (
            <option key={row.flow_id} value={row.flow_id}>
              {row.name}
            </option>
          ))}
        </SelectDefault>
      </FlexLine>
    </div>
  );
}
