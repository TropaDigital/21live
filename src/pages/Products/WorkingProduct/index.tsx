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
import { InputDefault } from '../../../components/Inputs/InputDefault';

// Styles
import {
  CardsTopWrapper,
  ChatMessage,
  ChatSendButton,
  ChatUserImg,
  InputChat,
  InputField,
  InputFieldTitle,
  MessageInfos,
  MessageList,
  SectionCardWrapper,
  SectionChatComments,
  TabsWrapper,
  TaskTab,
  UserMessage,
  UserMessageInfo,
  WorkSection
} from './styles';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';

// Images
import PersonImg from '../../../assets/person.jpg';

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

interface ChatMessages {
  id: string;
  userId: number;
  userImage: string;
  userName: string;
  message: string;
  messageDate: string;
  read: string;
}

export default function WorkingProduct() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState<string>('Redação');
  const [notifications, setNotifications] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');

  // const { data } = useFetch<WorkingProductProps>(`/${location.state.id}`);

  const data = {
    estimatedTime: '03:00:00'
  };

  const chatMessages: ChatMessages[] = [
    {
      id: '00001',
      userId: 154,
      userImage: 'avatar.png',
      userName: 'Guilherme Augusto',
      message: 'Corrigir texto email marketing',
      messageDate: '2023-07-14 10:56:09',
      read: ''
    },
    {
      id: '00002',
      userId: 13,
      userImage: 'avatar.png',
      userName: 'Danilo Fontes',
      message: 'Certo, vou resolver',
      messageDate: '2023-07-14 11:05:27',
      read: ''
    },
    {
      id: '00003',
      userId: 11,
      userImage: 'avatar.png',
      userName: 'Adolfo Rodolfo',
      message:
        'Elementum vitae feugiat pulvinar mi sed cras. Feugiat nibh nisl dignissim orci in. Imperdiet sed arcu ac consequat.',
      messageDate: '2023-07-15 14:32:18',
      read: ''
    },
    {
      id: '00004',
      userId: 13,
      userImage: 'avatar.png',
      userName: 'Danilo Fontes',
      message: 'Resolvido',
      messageDate: '2023-07-15 16:20:00',
      read: ''
    },
    {
      id: '00005',
      userId: 13,
      userImage: 'avatar.png',
      userName: 'Danilo Fontes',
      message: 'Task concluída',
      messageDate: '2023-07-16 09:09:09',
      read: ''
    }
  ];

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
            <MessageList>
              {chatMessages.map((message: ChatMessages) => (
                <ChatMessage key={message.id}>
                  {message.userId !== 13 && (
                    <>
                      <ChatUserImg>
                        <div
                          className="user-img"
                          style={{ backgroundImage: `url(${PersonImg})` }}
                        />
                      </ChatUserImg>

                      <MessageInfos>
                        <UserMessageInfo>
                          <div className="user-name">{message.userName}</div>
                          <div className="date-message">
                            {moment(message.messageDate).fromNow()}
                          </div>
                        </UserMessageInfo>

                        <UserMessage>{message.message}</UserMessage>
                      </MessageInfos>
                    </>
                  )}
                  {message.userId === 13 && (
                    <>
                      <MessageInfos className={message.userId === 13 ? 'left' : ''}>
                        <UserMessageInfo>
                          <div className="user-name">{message.userName}</div>
                          <div className="date-message">
                            {moment(message.messageDate).fromNow()}
                          </div>
                        </UserMessageInfo>

                        <UserMessage>{message.message}</UserMessage>
                      </MessageInfos>

                      <ChatUserImg>
                        <div
                          className="user-img"
                          style={{ backgroundImage: `url(${PersonImg})` }}
                        />
                      </ChatUserImg>
                    </>
                  )}
                </ChatMessage>
              ))}
            </MessageList>

            <InputChat>
              <InputDefault
                label=""
                placeholder="Mensagem..."
                name="chat"
                value={chatMessage}
                onChange={handleInputChange}
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
