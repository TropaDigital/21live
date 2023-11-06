/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useEffect, useState } from 'react';

// Components
import ButtonDefault from '../../../../components/Buttons/ButtonDefault';

// Styles
import {
  CreateTicketOption,
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
import { FileList } from '../../../Projects/ListProjects/styles';

// Utils
import { multiplyTime, subtractTime, sumTimes } from '../../../../utils/convertTimes';

// Hooks
import { useAuth } from '../../../../hooks/AuthContext';

// Libraries
import Switch from 'react-switch';
import moment from 'moment';

interface TasksProps {
  createTasks: () => void;
  editTasks: () => void;
  selectedProducts: any;
  taskSummary: any;
  projectInfos: any;
  summaryExtrainfos: any;
  taskType: any;
  updateTask: boolean;
  error: FormProps;
  estimatedtotalTime: (value: any) => void;
  taskFiles: any[];
  ticketAsk: string | null;
  handleTicket: (value: any) => void;
}

// interface FlowRole {
//   function: string;
//   name: string;
//   user_id: string;
// }

interface FormProps {
  [key: string]: any;
}

export default function SummaryTasks({
  selectedProducts,
  editTasks,
  createTasks,
  taskSummary,
  projectInfos,
  summaryExtrainfos,
  taskType,
  updateTask,
  estimatedtotalTime,
  handleTicket,
  taskFiles,
  ticketAsk
}: TasksProps) {
  const { user } = useAuth();
  const [deliveryArrayHours, setDeliveryArrayHours] = useState<any>('');
  const [totalArrayHours, setTotalArrayHours] = useState<any>('');

  function setTotalHours() {
    if (updateTask) {
      setDeliveryArrayHours(
        selectedProducts?.map((row: any) => {
          return sumTimes(
            row?.products?.map((product: any) => {
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
        return accumulator + current?.products?.length;
      }, 0);
      setProductsTotal(productsAccumulator);
    }
  };

  useEffect(() => {
    handleProducts();
  }, [selectedProducts]);

  useEffect(() => {
    if (deliveryArrayHours.length > 0) {
      setTotalArrayHours(sumTimes(deliveryArrayHours));
    }
  }, [deliveryArrayHours]);

  useEffect(() => {
    estimatedtotalTime(totalArrayHours);
  }, [totalArrayHours]);

  // useEffect(() => {
  //   console.log('log do deliveryArrayHours', deliveryArrayHours);
  //   console.log('log do totalArrayHours', totalArrayHours);
  //   console.log('log do selectedProducts', selectedProducts);
  //   console.log('log do taskSummaries', taskSummary);
  //   console.log('log do projectInfos', projectInfos);
  // }, [deliveryArrayHours, totalArrayHours, selectedProducts, taskSummary, projectInfos]);

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

            {user?.organizations?.length > 0 && (
              <SummaryTaskInfo>
                <div className="title-info">Cliente:</div>
                {updateTask && <div className="info">{taskSummary?.tenant}</div>}
                {!updateTask && <div className="info">{summaryExtrainfos?.organization.name}</div>}
              </SummaryTaskInfo>
            )}

            {!user?.organizations && (
              <SummaryTaskInfo>
                <div className="title-info">Cliente:</div>
                {updateTask && <div className="info">{taskSummary?.tenant}</div>}
                {!updateTask && <div className="info">{summaryExtrainfos?.client.name}</div>}
              </SummaryTaskInfo>
            )}

            <SummaryTaskInfo>
              <div className="title-info">Projeto/Contrato:</div>
              {updateTask && (
                <div className="info">
                  {taskSummary?.project_category} | {taskSummary?.product_period}
                </div>
              )}
              {!updateTask && <div className="info">{projectInfos?.select}</div>}
            </SummaryTaskInfo>

            {!user?.organizations && (
              <SummaryTaskInfo>
                <div className="title-info">Fluxo:</div>
                {updateTask && <div className="info">{taskSummary?.flow}</div>}
                {!updateTask && <div className="info">{summaryExtrainfos?.flow.name}</div>}
              </SummaryTaskInfo>
            )}

            {taskType === 'produto' && (
              <SummaryTaskInfo>
                <div className="title-info">Data de entrega:</div>
                <div className="info">
                  {moment(taskSummary.creation_date_end).format('DD/MM/YYYY')}
                </div>
              </SummaryTaskInfo>
            )}

            <SummaryTaskDescription>
              <div className="description-title">Contexto geral</div>
              <div
                className="description-info"
                dangerouslySetInnerHTML={{ __html: taskSummary?.description }}
              >
                {/* {taskSummary?.description.replace('<p>', '').replace('</p>', '')} */}
              </div>
            </SummaryTaskDescription>
            {taskFiles.length > 0 && (
              <SummaryTaskDescription>
                <div className="description-title">Arquivos:</div>
                {taskFiles.map((row: any) => (
                  <FileList key={row.file_id}>&#x2022; {row.file_name}</FileList>
                ))}
              </SummaryTaskDescription>
            )}
          </SummaryInfoWrapper>
        </Summary>
        {taskType === 'horas' && updateTask && (
          <Summary className="big">
            <div className="title">Produtos selecionados</div>
            {selectedProducts?.map((row: any, index: any) => (
              <DeliveriesWrapper key={index}>
                <DeliveriesTitle>
                  {row.deliveryTitle ? row.deliveryTitle : `${index + 1}ª Entrega`}

                  {row.deliveryDate && (
                    <span>- {moment(row.deliveryDate).format('DD/MM/YYYY')}</span>
                  )}
                  {!row.deliveryDate && (
                    <span>- {moment(taskSummary.creation_date_end).format('DD/MM/YYYY')}</span>
                  )}
                </DeliveriesTitle>
                {row?.products.map((products: any, index: number) => (
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
                  {row.deliveryDate && (
                    <span>- {moment(row.deliveryDate).format('DD/MM/YYYY')}</span>
                  )}
                  {!row.deliveryDate && (
                    <span>- {moment(taskSummary.creation_date_end).format('DD/MM/YYYY')}</span>
                  )}
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

      <div>
        {/* Select responsável flow */}
        {/* {flowsManagers?.length > 0 && (
          <FlexLine>
            <SelectDefault
              label="Selecione o responsável inicial da tarefa"
              name="user_id"
              value={taskSummary.user_id}
              onChange={(e) => handleInputChange(e)}
              error={error?.user_id}
            >
              {flowsManagers?.map((row: FlowRole) => (
                <option key={row.user_id} value={row.user_id}>
                  {row.function} - {row.name}
                </option>
              ))}
            </SelectDefault>
          </FlexLine>
        )} */}
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
                Horas estimadas <span>{projectInfos?.tempo}</span>
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
              {!updateTask && (
                <div className="item-hours">
                  Horas disponíveis{' '}
                  {subtractTime(projectInfos?.tempo, totalArrayHours).includes('-') ? (
                    <div className="negative">
                      {subtractTime(projectInfos?.tempo, totalArrayHours)}
                    </div>
                  ) : (
                    <span>{subtractTime(projectInfos?.tempo, totalArrayHours)}</span>
                  )}
                </div>
              )}
              {updateTask && (
                <div className="item-hours">
                  Horas disponíveis
                  {subtractTime(taskSummary?.time, totalArrayHours).includes('-') ? (
                    <div className="negative">
                      {subtractTime(taskSummary?.time, totalArrayHours)}
                    </div>
                  ) : (
                    <span>{subtractTime(taskSummary?.time, totalArrayHours)}</span>
                  )}
                </div>
              )}
            </>
          )}

          {ticketAsk === 'ask' && (
            <>
              <div className="splitter" />
              <CreateTicketOption>
                {/* <div>Aqui vai o switch</div> */}
                <Switch
                  onChange={handleTicket}
                  checked={taskSummary.gen_ticket === 'true' ? true : false}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#0046B5"
                  className="switch-ticket"
                />
                <div>Deseja gerar ticket</div>
              </CreateTicketOption>
            </>
          )}

          <SummaryButtons>
            <ButtonDefault typeButton="primary" isOutline onClick={() => editTasks()}>
              Editar detalhes da tarefa
            </ButtonDefault>
            <ButtonDefault onClick={() => createTasks()}>
              {updateTask ? 'Atualizar tarefa' : 'Criar tarefa'}
            </ButtonDefault>
          </SummaryButtons>
        </SummaryTasksAbout>
      </div>
    </SummaryWrapper>
  );
}
