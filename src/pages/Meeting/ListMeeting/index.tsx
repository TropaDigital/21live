/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useState } from 'react';
import { BiCalendar, BiPlus, BiSearchAlt } from 'react-icons/bi';

// Services
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';

// Utils
import getValidationErrors from '../../../utils/getValidationErrors';
import { MeetingProps, TeamProps, TenantProps } from '../../../utils/models';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import InputMultipleSelect from '../../../components/Inputs/InputMultipleSelect';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { Table } from '../../../components/Table';
import { FilterGroup, TableHead } from '../../../components/Table/styles';
import Alert from '../../../components/Ui/Alert';
import ModalDefault from '../../../components/Ui/ModalDefault';
import {
  ContainerGroupTable,
  FieldDefault,
  FooterModal,
  SectionDefault
} from '../../../components/UiElements/styles';
import UploadFiles from '../../../components/Upload/UploadFiles';
import WrapperEditor from '../../../components/WrapperEditor';
import Pagination from '../../../components/Pagination';

// Styles
import { ButtonsFilter, Container, FilterButton, ModalField, ModalInfosWrapper } from './styles';

// Libraries
import moment from 'moment';
import { IconClose } from '../../../assets/icons';

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
  isNew: boolean;
  loading: boolean;
  folder: string;
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

