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
import { useParamsHook } from '../../../hooks/useParams';

// Icons
import { IconText } from '../../../assets/icons';
import { BiArrowBack, BiInfoCircle, BiShow, BiTrash } from 'react-icons/bi';
import { HiOutlineArrowRight, HiOutlineChatAlt } from 'react-icons/hi';
import { BsCheckCircle, BsFolder } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FaDownload } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { AiOutlineInteraction } from 'react-icons/ai';
import { BsChatText } from 'react-icons/bs';

// Components
import { ContainerDefault } from '../../../components/UiElements/styles';
import WrapperEditor from '../../../components/WrapperEditor';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import AvatarDefault from '../../../components/Ui/Avatar/avatarDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { Table } from '../../../components/Table';
import ModalDefault from '../../../components/Ui/ModalDefault';
import UploadFiles from '../../../components/Upload/UploadFiles';
import UploadFilesTicket from '../../../components/UploadTicket/UploadFilex';
import UploadFinalFile from '../../../components/UploadFinal/UploadFinalFiles';
import { MotiveInfos } from '../../../components/Ui/ProductTable/styles';
import Alert from '../../../components/Ui/Alert';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import ModalLoader from '../../../components/Ui/ModalLoader';

// Styles
import {
  ButtonApproveReject,
  ButtonIcon,
  ButtonsWrapper,
  CardChangeInfos,
  CardChangesWrapper,
  CardShowInputs,
  ChatMessage,
  ChatSendButton,
  ChatUserImg,
  CheckboxWrapper,
  EssayField,
  EssayInfo,
  FilesTableWrapper,
  FooterSection,
  ImageWrapper,
  InfoFile,
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

// types
import { StepTimeline, UploadedFilesProps } from '../../../types';

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
  updateInfos: () => void;
  timelineData?: TimelineProps;
  returnReasons?: ReturnReasons[];
  allProducts?: any;
}

interface ReturnReasons {
  created: string;
  current_step: string;
  requester_name: string;
  returner_name: string;
  reason: string;
  returner_id: string;
  return_type: string;
  step: string;
  task_id: string;
  task_return_id: string;
  updated: string;
  user_id: string;
}

interface InputProps {
  copywriting_description: any;
  creation_description: any;
}

interface ChatMessages {
  comment: string;
  user_id: string;
  name: string;
  avatar: string;
  created: string;
  task_comment_id: string;
}

