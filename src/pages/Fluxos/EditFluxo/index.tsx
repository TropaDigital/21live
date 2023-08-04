/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BiSave, BiShow } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

import api from '../../../services/api';

import { useAuth } from '../../../hooks/AuthContext';
import { useToast } from '../../../hooks/toast';
import useColumn from '../../../hooks/useColumn';
import { useFetch } from '../../../hooks/useFetch';
import useLocalStorage from '../../../hooks/useLocalStorage';

import { ColumnModel } from '../../../utils/models';

import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import HeaderPage from '../../../components/HeaderPage';
import CardFluxo from '../../../components/Ui/CardFluxo';
import { SectionDefault } from '../../../components/UiElements/styles';

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

  const { data: dataTeam } = useFetch<OfficeProps[]>(`function`);
  // const { data: dataTeam } = useFetch<UserProps[]>(`team?page=${1}&search=${''}`);
  const latesTeam = dataTeam?.slice(0, 8);

  const { data, isFetching } = useFetch<ColumnModel[]>(`card/${location.state.id}`);
  const { addColumn, moveObject, deleteColumn, updateParcialColumn, column, setColumn } =
    useColumn();
  const lengthCard = column.length;

  useEffect(() => {
    if (!isFetching) {
      setColumn(data);
    }
  }, [isFetching, data]);

  async function saveFluxo() {
    try {
      const response = await api.post('/card', column);
      setState(response.data.result);
      setColumn(response.data.result);

      addToast({
        title: 'Sucesso',
        description: 'Fluxos salvos com sucesso!',
        type: 'success'
      });
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
          {/* <ButtonDefault
            typeButton="info"
            onClick={() =>
              navigate(`/projeto/${location.state.name.replaceAll(' ', '_')}`, {
                state: { id: location.state.id, name: location.state.name }
              })
            }
          >
            <BiShow />
            Visualizar
          </ButtonDefault> */}
          <ButtonDefault typeButton="success" onClick={saveFluxo}>
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
              onUpdate={(id, name, value) => updateParcialColumn(id, name, value)}
            />
          ))}
        </ContentEditFluxo>
      </SectionDefault>
    </Container>
  );
}