interface MeetingInfoProps {
  cliente: string;
  date: string;
  meeting_id: string;
  responsavel: string;
  title: string;
  description: string;
  files: any;
  members: any;
  tenant_id: any;
  email_alert: any;
  user_id: string;
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
    description: ''
  } as FormProps);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Criar nova Ata de Reunião'
  });

  const [errors, setErrors] = useState({} as any);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const [filterDate, setFilterDate] = useState({
    dateStart: '',
    dateEnd: ''
  });
  const [filterOrder, setFilterOrder] = useState('');

  const { data, pages, fetchData } = useFetch<MeetingProps[]>(
    `meetings?search=${search}&date_start=${filterDate.dateStart}&date_end=${filterDate.dateEnd}&order=${filterOrder}`
  );
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataTeam } = useFetch<TeamProps[]>('team');

  const selectedTeam = dataTeam?.filter((obj) => obj.user_id !== formData.user_id);
  const defaultOptionsTeam = dataTeam?.filter((item) =>
    formData.members.some((member: any) => member.user_id === item.user_id)
  );
  const mentionList = dataTeam?.map((obj) => ({ id: obj.user_id, label: obj.username }));

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<any>('all');

  const [modalView, setModalView] = useState({
    isOpen: false,
    meetingInfos: {
      meeting_id: '',
      title: '',
      date: '',
      responsavel: '',
      cliente: '',
      tenant_id: '',
      user_id: '',
      description: '',
      email_alert: '',
      members: [],
      files: []
    }
  });

  const handleChangeClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedId = parseInt(event.target.options[selectedIndex].value);
    const selectedItem = dataClient?.find((item: any) => Number(item.tenant_id) === selectedId);

    setFormValue('tenant_id', selectedItem?.tenant_id);
  };

  const onChange = (option: any) => {
    const dataOption = option.map((row: any) => ({ user_id: row.value }));
    setFormValue('members', dataOption);
  };

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
      description: ''
    } as FormProps);
    setUploadedFiles([]);
    setText('');
    setErrors({});
    // fetchData();
  };

  function handleOnEdit(data: MeetingProps) {
    setData(data);
    setUploadedFiles(data.files);
    setText(data.description);

    setModal({
      isOpen: true,
      type: `Alterar Ata de Reunião: ${data.title}`
    });
  }

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();

        // Inserir lógica
        const files = uploadedFiles.map((row) => ({
          bucket: row.bucket,
          file_name: row.file_name,
          key: row.key,
          size: row.size,
          url: row.url
        }));

        const { title, tenant_id, user_id, date, email_alert, members } = formData;

        const newFormData = {
          files,
          title,
          tenant_id,
          user_id,
          date,
          email_alert: String(email_alert),
          description: text,
          members
        };

        if (modal.type === 'Criar nova Ata de Reunião') {
          await api.post(`meetings`, newFormData);
        } else {
          await api.put(`meetings/${formData.meeting_id}`, newFormData);
        }

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Serviço cadastrado com sucesso!'
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
          description: ''
        } as FormProps);
        setUploadedFiles([]);
        setText('');
        fetchData();
      } catch (e: any) {
        // Exibir erro
        console.log('ERROR =>', e);
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });

        setErrors(getValidationErrors(e.response.data.result));
      }
    },
    [uploadedFiles, formData, text, modal.type, addToast, setData, fetchData]
  );

  const handleOnDelete = async (id: string) => {
    try {
      await api.delete(`meetings/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Ata/Reunição deletada com sucesso!'
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
        description: ''
      } as FormProps);
      setUploadedFiles([]);
      setText('');
      fetchData();
    } catch (e: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message
      });
    }
  };

  const handleOpenViewInfos = (infos: MeetingInfoProps) => {
    setModalView({
      isOpen: true,
      meetingInfos: {
        meeting_id: infos.meeting_id,
        title: infos.title,
        date: infos.date,
        responsavel: infos.responsavel,
        cliente: infos.cliente,
        tenant_id: infos.tenant_id,
        user_id: infos.user_id,
        description: infos.description,
        email_alert: infos.email_alert,
        members: infos.members,
        files: infos.files
      }
    });
  };

  const handleCloseModalInfos = () => {
    setModalView({
      isOpen: false,
      meetingInfos: {
        meeting_id: '',
        title: '',
        date: '',
        responsavel: '',
        cliente: '',
        tenant_id: '',
        user_id: '',
        description: '',
        email_alert: '',
        members: [],
        files: []
      }
    });
  };

  return (
    <Container>
      <HeaderPage title="Atas e Reuniões">
        <ButtonDefault
          typeButton="success"
          onClick={() => setModal({ ...modal, ['isOpen']: true })}
        >
          <BiPlus color="#fff" />
          Nova Ata/Reunião
        </ButtonDefault>
      </HeaderPage>

      <SectionDefault>
        {/* <ContentDefault>
          <FieldGroupFormDefault>
            <FieldGroupFormDefault>
              <InputDefault
                label="Data inicial"
                placeholder="00/00/0000"
                name="dateStart"
                type="date"
                icon={BiCalendar}
                onChange={(e) => setFilterDate({ ...filterDate, ['dateStart']: e.target.value })}
                value={filterDate.dateStart}
              />

              <InputDefault
                label="Data final"
                placeholder="00/00/0000"
                name="dateEnd"
                type="date"
                icon={BiCalendar}
                onChange={(e) => setFilterDate({ ...filterDate, ['dateEnd']: e.target.value })}
                value={filterDate.dateEnd}
              />
            </FieldGroupFormDefault>
            <SelectDefault
              label="Ordenar por"
              name="order"
              placeHolder="Ordenação"
              onChange={(e) => setFilterOredr(e.target.value)}
              value={filterOrder}
            >
              <option value="asc">Mais recente</option>
              <option value="desc">Mais antigo</option>
            </SelectDefault>

            <InputDefault
              label="Busca"
              name="search"
              placeholder="Busque pelo titulo..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
                debouncedCallback(event.target.value);
              }}
              icon={BiSearchAlt}
              isLoading={isLoading}
              value={searchTerm}
            />
          </FieldGroupFormDefault>
        </ContentDefault> */}

        <ContainerGroupTable>
          <div style={{ margin: '-24px -30px' }}>
            <Table>
              <TableHead>
                <div className="groupTable">
                  <h2>
                    Registro de atas{' '}
                    <strong>
                      {data && data?.length < 1
                        ? `${data?.length} ata de reunião`
                        : `${data?.length} atas de reunião`}{' '}
                    </strong>
                  </h2>
                </div>
              </TableHead>
              <FilterGroup
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <ButtonsFilter>
                  <FilterButton
                    onClick={() => {
                      setSelectedFilter('all');
                      setFilterOrder('');
                    }}
                    className={selectedFilter === 'all' ? 'selected' : ''}
                  >
                    Ver todos
                  </FilterButton>
                  <FilterButton
                    onClick={() => {
                      setSelectedFilter('recent');
                      setFilterOrder('asc');
                    }}
                    className={selectedFilter === 'recent' ? 'borders selected' : 'borders'}
                  >
                    Mais recente
                  </FilterButton>
                  <FilterButton
                    onClick={() => {
                      setSelectedFilter('older');
                      setFilterOrder('desc');
                    }}
                    className={selectedFilter === 'older' ? 'selected' : ''}
                  >
                    Mais antigo
                  </FilterButton>
                </ButtonsFilter>
                <div>
                  <InputDefault
                    label=""
                    name="search"
                    placeholder="Faça sua busca..."
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      debouncedCallback(event.target.value);
                    }}
                    value={searchTerm}
                    icon={BiSearchAlt}
                    isLoading={isLoading}
                    className="search-field"
                  />
                </div>

                {/* <ButtonDefault typeButton="light">
                  <BiFilter />
                  Filtros
                </ButtonDefault> */}
              </FilterGroup>
              <table>
                <thead>
                  <tr style={{ whiteSpace: 'nowrap' }}>
                    <th>ID</th>
                    <th>Titulo</th>
                    <th>Cliente</th>
                    <th>Responsável</th>
                    <th>Data</th>
                    <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((row) => (
                    <tr key={row.meeting_id}>
                      <td>#{String(row.meeting_id).padStart(5, '0')}</td>
                      <td>{row.title}</td>
                      <td>{row.cliente}</td>
                      <td>{row.responsavel}</td>
                      <td>{moment(row.date).format('DD/MM/YYYY')}</td>
                      <td>
                        <div className="fieldTableClients">
                          <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />
                          <ButtonTable typeButton="view" onClick={() => handleOpenViewInfos(row)} />
                          <Alert
                            title="Atenção"
                            subtitle="Certeza que gostaria de deletar esta Ata/Reunião? Ao excluir a acão não poderá ser desfeita."
                            confirmButton={() => handleOnDelete(row.meeting_id)}
                          >
                            <ButtonTable typeButton="delete" />
                          </Alert>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan={100}>
                      <Pagination
                        total={pages.total}
                        perPage={pages.perPage}
                        currentPage={selected}
                        lastPage={pages.lastPage}
                        onClickPage={(e) => setSelected(e)}
                      />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </Table>
          </div>
        </ContainerGroupTable>

        {/* <Paginate
          total={pages.total}
          perPage={pages.perPage}
          currentPage={selected}
          lastPage={pages.lastPage}
          onClickPage={(e) => setSelected(e)}
        /> */}
      </SectionDefault>

      <ModalDefault isOpen={modal.isOpen} onOpenChange={handleOnCancel} title={modal.type}>
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Titulo"
              placeholder="Titulo da Ata/Reunião"
              name="title"
              onChange={handleOnChange}
              value={formData.title}
              alert="Titulo é obrigatório"
              error={errors?.title}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Cliente"
              name="tenant_id"
              placeHolder="Selecione"
              onChange={handleChangeClient}
              value={formData?.tenant_id}
              alert="Cliente é obrigatório"
              error={errors?.tenant_id}
            >
              {dataClient?.map((row) => (
                <option key={row.tenant_id} value={row.tenant_id}>
                  {row.name}
                </option>
              ))}
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputSwitchDefault
              name="email_alert"
              label="Enviar para o cliente por e-mail"
              onChange={handleOnChangeCheckbox}
              isChecked={String(formData.email_alert) === 'true' ? true : false}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Responsável"
              name="user_id"
              placeHolder="Selecione"
              onChange={handleOnChange}
              alert="Responsavel é obrigatório"
              value={formData.user_id}
              error={errors?.user_id}
            >
              {dataTeam?.map((row) => (
                <option key={row.user_id} value={row.user_id}>
                  {row.name}
                </option>
              ))}
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputMultipleSelect
              name="members"
              options={selectedTeam?.map((row) => ({ value: row.user_id, label: row.username }))}
              label="Membros"
              isDisabled={formData.user_id ? false : true}
              onChange={(option) => onChange(option)}
              defaultValue={defaultOptionsTeam?.map((row) => ({
                value: row.user_id,
                label: row.username
              }))}
              alert="Selecione pelo menos um Responsável"
              error={errors?.members}
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault
              label="Data"
              placeholder="00/00/0000"
              name="date"
              type="date"
              icon={BiCalendar}
              onChange={handleOnChange}
              value={formData.date}
              alert="Data é obrigatória"
              error={errors?.date}
            />
          </FieldDefault>

          <FieldDefault>
            <UploadFiles
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={formData?.tenant_id}
              isDisabed={!formData?.tenant_id}
              loading={loading}
              setLoading={setLoading}
              folderInfo="meetings"
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
            <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>

      <ModalDefault
        isOpen={modalView.isOpen}
        onOpenChange={handleCloseModalInfos}
        title={modalView.meetingInfos.title}
      >
        <ModalInfosWrapper>
          <button className="close" onClick={handleCloseModalInfos}>
            <IconClose />
          </button>

          <ModalField>
            <div className="title-info">Cliente:</div>
            <div className="info">{modalView.meetingInfos.cliente}</div>
          </ModalField>

          <ModalField>
            <div className="title-info">Responsável:</div>
            <div className="info">{modalView.meetingInfos.responsavel}</div>
          </ModalField>

          <ModalField>
            <div className="title-info">Membros:</div>
            <div className="info">
              {/* {modalView.meetingInfos.members.map((row) => row.user_id)} */}
              ???
            </div>
          </ModalField>

          <ModalField>
            <div className="title-info">Data:</div>
            <div className="info">{moment(modalView.meetingInfos.date).format('DD/MM/YYYY')}</div>
          </ModalField>

          <ModalField className="info-description">
            <div className="title-info">Descrição:</div>
            <div
              className="info"
              dangerouslySetInnerHTML={{ __html: modalView.meetingInfos.description }}
            ></div>
          </ModalField>
        </ModalInfosWrapper>
      </ModalDefault>
    </Container>
  );
}
