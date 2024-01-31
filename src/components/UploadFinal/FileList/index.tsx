import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle } from 'react-icons/md';

import { IconArquive, IconTrash } from '../../../assets/icons';

import { Container, FileInfo, Preview } from './styles';

interface FileListProps {
  files: Array<{
    file_id: string;
    preview: string;
    // name: string;
    readableSize: string;
    url: string | null;
    uploaded: boolean;
    error?: boolean;
    progress?: number;
    bucket: string;
    key: string;
    size: number;
    file_name: string;
    original_name: string;
    loading: boolean;
  }>;
  onDelete: (id: string) => void;
}

const FileList = ({ files, onDelete }: FileListProps) => (
  <Container>
    {files.map((uploadedFile) => (
      <li key={uploadedFile.file_id} className={uploadedFile.error ? 'error' : ''}>
        <FileInfo>
          <Preview>
            {uploadedFile.error ? (
              <IconArquive color="#FEE4E2" subColor="#FEF3F2" stroke="#D92D20" />
            ) : (
              <IconArquive color="#BADFFF" subColor="#E2F2FF" stroke="#0046B5" />
            )}
          </Preview>
          <div>
            {uploadedFile.error ? (
              <strong className="error">{uploadedFile.original_name}</strong>
            ) : (
              <strong>{uploadedFile.original_name}</strong>
            )}
            <span>
              {uploadedFile.size}
              <button onClick={() => onDelete(uploadedFile.file_id)} type="button">
                Excluir
              </button>
            </span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded && !uploadedFile.error && (
            <CircularProgressbar
              styles={{
                root: { width: 24 },
                path: { stroke: '#7F56D9' },
                trail: { stroke: !uploadedFile.progress ? '#fff' : '#F9F5FF' }
              }}
              strokeWidth={10}
              value={uploadedFile.progress || 0}
            />
          )}

          {/* {uploadedFile.url && (
            <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )} */}

          {uploadedFile.uploaded && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MdCheckCircle size={24} color="#0046B5" />
            </div>
          )}
          {uploadedFile.error && (
            <div style={{ cursor: 'pointer' }} onClick={() => onDelete(uploadedFile.file_id)}>
              <IconTrash width="24px" height="24px" />
            </div>
          )}
        </div>
      </li>
    ))}
  </Container>
);

export default FileList;
