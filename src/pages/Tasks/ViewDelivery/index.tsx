/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import ProductTable from '../../../components/Ui/ProductTable';
import { ContainerDefault } from '../../../components/UiElements/styles';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';

// Styles
import {
  CardsWrapper,
  DeliveryWrapper,
  RightInfosCard,
  RightInfosTitle,
  ShowInfosButton,
  TaskInfoField,
  TasksInfos,
  TimeLine
} from './styles';
import { da } from 'date-fns/locale';
import { FaArrowLeft } from 'react-icons/fa';

export default function ViewDelivery() {
  const [workForProducts, setWorkForProducts] = useState<boolean>(false);
  const [hideRightCard, setHideRightCard] = useState<string>('show');

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

  return (
    <ContainerDefault>
      <DeliveryWrapper>
        <HeaderOpenTask
          title={titleInfos}
          disableButton={false}
          backPage="/suas-tarefas"
          buttonType="send"
        />

        {/* Cards */}
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

        {/* Product table */}
        <ProductTable data={mockData} workForProduct={setWorkForProducts} />

        <RightInfosCard hideCard={hideRightCard} onClick={() => setHideRightCard('hide')}>
          <TimeLine></TimeLine>
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
        </RightInfosCard>

        <ShowInfosButton onClick={() => setHideRightCard('show')}>
          <FaArrowLeft />
        </ShowInfosButton>
      </DeliveryWrapper>
    </ContainerDefault>
  );
}
