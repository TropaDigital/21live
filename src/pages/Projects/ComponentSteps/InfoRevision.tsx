import React from 'react'
import { FieldDefault } from '../../../components/UiElements/styles'
import { InputDefault } from '../../../components/Inputs/InputDefault'
import { SelectDefault } from '../../../components/Inputs/SelectDefault'

export default function InfoRevision() {
  return (
    <div>
     <FieldDefault style={{marginBottom: '14px'}}>
        <InputDefault 
          label='Nome'
          name='nome'
        />
      </FieldDefault>

      <FieldDefault style={{marginBottom: '14px'}}>
        <InputDefault 
          label='Cliente'
          name='cliente'
          required
        />
      </FieldDefault>

      <FieldDefault style={{marginBottom: '14px'}}>
        <SelectDefault
          label='Quadro'
          name='quadro'
        >
          <option value={'0'}>{'row.name'}</option>
        </SelectDefault>
      </FieldDefault>

      <FieldDefault style={{marginBottom: '14px'}}>
        <InputDefault 
          label='Tipo'
          name='tipo'
        />
      </FieldDefault>
    </div>
  )
}
