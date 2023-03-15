import React, { useEffect } from 'react';
import { BiCheckCircle, BiError, BiInfoCircle } from 'react-icons/bi';
import { FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import {
  MascoteDanger,
  MascoteInfo,
  MascoteSuccess,
  MascoteWarning
} from '../../../assets/mascote';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <BiInfoCircle size={24} color="#0045B5" />,
  success: <BiCheckCircle size={24} color="#12B76A" />,
  danger: <BiInfoCircle size={24} color="#F04438" />,
  warning: <BiError size={24} color="#F79009" />,
  light: <BiInfoCircle size={24} />
};

const mascote = {
  info: <MascoteInfo />,
  success: <MascoteSuccess />,
  danger: <MascoteDanger />,
  warning: <MascoteWarning />,
  light: <MascoteInfo />
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container type={message.type} hasdescription={Number(!!message.description)} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <div className="sectionMascote">{mascote[message.type || 'info']}</div>

      <div className="sectionButtonToast">
        <button onClick={() => removeToast(message.id)} type="button">
          <FiXCircle size={18} />
        </button>
      </div>
    </Container>
  );
};

export default Toast;
