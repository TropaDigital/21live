// Components
import WrapperEditor from '../../../../components/WrapperEditor';

// Styles
import { InputField, InputFieldTitle, InputTaskWrapper } from './styles';

// Hooks
import { useParamsHook } from '../../../../hooks/useParams';

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
  const { parameters } = useParamsHook();
  return (
    <InputTaskWrapper>
      <InputField className={inputsError?.copywriting_description ? 'error' : ''}>
        <InputFieldTitle>
          Input {parameters.input !== '' ? parameters.input : 'Pré-requisito'}
        </InputFieldTitle>
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
