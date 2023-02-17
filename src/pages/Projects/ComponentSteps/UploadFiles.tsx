import { useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { filesize, partial } from 'filesize';

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
  const size = partial({base: 2, standard: "jedec"});

  const fakeData = [
    {
      _id: 1,
      name: 'Um bom nome',
      size: size(265318),
      preview: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      uploaded: true,
      url: 'https://images.unsplash.com/photo-1542903660-eedba2cda473?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      _id: 2,
      name: 'Outro nome',
      size: size(378546),
      preview: 'https://images.unsplash.com/photo-1473073899705-e7b1055a7419?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      uploaded: true,
      url: 'https://images.unsplash.com/photo-1473073899705-e7b1055a7419?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGRldmVsb3BtZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    }
  ]
  
  useEffect(() => {
    async function loadPosts() {
      const response = await api.get<PostsResponse[]>('archive');

      console.log('RESPONSE', response.data)

      const data = fakeData.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: file.size,
        preview: file.url,
        uploaded: true,
        url: file.url,
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
      // data.append('project_id', '1')

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
