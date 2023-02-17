import React, { ButtonHTMLAttributes, useRef } from 'react';
import Spinner from '../Spinner';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  isOutline?: boolean;
  isDashed?: boolean;
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

const ButtonDefault = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, isOutline, sizeButton, isDashed, typeButton, ...rest }, ref) => {
    return (
      <Container
        typeButton={typeButton}
        isOutline={isOutline}
        isDashed={isDashed}
        sizeButton={sizeButton}
        disabled={loading}
        type="button"
        ref={ref}
        {...rest}
      >
        {loading ? <Spinner /> : children}
      </Container>
    );
  }
);

export default ButtonDefault;
