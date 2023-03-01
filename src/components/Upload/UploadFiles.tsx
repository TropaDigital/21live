import { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { filesize } from 'filesize';

import { Container } from '../../pages/Projects/ComponentSteps/styles';
import Upload from '.';
import FileList from './FileList';
import api from '../../services/api';

interface UploadedFilesProps {
  file?: File;
  file_id: string;
  // name: string;
  readableSize: string;
  preview: string;
  progress?: number;
  uploaded: boolean;
  error?: boolean;
  url: string | null;
  bucket: string;
  key: string;
  size: number;
  file_name: string;
}

interface UpdateFileData {
  progress?: number;
  file_id?: string;
  uploaded?: boolean;
  error?: boolean;
  url?: string;
  bucket?: string;
  key?: string;
}

interface PostsResponse {
  _id: string;
  name: string;
  readableSize: string;
  preview: string;
  uploaded: boolean;
  url: string;
  size: number;
}

interface UploadProps {
  uploadedFiles: UploadedFilesProps[];
  setUploadedFiles: (item: any) => void;
  tenant: any;
  isDisabed?: boolean;
}

export default function UploadFiles({uploadedFiles, setUploadedFiles, tenant, isDisabed}: UploadProps) {
  // const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  // const size = partial({base: 2, standard: "jedec"});
  
  // useEffect(() => {
  //   async function loadPosts() {
  //     // const response = await api.get<PostsResponse[]>('archive');

  //     const fakeData = [{
  //       _id: 1,
  //       name: '',
  //       size: 0,
  //       preview: '',
  //       uploaded: false,
  //       url: ''
  //     }]

  //     const data = fakeData.map(file => ({
  //       id: file._id,
  //       name: file.name,
  //       readableSize: file.size,
  //       preview: file.url,
  //       uploaded: true,
  //       url: file.url,
  //     }));

  //     setUploadedFiles(data as any);
  //   }

  //   loadPosts();
  // }, []);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [uploadedFiles]);

  function updateFile(id: string, data: UpdateFileData) {
    setUploadedFiles((state: any) => state.map((uploadedFile: any) => {
      if (id === uploadedFile.file_id) {
        return { ...uploadedFile, ...data }
      }

      return uploadedFile;
    }));
  }

  async function processUpload(uploadedFile: UploadedFilesProps) {
    try {
      const data = new FormData();

      if (!uploadedFile.file) return;
      data.append('archive', uploadedFile.file);
      data.append('tenant', tenant);
      
      const response = await api.post('/archive/upload', data, {
        onUploadProgress: (event: any) => {
          const progress = Math.round((event.loaded * 100)/event.total);
          updateFile(uploadedFile.file_id, { progress });
        }
      });

      updateFile(uploadedFile.file_id, {
        uploaded: true,
        file_id: response.data.result.key.split('-')[0], // correto => response.data._id
        url: response.data.result.url,
        bucket: response.data.result.bucket,
        key: response.data.result.key,
      });
    } catch (err) {
      updateFile(uploadedFile.file_id, {
        error: true,
      });
    }
  }

  function handleUpload(files: File[]) {
    const formatedFiles = files.map(file => ({
      file,
      file_id: uuidV4(),
      file_name: file.name,
      size: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    const newUploadedFiles = [...uploadedFiles, ...formatedFiles]

    setUploadedFiles(newUploadedFiles as any);
    formatedFiles.forEach(processUpload as any);
  }

  async function handleDelete(id: string) {
    await api.delete(`posts/${id}`);

    setUploadedFiles((files: any) => files.filter((file: any) => file.id !== id));
  }


  return (
    <Container isDisabed={isDisabed}>
      <Upload onUpload={handleUpload} isDisabled={isDisabed}/>
      {!!uploadedFiles.length && (
        <FileList files={uploadedFiles} onDelete={handleDelete} />
      )}
    </Container>
  )
}
