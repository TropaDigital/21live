/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';

// Icons
import { FaArrowLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { IconBigCheck } from '../../../assets/icons';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import ProductTable from '../../../components/Ui/ProductTable';
import { ContainerDefault } from '../../../components/UiElements/styles';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';

// Styles
import {
  ArrowSection,
  CardsWrapper,
  DeliveryWrapper,
  RightInfosCard,
  RightInfosTitle,
  ShowInfosButton,
  TaskInfoField,
  TasksInfos,
  TimeLine,
  TimeLineIcon,
  TimelineInfo,
  TimelineStep
} from './styles';

// Services
import api from '../../../services/api';

interface StepTimeline {
  step: string;
  name: string;
}

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

export default function ViewDelivery() {
  const [workForProducts, setWorkForProducts] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');
  const [timeLineData, setTimelineData] = useState<TimelineProps>();
  const [hideTimeLine, setHideTimeLine] = useState<boolean>(false);

  const titleInfos = {
    idNumber: '1768',
    numberTask: '01',
    titleTask: 'Cronograma',
    monthTask: 'Julho 2023',
    client_task: 'G.WIND',
    typeTask: 'FEE',
    quantityTask: 'PACK 8 POSTS',
    contract_task: 'MÊS'
  };

  const mockData = [
    {
      id: '001',
      title: 'Plano de comunicação',
      consumedTime: '00:30:00',
      estimatedTime: '01:00:00',
      description: 'Plano de comunicação padrão',
      format: '.Docx',
      formatType: 'Digital',
      type: 'Criação',
      status: 'progress'
    },
    {
      id: '002',
      title: 'Plano de descomunicação',
      consumedTime: '00:27:00',
      estimatedTime: '04:20:00',
      description: 'Plano de comunicação padrão',
      format: '.Docx',
      formatType: 'Impresso',
      type: 'Criação',
      status: 'pending'
    }
  ];

  const dataText = {
    data: 'Mussum Ipsum, cacilds vidis litro abertis.Posuere libero varius.Nullam a nisl ut ante blandit hendrerit.Aenean sit amet nisi.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet.Sed non consequat odio.Não sou faixa preta cumpadi, sou preto inteiris, inteiris.Leite de capivaris, leite de mula manquis sem cabeça. Cevadis im ampola pa arma uma pindureta.Per aumento de cachacis, eu reclamis.Mé faiz elementum girarzis, nisi eros vermeio.Sapien in monti palavris qui num significa nadis i pareci latim. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Aenean aliquam molestie leo, vitae iaculis nisl.Viva Forevis aptent taciti sociosqu ad litora torquent.Quem manda na minha terra sou euzis! Admodum accumsan disputationi eu sit.Vide electram sadipscing et per.Nec orci ornare consequat.Praesent lacinia ultrices consectetur.Sed non ipsum felis.Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Quem num gosta di mim que vai caçá sua turmis!Não sou faixa preta cumpadi, sou preto inteiris, inteiris.Nullam volutpat risus nec leo commodo, ut interdum diam laoreet.Sed non consequat odio.Admodum accumsan disputationi eu sit.Vide electram sadipscing et per.'
  };

  const data = {
    estimatedTime: '03:00:00'
  };

  useEffect(() => {
    async function getTimelineData() {
      try {
        const response = await api.get(`task/timeline/123`);
        setTimelineData(response.data.result);
      } catch (error: any) {
        console.log('log timeline error', error);
      }
    }

    getTimelineData();
  }, []);

  return (
    <ContainerDefault>
      <DeliveryWrapper>
        <HeaderOpenTask
          title={titleInfos}
          disableButton={false}
          backPage="/suas-tarefas"
          buttonType="send"
        />

        <CardsWrapper>
          {!workForProducts && (
            <CardTaskInfo
              cardTitle="Iniciar atividade"
              cardType="time"
              dataTime={data ? data?.estimatedTime : ''}
            />
          )}
          <CardTaskInfo cardTitle="Contexto geral" cardType="text" dataText={dataText.data} />
        </CardsWrapper>

        <ProductTable data={mockData} workForProduct={setWorkForProducts} />

        <RightInfosCard hideCard={hideRightCard}>
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
                    <div className="info-title">Etapa anterior:</div>
                    <div className="timeline-info">{row.name}</div>
                  </TimelineInfo>
                </TimelineStep>
              ))}
          </TimeLine>
          <TasksInfos>
            <RightInfosTitle>Detalhes da tarefa</RightInfosTitle>
            <TaskInfoField>
              <div className="info-title">Tempo estimado:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Responsável:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Etapa:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Formato:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">I/D:</div>
              <div className="info-description">Digital</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Prioridade:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Data inicial:</div>
              <div className="info-description">02:00:00</div>
            </TaskInfoField>

            <TaskInfoField>
              <div className="info-title">Data final:</div>
              <div className="info-description">02:00:00</div>
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
      </DeliveryWrapper>
    </ContainerDefault>
  );
}
