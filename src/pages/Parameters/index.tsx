/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useState, useEffect } from 'react';

// Components
import { border } from 'polished';
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import { ContainerDefault } from '../../components/UiElements/styles';
import useForm from '../../hooks/useForm';

// Styles
import { FieldsLine, ParametersWrapper, SaveButtons } from './styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Loader from '../../components/LoaderSpin';
import ButtonDefault from '../../components/Buttons/ButtonDefault';

// Interfaces
interface ParametersProps {
  input_name: string;
}

export default function Parameters() {
  const { addToast } = useToast();
  const { formData, setData, handleOnChange } = useForm({
    input_name: ''
  } as ParametersProps);
  const [loading, setLoading] = useState<boolean>(false);

  async function getInputConfigs() {
    try {
      setLoading(true);

      const response = await api.get('/config/input');
      console.log('log do response get input config =>', response.data.result);
      setData(response.data.result);

      setLoading(false);
    } catch (error) {
      console.log('log error get input config', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getInputConfigs();
  }, []);

  async function handleSubmit() {
    try {
      setLoading(true);

      const response = await api.post('/config/input', formData);

      if (response.data.status === 'success') {
        getInputConfigs();

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Parâmetros atualizados com sucesso!'
        });
      }

      setLoading(false);
    } catch (e: any) {
      if (e.response.data.result.length !== 0) {
        e.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });
      }
      setLoading(false);
    }
  }

  return (
    <ContainerDefault>
      <HeaderPage title="Parâmetros" subTitle="Escolha os nomes para os principais parâmetros" />

      {loading && <Loader />}

      {!loading && (
        <ParametersWrapper>
          <FieldsLine>
            <InputDefault
              label="Nome do input (Tela 'Entregáveis' ao criar tarefa)"
              name="input_name"
              placeholder="Digite aqui..."
              onChange={handleOnChange}
              value={formData.input_name}
            />
            {/* <InputDefault
              label="Nome do input"
              name="search"
              placeholder="Digite aqui..."
              onChange={() => ''}
              value={''}
            /> */}
          </FieldsLine>

          <SaveButtons>
            <ButtonDefault typeButton="lightWhite" isOutline onClick={getInputConfigs}>
              Cancelar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" onClick={handleSubmit}>
              Salvar
            </ButtonDefault>
          </SaveButtons>
        </ParametersWrapper>
      )}
    </ContainerDefault>
  );
}
