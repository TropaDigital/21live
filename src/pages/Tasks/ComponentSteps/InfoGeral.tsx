/* eslint-disable import-helpers/order-imports */
// React
import React from 'react';

// Utils
import { TenantProps } from '../../../utils/models';
import { OrganizationsProps } from '../../../types';

// Components
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { FlexLine } from '../../Projects/ComponentSteps/styles';

// Services
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/AuthContext';

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
  clients?: TenantProps[] | null;
  organizations?: OrganizationsProps[] | null;
  error: FormProps;
}

interface FlowProps {
  flow_id: string;
  tenant_id: string;
  name: string;
  steps: string;
  user_id: string;
}

// interface FlowRole {
//   function: string;
//   name: string;
//   user_id: string;
// }

export default function InfoGeral({
  data,
  dataProjects,
  dataFlow,
  handleInputChange,
  clients,
  organizations,
  error
}: Props) {
  const { user } = useAuth();
  const { addToast } = useToast();
  // Responsaveis pelo flow
  // const [flowsManagers, setFlowManagers] = useState<FlowRole[]>([]);
  const handleGetFlowTask = async (id: any) => {
    try {
      const responseFlow = await api.get(`/task-function?flow=${id}`);
      // setFlowManagers(responseFlow.data.result);
      if (responseFlow.data.result.length === 0) {
        addToast({
          title: 'Atenção',
          description: 'Escolha um fluxo com algum responsável pelo cargo',
          type: 'warning'
        });
      }
    } catch (error: any) {
      console.log('log do error', error);
    }
  };

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
        {!user?.organizations && (
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

        {user?.organizations?.length > 0 && (
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
          onChange={(e) => {
            handleInputChange(e);
            handleGetFlowTask(e.target.value);
          }}
          error={error?.flow_id}
        >
          {dataFlow?.map((row: FlowProps) => (
            <option key={row.flow_id} value={row.flow_id}>
              {row.name}
            </option>
          ))}
        </SelectDefault>
      </FlexLine>

      {/* Select responsável flow */}
      {/* {flowsManagers.length > 0 && (
        <FlexLine>
          <SelectDefault
            label="Fluxo - Responsável"
            name="user_id"
            value={data.user_id}
            onChange={(e) => handleInputChange(e)}
            error={error?.user_id}
          >
            {flowsManagers?.map((row: FlowRole) => (
              <option key={row.user_id} value={row.user_id}>
                {row.function} - {row.name}
              </option>
            ))}
          </SelectDefault>
          <div style={{ width: '48.5%' }}></div>
        </FlexLine>
      )} */}
    </div>
  );
}
