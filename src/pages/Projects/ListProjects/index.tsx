import { useState, useCallback } from 'react'
import { BiEdit, BiPlus, BiSearchAlt, BiShow } from 'react-icons/bi';

// HOOKS
import { useSteps } from '../../../hooks/useSteps';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';

// TYPES
import { IProjectCreate } from '../../../types';

// UTILS
import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { TenantProps } from '../../../utils/models';
import { useToast } from '../../../hooks/toast';

// COMPONENTS
import { InputDefault } from '../../../components/Inputs/InputDefault';
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ProgressBar from '../../../components/Ui/ProgressBar';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { ContentDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';
import ModalDefault from '../../../components/Ui/ModalDefault';
import InfoGeral from '../ComponentSteps/InfoGeral';
import InfoProducts from '../ComponentSteps/InfoProducts';
import InfoDescription from '../ComponentSteps/InfoDescription';
import InfoFiles from '../ComponentSteps/InfoFiles';
import { UploadedFilesProps } from '../../../components/Upload/UploadFiles';
import Steps from '../Steps';

// STYLES
import { Container, CardProject, TitleCardProject, InfoCardProject, FooterProjectCard, FieldGroupCardProject, ContentCardProject } from './styles';
import api from '../../../services/api';

interface StateProps {
  [key: string]: any;
}

export default function ListProjects() {
  const { addToast } = useToast()
  const [modal, setModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { formData, setFormValue, setData, handleOnChange, handleOnChangeCheckbox } = useForm({
    tenant_id: '',
    title: '',
    contract_type: '',
    date_start: '',
    date_end: '',
    description: '',
    products: [],
    files: [],
  } as IProjectCreate)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [error, setError] = useState<StateProps>({});
  
  // PRODUTOS
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const { data: dataOffice } = useFetch<IProjectCreate[]>(`services`);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataProject } = useFetch<any[]>('project/21');

  function handleSelectItem(id: any) {
    const alreadySelected = selectedItems.findIndex((item) => item.service === id.service);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item.service !== id.service);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  const handleOnAddProducts = (items: any) => {
    setFormValue('products', [
      ...formData.products,
      ...items
    ])

    setSelectedItems([])
  };

  const handleOnDeleteProduct = (id: number) => {
    setFormValue('products', formData.products.filter((product: any) => product.service_id !== id))
  }

  const handleOnIncrememtQtd = useCallback((value: any) => {
    const updatedProducts = [...formData.products];
    const productIndex = updatedProducts.findIndex(product => product.service_id === value.service_id);
    const updatedProductCopy = {...updatedProducts[productIndex]};
    updatedProductCopy.quantity = updatedProductCopy.quantity + 1;
    updatedProducts[productIndex] = updatedProductCopy;
    setFormValue('products', updatedProducts)

  }, [setFormValue, formData])

  const handleOnDecrementQtd = useCallback((value: any) => {
    const updatedProducts = [...formData.products];
    const productIndex = updatedProducts.findIndex(product => product.service_id === value.service_id);
    const updatedProductCopy = {...updatedProducts[productIndex]};
    updatedProductCopy.quantity = updatedProductCopy.quantity - 1;
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
      handleSelectItem={handleSelectItem} 
      dataOffice={dataOffice} 
      dataFilter={formData.products} 
      selectedItems={selectedItems} 
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
        console.log('CAIU AQUI')
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
      console.log('ERROR =>', error)
      addToast({
        title: 'Atenção',
        description: error,
        type: 'warning'
      })
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
          key: row.key,
          size: row.size,
          url: row.url
        }
      ))

      const newArrayProducts = formData.products.map(({ tenant_id, service_id, ...rest }: any) => rest);

      const { title, tenant_id, description, date_start, date_end, contract_type } = formData

      const newData = {
        title,
        tenant_id,
        products: newArrayProducts,
        description,
        date_start,
        date_end,
        contract_type,
        files
      }

      await api.post(`project`, newData);

      // if(modal.type === 'Criar nova Ata de Reunião') {
      //   await api.post(`project`, newFormData);
      // } else {
      //   await api.put(`project/${formData.meeting_id}`, newFormData);
      // }

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço cadastrado com sucesso!',
      });

      setData({
        tenant_id: '',
        title: '',
        contract_type: '',
        date_start: '',
        date_end: '',
        description: '',
        products: [],
        files: [],
      } as IProjectCreate)
      setUploadedFiles([]);
      setModal(false);
      changeStep(0)

    } catch (e: any) {
      // Exibir erro
      console.log('ERROR =>', e)
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });

      // setErros(getVaidationErrors(e.response.data.result))

    }
  }, [formData, setFormValue, uploadedFiles, setUploadedFiles, modal, setData]);

  console.log('formData', formData)

  return (
    <Container>
      <HeaderPage title="Projetos">
        <ButtonDefault typeButton="success" onClick={() => setModal(!modal)}>
          <BiPlus color="#fff" />
            Novo Projeto
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault style={{ position: 'relative' }}>
        <FieldGroupFormDefault>
          <InputDefault
            label="Busca"
            name="search"
            placeholder="Busque pelo nome..."
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={BiSearchAlt}
            value={searchTerm}
          />

          <SelectDefault
            label="Filtro por cliente"
            name="client"
            placeHolder="Selecione um cliente"
            onChange={() => {}}
            value={''}
          >
              <option value='0'>Opção um</option>
              <option value='1'>Opção dois</option>
              <option value='2'>Opção tres</option>
          </SelectDefault>

          <SelectDefault
            label="Filtro por data"
            name="data"
            placeHolder="Selecione uma data"
            onChange={() => {}}
            value={''}
          >
              <option value='0'>Opção um</option>
              <option value='1'>Opção dois</option>
              <option value='2'>Opção tres</option>
          </SelectDefault>

        </FieldGroupFormDefault>
      </ContentDefault>

      <ContentDefault style={{ marginTop: '20px' }}>

        <ContentCardProject>
          {dataProject?.map((row) => (
            <CardProject key={row.project_id}>
              <TitleCardProject>
                {row.title}
              </TitleCardProject>

              <InfoCardProject>
                <h3>Cliente: <span>{row.contract_type}</span></h3>

                <div className="sectionProgressCardProject">
                  <h3>Atividade: <span>05:50:24</span></h3>
                  <ProgressBar 
                    restHours={convertToMilliseconds('05:10:35')}
                    totalHours={convertToMilliseconds('10:00:00')}
                  />
                </div>
              </InfoCardProject>

              <FooterProjectCard>
                <FieldGroupCardProject>
                  <ButtonDefault typeButton="light">
                    <BiEdit />
                  </ButtonDefault>

                  <ButtonDefault 
                    typeButton='info'
                    onClick={() => {
                      setData({
                      ...row,
                      products: row.products.map(({ product_id, ...rest }: any) => ({ service_id: product_id, ...rest }))
                    })
                    setModal(!modal)
                  }}
                  >
                    <BiShow />
                    Ver Projeto
                  </ButtonDefault>
                </FieldGroupCardProject>
              </FooterProjectCard>
            </CardProject>
          ))}
        </ContentCardProject>
      </ContentDefault>

      <ModalDefault 
        isOpen={modal}
        title='Criar novo Projeto/Contrato'
        onOpenChange={setModal}
      >
        <form onSubmit={handleOnSubmit}>
          
          <Steps currentStep={currentStep} />

          <div>{currentComponent}</div>

          <FooterModal>

            <ButtonDefault typeButton='dark' isOutline type='button'>
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
    </Container>
  ) 
}
