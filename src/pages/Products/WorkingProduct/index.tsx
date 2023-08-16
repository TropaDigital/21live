/* eslint-disable import-helpers/order-imports */

// React
import { useEffect, useState } from 'react';

// Components
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import { useFetch } from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/toast';

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
import ButtonDefault from '../../../components/Buttons/ButtonDefault';

// Styles
import {
  CardsTopWrapper,
  ChatMessage,
  ChatSendButton,
  ChatUserImg,
  FooterSection,
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
import api from '../../../services/api';

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

interface TitleInfoProps {
  idNumber: string;
  numberTask: string;
  titleTask: string;
  monthTask: '';
  client_task: string;
  typeTask: string;
  quantityTask: '';
  contract_task: string;
}

export default function WorkingProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [selectedTab, setSelectedTab] = useState<string>('Redação');
  const [notifications, setNotifications] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [titleInfos, setTitleInfos] = useState<TitleInfoProps>();
  const [taskInfos, setTaskInfos] = useState<any>();
  const typeOfPlay = location?.state?.playType;

  // const { data } = useFetch<WorkingProductProps>(`/${location.state.id}`);
  const productId = location.state.productInfo.products_delivey_id;

  useEffect(() => {
    console.log('log do titleInfos', location.state.titleInfos);
    console.log('log do taskInfos', location.state.taskInfos);
    setTitleInfos(location.state.titleInfos);
    setTaskInfos(location.state.taskInfos);
  }, [location]);

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

  const handleInputChange = (e: any) => {
    setChatMessage(e.target.value);
  };

  const handleSaveEssay = () => {
    console.log('log salvando a redação');
  };

  const handleInputs = (name: string, value: any) => {
    console.log('log do input', name, value);
  };

  const handlePlayingType = (value: boolean) => {
    if (value) {
      handleStartPlayingTime();
    }
  };

  const handleStartPlayingTime = async () => {
    const playType = {
      task_id: location.state.taskInfos.task_id,
      type_play: 'product'
    };

    const taskClock = {
      task_id: location.state.taskInfos.task_id,
      products_delivey_id: productId
    };

    try {
      const responseTypeOfPlay = await api.post(`/task/switch-play`, playType);
      const responseClock = await api.post(`/clock`, taskClock);

      console.log('log do responsePlay', responseTypeOfPlay);
      console.log('log do responseClock', responseClock);
    } catch (error: any) {
      console.log('log do error play', error);
    }
  };

  async function handleFinishProduct() {
    try {
      const response = await api.post(`/task/product-conclude/${productId}`);
      console.log('log do response', response);
    } catch (error: any) {
      console.log('log error getting user', error);
    }
  }

  const handleFinishedPlay = () => {
    addToast({
      title: 'Atenção',
      type: 'warning',
      description: 'Entrega já concluída'
    });
    console.log('log de que tentou dar play com a tarefa concluida');
  };

  return (
    <ContainerDefault>
      {titleInfos && !typeOfPlay && (
        <HeaderOpenTask
          title={titleInfos}
          disableButton={false}
          goBack={true}
          buttonType="finish"
          sendToNext={handleFinishProduct}
        />
      )}

      {titleInfos && typeOfPlay && (
        <HeaderOpenTask title={titleInfos} disableButton={true} goBack={true} buttonType="finish" />
      )}

      <SectionCardWrapper>
        <CardsTopWrapper>
          {!typeOfPlay && (
            <CardTaskInfo
              cardTitle="Iniciar atividade"
              cardType="time"
              dataTime={taskInfos ? taskInfos.totalTime : ''}
              isPlayingTime={handlePlayingType}
            />
          )}

          {typeOfPlay && (
            <CardTaskInfo
              cardTitle="Atividade iniciada"
              cardType="time"
              dataTime={taskInfos ? taskInfos.totalTime : ''}
              isPlayingTime={handleFinishedPlay}
              taskIsFinished={taskInfos?.status === 'Concluida' ? true : false}
            />
          )}

          <CardTaskInfo
            cardTitle="Contexto geral"
            cardType="text"
            dataText={taskInfos ? taskInfos.description : ''}
            isPlayingTime={() => ''}
          />
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
          <>
            <WrapperEditor
              value={'Texto inicial'}
              mentionData={[]}
              handleOnDescription={(value: any) => console.log('log do editor', value)}
            />
            <FooterSection>
              <ButtonDefault typeButton="lightWhite" isOutline onClick={() => navigate('/tarefas')}>
                Descartar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={handleSaveEssay}>
                Salvar Redação
              </ButtonDefault>
            </FooterSection>
          </>
        )}
        {selectedTab === 'Inputs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <InputField>
              <InputFieldTitle>Input - Pré-requisitos</InputFieldTitle>
              <WrapperEditor
                value={'Teste 1'}
                mentionData={[]}
                handleOnDescription={(value: any) => handleInputs('prerequisites', value)}
              />
            </InputField>

            <InputField>
              <InputFieldTitle>Input Criação</InputFieldTitle>
              <WrapperEditor
                value={'Teste 2'}
                mentionData={[]}
                handleOnDescription={(value: any) => handleInputs('creation', value)}
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
