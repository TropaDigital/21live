import { useEffect } from 'react';

import ButtonDefault from '../../../../components/Buttons/ButtonDefault';

import {
  Summary,
  SummaryButtons,
  SummaryCard,
  SummaryCardSubtitle,
  SummaryCardTitle,
  SummaryInfoWrapper,
  SummaryTaskDescription,
  SummaryTaskInfo,
  SummaryTasksAbout,
  SummaryWrapper
} from './styles';

interface TasksProps {
  createTasks: () => void;
  editTasks: () => void;
  selectedProducts: any;
  taskSummary: any;
  projectInfos: any;
  taskType: any;
}

export default function SummaryTasks({
  selectedProducts,
  editTasks,
  createTasks,
  taskSummary,
  projectInfos,
  taskType
}: TasksProps) {
  useEffect(() => {
    console.log('log tasks infos on summary', taskSummary);
  }, [taskSummary]);

  return (
    <SummaryWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Summary className="big">
          <div className="title">Informações da tarefa</div>

          <SummaryInfoWrapper>
            <SummaryTaskInfo>
              <div className="title-info">Título da tarefa:</div>
              <div className="info">{taskSummary?.title}</div>
            </SummaryTaskInfo>

            <SummaryTaskInfo>
              <div className="title-info">Cliente:</div>
              <div className="info">Dado genérico</div>
            </SummaryTaskInfo>

            <SummaryTaskInfo>
              <div className="title-info">Projeto/Contrato:</div>
              <div className="info">
                {projectInfos.produto} - {projectInfos.projeto} - {projectInfos.quantidade}
              </div>
            </SummaryTaskInfo>

            <SummaryTaskInfo>
              <div className="title-info">Fluxo:</div>
              <div className="info">Dado genérico</div>
            </SummaryTaskInfo>

            <SummaryTaskDescription>
              <div className="description-title">Contexto geral</div>
              <div className="description-info">
                {taskSummary?.description.replace('<p>', '').replace('</p>', '')}
              </div>
            </SummaryTaskDescription>
          </SummaryInfoWrapper>
        </Summary>
        {taskType !== 'livre' && (
          <Summary className="big">
            <div className="title">Produtos selecionados</div>
            {selectedProducts.map((row: any, index: number) => (
              <SummaryCard key={index}>
                <SummaryCardTitle>
                  #{index + 1} - {row.service}
                </SummaryCardTitle>
                <SummaryCardSubtitle>
                  <div className="description-wrap">
                    Descrição: <span>{row.description}</span>
                  </div>
                  <div>
                    Tipo: <span>{row.category}</span>
                  </div>
                  <div>
                    I/D: <span>{row.type}</span>
                  </div>
                  <div>
                    Formato: <span>{row.size}</span>
                  </div>
                </SummaryCardSubtitle>
              </SummaryCard>
            ))}
          </Summary>
        )}
      </div>

      <SummaryTasksAbout>
        <div className="title">Sobre a tarefa</div>
        <div className="item-hours">
          Total de itens: <span>{selectedProducts.length}</span>
        </div>
        <div className="item-hours">
          Horas estimadas <span>04:00:00</span>
        </div>
        <SummaryButtons>
          <ButtonDefault typeButton="primary" isOutline onClick={() => editTasks()}>
            Editar tarefa
          </ButtonDefault>
          <ButtonDefault onClick={() => createTasks()}>Criar tarefa</ButtonDefault>
        </SummaryButtons>
      </SummaryTasksAbout>
    </SummaryWrapper>
  );
}
