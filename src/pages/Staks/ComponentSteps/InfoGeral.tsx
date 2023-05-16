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
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  clients: TenantProps[] | null;
  error: FormProps;
}

export default function InfoGeral({ data, handleInputChange, clients, error }: Props) {
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
          <option value="projeto">Projeto</option>
          <option value="contrato">Contrato</option>
        </SelectDefault>

        <SelectDefault
          label="Fluxo"
          name="flow"
          value={data.flow}
          onChange={handleInputChange}
          error={error?.flow}
        >
          <option value="projeto">Sei lá</option>
          {/* <option value="contrato">Contrato</option> */}
        </SelectDefault>
      </FlexLine>
    </div>
  );
}
