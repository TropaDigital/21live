import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useColumn from '../../../hooks/useColumn';
import { useAuth } from '../../../hooks/AuthContext';
import { useFetch } from '../../../hooks/useFetch';
import { BiSave, BiShow } from 'react-icons/bi';

import HeaderPage from '../../../components/HeaderPage';
import CardFluxo from '../../../components/Ui/CardFluxo';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';

import { ColumnModel } from '../../../utils/models';
import api from '../../../services/api';

import { Container, HeaderEditPlus, ContentEditFluxo } from './styled';
import useLocalStorage from '../../../hooks/useLocalStorage';

export default function EditFluxo() {
  const { user } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const [ state, setState ] = useLocalStorage("COLUMN", [])
  
  const { data, isFetching } = useFetch<ColumnModel[]>(`card/${location.state.id}`);
  const { addColumn, moveObject, deleteColumn, updateParcialColumn, column, setColumn } = useColumn();
  const lengthCard = column.length

  useEffect(() => {
    if(!isFetching) {
      setColumn(data);
    }
    if(column.length < 1) {
      setColumn([{
        flow_id: String(location.state.id),
        card_id: String(column.length + 1),
        step: "0",
        next_step: "0",
        previous_step: "0",
        name: "Novo card",
        necessary_upload: "true",
        email_alert: "true",
        user_id: String(user.user_id),
        tasks: [],
      }])
    }
  }, [isFetching])

  async function saveFluxo() {
    try {
      const response = await api.post('/card', column)
      setState(column)
    } catch(err) {
      console.log('ERR =>', err)
    }
  }

  async function deleteFluxo(id: any) {
    try {
      const response = await api.delete(`/card/${id}`)
      deleteColumn(id)
    } catch(err) {
      console.log('ERR =>', err)
    }
  }

  return (
    <Container>
      <HeaderPage title="Fluxos">
        <>
          <ButtonDefault 
            typeButton="info" 
            onClick={() => {navigate(`/projeto/${location.state.id}`)
            }}>
              <BiShow />
              Visualizar
            </ButtonDefault>
          <ButtonDefault 
            typeButton='success'
            onClick={saveFluxo}
          >
            <BiSave />
            Salvar
          </ButtonDefault>
        </>
      </HeaderPage>

      <HeaderEditPlus>
        <h1 className='titleEditFluxo'>Fase do fluxo <span>{location.state.name}</span></h1>
        <h3 className='subTitleEditFluxo'>Adicione ou remova etapas do seu fluxo.</h3>
      </HeaderEditPlus>

      <ContentEditFluxo>
        {column.map((row: any, index: any) => (
          <CardFluxo
            key={row.card_id}
            data={row}
            index={index}
            length={lengthCard}
            isLastItem={lengthCard === index + 1}
            columnStep={column.filter((obj:any) => obj.card_id !== row.card_id)}
            handleOnClick={() => addColumn(user.user_id, location.state.id)}
            handleOnPosition={(newIndex) => moveObject(newIndex, index)}
            handleOnDelete={() => deleteFluxo(row.card_id)}
            onUpdate={(id, name, value) => updateParcialColumn(id, name, value)}
          />
        ))}
      </ContentEditFluxo>
    </Container>
  )
}
