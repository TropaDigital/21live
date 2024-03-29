/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useRef, useState } from 'react';

// Icons
import { BiCalendar, BiFilter, BiPlus, BiSearchAlt, BiShow, BiX } from 'react-icons/bi';
import { IconClose } from '../../../assets/icons';
import { FaDownload } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// Services
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';
import { useAuth } from '../../../hooks/AuthContext';

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
  AppliedFilter,
  ContainerGroupTable,
  FieldDefault,
  FilterTotal,
  FooterModal,
  SectionDefault
} from '../../../components/UiElements/styles';
import UploadFiles from '../../../components/Upload/UploadFiles';
import WrapperEditor from '../../../components/WrapperEditor';
import Pagination from '../../../components/Pagination';
import SelectImage from '../../../components/Inputs/SelectWithImage';
import FilterModal from '../../../components/Ui/FilterModal';
import ModalLoader from '../../../components/Ui/ModalLoader';

// Styles
import {
  ButtonsFilter,
  Container,
  DownloadFileBtn,
  FieldEditor,
  FileInfo,
  FilesWrapper,
  FilterButton,
  FilterWrapper,
  FinishModalMessage,
  FinishModalTitle,
  ModalField,
  ModalInfosWrapper,
  NameField,
  NamesWrapper,
  ViewFileBtn
} from './styles';
import { ModalImage } from '../../Requests/ViewRequests/styles';
import { FinishModal, FinishModalButtons } from '../../Projects/CreateProject/styles';

// Libraries
import moment from 'moment';

// Types
import { UploadedFilesProps } from '../../../types';
import { useNavigate } from 'react-router-dom';

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

interface DownloadFiles {
  bucket: string;
  created: string;
  file_name: string;
  original_name: string;
  key: string;
  meeting_file_id: string;
  meeting_id: string;
  size: string;
  updated: string;
  url: string;
}

interface FilterProps {
  client: string;
  fromDate: string;
  toDate: string;
  user_id: string;
  [key: string]: string; // Index signature
}

interface RequesterProps {
  user_id: string;
  name: string;
  username: string;
}

