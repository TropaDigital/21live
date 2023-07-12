// Components
import { useLocation } from 'react-router-dom';

// Hooks
import { useFetch } from '../../../hooks/useFetch';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';
import { ContainerDefault } from '../../../components/UiElements/styles';

// Styles
import { CardsTopWrapper, SectionCardWrapper } from './styles';

interface WorkingProductProps {
  estimatedTime?: string;
  description?: string;
  projectInfo?: ProjectInfo;
}

interface ProjectInfo {
  taskTitle: string;
  month: string;
  client: string;
  type: string;
  quantity: string;
}

export default function WorkingProduct() {
  const location = useLocation();

  // const { data } = useFetch<WorkingProductProps>(`/${location.state.id}`);

  const data = {
    estimatedTime: '03:00:00'
  };

  const dataText =
    'Lorem ipsum dolor sit amet consectetur. Lectus mi urna consequat faucibus eget nunc orci. Massa ornare justo erat sagittis aliquam turpis porttitor. Venenatis vestibulum malesuada egestas senectus eu et ultricies dui tortor. Elementum vitae feugiat pulvinar mi sed cras. Feugiat nibh nisl dignissim orci in. Imperdiet sed arcu ac consequat.';

  // const dataInfo = {
  //   estimatedTime: '02:00:00',
  //   responsible: 'Guilherme Augusto',
  //   stage: 'Criação',
  //   flow: 'Campanha',
  //   priority: 'Normal',
  //   startDate: '26 de Junho',
  //   endDate: '15 de Julho'
  // };

  return (
    <ContainerDefault>
      <HeaderOpenTask title="Teste de header" />

      <SectionCardWrapper>
        <CardsTopWrapper>
          <CardTaskInfo
            cardTitle="Iniciar atividade"
            cardType="time"
            dataTime={data ? data?.estimatedTime : ''}
          />

          <CardTaskInfo cardTitle="Contexto geral" cardType="text" dataText={dataText} />
        </CardsTopWrapper>
      </SectionCardWrapper>
    </ContainerDefault>
  );
}
