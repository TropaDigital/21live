import { FieldDefault } from '../../../components/UiElements/styles';
import UploadFiles, { UploadedFilesProps } from '../../../components/Upload/UploadFiles';

import { ContainerSteps } from './styles';

interface InfoFilesSteps {
  uploadedFiles: UploadedFilesProps[];
  setUploadedFiles: (item: any) => void;
  tenant: any;
  isDisabed?: boolean;
}

export default function InfoFiles({
  uploadedFiles,
  setUploadedFiles,
  tenant,
  isDisabed
}: InfoFilesSteps) {
  return (
    <ContainerSteps>
      <FieldDefault>
        <UploadFiles
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          tenant={tenant}
          isDisabed={isDisabed}
        />
      </FieldDefault>
    </ContainerSteps>
  );
}
