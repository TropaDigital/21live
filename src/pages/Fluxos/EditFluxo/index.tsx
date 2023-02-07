import { useState } from 'react'
import HeaderPage from '../../../components/HeaderPage';

import { Container, HeaderEditPlus, ContentEditFluxo } from './styled';
import { useNavigate, useParams } from 'react-router-dom';
import CardFluxo from '../../../components/Ui/CardFluxo';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useColumn from '../../../hooks/useColumn';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { BiSave, BiShow } from 'react-icons/bi';

export default function EditFluxo() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [ state ] = useLocalStorage('COLUMN');
  const { addColumn, moveObject, deleteColumn, updateParcialColumn, column } = useColumn();
  const lengthCard = column.length

  const handleOnClick = () => {
    addColumn([0,1,2])
  }

  const styleDiv = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '20px'
  }

  const stylebutton = {
    color: '#fff',
    borderRadius: '4px',
    padding: '4px 6px',
    backgroundColor: 'Lightblue'
  }

  const update = {
    card_id: 1,
    flow_id: lengthCard + 1,
    user_id: '15852',
    name: 'NOVA COLUNA',
    email_alert: false,
    necessary_upload: false,
    step: 1,
    next_step: 2,
    previous_step: 0,
    tasks: []
  };

  return (
    <Container>
      <HeaderPage title="Fluxos">
        <>
          <ButtonDefault 
            typeButton="info" 
            onClick={() => {navigate(`/projeto/${id}`)
            }}>
              <BiShow />
              Visualizar
            </ButtonDefault>
          <ButtonDefault 
            typeButton='success'
            onClick={() => console.log('COLUMNS', state)}
          >
            <BiSave />
            Salvar
          </ButtonDefault>
        </>
      </HeaderPage>

      <HeaderEditPlus>
        <h1 className='titleEditFluxo'>Fase do fluxo <span>{id}</span></h1>
        <h3 className='subTitleEditFluxo'>Adicione ou remova etapas do seu fluxo.</h3>

        <button onClick={addColumn}>
          CREATE
        </button>
      </HeaderEditPlus>

      <ContentEditFluxo>

        {column.map((row: any, index: any) => (
          <CardFluxo
            key={row.card_id}
            data={row}
            index={index}
            length={lengthCard}
            isLastItem={lengthCard === index + 1}
            handleOnClick={handleOnClick}
            handleOnPosition={(newIndex) => moveObject(newIndex, index)}
            handleOnDelete={() => deleteColumn(row.card_id)}
            onUpdate={(id, name, value) => updateParcialColumn(id, name, value)}
          />
        ))}

      </ContentEditFluxo>
      
    </Container>
  )
}
