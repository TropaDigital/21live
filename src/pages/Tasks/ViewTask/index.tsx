/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IconBigCheck } from '../../../assets/icons';
import { BiArrowBack } from 'react-icons/bi';
import { FiCornerDownRight } from 'react-icons/fi';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';
import { ContainerDefault } from '../../../components/UiElements/styles';
import { TasksTable } from '../../../components/Ui/TaskTable/styles';
import ProgressBar from '../../../components/Ui/ProgressBar';
import WorkingProduct from '../../Products/WorkingProduct';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';

// Styles
import {
  ArrowSection,
  CardTitle,
  CardWrapper,
  CardsWrapper,
  TaskInfoWrapper,
  EstimatedTime,
  RightInfosCard,
  RightInfosTitle,
  ShowInfosButton,
  StopWatchTimer,
  TaskInfoField,
  TasksInfos,
  TimeLine,
  TimeLineIcon,
  TimelineInfo,
  TimelineStep,
  DeliveriesWrapper,
  TableWrapper,
  StatusTask,
  DeliveriesTopWrapper
} from './styles';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';

// Hooks
import { useToast } from '../../../hooks/toast';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { StepTimeline } from '../../../types';
import Loader from '../../../components/LoaderSpin';

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface TaskInfos {
  delivery_id: string;
  task_id: string;
  date_end: string;
  description: string;
  created: string;
  updated: string;
  order: string;
  title: string;
  status: string;
  total_time: string;
  time_consumed: string;
  time_creation: string;
  time_essay: string;
  products: [];
}

interface ProductsProps {
  job_service_id: number;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  minutes_creation: any;
  minutes_consumed: any;
  minutes_essay: any;
  created: string;
  updated: string;
  category?: string;
  flag: string;
  quantity?: any;
  tenant_id?: string;
  products_delivery_id?: string;
  period?: string;
  essay?: string;
  status?: string;
  ticket_interaction_id: string;
  reason_change?: string;
}

