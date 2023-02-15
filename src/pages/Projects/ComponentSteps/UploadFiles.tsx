import { useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { filesize } from 'filesize';

import { Container, Content } from './styles';
import Upload from '../../../components/Upload';
import FileList from '../../../components/FileList';
import api from '../../../services/api';

interface UploadedFilesProps {
  file?: File;
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress?: number;
  uploaded: boolean;
  error?: boolean;
  url: string | null;
}

interface UpdateFileData {
  progress?: number;
  id?: string;
  uploaded?: boolean;
  error?: boolean;
  url?: string;
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

// 04f9c64c81f09e5566c4-WhatsApp Image 2023-02-03 at 15.27.06.jpeg

export default function UploadFiles() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  
  useEffect(() => {
    async function loadPosts() {
      const response = await api.get<PostsResponse[]>('archive');

      console.log('RESPONSE', response.data)

      const data = response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: 'http://192.168.15.25:33332/tmp/4c2bde73a40b0d7edaca-WhatsApp%20Image%202023-02-03%20at%2015.27.06.jpeg',
      }));

      setUploadedFiles(data as any);
    }

    loadPosts()
  }, []);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [uploadedFiles]);

  function updateFile(id: string, data: UpdateFileData) {
    setUploadedFiles(state => state.map(uploadedFile => {
      if (id === uploadedFile.id) {
        return { ...uploadedFile, ...data }
      }

      return uploadedFile;
    }));
  }

  async function processUpload(uploadedFile: UploadedFilesProps) {
    try {
      const data = new FormData();

      if (!uploadedFile.file) return;

      data.append('archive', uploadedFile.file, uploadedFile.name);

      const response = await api.post('/archive/upload', data, {
        onUploadProgress: (event: any) => {
          const progress = Math.round((event.loaded * 100)/event.total);
          
          updateFile(uploadedFile.id, { progress });
        }
      });

      updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data._id,
        url: response.data.url,
      });
    } catch (err) {
      updateFile(uploadedFile.id, {
        error: true,
      });
    }
  }

  function handleUpload(files: File[]) {
    const formatedFiles = files.map(file => ({
      file,
      id: uuidV4(),
      name: file.name,
      readableSize: filesize(file.size),
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

    setUploadedFiles(files => files.filter(file => file.id !== id));
  }

  console.log('uploadedFiles', uploadedFiles)

  return (
    <Container>
      <Content>
        <Upload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FileList files={uploadedFiles} onDelete={handleDelete} />
        )}
      </Content>
    </Container>
  )
}
