/* eslint-disable import-helpers/order-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Icons
import { BiPlus, BiSearchAlt } from 'react-icons/bi';

// Libraries
import Switch from 'react-switch';
import moment from 'moment';

// Services
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';

// Utils
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { TenantProps } from '../../../utils/models';

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
import { ContainerDefault } from '../../../components/UiElements/styles';
import { UploadedFilesProps } from '../../../components/Upload/UploadFiles';

// Styles
import { Summary } from '../../Staks/ComponentSteps/SummaryTasks/styles';
import { SummaryTaskInfo } from '../../Staks/ComponentSteps/SummaryTasks/styles';
import { SummaryInfoWrapper } from '../../Staks/ComponentSteps/SummaryTasks/styles';
import { SummaryTaskDescription } from '../../Staks/ComponentSteps/SummaryTasks/styles';
import { SummaryCard } from '../../Staks/ComponentSteps/SummaryTasks/styles';
import { SummaryCardTitle } from '../../Staks/ComponentSteps/SummaryTasks/styles';
import { SummaryCardSubtitle } from '../../Staks/ComponentSteps/SummaryTasks/styles';
import { ModalShowProjectWrapper } from './styles';

interface StateProps {
  [key: string]: any;
}

export default function ListProjects() {
  const { addToast } = useToast();
  const [modalShowProject, setModalShowProject] = useState({
    isOpen: false,
    type: 'Criar nova Ata de Reunião',
    project: {
      title: '',
      contract_type: '',
      category: '',
      client_name: '',
      project_id: '',
      date_start: '',
      date_end: '',
      description: '',
      time: '',
      products: [],
      files: []
    }
  });

  const { formData, setFormValue, setData, handleOnChange } = useForm({
    tenant_id: '',
    title: '',
    contract_type: '',
    category: '',
    project_id: '',
    date_start: '',
    date_end: '',
    description: '',
    products: [],
    files: []
  } as IProjectCreate);

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [error, setError] = useState<StateProps>({});
  const [loading, setLoading] = useState(false);

  // PRODUTOS
  const { data: dataOffice } = useFetch<IProjectCreate[]>(`services`);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const {
    data: dataProject,
    fetchData: fetchProject,
    pages
  } = useFetch<IProjectCreate[]>(`project?search=${search}`);
  const [selected, setSelected] = useState(1);
  const [listSelected, setListSelected] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleOnAddProducts = (items: any) => {
    setFormValue('products', [...formData.products, ...items]);
  };

  const handleOnDeleteProduct = (id: number) => {
    console.log('ID', id);
    setFormValue(
      'products',
      formData.products.filter((product: any) => product.service_id !== id)
    );
  };

  const handleOnIncrememtQtd = useCallback(
    (value: any) => {
      const updatedProducts = [...formData.products];
      const productIndex = updatedProducts.findIndex(
        (product) => product.service_id === value.service_id
      );
      const updatedProductCopy = { ...updatedProducts[productIndex] };
      updatedProductCopy.quantity = Number(updatedProductCopy.quantity) + 1;
      updatedProducts[productIndex] = updatedProductCopy;
      setFormValue('products', updatedProducts);
    },
    [setFormValue, formData]
  );

  const handleOnDecrementQtd = useCallback(
    (value: any) => {
      const updatedProducts = [...formData.products];
      const productIndex = updatedProducts.findIndex(
        (product) => product.service_id === value.service_id
      );
      const updatedProductCopy = { ...updatedProducts[productIndex] };
      updatedProductCopy.quantity = Number(updatedProductCopy.quantity) - 1;
      updatedProducts[productIndex] = updatedProductCopy;
      setFormValue('products', updatedProducts);
    },
    [setFormValue, formData]
  );

  function isNumber(value: string) {
    return /^[0-9]*$/.test(value);
  }

  const handleInputProduct = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, id: any) => {
      const newValue = event.target.value;
      if (isNumber(newValue)) {
        const updatedProducts = [...formData.products];
        const productIndex = updatedProducts.findIndex((product) => product.service_id === id);
        const updatedProductCopy = { ...updatedProducts[productIndex] };
        updatedProductCopy.quantity = newValue;
        updatedProducts[productIndex] = updatedProductCopy;
        setFormValue('products', updatedProducts);
      }
    },
    [setFormValue, formData]
  );

  const handleOnPeriod = useCallback(
    (value: any, id: any) => {
      const verifyPeriod = value ? 'anual' : 'mensal';
      const updatedProducts = [...formData.products];
      const productIndex = updatedProducts.findIndex((product) => product.service_id === id);
      const updatedProductCopy = { ...updatedProducts[productIndex] };
      updatedProductCopy.period = verifyPeriod;
      updatedProducts[productIndex] = updatedProductCopy;

      setFormValue('products', updatedProducts);
    },
    [setFormValue, formData]
  );

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

  useEffect(() => {
    function handleSelectedProjects(): any {
      dataProject?.forEach((item) => {
        const cloneItem: any = item;

        if (cloneItem?.status === '1' || cloneItem?.status === 'true') {
          setListSelected((obj) => [...obj, cloneItem?.project_id]);
        }
      });
    }

    handleSelectedProjects();
  }, [dataProject]);

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`project/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Projeto foi deletado!'
      });

      fetchProject();
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  function handleList(value: any) {
    if (listSelected.includes(value)) {
      setListSelected(listSelected.filter((obj) => obj !== value));
    } else {
      setListSelected((obj) => [...obj, value]);
    }
  }

  const handleOpenModal = (project: IProjectCreate) => {
    setModalShowProject({
      isOpen: true,
      type: `Resumo do Projeto: #${project.project_id}`,
      project: {
        title: project.title,
        client_name: project.client_name,
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
        project_id: '',
        date_start: '',
        date_end: '',
        description: '',
        products: [],
        files: [],
        time: ''
      }
    });
  };

  const handleEditProject = (project: any) => {
    // const product: any = {
    //   category: '',
    //   client_name: '',
    //   contract_type: '',
    //   date_end: '',
    //   date_start: '',
    //   deleted: '',
    //   description: '',
    //   files: [],
    //   products: [],
    //   project_id: '',
    //   status: '',
    //   tenant_id: '',
    //   time: '',
    //   time_consumed: '',
    //   title: ''
    // };
    console.log('log do projeto a editar', project);
    navigate('/criar-projeto', { state: project });
  };

  return (
    <ContainerDefault>
      <HeaderPage title="Projetos">
        <Link to={'/criar-projeto'}>
          <ButtonDefault typeButton="success">
            <BiPlus color="#fff" />
            Adicionar Projeto
          </ButtonDefault>
        </Link>
      </HeaderPage>

      <Table>
        <TableHead>
          <div className="groupTable">
            <h2>Lista de projetos</h2>
          </div>
        </TableHead>
        <FilterGroup>
          <InputDefault
            label=""
            name="search"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
              debouncedCallback(event.target.value);
            }}
            value={searchTerm}
            icon={BiSearchAlt}
            isLoading={isLoading}
            className="search-field"
          />

          {/* <ButtonDefault typeButton="light">
            <BiFilter />
            Filtros
          </ButtonDefault> */}
        </FilterGroup>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Cliente</th>
              <th>Tempo</th>
              <th>Status</th>
              <th>Data de criação</th>
              <th>Entrega estimada</th>
              <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
            </tr>
          </thead>
          <tbody>
            {dataProject?.map((row) => (
              <tr key={row.project_id}>
                <td>#{String(row.project_id).padStart(5, '0')}</td>
                <td>{row.title}</td>
                <td>{row.client_name}</td>
                <td
                  style={{
                    padding: '14px',
                    width: '220px',
                    textAlign: 'left'
                  }}
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
                    // onChange={() => handleList(row.project_id)}
                    onChange={() => console.log('log do switch button', row.project_id)}
                    checked={listSelected.includes(row.project_id) ? true : false}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#0046B5"
                  />
                </td>
                <td>{moment(row.date_start).format('DD/MM/YYYY')}</td>
                <td>{moment(row.date_end).format('DD/MM/YYYY')}</td>
                <td>
                  <div className="fieldTableClients">
                    <ButtonTable typeButton="view" onClick={() => handleOpenModal(row)} />
                    {/* <ButtonTable typeButton="edit" onClick={() => handleEditProject(row)} /> */}
                    <Alert
                      title="Atenção"
                      subtitle="Certeza que gostaria de deletar este Projeto? Ao excluir a ação não poderá ser desfeita."
                      confirmButton={() => handleOnDelete(row.project_id)}
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

      <ModalDefault
        isOpen={modalShowProject.isOpen}
        title={modalShowProject.type}
        onOpenChange={handleCloseModal}
      >
        <ModalShowProjectWrapper>
          <Summary>
            <div className="title">Informações do projeto</div>
            <SummaryInfoWrapper>
              <SummaryTaskInfo>
                <div className="title-info">Título do projeto:</div>
                <div className="info">{modalShowProject.project.title}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Cliente:</div>
                <div className="info">{modalShowProject.project.client_name}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">FEE/ SPOT:</div>
                <div className="info">{modalShowProject.project.contract_type}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Tipo do contrato:</div>
                <div className="info">{modalShowProject.project.category}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Tempo:</div>
                <div className="info">{modalShowProject.project.time}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Data De Criação:</div>
                <div className="info">
                  {moment(modalShowProject.project.date_start).format('DD/MM/YYYY')}
                </div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Entrega Estimada:</div>
                <div className="info">
                  {moment(modalShowProject.project.date_end).format('DD/MM/YYYY')}
                </div>
              </SummaryTaskInfo>

              <SummaryTaskDescription>
                <div className="description-title">Contexto geral</div>
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
                      justifyContent: 'space-around',
                      width: '100%'
                    }}
                  >
                    <div className="description-wrap">
                      Descrição: <span>{row.description}</span>
                    </div>
                    <div>
                      Periodo: <span>{row.period}</span>
                    </div>
                    <div>
                      I/D: <span>{row.type}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      width: '100%'
                    }}
                  >
                    <div>
                      Formato: <span>{row.size}</span>
                    </div>
                    <div>
                      Quantidade: <span>{row.quantity}</span>
                    </div>
                    <div>
                      Tempo estimado <span>{row.minutes}</span>
                    </div>
                  </div>
                </SummaryCardSubtitle>
              </SummaryCard>
            ))}
          </Summary>
        </ModalShowProjectWrapper>
      </ModalDefault>
    </ContainerDefault>
  );
}
