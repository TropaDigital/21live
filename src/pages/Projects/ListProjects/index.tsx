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

import Steps from '../Steps';
// STYLES
import { Container, CardProject, TitleCardProject, InfoCardProject, FooterProjectCard, FieldGroupCardProject, ContentCardProject } from './styles';
import { TenantProps } from '../../../utils/models';
import { UploadedFilesProps } from '../../../components/Upload/UploadFiles';

export default function ListProjects() {
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

  
  // PRODUTOS
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const { data: dataOffice } = useFetch<IProjectCreate[]>(`services`);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');

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
    const updatedProducts = [...formData.products];
    const productIndex = updatedProducts.findIndex(product => product.service_id === id);
    const updatedProductCopy = {...updatedProducts[productIndex]};
    updatedProductCopy.period = value;
    updatedProducts[productIndex] = updatedProductCopy;

    setFormValue('products', updatedProducts)

  }, [setFormValue, formData])

  const formComponents = [
    <InfoGeral data={formData} handleInputChange={handleOnChange} clients={dataClient} />, 
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

  console.log('FORMDATA', formData)

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
          {[0,1,2,3].map((row) => (
            <CardProject key={row}>
              <TitleCardProject>
                Título do projeto
              </TitleCardProject>

              <InfoCardProject>
                <h3>Cliente: <span>Tropa</span></h3>

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

                  <ButtonDefault typeButton='info'>
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
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          
          <Steps currentStep={currentStep} />

          <div>{currentComponent}</div>

          <FooterModal>

            <ButtonDefault typeButton='dark' isOutline>
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
                  type='submit'
                  typeButton="primary"
                >
                  Próxima etapa
                </ButtonDefault>
              ) : (
                <ButtonDefault
                  typeButton="primary"
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
