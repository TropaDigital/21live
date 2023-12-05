/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { BiArrowBack, BiInfoCircle, BiShow, BiTrash } from 'react-icons/bi';
import { HiOutlineArrowRight, HiOutlineChatAlt } from 'react-icons/hi';
import { BsCheckCircle, BsFolder } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaDownload } from 'react-icons/fa';

// Components
import { ContainerDefault } from '../../../components/UiElements/styles';
import WrapperEditor from '../../../components/WrapperEditor';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import AvatarDefault from '../../../components/Ui/Avatar/avatarDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { Table } from '../../../components/Table';
import Alert from '../../../components/Ui/Alert';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import ModalDefault from '../../../components/Ui/ModalDefault';
import UploadFiles from '../../../components/Upload/UploadFiles';

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
  ModalUploadWrapper,
  SectionChatComments,
  StatusTable,
  TabsWrapper,
  TaskTab,
  UserMessage,
  UserMessageInfo,
  ViewFile,
  WorkSection
} from './styles';

// Libraries
import moment from 'moment';
import 'moment/dist/locale/pt-br';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

// Services
import api from '../../../services/api';

// Utils
import { formatBytes } from '../../../utils/convertBytes';
import axios from 'axios';
import { ModalImage } from '../../Requests/ViewRequests/styles';
import { MdClose } from 'react-icons/md';
import UploadFilesTicket from '../../../components/UploadTicket/UploadFilex';

