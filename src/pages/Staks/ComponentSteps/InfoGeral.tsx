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
  dataProducts: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  clients: TenantProps[] | null;
  error: FormProps;
}

export default function InfoGeral({
  data,
  dataProducts,
  handleInputChange,
  clients,
  error
}: Props) {
  return (
    <div>
      <FlexLine>
        <InputDefault
          label="Titulo da tarefa"
          placeholder="Nome do projeto"
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
          name="contract"
          value={data.contract}
          onChange={handleInputChange}
          error={error?.contract}
        >
          {dataProducts?.map((row: any) => (
            <option key={row.service_id} value={row.service_id}>
              {row.service}
            </option>
          ))}
        </SelectDefault>

        <SelectDefault
          label="Fluxo"
          name="flow"
          value={data.flow}
          onChange={handleInputChange}
          error={error?.flow}
        >
          <option value="projeto">Sei Lá</option>
          <option value="projeto">Não Sei</option>
        </SelectDefault>
      </FlexLine>
    </div>
  );
}