interface FilesMap {
  bucket: string;
  created: string;
  file_name: string;
  original_name: string;
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
  returnReasons,
  allProducts,
  toApprove,
  goBack,
  updateInfos
}: WorkingProductProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();
  const { parameters, getParams } = useParamsHook();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>('Inputs');
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
  const [modalRejectedInfo, setModalRejectedInfo] = useState<any>({
    isOpen: false,
    motive: ''
  });

  const [previewImage, setPreviewImage] = useState({
    isOpen: false,
    imageInfos: {
      bucket: '',
      created: '',
      file_name: '',
      original_name: '',
      key: '',
      task_file_id: '',
      task_id: '',
      size: '',
      updated: '',
      url: ''
    }
  });

  const motiveReject = allProducts.filter(
    (obj: any) => obj.products_delivery_id === modalRejectedInfo.motive
  );

  const productsNames: any[] =
    taskFiles?.map((file: any) => {
      const matchingProduct = allProducts?.find(
        (product: any) => product.products_delivery_id === file.products_delivery_id
      );
      return matchingProduct ? matchingProduct.service : [];
    }) || [];

  useEffect(() => {
    getParams();
  }, []);

  useEffect(() => {
    setEssayInfo(productInfos?.essay);
    setProductsInfo(productInfos);
  }, [productInfos]);

  async function getComments(filter: string) {
    try {
      setLoadingData(true);
      if (filter === '') {
        const response = await api.get(`/tasks/comment/${taskId}`);
        setDataComments(response.data.result);
      }

      if (filter === 'system') {
        const response = await api.get(`/tasks/comment/${taskId}?filter=system`);
        setDataComments(response.data.result);
      }

      setLoadingData(false);
    } catch (error: any) {
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
      setLoadingData(false);
    }
  }

  useEffect(() => {
    if (selectedTab === 'Comentários') {
      getComments('');
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
      getComments('');
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
      getComments('');
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

  const handleShowLogs = (e: any) => {
    if (e.target.checked) {
      setLogIsOn(true);
      getComments('system');
    } else {
      setLogIsOn(false);
      getComments('');
    }
  };

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
      setLoading(true);

      const uploadInfos = {
        task_id: taskId,
        file_name: uploadedFiles[0].file_name,
        original_name: uploadedFiles[0].original_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        products_delivery_id: productInfos?.products_delivery_id
      };

      const response = await api.put(`/task/upload`, uploadInfos);

      if (response.data.status === 'success') {
        setUploadedFiles([]);
        setModalUpload(false);
        updateInfos();
        // navigate('/minhas-tarefas');
      }

      setLoading(false);

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

      setLoading(false);
    }
  }

  async function handleSaveUploadFinal() {
    try {
      setLoading(true);

      const uploadInfos = {
        task_id: taskId,
        file_name: uploadedFiles[0].file_name,
        original_name: uploadedFiles[0].original_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        last_archive: 'true',
        products_delivery_id: productInfos?.products_delivery_id
      };

      const response = await api.post(`/task/upload`, uploadInfos);

      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          description: 'Sucesso, upload final concluído.',
          type: 'success'
        });
        setUploadedFiles([]);
        setModalUpload(false);
        setModalFinalFile(false);
        updateInfos();
        // navigate('/minhas-tarefas');
      }

      setLoading(false);

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

      setLoading(false);
    }
  }

  async function handleSaveUploadClient() {
    try {
      setLoading(true);

      const uploadInfos = {
        task_id: taskId,
        file_name: uploadedFiles[0].file_name,
        original_name: uploadedFiles[0].original_name,
        size: uploadedFiles[0].size,
        key: uploadedFiles[0].key,
        bucket: uploadedFiles[0].bucket,
        products_delivery_id: productInfos?.products_delivery_id
      };

      const response = await api.put(`/task/upload-tenant-approve`, uploadInfos);

      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          description: 'Arquivo enviado, aguarde a aprovação do cliente.',
          type: 'success'
        });
        setUploadedFiles([]);
        setModalFinalFile(false);
        updateInfos();
        // setTimeout(() => {
        //   navigate('/minhas-tarefas');
        // }, 1500);
      }

      setLoading(false);

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

      setLoading(false);
    }
  }

  async function downloadFile(file: any) {
    try {
      const response = await api.get(
        `https://app.21live.com.br:3000/archive?bucket=${file.bucket}&key=${file.key}`,
        { responseType: 'arraybuffer' }
      );

      console.log('log do response download =>', response);

      const blob = new Blob([response.data]);
      const urlResponse = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlResponse;
      link.setAttribute('download', `${file.original_name}`);

      setLoading(true);

      document.body.appendChild(link);
      link.click();

      setLoading(false);
    } catch (error: any) {
      console.log('log error download file', error);
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: error.response.data.message
        });
      }
      setLoading(false);
    }
  }

  async function handleDeleteFile(fileId: string) {
    try {
      setLoading(true);

      const response = await api.delete(`/task/delete-file/${fileId}`);

      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          description: 'Arquivo excluído com sucesso',
          type: 'success'
        });
        updateInfos();
      }

      setLoading(false);
    } catch (error: any) {
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
      setLoading(false);
    }
  }

  function findCardNameByStep(data: any[], targetStep: string): string | null {
    const foundCard = data.find((obj: any) => obj.step === targetStep);

    return foundCard ? foundCard.name : null;
  }

  useEffect(() => {
    // console.log('log do ticket_id =>', ticket_id);
    // console.log('log do final card =>', finalCard);
    // console.log('log do upload client =>', uploadClient);
    // console.log('log do isToApprove =>', isToApprove);
    // console.log('log do isToApprove =>', isToApprove);
    // console.log('log allProducts =>', allProducts);
    // console.log('log do motiveRejects =>', motiveReject);
  }, [finalCard, uploadClient, isToApprove, ticket_id, allProducts, motiveReject]);

  return (
    <ContainerDefault>
      <TabsWrapper>
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
            getComments('');
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
            setLogIsOn(false);
          }}
          className={selectedTab === 'Arquivos' ? 'active' : ''}
        >
          <BsFolder />
          Arquivos
        </TaskTab>

        <TaskTab
          onClick={(e: any) => {
            setSelectedTab(e.target.innerText);
            setLogIsOn(false);
          }}
          className={selectedTab === 'Alterações' ? 'active' : ''}
        >
          <AiOutlineInteraction />
          Alterações
        </TaskTab>

        {backButtonTitle && (
          <button className="go-back" onClick={goBack}>
            <BiArrowBack />
            {backButtonTitle}
          </button>
        )}

        {selectedTab === 'Arquivos' && uploadEnabled && !finalCard && !uploadClient && (
          <ButtonsWrapper>
            {/* {sendToApprove && (
              <ButtonDefault typeButton="primary" onClick={toApprove}>
                Enviar para aprovação
              </ButtonDefault>
            )} */}
            <ButtonDefault typeButton="primary" onClick={() => setModalUpload(true)}>
              Adicionar arquivo
            </ButtonDefault>
          </ButtonsWrapper>
        )}

        {selectedTab === 'Arquivos' &&
          uploadEnabled &&
          finalCard &&
          productInfos?.status !== 'Concluida' && (
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

        {selectedTab === 'Arquivos' &&
          uploadEnabled &&
          uploadClient &&
          productInfos?.status !== 'Desmembrada' &&
          productInfos?.status !== 'Concluida' && (
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
        {selectedTab === 'Inputs' &&
          user.permissions.includes('jobs_tasks_execute') &&
          productInfos.status !== 'Concluida' && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '16px'
                }}
              >
                <InputField>
                  <InputFieldTitle>
                    Input {parameters.input_name !== '' ? parameters.input_name : 'Pré-requisitos'}
                  </InputFieldTitle>
                  <WrapperEditor
                    value={taskInputs?.copywriting_description}
                    mentionData={[]}
                    handleOnDescription={(value: any) =>
                      handleInputs('copywriting_description', value)
                    }
                  />
                </InputField>

                <InputField style={{ marginBottom: '16px' }}>
                  <InputFieldTitle>Input Atividade / Criação</InputFieldTitle>
                  <WrapperEditor
                    value={taskInputs?.creation_description}
                    mentionData={[]}
                    handleOnDescription={(value: any) =>
                      handleInputs('creation_description', value)
                    }
                  />
                </InputField>
              </div>
              <FooterSection>
                <ButtonDefault
                  typeButton="lightWhite"
                  isOutline
                  onClick={() => navigate('/minhas-tarefas')}
                >
                  Descartar
                </ButtonDefault>
                <ButtonDefault typeButton="primary" onClick={handleSaveInputs}>
                  Salvar Inputs
                </ButtonDefault>
              </FooterSection>
            </>
          )}

        {selectedTab === 'Inputs' &&
          (productInfos.status === 'Concluida' ||
            !user.permissions.includes('jobs_tasks_execute')) && (
            <>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  marginBottom: '16px'
                }}
              >
                <InputField>
                  <InputFieldTitle>
                    Input {parameters.input_name !== '' ? parameters.input_name : 'Pré-requisitos'}
                  </InputFieldTitle>
                  <CardShowInputs>
                    <div
                      dangerouslySetInnerHTML={{ __html: taskInputs?.copywriting_description }}
                    />
                  </CardShowInputs>
                </InputField>

                <InputField style={{ marginBottom: '16px' }}>
                  <InputFieldTitle>Input Atividade / Criação</InputFieldTitle>
                  <CardShowInputs>
                    <div dangerouslySetInnerHTML={{ __html: taskInputs?.creation_description }} />
                  </CardShowInputs>
                </InputField>
              </div>
            </>
          )}

        {selectedTab === 'Redação' && (
          <>
            {user.permissions.includes('jobs_tasks_essay') &&
            productInfos.status !== 'Concluida' ? (
              <EssayField>
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
              </EssayField>
            ) : (
              <EssayInfo>
                <div dangerouslySetInnerHTML={{ __html: essayInfo }} />
              </EssayInfo>
            )}
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
                  {Number(message.user_id) !== user.user_id && (
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
                          {message.user_id !== '1' && (
                            <Alert
                              title="Atenção"
                              subtitle="Certeza que gostaria de deletar este comentário? Ao excluir esta ação não poderá ser desfeita."
                              confirmButton={() => handleDeleteComment(message.task_comment_id)}
                            >
                              <div className="delete">
                                <BiTrash />
                              </div>
                            </Alert>
                          )}
                        </UserMessageInfo>
                        <UserMessage>{message.comment}</UserMessage>
                      </MessageInfos>
                    </>
                  )}
                  {Number(message.user_id) === user.user_id && (
                    <>
                      <MessageInfos
                        className={Number(message.user_id) === user.user_id ? 'left' : ''}
                      >
                        <UserMessageInfo>
                          <div className="user-name">{message.name}</div>
                          <div className="date-message">{moment(message.created).fromNow()}</div>
                          <Alert
                            title="Atenção"
                            subtitle="Certeza que gostaria de deletar este comentário? Ao excluir esta ação não poderá ser desfeita."
                            confirmButton={() => handleDeleteComment(message.task_comment_id)}
                          >
                            <div className="delete">
                              <BiTrash />
                            </div>
                          </Alert>
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
            {!logIsOn && productInfos.status !== 'Concluida' && (
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
                    <th>File ID</th>
                    <th>Produto ID</th>
                    <th>Nome do produto</th>
                    <th>Nome do arquivo</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {taskFiles && taskFiles?.length > 0 ? (
                    taskFiles?.map((row: FilesMap, index: number) => (
                      <tr key={row.task_file_id}>
                        <td>
                          <div className="id-column">
                            #{String(row.task_file_id).padStart(2, '0')}
                          </div>
                        </td>
                        <td>
                          {row.products_delivery_id !== '' ? row.products_delivery_id : '-----'}
                        </td>
                        <td>{productsNames[index]}</td>
                        <td>
                          {row.original_name !== ''
                            ? row.original_name
                            : row.file_name.split('-').pop()}
                        </td>
                        <td style={{ textTransform: 'capitalize' }}>
                          {moment(row.created).format('DD/MM/YYYY')}
                        </td>
                        <td>
                          {row.products_delivery_id !== '' ? (
                            <StatusTable
                              className={
                                row.status === 'fail'
                                  ? 'status reject'
                                  : row.status === 'pass'
                                  ? 'status accept'
                                  : row.status === ''
                                  ? ''
                                  : 'status'
                              }
                            >
                              {row.status === 'fail'
                                ? 'Reprovado'
                                : row.status === 'pass'
                                ? 'Aprovado'
                                : row.status === 'await' || row.status === 'wait'
                                ? 'Aguardando aprovação'
                                : ''}
                            </StatusTable>
                          ) : (
                            '-----'
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {row.status === 'fail' && (
                              <InfoFile
                                onClick={() =>
                                  setModalRejectedInfo({
                                    isOpen: true,
                                    motive: row.products_delivery_id
                                  })
                                }
                              >
                                <BsChatText size={20} />
                              </InfoFile>
                            )}

                            <ButtonIcon
                              className="view"
                              onClick={() =>
                                setPreviewImage({
                                  isOpen: true,
                                  imageInfos: {
                                    bucket: row.bucket,
                                    created: row.created,
                                    file_name: row.file_name,
                                    original_name: row.original_name,
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
                            </ButtonIcon>

                            <ButtonIcon className="download" onClick={() => downloadFile(row)}>
                              <FaDownload />
                            </ButtonIcon>

                            <Alert
                              title="Atenção"
                              subtitle="Certeza que gostaria de deletar este arquivo? Ao excluir esta ação não poderá ser desfeita."
                              confirmButton={() => handleDeleteFile(row.task_id)}
                            >
                              <ButtonTable typeButton="delete" />
                            </Alert>
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
                  ) : (
                    <tr>
                      <td colSpan={8}>Sem arquivos</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Table>
          </FilesTableWrapper>
        )}

        {selectedTab === 'Alterações' && (
          <CardChangesWrapper>
            <div className="title-card">
              Alterações:{' '}
              <div className="change-number">
                {returnReasons && returnReasons?.length > 0 ? returnReasons?.length : 0}
              </div>
            </div>

            {returnReasons?.map((row: ReturnReasons) => (
              <CardChangeInfos key={row.task_return_id}>
                <div className="top-info">
                  <div className="field-names">
                    Tipo da alteração: <span>{row.return_type}</span>
                  </div>
                </div>

                <div className="top-infos">
                  <div className="field-names">
                    Etapa que estava:{' '}
                    <span>
                      {findCardNameByStep(
                        timelineData ? timelineData?.steps : [],
                        row?.current_step
                      )}
                    </span>
                  </div>
                  <div className="field-names">
                    Data/hora: <span>{moment(row.created).format('DD/MM/YYYY - HH:mm')}h</span>
                  </div>
                  {/* <div className="field-names">
                    Etapa que retornou: <span>{row.step}</span>
                  </div> */}
                </div>

                <div className="top-infos">
                  <div className="field-names">
                    Quem solicitou:{' '}
                    <span>{row.requester_name === 'Sistema' ? 'Cliente' : row.returner_name}</span>
                  </div>
                  {/* <div className="field-names">
                    Etapa que retornou: <span>{row.step}</span>
                  </div> */}
                  <div className="field-names">
                    Para quem retornou: <span>{row.requester_name}</span>
                  </div>
                </div>

                <div className="field-names">
                  Motivo:{' '}
                  <span>
                    <div dangerouslySetInnerHTML={{ __html: row.reason }} />
                  </span>
                </div>
              </CardChangeInfos>
            ))}
          </CardChangesWrapper>
        )}
      </WorkSection>

      {/* Modal upload to approve */}
      <ModalDefault
        isOpen={modalUpload}
        onOpenChange={() => setModalUpload(false)}
        title="Upload de arquivo"
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

          {/* <div className="select-product">Para qual produto?</div> */}

          <div className="modal-buttons">
            <ButtonDefault typeButton="lightWhite" isOutline onClick={() => setModalUpload(false)}>
              Cancelar
            </ButtonDefault>
            <ButtonDefault loading={loading} typeButton="primary" onClick={handleSaveUpload}>
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
            <UploadFinalFile
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={taskTenant}
              isDisabed={!taskTenant}
              loading={loading}
              setLoading={setLoading}
              folderInfo="tasks"
              taskId={taskId ? taskId : '0'}
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

              <ButtonDefault loading={loading} typeButton="primary" onClick={handleSaveUploadFinal}>
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

              <ButtonDefault
                loading={loading}
                typeButton="primary"
                onClick={handleSaveUploadClient}
              >
                Salvar
              </ButtonDefault>
            </div>
          )}
        </ModalUploadWrapper>
      </ModalDefault>

      {/* Modal to preview image */}
      <ModalDefault
        isOpen={previewImage.isOpen}
        title={previewImage.imageInfos.original_name}
        onOpenChange={() =>
          setPreviewImage({
            isOpen: false,
            imageInfos: {
              bucket: '',
              created: '',
              file_name: '',
              original_name: '',
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
            <ImageWrapper
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
                      original_name: '',
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
            </ImageWrapper>
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

      {/* Modal rejected info */}
      <ModalDefault
        isOpen={modalRejectedInfo.isOpen}
        onOpenChange={() => setModalRejectedInfo({ isOpen: false })}
        title="Motivo da reprovação"
      >
        <MotiveInfos>
          <div dangerouslySetInnerHTML={{ __html: motiveReject[0]?.fail_reason }} />

          <div className="buttons" onClick={() => setModalRejectedInfo({ isOpen: false })}>
            <ButtonDefault typeButton="primary">Fechar</ButtonDefault>
          </div>
        </MotiveInfos>
      </ModalDefault>

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading} />
    </ContainerDefault>
  );
}
