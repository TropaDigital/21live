/* eslint-disable import-helpers/order-imports */
// React
import React, { useEffect, useState } from 'react';

// Icons
import { BiCalendar } from 'react-icons/bi';

// Utils
import { TenantProps } from '../../../utils/models';
import { OrganizationsProps } from '../../../types';

// Components
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import SelectImage from '../../../components/Inputs/SelectWithImage';

// Styles
import { FlexLine } from './styles';

// Hooks
import { useAuth } from '../../../hooks/AuthContext';

interface FormProps {
  [key: string]: any;
}

interface Props {
  data: any;
  handleInputChange: any;
  clients?: TenantProps[] | null;
  organizations?: OrganizationsProps[] | null;
  editProject: boolean;
  error: FormProps;
}

export default function InfoGeral({
  data,
  handleInputChange,
  clients,
  organizations,
  editProject,
  error
}: Props) {
  const { user } = useAuth();

  const [initialValue, setInitialValue] = useState({
    value: '',
    label: '',
    image: '',
    color: ''
  });

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

    // const defaultOrganizationValue =
    //   organizations && organizations.filter((obj) => obj.tenant_id === data.tenant_id);
    // if (data.tenant_id !== '' && organizations !== undefined) {
    //   setInitialValue({
    //     value:
    //       defaultOrganizationValue !== undefined && defaultOrganizationValue !== null
    //         ? defaultOrganizationValue[0].tenant_id
    //         : '',
    //     label:
    //       defaultOrganizationValue !== undefined && defaultOrganizationValue !== null
    //         ? defaultOrganizationValue[0].name
    //         : '',
    //     image:
    //       defaultOrganizationValue !== undefined && defaultOrganizationValue !== null
    //         ? defaultOrganizationValue[0].logo
    //         : '',
    //     color:
    //       defaultOrganizationValue !== undefined && defaultOrganizationValue !== null
    //         ? defaultOrganizationValue[0].logo
    //         : ''
    //   });
    // }
  }, [data, clients, organizations]);

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
          // <SelectDefault
          //   label="Cliente"
          //   name="tenant_id"
          //   value={data.tenant_id}
          //   onChange={handleInputChange}
          //   disabled={editProject}
          //   error={error?.tenant_id}
          // >
          //   {clients?.map((row) => (
          //     <option key={row.tenant_id} value={row.tenant_id}>
          //       {row.name}
          //     </option>
          //   ))}
          // </SelectDefault>
        )}

        {user?.organizations?.length > 0 && (
          <SelectDefault
            label="Cliente"
            name="organization_id"
            value={data.organization_id}
            onChange={handleInputChange}
            disabled={editProject}
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
          disabled={editProject}
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
          disabled={editProject}
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
          max={'9999-12-31'}
          icon={BiCalendar}
          value={data.date_start}
          onChange={handleInputChange}
          disabled={editProject}
          error={error?.date_start}
        />

        <InputDefault
          label="Data final"
          name="date_end"
          type="date"
          max={'9999-12-31'}
          icon={BiCalendar}
          value={data.date_end}
          onChange={handleInputChange}
          disabled={editProject}
          error={error?.date_end}
        />
      </FlexLine>
    </div>
  );
}
