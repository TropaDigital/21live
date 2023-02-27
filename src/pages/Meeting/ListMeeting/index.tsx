import { useState, useCallback, useEffect, useRef } from 'react';
import { BiCalendar, BiEdit, BiPlus, BiSearchAlt, BiTrash } from 'react-icons/bi';
import moment from 'moment';
import api from '../../../services/api';

// HOOKS
import { useToast } from '../../../hooks/toast';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';

// UTILS
import { MeetingProps, TeamProps, TenantProps } from '../../../utils/models';
import { useDebounce } from '../../../utils/useDebounce';

// COMPONENTS
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import { TableDefault } from '../../../components/TableDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import InputMultipleSelect from '../../../components/Inputs/InputMultipleSelect';
import UploadFiles from '../../Projects/ComponentSteps/UploadFiles';
import Paginate from '../../../components/Paginate';
import Alert from '../../../components/Ui/Alert';
import WrapperEditor from '../../../components/WrapperEditor';

// STYLES
import { ContainerGroupTable, ContentDefault, FieldDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';
import { Container } from './styles';

interface UploadedFilesProps {
  file?: File;
  file_id: string;
  name: string;
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

interface FormProps {
  title: string;
  tenant_id: any;
  email_alert: boolean;
  user_id: string;
  members: any;
  date: string;
  files: string;
  description: string;
}

export default function ListMeeting() {
  const { addToast } = useToast();
  const { formData, setFormValue, setData, handleOnChange, handleOnChangeCheckbox } = useForm({
    title: '',
    tenant_id: '',
    email_alert: false,
    user_id: '',
    members: [],
    date: '',
    files: '',
    description: '',
  } as FormProps)
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Criar nova Ata de Reunião'
  })
  const today = moment();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [search, setSearch] = useState('');
  const [isSearching, setSearching] = useState(false);
  const [filterDate, setFilterDate] = useState({
    dateStart: '',
    dateEnd: ''
  });

  const { data, pages, fetchData } = useFetch<MeetingProps[]>(`meetings?search=${search}&date_start=${filterDate.dateStart}&date_end=${filterDate.dateEnd}`);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataTeam } = useFetch<TeamProps[]>('team');

  const selectedTeam = dataTeam?.filter((obj) => obj.user_id !== formData.user_id)
  const defaultOptionsTeam = dataTeam?.filter((item) =>
    formData.members.some((member: any) => member.user_id === item.user_id)
  )
  const mentionList = dataTeam?.map((obj) => ({id: obj.user_id, label: obj.username}))

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [selected, setSelected] = useState(1);

  const [text, setText] = useState('');

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      setSearch(searchTerm);
      const handler = setTimeout(() => {
        setSearching(false);
      }, 500);
      return () => {
        clearTimeout(handler)
      }
    } else {
      setSearch('')
      setSearching(false);
    }
  }, [debouncedSearchTerm]);
  
  const handleChangeClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedId = parseInt(event.target.options[selectedIndex].value);
    const selectedItem = dataClient?.find((item: any) => Number(item.tenant_id) === selectedId);
  
    setFormValue('tenant_id', selectedItem?.tenant_id)
  };

  const onChange = (option: any, actionMeta: any) => {
    const dataOption = option.map((row: any) => (
      {user_id: row.value}
    ))
    setFormValue('members', dataOption)
 }

  const handleOnCancel = () => {
    setModal({ 
      isOpen: false,
      type: 'Criar nova Ata de Reunião'
    });
    setData({
      title: '',
      tenant_id: '',
      email_alert: false,
      user_id: '',
      members: [],
      date: '',
      files: '',
      description: '',
    } as FormProps);
    setUploadedFiles([]);
    setText('');
    fetchData();
  }

  function handleOnEdit(data: MeetingProps) {
    setData(data);
    setUploadedFiles(data.files);
    setText(data.description);

    setModal({
      isOpen: true,
      type: `Alterar Ata de Reunião: ${data.title}`
    });
  }

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      // Inserir lógica
      const files = uploadedFiles.map((row) => (
        {
          bucket: row.bucket,
          file_name: row.file_name,
          key: row.key,
          size: row.size,
          url: row.url
        }
      ))

      const { title, tenant_id, user_id, date, email_alert, members } = formData

      const newFormData = {
        files,
        title,
        tenant_id,
        user_id,
        date,
        email_alert: String(email_alert),
        description: text,
        members      
      }

      if(modal.type === 'Criar nova Ata de Reunião') {
        await api.post(`meetings`, newFormData);
      } else {
        await api.put(`meetings/${formData.meeting_id}`, newFormData);
      }

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço cadastrado com sucesso!',
      });

      setModal({
        isOpen: false,
        type: 'Criar nova Ata de Reunião'
      });
      setData({
        title: '',
        tenant_id: '',
        email_alert: false,
        user_id: '',
        members: [],
        date: '',
        files: '',
        description: '',
      } as FormProps);
      setUploadedFiles([]);
      setText('');
      fetchData();

    } catch (e: any) {
      // Exibir erro
      console.log('ERROR =>', e)
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });

    }
  }, [formData, setFormValue, text, uploadedFiles, modal]);

  const handleOnDelete = async (id: string) => {
    try {

      await api.delete(`meetings/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Ata/Reunição deletada com sucesso!',
      });

      setModal({
        isOpen: false,
        type: 'Criar nova Ata de Reunião'
      });

      setData({
        title: '',
        tenant_id: '',
        email_alert: false,
        user_id: '',
        members: [],
        date: '',
        files: '',
        description: '',
      } as FormProps);
      setUploadedFiles([]);
      setText('');
      fetchData();
    } catch(e: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });
    }
  }
  
  return (
    <Container>
      <HeaderPage title="Atas e Reuniões">
        <ButtonDefault typeButton="success" onClick={() => setModal({...modal, ['isOpen']: true})}>
          <BiPlus color="#fff" />
            Novo Projeto
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault style={{ position: 'relative' }}>
        <FieldGroupFormDefault>
          <FieldGroupFormDefault>
            <InputDefault
              label="Data inicial"
              placeholder="00/00/0000"
              name="dateStart"
              type='date'
              icon={BiCalendar}
              onChange={(e) => setFilterDate({...filterDate, ['dateStart']: e.target.value})}
              value={filterDate.dateStart}
            />

            <InputDefault
              label="Data final"
              placeholder="00/00/0000"
              name="dateEnd"
              type='date'
              icon={BiCalendar}
              onChange={(e) => setFilterDate({...filterDate, ['dateEnd']: e.target.value})}
              value={filterDate.dateEnd}
            />

          </FieldGroupFormDefault>
          <SelectDefault
            label="Ordenar por"
            name="order"
            placeHolder="Ordenação"
            onChange={() => {}}
            value={''}
          >
            <option value='0'>Mais recente</option>
            <option value='1'>Mais antigo</option>
          </SelectDefault>

          <InputDefault
            label="Busca"
            name="search"
            placeholder="Busque pelo nome..."
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={BiSearchAlt}
            isLoading={isSearching}
            value={searchTerm}
          />

        </FieldGroupFormDefault>
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Todas">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>ID</th>
                <th>Titulo</th>
                <th>Cliente</th>
                <th>Responsável</th>
                <th>Data</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row) => (
                <tr key={row.meeting_id}>
                  <td>
                    {row.meeting_id}
                  </td>
                  <td>{row.title}</td>
                  <td>
                    {row.cliente}
                  </td>
                  <td>{row.responsavel}</td>
                  <td>{row.date}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonDefault typeButton="info" onClick={() => handleOnEdit(row)}>
                        <BiEdit />
                      </ButtonDefault>

                      <Alert
                        title='Atenção'
                        subtitle='Certeza que gostaria de deletar esta Ata/Reunião? Ao excluir a acão não poderá ser desfeita.'
                        cancelButton={() => {}}
                        confirmButton={() => handleOnDelete(row.meeting_id)}
                      >
                        <ButtonDefault typeButton="danger">
                          <BiTrash />
                        </ButtonDefault>
                      </Alert>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableDefault>
        </ScrollAreas>

      </ContainerGroupTable>

      <Paginate 
        total={pages.total}
        perPage={pages.perPage}
        currentPage={selected}
        lastPage={pages.lastPage}
        onClickPage={(e) => setSelected(e)}
      />

      <ModalDefault
        isOpen={modal.isOpen}
        onOpenChange={handleOnCancel}
        title={modal.type}
      >
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Titulo"
              placeholder="Titulo da Ata/Reunião"
              name="title"
              onChange={handleOnChange}
              value={formData.title}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Cliente"
              name="tenant_id"
              placeHolder="Selecione"
              onChange={handleChangeClient}
              value={formData?.tenant_id}
            >
              {dataClient?.map((row) => (
                <option key={row.tenant_id} value={row.tenant_id}>{row.name}</option>
              ))}
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputSwitchDefault 
              name="email_alert"
              label='Enviar para o cliente por e-mail'
              onChange={handleOnChangeCheckbox}
              isChecked={formData.email_alert === 'true' ? true : false}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Responsável"
              name="user_id"
              placeHolder="Selecione"
              onChange={handleOnChange}
              value={formData.user_id}
            >
              {dataTeam?.map((row) => (
                <option key={row.user_id} value={row.user_id}>{row.name}</option>
              ))}
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputMultipleSelect 
              name='members'
              options={selectedTeam?.map((row) => (
                { value: row.user_id, label: row.username }
              ))}
              label='Membros'
              isDisabled={formData.user_id ? false : true}
              onChange={(option, meta) => onChange(option, meta)}
              defaultValue={defaultOptionsTeam?.map((row) => (
                { value: row.user_id, label: row.username }
              ))}
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault
              label="Data"
              placeholder="00/00/0000"
              name="date"
              type='date'
              icon={BiCalendar}
              onChange={handleOnChange}
              value={formData.date}
            />
          </FieldDefault>

          <FieldDefault>
            <UploadFiles
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={formData?.tenant_id}
            />
          </FieldDefault>

          <FieldDefault>
            <WrapperEditor
              mentionData={mentionList}
              value={text}
              handleOnDescription={(value: any) => setText(value)}
            />
          </FieldDefault>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault
              typeButton="dark"
              isOutline
              onClick={handleOnCancel}
            >
              Descartar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>
    </Container>
  )
}
