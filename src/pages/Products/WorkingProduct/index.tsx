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
import { BiInfoCircle, BiTrash } from 'react-icons/bi';
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
  ModalInfos,
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
import { BsGear } from 'react-icons/bs';
import ModalDefault from '../../../components/Ui/ModalDefault';

interface WorkingProductProps {
  productDeliveryId?: any;
  productInfos?: any;
  taskInputs?: InputProps;
  taskId?: string;
}

interface InputProps {
  copywriting_description: any;
  creation_description: any;
}

interface ChatMessages {
  comment: string;
  user_id: number;
  name: string;
  avatar: string;
  created: string;
  comment_id: string;
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
  const [showSystemLog, setShowSystemLog] = useState<boolean>(false);
  const [logIsOn, setLogIsOn] = useState<boolean>(false);
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

  async function getCommentSystem() {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/comment/${taskId}?filter=system`);
      // console.log('log do response do comment', response.data.result);
      setDataComments(response.data.result);

      setLoading(false);
    } catch (error) {
      console.log('log error send comment', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedTab === 'Comentários') {
      getComments();
      setInputschanges({
        copywriting_description: taskInputs?.copywriting_description,
        creation_description: taskInputs?.creation_description
      });
    }
  }, [selectedTab]);

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
        description: 'Redação salva com sucesso.'
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

  async function handleDeleteComment(id: any) {
    try {
      setLoading(true);
      if (id !== '') {
        throw new Error('ID do comentário não identificado');
      }
      const response = await api.delete(`/tasks/comment/${id}`);

      addToast({
        title: 'Sucesso',
        type: 'success',
        description: 'Comentário excluido com sucesso.'
      });
      getComments();
      setLoading(false);
    } catch (error: any) {
      console.log('log error delete comment', error);

      addToast({
        title: 'ATENÇÃO',
        type: 'danger',
        description: error.message
      });
      setLoading(false);
    }
  }

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

        <TaskTab onClick={() => setShowSystemLog(true)}>
          <BsGear />
          Logs
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
                  value={taskInputs?.copywriting_description}
                  mentionData={[]}
                  handleOnDescription={(value: any) =>
                    handleInputs('copywriting_description', value)
                  }
                />
              </InputField>

              <InputField>
                <InputFieldTitle>Input Criação</InputFieldTitle>
                <WrapperEditor
                  value={taskInputs?.creation_description}
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
                          <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteComment(message.comment_id)}
                          >
                            <BiTrash />
                          </div>
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
                          <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteComment(message.comment_id)}
                          >
                            <BiTrash />
                          </div>
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
            {!logIsOn && (
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
            )}
          </SectionChatComments>
        )}
      </WorkSection>

      <ModalDefault isOpen={showSystemLog} onOpenChange={() => setShowSystemLog(false)}>
        <ModalInfos>
          <div className="title-modal">Ver comentários ou logs do sistema?</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ButtonDefault
              typeButton="primary"
              isOutline
              onClick={() => {
                setShowSystemLog(false);
                getComments();
                setLogIsOn(false);
                setSelectedTab('Comentários');
              }}
            >
              Comentários
            </ButtonDefault>
            <ButtonDefault
              typeButton="primary"
              isOutline
              onClick={() => {
                getCommentSystem();
                setShowSystemLog(false);
                setLogIsOn(true);
                setSelectedTab('Comentários');
              }}
            >
              Logs do sistema
            </ButtonDefault>
          </div>
        </ModalInfos>
      </ModalDefault>
    </ContainerDefault>
  );
}
