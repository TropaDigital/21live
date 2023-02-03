import {
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';

import { Container, ContainerInput } from './styles';

interface ErrorInput {
  message: string;
  isError: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: ErrorInput;
}

export function TextAreaDefault({ label, error, ...rest }: InputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
      <label htmlFor={label}>{label}</label>

      <ContainerInput
        isErrored={!!error?.isError}
        isFocused={isFocused}
        isFilled={isFilled}
      >

        <textarea
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          id={label}
          {...rest}
        />

        {/* {error?.isError && (
          <Error title={error.message}>
            <FiAlertCircle size={20} color="#E62965" />
          </Error>
        )} */}
      </ContainerInput>
    </Container>
  );
}
