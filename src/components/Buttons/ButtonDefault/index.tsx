import React, { ButtonHTMLAttributes } from 'react';
import Spinner from '../Spinner';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  isOutline?: boolean;
  typeButton?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  sizeButton?: 'small' | 'big';
}

const ButtonDefault: React.FC<ButtonProps> = ({
  loading,
  children,
  isOutline,
  sizeButton,
  typeButton,
  ...rest
}) => {
  return (  
    <Container
      typeButton={typeButton}
      isOutline={isOutline}
      sizeButton={sizeButton}
      disabled={loading}
      type="button"
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </Container>
  );
};

export default ButtonDefault;
