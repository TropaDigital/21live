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
}

export default function TaskInputs({
  valueFirst,
  valueSecond,
  handleOnDescription,
  handleOnInput,
  mentions
}: InputsProps) {
  return (
    <InputTaskWrapper>
      <InputField>
        <InputFieldTitle>Input Pré-Requisitos;</InputFieldTitle>
        <WrapperEditor
          mentionData={mentions}
          value={valueFirst}
          handleOnDescription={(value: any) => handleOnDescription(value)}
        />
      </InputField>

      <InputField>
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
