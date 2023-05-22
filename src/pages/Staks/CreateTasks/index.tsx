/* eslint-disable import-helpers/order-imports */
// React
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// components
import HeaderStepsPage from '../../../components/HeaderStepsPage';
import InfoGeral from '../ComponentSteps/InfoGeral';
import InfoDescription from '../ComponentSteps/InfoDescription';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import QuantityCounter from '../../../components/QuantityCounter';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { SwitchSelector } from '../../../components/CardProductsSelected/styles';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import InfoDeliveries from '../ComponentSteps/InfoDeliverables';
import AddTextButton from '../../../components/Buttons/AddTextButton';
import TaskInputs from '../ComponentSteps/InfoInputs';
import SummaryTasks from '../ComponentSteps/SummaryTasks';

// Styles
import {
  AddProductButton,
  CloseModalButton,
  ContainerWrapper,
  Deliveries,
  Footer,
  FormTitle,
  FormWrapper,
  Product,
  ProductListHeader,
  ProductListWrapper,
  ProductModalTitle,
  ProductsModalTop,
  ProductsModalWrapper,
  SearchProductsModal,
  SplitDeliveries
} from './styles';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useFetch } from '../../../hooks/useFetch';
import useDebouncedCallback from '../../../hooks/useDebounced';

// Types
import { IProduct, ServicesProps } from '../../../types';

// Utils
import { TenantProps } from '../../../utils/models';

// Icons
import { IconChecked, IconClose } from '../../../assets/icons';
import { BiCalendar, BiSearchAlt } from 'react-icons/bi';
import { FinishModal, FinishModalButtons, FinishModalMessage } from '../../CreateProject/styles';

interface StateProps {
  [key: string]: any;
}

type HandleOnChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

