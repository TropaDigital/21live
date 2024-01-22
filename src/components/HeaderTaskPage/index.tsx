/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Icons
import { IconArrowLeft } from '../../assets/icons';
import { HiOutlineArrowRight } from 'react-icons/hi';

// Components
import ButtonDefault from '../Buttons/ButtonDefault';

// Styles
import {
  BackButton,
  Container,
  HeaderTitleInfos,
  RightButtons,
  RightSideHeader,
  TitleBottomInfos,
  TitleTopInfos
} from './styles';

interface HeaderTaskProps {
  title: TitleProps;
  backPage?: string;
  goBack?: boolean;
  buttonType?: 'finish' | 'send' | 'client';
  disableButton?: boolean;
  sendToNext?: () => void;
  nextStepInfo?: any;
  isInsideProduct?: boolean;
  backToDelivery?: () => void;
  hideButtonNext?: boolean;
  backFlow: () => void;
}

interface TitleProps {
  idNumber: string;
  numberTask: string;
  titleTask: string;
  monthTask: string;
  client_task: string;
  typeTask: string;
  quantityTask: string;
  contract_task: string;
}

interface StepProps {
  step: string;
  name: string;
}

export default function HeaderOpenTask({
  title,
  backPage,
  goBack,
  buttonType,
  disableButton,
  sendToNext,
  nextStepInfo,
  isInsideProduct,
  backToDelivery,
  backFlow,
  hideButtonNext
}: HeaderTaskProps) {
  const navigate = useNavigate();
  const [nextSteps, setNextSteps] = useState<StepProps>({
    name: '',
    step: ''
  });

  useEffect(() => {
    setNextSteps(nextStepInfo?.steps?.find((obj: any) => obj.step > nextStepInfo.currentStep));
  }, [nextStepInfo]);

  return (
    <Container>
      {!goBack && (
        <Link to={backPage ? backPage : '/dashboard'}>
          <BackButton>
            <IconArrowLeft />
            Voltar
          </BackButton>
        </Link>
      )}
      {goBack && !isInsideProduct && (
        <BackButton onClick={() => navigate(-1)}>
          <IconArrowLeft />
          Voltar
        </BackButton>
      )}
      {goBack && isInsideProduct && (
        <BackButton onClick={backToDelivery}>
          <IconArrowLeft />
          Voltar
        </BackButton>
      )}

      <RightSideHeader>
        <HeaderTitleInfos>
          <TitleTopInfos>
            <div className="id">#{String(title.idNumber).padStart(5, '0')}</div>
            <div className="task-name">
              | {title.numberTask !== '' ? `${String(title.numberTask).padStart(2, '0')} - ` : ''}
              {title.titleTask}
              {/* - {title.monthTask} */}
            </div>
          </TitleTopInfos>
          <TitleBottomInfos>
            {title.client_task} / {title.typeTask} | {title.contract_task}
          </TitleBottomInfos>
        </HeaderTitleInfos>

        <RightButtons>
          {!hideButtonNext && nextStepInfo?.currentStep !== '1' && (
            <ButtonDefault typeButton="warning" isOutline onClick={backFlow}>
              Retornar etapa
            </ButtonDefault>
          )}

          {disableButton && buttonType === 'send' && !hideButtonNext && (
            <ButtonDefault typeButton="blocked">
              Enviar tarefa para{' '}
              {nextSteps?.name !== '' ? nextSteps?.name?.toLowerCase() : 'revisão'}
              <HiOutlineArrowRight />
            </ButtonDefault>
          )}
          {!disableButton && buttonType === 'send' && !hideButtonNext && (
            <ButtonDefault typeButton="secondary" onClick={sendToNext}>
              Enviar tarefa para{' '}
              {nextSteps?.name !== '' ? nextSteps?.name?.toLowerCase() : 'revisão'}
              <HiOutlineArrowRight />
            </ButtonDefault>
          )}
          {disableButton && buttonType === 'finish' && !hideButtonNext && (
            <ButtonDefault typeButton="blocked">
              Marcar entrega como concluída
              <HiOutlineArrowRight />
            </ButtonDefault>
          )}
          {!disableButton && buttonType === 'finish' && !hideButtonNext && (
            <ButtonDefault typeButton="secondary" onClick={sendToNext}>
              Marcar entrega como concluída
              <HiOutlineArrowRight />
            </ButtonDefault>
          )}
          {buttonType === 'client' && (
            <ButtonDefault typeButton="secondary" onClick={sendToNext}>
              Enviar arquivos para o cliente
              <HiOutlineArrowRight />
            </ButtonDefault>
          )}
        </RightButtons>
      </RightSideHeader>
    </Container>
  );
}
