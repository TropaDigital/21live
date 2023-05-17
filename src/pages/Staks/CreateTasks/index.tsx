/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';
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
  ProductsTable,
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
import { IconClose } from '../../../assets/icons';
import { BiCalendar, BiPencil, BiSearchAlt } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';

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
  const [createStep, setCreateStep] = useState<number>(2);
  const { addToast } = useToast();

  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [error, setError] = useState<StateProps>({});
  const [DTOForm, setDTOForm] = useState<any>({
    title: '',
    tenant_id: '',
    product_id: '',
    contract: '',
    flow: '',
    description: ''
  });
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [productsModal, setProductsModal] = useState<boolean>(false);
  const [deliveriesSplit, setDeliveriesSplit] = useState<string>('no-split');
  const {
    data: dataProducts,
    pages,
    fetchData
  } = useFetch<ServicesProps[]>(`services?search=${search}`);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [deliveryDates, setDeliveryDates] = useState({
    dateStart: '',
    creationDate: ''
  });
  const splitDeliveries = deliveriesSplit === 'mensal' ? false : true;
  const [formatType, setFormatType] = useState<string>('');
  const [descriptionText, setDescriptionText] = useState<string>('');
  const handleSwitch = (value: any) => {
    setDeliveriesSplit(value === true ? 'split' : 'no-split');
  };

  const handleDescription = (value: any) => {
    // setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
    console.log('Log do description', value);
    setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
  };

  const handleOnChangeCheckbox = (value: any, product: IProduct) => {
    console.log('log do value checkbox', value);
    console.log('log do product checkbox', product);
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
    const { title, tenant_id, contract, flow, description } = DTOForm;

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

      if (contract === '') {
        throw setErrorInput('contract', 'Contrato é obrigatório!');
      } else {
        setErrorInput('contract', undefined);
      }

      if (flow === '') {
        throw setErrorInput('flow', 'Fluxo é obrigatório!');
      } else {
        setErrorInput('flow', undefined);
      }

      if (description === '') {
        throw setErrorInput('description', 'Contexto geral é obrigatório!');
      } else {
        setErrorInput('description', undefined);
      }

      setProductsModal(true);
      // setCreateStep(createStep + 1);
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
                dataProducts={dataProducts}
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
              <ProductsTable>
                <FormTitle>Produtos</FormTitle>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Produto</th>
                      <th>Descrição</th>
                      <th>Formato</th>
                      <th>Tipo</th>
                      <th>I/D</th>
                      <th style={{ display: 'grid', placeItems: 'center' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1, 2].map((row: any, index) => (
                      <tr key={index}>
                        <td>#{index + 1}</td>
                        <td style={{ minWidth: '150px' }}>Produto {index + 1}</td>
                        <td>
                          <InputDefault
                            label=""
                            name="description"
                            placeholder="Lorem ipsum dolor sit malesuada"
                            value={descriptionText}
                            maxLength={40}
                            type={'text'}
                            onChange={(e: any) => setDescriptionText(e.target.value.slice(0, 40))}
                            error={error?.date_start}
                          />
                        </td>
                        <td
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '18px',
                            height: '82px'
                          }}
                        >
                          <InputDefault
                            label=""
                            name="format"
                            placeholder="128x190"
                            value={formatType}
                            onChange={(e: any) => setFormatType(e.target.value)}
                            error={error?.date_start}
                          />
                          <div style={{ cursor: 'pointer' }}>
                            <BiPencil />
                          </div>
                        </td>
                        <td style={{ minWidth: '220px' }}>
                          <SelectDefault
                            label=""
                            name="type"
                            value={''}
                            onChange={(e: any) => console.log('log do select type', e)}
                            placeHolder="Selecione..."
                          >
                            <option value="external_change">Alteração Externa</option>
                            <option value="creation">Criação</option>
                          </SelectDefault>
                        </td>
                        <td style={{ minWidth: '220px' }}>
                          <SelectDefault
                            label=""
                            name="I/D"
                            value={''}
                            onChange={(e: any) => console.log('log do select I/D', e)}
                            placeHolder="Selecione..."
                          >
                            <option value="impressao">Impressão</option>
                            <option value="digital">Digital</option>
                          </SelectDefault>
                        </td>
                        <td style={{ cursor: 'pointer' }}>
                          <FiMenu />
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* <tfoot>
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
                  </tfoot> */}
                </table>
              </ProductsTable>
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
                      onChange={(e: any) => handleOnChangeCheckbox(e, row)}
                      // checked={data.email_alert === 'true' ? true : false}
                      checked={false}
                    />
                    {row.service}
                  </div>
                  <div className="category">{row.category}</div>
                  <div className="quantity">
                    <QuantityCounter />
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
      </ContainerWrapper>
    </>
  );
}
