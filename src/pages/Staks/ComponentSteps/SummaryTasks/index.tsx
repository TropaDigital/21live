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
  updateTask: boolean;
}

export default function SummaryTasks({
  selectedProducts,
  editTasks,
  createTasks,
  taskSummary,
  projectInfos,
  summaryExtrainfos,
  taskType,
  updateTask
}: TasksProps) {
  // useEffect(() => {
  // console.log('log selected products on summary', selectedProducts);
  // console.log('log tasks infos on summary', taskSummary);
  // console.log('log tasks infos on project', projectInfos);
  // console.log('log extra infos for summary tasks', summaryExtrainfos);
  // }, [taskSummary, projectInfos, summaryExtrainfos, selectedProducts]);

  // const deadlineLength = taskSummary?.deadlines.products.map((row: any) => {
  //   return row.length;
  // });

  // const deadlineTotal = deadlineLength.reduce((partialSum: any, acc: any) => partialSum + acc, 0);

  const totalProducst = selectedProducts.reduce((accumulator: any, current: any) => {
    return accumulator + current.deliveryProducts.length;
  }, 0);

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
              {updateTask && <div className="info">{taskSummary?.tenant}</div>}
              {!updateTask && <div className="info">{summaryExtrainfos?.client.name}</div>}
            </SummaryTaskInfo>

            <SummaryTaskInfo>
              <div className="title-info">Projeto/Contrato:</div>
              {updateTask && (
                <div className="info">
                  {taskSummary?.project_category} | {taskSummary?.product_period}
                </div>
              )}
              {!updateTask && (
                <div className="info">
                  {projectInfos.categoria} | {projectInfos?.tempo?.split(':')[0]}H/
                  {projectInfos.categoria === 'fee' ? 'ANO' : 'MENSAL'}
                </div>
              )}
            </SummaryTaskInfo>

            <SummaryTaskInfo>
              <div className="title-info">Fluxo:</div>
              {updateTask && <div className="info">{taskSummary?.flow}</div>}
              {!updateTask && <div className="info">{summaryExtrainfos?.flow.name}</div>}
            </SummaryTaskInfo>

            <SummaryTaskDescription>
              <div className="description-title">Contexto geral</div>
              <div className="description-info">
                {taskSummary?.description.replace('<p>', '').replace('</p>', '')}
              </div>
            </SummaryTaskDescription>
          </SummaryInfoWrapper>
        </Summary>
        {taskType === 'horas' && (
          <Summary className="big">
            <div className="title">Produtos selecionados</div>
            {selectedProducts?.map((row: any) =>
              row.deliveryProducts.map((products: any, index: number) => (
                <SummaryCard key={index} style={{ height: 'fit-content' }}>
                  <SummaryCardTitle>
                    #{index + 1} - {products.service}
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
                        Descrição: <span>{products.description}</span>
                      </div>
                      <div>
                        Tipo: <span>{products.category}</span>
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
                        I/D: <span>{products.type}</span>
                      </div>
                      <div>
                        Formato: <span>{products.size}</span>
                      </div>
                    </div>
                  </SummaryCardSubtitle>
                </SummaryCard>
              ))
            )}
          </Summary>
        )}
        {taskType === 'produto' && (
          <Summary className="big">
            <div className="title">Produto selecionado</div>
            {selectedProducts?.map((row: any, index: number) => (
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
                    {updateTask ? (
                      <div>
                        Tipo:{' '}
                        <span>
                          {row.reason_change === '1'
                            ? 'Criação'
                            : row.reason_change === '2'
                            ? 'Desmembramento'
                            : row.reason_change === '3'
                            ? 'Alteração Interna'
                            : 'Alteração externa'}
                        </span>
                      </div>
                    ) : (
                      <div>
                        Tipo: <span>{row.category}</span>
                      </div>
                    )}
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
          </Summary>
        )}
      </div>

      <SummaryTasksAbout>
        <div className="title">Sobre a tarefa</div>
        {taskType !== 'horas' && (
          <div className="item-hours">
            {/* Total de itens: <span>{selectedProducts.length + deadlineTotal}</span> */}
            Total de itens: <span>1</span>
          </div>
        )}
        {taskType === 'horas' && (
          <div className="item-hours">
            {/* Total de itens: <span>{selectedProducts.length + deadlineTotal}</span> */}
            Total de itens: <span>{totalProducst}</span>
          </div>
        )}
        <div className="item-hours">
          Horas estimadas <span>{projectInfos.tempo}</span>
        </div>
        <SummaryButtons>
          <ButtonDefault typeButton="primary" isOutline onClick={() => editTasks()}>
            Editar tarefa
          </ButtonDefault>
          <ButtonDefault onClick={() => createTasks()}>
            {updateTask ? 'Atualizar tarefa' : 'Criar tarefa'}
          </ButtonDefault>
        </SummaryButtons>
      </SummaryTasksAbout>
    </SummaryWrapper>
  );
}