export default function CreateTasks() {
  const [createStep, setCreateStep] = useState<number>(1);
  const { addToast } = useToast();

  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [error, setError] = useState<StateProps>({});
  const [DTOForm, setDTOForm] = useState<any>({
    title: '',
    tenant_id: '',
    product_id: '',
    type: '',
    flow_id: '',
    description: '',
    creation: '',
    copywriting: '',
    products_task: [],
    archives: [],
    deadlines: [],
    step: ''
  });
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [productsModal, setProductsModal] = useState<boolean>(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [deliveriesSplit, setDeliveriesSplit] = useState<string>('no-split');
  const { data: dataProducts } = useFetch<ServicesProps[]>(`services?search=${search}`);
  const { data: dataProjects } = useFetch<ServicesProps[]>(`project`);
  const { data: dataFlow, pages, fetchData } = useFetch<any[]>(`/flow?search=`);
  const { data: dataTypes } = useFetch<any[]>(`/task-type`);
  const [productsArray, setProductsArray] = useState<ServicesProps[]>([]);
  const [quantityProductsArray, setQuantityProductsArray] = useState<any[]>([]);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [deliveryDates, setDeliveryDates] = useState({
    dateStart: '',
    creationDate: ''
  });
  const splitDeliveries = deliveriesSplit === 'no-split' ? false : true;
  const handleSwitch = (value: any) => {
    setDeliveriesSplit(value === true ? 'split' : 'no-split');
  };

  const handleDescription = (value: any) => {
    // setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
    console.log('Log do description', value);
    setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
  };

  const handleOnChangeCheckbox = (product: ServicesProps) => {
    if (productsArray.filter((obj) => obj.service_id === product.service_id).length > 0) {
      const newArray = productsArray.filter((obj) => obj.service_id !== product.service_id);
      setProductsArray([]);
      setProductsArray(newArray);
    } else {
      setProductsArray((prevState: any) => [...prevState, product]);
    }
  };

  function setErrorInput(value: any, message: any) {
    if (!message) {
      delete error[value];
    }

    setError({ ...error, [value]: message });
    return message;
  }

  const handleChangeInput: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setDTOForm({ ...DTOForm, [name]: value });
  };

  const handleOnNextStep = () => {
    const { title, tenant_id, product_id, flow_id, description } = DTOForm;

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

      if (product_id === '') {
        throw setErrorInput('product_id', 'Projeto / Contrato é obrigatório!');
      } else {
        setErrorInput('product_id', undefined);
      }

      if (flow_id === '') {
        throw setErrorInput('flow_id', 'Fluxo é obrigatório!');
      } else {
        setErrorInput('flow_id', undefined);
      }

      if (description === '') {
        throw setErrorInput('description', 'Contexto geral é obrigatório!');
      } else {
        setErrorInput('description', undefined);
      }

      if (createStep === 1) {
        setProductsModal(true);
      } else {
        setCreateStep(createStep + 1);
      }
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
    // setDTOForm({
    //   tenant_id: '',
    //   project_id: '',
    //   title: '',
    //   contract_type: '',
    //   date_start: '',
    //   date_end: '',
    //   description: '',
    //   products: [],
    //   files: []
    // } as IProjectCreate);
    // setUploadedFiles([]);
    // setProductsArray([]);
    setError({});
  };

  const handleProductsDeliveries = (field: string, value: string, product: any) => {
    console.log('log dos produtos entregaveis', field, value, product);

    if (field === 'description') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === product) {
            return { ...obj, description: value };
          }
          return obj;
        })
      );
    }

    if (field === 'size') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === product) {
            return { ...obj, size: value };
          }
          return obj;
        })
      );
    }

    if (field === 'category') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === product) {
            return { ...obj, category: value };
          }
          return obj;
        })
      );
    }

    if (field === 'type') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === product) {
            return { ...obj, type: value };
          }
          return obj;
        })
      );
    }
  };

  const handleProductQuantity = (value: any) => {
    if (productsArray.filter((obj) => obj.service_id === value.project_id).length > 0) {
      if (quantityProductsArray.length > 0) {
        setQuantityProductsArray((current) =>
          current.map((obj) => {
            if (obj.project_id === value.project_id) {
              return { ...obj, quantity: value.quantity };
            }
            return obj;
          })
        );
      } else {
        setQuantityProductsArray((prevState: any) => [...prevState, value]);
      }
    } else {
      addToast({
        type: 'warning',
        title: 'ATENÇÃO',
        description: 'Selecione o produto primeiro, depois a quantidade.'
      });
    }
  };

  const handleClearQuantity = (value: any) => {
    setQuantityProductsArray((current) =>
      current.map((obj) => {
        if (obj.project_id === value.service_id) {
          return { ...obj, quantity: 0 };
        }
        return obj;
      })
    );
  };

  useEffect(() => {
    console.log('log do DTOForm', DTOForm);
  }, [DTOForm]);

  useEffect(() => {
    console.log('log do quantity products selected', quantityProductsArray);
  }, [quantityProductsArray]);

  return (
    <>
      <ContainerWrapper>
        <HeaderStepsPage
          title="Criar nova tarefa"
          backButton={createStep <= 1}
          stepSelected={createStep}
          backPage="/tarefas"
        />

        <FormWrapper>
          {createStep === 1 && (
            <>
              <FormTitle>Geral</FormTitle>
              <InfoGeral
                data={DTOForm}
                dataProjects={dataProjects}
                dataFlow={dataFlow}
                handleInputChange={handleChangeInput}
                clients={dataClient}
                error={error}
              />

              <div className={error.description ? 'label-observation error' : 'label-observation'}>
                <div className="label">
                  <p>Contexto geral</p>
                  {error.description && <span>Contexto geral é obrigatório!</span>}
                </div>
                <InfoDescription
                  value={DTOForm?.description}
                  handleOnDescription={(value) => handleDescription(value)}
                  mentions={[]}
                />
              </div>
            </>
          )}
          {createStep === 2 && (
            <>
              <FormTitle>Entregáveis</FormTitle>
              <SplitDeliveries>
                <SwitchSelector>
                  <InputSwitchDefault
                    onChange={(e) => {
                      handleSwitch(e.target.checked);
                    }}
                    value={String(splitDeliveries)}
                  />
                  <span>Dividir entregas</span>
                </SwitchSelector>
                <Deliveries>
                  <InputDefault
                    label="Entrega {Nome do input intermediário}"
                    placeholder="00/00/0000"
                    name="dateStart"
                    type="date"
                    icon={BiCalendar}
                    onChange={(e) =>
                      setDeliveryDates({ ...deliveryDates, ['dateStart']: e.target.value })
                    }
                    value={deliveryDates.dateStart}
                  />

                  <InputDefault
                    label="Entrega Criação"
                    placeholder="00/00/0000"
                    name="creationDate"
                    type="date"
                    icon={BiCalendar}
                    onChange={(e) =>
                      setDeliveryDates({ ...deliveryDates, ['creationDate']: e.target.value })
                    }
                    value={deliveryDates.creationDate}
                  />
                </Deliveries>
              </SplitDeliveries>
              <InfoDeliveries
                data={productsArray}
                dataTypes={dataTypes}
                handleProducts={handleProductsDeliveries}
                error={error}
                deliveriesSplited={splitDeliveries}
                addProducts={() => setProductsModal(true)}
              />
              {!splitDeliveries && (
                <AddTextButton title="Adicionar produto" click={() => setProductsModal(true)} />
              )}
            </>
          )}
          {createStep === 3 && (
            <>
              <FormTitle>Inputs</FormTitle>
              <TaskInputs
                valueFirst={'Nada'}
                valueSecond={'Nada X 2'}
                handleOnDescription={() => ''}
                handleOnInput={() => ''}
                mentions={[]}
              />
            </>
          )}
          {createStep === 4 && (
            <>
              <FormTitle>Resumo</FormTitle>
              <SummaryTasks
                selectedProducts={productsArray}
                createTasks={() => console.log('log do criar tarefa')}
                editTasks={() => setCreateStep(2)}
              />
            </>
          )}
        </FormWrapper>

        {createStep !== 4 && (
          <Footer>
            <>
              <Link to={'/tarefas'}>
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
              </div>
            </>
          </Footer>
        )}

        <ModalDefault
          isOpen={productsModal}
          onOpenChange={() => setProductsModal(false)}
          maxWidth="848px"
        >
          <ProductsModalWrapper>
            <ProductsModalTop>
              <ProductModalTitle>Lista de produtos</ProductModalTitle>
              <CloseModalButton onClick={() => setProductsModal(false)}>
                <IconClose />
              </CloseModalButton>
            </ProductsModalTop>

            <ProductListWrapper>
              <SearchProductsModal>
                <InputDefault
                  label=""
                  name="search"
                  placeholder="Buscar produtos"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    debouncedCallback(event.target.value);
                  }}
                  value={searchTerm}
                  icon={BiSearchAlt}
                  isLoading={isLoading}
                  className="search-field"
                />
              </SearchProductsModal>
              <ProductListHeader>
                <div className="list-title">Produto</div>
                <div className="list-title">Categoria</div>
                <div className="list-title center">Quantidade</div>
              </ProductListHeader>

              {dataProducts?.map((row: any, index) => (
                <Product key={index}>
                  <div className="product">
                    <CheckboxDefault
                      label=""
                      name={row.service_id}
                      onChange={() => handleOnChangeCheckbox(row)}
                      // checked={data.email_alert === 'true' ? true : false}
                      checked={
                        productsArray.filter((obj) => obj.service_id === row.service_id).length > 0
                          ? true
                          : false
                      }
                    />
                    {row.service}
                  </div>
                  <div className="category">{row.category}</div>
                  <div className="quantity">
                    <QuantityCounter
                      handleQuantity={handleProductQuantity}
                      rowQuantity={row}
                      clearQuantity={handleClearQuantity}
                      receiveQuantity={row.quantity}
                    />
                  </div>
                </Product>
              ))}
            </ProductListWrapper>

            <AddProductButton>
              <ButtonDefault
                typeButton="primary"
                onClick={() => {
                  console.log('add product');
                  setProductsModal(false);
                  setCreateStep(createStep + 1);
                }}
              >
                Adicionar Produto
              </ButtonDefault>
            </AddProductButton>
          </ProductsModalWrapper>
        </ModalDefault>

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
              <div className="modal-title">Tarefa criada com sucesso!</div>
              <div className="modal-subtitle">
                A tarefa foi criada com êxito, visualize os detalhes na página de tarefas.
              </div>
            </FinishModalMessage>

            <FinishModalButtons>
              <ButtonDefault typeButton="dark" isOutline onClick={() => setFinishModal(false)}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={() => ''}>
                Confirmar
              </ButtonDefault>
            </FinishModalButtons>
          </FinishModal>
        </ModalDefault>
      </ContainerWrapper>
    </>
  );
}
