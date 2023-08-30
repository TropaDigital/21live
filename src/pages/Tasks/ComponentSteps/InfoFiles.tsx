// React
import { useState } from 'react';

// Components
import { FieldDefault } from '../../../components/UiElements/styles';
import UploadFiles, { UploadedFilesProps } from '../../../components/Upload/UploadFiles';

// Styles
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
  const [loading, setLoading] = useState(false);
  return (
    <ContainerSteps>
      <FieldDefault>
        <UploadFiles
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          tenant={tenant}
          isDisabed={isDisabed}
          folderInfo="tasks"
          loading={loading}
          setLoading={setLoading}
        />
      </FieldDefault>
    </ContainerSteps>
  );
}
