/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Icons
import { BiSave, BiShow } from 'react-icons/bi';

// Services
import api from '../../../services/api';

// Hooks
import { useAuth } from '../../../hooks/AuthContext';
import { useToast } from '../../../hooks/toast';
import useColumn from '../../../hooks/useColumn';
import { useFetch } from '../../../hooks/useFetch';
import useLocalStorage from '../../../hooks/useLocalStorage';

// Utils
import { ColumnModel } from '../../../utils/models';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import HeaderPage from '../../../components/HeaderPage';
import CardFluxo from '../../../components/Ui/CardFluxo';
import { SectionDefault } from '../../../components/UiElements/styles';
import ModalLoader from '../../../components/Ui/ModalLoader';

// Styles
import { Container, ContentEditFluxo, HeaderEditPlus } from './styled';

interface OfficeProps {
  function_id: number;
  tenant_id: number;
  function: string;
  description: string;
}

export default function EditFluxo() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useLocalStorage('COLUMN', []);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: dataTeam } = useFetch<OfficeProps[]>(`function`);
  // const { data: dataTeam } = useFetch<UserProps[]>(`team?page=${1}&search=${''}`);
  const latesTeam = dataTeam;

  const { data, isFetching } = useFetch<ColumnModel[]>(`card/${location.state.id}`);
  const { addColumn, moveObject, deleteColumn, updateParcialColumn, column, setColumn } =
    useColumn();
  const lengthCard = column.length;
  const [errorMissingResponsible, setErrorMissingResponsible] = useState<any[]>([]);

  useEffect(() => {
    if (!isFetching) {
      setColumn(data);
    }
  }, [isFetching, data]);

  const checkCards = () => {
    try {
      column.map((row: any) => {
        if (row.function_id === '0' || row.function_id === 0) {
          setErrorMissingResponsible((prevState: any) => [...prevState, row.card_id]);
          throw new Error('Não é possível salvar um fluxo sem todos os responsáveis escolhidos');
        } else if (row.function_id !== '0') {
          setErrorMissingResponsible((prevState) =>
            prevState.filter((error) => error !== row.card_id)
          );
          // if (row.manager_approve === 'true' && row.previous_step === '0') {
          //   throw new Error('Não é possível salvar um fluxo sem escolher para qual etapa retornar');
          // }
        }
      });
      if (errorMissingResponsible.length <= 0) {
        saveFluxo();
      }
    } catch (error: any) {
      addToast({
        title: 'Atenção',
        description: error.message,
        type: 'warning'
      });
    }
  };

  async function saveFluxoAutomatic() {
    try {
      // setLoading(true);

      const response = await api.post('/card', column);
      setState(response.data.result);
      setColumn(response.data.result);
      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          description: 'Fluxo salvo com sucesso!',
          type: 'success'
        });
      }

      // setLoading(false);
    } catch (err: any) {
      console.log('ERR =>', err);
      if (err.response.data.result.length !== 0) {
        err.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: err.response.data.message,
          type: 'danger'
        });
      }

      // setLoading(false);
    }
  }

  async function saveFluxo() {
    try {
      setLoading(true);

      const response = await api.post('/card', column);
      setState(response.data.result);
      setColumn(response.data.result);
      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          description: 'Fluxo salvo com sucesso!',
          type: 'success'
        });
        navigate('/fluxo');
      }

      setLoading(false);
    } catch (err: any) {
      console.log('ERR =>', err);
      if (err.response.data.result.length !== 0) {
        err.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: err.response.data.message,
          type: 'danger'
        });
      }

      setLoading(false);
    }
  }

  async function deleteFluxo(id: any) {
    try {
      const response = await api.delete(`/card/${id}`);

      if (response.data.status === 'success') {
        deleteColumn(id);
      }

      addToast({
        title: 'Sucesso',
        description: 'Card deletado com sucesso!',
        type: 'success'
      });
    } catch (err: any) {
      console.log('ERR =>', err);

      addToast({
        title: 'Atenção',
        description: err.data.result,
        type: 'warning'
      });
    }
  }

  return (
    <Container>
      <HeaderPage title="Fluxos">
        <div
          style={{
            position: 'absolute',
            right: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <ButtonDefault
            typeButton="info"
            onClick={() =>
              navigate(`/fluxo/${location.state.id}`, {
                state: { id: location.state.id, name: location.state.name }
              })
            }
          >
            <BiShow />
            Visualizar
          </ButtonDefault>
          <ButtonDefault loading={loading} typeButton="success" onClick={checkCards}>
            <BiSave />
            Salvar
          </ButtonDefault>
        </div>
      </HeaderPage>

      <SectionDefault>
        <HeaderEditPlus>
          <h1 className="titleEditFluxo">
            Fase do fluxo <span>{location.state.name}</span>
          </h1>
          <h3 className="subTitleEditFluxo">Adicione ou remova etapas do seu fluxo.</h3>
        </HeaderEditPlus>

        <ContentEditFluxo>
          {column.map((row: any, index: any) => (
            <CardFluxo
              key={index}
              data={row}
              index={index}
              length={lengthCard}
              isLastItem={lengthCard === index + 1}
              columnStep={column.filter((obj: any) => obj.card_id !== row.card_id)}
              responseUser={latesTeam}
              handleOnClick={() => addColumn(user.user_id, location.state.id)}
              handleOnPosition={(newIndex) => moveObject(newIndex, index)}
              handleOnDelete={() => deleteFluxo(row.card_id)}
              handleOnsave={saveFluxoAutomatic}
              onUpdate={(id, name, value) => updateParcialColumn(id, name, value)}
              errorField={errorMissingResponsible}
            />
          ))}
        </ContentEditFluxo>

        {/* if (row.manager_approve === 'true') {
           return (
             <CardFluxo
               key={index}
               data={row}
               index={index}
               length={lengthCard}
               isLastItem={lengthCard === index + 1}
               columnStep={column.filter((obj: any) => obj.card_id !== row.card_id)}
               responseUser={latesTeam}
               handleOnClick={() => addColumn(user.user_id, location.state.id)}
               handleOnPosition={(newIndex) => moveObject(newIndex, index)}
               handleOnDelete={() => deleteFluxo(row.card_id)}
               handleOnsave={saveFluxo}
               onUpdate={(id, name, value) => updateParcialColumn(id, name, value)}
               errorField={errorMissingResponsible}
             />
           );
         } else {
           return (
             <CardFluxo
               key={index}
               data={row}
               index={index}
               length={lengthCard}
               isLastItem={lengthCard === index + 1}
               columnStep={column.filter((obj: any) => obj.card_id !== row.card_id)}
               responseUser={latesTeam}
               handleOnClick={() => addColumn(user.user_id, location.state.id)}
               handleOnPosition={(newIndex) => moveObject(newIndex, index)}
               handleOnDelete={() => deleteFluxo(row.card_id)}
               handleOnsave={saveFluxo}
               onUpdate={(id, name, value) => updateParcialColumn(id, name, value)}
               errorField={errorMissingResponsible}
             />
           );
         } */}
      </SectionDefault>

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading} />
    </Container>
  );
}
