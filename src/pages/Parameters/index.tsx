/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useState, useEffect } from 'react';

// Components
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import { ContainerDefault } from '../../components/UiElements/styles';
import Loader from '../../components/LoaderSpin';
import ButtonDefault from '../../components/Buttons/ButtonDefault';

// Styles
import { FieldsLine, ParametersTitle, ParametersWrapper, SaveButtons } from './styles';

// Services
import api from '../../services/api';

// Hooks
import { useToast } from '../../hooks/toast';

// Interfaces
interface InputParametersProps {
  input_name: string;
}

interface PercentParams {
  task_type: string;
  percent: string;
}

export default function Parameters() {
  const { addToast } = useToast();
  const [dataPercents, setDataPercents] = useState<PercentParams[]>([]);
  const [DTOInput, setDTOInput] = useState<InputParametersProps>({
    input_name: ''
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function getInputConfigs() {
    try {
      setLoading(true);

      const response = await api.get('/config/input');
      // console.log('log do response get input config =>', response.data.result);
      setDTOInput(response.data.result);

      setLoading(false);
    } catch (error) {
      console.log('log error get input config', error);
      setLoading(false);
    }
  }

  async function getPercents() {
    try {
      setLoading(true);

      const response = await api.get(`/config/percents`);

      setDataPercents([
        {
          task_type: '2',
          percent: response.data.result[0]?.Desmembramento?.percent
        },
        {
          task_type: '3',
          percent: response.data.result[0]?.Alteracao?.percent
        }
      ]);

      setLoading(false);
    } catch (error: any) {
      console.log('log error get percents params', error);
      setLoading(false);
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'input_name') {
      setDTOInput({ ...DTOInput, [name]: value });
    }

    if (name === 'dismemberment') {
      setDataPercents((current: PercentParams[]) =>
        current.map((obj) => {
          if (obj.task_type === '2') {
            return { ...obj, percent: value };
          }
          return obj;
        })
      );
    }

    if (name === 'change') {
      setDataPercents((current: PercentParams[]) =>
        current.map((obj) => {
          if (obj.task_type === '3') {
            return { ...obj, percent: value };
          }
          return obj;
        })
      );
    }
  };

  useEffect(() => {
    getInputConfigs();
    getPercents();
  }, []);

  async function handleSubmitInput() {
    try {
      setLoading(true);

      const response = await api.post('/config/input', DTOInput);

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

  async function handleSubmitPercents() {
    try {
      setLoading(true);

      const response = await api.post('/config/percents', dataPercents);

      if (response.data.status === 'success') {
        getPercents();

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
        <>
          {/* Input params */}
          <ParametersWrapper>
            <ParametersTitle>Input</ParametersTitle>
            <FieldsLine>
              <InputDefault
                label="Nome do input (Tela 'Entregáveis' ao criar tarefa)"
                name="input_name"
                placeholder="Digite aqui..."
                onChange={handleChange}
                value={DTOInput.input_name}
              />
            </FieldsLine>

            <SaveButtons>
              <ButtonDefault typeButton="lightWhite" isOutline onClick={getInputConfigs}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={handleSubmitInput}>
                Salvar
              </ButtonDefault>
            </SaveButtons>
          </ParametersWrapper>

          {/* Percents params */}
          <ParametersWrapper>
            <ParametersTitle>Porcentagens para os tipos</ParametersTitle>

            <FieldsLine>
              <InputDefault
                label="Criação do zero"
                name="creation"
                disabled={true}
                onChange={() => ''}
                defaultValue={'100%'}
              />
            </FieldsLine>

            <FieldsLine>
              <InputDefault
                label="Desmembramento em %"
                name="dismemberment"
                placeholder="Digite o valor..."
                onChange={handleChange}
                value={dataPercents[0]?.percent}
              />

              <InputDefault
                label="Alteração em %"
                name="change"
                placeholder="Digite o valor..."
                onChange={handleChange}
                value={dataPercents[1]?.percent}
              />
            </FieldsLine>

            <SaveButtons>
              <ButtonDefault typeButton="lightWhite" isOutline onClick={getInputConfigs}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={handleSubmitPercents}>
                Salvar
              </ButtonDefault>
            </SaveButtons>
          </ParametersWrapper>
        </>
      )}
    </ContainerDefault>
  );
}
