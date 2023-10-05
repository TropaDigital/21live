/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
// React
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IconBigCheck } from '../../../assets/icons';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';
import { ContainerDefault } from '../../../components/UiElements/styles';
import WorkingProduct from '../../Products/WorkingProduct';

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
  DeliveriesTableWrapper
} from './styles';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';

// Hooks
import { useToast } from '../../../hooks/toast';

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface StepTimeline {
  step: string;
  name: string;
}

export default function ViewTask() {
  const location = useLocation();
  const { addToast } = useToast();
  const openRightRef = useRef<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');
  const [dataTask, setDataTask] = useState<any>();
  const [timeLineData, setTimelineData] = useState<TimelineProps>();
  const [hideTimeLine, setHideTimeLine] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>('');

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
    async function getTimelineData() {
      try {
        const response = await api.get(`task/timeline/${location.state.id}`);
        setTimelineData(response.data.result);
      } catch (error: any) {
        console.log('log timeline error', error);
      }
    }

    async function getTaskInfos(id: string) {
      try {
        setLoading(true);
        const response = await api.get(`/tasks/${id}`);
        console.log('log do response get task', response.data.result);

        if (response.data.result.length > 0) {
          setDataTask(response.data.result[0]);
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

    getTimelineData();
    // getTaskInfos(location.state.id);
  }, [location]);

  const handleNavigateProduct = (infoProduct: any) => {
    const taskCompleteInfo = {
      productInfo: infoProduct,
      taskInfos: dataTask
    };
    setSelectedProduct(taskCompleteInfo);
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
      <TaskInfoWrapper>
        <HeaderOpenTask
          title={titleInfos}
          disableButton={true}
          goBack
          buttonType="send"
          nextStepInfo={timeLineData}
          hideButtonNext={true}
        />

        <CardsWrapper>
          {dataTask?.status === 'Concluida' && (
            <CardWrapper>
              <CardTitle>Atividade concluída</CardTitle>
              <StopWatchTimer className="stopped">{dataTask?.time_consumed}</StopWatchTimer>
              <EstimatedTime>
                Tempo estimado:{' '}
                <span>{dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}</span>
              </EstimatedTime>
            </CardWrapper>
          )}

          {dataTask?.status !== 'Concluida' && (
            <CardWrapper>
              <CardTitle>Tempo utilizado</CardTitle>
              <StopWatchTimer className="stopped">{dataTask?.time_consumed}</StopWatchTimer>
              <EstimatedTime>
                Tempo estimado:{' '}
                <span>{dataTask?.total_time !== 'undefined' ? dataTask?.total_time : 'Livre'}</span>
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

        <DeliveriesWrapper>
          <span className="title-info">Entregas</span>

          <DeliveriesTableWrapper>
            <span className="date-info">{moment(dataTask?.start_job).format('DD/MM/YYYY')}</span>
          </DeliveriesTableWrapper>
        </DeliveriesWrapper>

        {/* {selectedProduct === '' && (
          <ProductTable
            data={dataProducts}
            timeData={timeData}
            workForProduct={() => ''}
            isPlayingForSchedule={false}
            productSelected={handleNavigateProduct}
            isFinished={dataTask?.status === 'Concluida' ? true : false}
            typeOfWorkFinished={dataTask?.type_play}
            typeOfPlay={''}
          />
        )} */}

        {selectedProduct !== '' && (
          <WorkingProduct
            productDeliveryId={selectedProduct?.productInfo?.products_delivery_id}
            productInfos={selectedProduct.productInfo}
            taskInputs={InputsTask}
            taskId={dataTask?.task_id}
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
                    {Number(row.step) >= Number(timeLineData.currentStep) && (
                      <div className="dot"></div>
                    )}

                    {Number(row.step) < Number(timeLineData.currentStep) && <IconBigCheck />}
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
    </ContainerDefault>
  );
}
