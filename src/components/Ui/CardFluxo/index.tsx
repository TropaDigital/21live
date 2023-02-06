import { useState } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import { BiEditAlt, BiPlus } from "react-icons/bi";

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

interface CardProps {
  isLastItem: boolean;
  handleOnClick: () => void;
  handleOnUpdate: (item: any) => void;
  handleOnDelete: (id: any) => void;
  index: any;
  data: any;
}

export default function CardFluxo({ data, isLastItem, handleOnClick, handleOnUpdate, handleOnDelete, index }: CardProps) {
  const { updateParcialColumn } = useColumn();
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    console.log('TE', newTitle);

    updateParcialColumn(index, newTitle);
  }

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {id, checked} = event.target

    console.log(id, checked);

    // updateParcialColumn(index, newTitle);
  }

  return (
    <Container>
      <HeaderCardFluxo>
        <SectionButtonsHeaderFluxo>
          <ButtonHeaderCardFluxo
            onClick={handleOnUpdate}
          >
            <BiEditAlt color="#6C757D" />
          </ButtonHeaderCardFluxo>

          <ButtonHeaderCardFluxo
            onClick={handleOnDelete}
          >
            <FiMoreHorizontal color="#6C757D" />
          </ButtonHeaderCardFluxo>
        </SectionButtonsHeaderFluxo>
      </HeaderCardFluxo>

      <FormCardFluxo>
        <input 
          type="text" 
          name='title'
          className="inputCardFluxo"
          placeholder="Nome do fluxo..."
          defaultValue={data.name + "-" + String(index) ?? 'TITULO'}
          onChange={handleOnChange}
        />

        <FieldDefault style={{ marginBottom: '12px' }}>
          <SelectDefault
            label="Responsável"
            name="responsable"
            placeHolder="Selecione o cargo"
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
              name="email"
              onChange={handleOnChangeCheckbox}
            />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Upload obrigatório"
              name="upload"
              onChange={handleOnChangeCheckbox}
            />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Responsavel obrigatório"
              name="responsable"
              onChange={handleOnChangeCheckbox}
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
