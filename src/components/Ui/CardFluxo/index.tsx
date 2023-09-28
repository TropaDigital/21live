/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Icons
import { BiPlus } from 'react-icons/bi';

// Services
import api from '../../../services/api';
import { IconArrowFluxo } from '../../../assets/icons';

// Components
import ButtonDefault from '../../Buttons/ButtonDefault';
import { CheckboxDefault } from '../../Inputs/CheckboxDefault';
import { SelectDefault } from '../../Inputs/SelectDefault';
import { FieldDefault } from '../../UiElements/styles';
import ActionPopup from './actionPopup';

// Styles
import { Container, FormCardFluxo, HeaderCardFluxo, SectionButtonsHeaderFluxo } from './styles';

interface CardProps {
  isLastItem: boolean;
  handleOnClick: () => void;
  handleOnPosition: (index: any) => void;
  handleOnDelete: (id: any) => void;
  onUpdate: (index: any, name: any, value: any) => void;
  index: any;
  length: number;
  data: any;
  columnStep: any;
  responseUser: any;
}

export default function CardFluxo({
  data,
  responseUser,
  length,
  columnStep,
  isLastItem,
  handleOnClick,
  handleOnPosition,
  handleOnDelete,
  onUpdate,
  index
}: CardProps) {
  const [dataStatus, setDataStatus] = useState<any[]>([]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    onUpdate(index, name, value);
  };

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    onUpdate(index, name, String(checked));
  };

  useEffect(() => {
    const getDataTicketStatus = async () => {
      try {
        const response = await api.get(`ticket-status/${data?.tenant_id}`);
        setDataStatus(response.data.result);
      } catch (error: any) {
        console.log('log do error', error);
      }
    };

    getDataTicketStatus();
  }, []);

  return (
    <Container className={data.final_card === 'true' ? 'last' : ''}>
      <HeaderCardFluxo>
        <SectionButtonsHeaderFluxo>
          {data.final_card !== 'true' && (
            <ActionPopup
              handleOnDelete={handleOnDelete}
              handleOnPosition={(index) => handleOnPosition(index)}
              index={index}
              length={length}
            />
          )}
        </SectionButtonsHeaderFluxo>
      </HeaderCardFluxo>

      <FormCardFluxo>
        <input
          type="text"
          name="name"
          className="inputCardFluxo"
          placeholder="Nome do fluxo..."
          value={data.name.trim()}
          onChange={handleOnChange}
        />

        <FieldDefault style={{ marginBottom: '12px' }}>
          <SelectDefault
            label="Responsável"
            name="function_id"
            placeHolder="Selecione o cargo"
            onChange={handleOnChange}
            value={data.function_id ?? ''}
          >
            {responseUser?.map((row: any) => (
              <option key={Number(row.function_id)} value={row.function_id}>
                {row.function}
              </option>
            ))}
          </SelectDefault>
        </FieldDefault>

        <FieldDefault style={{ marginBottom: '12px' }}>
          <SelectDefault
            label="Retorna para etapa"
            name="previous_step"
            placeHolder="Selecione a etapa"
            onChange={handleOnChange}
            value={data.previous_step}
          >
            {columnStep.map((row: any, index: any) => (
              <option key={index} value={row.card_id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>
        </FieldDefault>

        <fieldset>
          <legend>Ações</legend>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Alerta por E-mail"
              name="email_alert"
              onChange={handleOnChangeCheckbox}
              checked={data.email_alert === 'true' ? true : false}
            />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Upload obrigatório"
              name="necessary_upload"
              onChange={handleOnChangeCheckbox}
              checked={data.necessary_upload === 'true' ? true : false}
            />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Responsavel obrigatório"
              name="necessary_responsible"
              onChange={handleOnChangeCheckbox}
              checked={data.necessary_responsible === 'true' ? true : false}
            />
          </FieldDefault>

          <FieldDefault style={{ marginBottom: '8px' }}>
            <SelectDefault
              label="Status para o cliente"
              name="ticket_status_id"
              placeHolder="Selecione o status"
              onChange={handleOnChange}
              value={data.status}
            >
              {dataStatus?.map((row: any, index: any) => (
                <option key={index} value={row.ticket_status_id}>
                  {row.name}
                </option>
              ))}
            </SelectDefault>
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
  );
}
