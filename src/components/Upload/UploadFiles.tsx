import { useEffect, useState } from 'react';

import axios from 'axios';
import { filesize } from 'filesize';
import { v4 as uuidV4 } from 'uuid';

import Upload from '.';
import { Container } from '../../pages/Projects/ComponentSteps/styles';
import api from '../../services/api';
import FileList from './FileList';

export interface UploadedFilesProps {
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
  isNew: boolean;
  loading: boolean;
}

interface UpdateFileData {
  progress?: number;
  file_id?: string;
  uploaded?: boolean;
  error?: boolean;
  url?: string;
  bucket?: string;
  key?: string;
  loading?: boolean;
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
  loading?: boolean;
  setLoading?: any;
}

export default function UploadFiles({
  uploadedFiles,
  setUploadedFiles,
  tenant,
  isDisabed,
  loading,
  setLoading
}: UploadProps) {
  // const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  // const size = partial({base: 2, standard: "jedec"});

  // useEffect(() => {
  //   async function loadPosts() {
  //     // const response = await api.get<PostsResponse[]>('archive');

  //     const data = uploadedFiles.map(file => ({
  //       file_id: file.file_id,
  //       file_name: file.file_name,
  //       size: size(file.size),
  //       preview: file.url,
  //       uploaded: true,
  //       url: file.url,
  //       bucket: file.bucket,
  //     }));

  //     setUploadedFiles(data as any);
  //     // console.log('DATA', data)
  //   }

  //   loadPosts();
  // }, []);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [uploadedFiles]);

  function updateFile(id: string, data: UpdateFileData) {
    setUploadedFiles((state: any) =>
      state.map((uploadedFile: any) => {
        if (id === uploadedFile.file_id) {
          return { ...uploadedFile, ...data };
        }

        return uploadedFile;
      })
    );
  }

  const [cancelTokenSource, setCancelTokenSource] = useState<any>(null);

  const handleCancelClick = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Requisição cancelada pelo usuário.');
    }
  };

  async function processUpload(uploadedFile: UploadedFilesProps) {
    setLoading(true);
    try {
      const data = new FormData();

      const source = axios.CancelToken.source();
      setCancelTokenSource(source);

      if (!uploadedFile.file) return;
      data.append('archive', uploadedFile.file);
      data.append('tenant', tenant);

      const response = await api.post('/archive/upload', data, {
        onUploadProgress: (event: any) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          updateFile(uploadedFile.file_id, { progress, loading });
        },
        cancelToken: source.token
      });

      updateFile(uploadedFile.file_id, {
        uploaded: true,
        file_id: response.data.result.key.split('-')[0], // correto => response.data._id
        url: response.data.result.url,
        bucket: response.data.result.bucket,
        key: response.data.result.key,
        loading: loading
      });
    } catch (err) {
      updateFile(uploadedFile.file_id, {
        error: true
      });
    } finally {
      setLoading(false);
      setCancelTokenSource(null);
    }
  }

  function handleUpload(files: File[]) {
    const formatedFiles = files.map((file) => ({
      file,
      file_id: uuidV4(),
      file_name: file.name,
      size: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      isNew: true,
      error: false,
      url: null,
      loading: loading
    }));

    const newUploadedFiles = [...uploadedFiles, ...formatedFiles];

    setUploadedFiles(newUploadedFiles as any);
    formatedFiles.forEach(processUpload as any);
  }

  async function handleDelete(id: string) {
    const filterFile = uploadedFiles.filter(
      (obj: any) => obj.file_id === id
    )[0];

    if (!filterFile.isNew) {
      await api.delete(`archive/${id}`);
    }

    handleCancelClick();
    setUploadedFiles((files: any) =>
      files.filter((file: any) => file.file_id !== id)
    );
  }

  return (
    <Container isDisabed={isDisabed}>
      <Upload onUpload={handleUpload} isDisabled={isDisabed} />
      {!!uploadedFiles.length && (
        <FileList files={uploadedFiles} onDelete={handleDelete} />
      )}
    </Container>
  );
}
