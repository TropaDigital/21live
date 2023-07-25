/* eslint-disable import-helpers/order-imports */
// React
import { Link } from 'react-router-dom';

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
  RightSideHeader,
  TitleBottomInfos,
  TitleTopInfos
} from './styles';

interface HeaderTaskProps {
  title: TitleProps;
  backPage?: string;
  buttonType?: 'finish' | 'send';
  disableButton?: boolean;
  sendToNext?: () => void;
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

export default function HeaderOpenTask({
  title,
  backPage,
  buttonType,
  disableButton,
  sendToNext
}: HeaderTaskProps) {
  return (
    <Container>
      <Link to={backPage ? backPage : '/dashboard'}>
        <BackButton>
          <IconArrowLeft />
          Voltar
        </BackButton>
      </Link>

      <RightSideHeader>
        <HeaderTitleInfos>
          <TitleTopInfos>
            <div className="id">#{String(title.idNumber).padStart(5, '0')}</div>
            <div className="task-name">
              | {String(title.numberTask).padStart(3, '0')} - {title.titleTask}
              {/* - {title.monthTask} */}
            </div>
          </TitleTopInfos>
          <TitleBottomInfos>
            {title.client_task} / {title.typeTask} | {title.contract_task}
          </TitleBottomInfos>
        </HeaderTitleInfos>

        {disableButton && buttonType === 'send' && (
          <ButtonDefault typeButton="blocked">
            Enviar tarefa para revisão
            <HiOutlineArrowRight />
          </ButtonDefault>
        )}
        {!disableButton && buttonType === 'send' && (
          <ButtonDefault typeButton="secondary" onClick={sendToNext}>
            Enviar tarefa para revisão
            <HiOutlineArrowRight />
          </ButtonDefault>
        )}
        {disableButton && buttonType === 'finish' && (
          <ButtonDefault typeButton="blocked">
            Marcar entrega como concluída
            <HiOutlineArrowRight />
          </ButtonDefault>
        )}
        {!disableButton && buttonType === 'finish' && (
          <ButtonDefault typeButton="secondary" onClick={sendToNext}>
            Marcar entrega como concluída
            <HiOutlineArrowRight />
          </ButtonDefault>
        )}
      </RightSideHeader>
    </Container>
  );
}