interface WorkingProductProps {
  productDeliveryId?: any;
  productInfos?: any;
  taskInputs?: InputProps;
  taskId?: string;
  ticket_id?: string;
  taskFiles?: [];
  taskTenant?: string;
  goBack?: () => void;
  backButtonTitle?: string;
  uploadEnabled?: boolean;
  stepToReturn?: string;
  sendToApprove?: boolean;
  toApprove?: () => void;
  timelineData?: TimelineProps;
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

interface ProductInfo {
  category: string;
  created: string;
  delivery_id: string;
  description: string;
  essay: string;
  file_status: string;
  flag: string;
  minutes: string;
  minutes_consumed: string;
  minutes_creation: string;
  minutes_essay: string;
  period: string;
  products_delivery_id: string;
  quantity: string;
  reason_change: string;
  service: string;
  job_service_id: string;
  size: string;
  status: string;
  task_file_id: string;
  ticket_interaction_id: string;
  type: string;
  updated: string;
}

interface UploadedFilesProps {
  file?: File;
  file_id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress?: number;
  uploaded: boolean;
  error?: boolean;
  url: string | null;
  bucket: string;
  key: string;
  size: number;
  file_name: string;
  isNew: boolean;
  loading: boolean;
  folder: string;
}

interface ModalApprovationInfos {
  isOpen: boolean;
  productId: string;
  approve: boolean;
  disapprove: boolean;
}

interface TimelineProps {
  steps: StepTimeline[];
  currentStep: string;
}

interface StepTimeline {
  step: string;
  name: string;
  card_id: string;
  flow_id: string;
  necessary_upload: string;
  necessary_responsible: string;
  email_alert: string;
  tenant_approve: string;
  manager_approve: string;
  previous_step: string;
  function_id: string;
  final_card: string;
  ticket_status: string;
  ticket_status_id: string;
  tenant_id: string;
}

export default function WorkingProduct({
  productInfos,
  taskInputs,
  taskId,
  taskFiles,
  taskTenant,
  backButtonTitle,
  uploadEnabled,
  stepToReturn,
  sendToApprove,
  timelineData,
  ticket_id,
  toApprove,
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
  const [productsInfo, setProductsInfo] = useState<ProductInfo>();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [modalUpload, setModalUpload] = useState<boolean>(false);
  const [modalFinalFile, setModalFinalFile] = useState<boolean>(false);
  const [modalApproveDisapprove, setModalApproveDisapprove] = useState<ModalApprovationInfos>({
    isOpen: false,
    productId: '',
    approve: false,
    disapprove: false
  });
  const [toClientConfirmation, setToClientConfirmation] = useState<boolean>(false);

  const [previewImage, setPreviewImage] = useState({
    isOpen: false,
    imageInfos: {
      bucket: '',
      created: '',
      file_name: '',
      key: '',
      task_file_id: '',
      task_id: '',
      size: '',
      updated: '',
      url: ''
    }
  });

  useEffect(() => {
    setEssayInfo(productInfos.essay);
    setProductsInfo(productInfos);
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
      if (id === '') {
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

  // const handleDownload = (file: any) => {
  //   console.log('log para fazer download do file', file);
  // };

  async function approveFile(productId: string) {
    try {
      const approve = {
        products_delivery_id: productId,
        status: 'pass'
      };

      const response = await api.put(`/task/manager-approve`, approve);
      console.log('log do response approve', response.data);
      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          type: 'success',
          description: 'Arquivo aprovado com sucesso.'
        });
      }
    } catch (error) {
      console.log('log do error approve file', error);
    }
  }

  async function disapproveFile(productId: string) {
    try {
      const approve = {
        products_delivery_id: productId,
        status: 'fail'
      };

      const response = await api.put(`/task/manager-approve`, approve);
      console.log('log do response disapprove', response.data);

      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          type: 'success',
          description: 'Arquivo reprovado!'
        });

        nextToPrevStep();
      }
    } catch (error) {
      console.log('log do error disapprove file', error);
    }
  }

  async function nextToPrevStep() {
    try {
      const response = await api.post(`/task/next?step=${stepToReturn}`);

      console.log('log do response next step', response.data.result);
    } catch (error) {
      console.log('log do error next step', error);
    }
  }

  const actualStep = timelineData?.currentStep;
  const isToApprove: any = timelineData?.steps.filter((obj) => obj.step === actualStep);

  const finalCard = isToApprove && isToApprove[0].final_card === 'true';

  const uploadClient = isToApprove && isToApprove[0].tenant_approve === 'true';

  async function handleSaveUpload() {
    try {
      const uploadInfos = {
        task_id: taskId,
        file_name: uploadedFiles[0].file_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        products_delivery_id: productInfos?.products_delivery_id
      };

      const response = await api.put(`/task/upload-manager-approve`, uploadInfos);

      if (response.data.status === 'success') {
        setUploadedFiles([]);
      }

      console.log('log do response do saveUpload', response.data.result);
    } catch (error: any) {
      console.log('log save upload for product', error);
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            title: 'Atenção',
            description: row.error,
            type: 'warning'
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error.response.data.message,
          type: 'danger'
        });
      }
    }
  }

  async function handleSaveUploadFinal() {
    try {
      const uploadInfos = {
        task_id: taskId,
        file_name: uploadedFiles[0].file_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        last_archive: 'true',
        products_delivery_id: productInfos?.products_delivery_id
      };

      const response = await api.put(`/task/upload`, uploadInfos);

      if (response.data.status === 'success') {
        setUploadedFiles([]);
        setModalUpload(false);
        setModalFinalFile(false);
      }

      console.log('log do response do saveUpload', response.data.result);
    } catch (error: any) {
      console.log('log save upload final file', error);
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            title: 'Atenção',
            description: row.error,
            type: 'warning'
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error.response.data.message,
          type: 'danger'
        });
      }
    }
  }

  async function handleSaveUploadClient() {
    try {
      const uploadInfos = {
        task_id: taskId,
        file_name: uploadedFiles[0].file_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        products_delivery_id: productInfos?.products_delivery_id
      };

      const response = await api.put(`/task/upload-tenant-approve`, uploadInfos);

      if (response.data.status === 'success') {
        setUploadedFiles([]);
        setModalFinalFile(false);
      }

      console.log('log do response do saveUpload', response.data.result);
    } catch (error: any) {
      console.log('log save upload tenant file', error);
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            title: 'Atenção',
            description: row.error,
            type: 'warning'
          });
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error.response.data.message,
          type: 'danger'
        });
      }
    }
  }

  async function downloadFile(file: any) {
    try {
      const response = await api.post(
        `https://app.21live.com.br:3000/archive?bucket=${file.bucket}&key=${file.key}`
      );

      const urlResponse = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = urlResponse;
      link.setAttribute('download', `${file.file_name}`);
      document.body.appendChild(link);
      link.click();
    } catch (error: any) {
      console.log('log error download file', error);
    }
  }

  useEffect(() => {
    // console.log('log do ticket_id =>', ticket_id);
    // console.log('log do final card =>', finalCard);
    // console.log('log do upload client =>', uploadClient);
    // console.log('log do isToApprove =>', isToApprove);
  }, [finalCard, uploadClient, isToApprove, ticket_id]);

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

        <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
            getComments();
          }}
          className={selectedTab === 'Arquivos' ? 'active' : ''}
        >
          <BsFolder />
          Arquivos
        </TaskTab>

        {backButtonTitle && (
          <button className="go-back" onClick={goBack}>
            <BiArrowBack />
            {backButtonTitle}
          </button>
        )}

        {selectedTab === 'Arquivos' && uploadEnabled && !finalCard && !uploadClient && (
          <ButtonsWrapper>
            {sendToApprove && (
              <ButtonDefault typeButton="primary" onClick={toApprove}>
                Enviar para aprovação
              </ButtonDefault>
            )}
            <ButtonDefault typeButton="primary" onClick={() => setModalUpload(true)}>
              Adicionar arquivo
            </ButtonDefault>
          </ButtonsWrapper>
        )}

        {selectedTab === 'Arquivos' && uploadEnabled && finalCard && (
          <ButtonsWrapper>
            {/* {sendToApprove && (
              <ButtonDefault typeButton="primary" onClick={toApprove}>
                Enviar para aprovação
              </ButtonDefault>
            )} */}
            <ButtonDefault typeButton="primary" onClick={() => setModalFinalFile(true)}>
              Adicionar arquivo
            </ButtonDefault>
          </ButtonsWrapper>
        )}

        {selectedTab === 'Arquivos' && uploadEnabled && uploadClient && (
          <ButtonsWrapper>
            {/* {sendToApprove && (
              <ButtonDefault typeButton="primary" onClick={toApprove}>
                Enviar para aprovação
              </ButtonDefault>
            )} */}
            <ButtonDefault typeButton="primary" onClick={() => setModalFinalFile(true)}>
              Adicionar arquivo
            </ButtonDefault>
          </ButtonsWrapper>
        )}
      </TabsWrapper>

      <WorkSection>
        {selectedTab === 'Redação' && (
          <>
            {user.permissions.includes('jobs_tasks_essay') ? (
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
              <EssayInfo>
                <div dangerouslySetInnerHTML={{ __html: essayInfo }} />
              </EssayInfo>
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
                          {message.name !== 'Sistema' && (
                            <div
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleDeleteComment(message.comment_id)}
                            >
                              <BiTrash />
                            </div>
                          )}
                        </UserMessageInfo>

                        <UserMessage>{message.comment.split('em')[0]}</UserMessage>
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
                    <th>Produto ID</th>
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
                          <td>
                            {row.products_delivery_id !== '' ? row.products_delivery_id : '-----'}
                          </td>
                          <td>{row.file_name}</td>
                          <td>{formatBytes(row.size)}</td>
                          <td style={{ textTransform: 'capitalize' }}>Criação</td>
                          <td style={{ textTransform: 'capitalize' }}>
                            {moment('2023/11/31').format('DD/MM/YYYY')}
                          </td>
                          <td>
                            {row.products_delivery_id !== '' ? (
                              <StatusTable
                                className={
                                  row.status === 'fail'
                                    ? 'status reject'
                                    : row.status === 'pass'
                                    ? 'status accept'
                                    : 'status'
                                }
                              >
                                {row.status === 'fail'
                                  ? 'Reprovado'
                                  : row.status === 'pass'
                                  ? 'Aprovado'
                                  : row.status === 'await'
                                  ? 'Aguardando aprovação'
                                  : ''}
                              </StatusTable>
                            ) : (
                              '-----'
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <ViewFile
                                onClick={() =>
                                  setPreviewImage({
                                    isOpen: true,
                                    imageInfos: {
                                      bucket: row.bucket,
                                      created: row.created,
                                      file_name: row.file_name,
                                      key: row.key,
                                      task_file_id: row.task_file_id,
                                      task_id: row.task_id,
                                      size: row.size,
                                      updated: row.updated,
                                      url: row.url
                                    }
                                  })
                                }
                              >
                                <BiShow size={20} />
                              </ViewFile>

                              <DownloadIcon onClick={() => downloadFile(row)}>
                                <FaDownload />
                              </DownloadIcon>
                            </div>
                            {/* {productsInfo?.file_status === 'pass' && (
                              <div className="fieldTableClients">                               
                              </div>
                            )} */}
                            {/* productsInfo?.file_status === 'await' && */}
                            {isToApprove &&
                              isToApprove[0].manager_approve === 'true' &&
                              row.status === 'await' && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  {/* <DownloadIcon onClick={() => handleDownload(row)}>
                                  <FaDownload />
                                </DownloadIcon> */}

                                  <ButtonApproveReject
                                    className="reject"
                                    // onClick={() => disapproveFile(row.products_delivery_id)}
                                    onClick={() =>
                                      setModalApproveDisapprove({
                                        isOpen: true,
                                        productId: row.products_delivery_id,
                                        approve: false,
                                        disapprove: true
                                      })
                                    }
                                  >
                                    <IoIosCloseCircleOutline />

                                    {/* <div className="hover-text">Reprovar</div> */}
                                  </ButtonApproveReject>

                                  <ButtonApproveReject
                                    className="check"
                                    // onClick={() => approveFile(row.products_delivery_id)}
                                    onClick={() =>
                                      setModalApproveDisapprove({
                                        isOpen: true,
                                        productId: row.products_delivery_id,
                                        approve: true,
                                        disapprove: false
                                      })
                                    }
                                  >
                                    <BsCheckCircle />

                                    {/* <div className="hover-text">Aprovar</div> */}
                                  </ButtonApproveReject>
                                </div>
                              )}
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

      {/* Modal upload to approve */}
      <ModalDefault
        isOpen={modalUpload}
        onOpenChange={() => setModalUpload(false)}
        title="Upload para aprovação"
      >
        <ModalUploadWrapper>
          <UploadFiles
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            tenant={taskTenant}
            isDisabed={!taskTenant}
            loading={loading}
            setLoading={setLoading}
            folderInfo="tasks"
          />

          <div className="select-product">Para qual produto?</div>

          <div className="modal-buttons">
            <ButtonDefault typeButton="lightWhite" isOutline onClick={() => setModalUpload(false)}>
              Cancelar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" onClick={handleSaveUpload}>
              Salvar
            </ButtonDefault>
          </div>
        </ModalUploadWrapper>
      </ModalDefault>

      {/* Modal to approve or disapprove */}
      <ModalDefault
        isOpen={modalApproveDisapprove.isOpen}
        onOpenChange={() =>
          setModalApproveDisapprove({
            isOpen: false,
            productId: '',
            approve: false,
            disapprove: false
          })
        }
        title={
          modalApproveDisapprove.approve ? 'Deseja aprovar arquivo?' : 'Deseja reprovar arquivo?'
        }
      >
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
        >
          <ButtonDefault
            typeButton="lightWhite"
            isOutline
            onClick={() =>
              setModalApproveDisapprove({
                isOpen: false,
                disapprove: false,
                approve: false,
                productId: ''
              })
            }
          >
            Cancelar
          </ButtonDefault>
          {modalApproveDisapprove.approve && (
            <ButtonDefault
              typeButton="primary"
              onClick={() => approveFile(modalApproveDisapprove.productId)}
            >
              Aprovar
            </ButtonDefault>
          )}
          {modalApproveDisapprove.disapprove && (
            <ButtonDefault
              typeButton="danger"
              onClick={() => disapproveFile(modalApproveDisapprove.productId)}
            >
              Reprovar
            </ButtonDefault>
          )}
        </div>
      </ModalDefault>

      {/* Modal to upload last file */}
      <ModalDefault
        isOpen={modalFinalFile}
        onOpenChange={() => setModalFinalFile(false)}
        title={
          uploadClient
            ? 'Upload de arquivo para aprovação do cliente no 21Clients'
            : 'Upload de arquivo final para o 21Clients'
        }
      >
        <ModalUploadWrapper>
          {finalCard && !toClientConfirmation && (
            <UploadFiles
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={taskTenant}
              isDisabed={!taskTenant}
              loading={loading}
              setLoading={setLoading}
              folderInfo="tasks"
            />
          )}

          {finalCard && toClientConfirmation && (
            <div className="confirmation">
              <span>Atenção:</span> <br />
              Os arquivos serão enviados para a área do cliente. <br />
              Essa ação não pode ser revertida.
            </div>
          )}

          {uploadClient && ticket_id && (
            <UploadFilesTicket
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              ticket_id={ticket_id}
              isDisabled={false}
              loading={loading}
              setLoading={setLoading}
              folderInfo="tasks"
            />
          )}

          {finalCard && !toClientConfirmation && (
            <div className="modal-buttons">
              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => setModalFinalFile(false)}
              >
                Cancelar
              </ButtonDefault>

              <ButtonDefault typeButton="primary" onClick={() => setToClientConfirmation(true)}>
                Enviar para o cliente
              </ButtonDefault>
            </div>
          )}

          {finalCard && toClientConfirmation && (
            <div className="modal-buttons">
              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => {
                  setModalFinalFile(false);
                  setToClientConfirmation(false);
                  setUploadedFiles([]);
                }}
              >
                Cancelar
              </ButtonDefault>

              <ButtonDefault typeButton="primary" onClick={handleSaveUploadFinal}>
                OK
              </ButtonDefault>
            </div>
          )}

          {uploadClient && (
            <div className="modal-buttons">
              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => setModalFinalFile(false)}
              >
                Cancelar
              </ButtonDefault>

              <ButtonDefault typeButton="primary" onClick={handleSaveUploadClient}>
                Salvar
              </ButtonDefault>
            </div>
          )}
        </ModalUploadWrapper>
      </ModalDefault>

      {/* Modal to preview image */}
      <ModalDefault
        isOpen={previewImage.isOpen}
        title={previewImage.imageInfos.file_name}
        onOpenChange={() =>
          setPreviewImage({
            isOpen: false,
            imageInfos: {
              bucket: '',
              created: '',
              file_name: '',
              key: '',
              task_file_id: '',
              task_id: '',
              size: '',
              updated: '',
              url: ''
            }
          })
        }
      >
        <>
          {previewImage.imageInfos.file_name.split('.').pop() !== 'pdf' && (
            <ModalImage
              style={{
                backgroundImage: `url(https://${previewImage.imageInfos.bucket}.s3.amazonaws.com/${previewImage.imageInfos.key})`
              }}
            >
              <div
                className="close-button"
                onClick={() =>
                  setPreviewImage({
                    isOpen: false,
                    imageInfos: {
                      bucket: '',
                      created: '',
                      file_name: '',
                      key: '',
                      task_file_id: '',
                      task_id: '',
                      size: '',
                      updated: '',
                      url: ''
                    }
                  })
                }
              >
                <MdClose />
              </div>
            </ModalImage>
          )}

          {previewImage.imageInfos.file_name.split('.').pop() === 'pdf' && (
            <DocViewer
              documents={[
                {
                  uri: `url(https://${previewImage.imageInfos.bucket}.s3.amazonaws.com/${previewImage.imageInfos.key})`,
                  fileType: 'pdf'
                }
              ]}
            />
          )}
        </>
      </ModalDefault>
    </ContainerDefault>
  );
}
