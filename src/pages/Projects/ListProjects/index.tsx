/* eslint-disable import-helpers/order-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Icons
import { BiFilter, BiPlus, BiSearchAlt, BiShow, BiX } from 'react-icons/bi';
import { FaDownload } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// Libraries
import Switch from 'react-switch';
import moment from 'moment';
import axios from 'axios';
import DocViewer from '@cyntler/react-doc-viewer';

// Services
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import { useAuth } from '../../../hooks/AuthContext';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';

// Types
import { IProjectCreate } from '../../../types';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import Pagination from '../../../components/Pagination';
import { Table } from '../../../components/Table';
import { FilterGroup, TableHead } from '../../../components/Table/styles';
import Alert from '../../../components/Ui/Alert';
import ModalDefault from '../../../components/Ui/ModalDefault';
import ProgressBar from '../../../components/Ui/ProgressBar';
import {
  AppliedFilter,
  ContainerDefault,
  FilterTotal
} from '../../../components/UiElements/styles';
import Avatar from '../../../components/Ui/Avatar';
import { ModalImage } from '../../Requests/ViewRequests/styles';
import FilterModal from '../../../components/Ui/FilterModal';
import ModalLoader from '../../../components/Ui/ModalLoader';

// Styles
import { Summary } from '../../Tasks/ComponentSteps/SummaryTasks/styles';
import { SummaryTaskInfo } from '../../Tasks/ComponentSteps/SummaryTasks/styles';
import { SummaryInfoWrapper } from '../../Tasks/ComponentSteps/SummaryTasks/styles';
import { SummaryTaskDescription } from '../../Tasks/ComponentSteps/SummaryTasks/styles';
import { SummaryCard } from '../../Tasks/ComponentSteps/SummaryTasks/styles';
import { SummaryCardTitle } from '../../Tasks/ComponentSteps/SummaryTasks/styles';
import { SummaryCardSubtitle } from '../../Tasks/ComponentSteps/SummaryTasks/styles';
import {
  AlertDelete,
  DownloadFileBtn,
  FileInfo,
  FileList,
  FilterProjects,
  ModalShowProjectWrapper,
  ModalTasksOnProjectWrapper,
  ProjectStatus,
  TaskInfosItem,
  TaskListItem,
  TaskListOnUse,
  ViewFileBtn
} from './styles';
import CloseModalBtn from '../../../components/Ui/CloseModalBtn';
import { ModalButtons } from '../../Team/ListTeam/styles';

interface StateProps {
  [key: string]: any;
}

interface FilterProps {
  fromDate: string;
  toDate: string;
  client: string;
  category: string;
  status: string;
  type: string;
  [key: string]: string | any; // Index signature
}

interface TaskListItem {
  task_id: string;
  title: string;
  tenant_id: string;
  project_product_id: string;
  flow_id: string;
  description: string;
  creation_description: string;
  creation_date_end: string;
  copywriting_description: string;
  copywriting_date_end: string;
  step: string;
  created: string;
  updated: string;
  deleted: string;
  type: string;
  total_time: string;
  status: string;
  time_consumed: string;
  type_play: string;
  user_id: string;
  urgent: string;
  ticket_id: string;
  start_job: string;
  end_job: string;
  organization_id: string;
  requester_id: string;
  parent_id: string;
  return_id: string;
}

export default function ListProjects() {
  const { addToast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [modalShowProject, setModalShowProject] = useState({
    isOpen: false,
    type: 'Criar nova Ata de Reunião',
    project: {
      title: '',
      contract_type: '',
      category: '',
      client_name: '',
      organization_name: '',
      project_id: '',
      date_start: '',
      date_end: '',
      description: '',
      time: '',
      products: [],
      files: []
    }
  });

  // const { formData, setFormValue, setData, handleOnChange } = useForm({
  //   tenant_id: '',
  //   title: '',
  //   contract_type: '',
  //   category: '',
  //   project_id: '',
  //   date_start: '',
  //   date_end: '',
  //   description: '',
  //   products: [],
  //   files: []
  // } as IProjectCreate);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [modalFilters, setModalFilters] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
    project_id: ''
  });
  const [filter, setFilter] = useState<FilterProps>({
    fromDate: '',
    toDate: '',
    client: '',
    category: '',
    status: '',
    type: ''
  });

  // const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  // const [error, setError] = useState<StateProps>({});
  // const [loading, setLoading] = useState(false);

  // PRODUTOS
  // const { data: dataOffice } = useFetch<IProjectCreate[]>(`services`);
  // const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [selected, setSelected] = useState(1);
  const {
    data: dataProject,
    fetchData: fetchProject,
    isFetching,
    pages
  } = useFetch<IProjectCreate[]>(
    `project?search=${search.replace(/[^\w ]/g, '')}&page=${selected}&tenant=${
      filter.client
    }&date_start=${filter.fromDate}&date_end=${filter.toDate}&category=${
      filter.category
    }&status_fake=${filter.status}&status=${filter.type}`
  );
  // const [listSelected, setListSelected] = useState<any[]>([]);

  // const handleOnAddProducts = (items: any) => {
  //   setFormValue('products', [...formData.products, ...items]);
  // };

  // const handleOnDeleteProduct = (id: number) => {
  //   console.log('ID', id);
  //   setFormValue(
  //     'products',
  //     formData.products.filter((product: any) => product.job_service_id !== id)
  //   );
  // };

  // const handleOnIncrememtQtd = useCallback(
  //   (value: any) => {
  //     const updatedProducts = [...formData.products];
  //     const productIndex = updatedProducts.findIndex(
  //       (product) => product.job_service_id === value.job_service_id
  //     );
  //     const updatedProductCopy = { ...updatedProducts[productIndex] };
  //     updatedProductCopy.quantity = Number(updatedProductCopy.quantity) + 1;
  //     updatedProducts[productIndex] = updatedProductCopy;
  //     setFormValue('products', updatedProducts);
  //   },
  //   [setFormValue, formData]
  // );

  // const handleOnDecrementQtd = useCallback(
  //   (value: any) => {
  //     const updatedProducts = [...formData.products];
  //     const productIndex = updatedProducts.findIndex(
  //       (product) => product.job_service_id === value.job_service_id
  //     );
  //     const updatedProductCopy = { ...updatedProducts[productIndex] };
  //     updatedProductCopy.quantity = Number(updatedProductCopy.quantity) - 1;
  //     updatedProducts[productIndex] = updatedProductCopy;
  //     setFormValue('products', updatedProducts);
  //   },
  //   [setFormValue, formData]
  // );

  // function isNumber(value: string) {
  //   return /^[0-9]*$/.test(value);
  // }

  // const handleInputProduct = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
  //     const newValue = event.target.value;
  //     if (isNumber(newValue)) {
  //       const updatedProducts = [...formData.products];
  //       const productIndex = updatedProducts.findIndex((product) => product.job_service_id === id);
  //       const updatedProductCopy = { ...updatedProducts[productIndex] };
  //       updatedProductCopy.quantity = newValue;
  //       updatedProducts[productIndex] = updatedProductCopy;
  //       setFormValue('products', updatedProducts);
  //     }
  //   },
  //   [setFormValue, formData]
  // );

  // const handleOnPeriod = useCallback(
  //   (value: any, id: any) => {
  //     const verifyPeriod = value ? 'anual' : 'mensal';
  //     const updatedProducts = [...formData.products];
  //     const productIndex = updatedProducts.findIndex((product) => product.job_service_id === id);
  //     const updatedProductCopy = { ...updatedProducts[productIndex] };
  //     updatedProductCopy.period = verifyPeriod;
  //     updatedProducts[productIndex] = updatedProductCopy;

  //     setFormValue('products', updatedProducts);
  //   },
  //   [setFormValue, formData]
  // );

  // const handleOnEdit = (item: IProjectCreate) => {
  //   setData(item);
  //   setUploadedFiles(item.files);

  //   setModalShowProject({
  //     isOpen: true,
  //     type: `Editar Projeto/Contrato: ${item.title}`,
  //     project: {

  //     }
  //   });
  // };

  const [previewImage, setPreviewImage] = useState({
    isOpen: false,
    imageInfos: {
      bucket: '',
      created: '',
      file_name: '',
      key: '',
      project_file_id: '',
      project_id: '',
      size: '',
      updated: '',
      url: ''
    }
  });
  const [taskList, setTaskList] = useState<any[]>([]);

  async function handleStatus(id: any) {
    try {
      if (user?.permissions?.includes('jobs_projects_edit')) {
        const response = await api.put(`/project/switch/${id}`);
        console.log('log do response', response.data);
        fetchProject();
      }
    } catch (error) {
      console.log('log do error', error);
    }
  }

  // useEffect(() => {
  //   function handleSelectedProjects(): any {
  //     dataProject?.forEach((item) => {
  //       const cloneItem: any = item;

  //       if (cloneItem?.status === '1' || cloneItem?.status === 'true') {
  //         setListSelected((obj) => [...obj, cloneItem?.project_id]);
  //       }
  //     });
  //   }

  //   handleSelectedProjects();
  // }, [dataProject]);

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`project/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Projeto foi deletado!'
      });

      fetchProject();
      setModalDelete({
        isOpen: false,
        project_id: ''
      });
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleOpenModal = (project: any) => {
    setModalShowProject({
      isOpen: true,
      type: `Resumo do Projeto: #${project.project_id}`,
      project: {
        title: project.title,
        client_name: project.client_name,
        organization_name: project.organization_name,
        contract_type: project.contract_type,
        category: project.category,
        project_id: project.project_id,
        date_start: project.date_start,
        date_end: project.date_end,
        description: project.description,
        products: project.products,
        files: project.files,
        time: project.time
      }
    });
  };

  const handleCloseModal = () => {
    setModalShowProject({
      isOpen: false,
      type: ``,
      project: {
        title: '',
        contract_type: '',
        category: '',
        client_name: '',
        organization_name: '',
        project_id: '',
        date_start: '',
        date_end: '',
        description: '',
        products: [],
        files: [],
        time: ''
      }
    });
    setPreviewImage({
      isOpen: false,
      imageInfos: {
        bucket: '',
        created: '',
        file_name: '',
        key: '',
        project_file_id: '',
        project_id: '',
        size: '',
        updated: '',
        url: ''
      }
    });
  };

  const handleEditProject = (project: any) => {
    // console.log('log do projeto a editar', project);
    navigate('/criar-projeto', { state: project });
  };

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
    } catch (error: any) {
      console.log('log error download file', error);
    }
  }

  const [clientFilter, setClientFilter] = useState({
    value: '',
    label: '',
    image: '',
    color: ''
  });

  const handleClearFilters = () => {
    setFilter({
      fromDate: '',
      toDate: '',
      client: '',
      category: '',
      status: '',
      type: ''
    });
    setModalFilters(false);
  };

  const hasFilters = Object.values(filter).every(
    (obj) => obj === null || obj === '' || obj === false
  );

  const handleApplyFilters = (filters: any) => {
    setFilter(filters);
    setModalFilters(false);
  };

  async function handleDeleteProject(idProject: string) {
    try {
      setLoading(true);

      const response = await api.get(`/project/check-delete/${idProject}`);

      if (response.data.result !== 'true') {
        setTaskList(response.data.result);
      }
      setModalDelete({
        isOpen: true,
        project_id: idProject
      });

      setLoading(false);
    } catch (e: any) {
      console.log('log error', e);
      if (e.response.data.result.length !== 0) {
        e.response.data.result.map((row: any) => {
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
          description: e.response.data.message
        });
      }
      setLoading(true);
    }
  }

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

  return (
    <ContainerDefault>
      {user?.permissions?.includes('jobs_projects_add') && (
        <HeaderPage title="Projetos">
          <Link to={'/criar-projeto'}>
            <ButtonDefault typeButton="success">
              <BiPlus color="#fff" />
              Adicionar Projeto
            </ButtonDefault>
          </Link>
        </HeaderPage>
      )}

      {!user?.permissions?.includes('jobs_projects_add') && <HeaderPage title="Projetos" />}

      {!isFetching && !loading && (
        <Table>
          <TableHead style={{ width: 'calc(100vw - 260px)' }}>
            <div className="groupTable">
              <h2>
                Lista de projetos
                {pages !== null && pages?.total > 0 ? (
                  <strong>
                    {pages?.total <= 1 ? `${pages?.total} projeto` : `${pages?.total} projetos`}{' '}
                  </strong>
                ) : (
                  <strong>0 projetos</strong>
                )}
              </h2>
            </div>

            <FilterProjects>
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
            </FilterProjects>
          </TableHead>

          {!hasFilters && (
            <FilterGroup style={{ width: 'calc(100vw - 260px)' }}>
              <FilterTotal>
                <div className="filter-title">Filtros ({countNonEmptyProperties()}):</div>
                {filter.client !== '' ? <span>Cliente</span> : ''}
                {filter.category !== '' ? <span>Tipo</span> : ''}
                {filter.fromDate !== '' ? <span>Data</span> : ''}
                {filter.status !== '' ? <span>Status</span> : ''}
                {filter.type !== '' ? <span>Ativo/Inativo</span> : ''}
              </FilterTotal>

              <AppliedFilter>
                {filter.client !== '' ? (
                  <div className="filter-title">
                    Cliente: <span>{clientFilter.label}</span>
                  </div>
                ) : (
                  ''
                )}

                {filter.category !== '' ? (
                  <div className="filter-title">
                    Tipo: <span style={{ textTransform: 'uppercase' }}>{filter.category}</span>
                  </div>
                ) : (
                  ''
                )}

                {filter.fromDate !== '' ? (
                  <div className="filter-title">
                    Data inicial: <span>{moment(filter.fromDate).format('DD/MM/YYYY')}</span>
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

                {filter.status !== '' ? (
                  <div className="filter-title">
                    Status: <span style={{ textTransform: 'capitalize' }}>{filter.status}</span>
                  </div>
                ) : (
                  ''
                )}

                {filter.type !== '' ? (
                  <div className="filter-title">
                    Ativo/Inativo:{' '}
                    <span style={{ textTransform: 'capitalize' }}>
                      {filter.type === 'true' ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </AppliedFilter>
            </FilterGroup>
          )}
          {/* <FilterGroup>
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

            <ButtonDefault typeButton="light">
              <BiFilter />
              Filtros
            </ButtonDefault>
          </FilterGroup> */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>FEE/SPOT</th>
                <th>Cliente</th>
                <th>Tempo</th>
                <th>Ativo / Inativo</th>
                <th>Equipe</th>
                <th>Data inicial</th>
                <th>Data final</th>
                <th>Status</th>
                <th
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    color: '#F9FAFB',
                    minHeight: '64px'
                  }}
                >
                  -
                </th>
              </tr>
            </thead>
            <tbody>
              {dataProject?.map((row) => (
                <tr key={row.project_id}>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleOpenModal(row)}>
                    #{String(row.project_id).padStart(5, '0')}
                  </td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleOpenModal(row)}>
                    {row.title}
                  </td>
                  <td
                    style={{ cursor: 'pointer', textTransform: 'uppercase' }}
                    onClick={() => handleOpenModal(row)}
                  >
                    {row.category}
                  </td>
                  <td
                    style={{ textTransform: 'capitalize', cursor: 'pointer' }}
                    onClick={() => handleOpenModal(row)}
                  >
                    {row.client_name}
                  </td>
                  <td
                    style={{
                      padding: '14px',
                      width: '140px',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleOpenModal(row)}
                  >
                    <span style={{ marginBottom: '4px', display: 'block' }}>
                      {row.time.startsWith('0') ? row.time?.replace('0', '') : row.time}
                    </span>
                    <ProgressBar
                      totalHours={convertToMilliseconds(row.time)}
                      restHours={convertToMilliseconds(row.time_consumed)}
                    />
                  </td>
                  <td>
                    <Switch
                      onChange={() => handleStatus(row.project_id)}
                      // onChange={() => console.log('log do switch button', row.project_id)}
                      checked={row.status === 'true' ? true : false}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#0046B5"
                    />
                  </td>
                  <td>
                    <Avatar data={row.team} />
                  </td>
                  <td
                    style={{ minWidth: '150px', cursor: 'pointer' }}
                    onClick={() => handleOpenModal(row)}
                  >
                    {moment(row.date_start).format('DD/MM/YYYY')}
                  </td>
                  <td
                    style={{ minWidth: '150px', cursor: 'pointer' }}
                    onClick={() => handleOpenModal(row)}
                  >
                    {moment(row.date_end).format('DD/MM/YYYY')}
                  </td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleOpenModal(row)}>
                    <ProjectStatus
                      className={
                        row.status_fake === 'Em Progresso'
                          ? 'status progress'
                          : row.status_fake === 'Concluido'
                          ? 'status finished'
                          : row.status_fake === 'Vencido'
                          ? 'status overdue'
                          : 'status'
                      }
                    >
                      {row.status_fake === 'Em Progresso'
                        ? 'Em andamento'
                        : row.status_fake === 'Concluido'
                        ? 'Concluído'
                        : row.status_fake === 'Stand By'
                        ? 'Stand By'
                        : 'Vencido'}
                    </ProjectStatus>
                  </td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable typeButton="view" onClick={() => handleOpenModal(row)} />
                      {user?.permissions?.includes('jobs_projects_edit') && (
                        <ButtonTable typeButton="edit" onClick={() => handleEditProject(row)} />
                      )}
                      {user?.permissions?.includes('jobs_projects_delete') && (
                        <ButtonTable
                          typeButton="delete"
                          onClick={() => handleDeleteProject(row.project_id)}
                        />
                        // <Alert
                        //   title="Atenção"
                        //   subtitle="Certeza que gostaria de deletar este Projeto? Ao excluir a ação não poderá ser desfeita."
                        //   confirmButton={() => handleOnDelete(row.project_id)}
                        // >
                        //   <ButtonTable typeButton="delete" />
                        // </Alert>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {dataProject && dataProject?.length <= 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center' }}>
                    Sem projetos
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
      )}

      {/* Modal show project infos */}
      <ModalDefault
        isOpen={modalShowProject.isOpen}
        title={modalShowProject.type}
        onOpenChange={handleCloseModal}
      >
        <ModalShowProjectWrapper>
          {!previewImage.isOpen && (
            <>
              <Summary>
                <div className="title">Informações do projeto</div>
                <SummaryInfoWrapper>
                  <SummaryTaskInfo>
                    <div className="title-info">Título do projeto:</div>
                    <div className="info">{modalShowProject.project.title}</div>
                  </SummaryTaskInfo>

                  {!user?.organizations && (
                    <SummaryTaskInfo>
                      <div className="title-info">Cliente:</div>
                      <div className="info">{modalShowProject.project.client_name}</div>
                    </SummaryTaskInfo>
                  )}

                  {user?.organizations?.length > 0 && (
                    <SummaryTaskInfo>
                      <div className="title-info">Cliente:</div>
                      <div className="info">{modalShowProject.project.organization_name}</div>
                    </SummaryTaskInfo>
                  )}

                  <SummaryTaskInfo>
                    <div className="title-info">FEE / SPOT:</div>
                    <div className="info">{modalShowProject.project.category}</div>
                  </SummaryTaskInfo>

                  <SummaryTaskInfo>
                    <div className="title-info">Tipo do contrato:</div>
                    <div className="info">
                      {modalShowProject.project.contract_type === 'product' ? 'Produto' : 'Livre'}
                    </div>
                  </SummaryTaskInfo>

                  <SummaryTaskInfo>
                    <div className="title-info">Tempo:</div>
                    <div className="info">{modalShowProject.project.time}</div>
                  </SummaryTaskInfo>

                  <SummaryTaskInfo>
                    <div className="title-info">Data Inicial:</div>
                    <div className="info">
                      {moment(modalShowProject.project.date_start).format('DD/MM/YYYY')}
                    </div>
                  </SummaryTaskInfo>

                  <SummaryTaskInfo>
                    <div className="title-info">Data Final:</div>
                    <div className="info">
                      {moment(modalShowProject.project.date_end).format('DD/MM/YYYY')}
                    </div>
                  </SummaryTaskInfo>

                  {modalShowProject.project.files.length > 0 && (
                    <SummaryTaskDescription>
                      <div className="description-title">Arquivos:</div>
                      {modalShowProject.project.files.map((row: any) => (
                        <FileList key={row.file_id}>
                          <FileInfo>
                            <div className="file-name">{row.file_name}</div>
                            <div className="file-icons">
                              <ViewFileBtn
                                onClick={() =>
                                  setPreviewImage({
                                    isOpen: true,
                                    imageInfos: {
                                      bucket: row.bucket,
                                      created: row.created,
                                      file_name: row.file_name,
                                      key: row.key,
                                      project_file_id: row.project_file_id,
                                      project_id: row.project_id,
                                      size: row.size,
                                      updated: row.updated,
                                      url: row.url
                                    }
                                  })
                                }
                              >
                                <BiShow size={22} />
                              </ViewFileBtn>
                              <DownloadFileBtn onClick={() => downloadFile(row)}>
                                <FaDownload />
                              </DownloadFileBtn>
                            </div>
                          </FileInfo>
                        </FileList>
                      ))}
                    </SummaryTaskDescription>
                  )}

                  <SummaryTaskDescription>
                    <div className="description-title">Observações:</div>
                    <div
                      className="description-info"
                      dangerouslySetInnerHTML={{ __html: modalShowProject.project.description }}
                    ></div>
                  </SummaryTaskDescription>
                </SummaryInfoWrapper>
              </Summary>

              <Summary style={{ width: '700px' }}>
                <div className="title">Produtos selecionados</div>
                {modalShowProject.project.products.map((row: any, index: number) => (
                  <SummaryCard key={index} style={{ height: 'fit-content' }}>
                    <SummaryCardTitle>
                      #{index + 1} - {row.service}
                    </SummaryCardTitle>
                    <SummaryCardSubtitle
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'fit-content'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: '100%'
                        }}
                      >
                        <div>
                          Descrição: <span>{row.description}</span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%'
                        }}
                      >
                        <div>
                          Periodo: <span>{row.period}</span>
                        </div>
                        <div>
                          I/D: <span>{row.type}</span>
                        </div>
                        <div>
                          Formato: <span>{row.size}</span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%'
                        }}
                      >
                        <div>
                          Quantidade contratada: <span>{row.quantity_initial}</span>
                        </div>
                        <div>
                          Tempo contratado <span>{row.minutes_initial}</span>
                        </div>
                      </div>
                      {/* {row.flag === 'true' && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                          }}
                        >
                          <div>
                            Quantidade disponível: <span>{row.quantity}</span>
                          </div>
                          <div>
                            Tempo restante <span>{row.minutes_total}</span>
                          </div>
                        </div>
                      )} */}
                    </SummaryCardSubtitle>
                  </SummaryCard>
                ))}
              </Summary>
            </>
          )}
          {previewImage.isOpen && previewImage.imageInfos.file_name.split('.').pop() !== 'pdf' && (
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
                      key: '',
                      project_file_id: '',
                      project_id: '',
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

          {previewImage.isOpen && previewImage.imageInfos.file_name.split('.').pop() === 'pdf' && (
            <DocViewer
              documents={[
                {
                  uri: `url(https://${previewImage.imageInfos.bucket}.s3.amazonaws.com/${previewImage.imageInfos.key})`,
                  fileType: 'pdf'
                }
              ]}
            />
          )}
        </ModalShowProjectWrapper>
      </ModalDefault>

      {/* Modal delete project preview */}
      <ModalDefault
        isOpen={modalDelete.isOpen}
        onOpenChange={() => setModalDelete({ isOpen: false, project_id: '' })}
        title={`Deletar projeto #${String(modalDelete.project_id).padStart(5, '0')}`}
      >
        <ModalTasksOnProjectWrapper>
          <CloseModalBtn
            close={() => setModalDelete({ isOpen: false, project_id: '' })}
            marginTop={'-40px'}
          />
          {taskList?.length > 0 && (
            <TaskListOnUse>
              <div className="list-title">
                Tarefas vinculadas a este projeto atualmente serão impactadas:
              </div>
              {taskList?.map((row: TaskListItem) => (
                <TaskListItem key={row.task_id}>
                  <TaskInfosItem>
                    <div className="task">
                      <span>ID:</span> #{String(row.task_id).padStart(5, '0')}
                    </div>

                    <div className="task">
                      {' '}
                      <span>Tarefa:</span> {row.title}
                    </div>
                  </TaskInfosItem>
                </TaskListItem>
              ))}
            </TaskListOnUse>
          )}

          <AlertDelete>
            <strong>Atenção</strong>
            <div>
              Certeza que gostaria de deletar este Projeto? Ao excluir, esta ação não poderá ser
              desfeita.
            </div>
          </AlertDelete>

          <ModalButtons>
            <ButtonDefault
              typeButton="dark"
              isOutline
              onClick={() => setModalDelete({ isOpen: false, project_id: '' })}
            >
              Cancelar
            </ButtonDefault>
            <ButtonDefault
              typeButton="danger"
              onClick={() => handleOnDelete(modalDelete.project_id)}
            >
              Sim, Deletar
            </ButtonDefault>
          </ModalButtons>
        </ModalTasksOnProjectWrapper>
      </ModalDefault>

      {/* Modal loading submit */}
      <ModalLoader isOpen={isFetching || loading} />

      {/* Modal filters */}
      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={handleApplyFilters}
        clearFilters={handleClearFilters}
        clientSelected={setClientFilter}
        filterType="project"
      />
    </ContainerDefault>
  );
}
