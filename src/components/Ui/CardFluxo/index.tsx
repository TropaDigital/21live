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
import { useToast } from '../../../hooks/toast';

interface CardProps {
  isLastItem: boolean;
  handleOnClick: () => void;
  handleOnPosition: (index: any) => void;
  handleOnDelete: (id: any) => void;
  handleOnsave: () => void;
  onUpdate: (index: any, name: any, value: any) => void;
  index: any;
  length: number;
  data: any;
  columnStep: any;
  responseUser: any;
  errorField: any;
}

export default function CardFluxo({
  data,
  responseUser,
  length,
  isLastItem,
  handleOnClick,
  handleOnPosition,
  handleOnDelete,
  handleOnsave,
  onUpdate,
  index,
  errorField
}: CardProps) {
  const { addToast } = useToast();
  const [dataStatus, setDataStatus] = useState<any[]>([]);

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    onUpdate(index, name, value);
  };

  const handleOnChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (
      name === 'necessary_upload' &&
      checked &&
      data.tenant_approve === 'true' &&
      data.final_card === 'true'
    ) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Escolha entre upload obrigatório ou aprovação do cliente!'
      });
    } else if (
      name === 'tenant_approve' &&
      checked &&
      data.necessary_upload === 'true' &&
      data.final_card === 'true'
    ) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Escolha entre aprovação do cliente ou upload obrigatório!'
      });
    } else {
      onUpdate(index, name, String(checked));
    }
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
              handleSave={handleOnsave}
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
          value={data.name}
          onChange={handleOnChange}
        />

        <FieldDefault style={{ marginBottom: '12px' }}>
          <SelectDefault
            label="Responsável"
            name="function_id"
            placeHolder="Selecione o cargo"
            onChange={handleOnChange}
            value={data.function_id ?? ''}
            error={errorField?.includes(data.card_id) ? 'Selecione o responsável' : ''}
          >
            {responseUser?.map((row: any) => (
              <option key={Number(row.function_id)} value={row.function_id}>
                {row.function}
              </option>
            ))}
          </SelectDefault>
        </FieldDefault>

        {/* <FieldDefault style={{ marginBottom: '12px' }}>
          <SelectDefault
            label="Retorna para etapa"
            name="previous_step"
            placeHolder="Selecione a etapa"
            onChange={handleOnChange}
            value={data.previous_step}
            error={
              previousManager && data.previous_step === '0' ? 'Obrigatório etapa para retornar' : ''
            }
          >
            {columnStep.map((row: any, index: any) => (
              <option key={index} value={row.card_id}>
                {row.name}
              </option>
            ))}
          </SelectDefault>
        </FieldDefault> */}

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

          {/* <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Aprovação do gestor"
              name="manager_approve"
              onChange={handleOnChangeCheckbox}
              checked={data.manager_approve === 'true' ? true : false}
            />
          </FieldDefault> */}

          {/* {previousManager && (
            <FieldDefault style={{ marginBottom: '8px' }}>
              <SelectDefault
                label="Selecione quem irá aprovar"
                name="approver"
                placeHolder="Selecione..."
                onChange={handleOnChange}
                value={data.approver}
                // error={data.approver === '0' ? 'Escolha quem aprovará' : ''}
              >
                {responseUser?.map((row: any) => (
                  <option key={Number(row.function_id)} value={row.function_id}>
                    {row.function}
                  </option>
                ))}
              </SelectDefault>
            </FieldDefault>
          )} */}

          {/* <FieldDefault style={{ marginBottom: '8px' }}>
            <CheckboxDefault
              label="Responsável obrigatório"
              name="necessary_responsible"
              onChange={handleOnChangeCheckbox}
              checked={data.necessary_responsible === 'true' ? true : false}
            />
          </FieldDefault> */}
          {data.final_card !== 'true' && (
            <FieldDefault style={{ marginBottom: '8px' }}>
              <CheckboxDefault
                label="Aprovação do Cliente"
                name="tenant_approve"
                onChange={handleOnChangeCheckbox}
                checked={data.tenant_approve === 'true' ? true : false}
              />
            </FieldDefault>
          )}

          <FieldDefault style={{ marginBottom: '8px' }}>
            <SelectDefault
              label="Status para o cliente"
              name="ticket_status_id"
              placeHolder="Selecione o status"
              onChange={handleOnChange}
              value={data.ticket_status_id}
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
