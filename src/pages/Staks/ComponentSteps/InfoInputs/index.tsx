// React
import { useEffect } from 'react';

// Components
import WrapperEditor from '../../../../components/WrapperEditor';

// Styles
import { InputField, InputFieldTitle, InputTaskWrapper } from './styles';

interface InputsProps {
  valueFirst: string;
  valueSecond: string;
  handleOnDescription: (value: any) => void;
  handleOnInput: (value: any) => void;
  mentions: any;
  inputsError: any;
}

export default function TaskInputs({
  valueFirst,
  valueSecond,
  handleOnDescription,
  handleOnInput,
  mentions,
  inputsError
}: InputsProps) {
  useEffect(() => {
    console.log('Log dos erros', inputsError);
  }, [inputsError]);
  return (
    <InputTaskWrapper>
      {/* <InputField style={{ border: '2px solid red', padding: '4px' }}> */}
      <InputField className={inputsError?.copywriting_description ? 'error' : ''}>
        <InputFieldTitle>Input Pré-Requisitos;</InputFieldTitle>
        <WrapperEditor
          mentionData={mentions}
          value={valueFirst}
          handleOnDescription={(value: any) => handleOnDescription(value)}
        />
      </InputField>

      <InputField className={inputsError?.creation_description ? 'error' : ''}>
        <InputFieldTitle>Input criação</InputFieldTitle>
        <WrapperEditor
          mentionData={mentions}
          value={valueSecond}
          handleOnDescription={(value: any) => handleOnInput(value)}
        />
      </InputField>
    </InputTaskWrapper>
  );
}
