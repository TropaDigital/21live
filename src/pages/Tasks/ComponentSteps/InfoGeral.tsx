/* eslint-disable react-hooks/exhaustive-deps */
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
import { useFetch } from '../../../hooks/useFetch';

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
  handleTemplate: (value: any) => void;
  handleSelectProject: (value: any, name: string) => void;
  handleSelectTypeOfProduct: (value: any) => void;
  handleProductId: (value: any) => void;
  productsFromProject?: any[];
  showProductSelect: boolean;
  // ticketAsk: string | null;
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

interface TemplateProps {
  task_template_id: string;
  title: string;
  description: string;
  tenant_id: string;
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
  handleTemplate,
  handleSelectProject,
  handleSelectTypeOfProduct,
  handleProductId,
  showProductSelect,
  productsFromProject
}: // ticketAsk
Props) {
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
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateProps>();
  const { data: dataTemplates } = useFetch<TemplateProps[]>(`/task/template`);
  const [selectedProductType, setSelectedProductType] = useState();

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
      if (tenantId) {
        const response = await api.get(`/task/requester/${tenantId}`);
        if (response.data.result.length > 0) {
          setRequestersList(response.data.result);
        }
      }
    } catch (error) {
      console.log('log do get requesters', error);
    }
  }

  const handleSelectTemplate = (id: any) => {
    const filteredTemplate = dataTemplates?.filter((obj) => obj.task_template_id === id);

    if (filteredTemplate) {
      setSelectedTemplate(filteredTemplate[0]);
    }
  };

  const handleTypeProduct = (value: any) => {
    console.log('log do value =>', value);
    setSelectedProductType(value);
    if (value.includes('Quantidade')) {
      handleSelectTypeOfProduct('quantity');
    } else {
      handleSelectTypeOfProduct('hours');
      handleProductId(value);
    }
    // if (value.includes('Horas')) {
    // }
  };

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

    getRequesters(data.tenant_id);
  }, [data, clients, organizations]);

  useEffect(() => {
    if (selectedTemplate) {
      handleTemplate(selectedTemplate.description);
    }
    // setTimeout(() => {
    //   setSelectedTemplate({
    //     description: '',
    //     task_template_id: '',
    //     tenant_id: '',
    //     title: ''
    //   });
    // }, 1000);
  }, [selectedTemplate]);

  useEffect(() => {
    console.log('log productSelect =>', productsFromProject);
  }, [productsFromProject]);

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
          name="project_id"
          value={data.project_id}
          onChange={(e: any) => handleSelectProject(e, 'project_id')}
          // error={error?.project_product_id}
        >
          {projectList?.map((row: any) => (
            <option key={row.project_id} value={row.project_id}>
              {row.title}
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
        {/* {ticketAsk !== 'never' && (
        )} */}
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

        {data.gen_ticket === 'true' && (
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

      <FlexLine>
        <SelectDefault
          label="Templates de pauta"
          name="template"
          value={selectedTemplate?.task_template_id}
          onChange={(e: any) => handleSelectTemplate(e.target.value)}
        >
          {dataTemplates?.map((row) => (
            <option key={row.task_template_id} value={row.task_template_id}>
              {row.title}
            </option>
          ))}
        </SelectDefault>

        <div style={{ flex: '1' }}>
          {showProductSelect && (
            <SelectDefault
              label="Tipo do produto dentro do contrato"
              name="product_type"
              value={selectedProductType || data?.project_product_id}
              onChange={(e: any) => handleTypeProduct(e.target.value)}
              error={error?.project_product_id}
            >
              {productsFromProject?.map((row) => (
                <option
                  key={row?.name ? row.project_product_id : row}
                  value={row?.name ? row.project_product_id : row}
                >
                  {row?.name ? row?.name : row}
                </option>
              ))}
            </SelectDefault>
          )}
        </div>
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
