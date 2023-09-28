/* eslint-disable import-helpers/order-imports */
// React
import { useLocation, useNavigate } from 'react-router-dom';

// Icons
import { IconArrowLeft } from '../../assets/icons';
import { HiOutlineClipboard } from 'react-icons/hi';
import { BiPlus } from 'react-icons/bi';

// Styles
import { BackButton, HeaderRequestWrapper, RequestHeaderTitle, RightSideHeader } from './styles';
import ButtonDefault from '../Buttons/ButtonDefault';

interface HeaderRequestProps {
  title: TitleProps;
}

interface TitleProps {
  idNumber: string;
  titleRequest: string;
}

export default function HeaderRequest({ title }: HeaderRequestProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const ticketInfos = location.state;

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

        <ButtonDefault typeButton="primary" onClick={handleBaseTask}>
          <BiPlus />
          Usar como base para tarefa
        </ButtonDefault>
      </RightSideHeader>
    </HeaderRequestWrapper>
  );
}
