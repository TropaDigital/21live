import { useState } from 'react'
import HeaderPage from '../../../components/HeaderPage';

import { Container, HeaderEditPlus, ContentEditFluxo } from './styled';
import { useParams } from 'react-router-dom';
import CardFluxo from '../../../components/Ui/CardFluxo';
import useLocalStorage from '../../../hooks/useLocalStorage';
import useColumn from '../../../hooks/useColumn';

export default function EditFluxo() {
  let { id } = useParams();
  const { addColumn, updateColumn, deleteColumn, column } = useColumn();

  console.log('COLUMN =>', column)

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
    flow_id: 1,
    user_id: '15852',
    name: 'UPDATE COLUNA',
    email_alert: false,
    necessary_upload: false,
    step: 1,
    next_step: 2,
    previous_step: 0,
  };

  // console.log('COLUMN', column)

  return (
    <Container>
      <HeaderPage title="Fluxos" />

      <HeaderEditPlus>
        <h1 className='titleEditFluxo'>Fase do fluxo <span>Campanha</span></h1>
        <h3 className='subTitleEditFluxo'>Adicione ou remova etapas do seu fluxo.</h3>

        <div className="actionsbuttons" style={styleDiv}>
          <button style={stylebutton} onClick={handleOnClick}>CREATE COLUMN</button>
          <button style={stylebutton} onClick={updateColumn}>UPDATE COLUMN</button>
          <button style={stylebutton} onClick={deleteColumn}>DELETE COLUMN</button>

        </div>
      </HeaderEditPlus>

      <ContentEditFluxo>

        {column.map((row: any, index: any) => (
          <CardFluxo
            key={row.id}
            data={row}
            index={index}
            isLastItem={lengthCard === index + 1}
            handleOnClick={handleOnClick}
            handleOnUpdate={() => updateColumn(update)}
            handleOnDelete={() => deleteColumn(row.card_id)}
          />
        ))}

      </ContentEditFluxo>
      
    </Container>
  )
}
