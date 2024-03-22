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
  projectId: string;
  isDisabed?: boolean;
}

export default function InfoFiles({
  uploadedFiles,
  setUploadedFiles,
  projectId,
  isDisabed
}: InfoFilesSteps) {
  const [loading, setLoading] = useState(false);
  return (
    <ContainerSteps>
      <FieldDefault>
        <UploadFiles
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          isDisabed={isDisabed}
          folderInfo="tasks"
          loading={loading}
          setLoading={setLoading}
          project_id={projectId}
        />
      </FieldDefault>
    </ContainerSteps>
  );
}
