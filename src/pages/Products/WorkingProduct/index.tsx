/* eslint-disable react-hooks/exhaustive-deps */
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
import { useAuth } from '../../../hooks/AuthContext';

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
  comment: string;
  user_id: number;
  name: string;
  avatar: string;
  created: string;
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
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('Redação');
  const [notifications, setNotifications] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [titleInfos, setTitleInfos] = useState<TitleInfoProps>();
  const [taskInfos, setTaskInfos] = useState<any>();
  const [dataComments, setDataComments] = useState<ChatMessages[]>([]);
  const typeOfPlay = location?.state?.playType;

  const productId = location.state?.productInfo?.products_delivey_id;
  const taskId = location.state?.taskInfos?.task_id;
  // const { data } = useFetch<WorkingProductProps>(`/${location.state.id}`);

  async function getComments() {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/comment/${taskId}`);
      // console.log('log do response do comment', response.data.result);
      setDataComments(response.data.result);

      setLoading(false);
    } catch (error) {
      console.log('log error send comment', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    // console.log('log do titleInfos', location.state);
    // console.log('log do taskInfos', location.state.taskInfos);
    setTitleInfos(location.state.titleInfos);
    setTaskInfos(location.state.taskInfos);

    getComments();
  }, [location, taskId]);

  const handleInputChange = (e: any) => {
    setChatMessage(e.target.value);
  };

  const handleSaveEssay = () => {
    console.log('log salvando a redação');
  };

  const handleInputs = (name: string, value: any) => {
    console.log('log do input', name, value);
  };

  const handleSaveInputs = () => {
    console.log('log salvando os inputs');
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
      setLoading(true);
      const response = await api.post(`/task/product-conclude/${productId}`);
      localStorage.removeItem('elapsedTime');
      console.log('log do response', response);
      setLoading(false);
    } catch (error: any) {
      console.log('log error getting user', error);
      setLoading(false);
    }
  }

  const handleFinishedPlay = () => {
    console.log('log de que tentou dar play com a tarefa concluida');
    addToast({
      title: 'Atenção',
      type: 'warning',
      description: 'Entrega já concluída'
    });
  };

  async function handleSendComment() {
    try {
      const taskComment = {
        task_id: taskId,
        comment: chatMessage
      };

      setLoading(true);
      const response = await api.post(`/tasks/comment/`, taskComment);
      console.log('log do response do comment', response.data.result);

      addToast({
        title: 'Sucesso',
        type: 'success',
        description: 'Mensagem enviada.'
      });
      getComments();
      setChatMessage('');
      setLoading(false);
    } catch (error) {
      console.log('log error send comment', error);
      setLoading(false);
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSendComment();
    }
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
          <>
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
            <FooterSection>
              <ButtonDefault typeButton="lightWhite" isOutline onClick={() => navigate('/tarefas')}>
                Descartar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={handleSaveInputs}>
                Salvar Inputs
              </ButtonDefault>
            </FooterSection>
          </>
        )}
        {selectedTab === 'Comentários' && (
          <SectionChatComments>
            <MessageList>
              {dataComments?.map((message: ChatMessages, index: number) => (
                <ChatMessage key={index}>
                  {message.user_id !== user.user_id && (
                    <>
                      <ChatUserImg>
                        <div
                          className="user-img"
                          style={{ backgroundImage: `url(${message.avatar})` }}
                        />
                      </ChatUserImg>

                      <MessageInfos>
                        <UserMessageInfo>
                          <div className="user-name">{message.name}</div>
                          <div className="date-message">{moment(message.created).fromNow()}</div>
                        </UserMessageInfo>

                        <UserMessage>{message.comment}</UserMessage>
                      </MessageInfos>
                    </>
                  )}
                  {message.user_id === user.user_id && (
                    <>
                      <MessageInfos className={message.user_id === user.user_id ? 'left' : ''}>
                        <UserMessageInfo>
                          <div className="user-name">{message.name}</div>
                          <div className="date-message">{moment(message.created).fromNow()}</div>
                        </UserMessageInfo>

                        <UserMessage>{message.comment}</UserMessage>
                      </MessageInfos>

                      <ChatUserImg>
                        <div
                          className="user-img"
                          style={{ backgroundImage: `url(${message.avatar})` }}
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
                onKeyDown={handleKeyDown}
              />
              <ChatSendButton onClick={handleSendComment}>
                <HiOutlineArrowRight />
              </ChatSendButton>
            </InputChat>
          </SectionChatComments>
        )}
      </WorkSection>
    </ContainerDefault>
  );
}
