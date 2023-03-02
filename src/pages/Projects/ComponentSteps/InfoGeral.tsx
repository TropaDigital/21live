import React from 'react'
import { FieldDefault, FieldGroupFormDefault } from '../../../components/UiElements/styles'
import { InputDefault } from '../../../components/Inputs/InputDefault'
import { SelectDefault } from '../../../components/Inputs/SelectDefault'
import { BiCalendar } from 'react-icons/bi'
import { TenantProps } from '../../../utils/models'

interface Props {
  data: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  clients: TenantProps[] | null
}

export default function InfoGeral({data, handleInputChange, clients}: Props) {
  return (
    <div>
      <FieldDefault style={{marginBottom: '14px'}}>
        <InputDefault 
          label='Titulo do Projeto/Contrato'
          placeholder='Nome do projeto'
          name="title"
          value={data.title}
          onChange={handleInputChange}
        />
      </FieldDefault>

      <FieldDefault style={{marginBottom: '14px'}}>
        <SelectDefault
          label='Cliente'
          name='tenant_id'
          value={data.tenant_id}
          onChange={handleInputChange}
        >
          {clients?.map((row) => (
            <option key={row.tenant_id} value={row.tenant_id}>{row.name}</option>
          ))}
        </SelectDefault>
      </FieldDefault>

      <FieldDefault style={{marginBottom: '14px'}}>
        <SelectDefault
          label='Fee ou Spot'
          name='contract_type'
          value={data.contract_type}
          onChange={handleInputChange}
        >
          <option value='fee'>Fee</option>
          <option value='spot'>Spot</option>
        </SelectDefault>
      </FieldDefault>

      <FieldGroupFormDefault>
        <FieldDefault style={{marginBottom: '14px'}}>
          <InputDefault 
            label='Data inicial'
            name='date_start'
            type='date'
            icon={BiCalendar}
            value={data.date_start}
            onChange={handleInputChange}
          />
        </FieldDefault>

        <FieldDefault style={{marginBottom: '14px'}}>
          <InputDefault 
            label='Data final'
            name='date_end'
            type='date'
            icon={BiCalendar}
            value={data.date_end}
            onChange={handleInputChange}
          />
        </FieldDefault>
      </FieldGroupFormDefault>

      {/* <fieldset>
        <legend>Ações</legend>

        <FieldGroup style={{ marginTop: '10px' }}>
          <FieldDefault>
            <CheckboxDefault
              label="Por Produtos"
              name="forProducts"
              checked={data.forProducts}
              onChange={handleOnChangeCheckbox}
            />
          </FieldDefault>

          <FieldDefault>
            <CheckboxDefault
              label="Por Descrição"
              name="forDescriptions"
              checked={data.forDescriptions}
              onChange={handleOnChangeCheckbox}
            />
          </FieldDefault>
        </FieldGroup>
      </fieldset> */}

    </div>
  )
}
