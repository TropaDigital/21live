import { FieldDefault } from '../../../components/UiElements/styles';
import WrapperEditor from '../../../components/WrapperEditor';

import { ContainerSteps } from './styles';

interface DescriptionStepProps {
  value: string;
  handleOnDescription: (value: any) => void;
  mentions: any;
}

export default function InfoDescription({
  value,
  handleOnDescription,
  mentions
}: DescriptionStepProps) {
  return (
    <ContainerSteps>
      <FieldDefault>
        <WrapperEditor
          mentionData={mentions}
          value={value}
          handleOnDescription={(value: any) => handleOnDescription(value)}
        />
      </FieldDefault>
    </ContainerSteps>
  );
}
