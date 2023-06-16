/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// components
import HeaderStepsPage from '../../../components/HeaderStepsPage';
import InfoGeral from '../ComponentSteps/InfoGeral';
import InfoDescription from '../ComponentSteps/InfoDescription';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import { SwitchSelector } from '../../../components/CardProductsSelected/styles';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import InfoDeliveries from '../ComponentSteps/InfoDeliverables';
import AddTextButton from '../../../components/Buttons/AddTextButton';
import TaskInputs from '../ComponentSteps/InfoInputs';
import SummaryTasks from '../ComponentSteps/SummaryTasks';
import QuantityInput from '../../../components/Inputs/QuantityInput';

// Styles
import {
  AddProductButton,
  CloseModalButton,
  ContainerWrapper,
  Deliveries,
  EstimatedHoursOfProducst,
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
import { FinishModal, FinishModalButtons, FinishModalMessage } from '../../CreateProject/styles';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useFetch } from '../../../hooks/useFetch';
import useDebouncedCallback from '../../../hooks/useDebounced';

// Types
import { IProduct, IProductBackend, ITaskCreate, ServicesProps } from '../../../types';

// Utils
import { TenantProps } from '../../../utils/models';
import {
  isTimeConsumedMoreThanPercent,
  multiplyTime,
  subtractTime,
  sumTimes
} from '../../../utils/convertTimes';

// Icons
import { IconChecked, IconClose } from '../../../assets/icons';
import { BiCalendar, BiSearchAlt } from 'react-icons/bi';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';
import { useAuth } from '../../../hooks/AuthContext';

interface StateProps {
  [key: string]: any;
}

interface ProjectProductProps {
  categoria: string;
  listavel: string;
  product_id: string;
  produto: string;
  projeto: string;
  quantidade: string;
  select: string;
  tempo: string;
  tipo: string;
}

type HandleOnChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

