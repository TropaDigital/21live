/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from 'react';
import { BiFilter, BiPlus, BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';
import { useSteps } from '../../../hooks/useSteps';

import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { TenantProps } from '../../../utils/models';

import { IProjectCreate } from '../../../types';

import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import Pagination from '../../../components/Pagination';
import Steps from '../../../components/Steps';
import { Table } from '../../../components/Table';
import { FilterGroup, TableHead } from '../../../components/Table/styles';
import Alert from '../../../components/Ui/Alert';
import ModalDefault from '../../../components/Ui/ModalDefault';
import ProgressBar from '../../../components/Ui/ProgressBar';
import { ContainerDefault, FooterModal } from '../../../components/UiElements/styles';
import { UploadedFilesProps } from '../../../components/Upload/UploadFiles';

import moment from 'moment';

import InfoDescription from '../ComponentSteps/InfoDescription';
import InfoFiles from '../ComponentSteps/InfoFiles';
import InfoGeral from '../ComponentSteps/InfoGeral';
import InfoProducts from '../ComponentSteps/InfoProducts/InfoProducts';

interface StateProps {
  [key: string]: any;
}

export default function ListProjects() {
  const { addToast } = useToast();
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Criar nova Ata de Reunião'
  });

  const { formData, setFormValue, setData, handleOnChange } = useForm({
    tenant_id: '',
    title: '',
    contract_type: '',
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

  // const formComponents = [
  //   {
  //     label: 'Geral',
  //     success: false,
  //     component: (
  //       <InfoGeral
  //         data={formData}
  //         handleInputChange={handleOnChange}
  //         clients={dataClient}
  //         error={error}
  //       />
  //     )
  //   },
  //   {
  //     label: 'Produtos',
  //     success: false,
  //     component: (
  //       <InfoProducts
  //         handleOnAddProducts={handleOnAddProducts}
  //         dataOffice={dataOffice}
  //         dataFilter={formData.products}
  //         handleOnPeriod={(e, id) => handleOnPeriod(e, id)}
  //         handleOnDeleteProduct={(id) => handleOnDeleteProduct(id)}
  //         okToSave={''}
  //         setSave={''}
  //       />
  //     )
  //   },
  //   {
  //     label: 'Descrição',
  //     success: false,
  //     component: (
  //       <InfoDescription
  //         value={formData?.description}
  //         handleOnDescription={(value) => setFormValue('description', value)}
  //         mentions={[]}
  //       />
  //     )
  //   },
  //   {
  //     label: 'Anexos',
  //     success: false,
  //     component: (
  //       <InfoFiles
  //         uploadedFiles={uploadedFiles}
  //         setUploadedFiles={setUploadedFiles}
  //         tenant={formData?.tenant_id}
  //         isDisabed={!formData?.tenant_id}
  //         loading={loading}
  //         setLoading={setLoading}
  //       />
  //     )
  //   }
  // ];

  // const fillComponents = formComponents.map((row: any) => row.component);
  // const { changeStep, currentComponent, currentStep, isFirstStep, isLastStep } =
  //   useSteps(fillComponents);

  const handleOnEdit = (item: IProjectCreate) => {
    setData(item);
    setUploadedFiles(item.files);

    setModal({
      isOpen: true,
      type: `Editar Projeto/Contrato: ${item.title}`
    });
  };

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
          />

          <ButtonDefault typeButton="light">
            <BiFilter />
            Filtros
          </ButtonDefault>
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
              <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
            </tr>
          </thead>
          <tbody>
            {dataProject?.map((row) => (
              <tr key={row.project_id}>
                <td>#{row.project_id}</td>
                <td>{row.title}</td>
                <td>{row.client_name}</td>
                <td
                  style={{
                    padding: '14px',
                    width: '220px',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ marginBottom: '4px', display: 'block' }}>05:50:24</span>
                  <ProgressBar
                    totalHours={convertToMilliseconds('05:50:24')}
                    restHours={convertToMilliseconds('02:20:36')}
                  />
                </td>
                <td>
                  <Switch
                    onChange={() => handleList(row.project_id)}
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
                    <ButtonTable typeButton="view" onClick={() => console.log(row)} />
                    <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />
                    <Alert
                      title="Atenção"
                      subtitle="Certeza que gostaria de deletar esta Ata/Reunião? Ao excluir a acão não poderá ser desfeita."
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

      {/* <ModalDefault isOpen={modal.isOpen} title={modal.type} onOpenChange={handleOnCancel}>
        <form onSubmit={handleOnSubmit}>
          <Steps currentStep={currentStep} steps={steps} />

          <div>{currentComponent}</div>

          <FooterModal>
            <ButtonDefault typeButton="dark" isOutline type="button" onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>

            <div className="fieldGroup">
              {!isFirstStep && (
                <ButtonDefault typeButton="primary" isOutline onClick={handleOnPrevStep}>
                  Voltar
                </ButtonDefault>
              )}

              {!isLastStep ? (
                <ButtonDefault type="button" typeButton="primary" onClick={handleOnNextStep}>
                  Próxima etapa
                </ButtonDefault>
              ) : (
                <ButtonDefault
                  typeButton="primary"
                  type="button"
                  onClick={handleOnSubmit}
                  loading={loading}
                >
                  Salvar
                </ButtonDefault>
              )}
            </div>
          </FooterModal>
        </form>
      </ModalDefault> */}
    </ContainerDefault>
  );
}
