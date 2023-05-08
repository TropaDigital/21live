/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Hooks
import { useToast } from '../../hooks/toast';
import { useFetch } from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { useSteps } from '../../hooks/useSteps';

// Utils
import { TenantProps } from '../../utils/models';

// Types
import { IProduct, IProjectCreate } from '../../types';

// Icons
import { IconChecked, IconMail } from '../../assets/icons';

// Components
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import HeaderStepsPage from '../../components/HeaderStepsPage';
import { UploadedFilesProps } from '../../components/Upload/UploadFiles';
import InfoDescription from '../Projects/ComponentSteps/InfoDescription';
import InfoFiles from '../Projects/ComponentSteps/InfoFiles';
import InfoGeral from '../Projects/ComponentSteps/InfoGeral';
import InfoProducts from '../Projects/ComponentSteps/InfoProducts/InfoProducts';
import ModalDefault from '../../components/Ui/ModalDefault';
import { SaveButton } from '../Projects/ComponentSteps/InfoProducts/styles';

// Styles
import {
  Container,
  EmailButton,
  FinishButtons,
  FinishModal,
  FinishModalButtons,
  FinishModalMessage,
  Footer,
  FormTitle,
  FormWrapper,
  Summary,
  SummaryCard,
  SummaryCardSubtitle,
  SummaryCardTitle,
  SummaryContractCard,
  SummaryWrapper
} from './styles';

// Services
import api from '../../services/api';

interface StateProps {
  [key: string]: any;
}

