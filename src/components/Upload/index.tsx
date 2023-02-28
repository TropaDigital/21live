import Dropzone from 'react-dropzone';

import { DropContainer, BoxUploaded, UploadMessage } from './styles';
import { IconUpload } from '../assets/icons';

interface UploadProps {
  onUpload: (files: File[]) => void;
  isDisabled?: boolean
}

const Upload = ({ onUpload, isDisabled }: UploadProps) => {
  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return (
        <BoxUploaded>
          <div className="boxIconUpload">
            <IconUpload />
          </div>
          <UploadMessage>Escolha um arquivo <span>ou arraste e solte</span></UploadMessage>
          <UploadMessage><span>(max. 500MB)</span></UploadMessage>
        </BoxUploaded>
      );
    }

    if (isDragReject) {
      return (
        <BoxUploaded>
          <div className="boxIconUpload">
            <IconUpload color="#FEE4E2" subColor="#FEF3F2" stroke='#D92D20'/>
          </div>
          <UploadMessage type="error">Arquivo não suportado</UploadMessage>
          <UploadMessage><span>(max. 500MB)</span></UploadMessage>
        </BoxUploaded>
      );
    }
    return (
      <BoxUploaded>
        <div className="boxIconUpload">
          <IconUpload color="#baffe2" subColor="#e2fff1" stroke='#00b56a' />
        </div>
        <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
        <UploadMessage><span>(max. 500MB)</span></UploadMessage>
      </BoxUploaded>
    );
  }

  return (
    <Dropzone 
      // accept={{'audio/*': ['.mp3', '.mpeg'], 'image/*': ['.png', '.jpeg']}}
      // maxSize={5000}
      disabled={isDisabled ? true : false}
      onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
        {...getRootProps({className: `${isDisabled === true ? 'disabled' : ''}`})}
        isDragActive={isDragActive}
        isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )}
    </Dropzone>
  )
}

export default Upload;
