import React, {
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FaAngleDown } from 'react-icons/fa';

import { Container, ContainerInput, Error } from './styles';
import { Alert, ErrorInputMessage } from '../InputDefault/styles';
import { IoMdHelpCircle } from 'react-icons/io';

interface ErrorInput {
  message: string;
  isError: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  icon?: React.ComponentType<IconBaseProps>;
  placeHolder?: string;
  alert?: string;
}

export function SelectDefault({ label, alert, error, placeHolder, children, icon: Icon, ...rest }: InputProps) {
  const inputRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container>
      <div className="containerAlert" style={{ display: 'flex', alignItems: 'center' }} >
        <label htmlFor={label}>{label}</label>
        {alert && (
          <Alert title={alert ?? 'Campo obrigatório'}>
            <IoMdHelpCircle size={18} color='#CED4DA' />
          </Alert>
        )}
      </div>


      <ContainerInput
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
        isIcon={!!Icon}
      >

        <div className="leftInputElement">
          {Icon && <Icon color='#CCCCCC' />}
        </div>

        <select
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          id={label}
          {...rest}
        >
        <option value="">{placeHolder ?? 'Selecione uma opção'}</option>
          {children}
        </select>


        <div className="rightInputElement">
          <FaAngleDown color='rgba(204, 204, 204, 1)' />
        </div>

        {/* {error?.isError && (
          <Error title={error.message}>
            <FiAlertCircle size={20} color="#E62965" />
          </Error>
        )} */}
      </ContainerInput>

      {error && (
          <ErrorInputMessage title={error}>
            <span>{error}</span>
          </ErrorInputMessage>
        )}
    </Container>
  );
}
