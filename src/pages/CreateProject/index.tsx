import { useState, useCallback, useEffect } from 'react';

import { useToast } from '../../hooks/toast';
import { useFetch } from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { useSteps } from '../../hooks/useSteps';

import { TenantProps } from '../../utils/models';

import { IProjectCreate } from '../../types';

import ButtonDefault from '../../components/Buttons/ButtonDefault';
import HeaderStepsPage from '../../components/HeaderStepsPage';
import { UploadedFilesProps } from '../../components/Upload/UploadFiles';

import InfoDescription from '../Projects/ComponentSteps/InfoDescription';
import InfoFiles from '../Projects/ComponentSteps/InfoFiles';
import InfoGeral from '../Projects/ComponentSteps/InfoGeral';
import InfoProducts from '../Projects/ComponentSteps/InfoProducts';
import { Container, Footer, FormWrapper } from './styles';

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

        const { title, tenant_id, description, date_start, date_end, contract_type, project_id } =
          formData;

        const createNewData = {
          title,
          tenant_id,
          products: newArrayProducts,
          description,
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

        // if (modal.type === 'Criar novo Projeto/Contrato') {
        //   await api.post(`project`, createNewData);
        // } else {
        //   await api.put(`project/${formData.project_id}`, updateData);
        // }

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
          products: [],
          files: []
        } as IProjectCreate);
        setUploadedFiles([]);
        // setModal({
        //   isOpen: false,
        //   type: 'Criar novo Projeto/Contrato'
        // });
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
  //   console.log('log dos steps', currentStep);
  // }, [steps]);

  return (
    <Container>
      <HeaderStepsPage
        title="Criar novo projeto/contrato"
        backButton={createStep <= 1}
        stepSelected={createStep}
      ></HeaderStepsPage>

      <FormWrapper>
        {createStep === 1 && (
          <>
            <InfoGeral
              data={formData}
              handleInputChange={handleOnChange}
              clients={dataClient}
              error={error}
            />
            <div className="label-observation">
              <p>Observações</p>
              <InfoDescription
                value={formData?.description}
                handleOnDescription={(value) => setFormValue('description', value)}
                mentions={[]}
              />
            </div>
          </>
        )}
      </FormWrapper>

      <Footer>
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
      </Footer>
    </Container>
  );
}
