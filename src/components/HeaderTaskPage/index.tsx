/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Icons
import { IconArrowLeft } from '../../assets/icons';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { MdOutlineChangeCircle } from 'react-icons/md';

// Components
import ButtonDefault from '../Buttons/ButtonDefault';

// Styles
import {
  AvatarButton,
  BackButton,
  Container,
  HeaderProductInfos,
  HeaderTitleInfos,
  RightButtons,
  RightSideHeader,
  TitleBottomInfos,
  TitleProductInfos,
  TitleTopInfos
} from './styles';

// Libraries
import moment from 'moment';
import AvatarDefault from '../Ui/Avatar/avatarDefault';

interface HeaderTaskProps {
  title: TitleProps;
  product: ProductsProps;
  avatar_infos: UserAvatarProps;
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
  client_task: string;
  typeTask: string;
  contract_task: string;
  creator_user: string;
  creator_time: string;
}

interface ProductsProps {
  title: string;
  description: string;
  id: any;
  size: string;
  type: string;
  reason_change: string;
}

interface UserAvatarProps {
  name: string;
  avatar: string;
}

interface StepProps {
  step: string;
  name: string;
}

export default function HeaderOpenTask({
  title,
  product,
  backPage,
  goBack,
  buttonType,
  disableButton,
  sendToNext,
  nextStepInfo,
  isInsideProduct,
  backToDelivery,
  backFlow,
  hideButtonNext,
  avatar_infos
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
              | {title.titleTask}
              {/* - {title.monthTask} */}
            </div>
          </TitleTopInfos>
          <TitleBottomInfos>
            {title.client_task} / {title.typeTask} | {title.contract_task}
          </TitleBottomInfos>
          <TitleBottomInfos>
            <div className="user-infos">
              Criado por: {title.creator_user} -{' '}
              {moment(title.creator_time).format('DD/MM/YYYY - HH:mm')}h
            </div>
          </TitleBottomInfos>
        </HeaderTitleInfos>

        {product.title !== '' && (
          <HeaderProductInfos>
            <TitleProductInfos>
              <div className="product-name">
                #{product.id} | {product.title} -
              </div>
              <div className="product-description">{product.description}</div>
            </TitleProductInfos>
            <TitleBottomInfos>
              {product.size} | {product.type}
            </TitleBottomInfos>
            <TitleBottomInfos>{product.reason_change}</TitleBottomInfos>
          </HeaderProductInfos>
        )}

        {avatar_infos.name !== '' && (
          <AvatarButton>
            <AvatarDefault url={avatar_infos.avatar} name={avatar_infos.name} />

            <div className="change-user">
              <MdOutlineChangeCircle />
            </div>
          </AvatarButton>
        )}

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
