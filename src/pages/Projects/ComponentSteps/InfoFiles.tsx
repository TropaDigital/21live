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
  loading: boolean;
  setLoading: any;
}

export default function InfoFiles({
  uploadedFiles,
  setUploadedFiles,
  tenant,
  isDisabed,
  loading,
  setLoading
}: InfoFilesSteps) {
  return (
    <ContainerSteps style={{ width: '800px' }}>
      <FieldDefault>
        <UploadFiles
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          tenant={tenant}
          isDisabed={isDisabed}
          loading={loading}
          setLoading={setLoading}
          folderInfo="projects"
        />
      </FieldDefault>
    </ContainerSteps>
  );
}
