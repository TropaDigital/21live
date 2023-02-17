import {CircularProgressbar} from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";

import { Container, FileInfo, Preview } from "./styles";
import { IconArquive } from "../assets/icons";

interface FileListProps {
  files: Array<{
    id: string;
    preview: string;
    name: string;
    readableSize: string;
    url: string | null;
    uploaded: boolean;
    error?: boolean;
    progress?: number;
  }>;
  onDelete: (id: string) => void;
}

const FileList = ({ files, onDelete }: FileListProps) => (
  <Container>
    {files.map(uploadedFile => (
      <li key={uploadedFile.id}>
        <FileInfo>
          <Preview>
            {uploadedFile.error ? (
              <IconArquive color="#FEE4E2" subColor="#FEF3F2" stroke="#D92D20" />
            ) : (
              <IconArquive />
            )}
          </Preview>
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>
              {uploadedFile.readableSize}{" "}
              {!!uploadedFile.url && (
                <button onClick={() => onDelete(uploadedFile.id)} type="button">
                  Excluir
                </button>
              )}
            </span>
          </div>
        </FileInfo>

        <div>
          {!uploadedFile.uploaded &&
            !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#7159c1" }
                }}
                strokeWidth={10}
                value={uploadedFile.progress || 0}
              />
            )}

          {uploadedFile.url && (
            <a
              href={uploadedFile.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
          )}

          {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
          {uploadedFile.error && <MdError size={24} color="#e57878" />}
        </div>
      </li>
    ))}
  </Container>
);

export default FileList;