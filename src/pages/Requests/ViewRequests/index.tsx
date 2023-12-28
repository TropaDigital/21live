/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import-helpers/order-imports */
//  React
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import HeaderRequest from '../../../components/HeaderRequestPage';
import { ContainerDefault } from '../../../components/UiElements/styles';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import WrapperEditor from '../../../components/WrapperEditor';
import Loader from '../../../components/LoaderSpin';
import AvatarDefault from '../../../components/Ui/Avatar/avatarDefault';

// Icons
import { BiInfoCircle, BiPlus, BiX } from 'react-icons/bi';
import { BsImage, BsQuestionCircle, BsReply } from 'react-icons/bs';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineClock } from 'react-icons/hi';
import { FaDownload, FaRegCommentAlt, FaSearchPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { IoIosChatbubbles } from 'react-icons/io';

// Styles
import {
  AvatarUser,
  BottomCardHistory,
  BottomCardImages,
  BottomCardInfoSide,
  BottomCardInfos,
  BottomCardTitle,
  ClockTimeInfo,
  DownloadIconBtn,
  HoverIconButton,
  ImageCard,
  ImagesWrapper,
  InfoSideCard,
  MessageReplyInfos,
  MessageResponseDate,
  MessageUser,
  MessageUserWrapper,
  ModalImage,
  ModalInteractionHeader,
  ModalInteractionWrapper,
  ModalMessageInfo,
  PublicBottomCard,
  PublicImageWrapper,
  PublicInteraction,
  PublicMessage,
  PublicMessageImage,
  PublicMessageWrapper,
  PublicTopCard,
  RequestBottomCard,
  RequestInfoTitle,
  RequestInfos,
  RequestInfosCard,
  RequestInfosTop,
  ResponseButton,
  ViewRequestWrapper
} from './styles';

// Libraries
import moment from 'moment';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

// Services
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/AuthContext';

interface TicketProps {
  ticket_id: string;
  tenant_id: string;
  ticket_cat_id: string;
  ticket_status_id: string;
  user_id: string;
  organization_id: string;
  media_id: string;
  title: string;
  width: string;
  height: string;
  info: string;
  target: string;
  obs: string;
  file_format: string;
  workminutes: string;
  deadline: string;
  created: string;
  updated: string;
  finished: string;
  tenant_name: string;
  user_name: string;
  status: string;
  organization_name: string;
  media_name: string;
  measure: string;
  value: string;
  media_cat_id: string;
  midia_cat_title: string;
  files: [
    {
      ticket_file_id: string;
      path: string;
    }
  ];
  interactions: [];
  fields: [];
}

interface InteractionProps {
  access: string;
  annex: string;
  annex_title: string;
  avatar: string;
  created: string;
  message: string;
  reply_id: string;
  status: string;
  ticket_id: string;
  ticket_interaction_id: string;
  updated: string;
  user_id: string;
  user_name: string;
}

interface ModalProps {
  isOpen: boolean;
  path: string;
}

interface ModalInteractionProps {
  isOpen: boolean;
  ticketAnswearId: string;
  title: string;
  previousTicketInfo?: InteractionProps;
}

interface NewInteractionProps {
  ticket_id: string | undefined;
  message: string;
  annex: string;
  reply_id: string | undefined;
}

export default function ViewRequest() {
  const location = useLocation();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCardInfo, setSelectedCardInfo] = useState<string>('');
  const [requestData, setRequestData] = useState<TicketProps>();
  const [modalImage, setModalImage] = useState<ModalProps>({
    isOpen: false,
    path: ''
  });
  const [modalNewInteraction, setModalNewInteraction] = useState<ModalInteractionProps>({
    isOpen: false,
    ticketAnswearId: '',
    title: '',
    previousTicketInfo: {
      access: '',
      annex: '',
      annex_title: '',
      avatar: '',
      created: '',
      message: '',
      reply_id: '',
      status: '',
      ticket_id: '',
      ticket_interaction_id: '',
      updated: '',
      user_id: '',
      user_name: ''
    }
  });
  // const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [newInteractionMessage, setNewInteractionMessage] = useState<string>('');

  const titleData = {
    idNumber: requestData ? requestData?.ticket_id : '',
    titleRequest: requestData ? requestData?.title : ''
  };

  async function getTicketInfos(ticketId: string) {
    try {
      setLoading(true);

      const response = await api.get(`/ticket?id=${ticketId}`);

      if (response.data.result.length > 0) {
        setRequestData(response.data.result[0]);
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log do error getting ticket', error);

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

  useEffect(() => {
    getTicketInfos(location.state);
  }, [location]);

  async function handleSubmit() {
    try {
      const newInteraction: NewInteractionProps = {
        ticket_id: requestData?.ticket_id,
        message: newInteractionMessage,
        annex: '',
        reply_id:
          modalNewInteraction.ticketAnswearId !== '' ? modalNewInteraction.ticketAnswearId : ''
      };

      if (newInteraction.reply_id === '') {
        delete newInteraction.reply_id;
      }

      setLoading(true);
      const response = await api.post(`/ticket-interactions`, newInteraction);

      if (response.data.status === 'success') {
        addToast({
          title: 'Sucesso',
          type: 'success',
          description: 'Interação criada com sucesso.'
        });

        setModalNewInteraction({
          isOpen: false,
          ticketAnswearId: '',
          title: '',
          previousTicketInfo: {
            access: '',
            annex: '',
            annex_title: '',
            avatar: '',
            created: '',
            message: '',
            reply_id: '',
            status: '',
            ticket_id: '',
            ticket_interaction_id: '',
            updated: '',
            user_id: '',
            user_name: ''
          }
        });
        setNewInteractionMessage('');
        if (requestData) {
          getTicketInfos(requestData.ticket_id);
        }
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log do error submit new interaction', error);
      // if (error.response.data.result.length !== 0) {
      //   error.response.data.result.map((row: any) => {
      //     addToast({
      //       title: 'Atenção',
      //       description: row.error,
      //       type: 'warning'
      //     });
      //   });
      // } else {
      //   addToast({
      //     title: 'Atenção',
      //     description: error.response.data.message,
      //     type: 'danger'
      //   });
      // }
      setLoading(false);
    }
  }

  const ticketInfos = {
    tenant_id: requestData?.tenant_id,
    ticket_id: requestData?.ticket_id,
    title: requestData?.title
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

  // console.log('log do location on view requests', location.state);

  return (
    <ContainerDefault>
      {loading && <Loader />}

      {!loading && (
        <>
          <HeaderRequest title={titleData} ticketInfos={ticketInfos} />

          <ViewRequestWrapper>
            <RequestInfosCard>
              <RequestInfoTitle>
                <BiInfoCircle />
                Informações da solicitação
              </RequestInfoTitle>

              <RequestInfos>
                <RequestInfosTop>
                  <div className="request-name">
                    {requestData?.title}
                    <span>(#{requestData?.ticket_id})</span>
                  </div>

                  <div className="request-status">
                    Status:
                    <div
                      className={
                        requestData?.status === 'progress'
                          ? 'status progress'
                          : requestData?.status === 'Entregue'
                          ? 'status finished'
                          : 'status'
                      }
                    >
                      {requestData?.status}
                    </div>
                  </div>

                  <div className="request-date">
                    Data de criação:
                    {/* <span>03/08/2023 14:53:00</span> */}
                    <span>{moment(requestData?.created).format('DD/MM/YYYY  HH:mm:ss')}</span>
                  </div>
                </RequestInfosTop>
                {/* More infos */}
                <RequestBottomCard
                  showInfos={selectedCardInfo === 'info' ? true : false}
                  onClick={() => setSelectedCardInfo(selectedCardInfo === 'info' ? '' : 'info')}
                >
                  <BottomCardTitle>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BsQuestionCircle />
                      Mais informações
                    </div>
                    {selectedCardInfo !== 'info' ? (
                      <div>
                        <FiChevronDown />
                      </div>
                    ) : (
                      <div>
                        <FiChevronUp />
                      </div>
                    )}
                  </BottomCardTitle>

                  <BottomCardInfos>
                    <BottomCardInfoSide>
                      <InfoSideCard>
                        <div className="side-title">Formato da peça solicitada:</div>
                        <div className="side-info">{requestData?.media_name}</div>
                      </InfoSideCard>
                      {requestData?.height !== '' && requestData?.width !== '' && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '120px'
                          }}
                        >
                          <InfoSideCard>
                            <div className="side-title">Largura:</div>
                            <div className="side-info">
                              {requestData?.width} {requestData?.measure}
                            </div>
                          </InfoSideCard>

                          <InfoSideCard>
                            <div className="side-title">Altura:</div>
                            <div className="side-info">
                              {requestData?.height} {requestData?.measure}
                            </div>
                          </InfoSideCard>
                        </div>
                      )}

                      <InfoSideCard>
                        <div className="side-title">Informações que devem estar na peça:</div>
                        <div
                          className="side-info"
                          dangerouslySetInnerHTML={{
                            __html: requestData?.info ? requestData?.info : ''
                          }}
                        />
                      </InfoSideCard>

                      {requestData?.target !== '' && (
                        <InfoSideCard>
                          <div className="side-title">
                            Objetivo a ser atingido com essa solicitação:
                          </div>
                          <div className="side-info">{requestData?.target}</div>
                        </InfoSideCard>
                      )}

                      {requestData?.obs !== '' && (
                        <InfoSideCard>
                          <div className="side-title">Informações Extras e Observações:</div>
                          <div
                            className="side-info"
                            dangerouslySetInnerHTML={{
                              __html: requestData?.obs ? requestData?.obs : ''
                            }}
                          />
                        </InfoSideCard>
                      )}

                      {requestData?.file_format !== '' && (
                        <InfoSideCard>
                          <div className="side-title">Formato de Arquivo:</div>
                          <div className="side-info">{requestData?.file_format}</div>
                        </InfoSideCard>
                      )}

                      {/* Aqui preciso descobrir o campo do brinde para verificação */}
                      {/* <InfoSideCard>
                        <div className="side-title">Brinde:</div>
                        <div className="side-info">Nenhum</div>
                      </InfoSideCard> */}
                    </BottomCardInfoSide>

                    <BottomCardInfoSide>
                      <InfoSideCard>
                        <div className="side-title">Usuário:</div>
                        <div className="side-info">{requestData?.user_name}</div>
                      </InfoSideCard>

                      <InfoSideCard>
                        <div className="side-title">Unidade:</div>
                        <div className="side-info">
                          {requestData?.organization_name !== ''
                            ? requestData?.organization_name
                            : '(unidade não encontrada)'}
                        </div>
                      </InfoSideCard>
                    </BottomCardInfoSide>
                  </BottomCardInfos>
                </RequestBottomCard>

                {/* Images of ref */}
                <RequestBottomCard showInfos={selectedCardInfo === 'img' ? true : false}>
                  <BottomCardTitle
                    onClick={() => setSelectedCardInfo(selectedCardInfo === 'img' ? '' : 'img')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BsImage />
                      Imagens de referência
                    </div>
                    {selectedCardInfo !== 'img' ? (
                      <div>
                        <FiChevronDown />
                      </div>
                    ) : (
                      <div>
                        <FiChevronUp />
                      </div>
                    )}
                  </BottomCardTitle>
                  {requestData?.files !== undefined && requestData?.files.length > 0 && (
                    <BottomCardImages>
                      <ImagesWrapper>
                        {requestData?.files.map((row: any, index: number) => (
                          <ImageCard key={index}>
                            <DownloadIconBtn>{/* <FaDownload /> */}</DownloadIconBtn>
                            <div
                              className="image"
                              style={{
                                backgroundImage: `url(https://app.21live.com.br/public/files/tickets/${requestData.ticket_id}/${row.path})`
                              }}
                            ></div>
                            <HoverIconButton
                              onClick={() => setModalImage({ isOpen: true, path: row.path })}
                            >
                              <FaSearchPlus />
                            </HoverIconButton>
                          </ImageCard>
                        ))}
                      </ImagesWrapper>
                    </BottomCardImages>
                  )}
                </RequestBottomCard>

                {/* history */}
                <RequestBottomCard
                  showInfos={selectedCardInfo === 'clock' ? true : false}
                  onClick={() => setSelectedCardInfo(selectedCardInfo === 'clock' ? '' : 'clock')}
                >
                  <BottomCardTitle>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <HiOutlineClock />
                      Histórico
                    </div>
                    {selectedCardInfo !== 'clock' ? (
                      <div>
                        <FiChevronDown />
                      </div>
                    ) : (
                      <div>
                        <FiChevronUp />
                      </div>
                    )}
                  </BottomCardTitle>

                  <BottomCardHistory showInfos={selectedCardInfo === 'clock' ? true : false}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00BC84'
                      }}
                    >
                      <BiPlus />
                    </div>
                    <div>
                      Criado em {moment(requestData?.created).format('HH:mm:ss DD/MM/YYYY')} por{' '}
                      {requestData?.user_name.split(' ')[0]}
                    </div>
                    <span>@{requestData?.tenant_name}</span>
                  </BottomCardHistory>
                </RequestBottomCard>
              </RequestInfos>
            </RequestInfosCard>

            <PublicInteraction>
              <PublicTopCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaRegCommentAlt />
                  Interações públicas
                </div>

                <ButtonDefault
                  typeButton="secondary"
                  onClick={() =>
                    setModalNewInteraction({
                      isOpen: true,
                      ticketAnswearId: '',
                      title: 'Nova interação'
                    })
                  }
                >
                  <BiPlus />
                  Nova interação
                </ButtonDefault>
              </PublicTopCard>

              <PublicBottomCard>
                {requestData?.interactions !== undefined &&
                  requestData?.interactions.length > 0 &&
                  requestData.interactions.map((row: InteractionProps) => (
                    <PublicMessageWrapper key={row.ticket_interaction_id}>
                      {row.reply_id !== '' && (
                        <MessageReplyInfos>
                          <div className="response-user">
                            Em resposta à interação #{row.reply_id}
                          </div>
                        </MessageReplyInfos>
                      )}
                      <MessageUserWrapper
                        className={row.user_id !== String(user.user_id) ? 'reverse' : ''}
                      >
                        <PublicMessageImage
                          className={row.user_id !== String(user.user_id) ? 'reverse' : ''}
                        >
                          {row.annex !== '' && row.annex.split('.')[1] !== 'pptx' && (
                            <PublicImageWrapper>
                              <MessageUserWrapper
                                style={{
                                  backgroundImage: `url(https://app.21live.com.br/public/files/tickets/${requestData?.ticket_id}/${row.annex})`
                                }}
                                className="image-interaction"
                                onClick={() => setModalImage({ isOpen: true, path: row.annex })}
                              />
                            </PublicImageWrapper>
                          )}
                          {row.annex !== '' && row.annex.split('.')[1] === 'pptx' && (
                            <DocViewer
                              documents={[
                                {
                                  uri: `https://app.21live.com.br/public/files/tickets/${requestData?.ticket_id}/${row.annex}`,
                                  fileType: 'pptx'
                                }
                              ]}
                            />
                          )}
                          <PublicMessage
                            className={row.user_id !== String(user.user_id) ? 'reverse' : ''}
                          >
                            <div className="message-user">
                              {row.user_name} <span>- Interação: #{row.ticket_interaction_id}</span>
                            </div>
                            <div
                              className="message-body"
                              dangerouslySetInnerHTML={{ __html: row.message }}
                            />
                          </PublicMessage>
                        </PublicMessageImage>

                        <MessageUser
                          className={row.user_id !== String(user.user_id) ? 'reverse' : ''}
                        >
                          <MessageResponseDate>
                            <ResponseButton
                              onClick={() =>
                                setModalNewInteraction({
                                  isOpen: true,
                                  ticketAnswearId: row.ticket_interaction_id,
                                  title: 'Responder interação',
                                  previousTicketInfo: row
                                })
                              }
                            >
                              <BsReply />
                              Responder
                            </ResponseButton>

                            <ClockTimeInfo>
                              <HiOutlineClock />
                              {moment(row.created).fromNow()}
                            </ClockTimeInfo>
                          </MessageResponseDate>
                          {row.avatar !== '' ? (
                            <AvatarUser
                              style={{
                                backgroundImage: `url(https://app.21live.com.br/public/files/user/${row.avatar})`
                              }}
                            />
                          ) : (
                            <AvatarDefault
                              url={row.avatar}
                              name={row.user_name ? row.user_name : 'N U'}
                            />
                          )}
                        </MessageUser>
                      </MessageUserWrapper>
                    </PublicMessageWrapper>
                  ))}
              </PublicBottomCard>
            </PublicInteraction>
          </ViewRequestWrapper>
        </>
      )}

      {/* Modal image preview */}
      <ModalDefault
        isOpen={modalImage.isOpen}
        title={'Image'}
        onOpenChange={() => setModalImage({ isOpen: false, path: '' })}
        maxWidth="80%"
      >
        <ModalImage
          style={{
            backgroundImage: `url(https://app.21live.com.br/public/files/tickets/${requestData?.ticket_id}/${modalImage.path})`
          }}
        >
          <div className="close-button" onClick={() => setModalImage({ isOpen: false, path: '' })}>
            <MdClose />
          </div>
        </ModalImage>
      </ModalDefault>

      {/* Modal interaction */}
      <ModalDefault
        isOpen={modalNewInteraction.isOpen}
        onOpenChange={() =>
          setModalNewInteraction({
            isOpen: false,
            ticketAnswearId: '',
            title: '',
            previousTicketInfo: {
              access: '',
              annex: '',
              annex_title: '',
              avatar: '',
              created: '',
              message: '',
              reply_id: '',
              status: '',
              ticket_id: '',
              ticket_interaction_id: '',
              updated: '',
              user_id: '',
              user_name: ''
            }
          })
        }
      >
        <ModalInteractionWrapper>
          <ModalInteractionHeader>
            {modalNewInteraction.title === 'Nova interação' && (
              <div className="header-title">
                <IoIosChatbubbles />
                Nova interação - Ticket #{requestData?.ticket_id} - {requestData?.title}
              </div>
            )}

            {modalNewInteraction.title === 'Responder interação' && (
              <div className="header-title">
                <IoIosChatbubbles />
                Responder interação - Interação #
                {modalNewInteraction.previousTicketInfo?.ticket_interaction_id} -{' '}
                <strong style={{ textTransform: 'capitalize' }}>
                  {modalNewInteraction.previousTicketInfo?.user_name}
                </strong>
              </div>
            )}

            <div
              className="close-button"
              onClick={() =>
                setModalNewInteraction({
                  isOpen: false,
                  ticketAnswearId: '',
                  title: '',
                  previousTicketInfo: {
                    access: '',
                    annex: '',
                    annex_title: '',
                    avatar: '',
                    created: '',
                    message: '',
                    reply_id: '',
                    status: '',
                    ticket_id: '',
                    ticket_interaction_id: '',
                    updated: '',
                    user_id: '',
                    user_name: ''
                  }
                })
              }
            >
              <BiX size={30} />
            </div>
          </ModalInteractionHeader>

          <ModalMessageInfo>
            <WrapperEditor
              mentionData={[]}
              value={newInteractionMessage}
              handleOnDescription={(value: any) => setNewInteractionMessage(value)}
            />
          </ModalMessageInfo>

          {/* <UploadFiles
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            tenant={7}
            isDisabed={false}
            folderInfo="requests"
            loading={loading}
            setLoading={setLoading}
          /> */}

          <ButtonDefault typeButton="primary" onClick={() => handleSubmit()}>
            Salvar
          </ButtonDefault>
        </ModalInteractionWrapper>
      </ModalDefault>
    </ContainerDefault>
  );
}
