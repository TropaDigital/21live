import { useId, useState } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import { BiEditAlt, BiPlus, BiPlusCircle, BiXCircle } from "react-icons/bi";

import { SelectDefault } from "../../Inputs/SelectDefault";
import { CheckboxDefault } from "../../Inputs/CheckboxDefault";

import { 
  Container,
  HeaderCardFluxo,
  TitleCardFluxo,
  SectionButtonsHeaderFluxo,
  ButtonHeaderCardFluxo,
  FormCardFluxo,
} from "./styles";
import { FieldDefault } from "../../UiElements/styles";
import ButtonDefault from "../../Buttons/ButtonDefault";
import { IconArrowFluxo } from "../../assets/icons";
import useColumn from '../../../hooks/useColumn';
import ActionPopup from './actionPopup';

interface CardProps {
  isLastItem: boolean;
  handleOnClick: () => void;
  handleOnPosition: (index: any) => void;
  handleOnDelete: (id: any) => void;
  onUpdate: (index: any, name: any, value: any) => void;
  index: any;
  length: number;
  data: any;
}

export default function CardFluxo({ data, length, isLastItem, handleOnClick, handleOnPosition, handleOnDelete, onUpdate, index }: CardProps) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    onUpdate(index, name, value)
  }

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name} = event.target
    onUpdate(index, name, checked)
  }

  return (
    <Container>
      <HeaderCardFluxo>
        <SectionButtonsHeaderFluxo>
          <ActionPopup
            handleOnDelete={handleOnDelete}
            handleOnPosition={(index) => handleOnPosition(index)}
            index={index}
            length={length}
          />
        </SectionButtonsHeaderFluxo>
      </HeaderCardFluxo>

      <FormCardFluxo>
        <input 
          type="text" 
          name='name'
          className="inputCardFluxo"
          placeholder="Nome do fluxo..."
          defaultValue={data.name + "-" + String(index) ?? 'TITULO'}
          onChange={handleOnChange}
        />

        <FieldDefault style={{ marginBottom: '12px' }}>
          <SelectDefault
            label="Responsável"
            name="user_id"
            placeHolder="Selecione o cargo"
            onChange={handleOnChange}
            value={data.user_id}
          >
            <option value="1">Cargo 1</option>
            <option value="2">Cargo 2</option>
            <option value="3">Cargo 3</option>
          </SelectDefault>
        </FieldDefault>

        <FieldDefault style={{ marginBottom: '12px' }}>
          <SelectDefault
            label="Retorna para etapa"
            name="step"
            placeHolder="Selecione a etapa"
            onChange={handleOnChange}
            value={data.step}
          >
            <option value="1">Etapa 1</option>
            <option value="2">Etapa 2</option>
            <option value="3">Etapa 3</option>
          </SelectDefault>
        </FieldDefault>

        <fieldset>
          <legend>Ações</legend>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Alerta por E-mail"
              name="email_alert"
              onChange={handleOnChangeCheckbox}
              defaultChecked={data.email_alert}
            />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Upload obrigatório"
              name="necessary_upload"
              onChange={handleOnChangeCheckbox}
              defaultChecked={data.necessary_upload}
            />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Responsavel obrigatório"
              name="responsable"
              onChange={handleOnChangeCheckbox}
              defaultChecked={data.responsable}
            />
          </FieldDefault>
        </fieldset>

      </FormCardFluxo>

      {isLastItem && (
        <ButtonDefault 
          className="buttonCardFluxo" 
          style={{ borderRadius: '50%', width: '32px', height: '32px', padding: '0px' }}
          onClick={handleOnClick}
        >
          <BiPlus color="#fff" />
        </ButtonDefault>
      )}

      {!isLastItem && (
        <div className="arrowCardFluxo">
          <IconArrowFluxo />
        </div>
      )}

    </Container>
  )
}
