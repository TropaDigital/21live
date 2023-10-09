/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */

// React
import { useEffect, useState } from 'react';

// Components
import { useNavigate } from 'react-router-dom';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/AuthContext';

// Icons
import { IconText } from '../../../assets/icons';
import { BiArrowBack, BiInfoCircle, BiTrash } from 'react-icons/bi';
import { HiOutlineArrowRight, HiOutlineChatAlt } from 'react-icons/hi';

// Components
import { ContainerDefault } from '../../../components/UiElements/styles';
import WrapperEditor from '../../../components/WrapperEditor';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import AvatarDefault from '../../../components/Ui/Avatar/avatarDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';

// Styles
import {
  ButtonApproveReject,
  ButtonsWrapper,
  ChatMessage,
  ChatSendButton,
  ChatUserImg,
  CheckboxWrapper,
  DownloadIcon,
  EssayInfo,
  FilesTableWrapper,
  FooterSection,
  InputChat,
  InputField,
  InputFieldTitle,
  MessageInfos,
  MessageList,
  SectionChatComments,
  StatusTable,
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
import { BsCheckCircle, BsCheckLg, BsFolder } from 'react-icons/bs';
import { Table } from '../../../components/Table';
import Alert from '../../../components/Ui/Alert';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import { FiDownload } from 'react-icons/fi';
import { FaDownload } from 'react-icons/fa';
import { formatBytes } from '../../../utils/convertBytes';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface WorkingProductProps {
  productDeliveryId?: any;
  productInfos?: any;
  taskInputs?: InputProps;
  taskId?: string;
  taskFiles?: [];
  goBack?: () => void;
  backButtonTitle?: string;
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

interface FilesMap {
  bucket: string;
  created: string;
  file_name: string;
  key: string;
  last_archive: string;
  products_delivery_id: string;
  size: string;
  status: string;
  task_file_id: string;
  task_id: string;
  updated: string;
  url: string;
}

export default function WorkingProduct({
  productInfos,
  taskInputs,
  taskId,
  taskFiles,
  backButtonTitle,
  goBack
}: WorkingProductProps) {
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
  const [logIsOn, setLogIsOn] = useState<boolean>(false);

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

  const handleShowLogs = () => {
    if (logIsOn) {
      setLogIsOn(false);
      getComments();
    } else {
      setLogIsOn(true);
      getCommentSystem();
    }
  };

  const handleDownload = (file: any) => {
    console.log('log para fazer download do file', file);
  };

  // async function downloadProposal() {
  //   try {

  //     const response = await api.get(`proposta-csv?${requestedPayload}`);
  //     const url = window.URL.createObjectURL(new Blob([s2ab(response.data)]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'demandas.csv');
  //     document.body.appendChild(link);
  //     link.click();

  //   } catch (error: any) {

  //     console.log('log error download csv', error)

  //   }
  // }

  return (
    <ContainerDefault>
      <TabsWrapper>
        <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
            setLogIsOn(false);
          }}
          className={selectedTab === 'Redação' ? 'active' : ''}
        >
          <IconText />
          Redação
        </TaskTab>

        <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
            setLogIsOn(false);
          }}
          className={selectedTab === 'Inputs' ? 'active' : ''}
        >
          <BiInfoCircle />
          Inputs
        </TaskTab>

        <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
            getComments();
          }}
          className={selectedTab === 'Comentários' ? 'active' : ''}
        >
          <HiOutlineChatAlt />
          Comentários
          {notifications && <div className="notification" />}
        </TaskTab>

        {/* <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
            getComments();
          }}
          className={selectedTab === 'Arquivos' ? 'active' : ''}
        >
          <BsFolder />
          Arquivos
        </TaskTab> */}

        {backButtonTitle && (
          <button className="go-back" onClick={goBack}>
            <BiArrowBack />
            {backButtonTitle}
          </button>
        )}

        {/* <ButtonsWrapper>
          <ButtonDefault typeButton="primary">Enviar para aprovação</ButtonDefault>
          <ButtonDefault typeButton="primary">Adicionar arquivo</ButtonDefault>
        </ButtonsWrapper> */}
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
              <EssayInfo>{essayInfo}</EssayInfo>
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
            <CheckboxWrapper>
              <CheckboxDefault
                label="Logs do sistema"
                name="user_selected"
                onChange={handleShowLogs}
                checked={logIsOn}
              />
            </CheckboxWrapper>

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
        {selectedTab === 'Arquivos' && (
          <FilesTableWrapper>
            <Table>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Nome do arquivo</th>
                    <th>Tamanho</th>
                    <th>Usuário</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {taskFiles
                    ? taskFiles?.length > 0 &&
                      taskFiles?.map((row: FilesMap) => (
                        <tr key={row.task_file_id}>
                          <td>
                            <div className="id-column">
                              #{String(row.task_file_id).padStart(2, '0')}
                            </div>
                          </td>
                          <td>Nome do produto</td>
                          <td>{row.file_name}</td>
                          <td>{formatBytes(row.size)}</td>
                          <td style={{ textTransform: 'capitalize' }}>Criação</td>
                          <td style={{ textTransform: 'capitalize' }}>
                            {moment('2023/11/31').format('DD/MM/YYYY')}
                          </td>
                          <td>
                            <StatusTable
                            // className={
                            //   row.status === 'Em Andamento'
                            //     ? 'status progress'
                            //     : row.status === 'Concluida'
                            //       ? 'status finished'
                            //       : 'status'
                            // }
                            >
                              {/* {row.status === 'Em Andamento'
                              ? 'Em progresso'
                              : row.status === 'Concluida'
                                ? 'Concluída'
                                : 'Pendente'} */}
                              Aguardando aprovação
                            </StatusTable>
                          </td>
                          <td>
                            {/* <div className="fieldTableClients">
                            <DownloadIcon>
                              <FaDownload />
                            </DownloadIcon>
                            <Alert
                              title="Atenção"
                              subtitle="Certeza que gostaria de deletar este arquivo? Ao excluir esta ação não poderá ser desfeita."
                              confirmButton={() => ''}
                            >
                              <ButtonTable typeButton="delete" />
                            </Alert>
                          </div> */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <DownloadIcon onClick={() => handleDownload(row)}>
                                <FaDownload />
                              </DownloadIcon>

                              <ButtonApproveReject className="reject">
                                <IoIosCloseCircleOutline />

                                {/* <div className="hover-text">Reprovar</div> */}
                              </ButtonApproveReject>

                              <ButtonApproveReject className="check">
                                <BsCheckCircle />

                                {/* <div className="hover-text">Aprovar</div> */}
                              </ButtonApproveReject>
                            </div>
                          </td>
                        </tr>
                      ))
                    : ''}
                </tbody>
              </table>
            </Table>
          </FilesTableWrapper>
        )}
      </WorkSection>
    </ContainerDefault>
  );
}
