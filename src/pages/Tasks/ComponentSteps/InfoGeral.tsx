/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Utils
import { TenantProps } from '../../../utils/models';
import { OrganizationsProps } from '../../../types';

// Components
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { FlexLine } from '../../Projects/ComponentSteps/styles';
import SelectImage from '../../../components/Inputs/SelectWithImage';

// Services
import api from '../../../services/api';

// Hooks
import { useAuth } from '../../../hooks/AuthContext';

// Styles
import { CreateTicketOption } from './styles';

// Libraries
import Switch from 'react-switch';

interface FormProps {
  [key: string]: any;
}

interface Props {
  data: any;
  dataProjects: any;
  dataFlow: any;
  handleInputChange: any;
  clients?: TenantProps[] | null;
  organizations?: OrganizationsProps[] | null;
  error: FormProps;
  handleTicket: (value: any) => void;
  ticketAsk: string | null;
}

interface FlowProps {
  flow_id: string;
  tenant_id: string;
  name: string;
  steps: string;
  user_id: string;
}

interface RequesterProps {
  user_id: string;
  name: string;
  username: string;
}

export default function InfoGeral({
  data,
  dataProjects,
  dataFlow,
  handleInputChange,
  clients,
  organizations,
  error,
  handleTicket,
  ticketAsk
}: Props) {
  const { user } = useAuth();
  // const { addToast } = useToast();
  const [initialValue, setInitialValue] = useState({
    value: '',
    label: '',
    image: '',
    color: ''
  });
  const [requestersList, setRequestersList] = useState<RequesterProps[]>([]);
  const [projectList, setProjectList] = useState<any[]>([]);

  // const handleGetFlowTask = async (id: any) => {
  //   try {
  //     const responseFlow = await api.get(`/task-next?flow=${id}`);
  //     // setFlowManagers(responseFlow.data.result);
  //     if (responseFlow.data.result.length === 0) {
  //       addToast({
  //         title: 'Atenção',
  //         description: 'Escolha um fluxo com algum responsável pelo cargo',
  //         type: 'warning'
  //       });
  //     }
  //   } catch (error: any) {
  //     console.log('log do error', error);
  //   }
  // };

  const clientsOptions = clients?.map((row) => {
    return {
      value: row.tenant_id,
      label: row.name,
      image: row.bucket,
      color: row.colormain
    };
  });

  const handleClientSelected = (select: any) => {
    const selectOptions = {
      name: 'tenant_id',
      infos: select
    };

    handleInputChange(selectOptions);
  };

  async function getRequesters(tenantId: string) {
    try {
      const response = await api.get(`/task/requester/${tenantId}`);
      if (response.data.result.length > 0) {
        setRequestersList(response.data.result);
      }
    } catch (error) {
      console.log('log do get requesters', error);
    }
  }

  useEffect(() => {
    if (dataProjects) {
      setProjectList(dataProjects);
    }
  }, [dataProjects]);

  useEffect(() => {
    const defaultValue = clients && clients.filter((obj) => obj.tenant_id === data.tenant_id);
    if (data.tenant_id !== '' && organizations === undefined) {
      setInitialValue({
        value: defaultValue !== undefined && defaultValue !== null ? defaultValue[0].tenant_id : '',
        label: defaultValue !== undefined && defaultValue !== null ? defaultValue[0].name : '',
        image: defaultValue !== undefined && defaultValue !== null ? defaultValue[0].bucket : '',
        color: defaultValue !== undefined && defaultValue !== null ? defaultValue[0].colormain : ''
      });
    }

    const defaultOrganizationValue =
      organizations && organizations.filter((obj) => obj.tenant_id === data.tenant_id);
    if (data.tenant_id !== '' && organizations !== undefined) {
      setInitialValue({
        value:
          defaultOrganizationValue !== undefined && defaultOrganizationValue !== null
            ? defaultOrganizationValue[0].tenant_id
            : '',
        label:
          defaultOrganizationValue !== undefined && defaultOrganizationValue !== null
            ? defaultOrganizationValue[0].name
            : '',
        image:
          defaultOrganizationValue !== undefined && defaultOrganizationValue !== null
            ? defaultOrganizationValue[0].logo
            : '',
        color:
          defaultOrganizationValue !== undefined && defaultOrganizationValue !== null
            ? defaultOrganizationValue[0].logo
            : ''
      });
    }

    if (data.ticket_id !== '') {
      getRequesters(data.tenant_id);
    }
  }, [data, clients, organizations]);

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
          <div style={{ flex: '1' }}>
            <SelectImage
              label={'Cliente'}
              dataOptions={clientsOptions}
              value={initialValue.value !== '' ? initialValue : null}
              onChange={handleClientSelected}
              placeholder={'Selecione o cliente...'}
              error={error?.tenant_id}
            />
          </div>
        )}

        {user?.organizations?.length > 0 && (
          // <div style={{ flex: '1' }}>
          //   <SelectImage
          //     label={'Cliente'}
          //     dataOptions={organizations}
          //     value={initialValue.value !== '' ? initialValue : null}
          //     onChange={handleClientSelected}
          //     placeholder={'Selecione o cliente...'}
          //     error={error?.tenant_id}
          //   />
          // </div>
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
          name="project_product_id"
          value={data.project_product_id}
          onChange={handleInputChange}
          error={error?.project_product_id}
        >
          {projectList?.map((row: any) => (
            <option key={row.project_product_id} value={row.project_product_id}>
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

      <FlexLine>
        <CreateTicketOption>
          <Switch
            onChange={handleTicket}
            checked={data.gen_ticket === 'true' ? true : false}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#0046B5"
            className="switch-ticket"
          />
          <div>Gerar ticket</div>
        </CreateTicketOption>
        {requestersList.length > 0 && data.gen_ticket === 'true' && data.ticket_id !== '' && (
          <div style={{ flex: '1' }}>
            <SelectDefault
              label="Solicitante"
              name="requester_id"
              value={data.requester_id}
              onChange={handleInputChange}
              error={error?.requester_id}
            >
              {requestersList?.map((row) => (
                <option key={row.user_id} value={row.user_id}>
                  {row.name}
                </option>
              ))}
            </SelectDefault>
          </div>
        )}
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
