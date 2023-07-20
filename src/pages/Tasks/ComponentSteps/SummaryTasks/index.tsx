/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Components
import ButtonDefault from '../../../../components/Buttons/ButtonDefault';

// Styles
import {
  DeliveriesTitle,
  DeliveriesWrapper,
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

// Utils
import { multiplyTime, sumTimes } from '../../../../utils/convertTimes';

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
  const [deliveryArrayHours, setDeliveryArrayHours] = useState<any>('');
  const [totalArrayHours, setTotalArrayHours] = useState<any>('');

  // useEffect(() => {
  //   console.log('log selected products on summary', selectedProducts);
  //   console.log('log tasks infos on summary', taskSummary);
  //   console.log('log tasks infos on project', projectInfos);
  //   console.log('log extra infos for summary tasks', summaryExtrainfos);
  // }, [taskSummary, projectInfos, summaryExtrainfos, selectedProducts]);

  function setTotalHours() {
    if (updateTask) {
      setDeliveryArrayHours(
        selectedProducts?.map((row: any) => {
          return sumTimes(
            row?.produtos?.map((product: any) => {
              return multiplyTime(product?.minutes, product?.quantity);
            })
          );
        })
      );
    }

    if (!updateTask) {
      setDeliveryArrayHours(
        selectedProducts?.map((row: any) => {
          return sumTimes(
            row?.deliveryProducts?.map((product: any) => {
              return multiplyTime(product?.minutes, product?.quantity);
            })
          );
        })
      );
    }
  }

  useEffect(() => {
    if (taskType === 'horas') {
      setTotalHours();
    }
    // if (taskType === 'produto') {
    //   console.log('log do selected products  - produto', selectedProducts);
    // }
  }, [selectedProducts, taskType]);

  const [productsTotal, setProductsTotal] = useState<any>();

  const handleProducts = () => {
    if (taskType === 'horas' && !updateTask) {
      const productsAccumulator = selectedProducts?.reduce((accumulator: any, current: any) => {
        return accumulator + current?.deliveryProducts?.length;
      }, 0);
      setProductsTotal(productsAccumulator);
    }
    if (taskType === 'horas' && updateTask) {
      const productsAccumulator = selectedProducts?.reduce((accumulator: any, current: any) => {
        return accumulator + current?.produtos?.length;
      }, 0);
      setProductsTotal(productsAccumulator);
    }
  };

  useEffect(() => {
    handleProducts();
  }, [selectedProducts]);

  useEffect(() => {
    if (deliveryArrayHours.length > 1) {
      setTotalArrayHours(sumTimes(deliveryArrayHours));
    }
  }, [deliveryArrayHours]);

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
              <div
                className="description-info"
                dangerouslySetInnerHTML={{ __html: taskSummary?.description }}
              >
                {/* {taskSummary?.description.replace('<p>', '').replace('</p>', '')} */}
              </div>
            </SummaryTaskDescription>
          </SummaryInfoWrapper>
        </Summary>
        {taskType === 'horas' && updateTask && (
          <Summary className="big">
            <div className="title">Produtos selecionados</div>
            {selectedProducts?.map((row: any, index: any) => (
              <DeliveriesWrapper key={index}>
                <DeliveriesTitle>
                  {row.deliveryTitle ? row.deliveryTitle : `${index + 1}ª Entrega`}
                </DeliveriesTitle>
                {row.produtos.map((products: any, index: number) => (
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
                        <div>
                          Horas: <span>{products.minutes}</span>
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
                        <div>
                          Quantidade: <span>{products.quantity}</span>
                        </div>
                      </div>
                    </SummaryCardSubtitle>
                  </SummaryCard>
                ))}
              </DeliveriesWrapper>
            ))}
          </Summary>
        )}
        {taskType === 'horas' && !updateTask && (
          <Summary className="big">
            <div className="title">Produtos selecionados</div>
            {selectedProducts?.map((row: any, index: any) => (
              <DeliveriesWrapper key={index}>
                <DeliveriesTitle>
                  {row.deliveryTitle ? row.deliveryTitle : `${index + 1}ª Entrega`}
                </DeliveriesTitle>
                {row.deliveryProducts.map((products: any, index: number) => (
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
                        <div>
                          Horas: <span>{products.minutes}</span>
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
                        <div>
                          Quantidade: <span>{products.quantity}</span>
                        </div>
                      </div>
                    </SummaryCardSubtitle>
                  </SummaryCard>
                ))}
              </DeliveriesWrapper>
            ))}
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
          <>
            <div className="item-hours">
              {/* Total de itens: <span>{selectedProducts.length + deadlineTotal}</span> */}
              Total de itens: <span>1</span>
            </div>
            <div className="splitter"></div>
            <div className="item-hours">
              Horas estimadas <span>{projectInfos.tempo}</span>
            </div>
          </>
        )}
        {taskType === 'horas' && (
          <>
            <div className="item-hours">
              {/* Total de itens: <span>{selectedProducts.length + deadlineTotal}</span> */}
              Total de itens: <span>{productsTotal}</span>
            </div>
            <div className="splitter"></div>
            <div className="item-hours">
              Horas estimadas <span>{totalArrayHours}</span>
            </div>
          </>
        )}
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
