/* eslint-disable import-helpers/order-imports */
//  React
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import HeaderRequest from '../../../components/HeaderRequestPage';
import { ContainerDefault } from '../../../components/UiElements/styles';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';

// Icons
import { BiInfoCircle, BiPlus } from 'react-icons/bi';
import { BsImage, BsQuestionCircle, BsReply } from 'react-icons/bs';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineClock } from 'react-icons/hi';
import { FaDownload, FaRegCommentAlt, FaSearchPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

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
  MessageResponseDate,
  MessageUser,
  ModalImage,
  PublicBottomCard,
  PublicInteraction,
  PublicMessage,
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

// Images
import PersonImg from '../../../assets/person.jpg';
import TestImage from '../../../assets/testImage.jpeg';

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

interface ModalProps {
  isOpen: boolean;
  path: string;
}

export default function ViewRequest() {
  const location = useLocation();
  const [selectedCardInfo, setSelectedCardInfo] = useState<string>('');
  const [requestData, setRequestData] = useState<TicketProps>();
  const [modalImage, setModalImage] = useState<ModalProps>({
    isOpen: false,
    path: ''
  });

  const titleData = {
    idNumber: location.state.ticket_id,
    titleRequest: location.state.title
  };

  useEffect(() => {
    setRequestData(location.state);
  }, [location]);

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
      <HeaderRequest title={titleData} />

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

                  <InfoSideCard>
                    <div className="side-title">Informações que devem estar na peça:</div>
                    <div className="side-info">{requestData?.info}</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Objetivo a ser atingido com essa solicitação:</div>
                    <div className="side-info">{requestData?.target}</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Informações Extras e Observações:</div>
                    <div className="side-info">{requestData?.obs ? requestData.obs : '----'}</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Formato de Arquivo:</div>
                    <div className="side-info">
                      {requestData?.file_format ? requestData?.file_format : '---'}
                    </div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Brinde:</div>
                    <div className="side-info">Nenhum</div>
                  </InfoSideCard>
                </BottomCardInfoSide>

                <BottomCardInfoSide>
                  <InfoSideCard>
                    <div className="side-title">Usuário:</div>
                    <div className="side-info">{requestData?.user_name}</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Unidade:</div>
                    <div className="side-info">{requestData?.organization_name}</div>
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
                        <DownloadIconBtn>
                          <FaDownload />
                        </DownloadIconBtn>
                        <div
                          className="image"
                          style={{ backgroundImage: `url(${row.path})` }}
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
                <div>Criado em 14:53:54 03/08/2023 por Usuário da Tropa Digital</div>
                <span>@tropa</span>
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

            <ButtonDefault typeButton="secondary">
              <BiPlus />
              Nova interação
            </ButtonDefault>
          </PublicTopCard>

          <PublicBottomCard>
            <PublicMessageWrapper>
              <PublicMessage>
                <div className="message-user">Usuário da msg</div>
                <div className="message-body">Teste de mensagem</div>
              </PublicMessage>
              <MessageUser>
                <MessageResponseDate>
                  <ResponseButton>
                    <BsReply />
                    Responder
                  </ResponseButton>

                  <ClockTimeInfo>
                    <HiOutlineClock />
                    {moment('2023/08/06').fromNow()}
                  </ClockTimeInfo>
                </MessageResponseDate>
                <AvatarUser style={{ backgroundImage: `url(${PersonImg})` }} />
              </MessageUser>
            </PublicMessageWrapper>
          </PublicBottomCard>
        </PublicInteraction>
      </ViewRequestWrapper>

      <ModalDefault
        isOpen={modalImage.isOpen}
        title={'Image'}
        onOpenChange={() => setModalImage({ isOpen: false, path: '' })}
        maxWidth="80%"
      >
        <ModalImage style={{ backgroundImage: `url(${TestImage})` }}>
          <div className="close-button" onClick={() => setModalImage({ isOpen: false, path: '' })}>
            <MdClose />
          </div>
        </ModalImage>
      </ModalDefault>
    </ContainerDefault>
  );
}
