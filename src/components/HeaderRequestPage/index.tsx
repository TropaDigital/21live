/* eslint-disable import-helpers/order-imports */
// React
import { useNavigate } from 'react-router-dom';

// Icons
import { IconArrowLeft } from '../../assets/icons';
import { HiOutlineClipboard } from 'react-icons/hi';
import { BiPlus } from 'react-icons/bi';
import { FiSend } from 'react-icons/fi';

// Styles
import { BackButton, HeaderRequestWrapper, RequestHeaderTitle, RightSideHeader } from './styles';

// Components
import ButtonDefault from '../Buttons/ButtonDefault';

interface HeaderRequestProps {
  title: TitleProps;
  ticketInfos: TicketInfos;
  taskId: string | undefined;
}

interface TitleProps {
  idNumber: string;
  titleRequest: string;
}

interface TicketInfos {
  tenant_id: string | undefined;
  ticket_id: string | undefined;
  title: string | undefined;
  info: string | undefined;
  userId: string | undefined;
}

export default function HeaderRequest({ title, ticketInfos, taskId }: HeaderRequestProps) {
  const navigate = useNavigate();

  const handleBaseTask = () => {
    navigate('/criar-tarefa', { state: ticketInfos });
  };

  return (
    <HeaderRequestWrapper>
      <BackButton onClick={() => navigate(-1)}>
        <IconArrowLeft />
        Voltar
      </BackButton>

      <RightSideHeader>
        <RequestHeaderTitle>
          <div className="fixed-title">
            <HiOutlineClipboard />
            Visualizando solicitação:
          </div>
          <div className="mutable-title">
            #{String(title.idNumber).padStart(5, '0')} - {title.titleRequest}
          </div>
        </RequestHeaderTitle>

        {taskId === '' && (
          <ButtonDefault typeButton="primary" onClick={handleBaseTask}>
            <BiPlus />
            Usar como base para tarefa
          </ButtonDefault>
        )}

        {taskId !== '' && (
          <ButtonDefault typeButton="primary" onClick={() => navigate(`/tarefa/${taskId}`)}>
            <FiSend />
            Ir para tarefa criada
          </ButtonDefault>
        )}
      </RightSideHeader>
    </HeaderRequestWrapper>
  );
}
