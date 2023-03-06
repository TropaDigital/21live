import { useState, useCallback, useEffect } from 'react'
import { BiCalendar, BiPlus, BiSearchAlt } from 'react-icons/bi';
import api from '../../../services/api';

// HOOKS
import { useSteps } from '../../../hooks/useSteps';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';
import { useToast } from '../../../hooks/toast';

// TYPES
import { IProjectCreate } from '../../../types';

// UTILS
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { TenantProps } from '../../../utils/models';
import { useDebounce } from '../../../utils/useDebounce';

// COMPONENTS
import { InputDefault } from '../../../components/Inputs/InputDefault';
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ProgressBar from '../../../components/Ui/ProgressBar';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import InfoGeral from '../ComponentSteps/InfoGeral';
import InfoProducts from '../ComponentSteps/InfoProducts';
import InfoDescription from '../ComponentSteps/InfoDescription';
import InfoFiles from '../ComponentSteps/InfoFiles';
import { UploadedFilesProps } from '../../../components/Upload/UploadFiles';
import Paginate from '../../../components/Paginate';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import { TableDefault } from '../../../components/TableDefault';
import Alert from '../../../components/Ui/Alert';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import Steps from '../Steps';

// STYLES
import { ContainerDefault, ContainerGroupTable, ContentDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';

interface StateProps {
  [key: string]: any;
}

export default function ListProjects() {
  const { addToast } = useToast()
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Criar nova Ata de Reunião'
  })

  const { formData, setFormValue, setData, handleOnChange, handleOnChangeCheckbox } = useForm({
    tenant_id: '',
    title: '',
    contract_type: '',
    project_id: '',
    date_start: '',
    date_end: '',
    description: '',
    products: [],
    files: [],
  } as IProjectCreate)

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [search, setSearch] = useState('');
  const [isSearching, setSearching] = useState(false);
  const [filterDate, setFilterDate] = useState({
    dateStart: '',
    dateEnd: ''
  });
  const [filterOrder, setFilterOredr] = useState('')

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [error, setError] = useState<StateProps>({});

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

  // PRODUTOS
  const { data: dataOffice } = useFetch<IProjectCreate[]>(`services`);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataProject, fetchData: fetchProject, pages } = useFetch<IProjectCreate[]>(`project?search=${search}&date_start=${filterDate.dateStart}&date_end=${filterDate.dateEnd}&order=${filterOrder}`);
  const [selected, setSelected] = useState(1);

  const handleOnAddProducts = (items: any) => {
    setFormValue('products', [
      ...formData.products,
      ...items
    ])
  };

  const handleOnDeleteProduct = (id: number) => {
    setFormValue('products', formData.products.filter((product: any) => product.service_id !== id))
  }

  const handleOnIncrememtQtd = useCallback((value: any) => {
    const updatedProducts = [...formData.products];
    const productIndex = updatedProducts.findIndex(product => product.product_id === value.product_id);
    const updatedProductCopy = {...updatedProducts[productIndex]};
    updatedProductCopy.quantity = Number(updatedProductCopy.quantity) + 1;
    updatedProducts[productIndex] = updatedProductCopy;
    setFormValue('products', updatedProducts)

  }, [setFormValue, formData])

  const handleOnDecrementQtd = useCallback((value: any) => {
    const updatedProducts = [...formData.products];
    const productIndex = updatedProducts.findIndex(product => product.product_id === value.product_id);
    const updatedProductCopy = {...updatedProducts[productIndex]};
    updatedProductCopy.quantity = Number(updatedProductCopy.quantity) - 1;
    updatedProducts[productIndex] = updatedProductCopy;
    setFormValue('products', updatedProducts)

  }, [setFormValue, formData])

  const handleOnPeriod = useCallback((value: any, id: any) => {
    const verifyPeriod = value ? 'anual' : 'mensal'
    const updatedProducts = [...formData.products];
    const productIndex = updatedProducts.findIndex(product => product.service_id === id);
    const updatedProductCopy = {...updatedProducts[productIndex]};
    updatedProductCopy.period = verifyPeriod;
    updatedProducts[productIndex] = updatedProductCopy;

    setFormValue('products', updatedProducts)

  }, [setFormValue, formData])

  const formComponents = [
    <InfoGeral data={formData} handleInputChange={handleOnChange} clients={dataClient} error={error}/>,
    <InfoProducts
      handleOnAddProducts={handleOnAddProducts}
      dataOffice={dataOffice}
      dataFilter={formData.products}
      handleOnDecrementQtd={(e) => handleOnDecrementQtd(e)}
      handleOnIncrememtQtd={(e) => handleOnIncrememtQtd(e)}
      handleOnPeriod={(e, id) => handleOnPeriod(e, id)}
      handleOnDeleteProduct={(id) => handleOnDeleteProduct(id)}
    />,
    <InfoDescription
      value={formData?.description}
      handleOnDescription={(value) => setFormValue('description', value)}
      mentions={[]}
    />,
    <InfoFiles
      uploadedFiles={uploadedFiles}
      setUploadedFiles={setUploadedFiles}
      tenant={formData?.tenant_id}
      isDisabed={!formData?.tenant_id}
    />
  ];
  const { changeStep, currentComponent, currentStep, isFirstStep, isLastStep } = useSteps(formComponents);

  function setErrorInput(value: any, message: any) {
    if(!message) {
      delete error[value]
    }

    setError({...error, [value]: message })
    return message;
  }

  const validateStep = () => {
    const { title, tenant_id, contract_type, date_start, date_end } = formData

    try {
      if (title === "") {
        throw setErrorInput('title', 'Titulo é obrigatório!');
      } else {
        setErrorInput('title', undefined);
      }

      if (tenant_id === "") {
        throw setErrorInput('tenant_id', 'Cliente é obrigatório!');
      } else {
        setErrorInput('tenant_id', undefined);
      }

      if (contract_type === "") {
        throw setErrorInput('contract_type', 'Contrato é obrigatório!');
      } else {
        setErrorInput('contract_type', undefined);
      }

      if (date_start === "") {
        throw setErrorInput('date_start', 'Data inicial é obrigatório!');
      } else {
        setErrorInput('date_start', undefined);
      }

      if (date_end === "") {
        throw setErrorInput('date_end', 'Data final é obrigatório!')
      } else {
        setErrorInput('date_end', undefined);
      }

      changeStep(currentStep + 1)
    } catch(error: any) {
      addToast({
        title: 'Atenção',
        description: error,
        type: 'warning'
      })
    }
  }

  const handleOnCancel = () => {
    setModal({
      isOpen: false,
      type: 'Criar novo Projeto/Contrato'
    });
    setData({
      tenant_id: '',
    project_id: '',
      title: '',
      contract_type: '',
      date_start: '',
      date_end: '',
      description: '',
      products: [],
      files: [],
    } as IProjectCreate)
    setUploadedFiles([]);
    setError({});
  }

  const handleOnEdit = (item: IProjectCreate) => {
    setData(item);
    setUploadedFiles(item.files);

    setModal({
      isOpen: !modal.isOpen,
      type: `Editar Projeto/Contrato: ${item.title}`
    })
  }

  const handleOnDelete = async (id: any) => {
    try {
      api.delete(`project/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Projeto foi deletado!',
      });
  
      handleOnCancel();
      fetchProject();
    } catch(error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message,
      });
    }
  }

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      // Inserir lógica
      const files = uploadedFiles.map((row) => (
        {
          bucket: row.bucket,
          file_name: row.file_name,
          file_id: row.file_id,
          key: row.key,
          size: row.size,
          url: row.url
        }
      ))

      const newArrayProducts = formData.products.map(({ tenant_id, service_id, ...rest }: any) => rest);
      const updateProducts = formData.products.map(({ service_id, ...rest }: any) => ({ product_id: service_id, ...rest }))

      const { title, tenant_id, description, date_start, date_end, contract_type, project_id } = formData

      const createNewData = {
        title,
        tenant_id,
        products: newArrayProducts,
        description,
        date_start,
        date_end,
        contract_type,
        files
      }

      const updateData = {
        title,
        project_id,
        tenant_id,
        products: updateProducts,
        description,
        date_start,
        date_end,
        contract_type,
        files
      }

      if(modal.type === 'Criar novo Projeto/Contrato') {
        await api.post(`project`, createNewData);
      } else {
        await api.put(`project/${formData.project_id}`, updateData);
      }

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço cadastrado com sucesso!',
      });

      setData({
        tenant_id: '',
        project_id: '',
        title: '',
        contract_type: '',
        date_start: '',
        date_end: '',
        description: '',
        products: [],
        files: [],
      } as IProjectCreate)
      setUploadedFiles([]);
      setModal({
        isOpen: false,
        type: 'Criar novo Projeto/Contrato'
      });
      changeStep(0);
      fetchProject();

    } catch (e: any) {
      // Exibir erro
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });

      // setErros(getVaidationErrors(e.response.data.result))

    }
  }, [formData, setFormValue, uploadedFiles, setUploadedFiles, modal, setData]);

  return (
    <ContainerDefault>
      <HeaderPage title="Projetos">
        <ButtonDefault typeButton="success" onClick={() => setModal({
        isOpen: !modal.isOpen,
        type: 'Criar novo Projeto/Contrato'
      })}>
          <BiPlus color="#fff" />
            Novo Projeto
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault>
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
            onChange={(e) => setFilterOredr(e.target.value)}
            value={filterOrder}
          >
            <option value='asc'>Mais recente</option>
            <option value='desc'>Mais antigo</option>
          </SelectDefault>

          <InputDefault
            label="Busca"
            name="search"
            placeholder="Busque pelo titulo..."
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={BiSearchAlt}
            isLoading={isSearching}
            value={searchTerm}
          />

        </FieldGroupFormDefault>
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Lista de projetos">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>Titulo</th>
                <th>Atividades</th>
                <th>Status</th>
                <th>Cliente</th>
                <th>Custo total (RS)</th>
                <th>Data inicio</th>
                <th>Entrega estimada</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {dataProject?.map((row) => (
                <tr key={row.project_id}>
                  <td style={{ textTransform: 'uppercase', textAlign: 'initial' }}>
                    {row.contract_type + " | " + row.title}
                  </td>
                  <td
                    style={{
                      padding: '14px',
                      width: '220px',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ marginBottom: '4px', display: 'block'}}>05:50:24</span>
                    <ProgressBar 
                      totalHours={convertToMilliseconds('05:50:24')}
                      restHours={convertToMilliseconds('02:20:36')}
                    />
                  </td>
                  <td>
                  <InputSwitchDefault 
                    name="status"
                    // label='Enviar para o cliente por e-mail'
                    // onChange={handleOnChangeCheckbox}
                    // isChecked={String(formData.email_alert) === 'true' ? true : false}
                  />
                  </td>
                  <td>{row.client_name}</td>
                  <td>Custo total</td>
                  <td>{row.date_start}</td>
                  <td>{row.date_end}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable 
                        typeButton='view'
                        onClick={() => console.log(row)}
                      />

                      <ButtonTable 
                        typeButton='edit'
                        onClick={() => handleOnEdit(row)}
                      />

                      <Alert
                        title='Atenção'
                        subtitle='Certeza que gostaria de deletar esta Ata/Reunião? Ao excluir a acão não poderá ser desfeita.'
                        cancelButton={() => {}}
                        confirmButton={() => handleOnDelete(row.project_id)}
                      >
                        <ButtonTable 
                          typeButton='delete'
                          onClick={() => handleOnEdit(row)}
                        />
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
        title={modal.type}
        onOpenChange={handleOnCancel}
      >
        <form onSubmit={handleOnSubmit}>

          <Steps currentStep={currentStep} />

          <div>{currentComponent}</div>

          <FooterModal>

            <ButtonDefault
              typeButton='dark'
              isOutline
              type='button'
              onClick={handleOnCancel}
            >
              Descartar
            </ButtonDefault>

            <div className="fieldGroup">
              {!isFirstStep && (
                <ButtonDefault
                  typeButton="primary"
                  isOutline
                  onClick={() => changeStep(currentStep - 1)}
                >
                  Voltar
                </ButtonDefault>
              )}

              {!isLastStep ? (
                <ButtonDefault
                  type='button'
                  typeButton="primary"
                  onClick={validateStep}
                >
                  Próxima etapa
                </ButtonDefault>
              ) : (
                <ButtonDefault
                  typeButton="primary"
                  type='button'
                  onClick={handleOnSubmit}
                >
                  Salvar
                </ButtonDefault>
              )}
            </div>
          </FooterModal>
        </form>
      </ModalDefault>
    </ContainerDefault>
  )
}