export default function ViewTask() {
  const location = useLocation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const openRightRef = useRef<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');
  const [dataTask, setDataTask] = useState<any>();
  const [timeLineData, setTimelineData] = useState<TimelineProps>();
  const [hideTimeLine, setHideTimeLine] = useState<boolean>(false);
  const [deliveryProduct, setDeliveryProduct] = useState<ProductsProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>('');
  const [visualizationType, setVisualizationType] = useState<string>('deliveries');

  const titleInfos = {
    idNumber: dataTask?.task_id,
    numberTask: '',
    titleTask: dataTask?.title,
    monthTask: '',
    client_task: dataTask?.tenant,
    typeTask: dataTask?.project_category,
    quantityTask: '',
    contract_task: dataTask?.product_period
  };

  const InputsTask = {
    copywriting_description: dataTask?.copywriting_description,
    creation_description: dataTask?.creation_description
  };

  useEffect(() => {
    async function getTimelineData(id: any) {
      try {
        const response = await api.get(`task/timeline/${id}`);
        setTimelineData(response.data.result);
      } catch (error: any) {
        console.log('log timeline error', error);
      }
    }

    async function getTaskInfos(id: any) {
      try {
        setLoading(true);
        const response = await api.get(`/tasks/${id}`);
        // console.log('log do response get task', response.data.result);

        if (response.data.result.length > 0) {
          setDataTask(response.data.result[0]);
        }

        if (response.data.result[0].parents?.length > 0) {
          setVisualizationType('subtasks');
        }

        setLoading(false);
      } catch (error: any) {
        console.log('log do error getting task', error);
        addToast({
          title: 'Atenção',
          description: error.message,
          type: 'warning'
        });
        setLoading(false);
      }
    }

    if (location.state !== null) {
      getTimelineData(location.state.id);
      getTaskInfos(location.state.id);
    }
    if (location.state === null) {
      getTaskInfos(location.pathname.split('/')[2]);
      getTimelineData(location.pathname.split('/')[2]);
    }
  }, [location]);

  useEffect(() => {
    if (dataTask?.parents?.length > 0 && visualizationType === 'deliveries') {
      setVisualizationType('subtasks');
    }
  }, [visualizationType]);

  const handleNavigateProduct = (infoProduct: any) => {
    const taskCompleteInfo = {
      productInfo: infoProduct,
      taskInfos: dataTask
    };
    setSelectedProduct(taskCompleteInfo);
  };

  const handleNavigateTask = (taskId: string) => {
    const idTask = {
      id: taskId
    };
    navigate(`/tarefa/${taskId}`, { state: idTask });
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        hideRightCard === 'show' &&
        openRightRef.current &&
        !openRightRef.current.contains(e.target)
      ) {
        setHideRightCard('hide');
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [hideRightCard]);

  return (
    <ContainerDefault>
      {loading && <Loader />}

      {!loading && (
        <TaskInfoWrapper>
          <HeaderOpenTask
            title={titleInfos}
            disableButton={true}
            goBack
            buttonType="send"
            nextStepInfo={timeLineData}
            hideButtonNext={true}
            backFlow={() => ''}
          />

          <CardsWrapper>
            {dataTask?.status === 'Concluida' && (
              <CardWrapper>
                <CardTitle>Atividade concluída</CardTitle>
                <StopWatchTimer className="stopped">{dataTask?.time_consumed}</StopWatchTimer>
                <EstimatedTime>
                  Tempo estimado:{' '}
                  <span>
                    {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                  </span>
                </EstimatedTime>
              </CardWrapper>
            )}

            {dataTask?.status !== 'Concluida' && (
              <CardWrapper>
                <CardTitle>Tempo utilizado</CardTitle>
                <StopWatchTimer className="stopped">{dataTask?.time_consumed}</StopWatchTimer>
                <EstimatedTime>
                  Tempo estimado:{' '}
                  <span>
                    {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                  </span>
                </EstimatedTime>
              </CardWrapper>
            )}

            <CardTaskInfo
              cardTitle="Contexto geral"
              cardType="text"
              dataText={dataTask?.description}
              isPlayingTime={() => ''}
            />
          </CardsWrapper>

          {visualizationType === 'subtasks' && (
            <>
              {dataTask.parents?.length > 0 && (
                <DeliveriesWrapper>
                  <span className="title-info">Sub Tarefas</span>

                  <TableWrapper>
                    <TasksTable>
                      <table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Tempo utilizado</th>
                            <th>Tempo estimado</th>
                            <th>Status</th>
                            <th>Cliente</th>
                          </tr>
                        </thead>

                        <tbody>
                          {dataTask?.parents.map((row: any) => (
                            <tr
                              key={row.task_id}
                              onClick={() => handleNavigateTask(row.task_id)}
                              style={{ cursor: 'pointer' }}
                            >
                              <td
                                style={{
                                  display: 'table-cell',
                                  paddingRight: '0.5rem'
                                }}
                              >
                                <FiCornerDownRight
                                  color="var(--primary)"
                                  size={'1rem'}
                                  className="sub"
                                />
                                #{String(row.task_id).padStart(4, '0')}
                              </td>
                              <td style={{ textTransform: 'capitalize', cursor: 'pointer' }}>
                                {row.title}
                              </td>
                              <td>
                                <span style={{ marginBottom: '4px', display: 'block' }}>
                                  {row.time_consumed}
                                </span>
                                <ProgressBar
                                  totalHours={convertToMilliseconds(
                                    dataTask?.total_time !== 'undefined'
                                      ? dataTask?.total_time
                                      : row.time_consumed
                                  )}
                                  restHours={convertToMilliseconds(row.time_consumed)}
                                />
                              </td>
                              <td>
                                {dataTask?.total_time !== 'undefined'
                                  ? dataTask?.total_time
                                  : 'Livre'}
                              </td>
                              <td>
                                <StatusTask
                                  className={
                                    row.status === 'Em Andamento'
                                      ? 'progress'
                                      : row.status === 'Concluida'
                                      ? 'finished'
                                      : ''
                                  }
                                >
                                  {row.status === 'Em Andamento'
                                    ? 'Em progresso'
                                    : row.status === 'Concluida'
                                    ? 'Concluída'
                                    : row.status === 'Aguardando Aprovação'
                                    ? 'Aguardando Aprovação'
                                    : row.status === 'Alteração Interna'
                                    ? 'Alteração interna'
                                    : row.status === 'Alteração Externa'
                                    ? 'Alteração externa'
                                    : row.status === 'Parcial'
                                    ? 'Parcial'
                                    : 'Pendente'}
                                </StatusTask>
                              </td>
                              <td>{row.tenant}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TasksTable>
                  </TableWrapper>
                </DeliveriesWrapper>
              )}

              <DeliveriesWrapper>
                <DeliveriesTopWrapper>
                  <span className="title-info">Entregas</span>

                  {dataTask?.parent_id !== '' && (
                    <ButtonDefault
                      typeButton="primary"
                      onClick={() => handleNavigateTask(dataTask?.parent_id)}
                    >
                      Ir para tarefa mãe
                    </ButtonDefault>
                  )}
                </DeliveriesTopWrapper>

                <TableWrapper>
                  <span className="date-info">
                    {moment(dataTask?.start_job).format('DD/MM/YYYY')}
                  </span>
                  <TasksTable>
                    <table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Título</th>
                          <th>Tempo consumido</th>
                          <th>Tempo estimado</th>
                          <th>Data inicial</th>
                          <th>Data final</th>
                          <th>Produtos</th>
                          <th>Etapa</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {dataTask?.deliverys.map((row: TaskInfos) => (
                          <tr
                            key={row.delivery_id}
                            onClick={() => {
                              setDeliveryProduct(row.products);
                              setVisualizationType('delivery-products');
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <td>#{String(row.delivery_id).padStart(2, '0')}</td>
                            <td>{row.title}</td>
                            <td>
                              <span style={{ marginBottom: '4px', display: 'block' }}>
                                {row.time_consumed}
                              </span>
                              <ProgressBar
                                totalHours={convertToMilliseconds(
                                  dataTask?.total_time !== 'undefined'
                                    ? dataTask?.total_time
                                    : row.time_consumed
                                )}
                                restHours={convertToMilliseconds(row.time_consumed)}
                              />
                            </td>
                            <td>
                              {dataTask?.total_time !== 'undefined'
                                ? dataTask?.total_time
                                : 'Livre'}
                            </td>
                            <td>{moment(row.date_end).format('DD/MM/YYYY')}</td>
                            <td>
                              {dataTask?.end_job !== ''
                                ? moment(dataTask?.end_job).format('DD/MM/YYYY')
                                : '----'}
                            </td>
                            <td>
                              {row.products.length <= 1
                                ? `${row.products.length} produto`
                                : `${row.products.length} produtos`}
                            </td>
                            <td>
                              <div className="column">
                                {dataTask?.card_name}
                                <span>Fluxo: {dataTask?.flow}</span>
                              </div>
                            </td>
                            <td>
                              <div
                                className={
                                  dataTask?.status === 'Em Andamento'
                                    ? 'status progress'
                                    : dataTask?.status === 'Concluida'
                                    ? 'status finished'
                                    : 'status'
                                }
                              >
                                {dataTask?.status === 'Em Andamento'
                                  ? 'Em progresso'
                                  : dataTask?.status === 'Concluida'
                                  ? 'Concluída'
                                  : dataTask?.status === 'Aguardando Aprovação'
                                  ? 'Aguardando Aprovação'
                                  : dataTask?.status === 'Alteração Interna'
                                  ? 'Alteração interna'
                                  : dataTask?.status === 'Alteração Externa'
                                  ? 'Alteração externa'
                                  : dataTask?.status === 'Parcial'
                                  ? 'Parcial'
                                  : 'Pendente'}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </TasksTable>
                </TableWrapper>
              </DeliveriesWrapper>
            </>
          )}

          {visualizationType === 'deliveries' && (
            <DeliveriesWrapper>
              <DeliveriesTopWrapper>
                <span className="title-info">Entregas</span>
                {dataTask?.parent_id !== '' && (
                  <ButtonDefault
                    typeButton="primary"
                    onClick={() => handleNavigateTask(dataTask?.parent_id)}
                  >
                    Ir para tarefa mãe
                  </ButtonDefault>
                )}
              </DeliveriesTopWrapper>

              <TableWrapper>
                <span className="date-info">
                  {moment(dataTask?.start_job).format('DD/MM/YYYY')}
                </span>
                <TasksTable>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Tempo consumido</th>
                        <th>Tempo estimado</th>
                        <th>Data inicial</th>
                        <th>Data final</th>
                        <th>Produtos</th>
                        <th>Etapa</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dataTask?.deliverys.map((row: TaskInfos) => (
                        <tr
                          key={row.delivery_id}
                          onClick={() => {
                            setDeliveryProduct(row.products);
                            setVisualizationType('delivery-products');
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>#{String(row.delivery_id).padStart(2, '0')}</td>
                          <td>{row.title}</td>
                          <td>
                            <span style={{ marginBottom: '4px', display: 'block' }}>
                              {row.time_consumed}
                            </span>
                            <ProgressBar
                              totalHours={convertToMilliseconds(
                                dataTask?.total_time !== 'undefined'
                                  ? dataTask?.total_time
                                  : row.time_consumed
                              )}
                              restHours={convertToMilliseconds(row.time_consumed)}
                            />
                          </td>
                          <td>
                            {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                          </td>
                          <td>{moment(row.date_end).format('DD/MM/YYYY')}</td>
                          <td>
                            {dataTask?.end_job
                              ? moment(dataTask?.end_job).format('DD/MM/YYYY')
                              : '----'}
                          </td>
                          <td>
                            {row.products.length <= 1
                              ? `${row.products.length} produto`
                              : `${row.products.length} produtos`}
                          </td>
                          <td>
                            <div className="column">
                              {dataTask?.card_name}
                              <span>Fluxo: {dataTask?.flow}</span>
                            </div>
                          </td>
                          <td>
                            <div
                              className={
                                dataTask?.status === 'Em Andamento'
                                  ? 'status progress'
                                  : dataTask?.status === 'Concluida'
                                  ? 'status finished'
                                  : 'status'
                              }
                            >
                              {dataTask?.status === 'Em Andamento'
                                ? 'Em progresso'
                                : dataTask?.status === 'Concluida'
                                ? 'Concluída'
                                : dataTask?.status === 'Aguardando Aprovação'
                                ? 'Aguardando Aprovação'
                                : dataTask?.status === 'Alteração Interna'
                                ? 'Alteração interna'
                                : dataTask?.status === 'Alteração Externa'
                                ? 'Alteração externa'
                                : dataTask?.status === 'Parcial'
                                ? 'Parcial'
                                : 'Pendente'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TasksTable>
              </TableWrapper>
            </DeliveriesWrapper>
          )}

          {visualizationType === 'delivery-products' && (
            <DeliveriesWrapper>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="title-info">Produtos</span>

                <button className="go-back" onClick={() => setVisualizationType('deliveries')}>
                  <BiArrowBack />
                  Voltar para entregas
                </button>
              </div>

              <TableWrapper>
                <TasksTable>
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Produto</th>
                        <th>Descrição</th>
                        <th>Formato</th>
                        <th>Tipo</th>
                        <th>I/D</th>
                        <th>Tempo consumido</th>
                        <th>Tempo estimado</th>
                      </tr>
                    </thead>

                    <tbody>
                      {deliveryProduct?.map((row: ProductsProps) => (
                        <tr
                          key={row.products_delivery_id}
                          onClick={() => {
                            handleNavigateProduct(row);
                            setVisualizationType('product');
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <td>#{String(row.products_delivery_id).padStart(2, '0')}</td>
                          <td>{row.service}</td>
                          <td>
                            <div dangerouslySetInnerHTML={{ __html: row.description }} />
                          </td>
                          <td>{row.size}</td>
                          <td>
                            {row.reason_change === '1'
                              ? 'Criação'
                              : row.reason_change === '2'
                              ? 'Desmembramento'
                              : row.reason_change === '3'
                              ? 'Alteração Interna'
                              : 'Alteração externa'}
                          </td>
                          <td>{row.type}</td>
                          <td>
                            <span style={{ marginBottom: '4px', display: 'block' }}>
                              {row.minutes_consumed}
                            </span>
                            <ProgressBar
                              totalHours={convertToMilliseconds(row.minutes)}
                              restHours={convertToMilliseconds(row.minutes_consumed)}
                            />
                          </td>
                          <td>{row.minutes}</td>
                          {/* <td>{moment(row.date_end).format('DD/MM/YYYY')}</td>
                          <td>{moment(dataTask?.end_job).format('DD/MM/YYYY')}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TasksTable>
              </TableWrapper>
            </DeliveriesWrapper>
          )}

          {visualizationType === 'product' && (
            <WorkingProduct
              productDeliveryId={selectedProduct?.productInfo?.products_delivery_id}
              productInfos={selectedProduct.productInfo}
              taskInputs={InputsTask}
              taskId={dataTask?.task_id}
              taskFiles={dataTask?.files}
              goBack={() => setVisualizationType('delivery-products')}
              backButtonTitle={'Voltar para produtos'}
              returnReasons={dataTask?.reason_return}
              timelineData={timeLineData}
              updateInfos={() => ''}
            />
          )}

          <RightInfosCard hideCard={hideRightCard} ref={openRightRef}>
            <TimeLine>
              <div className="hide-menu" onClick={() => setHideTimeLine(!hideTimeLine)}>
                {hideTimeLine && <FaChevronDown />}
                {!hideTimeLine && <FaChevronUp />}
              </div>
              <RightInfosTitle>Linha do tempo</RightInfosTitle>
              {!hideTimeLine &&
                timeLineData &&
                timeLineData?.steps.map((row: StepTimeline, index: number) => (
                  <TimelineStep key={index}>
                    <TimeLineIcon className={row.step <= timeLineData.currentStep ? 'checked' : ''}>
                      {Number(row.step) >= Number(timeLineData.currentStep) &&
                        dataTask?.status !== 'Concluida' && <div className="dot"></div>}

                      {Number(row.step) < Number(timeLineData.currentStep) &&
                        dataTask?.status !== 'Concluida' && <IconBigCheck />}

                      {dataTask?.status === 'Concluida' && <IconBigCheck />}
                    </TimeLineIcon>
                    <TimelineInfo>
                      {row.step < timeLineData.currentStep && (
                        <div className="info-title">Etapa anterior:</div>
                      )}
                      {row.step === timeLineData.currentStep && (
                        <div className="info-title">Etapa atual:</div>
                      )}
                      {row.step > timeLineData.currentStep && (
                        <div className="info-title">Próxima etapa:</div>
                      )}
                      <div className="timeline-info">{row.name}</div>
                    </TimelineInfo>
                  </TimelineStep>
                ))}
            </TimeLine>
            <TasksInfos>
              <RightInfosTitle>Detalhes da tarefa</RightInfosTitle>
              <TaskInfoField>
                <div className="info-title">Tempo estimado:</div>
                <div className="info-description">
                  {dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}
                </div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Etapa:</div>
                <div className="info-description">{dataTask?.card_name}</div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">I/D:</div>
                <div className="info-description">Digital</div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Prioridade:</div>
                <div
                  className={
                    dataTask?.urgent === 'false' ? 'info-description' : 'info-description urgent'
                  }
                >
                  {dataTask?.urgent === 'false' ? 'Normal' : 'Urgente'}
                </div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Data inicial:</div>
                <div className="info-description">
                  {moment(dataTask?.copywriting_date_end).format('DD/MM/YYYY')}
                </div>
              </TaskInfoField>

              <TaskInfoField>
                <div className="info-title">Data final:</div>
                <div className="info-description">
                  {moment(dataTask?.creation_date_end).format('DD/MM/YYYY')}
                </div>
              </TaskInfoField>
            </TasksInfos>
            <ArrowSection onClick={() => setHideRightCard('hide')}>
              <BsChevronDoubleRight />
              <div className="hide">Fechar</div>
            </ArrowSection>
          </RightInfosCard>

          <ShowInfosButton onClick={() => setHideRightCard('show')}>
            <FaArrowLeft />
          </ShowInfosButton>
        </TaskInfoWrapper>
      )}
    </ContainerDefault>
  );
}
