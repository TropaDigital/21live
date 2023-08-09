/* eslint-disable import-helpers/order-imports */
//  React
import { useState } from 'react';

// Styles
import HeaderRequest from '../../../components/HeaderRequestPage';
import { ContainerDefault } from '../../../components/UiElements/styles';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';

// Icons
import { BiInfoCircle, BiPlus } from 'react-icons/bi';
import { BsImage, BsQuestionCircle } from 'react-icons/bs';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineClock } from 'react-icons/hi';
import { FaRegCommentAlt } from 'react-icons/fa';

// Styles
import {
  BottomCardTitle,
  PublicInteraction,
  PublicTopCard,
  RequestBottomCard,
  RequestInfoTitle,
  RequestInfos,
  RequestInfosCard,
  RequestInfosTop,
  ViewRequestWrapper
} from './styles';

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

            <RequestBottomCard
              height={selectedCardInfo === 'info' ? true : false}
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
            </RequestBottomCard>

            <RequestBottomCard
              height={selectedCardInfo === 'img' ? true : false}
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

            <RequestBottomCard
              height={selectedCardInfo === 'clock' ? true : false}
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
        </PublicInteraction>
      </ViewRequestWrapper>
    </ContainerDefault>
  );
}