export default function CreateTasks() {
  const navigate = useNavigate();
  const [createStep, setCreateStep] = useState<number>(1);
  const { addToast } = useToast();
  const { user } = useAuth();

  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [error, setError] = useState<StateProps>({});
  const [errorCategory, setErrorCategory] = useState<any>({});
  const [addDeliveries, setAddDeliveries] = useState<boolean>(false);
  const newDate = new Date();
  const [DTOForm, setDTOForm] = useState<ITaskCreate>({
    title: '',
    tenant_id: '',
    product_id: '',
    flow_id: '',
    description: '',
    creation_description: '',
    creation_date_end: '',
    copywriting_description: '',
    copywriting_date_end: '',
    deadlines: [],
    step: ''
  });
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [productsModal, setProductsModal] = useState<boolean>(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [deliveriesSplit, setDeliveriesSplit] = useState<string>('no-split');
  // Ajustar quando for produtos passar a flag false
  const { data: dataProducts, fetchData: fetchProducts } = useFetch<any[]>(
    `services?search=${search}&flag=false`
  );
  const { data: dataProjects, fetchData: fetchProjects } = useFetch<ServicesProps[]>(
    `project-products/${DTOForm.tenant_id}`
  );
  const { data: dataFlow } = useFetch<any[]>(`/flow?search=`);
  const { data: dataTypes } = useFetch<any[]>(`/task-type`);
  const [productsArray, setProductsArray] = useState<ServicesProps[]>([]);
  const [quantityProductsArray, setQuantityProductsArray] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProductProps>();
  const [selectedSummaryInfos, setSelectedSummaryInfos] = useState<any>({
    client: {
      bucket: '',
      contact_name: '',
      email: '',
      meetings: '',
      name: '',
      reports: '',
      slug: '',
      tenant_id: '',
      utils_information: ''
    },
    flow: {
      flow_id: '',
      name: '',
      steps: '',
      tenant_id: '',
      user_id: ''
    }
  });
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [tasksType, setTasksType] = useState<string>('');
  const splitDeliveries = deliveriesSplit === 'no-split' ? false : true;

  const productsHoursArray = productsArray?.map((row) => {
    return multiplyTime(row?.minutes, row?.quantity);
  });

  const totalProductsHours = sumTimes(productsHoursArray);

  const timeConsumedRange = isTimeConsumedMoreThanPercent(
    totalProductsHours,
    selectedProject ? selectedProject?.tempo : '00:00:00'
  );

  const checkTimeoutHasBeenReached = subtractTime(
    selectedProject ? selectedProject?.tempo : '00:00:00',
    totalProductsHours
  );

  const infoProjects: any = dataProjects?.filter(
    (obj: any) => obj.product_id === DTOForm.product_id
  );

  const handleSwitch = (value: any) => {
    setDeliveriesSplit(value === true ? 'split' : 'no-split');
  };

  const handleTaskDeliveries = (name: string, value: any) => {
    if (name === 'dateStart') {
      setDTOForm((prevState: any) => ({ ...prevState, ['copywriting_date_end']: value }));
    }
    if (name === 'creationDate') {
      setDTOForm((prevState: any) => ({ ...prevState, ['creation_date_end']: value }));
    }
    if (name === 'copywriting_description') {
      setDTOForm((prevState: any) => ({ ...prevState, ['copywriting_description']: value }));
    }
    if (name === 'creation_description') {
      setDTOForm((prevState: any) => ({ ...prevState, ['creation_description']: value }));
    }
  };

  const handleDescription = (value: any) => {
    setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
  };

  const handleOnChangeCheckbox = (product: ServicesProps) => {
    const newProduct = {
      category: product.category,
      description: product.description,
      flag: product.flag,
      minutes: product.minutes,
      service: product.service,
      service_id: product.service_id,
      size: product.size,
      type: product.type,
      quantity: 1
    };
    if (productsArray.filter((obj) => obj.service_id === product.service_id).length > 0) {
      const newArray = productsArray.filter((obj) => obj.service_id !== product.service_id);
      setProductsArray([]);
      setProductsArray(newArray);
    } else if (
      selectedProject?.tempo &&
      product.minutes.slice(0, -3) > selectedProject?.tempo.slice(0, -3)
    ) {
      // console.log('log do tempo do projeto selecionado', selectedProject?.tempo.slice(0, -3));
      // console.log('log do tempo quando adiciono produto', product.minutes.slice(0, -3));
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else if (
      selectedProject?.tempo &&
      selectedProject?.tempo.slice(0, -3) < totalProductsHours.slice(0, -3)
    ) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else {
      setProductsArray((prevState: any) => [...prevState, newProduct]);
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
    const {
      title,
      tenant_id,
      product_id,
      flow_id,
      description,
      copywriting_date_end,
      creation_date_end,
      creation_description,
      copywriting_description
    } = DTOForm;

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

      if (tasksType === 'livre' && createStep === 2) {
        if (DTOForm.copywriting_date_end === '') {
          throw setErrorInput('copywriting_date_end', 'Data de entrega inicial não informada!');
        } else {
          setErrorInput('copywriting_date_end', undefined);
        }

        if (moment(DTOForm.copywriting_date_end).isSameOrBefore(newDate)) {
          throw setErrorInput('copywriting_date_end', 'Data de entrega inicial menor que a atual!');
        } else {
          setErrorInput('copywriting_date_end', undefined);
        }

        if (DTOForm.creation_date_end === '') {
          throw setErrorInput('creation_date_end', 'Data de entrega de criação não informada!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        if (moment(DTOForm.creation_date_end).isSameOrBefore(DTOForm.copywriting_date_end)) {
          throw setErrorInput(
            'creation_date_end',
            'Data de entrega de criação menor que a data de entrega inicial!'
          );
        } else {
          setErrorInput('creation_date_end', undefined);
        }
      }

      if (createStep === 1 && tasksType === 'horas') {
        setProductsModal(true);
      } else if (createStep === 2 && tasksType === 'horas') {
        if (copywriting_date_end === '') {
          throw setErrorInput(
            'copywriting_date_end',
            'Data de Entrega - Pré-requisitos é obrigatória!'
          );
        } else {
          setErrorInput('copywriting_date_end', undefined);
        }

        if (creation_date_end === '') {
          throw setErrorInput('creation_date_end', 'Data de Entrega Criação é obrigatória!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        setErrorCategory({});
        setAddDeliveries(true);
        setTimeout(() => {
          setCreateStep(createStep + 1);
        }, 500);

        // productsArray.map((obj: any) => {
        //   if (obj.reason_change === '' || obj.reason_change === undefined) {
        //     setErrorCategory({
        //       ...errorCategory,
        //       Tipo: 'Tipo não selecionado',
        //       product_id: obj.service_id
        //     });
        //     return addToast({
        //       type: 'warning',
        //       title: 'Atenção',
        //       description: 'Existem produtos sem o "Tipo" selecionado!'
        //     });
        //   } else {
        //     setErrorCategory({});
        //     setAddDeliveries(true);
        //     setTimeout(() => {
        //       setCreateStep(createStep + 1);
        //     }, 500);
        //   }
        // });
      } else if (createStep === 2 && tasksType === 'produto') {
        if (copywriting_date_end === '') {
          throw setErrorInput(
            'copywriting_date_end',
            'Data de Entrega - Pré-requisitos é obrigatória!'
          );
        } else {
          setErrorInput('copywriting_date_end', undefined);
        }

        if (creation_date_end === '') {
          throw setErrorInput('creation_date_end', 'Data de Entrega Criação é obrigatória!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        productsArray.map((obj: any) => {
          if (obj.reason_change === '' || obj.reason_change === undefined) {
            setErrorCategory({
              ...errorCategory,
              Tipo: 'Tipo não selecionado',
              product_id: obj.service_id
            });
            return addToast({
              type: 'warning',
              title: 'Atenção',
              description: 'Existem produtos sem o "Tipo" selecionado!'
            });
          } else {
            setErrorCategory({});
            setAddDeliveries(true);
            setTimeout(() => {
              setCreateStep(createStep + 1);
            }, 500);
          }
        });
      } else if (createStep === 3 && tasksType !== 'livre') {
        if (copywriting_description === '') {
          throw setErrorInput(
            'copywriting_description',
            'Descrição do Input de Pré-requisitos é obrigatória!'
          );
        } else {
          setErrorInput('copywriting_description', undefined);
        }

        if (creation_description === '') {
          throw setErrorInput(
            'creation_description',
            'Descrição do Input de criação é obrigatória!'
          );
        } else {
          setErrorInput('creation_description', undefined);
        }
        setCreateStep(createStep + 1);
      } else if (createStep === 3 && tasksType === 'livre') {
        handleOnSubmit();
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

  const handleProductsDeliveries = (field: string, value: string, productId: any) => {
    if (field === 'description') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === productId) {
            return { ...obj, description: value };
          }
          return obj;
        })
      );
    }

    if (field === 'size') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === productId) {
            return { ...obj, size: value };
          }
          return obj;
        })
      );
    }

    if (field === 'category') {
      setErrorCategory({});
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === productId) {
            return { ...obj, reason_change: value };
          }
          return obj;
        })
      );
    }

    if (field === 'type') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === productId) {
            return { ...obj, type: value };
          }
          return obj;
        })
      );
    }
  };

  const handleCheckQuantity = (quantity: any, product: IProduct) => {
    // console.log('log do product check quantity', quantity, product);
    const totalProductTime = multiplyTime(product.minutes, quantity);

    if (selectedProject?.tempo && totalProductTime > selectedProject?.tempo) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os produtos e quantidades!'
      });
      // handleProductQuantity(1, product);
    } else {
      handleProductQuantity(quantity, product);
    }
  };

  const handleProductQuantity = (value: any, product: any) => {
    console.log('log do product adicionado', value, product);
    if (productsArray.filter((obj) => obj.service_id === product.service_id).length > 0) {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.service_id === product.service_id) {
            return { ...obj, quantity: value };
          }
          return obj;
        })
      );
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

  const handleDeadlines = (newDeadlines: any) => {
    // setProductsArray((prevState: any) => [...prevState, newDeadlines[0].deliveryProducts[0]]);

    let deadline = {
      date_end: DTOForm?.creation_date_end,
      description: DTOForm?.creation_description,
      products: newDeadlines.deliveryProducts
    };

    const deadlineArray = newDeadlines.map((row: any) => {
      return (deadline = {
        date_end: DTOForm?.creation_date_end,
        description: DTOForm?.creation_description,
        products: row.deliveryProducts
      });
    });

    // console.log('log do deadline Array', deadlineArray);
    setDTOForm({ ...DTOForm, ['deadlines']: deadlineArray });
    // setDTOForm((prevDTOForm) => {
    //   const updatedDTOForm = { ...prevDTOForm }; // Create a copy of the original object
    //   updatedDTOForm.deadlines.push(deadline); // Push the new value(s) into the deadlines array
    //   return updatedDTOForm; // Set the updated object as the new state
    // });
  };

  const handleOnSubmit = useCallback(async () => {
    try {
      const {
        title,
        tenant_id,
        product_id,
        flow_id,
        description,
        creation_description,
        creation_date_end,
        copywriting_description,
        copywriting_date_end,
        deadlines,
        step
      } = DTOForm;

      if (tasksType === 'livre') {
        const createNewData = {
          title,
          tenant_id,
          product_id,
          flow_id,
          description,
          creation_description,
          creation_date_end,
          copywriting_date_end,
          copywriting_description,
          step,
          deadlines: [
            {
              date_end: DTOForm?.creation_date_end,
              description: DTOForm?.creation_description,
              products: [
                {
                  service_id: '1',
                  service: 'LIVRE',
                  description: 'DESCRICAO',
                  reason_change: '1',
                  type: 'livre',
                  tenant_id: user.principalTenant,
                  size: '000x000',
                  minutes: '00:00:00',
                  quantity: '1',
                  flag: 'false'
                }
              ]
            }
          ]
        };

        await api.post(`tasks`, createNewData);
      } else if (tasksType === 'produto') {
        const deadline = {
          date_end: DTOForm?.creation_date_end,
          description: DTOForm?.creation_description,
          products: productsArray
        };

        const createNewData = {
          title,
          tenant_id,
          product_id,
          flow_id,
          description,
          creation_description,
          creation_date_end,
          copywriting_date_end,
          copywriting_description,
          deadlines: [deadline],
          step
        };

        await api.post(`tasks`, createNewData);
      } else {
        const createNewData = {
          title,
          tenant_id,
          product_id,
          flow_id,
          description,
          creation_description,
          creation_date_end,
          copywriting_date_end,
          copywriting_description,
          deadlines,
          step
        };

        await api.post(`tasks`, createNewData);
      }

      // if (modal.type === 'Criar novo Projeto/Contrato') {
      // } else {
      //   await api.put(`project/${formData.project_id}`, updateData);
      // }
      setFinishModal(true);
    } catch (e: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message
      });

      // setErros(getValidationErrors(e.response.data.result))
    }
  }, [DTOForm, addToast, productsArray, tasksType, user]);

  const selectedProjectInfos = (e: any) => {
    if (e.target.name === 'product_id') {
      const id = e.target.value;
      const selectedInfos: any = dataProjects?.filter((obj: any) => obj.product_id === id);
      setSelectedProject(selectedInfos[0]);
      handleChangeInput(e);
    } else if (e.target.name === 'tenant_id') {
      const id = e.target.value;
      const selectedClient: any = dataClient?.filter((obj: any) => obj.tenant_id === id);
      setSelectedSummaryInfos((prevState: any) => ({
        ...prevState,
        ['client']: selectedClient[0]
      }));
      handleChangeInput(e);
    } else if (e.target.name === 'flow_id') {
      const id = e.target.value;
      const selectedFlow: any = dataFlow?.filter((obj: any) => obj.flow_id === id);
      setSelectedSummaryInfos((prevState: any) => ({
        ...prevState,
        ['flow']: selectedFlow[0]
      }));
      handleChangeInput(e);
    } else {
      handleChangeInput(e);
    }
  };

  const handleAddProductFromDeliveries = (product: IProductBackend) => {
    if (productsArray.length === 0) {
      setProductsArray([]);
      setProductsArray((prevState: any) => [...prevState, product]);
    }
  };

  useEffect(() => {
    if (DTOForm.product_id !== '') {
      if (infoProjects[0]?.tipo === 'product' && infoProjects[0]?.listavel === 'true') {
        setTasksType('horas');
      } else if (infoProjects[0]?.tipo === 'product' && infoProjects[0]?.listavel !== 'true') {
        setTasksType('produto');
      } else if (infoProjects[0]?.tipo !== 'product') {
        setTasksType('livre');
      }
    }
  }, [DTOForm, infoProjects]);

  const finishCreate = () => {
    setFinishModal(false);
    navigate('/tarefas');
  };

  useEffect(() => {
    console.log('log do tipo de task', tasksType);
  }, [tasksType]);

  useEffect(() => {
    console.log('log do products Array', productsArray);
  }, [productsArray]);

  // useEffect(() => {
  //   console.log('Log do DTO', DTOForm);
  // }, [DTOForm]);

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
                handleInputChange={selectedProjectInfos}
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
                {tasksType === 'horas' && (
                  <SwitchSelector>
                    <InputSwitchDefault
                      onChange={(e) => {
                        handleSwitch(e.target.checked);
                      }}
                      isChecked={splitDeliveries}
                    />
                    <span>Dividir entregas</span>
                  </SwitchSelector>
                )}
                <Deliveries>
                  <InputDefault
                    label="Entrega - Pré-Requisitos"
                    placeholder="00/00/0000"
                    name="dateStart"
                    type="date"
                    icon={BiCalendar}
                    onChange={(e) => handleTaskDeliveries('dateStart', e.target.value)}
                    value={DTOForm.copywriting_date_end}
                    error={error?.copywriting_date_end}
                  />

                  <InputDefault
                    label="Entrega Criação"
                    placeholder="00/00/0000"
                    name="creationDate"
                    type="date"
                    icon={BiCalendar}
                    onChange={(e) => handleTaskDeliveries('creationDate', e.target.value)}
                    value={DTOForm.creation_date_end}
                    error={error?.creation_date_end}
                  />
                </Deliveries>
              </SplitDeliveries>
              {tasksType !== 'livre' && (
                <>
                  <InfoDeliveries
                    data={productsArray}
                    dataTypes={dataTypes}
                    handleProducts={handleProductsDeliveries}
                    error={error}
                    deliveriesSplited={splitDeliveries}
                    deliveryType={tasksType}
                    totalProjectTime={selectedProject?.tempo}
                    projectInfo={selectedProject}
                    errorCategory={errorCategory}
                    addDeliveries={addDeliveries}
                    passDeliveries={(value: any) => handleDeadlines(value)}
                    passProductProps={handleAddProductFromDeliveries}
                  />
                  {!splitDeliveries && tasksType === 'horas' && (
                    <AddTextButton title="Adicionar produto" click={() => setProductsModal(true)} />
                  )}
                </>
              )}
              {tasksType === 'livre' && (
                <div style={{ marginTop: '40px' }}>
                  <FormTitle>Inputs</FormTitle>
                  <TaskInputs
                    valueFirst={DTOForm.copywriting_description}
                    valueSecond={DTOForm.creation_description}
                    handleOnDescription={(value) =>
                      handleTaskDeliveries('copywriting_description', value)
                    }
                    handleOnInput={(value) => handleTaskDeliveries('creation_description', value)}
                    mentions={[]}
                    inputsError={error}
                  />
                </div>
              )}
            </>
          )}
          {createStep === 3 && (
            <>
              {tasksType !== 'livre' && (
                <>
                  <FormTitle>Inputs</FormTitle>
                  <TaskInputs
                    valueFirst={DTOForm.copywriting_description}
                    valueSecond={DTOForm.creation_description}
                    handleOnDescription={(value) =>
                      handleTaskDeliveries('copywriting_description', value)
                    }
                    handleOnInput={(value) => handleTaskDeliveries('creation_description', value)}
                    mentions={[]}
                    inputsError={error}
                  />
                </>
              )}
              {tasksType === 'livre' && (
                <>
                  <FormTitle>Resumo da tarefa</FormTitle>
                  <SummaryTasks
                    selectedProducts={productsArray}
                    createTasks={handleOnSubmit}
                    editTasks={() => setCreateStep(2)}
                    taskSummary={DTOForm}
                    projectInfos={selectedProject}
                    summaryExtrainfos={selectedSummaryInfos}
                    taskType={tasksType}
                  />
                </>
              )}
            </>
          )}
          {createStep === 4 && (
            <>
              <FormTitle>Resumo da tarefa</FormTitle>
              {tasksType === 'horas' && (
                <SummaryTasks
                  selectedProducts={DTOForm.deadlines}
                  createTasks={handleOnSubmit}
                  editTasks={() => setCreateStep(1)}
                  taskSummary={DTOForm}
                  projectInfos={selectedProject}
                  summaryExtrainfos={selectedSummaryInfos}
                  taskType={tasksType}
                />
              )}
              {tasksType !== 'horas' && (
                <SummaryTasks
                  selectedProducts={productsArray}
                  createTasks={handleOnSubmit}
                  editTasks={() => setCreateStep(2)}
                  taskSummary={DTOForm}
                  projectInfos={selectedProject}
                  summaryExtrainfos={selectedSummaryInfos}
                  taskType={tasksType}
                />
              )}
            </>
          )}
        </FormWrapper>

        {createStep !== 4 && tasksType !== 'livre' && (
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

        {createStep !== 3 && tasksType === 'livre' && (
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

        {/* Modal product list */}
        <ModalDefault
          isOpen={productsModal}
          onOpenChange={() => setProductsModal(false)}
          maxWidth="848px"
        >
          <ProductsModalWrapper>
            <ProductsModalTop>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <ProductModalTitle>Lista de produtos</ProductModalTitle>
                <EstimatedHoursOfProducst>
                  <div className="info-title">Horas disponíveis no contrato:</div>
                  <div
                    className={
                      timeConsumedRange === 'more than 30%'
                        ? 'info-hours more-30'
                        : timeConsumedRange === 'more than 50%'
                        ? 'info-hours more-50'
                        : 'info-hours'
                    }
                  >
                    {checkTimeoutHasBeenReached > '00:00:00'
                      ? checkTimeoutHasBeenReached
                      : 'Tempo limite atingido, verifique as quantidades'}
                  </div>
                </EstimatedHoursOfProducst>
              </div>
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
                <div className="list-title">Horas estimadas</div>
                <div className="list-title center">Quantidade</div>
              </ProductListHeader>

              {dataProducts?.map((row: any, index) => (
                <Product key={index}>
                  <div className="product">
                    <CheckboxDefault
                      label=""
                      name={row.service_id}
                      onChange={() => handleOnChangeCheckbox(row)}
                      checked={
                        productsArray.filter((obj) => obj.service_id === row.service_id).length > 0
                          ? true
                          : false
                      }
                    />
                    {row.service}
                  </div>
                  <div className="category">{row.category}</div>
                  <div className="category">{row.minutes}</div>
                  <div className="quantity">
                    <QuantityInput
                      receiveQuantity={
                        productsArray?.filter((obj) => obj.service_id === row.service_id).length > 0
                          ? row.quantity
                            ? row.quantity
                            : 1
                          : 0
                      }
                      infosReceived={row}
                      handleQuantity={(value: any) => handleCheckQuantity(value, row)}
                      disabledInput={
                        productsArray?.filter((obj) => obj.service_id === row.service_id).length > 0
                          ? false
                          : true
                      }
                    />
                    {/* <QuantityCounter
                      handleQuantity={handleProductQuantity}
                      rowQuantity={row}
                      clearQuantity={handleClearQuantity}
                      receiveQuantity={
                        productsArray?.filter((obj) => obj.service_id === row.service_id).length > 0
                          ? 1
                          : 0
                      }
                    /> */}
                  </div>
                </Product>
              ))}
            </ProductListWrapper>

            <AddProductButton>
              {createStep === 1 && tasksType === 'horas' && (
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
              )}
              {createStep > 1 && (
                <ButtonDefault
                  typeButton="primary"
                  onClick={() => {
                    console.log('add product');
                    setProductsModal(false);
                  }}
                >
                  Adicionar Produto
                </ButtonDefault>
              )}
            </AddProductButton>
          </ProductsModalWrapper>
        </ModalDefault>

        {/* Modal Finish Create Task */}
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
              <ButtonDefault typeButton="primary" onClick={finishCreate}>
                Confirmar
              </ButtonDefault>
            </FinishModalButtons>
          </FinishModal>
        </ModalDefault>
      </ContainerWrapper>
    </>
  );
}
