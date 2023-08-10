/* eslint-disable import-helpers/order-imports */
//  React
import { useState } from 'react';

// Styles
import HeaderRequest from '../../../components/HeaderRequestPage';
import { ContainerDefault } from '../../../components/UiElements/styles';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';

// Icons
import { BiInfoCircle, BiPlus } from 'react-icons/bi';
import { BsImage, BsQuestionCircle, BsReply } from 'react-icons/bs';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineClock } from 'react-icons/hi';
import { FaRegCommentAlt } from 'react-icons/fa';

// Styles
import {
  AvatarUser,
  BottomCardHistory,
  BottomCardInfoSide,
  BottomCardInfos,
  BottomCardTitle,
  ClockTimeInfo,
  InfoSideCard,
  MessageResponseDate,
  MessageUser,
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
  ViewRequestWrapper
} from './styles';

// Libraries
import moment from 'moment';

// Images
import PersonImg from '../../../assets/person.jpg';

export default function ViewRequest() {
  const [selectedCardInfo, setSelectedCardInfo] = useState<string>('');

  const titleData = {
    idNumber: '8800',
    titleRequest: 'Arte para patrocínio'
  };

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
                Arte para patrocínio
                <span>(#8080)</span>
              </div>

              <div className="request-status">
                Status:
                <div className="status">Pendente</div>
              </div>

              <div className="request-date">
                Data de criação:
                <span>03/08/2023 14:53:00</span>
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
                    <div className="side-info">Post Facebook - Online</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Informações que devem estar na peça:</div>
                    <div className="side-info">Informações que devem estar na peça teste</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Objetivo a ser atingido com essa solicitação:</div>
                    <div className="side-info">Objetivo a ser atingido com essa solicitação</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Informações Extras e Observações:</div>
                    <div className="side-info">----</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Formato de Arquivo:</div>
                    <div className="side-info">JPG</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Brinde:</div>
                    <div className="side-info">Nenhum</div>
                  </InfoSideCard>
                </BottomCardInfoSide>

                <BottomCardInfoSide>
                  <InfoSideCard>
                    <div className="side-title">Usuário:</div>
                    <div className="side-info">Post Facebook - Online</div>
                  </InfoSideCard>

                  <InfoSideCard>
                    <div className="side-title">Unidade:</div>
                    <div className="side-info">Programação</div>
                  </InfoSideCard>
                </BottomCardInfoSide>
              </BottomCardInfos>
            </RequestBottomCard>

            {/* Images of ref */}
            <RequestBottomCard
              showInfos={selectedCardInfo === 'img' ? true : false}
              onClick={() => setSelectedCardInfo(selectedCardInfo === 'img' ? '' : 'img')}
            >
              <BottomCardTitle>
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
              <PublicMessage>Teste de mensagem</PublicMessage>
              <MessageUser>
                <MessageResponseDate>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BsReply />
                    Responder
                  </div>

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
    </ContainerDefault>
  );
}
