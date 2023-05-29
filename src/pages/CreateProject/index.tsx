/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import { useToast } from '../../hooks/toast';
import { useFetch } from '../../hooks/useFetch';

// Utils
import { TenantProps } from '../../utils/models';
import { multiplyTime, sumTimes } from '../../utils/convertTimes';

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
import InputSwitchDefault from '../../components/Inputs/InputSwitchDefault';

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

type HandleOnChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

export default function CreateProject() {
  const navigate = useNavigate();
  const [createStep, setCreateStep] = useState<number>(1);
  const { addToast } = useToast();

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
  const [editSelectedProducts, setEditSelectedProducts] = useState<boolean>(false);
  const [DTOForm, setDTOForm] = useState<any>({
    tenant_id: '',
    title: '',
    contract_type: '',
    project_id: '',
    date_start: '',
    date_end: '',
    description: '',
    category: '',
    products: [],
    files: [],
    time: ''
  });
  const [productsArray, setProductsArray] = useState<IProduct[]>([]);

  // Hours calculations
  const creatorHoursArray = productsArray?.filter(
    (obj) => obj.service.toLowerCase() === 'hora de criação'
  );
  // const totalCreateHours = creatorHoursArray.reduce(
  //   (accumulator: any, currentValue: any) => accumulator + currentValue.minutes,
  //   0
  // );

  const productsHours = productsArray?.map((row) => {
    return multiplyTime(row?.minutes, row?.quantity);
  });

  // const totalHoursProducts = sumTimes(productsHours) + totalCreateHours;
  // const productsHoursWithoutCreateHours = totalHoursProducts - totalCreateHours;
  // End Hours calculations

  const handleOnAddProducts = (items: IProduct) => {
    setProductsArray((prevState: any) => [...prevState, items]);
  };

  const handleDescription = (value: any) => {
    setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
  };

  const handleChangeInput: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setDTOForm({ ...DTOForm, [name]: value });
  };

  useEffect(() => {
    console.log('log do DTO', DTOForm);
  }, [DTOForm]);

  function isNumber(value: string) {
    return /^[0-9]*$/.test(value);
  }

  // const handleOnPeriod = useCallback(
  //   (value: any, id: any) => {
  //     const verifyPeriod = value ? 'anual' : 'mensal';
  //     const updatedProducts = [...formData.products];
  //     const productIndex = updatedProducts.findIndex((product) => product.service_id === id);
  //     const updatedProductCopy = { ...updatedProducts[productIndex] };
  //     updatedProductCopy.period = verifyPeriod;
  //     updatedProducts[productIndex] = updatedProductCopy;

  //     setFormValue('products', updatedProducts);
  //   },
  //   [setFormValue, formData]
  // );

  const handleDeleteProducts = (id: any) => {
    setProductsArray(productsArray.filter((obj) => obj.service_id !== id));
    if (productsArray.length <= 1) {
      setEditSelectedProducts(false);
    }
  };

  const editProductQuantity = (product: IProduct) => {
    console.log('log do product to edit', product);
    if (editSelectedProducts) {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === product.service_id) {
            return { ...obj, quantity: product.quantity };
          }
          return obj;
        })
      );
    }
  };

  const editProductHours = (values: any, product: IProduct) => {
    console.log('log do produto a ser editado as horas', values, product);

    // setProductsArray((current) =>
    //   current.map((obj) => {
    //     if (obj.service_id === product.service_id) {
    //       return { ...obj, minutes: values.timeCounter, period: values.contractType };
    //     }
    //     return obj;
    //   })
    // );
  };

  function setErrorInput(value: any, message: any) {
    if (!message) {
      delete error[value];
    }

    setError({ ...error, [value]: message });
    return message;
  }

  const handleOnNextStep = () => {
    const { title, tenant_id, category, contract_type, date_start, date_end, description } =
      DTOForm;

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

      if (category === '') {
        throw setErrorInput('category', 'Categoria é obrigatória!');
      } else {
        setErrorInput('category', undefined);
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

      if (description === '') {
        throw setErrorInput('description', 'Observações são obrigatórias!');
      } else {
        setErrorInput('description', undefined);
      }

      if (createStep === 2 && productsArray.length <= 0) {
        throw new Error('Escolha pelo menos um produto antes de avançar');
      }

      setCreateStep(createStep + 1);
    } catch (error: any) {
      addToast({
        title: 'Atenção',
        description: error,
        type: 'warning'
      });
    }
  };

  const handleOnPrevStep = () => {
    setCreateStep(createStep - 1);
  };

  const handleOnCancel = () => {
    setDTOForm({
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
    setProductsArray([]);
    setError({});
  };

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();

        // Inserir lógica
        const files = uploadedFiles.map(
          (row: { bucket: any; file_name: any; key: any; size: any; url: any }) => ({
            bucket: row.bucket,
            file_name: row.file_name,
            // file_id: row.file_id,
            key: row.key,
            size: row.size,
            url: row.url
          })
        );

        const newArrayProducts = productsArray.map(({ tenant_id, ...rest }: any) => rest);
        const totalTime = sumTimes(productsHours);

        const createNewData = {
          title: DTOForm.title,
          tenant_id: DTOForm.tenant_id,
          products: newArrayProducts,
          description: DTOForm.description,
          category: DTOForm.category,
          date_start: DTOForm.date_start,
          date_end: DTOForm.date_end,
          contract_type: DTOForm.contract_type,
          files,
          time: totalTime
        };

        // const updateData = {
        //   title,
        //   project_id,
        //   tenant_id,
        //   products: newArrayProducts,
        //   description,
        //   date_start,
        //   date_end,
        //   contract_type,
        //   files,
        //   time
        // };

        console.log('log do post project', DTOForm);
        console.log('log do post new data', createNewData);

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

        setDTOForm({
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
        fetchProject();
      } catch (e: any) {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });

        // setErros(getValidationErrors(e.response.data.result))
      }
    },
    [uploadedFiles, setUploadedFiles]
  );

  const handleSwitchEmail = (value: any) => {
    const emailSwitch: string = value.toString();
    setDTOForm((prevState: any) => ({ ...prevState, ['email']: emailSwitch }));
  };

  const finishCreate = () => {
    setFinishModal(false);
    navigate('/projetos');
  };

  return (
    <Container>
      <HeaderStepsPage
        title="Criar novo projeto/contrato"
        backButton={createStep <= 1}
        stepSelected={createStep}
        backPage="/projetos"
      />

      <FormWrapper>
        {createStep === 1 && (
          <>
            <FormTitle>Geral</FormTitle>
            <InfoGeral
              data={DTOForm}
              handleInputChange={handleChangeInput}
              clients={dataClient}
              error={error}
            />

            <div className={error.description ? 'label-observation error' : 'label-observation'}>
              <div className="label">
                <p>Observações</p>
                {error.description && <span>Observações são obrigatórias</span>}
              </div>
              <InfoDescription
                value={DTOForm.description}
                handleOnDescription={(value) => handleDescription(value)}
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
              dataFilter={productsArray}
              handleOnPeriod={(e, id) => ''}
              handleOnDeleteProduct={(id) => handleDeleteProducts(id)}
              handleEditProductQuantity={(value) => editProductQuantity(value)}
              handleEditProducthours={editProductHours}
              okToSave={setShowSave}
              setSave={saveProducts}
              editProducts={editSelectedProducts}
              hideSwitch={DTOForm.category}
            />
          </>
        )}
        {createStep === 3 && (
          <>
            <FormTitle>Anexos</FormTitle>
            <InfoFiles
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={DTOForm?.tenant_id}
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
                <InputSwitchDefault
                  onChange={(e) => {
                    handleSwitchEmail(e.target.checked);
                  }}
                  value={DTOForm.email}
                />
                <IconMail />
                Enviar resumo por email
              </EmailButton>
            </div>
            <SummaryWrapper>
              <Summary className="big">
                <div className="title">Produtos contratados</div>
                {productsArray.map((row: IProduct, index: number) => (
                  <SummaryCard key={index}>
                    <SummaryCardTitle>
                      #{index + 1} - {row.service}
                    </SummaryCardTitle>
                    <SummaryCardSubtitle>
                      <div>Horas estimadas: {multiplyTime(row?.minutes, row?.quantity)}</div>
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
                    <div className="products">
                      {productsArray.length >= 2
                        ? `${productsArray.length} Produtos`
                        : `${productsArray.length} Produto`}
                    </div>
                  </SummaryContractCard>
                  <SummaryContractCard>
                    <div className="hours">
                      Horas por produto
                      <strong>{sumTimes(productsHours)}</strong>
                    </div>
                  </SummaryContractCard>
                  {/* {productsArray.some((obj) => obj.service.toLowerCase() === 'hora de criação') && (
                    <SummaryContractCard>
                      <div className="hours">
                        Horas de criação
                        <strong>
                          {totalCreateHours > 9 ? totalCreateHours : `0${totalCreateHours}`}
                          :00:00
                        </strong>
                      </div>
                    </SummaryContractCard>
                  )} */}
                  <SummaryContractCard>
                    <div className="total">
                      Total <div>{sumTimes(productsHours)}</div>
                    </div>
                  </SummaryContractCard>
                </Summary>

                <FinishButtons>
                  <ButtonDefault onClick={handleOnSubmit}>Salvar Projeto/Contrato</ButtonDefault>
                  <ButtonDefault
                    typeButton="primary"
                    isOutline
                    onClick={() => {
                      setCreateStep(2);
                      setEditSelectedProducts(true);
                    }}
                  >
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
                  setShowSave(false);
                  setSaveProducts('');
                  setCreateStep(createStep + 1);
                  setEditSelectedProducts(true);
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

                <ButtonDefault type="button" typeButton="primary" onClick={handleOnNextStep}>
                  Continuar
                </ButtonDefault>
                {/* {createStep < 4 ? (
                ) : (
                  <ButtonDefault
                    typeButton="primary"
                    type="button"
                    onClick={handleOnSubmit}
                    loading={loading}
                  >
                    Salvar
                  </ButtonDefault>
                )} */}
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
            {/* <ButtonDefault typeButton="dark" isOutline onClick={() => setFinishModal(false)}>
              Cancelar
            </ButtonDefault> */}
            <ButtonDefault typeButton="primary" onClick={finishCreate}>
              Concluir
            </ButtonDefault>
          </FinishModalButtons>
        </FinishModal>
      </ModalDefault>
    </Container>
  );
}