export default function CreateProject() {
  const [createStep, setCreateStep] = useState<number>(1);
  const { addToast } = useToast();

  const { formData, setFormValue, setData, handleOnChange } = useForm({
    tenant_id: '',
    title: '',
    contract_type: '',
    project_id: '',
    date_start: '',
    date_end: '',
    description: '',
    category: '',
    products: [],
    files: []
  } as IProjectCreate);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [search, setSearch] = useState('');
  const {
    data: dataProject,
    fetchData: fetchProject,
    pages
  } = useFetch<IProjectCreate[]>(`project?search=${search}`);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [error, setError] = useState<StateProps>({});
  const [loading, setLoading] = useState(false);
  const { data: dataOffice } = useFetch<IProjectCreate[]>(`services`);
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [showSave, setShowSave] = useState<any>(false);
  const [saveProducts, setSaveProducts] = useState<any>('');

  const handleOnAddProducts = (items: any) => {
    setFormValue('products', [...formData.products, items]);
  };

  const handleOnAddDescription = (value: any) => {
    const description: any = {
      name: 'description',
      value: value
    };
    handleOnChange(description);
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

  const formComponents = [
    {
      label: 'Geral',
      success: false,
      component: (
        <InfoGeral
          data={formData}
          handleInputChange={handleOnChange}
          clients={dataClient}
          error={error}
        />
      )
    },
    {
      label: 'Produtos',
      success: false,
      component: (
        <InfoProducts
          handleOnAddProducts={handleOnAddProducts}
          dataOffice={dataOffice}
          dataFilter={formData.products}
          handleOnDecrementQtd={(e) => handleOnDecrementQtd(e)}
          handleOnIncrememtQtd={(e) => handleOnIncrememtQtd(e)}
          handleOnPeriod={(e, id) => handleOnPeriod(e, id)}
          handleOnDeleteProduct={(id) => handleOnDeleteProduct(id)}
          handleInputProduct={(value, id) => handleInputProduct(value, id)}
          okToSave
          setSave={saveProducts}
        />
      )
    },
    {
      label: 'Descrição',
      success: false,
      component: (
        <InfoDescription
          value={formData?.description}
          handleOnDescription={(value) => setFormValue('description', value)}
          mentions={[]}
        />
      )
    },
    {
      label: 'Anexos',
      success: false,
      component: (
        <InfoFiles
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          tenant={formData?.tenant_id}
          isDisabed={!formData?.tenant_id}
          loading={loading}
          setLoading={setLoading}
        />
      )
    }
  ];

  const [steps, setSteps] = useState(() =>
    formComponents.map((row) => ({
      label: row.label,
      success: false
    }))
  );

  const fillComponents = formComponents.map((row: any) => row.component);
  const { changeStep, currentComponent, currentStep, isFirstStep, isLastStep } =
    useSteps(fillComponents);

  function setErrorInput(value: any, message: any) {
    if (!message) {
      delete error[value];
    }

    setError({ ...error, [value]: message });
    return message;
  }

  const handleOnNextStep = () => {
    const { title, tenant_id, contract_type, date_start, date_end, description } = formData;

    try {
      if (title === '') {
        throw setErrorInput('title', 'Titulo é obrigatório!');
      } else {
        setErrorInput('title', undefined);
      }

      if (tenant_id === '') {
        throw setErrorInput('tenant_id', 'Cliente é obrigatório!');
      } else {
        setErrorInput('tenant_id', undefined);
      }

      if (contract_type === '') {
        throw setErrorInput('contract_type', 'Contrato é obrigatório!');
      } else {
        setErrorInput('contract_type', undefined);
      }

      if (date_start === '') {
        throw setErrorInput('date_start', 'Data inicial é obrigatório!');
      } else {
        setErrorInput('date_start', undefined);
      }

      if (date_end === '') {
        throw setErrorInput('date_end', 'Data final é obrigatório!');
      } else {
        setErrorInput('date_end', undefined);
      }

      // if (description === '') {
      //   throw setErrorInput('description', 'Observações são obrigatórias!');
      // } else {
      //   setErrorInput('description', undefined);
      // }

      changeStep(currentStep + 1);
      setCreateStep(createStep + 1);

      setSteps((prevComponents) =>
        prevComponents.map((component, i) => ({
          ...component,
          success: i <= currentStep
        }))
      );
    } catch (error: any) {
      addToast({
        title: 'Atenção',
        description: error,
        type: 'warning'
      });
    }
  };

  const handleOnPrevStep = () => {
    changeStep(currentStep - 1);
    setCreateStep(createStep - 1);
    setSteps((prevComponents) => {
      return prevComponents.map((component, i) => {
        if (i === currentStep - 1) {
          return {
            ...component,
            success: false
          };
        }
        return component;
      });
    });
  };

  const handleOnCancel = () => {
    setData({
      tenant_id: '',
      project_id: '',
      title: '',
      contract_type: '',
      date_start: '',
      date_end: '',
      description: '',
      products: [],
      files: []
    } as IProjectCreate);
    setUploadedFiles([]);
    setError({});
    changeStep(0);
  };

  // const handleOnEdit = (item: IProjectCreate) => {
  //   setData(item);
  //   setUploadedFiles(item.files);

  //   setModal({
  //     isOpen: true,
  //     type: `Editar Projeto/Contrato: ${item.title}`
  //   });
  // };

  // const handleOnDelete = async (id: any) => {
  //   try {
  //     await api.delete(`project/${id}`);
  //     addToast({
  //       type: 'success',
  //       title: 'Sucesso',
  //       description: 'Projeto foi deletado!'
  //     });

  //     fetchProject();
  //   } catch (error: any) {
  //     addToast({
  //       type: 'danger',
  //       title: 'ATENÇÃO',
  //       description: error.response.data.message
  //     });
  //   }
  // };

  // const handleOnSubmit = useCallback(
  //   async (event: any) => {
  //     try {
  //       event.preventDefault();

  //       // Inserir lógica
  //       const files = uploadedFiles.map((row) => ({
  //         bucket: row.bucket,
  //         file_name: row.file_name,
  //         // file_id: row.file_id,
  //         key: row.key,
  //         size: row.size,
  //         url: row.url
  //       }));

  //       const newArrayProducts = formData.products.map(({ tenant_id, ...rest }: any) => rest);
  //       // const updateProducts = formData.products.map(({ service_id, ...rest }: any) => ({ product_id: service_id, ...rest }))

  //       const { title, tenant_id, description, date_start, date_end, contract_type, project_id } =
  //         formData;

  //       const createNewData = {
  //         title,
  //         tenant_id,
  //         products: newArrayProducts,
  //         description,
  //         date_start,
  //         date_end,
  //         contract_type,
  //         files
  //       };

  //       const updateData = {
  //         title,
  //         project_id,
  //         tenant_id,
  //         products: newArrayProducts,
  //         description,
  //         date_start,
  //         date_end,
  //         contract_type,
  //         files
  //       };

  //       if (modal.type === 'Criar novo Projeto/Contrato') {
  //         await api.post(`project`, createNewData);
  //       } else {
  //         await api.put(`project/${formData.project_id}`, updateData);
  //       }

  //       addToast({
  //         type: 'success',
  //         title: 'Sucesso',
  //         description: 'Serviço cadastrado com sucesso!'
  //       });

  //       setData({
  //         tenant_id: '',
  //         project_id: '',
  //         title: '',
  //         contract_type: '',
  //         date_start: '',
  //         date_end: '',
  //         description: '',
  //         products: [],
  //         files: []
  //       } as IProjectCreate);
  //       setUploadedFiles([]);
  //       setModal({
  //         isOpen: false,
  //         type: 'Criar novo Projeto/Contrato'
  //       });
  //       changeStep(0);
  //       fetchProject();
  //     } catch (e: any) {
  //       // Exibir erro
  //       addToast({
  //         type: 'danger',
  //         title: 'ATENÇÃO',
  //         description: e.response.data.message
  //       });

  //       // setErros(getValidationErrors(e.response.data.result))
  //     }
  //   },
  //   [formData, setFormValue, uploadedFiles, setUploadedFiles, modal, setData]
  // );

  // function handleList(value: any) {
  //   if (listSelected.includes(value)) {
  //     setListSelected(listSelected.filter((obj) => obj !== value));
  //   } else {
  //     setListSelected((obj) => [...obj, value]);
  //   }
  // }

  // const handleOnEdit = (item: IProjectCreate) => {
  //   setData(item);
  //   setUploadedFiles(item.files);

  //   // setModal({
  //   //   isOpen: true,
  //   //   type: `Editar Projeto/Contrato: ${item.title}`
  //   // });
  // };

  // const handleOnDelete = async (id: any) => {
  //   try {
  //     await api.delete(`project/${id}`);
  //     addToast({
  //       type: 'success',
  //       title: 'Sucesso',
  //       description: 'Projeto foi deletado!'
  //     });

  //     fetchProject();
  //   } catch (error: any) {
  //     addToast({
  //       type: 'danger',
  //       title: 'ATENÇÃO',
  //       description: error.response.data.message
  //     });
  //   }
  // };

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();

        // Inserir lógica
        const files = uploadedFiles.map((row) => ({
          bucket: row.bucket,
          file_name: row.file_name,
          // file_id: row.file_id,
          key: row.key,
          size: row.size,
          url: row.url
        }));

        const newArrayProducts = formData.products.map(({ tenant_id, ...rest }: any) => rest);
        // const updateProducts = formData.products.map(({ service_id, ...rest }: any) => ({ product_id: service_id, ...rest }))

        const {
          title,
          tenant_id,
          description,
          date_start,
          date_end,
          contract_type,
          category,
          project_id
        } = formData;

        const createNewData = {
          title,
          tenant_id,
          products: newArrayProducts,
          description,
          category,
          date_start,
          date_end,
          contract_type,
          files
        };

        const updateData = {
          title,
          project_id,
          tenant_id,
          products: newArrayProducts,
          description,
          date_start,
          date_end,
          contract_type,
          files
        };

        await api.post(`project`, createNewData);
        // if (modal.type === 'Criar novo Projeto/Contrato') {
        // } else {
        //   await api.put(`project/${formData.project_id}`, updateData);
        // }
        setFinishModal(true);
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Serviço cadastrado com sucesso!'
        });

        setData({
          tenant_id: '',
          project_id: '',
          title: '',
          contract_type: '',
          date_start: '',
          date_end: '',
          description: '',
          category: '',
          products: [],
          files: []
        } as IProjectCreate);
        setUploadedFiles([]);
        changeStep(0);
        fetchProject();
      } catch (e: any) {
        // Exibir erro
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });

        // setErros(getValidationErrors(e.response.data.result))
      }
    },
    [formData, setFormValue, uploadedFiles, setUploadedFiles, setData]
  );

  // function handleList(value: any) {
  //   if (listSelected.includes(value)) {
  //     setListSelected(listSelected.filter((obj) => obj !== value));
  //   } else {
  //     setListSelected((obj) => [...obj, value]);
  //   }
  // }

  // useEffect(() => {
  //   console.log('log do formdata', formData);
  // }, [formData]);

  return (
    <Container>
      <HeaderStepsPage
        title="Criar novo projeto/contrato"
        backButton={createStep <= 1}
        stepSelected={createStep}
      />

      <FormWrapper>
        {createStep === 1 && (
          <>
            <FormTitle>Geral</FormTitle>
            <InfoGeral
              data={formData}
              handleInputChange={handleOnChange}
              clients={dataClient}
              error={error}
            />
            <div className="label-observation">
              <p>Observações</p>
              <InfoDescription
                value={formData.description}
                // handleOnDescription={(value) => setFormValue('description', value)}
                handleOnDescription={(value) => console.log('description', value)}
                mentions={[]}
              />
            </div>
          </>
        )}
        {createStep === 2 && (
          <>
            <FormTitle>Produtos</FormTitle>
            <InfoProducts
              handleOnAddProducts={handleOnAddProducts}
              dataOffice={dataOffice}
              dataFilter={formData.products}
              handleOnDecrementQtd={(e) => handleOnDecrementQtd(e)}
              handleOnIncrememtQtd={(e) => handleOnIncrememtQtd(e)}
              handleOnPeriod={(e, id) => handleOnPeriod(e, id)}
              handleOnDeleteProduct={(id) => handleOnDeleteProduct(id)}
              handleInputProduct={(value, id) => handleInputProduct(value, id)}
              okToSave={setShowSave}
              setSave={saveProducts}
            />
          </>
        )}
        {createStep === 3 && (
          <>
            <FormTitle>Anexos</FormTitle>
            <InfoFiles
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={formData?.tenant_id}
              // isDisabed={!formData?.tenant_id}
              isDisabed={false}
              loading={loading}
              setLoading={setLoading}
            />
          </>
        )}
        {createStep === 4 && (
          <>
            <div className="flex-title">
              <FormTitle>Resumo</FormTitle>
              <EmailButton>
                <IconMail />
                Enviar resumo por email
              </EmailButton>
            </div>
            <SummaryWrapper>
              <Summary className="big">
                <div className="title">Produtos contratados</div>
                {formData.products.map((row: IProduct, index: number) => (
                  <SummaryCard key={index}>
                    <SummaryCardTitle>
                      #{index + 1} - {row.service}
                    </SummaryCardTitle>
                    <SummaryCardSubtitle>
                      <div>Horas estimadas: {row.minutes}:00</div>
                      <div>Categoria: {row.type}</div>
                      <div>Quantidade: {row.quantity}</div>
                    </SummaryCardSubtitle>
                  </SummaryCard>
                ))}
              </Summary>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '446px' }}
              >
                <Summary className="small">
                  <div className="title small">Resumo do contrato</div>
                  <SummaryContractCard>
                    <div className="products">{formData.products.length} Produto(s)</div>
                  </SummaryContractCard>
                  <SummaryContractCard>
                    <div className="hours">
                      Horas por produto <strong>02:00:00</strong>
                    </div>
                  </SummaryContractCard>
                  <SummaryContractCard>
                    <div className="hours">
                      Horas de criação <strong>02:00:00</strong>
                    </div>
                  </SummaryContractCard>
                  <SummaryContractCard>
                    <div className="total">
                      Total <div>04:00:00</div>
                    </div>
                  </SummaryContractCard>
                </Summary>

                <FinishButtons>
                  <ButtonDefault onClick={handleOnSubmit}>Salvar Projeto/Contrato</ButtonDefault>
                  <ButtonDefault typeButton="primary" isOutline onClick={() => setCreateStep(2)}>
                    Editar produtos
                  </ButtonDefault>
                </FinishButtons>
              </div>
            </SummaryWrapper>
          </>
        )}
      </FormWrapper>

      {createStep !== 4 && (
        <Footer>
          {showSave && (
            <SaveButton
              onClick={() => {
                setSaveProducts('Go');
                setTimeout(() => {
                  setCreateStep(createStep + 1);
                  setShowSave(false);
                }, 1500);
              }}
            >
              <ButtonDefault>Salvar</ButtonDefault>
            </SaveButton>
          )}

          {!showSave && (
            <>
              <Link to={'/projetos'}>
                <ButtonDefault
                  typeButton="primary"
                  isOutline
                  type="button"
                  onClick={handleOnCancel}
                >
                  Descartar
                </ButtonDefault>
              </Link>

              <div className="fieldGroup">
                {createStep !== 1 && (
                  <ButtonDefault typeButton="primary" isOutline onClick={handleOnPrevStep}>
                    Voltar
                  </ButtonDefault>
                )}

                {!isLastStep ? (
                  <ButtonDefault type="button" typeButton="primary" onClick={handleOnNextStep}>
                    Continuar
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
            </>
          )}
        </Footer>
      )}

      <ModalDefault
        isOpen={finishModal}
        onOpenChange={() => setFinishModal(false)}
        maxWidth="400px"
      >
        <FinishModal>
          <div>
            <IconChecked />
          </div>
          <FinishModalMessage>
            <div className="modal-title">Projeto criado com sucesso</div>
            <div className="modal-subtitle">
              O projeto foi criado com êxito, visualize os detalhes na página de projetos salvos.
            </div>
          </FinishModalMessage>

          <FinishModalButtons>
            <ButtonDefault typeButton="dark" isOutline onClick={() => setFinishModal(false)}>
              Cancelar
            </ButtonDefault>
            <ButtonDefault typeButton="primary">Confirmar</ButtonDefault>
          </FinishModalButtons>
        </FinishModal>
      </ModalDefault>
    </Container>
  );
}
