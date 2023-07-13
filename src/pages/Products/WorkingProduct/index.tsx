/* eslint-disable import-helpers/order-imports */

// React
import { useState } from 'react';

// Components
import { useLocation } from 'react-router-dom';

// Hooks
import { useFetch } from '../../../hooks/useFetch';

// Icons
import { IconText } from '../../../assets/icons';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineArrowRight, HiOutlineChatAlt } from 'react-icons/hi';

// Components
import HeaderOpenTask from '../../../components/HeaderTaskPage';
import CardTaskInfo from '../../../components/Ui/CardTaskInfo';
import { ContainerDefault } from '../../../components/UiElements/styles';
import WrapperEditor from '../../../components/WrapperEditor';

// Styles
import {
  CardsTopWrapper,
  ChatSendButton,
  InputChat,
  InputField,
  InputFieldTitle,
  SectionCardWrapper,
  SectionChatComments,
  TabsWrapper,
  TaskTab,
  WorkSection
} from './styles';
import { InputDefault } from '../../../components/Inputs/InputDefault';

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
  const [selectedTab, setSelectedTab] = useState<string>('');
  const [notifications, setNotifications] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');

  // const { data } = useFetch<WorkingProductProps>(`/${location.state.id}`);

  const data = {
    estimatedTime: '03:00:00'
  };

  const dataText =
    'Lorem ipsum dolor sit amet consectetur. Lectus mi urna consequat faucibus eget nunc orci. Massa ornare justo erat sagittis aliquam turpis porttitor. Venenatis vestibulum malesuada egestas senectus eu et ultricies dui tortor. Elementum vitae feugiat pulvinar mi sed cras. Feugiat nibh nisl dignissim orci in. Imperdiet sed arcu ac consequat.';

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

  const handleInputChange = (e: any) => {
    setChatMessage(e.target.value);
  };

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
      <HeaderOpenTask
        title={titleInfos}
        disableButton={false}
        backPage="/tarefas"
        buttonType="finish"
      />

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

      <TabsWrapper>
        <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
          }}
          className={selectedTab === 'Redação' ? 'active' : ''}
        >
          <IconText />
          Redação
        </TaskTab>
        <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
          }}
          className={selectedTab === 'Inputs' ? 'active' : ''}
        >
          <BiInfoCircle />
          Inputs
        </TaskTab>
        <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
          }}
          className={selectedTab === 'Comentários' ? 'active' : ''}
        >
          <HiOutlineChatAlt />
          Comentários
          {notifications && <div className="notification" />}
        </TaskTab>
      </TabsWrapper>

      <WorkSection>
        {selectedTab === 'Redação' && (
          <WrapperEditor
            value={'Texto inicial'}
            mentionData={[]}
            handleOnDescription={(value: any) => console.log('log do editor', value)}
          />
        )}
        {selectedTab === 'Inputs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <InputField>
              <InputFieldTitle>Input Intermediário???</InputFieldTitle>
              <WrapperEditor
                value={'Teste 1'}
                mentionData={[]}
                handleOnDescription={(value: any) => console.log('log do editor', value)}
              />
            </InputField>

            <InputField>
              <InputFieldTitle>Input Criação</InputFieldTitle>
              <WrapperEditor
                value={'Teste 2'}
                mentionData={[]}
                handleOnDescription={(value: any) => console.log('log do editor', value)}
              />
            </InputField>
          </div>
        )}
        {selectedTab === 'Comentários' && (
          <SectionChatComments>
            <InputChat>
              <InputDefault
                label=""
                placeholder="Mensagem..."
                name="chat"
                value={chatMessage}
                onChange={handleInputChange}
                error={''}
              />
              <ChatSendButton>
                <HiOutlineArrowRight />
              </ChatSendButton>
            </InputChat>
          </SectionChatComments>
        )}
      </WorkSection>
    </ContainerDefault>
  );
}
