import React from 'react';

import { FieldDefault } from '../../../components/UiElements/styles';
import UploadFiles, { UploadedFilesProps } from '../../../components/Upload/UploadFiles';

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
    <ContainerSteps>
      <FieldDefault>
        <UploadFiles
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          tenant={tenant}
          isDisabed={isDisabed}
          loading={loading}
          setLoading={setLoading}
        />
      </FieldDefault>
    </ContainerSteps>
  );
}
