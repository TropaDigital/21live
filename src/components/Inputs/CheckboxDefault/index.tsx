import React, {
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { BsCheck } from 'react-icons/bs';

import { Container, ContainerInput, Error } from './styles';

interface ErrorInput {
  message: string;
  isError: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: ErrorInput;
  icon?: React.ComponentType<IconBaseProps>;
}

export function CheckboxDefault({ name, label, error, icon: Icon, ...rest }: InputProps) {
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

  return (
    <Container htmlFor={name}>
        <input
          type="checkbox"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          id={name}
          {...rest}
        />

        <span className='checkbox'>
          <BsCheck  />
        </span>

        <span className='labelInput'>{label}</span>

        {/* {error?.isError && (
          <Error title={error.message}>
            <FiAlertCircle size={20} color="#E62965" />
          </Error>
        )} */}
      {/* </ContainerInput> */}
    </Container>
  );
}
