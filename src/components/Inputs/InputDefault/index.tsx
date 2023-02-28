import React, {
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { IoMdHelpCircle } from 'react-icons/io';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, ContainerInput, Error, Alert } from './styles';
import { dateTimeMask } from './masks';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ComponentType<IconBaseProps>;
  alert?: string;
  mask?: 'currency' | 'dateTime';
  isLoading?: boolean;
}

export function InputDefault({ isLoading, mask, label, alert, error, icon: Icon, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    if (mask === 'dateTime') {
      dateTimeMask(e)
    }
    return;
  }, [mask])

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
        isLoad={isLoading}
      >

        <div className="leftInputElement">
          {isLoading ? (
            <div className="custom-loader" />
            ) : (
            Icon && <Icon color='rgba(204, 204, 204, 1)' size={22}/>
          )}
        </div>

        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          id={label}
          role="presentation" autoComplete="off"
          onKeyUp={handleKeyUp}
          required={alert ? true : false}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle size={20} color="#E62965" />
          </Error>
        )}
      </ContainerInput>
    </Container>
  );
}
