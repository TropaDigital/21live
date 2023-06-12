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
  summaryExtrainfos: any;
  taskType: any;
}

export default function SummaryTasks({
  selectedProducts,
  editTasks,
  createTasks,
  taskSummary,
  projectInfos,
  summaryExtrainfos,
  taskType
}: TasksProps) {
  useEffect(() => {
    console.log('log tasks infos on summary', taskSummary);
    console.log('log tasks infos on project', projectInfos);
    console.log('log extra infos for summary tasks', summaryExtrainfos);
  }, [taskSummary, projectInfos, summaryExtrainfos]);

  const deadlineLength = taskSummary.deadlines.map((row: any) => {
    return row.deliveryProducts.length;
  });

  const deadlineTotal = deadlineLength.reduce((partialSum: any, acc: any) => partialSum + acc, 0);

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
              <div className="info">{summaryExtrainfos?.client.name}</div>
            </SummaryTaskInfo>

            <SummaryTaskInfo>
              <div className="title-info">Projeto/Contrato:</div>
              <div className="info">
                {projectInfos.categoria} - {projectInfos.quantidade}
              </div>
            </SummaryTaskInfo>

            <SummaryTaskInfo>
              <div className="title-info">Fluxo:</div>
              <div className="info">{summaryExtrainfos?.flow.name}</div>
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
              <SummaryCard key={index} style={{ height: 'fit-content' }}>
                <SummaryCardTitle>
                  #{index + 1} - {row.service}
                </SummaryCardTitle>
                <SummaryCardSubtitle
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'fit-content'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <div className="description-wrap">
                      Descrição: <span>{row.description}</span>
                    </div>
                    <div>
                      Tipo: <span>{row.category}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%'
                    }}
                  >
                    <div>
                      I/D: <span>{row.type}</span>
                    </div>
                    <div>
                      Formato: <span>{row.size}</span>
                    </div>
                  </div>
                </SummaryCardSubtitle>
              </SummaryCard>
            ))}
            {taskSummary?.deadlines.map((row: any, index: number) =>
              row.deliveryProducts.map((product: any) => (
                <SummaryCard key={index} style={{ height: 'fit-content' }}>
                  <SummaryCardTitle>
                    #{index + 1} - {product.service}
                  </SummaryCardTitle>
                  <SummaryCardSubtitle
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'fit-content'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      <div className="description-wrap">
                        Descrição: <span>{product.description}</span>
                      </div>
                      <div>
                        Tipo: <span>{product.category}</span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}
                    >
                      <div>
                        I/D: <span>{product.type}</span>
                      </div>
                      <div>
                        Formato: <span>{product.size}</span>
                      </div>
                    </div>
                  </SummaryCardSubtitle>
                </SummaryCard>
              ))
            )}
          </Summary>
        )}
      </div>

      <SummaryTasksAbout>
        <div className="title">Sobre a tarefa</div>
        <div className="item-hours">
          Total de itens: <span>{selectedProducts.length + deadlineTotal}</span>
        </div>
        <div className="item-hours">
          Horas estimadas <span>{projectInfos.tempo}</span>
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
