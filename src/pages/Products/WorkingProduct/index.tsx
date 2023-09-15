/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */

// React
import { useEffect, useState } from 'react';

// Components
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import { useFetch } from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/AuthContext';

// Icons
import { IconText } from '../../../assets/icons';
import { BiInfoCircle } from 'react-icons/bi';
import { HiOutlineArrowRight, HiOutlineChatAlt } from 'react-icons/hi';

// Components
import { ContainerDefault } from '../../../components/UiElements/styles';
import WrapperEditor from '../../../components/WrapperEditor';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import AvatarDefault from '../../../components/Ui/Avatar/avatarDefault';

// Styles
import {
  ChatMessage,
  ChatSendButton,
  ChatUserImg,
  EssayInfo,
  FooterSection,
  InputChat,
  InputField,
  InputFieldTitle,
  MessageInfos,
  MessageList,
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

// Services
import api from '../../../services/api';

interface WorkingProductProps {
  productDeliveryId?: any;
  productInfos?: any;
  taskInputs: InputProps;
  taskId?: string;
}

interface InputProps {
  copywriting_description: string;
  creation_description: string;
}

interface ChatMessages {
  comment: string;
  user_id: number;
  name: string;
  avatar: string;
  created: string;
}

export default function WorkingProduct({
  productDeliveryId,
  productInfos,
  taskInputs,
  taskId
}: WorkingProductProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('Redação');
  const [notifications, setNotifications] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [dataComments, setDataComments] = useState<ChatMessages[]>([]);
  const [essayInfo, setEssayInfo] = useState<string>('');
  const [inputsChanges, setInputschanges] = useState({
    copywriting_description: '',
    creation_description: ''
  });
  // const typeOfPlay = location?.state?.playType;

  // const productInfos = location.state?.productInfo?.products_delivery_id;
  // const { data } = useFetch<WorkingProductProps>(`/${location.state.id}`);
  useEffect(() => {
    setEssayInfo(productInfos.essay);
  }, [productInfos]);

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
    getComments();
    setInputschanges({
      copywriting_description: taskInputs.copywriting_description,
      creation_description: taskInputs.creation_description
    });
  }, []);

  const handleInputChange = (e: any) => {
    setChatMessage(e.target.value);
  };

  async function handleSaveEssay() {
    try {
      const essayBody = {
        products_delivery_id: productInfos?.products_delivery_id,
        essay: essayInfo
      };
      setLoading(true);

      const response = await api.post(`/task/create-essay`, essayBody);
      console.log('log do response post essay', response.data.result);

      setLoading(false);

      addToast({
        title: 'Sucesso',
        type: 'success',
        description: 'Inputs salvos com sucesso.'
      });
    } catch (error) {
      console.log('log post essay', error);
      setLoading(false);
    }
  }

  const handleInputs = (name: string, value: any) => {
    const newDTO: any = inputsChanges;
    newDTO[name] = value;
    setInputschanges({ ...newDTO });
  };

  async function handleSaveInputs() {
    try {
      setLoading(true);

      const response = await api.put(`/task/input/${taskId}`, inputsChanges);
      console.log('log do response', response.data.result);

      addToast({
        title: 'Sucesso',
        type: 'success',
        description: 'Inputs alterados com sucesso.'
      });

      setLoading(false);
    } catch (error) {
      console.log('log do error inputs', error);
      setLoading(false);
    }
  }

  async function handleSendComment() {
    try {
      const taskComment = {
        task_id: taskId,
        comment: chatMessage
      };

      setLoading(true);
      const response = await api.post(`/tasks/comment/`, taskComment);

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
            {user.permissions.includes('21jobs_task_essay') ? (
              <div>
                <WrapperEditor
                  value={essayInfo}
                  mentionData={[]}
                  handleOnDescription={(value: any) => setEssayInfo(value)}
                />

                <FooterSection>
                  <ButtonDefault
                    typeButton="lightWhite"
                    isOutline
                    onClick={() => navigate('/minhas-tarefas')}
                  >
                    Descartar
                  </ButtonDefault>
                  <ButtonDefault typeButton="primary" onClick={handleSaveEssay}>
                    Salvar Redação
                  </ButtonDefault>
                </FooterSection>
              </div>
            ) : (
              <EssayInfo>Texto de teste</EssayInfo>
            )}
          </>
        )}
        {selectedTab === 'Inputs' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InputField>
                <InputFieldTitle>Input - Pré-requisitos</InputFieldTitle>
                <WrapperEditor
                  value={taskInputs.copywriting_description}
                  mentionData={[]}
                  handleOnDescription={(value: any) =>
                    handleInputs('copywriting_description', value)
                  }
                />
              </InputField>

              <InputField>
                <InputFieldTitle>Input Criação</InputFieldTitle>
                <WrapperEditor
                  value={taskInputs.creation_description}
                  mentionData={[]}
                  handleOnDescription={(value: any) => handleInputs('creation_description', value)}
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
                      {message.avatar !== '' ? (
                        <ChatUserImg>
                          <div
                            className="user-img"
                            style={{ backgroundImage: `url(${message.avatar})` }}
                          />
                        </ChatUserImg>
                      ) : (
                        <ChatUserImg>
                          <AvatarDefault url={message.avatar} name={message.name} />
                        </ChatUserImg>
                      )}

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

                      {message.avatar !== '' ? (
                        <ChatUserImg>
                          <div
                            className="user-img"
                            style={{ backgroundImage: `url(${message.avatar})` }}
                          />
                        </ChatUserImg>
                      ) : (
                        <ChatUserImg>
                          <AvatarDefault url={message.avatar} name={message.name} />
                        </ChatUserImg>
                      )}
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