export default function ListMeeting() {
  const { addToast } = useToast();
  const { user } = useAuth();
  const formRef = useRef<any>();
  const navigate = useNavigate();
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

  const [filterOrder, setFilterOrder] = useState('desc');
  const [filter, setFilter] = useState<FilterProps>({
    client: '',
    fromDate: '',
    toDate: '',
    user_id: ''
  });

  const { data, pages, fetchData, isFetching } = useFetch<MeetingProps[]>(
    `meetings?search=${search.replace(/[^\w ]/g, '')}&date_start=${filter.fromDate}&date_end=${
      filter.toDate
    }&order=${filterOrder}&tenant=${filter.client}&user=${filter.user_id}`
  );
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataTeam } = useFetch<TeamProps[]>(`team`);
  const [requestersList, setRequestersList] = useState<RequesterProps[]>([]);
  const [modalFilters, setModalFilters] = useState<boolean>(false);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [sendFiles, setSendFiles] = useState<boolean>(false);
  const [meetingId, setMeetingId] = useState<any>();

  // const selectedTeam = dataTeam?.filter((obj) => obj.user_id !== formData.user_id);
  // const defaultOptionsTeam = dataTeam?.filter((item) =>
  //   formData.members.some((member: any) => member.user_id === item.user_id)
  // );
  // const mentionList = dataTeam?.map((obj) => ({ id: obj.user_id, label: obj.username }));
  const defaultOptionsTeam = requestersList?.filter((item) =>
    formData.members.some((member: any) => member.user_id === item.user_id)
  );

  async function getRequesters(tenantId: string) {
    try {
      const response = await api.get(`/task/requester/${tenantId}`);
      if (response.data.result.length > 0) {
        setRequestersList(response.data.result);
      }
    } catch (error) {
      console.log('log do get requesters', error);
    }
  }

  useEffect(() => {
    if (formData.tenant_id) {
      getRequesters(formData.tenant_id);
    }
  }, [formData]);

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState('');
  const [clientFilter, setClientFilter] = useState({
    value: '',
    label: '',
    image: '',
    color: ''
  });
  const [responsibleSelected, setResponsibleSelected] = useState<any>();

  const [previewImage, setPreviewImage] = useState({
    isOpen: false,
    imageInfos: {
      bucket: '',
      created: '',
      file_name: '',
      original_name: '',
      key: '',
      meeting_file_id: '',
      meeting_id: '',
      size: '',
      updated: '',
      url: ''
    }
  });

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

  const handleChangeClient = (clientInfos: any) => {
    setFormValue('tenant_id', clientInfos.value);
    setInitialValue(clientInfos);
  };

  const [initialValue, setInitialValue] = useState({
    value: '',
    label: '',
    image: '',
    color: ''
  });

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
    setInitialValue({
      value: '',
      label: '',
      image: '',
      color: ''
    });
    // fetchData();
  };

  function handleOnEdit(data: MeetingProps) {
    setData(data);
    setUploadedFiles(data.files);
    setText(data.description);

    const selectedClient = clientsOptions?.filter((obj) => obj.value === data.tenant_id);

    if (selectedClient !== undefined) {
      setInitialValue(selectedClient[0]);
    }

    setModal({
      isOpen: true,
      type: `Alterar Ata de Reunião: ${data.title}`
    });
  }

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        setLoading(true);
        event.preventDefault();

        // // Inserir lógica
        const files = uploadedFiles.map((row) => ({
          bucket: row.bucket,
          file_name: row.file_name,
          original_name: row.original_name,
          key: row.key,
          size: row.size,
          url: row.url
        }));

        const { title, tenant_id, user_id, date, email_alert, members } = formData;

        const newFormData = {
          files: [],
          title,
          tenant_id,
          user_id,
          date,
          email_alert: String(email_alert),
          description: text,
          members
        };

        const updateFormData = {
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
          const response = await api.post(`meetings`, newFormData);
          setMeetingId(response.data.result);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Ata de reunião criada com sucesso!'
          });
          setFinishModal(true);
        } else {
          await api.put(`meetings/${formData.meeting_id}`, updateFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Ata de reunião editada com sucesso!'
          });
        }

        setModal({
          isOpen: false,
          type: 'Criar nova Ata de Reunião'
        });

        fetchData();

        setLoading(false);
      } catch (e: any) {
        // Exibir erro
        console.log('ERROR =>', e);
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });

        setErrors(getValidationErrors(e.response.data.result));

        setLoading(false);
      }
    },
    [uploadedFiles, formData, text, modal.type, addToast, setData, fetchData]
  );

  async function handleUpdateWithFiles() {
    try {
      const files = uploadedFiles.map((row) => ({
        bucket: row.bucket,
        file_name: row.file_name,
        original_name: row.original_name,
        key: row.key,
        size: row.size,
        url: row.url
      }));

      const { title, tenant_id, user_id, date, email_alert, members } = formData;

      const updateFormData = {
        files,
        title,
        tenant_id,
        user_id,
        date,
        email_alert: String(email_alert),
        description: text,
        members
      };

      setLoading(true);

      const response = await api.put(`meetings/${meetingId}`, updateFormData);

      if (response.data.result) {
        setSendFiles(false);
        setFinishModal(false);
        handleOnCancel();
        fetchData();
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log error update meetings', error);
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: error.response.data.message
        });
      }
      setLoading(false);
    }
  }

  const handleOnDelete = async (id: string) => {
    try {
      await api.delete(`meetings/${id}`);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Ata de reunião deletada com sucesso!'
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

    setPreviewImage({
      isOpen: false,
      imageInfos: {
        bucket: '',
        created: '',
        file_name: '',
        original_name: '',
        key: '',
        meeting_file_id: '',
        meeting_id: '',
        size: '',
        updated: '',
        url: ''
      }
    });
  };

  const clientsOptions = dataClient?.map((row) => {
    return {
      value: row.tenant_id,
      label: row.name,
      image: row.bucket,
      color: row.colormain
    };
  });

  async function downloadFile(file: any) {
    try {
      const response = await api.get(
        `https://app.21live.com.br:3000/archive?bucket=${file.bucket}&key=${file.key}`,
        { responseType: 'arraybuffer' }
      );

      // console.log('log do response download =>', response);

      const blob = new Blob([response.data]);
      const urlResponse = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = urlResponse;
      link.setAttribute('download', `${file.original_name}`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(urlResponse);
    } catch (error: any) {
      console.log('log error download file', error);
    }
  }

  const handleApplyFilters = (filters: any) => {
    setFilter(filters);
    setModalFilters(false);
  };

  const handleClearFilters = () => {
    setFilter({
      client: '',
      fromDate: '',
      toDate: '',
      user_id: ''
    });
    setModalFilters(false);
  };

  const hasFilters = Object.values(filter).every((obj) => obj === null || obj === '');

  const countNonEmptyProperties = () => {
    let count = 0;
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        // Check if the property is not empty or null
        if (filter[key] !== '' && filter[key] !== null) {
          count++;
        }
      }
    }
    return count;
  };

  const checkIfClickedOutside = (e: any) => {
    if (formData.title !== '' && formRef.current && !formRef.current.contains(e.target)) {
      setCancelModal(true);
    }
  };

  const handleFinishWithoutFiles = () => {
    // addToast({
    //   type: 'success',
    //   title: 'Sucesso',
    //   description: 'Projeto criado com sucesso!'
    // });
    setFinishModal(false);
    navigate('/reuniao');
  };

  useEffect(() => {
    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = '');
    }

    window.addEventListener('beforeunload', handleOnBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [formData]);

  return (
    <Container>
      {user?.permissions?.includes('jobs_meetings_add') && (
        <HeaderPage title="Atas de reuniões">
          <ButtonDefault
            typeButton="success"
            onClick={() => setModal({ ...modal, ['isOpen']: true })}
          >
            <BiPlus color="#fff" />
            Nova Ata/Reunião
          </ButtonDefault>
        </HeaderPage>
      )}

      {!user?.permissions?.includes('jobs_meetings_add') && <HeaderPage title="Atas de reuniões" />}

      {!isFetching && (
        <SectionDefault>
          <ContainerGroupTable>
            <div style={{ margin: '-24px -30px' }}>
              <Table>
                <TableHead>
                  <div className="groupTable">
                    <h2>
                      Registro de atas{' '}
                      <strong>
                        {pages?.total === 1
                          ? `${pages?.total} ata de reunião`
                          : `${pages?.total} atas de reunião`}{' '}
                      </strong>
                    </h2>
                  </div>

                  <FilterWrapper>
                    <InputDefault
                      label=""
                      name="search"
                      placeholder="Buscar..."
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                        debouncedCallback(event.target.value);
                      }}
                      value={searchTerm}
                      icon={BiSearchAlt}
                      isLoading={isLoading}
                      className="search-field"
                    />

                    {!hasFilters && (
                      <ButtonDefault typeButton="danger" isOutline onClick={handleClearFilters}>
                        <div className="close-icon">
                          <BiX size={30} />
                        </div>
                        Limpar filtros
                      </ButtonDefault>
                    )}

                    <ButtonDefault
                      typeButton="lightWhite"
                      isOutline
                      onClick={() => setModalFilters(true)}
                    >
                      <BiFilter />
                      Filtros
                    </ButtonDefault>
                  </FilterWrapper>
                </TableHead>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <FilterGroup>
                    <ButtonsFilter>
                      <FilterButton
                        onClick={() => {
                          setFilterOrder('desc');
                        }}
                        className={filterOrder === 'desc' ? 'selected' : ''}
                      >
                        Mais recente
                      </FilterButton>
                      <FilterButton
                        onClick={() => {
                          setFilterOrder('asc');
                        }}
                        className={filterOrder === 'asc' ? 'selected' : ''}
                      >
                        Mais antigo
                      </FilterButton>
                    </ButtonsFilter>
                    {!hasFilters && (
                      <FilterTotal>
                        <div className="filter-title">Filtros ({countNonEmptyProperties()}):</div>
                        {filter.client !== '' ? <span>Cliente</span> : ''}
                        {filter.user_id !== '' ? <span>Responsável</span> : ''}
                        {filter.fromDate !== '' ? <span>Data</span> : ''}
                      </FilterTotal>
                    )}
                  </FilterGroup>
                  {!hasFilters && (
                    <FilterGroup>
                      <AppliedFilter>
                        {filter.client !== '' ? (
                          <div className="filter-title">
                            Cliente: <span>{clientFilter.label}</span>
                          </div>
                        ) : (
                          ''
                        )}

                        {filter.user_id !== '' ? (
                          <div className="filter-title">
                            Responsável: <span>{responsibleSelected?.name}</span>
                          </div>
                        ) : (
                          ''
                        )}

                        {filter.fromDate !== '' ? (
                          <div className="filter-title">
                            Data inicial:{' '}
                            <span>{moment(filter.fromDate).format('DD/MM/YYYY')}</span>
                          </div>
                        ) : (
                          ''
                        )}

                        {filter.toDate !== '' ? (
                          <div className="filter-title">
                            Data final: <span>{moment(filter.toDate).format('DD/MM/YYYY')}</span>
                          </div>
                        ) : (
                          ''
                        )}
                      </AppliedFilter>
                    </FilterGroup>
                  )}
                </div>
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
                        <td style={{ cursor: 'pointer' }} onClick={() => handleOpenViewInfos(row)}>
                          #{String(row.meeting_id).padStart(5, '0')}
                        </td>
                        <td style={{ cursor: 'pointer' }} onClick={() => handleOpenViewInfos(row)}>
                          {row.title}
                        </td>
                        <td style={{ cursor: 'pointer' }} onClick={() => handleOpenViewInfos(row)}>
                          {row.cliente}
                        </td>
                        <td style={{ cursor: 'pointer' }} onClick={() => handleOpenViewInfos(row)}>
                          {row.responsavel}
                        </td>
                        <td style={{ cursor: 'pointer' }} onClick={() => handleOpenViewInfos(row)}>
                          {moment(row.date).format('DD/MM/YYYY')}
                        </td>
                        <td>
                          <div className="fieldTableClients">
                            <ButtonTable
                              typeButton="view"
                              onClick={() => handleOpenViewInfos(row)}
                            />
                            {user?.permissions?.includes('jobs_meetings_edit') && (
                              <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />
                            )}

                            {user?.permissions?.includes('jobs_meetings_delete') && (
                              <Alert
                                title="Atenção"
                                subtitle="Certeza que gostaria de deletar esta Ata/Reunião? Ao excluir a acão não poderá ser desfeita."
                                confirmButton={() => handleOnDelete(row.meeting_id)}
                              >
                                <ButtonTable typeButton="delete" />
                              </Alert>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}

                    {data && data.length <= 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center' }}>
                          Sem atas
                        </td>
                      </tr>
                    )}
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
      )}

      {/* Modal add Meeting */}
      <ModalDefault
        isOpen={modal.isOpen}
        onOpenChange={() => (formData.title !== '' ? checkIfClickedOutside : handleOnCancel())}
        title={modal.type}
      >
        <form onSubmit={handleOnSubmit} ref={formRef}>
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
            <SelectImage
              label={'Cliente'}
              dataOptions={clientsOptions}
              value={initialValue.value !== '' ? initialValue : null}
              onChange={handleChangeClient}
              placeholder={'Selecione o cliente...'}
            />
            {/* <SelectDefault
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
            </SelectDefault> */}
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

          <FieldDefault style={{ maxWidth: '390px' }}>
            <InputMultipleSelect
              name="members"
              options={requestersList?.map((row) => ({
                value: row.user_id,
                label: row.name
              }))}
              label="Solicitantes"
              isDisabled={formData.tenant_id ? false : true}
              onChange={(option) => onChange(option)}
              defaultValue={defaultOptionsTeam?.map((row) => ({
                value: row.user_id,
                label: row.name
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
              max={'9999-12-31'}
              icon={BiCalendar}
              onChange={handleOnChange}
              value={formData.date}
              alert="Data é obrigatória"
              error={errors?.date}
            />
          </FieldDefault>

          {modal.type !== 'Criar nova Ata de Reunião' && (
            <FieldDefault>
              <UploadFiles
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                isDisabed={!formData?.tenant_id}
                loading={loading}
                setLoading={setLoading}
                folderInfo="meetings"
                project_id={''}
                meeting_id={formData?.meeting_id}
              />
            </FieldDefault>
          )}

          <FieldEditor>
            <WrapperEditor
              mentionData={[]}
              value={text}
              handleOnDescription={(value: any) => setText(value)}
            />
          </FieldEditor>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>
            <ButtonDefault loading={loading} typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>

      {/* Modal View Meeting */}
      <ModalDefault
        isOpen={modalView.isOpen}
        onOpenChange={handleCloseModalInfos}
        title={modalView.meetingInfos.title}
      >
        <ModalInfosWrapper>
          {!previewImage.isOpen && (
            <>
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
                <NamesWrapper>
                  {modalView.meetingInfos.members.map((row: any, index: number) => {
                    return <NameField key={index}>{(index ? ', ' : '') + row.name}</NameField>;
                  })}
                </NamesWrapper>
              </ModalField>

              <ModalField>
                <div className="title-info">Data:</div>
                <div className="info">
                  {moment(modalView.meetingInfos.date).format('DD/MM/YYYY')}
                </div>
              </ModalField>

              {modalView.meetingInfos.files.length > 0 && (
                <ModalField className="info-description">
                  <div className="title-info">Anexos:</div>
                  <FilesWrapper>
                    {modalView.meetingInfos.files.map((row: DownloadFiles) => (
                      <FileInfo key={row.meeting_file_id}>
                        <div className="name-file">{row.original_name}</div>
                        <div className="file-icons">
                          <ViewFileBtn
                            onClick={() =>
                              setPreviewImage({
                                isOpen: true,
                                imageInfos: {
                                  bucket: row.bucket,
                                  created: row.created,
                                  file_name: row.file_name,
                                  original_name: row.original_name,
                                  key: row.key,
                                  meeting_file_id: row.meeting_file_id,
                                  meeting_id: row.meeting_id,
                                  size: row.size,
                                  updated: row.updated,
                                  url: row.url
                                }
                              })
                            }
                          >
                            <BiShow size={20} />
                          </ViewFileBtn>
                          <DownloadFileBtn onClick={() => downloadFile(row)}>
                            <FaDownload />
                          </DownloadFileBtn>
                        </div>
                      </FileInfo>
                    ))}
                  </FilesWrapper>
                </ModalField>
              )}

              <ModalField className="info-description">
                <div className="title-info">Descrição:</div>
                <div
                  className="info"
                  dangerouslySetInnerHTML={{ __html: modalView.meetingInfos.description }}
                ></div>
              </ModalField>
            </>
          )}

          {previewImage.isOpen && (
            <ModalImage
              style={{
                backgroundImage: `url(https://${previewImage.imageInfos.bucket}.s3.amazonaws.com/${previewImage.imageInfos.key})`
              }}
            >
              <div
                className="close-button"
                onClick={() =>
                  setPreviewImage({
                    isOpen: false,
                    imageInfos: {
                      bucket: '',
                      created: '',
                      file_name: '',
                      original_name: '',
                      key: '',
                      meeting_file_id: '',
                      meeting_id: '',
                      size: '',
                      updated: '',
                      url: ''
                    }
                  })
                }
              >
                <MdClose />
              </div>
            </ModalImage>
          )}
        </ModalInfosWrapper>
      </ModalDefault>

      {/* Modal discard changes */}
      <ModalDefault isOpen={cancelModal} onOpenChange={() => ''} title="Descartar alterações">
        <FinishModal>
          <div>Deseja realmente descartar as alterações?</div>

          <FinishModalButtons>
            <ButtonDefault typeButton="dark" isOutline onClick={() => setCancelModal(false)}>
              Cancelar
            </ButtonDefault>
            <ButtonDefault
              typeButton="danger"
              onClick={() => {
                handleOnCancel();
                setCancelModal(false);
              }}
            >
              Descartar
            </ButtonDefault>
          </FinishModalButtons>
        </FinishModal>
      </ModalDefault>

      {/* Modal send files */}
      <ModalDefault isOpen={finishModal} onOpenChange={() => setFinishModal(false)}>
        <FinishModal>
          {!sendFiles && (
            <>
              <FinishModalTitle>Enviar anexos</FinishModalTitle>
              <FinishModalMessage>
                <div className="modal-title">Ata criada com sucesso!</div>
                <div className="modal-subtitle">Deseja enviar arquivos para essa ata?</div>
              </FinishModalMessage>
              <FinishModalButtons>
                <ButtonDefault typeButton="dark" isOutline onClick={handleFinishWithoutFiles}>
                  Não enviar
                </ButtonDefault>
                <ButtonDefault
                  typeButton="primary"
                  onClick={() => {
                    setSendFiles(true);
                    setModal({
                      isOpen: false,
                      type: 'Upload files'
                    });
                  }}
                >
                  Enviar
                </ButtonDefault>
              </FinishModalButtons>
            </>
          )}

          {sendFiles && (
            <>
              <FinishModalTitle>Anexos</FinishModalTitle>
              <FieldDefault>
                <UploadFiles
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  loading={loading}
                  setLoading={setLoading}
                  folderInfo="meetings"
                  project_id={''}
                  meeting_id={meetingId}
                />
              </FieldDefault>
              <FinishModalButtons>
                <ButtonDefault
                  typeButton="dark"
                  isOutline
                  onClick={() => {
                    setFinishModal(false);
                    setSendFiles(false);
                    navigate('/reuniao');
                  }}
                >
                  Cancelar
                </ButtonDefault>
                <ButtonDefault typeButton="primary" onClick={handleUpdateWithFiles}>
                  Confirmar
                </ButtonDefault>
              </FinishModalButtons>
            </>
          )}
        </FinishModal>
      </ModalDefault>

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading || isFetching} />

      {/* Modal filters */}
      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={handleApplyFilters}
        clearFilters={handleClearFilters}
        clientSelected={setClientFilter}
        responsible={setResponsibleSelected}
        filterType="meet"
      />
    </Container>
  );
}
