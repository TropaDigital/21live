/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
import ScheduleUser from '../../../components/ScheduleUser';
import InfoFiles from '../ComponentSteps/InfoFiles';
import { ProductsTable } from '../../../components/Ui/ProductTable/styles';
import { ModalButtons } from '../ViewTask/styles';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import ModalLoader from '../../../components/Ui/ModalLoader';

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
  ProductGrid,
  ProductGridHeader,
  ProductListHeader,
  ProductListWrapper,
  ProductModalTitle,
  ProductsModalTop,
  ProductsModalWrapper,
  SearchProductsModal,
  SplitDeliveries,
  UsersWrapper
} from './styles';
import {
  FinishModal,
  FinishModalButtons,
  FinishModalMessage
} from '../../Projects/CreateProject/styles';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useFetch } from '../../../hooks/useFetch';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useAuth } from '../../../hooks/AuthContext';
import { useParamsHook } from '../../../hooks/useParams';

// Types
import {
  DeliveryProps,
  IProduct,
  IProductBackend,
  ITaskCreate,
  OrganizationsProps,
  ServicesProps,
  UploadedFilesProps
} from '../../../types';

// Utils
import { TenantProps, UsersNoSchedule } from '../../../utils/models';
import {
  isTimeConsumedMoreThanPercent,
  multiplyTime,
  subtractTime,
  sumTimes
} from '../../../utils/convertTimes';

// Icons
import { IconChecked, IconClose } from '../../../assets/icons';
import { BiCalendar, BiSearchAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';

interface StateProps {
  [key: string]: any;
}

interface ProjectProductProps {
  categoria: string;
  listavel: string;
  project_product_id: string;
  produto: string;
  projeto: string;
  quantidade_inicial: string;
  quantidade_restante: string;
  select: string;
  tempo_inicial: string;
  tempo_restante: string;
  tipo: string;
}

interface DeliveryUpdate {
  delivery_id: number | string;
  description: string;
  date_end: string;
  produtos: [];
  order: string;
}

interface ModalDeliveryProps {
  isOpen: boolean;
  title: string;
  indexDelivery: number | any;
}

interface StepCards {
  card_id: string;
  flow_id: string;
  step: string;
  name: string;
  necessary_upload: string;
  necessary_responsible: string;
  email_alert: string;
  tenant_approve: string;
  manager_approve: string;
  function_id: string;
  final_card: string;
  ticket_status: string;
  ticket_status_id: string;
  tenant_id: string;
  approver: string;
}

interface QuantityInfos {
  minValue: number;
  maxValue: number;
}

// interface ITicketProps {
//   ticket_id: string;
//   tenant_id: string;
//   ticket_cat_id: string;
//   ticket_status_id: string;
//   user_id: string;
//   organization_id: string;
//   media_id: string;
//   title: string;
//   width: string;
//   height: string;
//   info: string;
//   target: string;
//   obs: string;
//   file_format: string;
//   workminutes: string;
//   deadline: string;
//   created: string;
//   updated: string;
//   finished: string;
//   tenant_name: string;
//   user_name: string;
//   status: string;
//   organization_name: string;
//   media_name: string;
//   measure: string;
//   value: string;
//   media_cat_id: string;
//   midia_cat_title: string;
//   files: [];
//   interactions: [
//     {
//       ticket_interaction_id: string;
//       ticket_id: string;
//       reply_id: string;
//       user_id: string;
//       message: string;
//       annex: string;
//       annex_title: string;
//       status: string;
//       access: string;
//       created: string;
//       updated: string;
//       user_name: string;
//       avatar: string;
//     }
//   ];
//   fields: [];
// }

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
  const location = useLocation();
  const formRef = useRef<any>();
  const { parameters, getParams } = useParamsHook();

  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [error, setError] = useState<StateProps>({});
  const [errorCategory, setErrorCategory] = useState<any[]>([]);
  const [errorDeliveryDate, setErrorDeliveryDate] = useState<any[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  // const [addDeliveries, setAddDeliveries] = useState<boolean>(false);
  // const newDate = new Date();
  const [DTOForm, setDTOForm] = useState<ITaskCreate>({
    title: '',
    tenant_id: '',
    organization_id: '',
    project_product_id: '',
    flow_id: '',
    ticket_id: '',
    requester_id: '',
    description: '',
    creation_description: '',
    creation_date_end: '',
    copywriting_description: '',
    deadlines: [],
    files: [],
    user_id: '',
    start_job: '',
    end_job: '',
    step: '',
    gen_ticket: ''
  });
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [productsModal, setProductsModal] = useState<boolean>(false);
  const [productsDeliveriesModal, setProductsDeliveriesModal] = useState<ModalDeliveryProps>({
    isOpen: false,
    title: '',
    indexDelivery: ''
  });
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [deliveriesSplit, setDeliveriesSplit] = useState<string>('no-split');
  const { data: dataProducts, fetchData: fetchProducts } = useFetch<any[]>(
    `services?search=${search}&flag=false`
  );
  const [dataProjects, setDataProjects] = useState<ServicesProps[]>([]);

  async function getProjects(tenantId: string) {
    try {
      const response = await api.get(`project-products/${tenantId}`);

      if (response.data.status === 'success') {
        setDataProjects(response.data.result);
      }
    } catch (error: any) {
      console.log('log error get projects', error);
    }
  }

  const { data: organizationProjects } = useFetch<ServicesProps[]>(
    `project-products/${user.principalTenant}?organization_id=${DTOForm.organization_id}`
  );
  const { data: dataFlow, fetchData: fetchFlow } = useFetch<any[]>(`/flow?perPage=1000`);
  const { data: dataTypes } = useFetch<any[]>(`/task-type`);
  const { data: dataOrganizations } = useFetch<OrganizationsProps[]>('organization');
  const [productsArray, setProductsArray] = useState<ServicesProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProductProps>({
    categoria: '',
    listavel: '',
    project_product_id: '',
    produto: '',
    projeto: '',
    quantidade_inicial: '',
    quantidade_restante: '',
    select: '',
    tempo_inicial: '',
    tempo_restante: '',
    tipo: ''
  });
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
    },
    organization: {
      organization_id: '',
      tenant_id: '',
      country_id: '',
      city_id: '',
      name: '',
      address: '',
      email: '',
      cnpj: '',
      phone: '',
      whatsapp: '',
      facebook: '',
      fb_page_token: '',
      instagram: '',
      website: '',
      social_footer: '',
      workhours: '',
      hourlimit_text: '',
      logo: '',
      logo_b: '',
      logo_w: ''
    }
  });
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [tasksType, setTasksType] = useState<string>('');
  const [taskEdit, setTaskEdit] = useState<boolean>(false);
  const splitDeliveries = deliveriesSplit === 'no-split' ? false : true;
  const [selectUserModal, setSelectUserModal] = useState<boolean>(false);
  const [estimatedTime, setEstimatedTime] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [ticketAsk, setTicketAsk] = useState<string | null>('');

  const DeliveryDefault: DeliveryProps = {
    deliveryId: 1,
    deliveryDescription: '',
    creation_date_end: '',
    copywriting_date_end: '',
    deliveryTitle: '',
    deliveryProducts: productsArray,
    showInfo: false
  };
  const [DTODelivery, setDTODelivery] = useState<any[]>([DeliveryDefault]);
  const [submitState, setSubmitState] = useState<Date>(new Date());
  const [modalWithoutSchedule, setModalWithoutSchedule] = useState<boolean>(false);
  const [usersWithoutSchedule, setUsersWithoutSchedule] = useState<UsersNoSchedule[]>([]);
  const [selectedInitialUser, setSelectedInitalUser] = useState<UsersNoSchedule>();
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [displayQuantity, setDisplayQuantity] = useState<boolean>(false);
  const [quantityProductInfos, setQuantityProductInfos] = useState<QuantityInfos>({
    maxValue: 0,
    minValue: 1
  });
  const [singleProductQuantity, setSingleProductQuantity] = useState<number>(1);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [pathSelected, setPathSelected] = useState<string>('');

  const numbers = Array.from(
    { length: quantityProductInfos?.maxValue - quantityProductInfos?.minValue + 1 },
    (_, index) => quantityProductInfos?.minValue + index
  );

  async function getSingleProduct(projectId: string) {
    try {
      const response = await api.get(
        `/project-products-especific/${projectId}?quantity=${singleProductQuantity}`
      );
      const transformedData = transformObjects(response.data.result);

      setProductsArray(transformedData);

      setQuantityProductInfos({
        maxValue: response.data.result[0].quantity,
        minValue: 1
      });
    } catch (error: any) {
      console.log('log error get single product', error);
    }
  }

  function transformObjects(inputArray: any[]) {
    const keysToKeep = [
      'category',
      'description',
      'flag',
      'minutes',
      'minutes_creation',
      'minutes_essay',
      'quantity',
      'service',
      'job_service_id',
      'size',
      'type'
    ];

    return inputArray.map((inputObject: any) => {
      const transformedObject: any = {};
      keysToKeep.forEach((key) => {
        if (key === 'quantity') {
          transformedObject[key] = 1;
        } else if (key in inputObject) {
          transformedObject[key] = inputObject[key];
        }
      });
      return transformedObject;
    });
  }

  const addDelivery = () => {
    const newDelivery: DeliveryProps = {
      deliveryId: DTODelivery.length + 1,
      deliveryDescription: '',
      creation_date_end: '',
      copywriting_date_end: '',
      deliveryTitle: '',
      deliveryProducts: [],
      showInfo: false
    };
    DTODelivery.push(newDelivery);
    setDTODelivery([...DTODelivery]);
  };

  useEffect(() => {
    getParams();
  }, []);

  const selectedInfos: any[] = dataProjects?.filter(
    (obj: any) => obj.project_product_id === location?.state?.project_product_id
  );

  const allEstimatedTime = {
    time_essay: productsArray[0]?.minutes_essay,
    time_creation: productsArray[0]?.minutes_creation,
    total_time: estimatedTime
  };

  useEffect(() => {
    if (location.state !== null && location.state.ticket_id) {
      console.log('log do locationState =>', location.state);
      getProjects(location.state.tenant_id);

      const { interactions, fields, files, ...otherFields } = location.state;

      const filteredEntries = Object.entries(otherFields).filter(([key, value]) => {
        return value !== null && value !== undefined && value !== '';
      });

      const descriptionObject = filteredEntries
        .map(([key, value]) => `${key}: ${value}`)
        .join('<br/><br/>');

      setDTOForm((prevState: any) => ({
        ...prevState,
        ['tenant_id']: location.state.tenant_id
      }));

      const selectedClient: any = dataClient?.filter(
        (obj: any) => obj.tenant_id === location.state.tenant_id
      );

      if (selectedClient) {
        setSelectedSummaryInfos((prevState: any) => ({
          ...prevState,
          ['client']: selectedClient[0]
        }));
      }

      setDTOForm((prevState: any) => ({
        ...prevState,
        ['ticket_id']: location.state.ticket_id
      }));
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['title']: location.state.title
      }));
      // setDTOForm((prevState: any) => ({
      //   ...prevState,
      //   ['description']: descriptionObject
      // }));
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['requester_id']: location.state.userId
      }));
    }

    if (location.state !== null && location.state.task_id) {
      getProjects(location.state.tenant_id);
      setProductsArray([]);
      setDTOForm(location.state);
      setProductsArray(location.state.deliverys[0]?.products);
      setDTODelivery(location.state.deliverys);
      if (dataProjects && selectedInfos.length > 0) {
        setSelectedProject(selectedInfos[0]);
      }
      if (location.state.deliverys.length > 1) {
        setDeliveriesSplit('split');
      }
    }

    if (location.state !== null && location.state?.copy) {
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['title']: location.state.title
      }));

      setDTOForm((prevState: any) => ({
        ...prevState,
        ['description']: location.state.description
      }));

      setDTOForm((prevState: any) => ({
        ...prevState,
        ['copywriting_description']: location.state.copywriting_description
      }));

      setDTOForm((prevState: any) => ({
        ...prevState,
        ['creation_description']: location.state.creation_description
      }));

      // if (location.state.typeTask === 'Hora') {
      //   setTasksType('horas');
      // } else if (location.state.typeTask === 'Produto') {
      //   setTasksType('produto');
      // } else {
      //   setTasksType('livre');
      // }
    }

    const ticketInfo = localStorage.getItem('@live:ticket');
    setTicketAsk(ticketInfo);
  }, [location, dataClient]);

  useEffect(() => {
    if (DTOForm.tenant_id && createStep === 1) {
      getProjects(DTOForm.tenant_id);
    }
  }, [DTOForm]);

  const handleDeliveryTitle = (value: any, id: any) => {
    if (location.state !== null) {
      setDTODelivery((current: any) =>
        current.map((obj: { delivery_id: any }) => {
          if (obj.delivery_id === id) {
            return { ...obj, deliveryTitle: value };
          }
          return obj;
        })
      );
    }
    setDTODelivery((current: any) =>
      current.map((obj: { deliveryId: any }) => {
        if (obj.deliveryId === id) {
          return { ...obj, deliveryTitle: value };
        }
        return obj;
      })
    );
  };

  const handleUpdateDeliveryDate = (e: any, id: any) => {
    const { name, value } = e.target;
    if (location.state !== null) {
      setDTODelivery((current: any) =>
        current.map((obj: { delivery_id: any }) => {
          if (obj.delivery_id === id) {
            return { ...obj, [name]: value };
          }
          return obj;
        })
      );
    }
    setDTODelivery((current: any) =>
      current.map((obj: { deliveryId: any }) => {
        if (obj.deliveryId === id) {
          return { ...obj, [name]: value };
        }
        return obj;
      })
    );
  };

  const handleDigitalPrinted = (
    indexDelivery: any,
    indexProduct: any,
    idProduct: any,
    value: any
  ) => {
    if (location.state !== null) {
      const currentProducts = DTODelivery[indexDelivery].produtos;
      const productToUpdate = currentProducts[indexProduct];
      const updatedProduct = {
        ...productToUpdate,
        type: value
      };
      currentProducts[indexProduct] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryUpdate) => {
          if (obj.produtos[indexProduct] === indexProduct) {
            return { produtos: currentProducts };
          }
          return obj;
        })
      );
    } else {
      const currentProducts = DTODelivery[indexDelivery].deliveryProducts;
      const productToUpdate = currentProducts[indexProduct];
      const updatedProduct = {
        ...productToUpdate,
        type: value
      };
      currentProducts[indexProduct] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryProps) => {
          if (obj.deliveryProducts[indexProduct] === indexProduct) {
            return { deliveryProducts: currentProducts };
          }
          return obj;
        })
      );
    }
  };

  const handleTypeProduct = (indexDelivery: any, indexProduct: any, idProduct: any, value: any) => {
    // console.log('log do handleType =>', indexDelivery, indexProduct, idProduct, value);
    if (location.state !== null) {
      const currentProducts = DTODelivery[indexDelivery].produtos;
      const productToUpdate = currentProducts[indexProduct];
      const updatedProduct = {
        ...productToUpdate,
        reason_change: value
      };
      currentProducts[indexProduct] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryUpdate) => {
          if (obj.produtos[indexProduct] === indexProduct) {
            return { produtos: currentProducts };
          }
          return obj;
        })
      );
    } else {
      const currentProducts = DTODelivery[indexDelivery].deliveryProducts;
      const productToUpdate = currentProducts[indexProduct];
      const updatedProduct = {
        ...productToUpdate,
        reason_change: value
      };
      currentProducts[indexProduct] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryProps) => {
          if (obj.deliveryProducts[indexProduct] === indexProduct) {
            return { deliveryProducts: currentProducts };
          }
          return obj;
        })
      );
    }
  };

  const handleDescriptionProduct = (
    indexDelivery: any,
    indexProduct: any,
    idProduct: any,
    value: any
  ) => {
    if (location.state !== null) {
      const currentProducts = DTODelivery[indexDelivery].produtos;
      const productToUpdate = currentProducts[indexProduct];
      const updatedProduct = {
        ...productToUpdate,
        description: value
      };
      currentProducts[indexProduct] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryUpdate) => {
          if (obj.produtos[indexProduct] === indexProduct) {
            return { produtos: currentProducts };
          }
          return obj;
        })
      );
    } else {
      const currentProducts = DTODelivery[indexDelivery].deliveryProducts;
      const productToUpdate = currentProducts[indexProduct];
      const updatedProduct = {
        ...productToUpdate,
        description: value
      };
      currentProducts[indexProduct] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryProps) => {
          if (obj.deliveryProducts[indexProduct] === indexProduct) {
            return { deliveryProducts: currentProducts };
          }
          return obj;
        })
      );
    }
  };

  const handleFormatProduct = (
    indexDelivery: any,
    indexProduct: any,
    idProduct: any,
    value: any
  ) => {
    if (location.state !== null) {
      const currentProducts = DTODelivery[indexDelivery].produtos;
      const productToUpdate = currentProducts[indexProduct];
      const updatedProduct = {
        ...productToUpdate,
        size: value
      };
      currentProducts[indexProduct] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryUpdate) => {
          if (obj.produtos[indexProduct] === indexProduct) {
            return { produtos: currentProducts };
          }
          return obj;
        })
      );
    } else {
      const currentProducts = DTODelivery[indexDelivery].deliveryProducts;
      const productToUpdate = currentProducts[indexProduct];
      const updatedProduct = {
        ...productToUpdate,
        size: value
      };
      currentProducts[indexProduct] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryProps) => {
          if (obj.deliveryProducts[indexProduct] === indexProduct) {
            return { deliveryProducts: currentProducts };
          }
          return obj;
        })
      );
    }
  };

  const productsHoursArray = productsArray?.map((row) => {
    return row?.minutes;
  });

  const totalProductsHours = sumTimes(productsHoursArray);

  const timeConsumedRange = isTimeConsumedMoreThanPercent(
    totalProductsHours,
    selectedProject?.tempo_restante ? selectedProject?.tempo_restante : '00:00:00'
  );

  const checkTimeoutHasBeenReached = subtractTime(
    selectedProject?.tempo_restante ? selectedProject?.tempo_restante : '00:00:00',
    totalProductsHours
  );

  const deliveryProductsHoursArray = DTODelivery?.map((row: DeliveryProps) => {
    return sumTimes(
      row?.deliveryProducts?.map((product: any) => {
        return multiplyTime(product?.minutes, product?.quantity);
      })
    );
  });

  const totalDeliveryProductsHours = sumTimes(deliveryProductsHoursArray);

  const checkDeliveryTimeHasBeenReached = subtractTime(
    checkTimeoutHasBeenReached,
    totalDeliveryProductsHours
  );

  const timeDeliveryConsumedRange = isTimeConsumedMoreThanPercent(
    totalDeliveryProductsHours,
    checkTimeoutHasBeenReached
  );

  const infoProjects: any = dataProjects?.filter(
    (obj: any) => obj.project_product_id === DTOForm.project_product_id
  );

  const infoOrganizationsProjects: any = organizationProjects?.filter(
    (obj: any) => obj.project_product_id === DTOForm.project_product_id
  );

  const handleSwitch = (value: any) => {
    setDeliveriesSplit(value === true ? 'split' : 'no-split');
  };

  const handleTaskDeliveries = (name: string, value: any) => {
    // if (name === 'dateStart') {
    //   setDTOForm((prevState: any) => ({ ...prevState, ['copywriting_date_end']: value }));
    // }
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
    // console.log('log do product', product);
    const newProduct = {
      category: product.category,
      description: product.description,
      flag: product.flag,
      minutes: product.minutes,
      minutes_creation: product.minutes_creation,
      minutes_essay: product.minutes_essay,
      service: product.service,
      job_service_id: product.job_service_id,
      size: product.size,
      type: product.type,
      quantity: 1
    };
    if (productsArray.filter((obj) => obj.job_service_id === product.job_service_id).length > 0) {
      const newArray = productsArray.filter((obj) => obj.job_service_id !== product.job_service_id);
      setProductsArray([]);
      setProductsArray(newArray);
    } else if (
      selectedProject?.tempo_restante &&
      product.minutes > selectedProject?.tempo_restante
    ) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else if (
      selectedProject?.tempo_restante &&
      selectedProject?.tempo_restante < totalProductsHours
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

  const handleOnChangeCheckboxDeliveries = (product: any, idDelivery: any) => {
    // console.log('log do product and ID', product, idDelivery, DTODelivery);
    const deliveryIdCorrected = idDelivery - 1;
    const newProduct = {
      category: product.category,
      description: product.description,
      flag: product.flag,
      minutes: product.minutes,
      minutes_creation: product.minutes_creation,
      minutes_essay: product.minutes_essay,
      service: product.service,
      job_service_id: product.job_service_id,
      size: product.size,
      type: product.type,
      quantity: 1
    };
    if (
      DTODelivery[deliveryIdCorrected]?.deliveryProducts.filter(
        (obj: any) => obj.job_service_id === product.job_service_id
      ).length > 0
    ) {
      const newArray = DTODelivery[deliveryIdCorrected]?.deliveryProducts.filter(
        (obj: any) => obj.job_service_id !== product.job_service_id
      );
      setDTODelivery((current: any) =>
        current.map((obj: any) => {
          if (obj.deliveryId === idDelivery) {
            return { ...obj, deliveryProducts: [] };
          }
          return obj;
        })
      );
      setDTODelivery((current: any) =>
        current.map((obj: any) => {
          if (obj.deliveryId === idDelivery) {
            return { ...obj, deliveryProducts: newArray };
          }
          return obj;
        })
      );
      // console.log('log filter product', product, newArray);
    } else if (selectedProject && selectedProject.tempo_restante < product.minutes) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else if (selectedProject && selectedProject.tempo_restante < totalProductsHours) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else {
      // console.log('log do product with the id finded', newProduct);
      setDTODelivery((current: any) =>
        current.map((obj: any) => {
          if (obj.deliveryId === idDelivery) {
            return {
              ...obj,
              deliveryProducts: [...obj.deliveryProducts, newProduct]
            };
          }
          return obj;
        })
      );
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
      organization_id,
      project_product_id,
      flow_id,
      description,
      creation_date_end,
      creation_description,
      copywriting_description,
      requester_id,
      gen_ticket
    } = DTOForm;

    try {
      if (title === '') {
        throw setErrorInput('title', 'Titulo é obrigatório!');
      } else {
        setErrorInput('title', undefined);
      }

      if (user?.organizations?.length > 0) {
        if (organization_id === '') {
          throw setErrorInput('organization_id', 'Cliente é obrigatório!');
        } else {
          setErrorInput('organization_id', undefined);
        }
      } else {
        if (tenant_id === '') {
          throw setErrorInput('tenant_id', 'Cliente é obrigatório!');
        } else {
          setErrorInput('tenant_id', undefined);
        }

        // if (flow_id === '') {
        //   throw setErrorInput('flow_id', 'Fluxo é obrigatório!');
        // } else {
        //   setErrorInput('flow_id', undefined);
        // }
      }

      if (flow_id === '') {
        throw setErrorInput('flow_id', 'Fluxo é obrigatório!');
      } else {
        setErrorInput('flow_id', undefined);
      }

      if (project_product_id === '') {
        throw setErrorInput('project_product_id', 'Projeto / Contrato é obrigatório!');
      } else {
        setErrorInput('project_product_id', undefined);
      }

      if (gen_ticket === 'true' && requester_id === '') {
        throw setErrorInput('requester_id', 'Solicitante é obrigatório!');
      } else {
        setErrorInput('requester_id', undefined);
      }

      // if (user_id === '') {
      //   throw setErrorInput('user_id', 'Fluxo - Responsável é obrigatório!');
      // } else {
      //   setErrorInput('user_id', undefined);
      // }

      // if (description === '') {
      //   throw setErrorInput('description', 'Contexto geral é obrigatório!');
      // } else {
      //   setErrorInput('description', undefined);
      // }

      if (tasksType === 'livre' && createStep === 2) {
        if (DTOForm.creation_date_end === '') {
          throw setErrorInput('creation_date_end', 'Data de entrega não informada!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        if (moment(DTOForm.creation_date_end).isBefore('2020-01-01')) {
          throw setErrorInput('creation_date_end', 'Data anterior a 2020 não permitida!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        // if (moment(DTOForm.copywriting_date_end).isSameOrBefore(newDate)) {
        //   throw setErrorInput('copywriting_date_end', 'Data de entrega é menor que a atual!');
        // } else {
        //   setErrorInput('copywriting_date_end', undefined);
        // }

        if (DTOForm.creation_date_end === '') {
          throw setErrorInput('creation_date_end', 'Data de entrega de atividade não informada!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        if (moment(DTOForm.creation_date_end).isSameOrBefore(DTOForm.copywriting_date_end)) {
          throw setErrorInput(
            'creation_date_end',
            'Data de entrega de atividade menor que a data de entrega inicial!'
          );
        } else {
          setErrorInput('creation_date_end', undefined);
        }
      }

      if (createStep === 1 && tasksType === 'horas' && !taskEdit) {
        setProductsModal(true);
      } else if (createStep === 1 && tasksType === 'produto' && !taskEdit) {
        setDisplayQuantity(true);
      } else if (createStep === 2 && tasksType === 'horas') {
        if (splitDeliveries && DTODelivery.length <= 1) {
          throw new Error('Entregas dívidas não podem ter somente uma entrega');
        }
        if (splitDeliveries && location.state !== null) {
          DTODelivery.map((current: DeliveryUpdate) => {
            current.produtos.map((obj: any, index: number) => {
              if (obj.reason_change === '' || obj.reason_change === undefined) {
                setErrorCategory((errorCategory: any) => [...errorCategory, index]);
                throw new Error('Existem produtos sem o "Tipo" selecionado!');
              } else if (obj.reason_change !== '' && obj.reason_change !== undefined) {
                setErrorCategory((prevState) => prevState.filter((product) => product !== index));
                if (errorCategory.length === 0) {
                  // setAddDeliveries(true);
                  setTimeout(() => {
                    setCreateStep(createStep + 1);
                  }, 150);
                }
              }
            });
          });
        }

        if (splitDeliveries && location.state === null) {
          DTODelivery.map((current: DeliveryProps) => {
            if (current.deliveryProducts.length === 0) {
              throw new Error(
                'Existem entregas sem produto! Exclua a entrega ou adicione um produto para continuar'
              );
            }
          });

          // DTODelivery.map((current: DeliveryProps) => {
          //   if (current.copywriting_date_end === '' || current.copywriting_date_end === undefined) {
          //     setErrorDeliveryDate((errorDeliveryDate: any) => [
          //       ...errorDeliveryDate,
          //       {
          //         id: current.deliveryId,
          //         typeError: 'copywriting',
          //         error: 'Data da entrega não atribuida!'
          //       }
          //     ]);
          //     throw new Error('Data da entrega não atribuida!');
          //   } else {
          //     setErrorDeliveryDate((prevState) =>
          //       prevState.filter((delivery) => delivery.id !== current.deliveryId)
          //     );
          //   }
          // });

          DTODelivery.map((current: DeliveryProps) => {
            if (current.creation_date_end === '' || current.creation_date_end === undefined) {
              setErrorDeliveryDate((errorDeliveryDate: any) => [
                ...errorDeliveryDate,
                {
                  id: current.deliveryId,
                  typeError: 'creation',
                  error: 'Data da entrega não atribuida!'
                }
              ]);
              throw new Error('Data da entrega não atribuida!');
            } else if (moment(current.creation_date_end).isBefore('2020-01-01')) {
              setErrorDeliveryDate((errorDeliveryDate: any) => [
                ...errorDeliveryDate,
                {
                  id: current.deliveryId,
                  typeError: 'creation',
                  error: 'Data de atividade não pode ser anterior a 2020!'
                }
              ]);
              throw new Error('Data de atividade não pode ser anterior a 2020!');
            } else {
              setErrorDeliveryDate((prevState) =>
                prevState.filter((delivery) => delivery.id !== current.deliveryId)
              );
            }
          });

          DTODelivery.map((current: DeliveryProps) => {
            current.deliveryProducts.map((obj: any, index: number) => {
              if (obj.reason_change === '' || obj.reason_change === undefined) {
                setErrorCategory((errorCategory: any) => [...errorCategory, index]);
                throw new Error('Existem produtos sem o "Tipo" selecionado!');
              } else if (obj.reason_change !== '' && obj.reason_change !== undefined) {
                setErrorCategory((prevState) => prevState.filter((product) => product !== index));
              }
            });
          });

          setCreateStep(createStep + 1);

          // DTODelivery.map((obj: DeliveryProps) => {
          //   if (obj.copywriting_date_end === '' || obj.copywriting_date_end === undefined) {
          //     setErrorDeliveryDate((errorDeliveryDate: any) => [
          //       ...errorDeliveryDate,
          //       {
          //         id: obj.deliveryId,
          //         error: 'Data da entrega não atribuida!'
          //       }
          //     ]);
          //     throw new Error('Data da entrega não atribuida!');
          //   } else if (obj.copywriting_date_end !== '' && obj.copywriting_date_end !== undefined) {
          //     setErrorDeliveryDate((prevState) =>
          //       prevState.filter((delivery) => delivery.id !== obj.deliveryId)
          //     );
          //     if (errorDeliveryDate.length === 0) {
          //       // setAddDeliveries(true);
          //       setTimeout(() => {
          //         setCreateStep(createStep + 1);
          //       }, 150);
          //     }
          //   }
          // });
        }

        if (!splitDeliveries && location.state !== null) {
          // console.log('log do DTODelivery', DTODelivery);
          // if (DTOForm.copywriting_date_end === '') {
          //   throw setErrorInput('copywriting_date_end', 'Data de entrega não informada!');
          // } else {
          //   setErrorInput('copywriting_date_end', undefined);
          // }

          if (moment(DTOForm.creation_date_end).isBefore('2020-01-01')) {
            throw setErrorInput('creation_date_end', 'Data anterior a 2020 não permitida!');
          } else {
            setErrorInput('creation_date_end', undefined);
          }

          if (creation_date_end === '') {
            throw setErrorInput('creation_date_end', 'Data de Entrega de atividade é obrigatória!');
          } else {
            setErrorInput('creation_date_end', undefined);
          }

          let hasError = false;
          productsArray.forEach((obj: any) => {
            if (obj.reason_change === '' || obj.reason_change === undefined) {
              setErrorCategory((errorCategory) => [...errorCategory, obj.job_service_id]);
              hasError = true;
            } else {
              setErrorCategory((prevState) =>
                prevState.filter((product) => product !== obj.job_service_id)
              );
            }
          });

          if (hasError) {
            throw new Error('Existem produtos sem o "Tipo" selecionado!');
          } else {
            setErrorCategory([]);
            // setAddDeliveries(true);
            setTimeout(() => {
              setCreateStep(createStep + 1);
            }, 150);
          }
        }

        if (!splitDeliveries && location.state === null) {
          // console.log('log do DTODelivery', DTODelivery);

          // if (DTOForm.copywriting_date_end === '') {
          //   throw setErrorInput('copywriting_date_end', 'Data de entrega não informada!');
          // } else {
          //   setErrorInput('copywriting_date_end', undefined);
          // }

          if (moment(DTOForm.creation_date_end).isBefore('2020-01-01')) {
            throw setErrorInput('creation_date_end', 'Data anterior a 2020 não permitida!');
          } else {
            setErrorInput('creation_date_end', undefined);
          }

          if (creation_date_end === '') {
            throw setErrorInput('creation_date_end', 'Data de Entrega de atividade é obrigatória!');
          } else {
            setErrorInput('creation_date_end', undefined);
          }

          // if (moment(DTOForm.creation_date_end).isSameOrBefore(DTOForm.copywriting_date_end)) {
          //   throw setErrorInput(
          //     'creation_date_end',
          //     `Data de entrega menor que a data de entrega ${parameters.input_name}`
          //   );
          // } else {
          //   setErrorInput('creation_date_end', undefined);
          // }

          let hasError = false;
          productsArray.forEach((obj: any, index: number) => {
            if (obj.reason_change === '' || obj.reason_change === undefined) {
              setErrorCategory((errorCategory) => [...errorCategory, index]);
              hasError = true;
            } else {
              setErrorCategory((prevState) => prevState.filter((product) => product !== index));
            }
          });

          if (hasError) {
            throw new Error('Existem produtos sem o "Tipo" selecionado!');
          } else {
            setErrorCategory([]);
            // setAddDeliveries(true);
            setTimeout(() => {
              setCreateStep(createStep + 1);
            }, 150);
          }
        }
      } else if (createStep === 2 && tasksType === 'produto') {
        // if (DTOForm.copywriting_date_end === '') {
        //   throw setErrorInput('copywriting_date_end', 'Data de entrega não informada!');
        // } else {
        //   setErrorInput('copywriting_date_end', undefined);
        // }

        // if (moment(DTOForm.copywriting_date_end).isBefore('2020-01-01')) {
        //   throw setErrorInput('copywriting_date_end', 'Data anterior a 2020 não permitida!');
        // } else {
        //   setErrorInput('copywriting_date_end', undefined);
        // }

        if (creation_date_end === '') {
          throw setErrorInput('creation_date_end', 'Data de Entrega de atividade é obrigatória!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        if (moment(DTOForm.creation_date_end).isBefore('2020-01-01')) {
          throw setErrorInput('creation_date_end', 'Data anterior a 2020 não permitida!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        let hasError = false;

        productsArray.map((obj: any, index: number) => {
          if (obj.reason_change === '' || obj.reason_change === undefined) {
            setErrorCategory((errorCategory: any) => [...errorCategory, index]);
            hasError = true;
            throw new Error('Existem produtos sem o "Tipo" selecionado!');
          } else {
            setErrorCategory([]);
          }
        });

        if (hasError) {
          throw new Error('Existem produtos sem o "Tipo" selecionado!');
        } else {
          setErrorCategory([]);
          // setAddDeliveries(true);
          setTimeout(() => {
            setCreateStep(createStep + 1);
          }, 150);
        }
      } else if (createStep === 3 && tasksType !== 'livre') {
        if (copywriting_description === '') {
          throw setErrorInput(
            'copywriting_description',
            `Descrição do Input ${
              parameters.input_name !== '' ? parameters.input_name : 'Pré-requisitos'
            } é obrigatória!`
          );
        } else {
          setErrorInput('copywriting_description', undefined);
        }

        if (creation_description === '') {
          throw setErrorInput(
            'creation_description',
            'Descrição do Input Atividade/Criação é obrigatória!'
          );
        } else {
          setErrorInput('creation_description', undefined);
        }
        setCreateStep(createStep + 1);
      } else if (createStep === 4 && tasksType === 'livre') {
        handleOnSubmit();
      } else {
        setCreateStep(createStep + 1);
      }
    } catch (error: any) {
      console.log('log do erro', error);
      if (error.message) {
        addToast({
          title: 'Atenção',
          description: error?.message,
          type: 'warning'
        });
      } else {
        addToast({
          title: 'Atenção',
          description: error,
          type: 'warning'
        });
      }
    }
  };

  const handleOnPrevStep = () => {
    setCreateStep(createStep - 1);
  };

  const handleOnCancel = () => {
    setCancelModal(true);
    setPathSelected('tarefas');
  };

  const handleProductsDeliveries = (field: string, value: string, productId: any) => {
    setProductsArray((current) =>
      current.map((obj, i) => {
        if (i === productId) {
          switch (field) {
            case 'description':
              return { ...obj, description: value };
            case 'size':
              return { ...obj, size: value };
            case 'category':
              setErrorCategory([]);
              return { ...obj, reason_change: value };
            case 'type':
              return { ...obj, type: value };
            default:
              return obj;
          }
        }
        return obj;
      })
    );
    // if (field === 'description') {
    //   setProductsArray((current) =>
    //     current.map((obj) => {
    //       if (obj.job_service_id === productId) {
    //         return { ...obj, description: value };
    //       }
    //       return obj;
    //     })
    //   );
    // }

    // if (field === 'size') {
    //   setProductsArray((current) =>
    //     current.map((obj) => {
    //       if (obj.job_service_id === productId) {
    //         return { ...obj, size: value };
    //       }
    //       return obj;
    //     })
    //   );
    // }

    // if (field === 'category') {
    //   setErrorCategory([]);
    //   setProductsArray((current) =>
    //     current.map((obj) => {
    //       if (obj.job_service_id === productId) {
    //         return { ...obj, reason_change: value };
    //       }
    //       return obj;
    //     })
    //   );
    // }

    // if (field === 'type') {
    //   setProductsArray((current) =>
    //     current.map((obj) => {
    //       if (obj.job_service_id === productId) {
    //         return { ...obj, type: value };
    //       }
    //       return obj;
    //     })
    //   );
    // }
  };

  const handleCheckQuantity = (quantity: any, product: IProduct) => {
    // console.log('log do product check quantity', quantity, product);
    const totalProductTime = multiplyTime(product.minutes, quantity);
    if (
      selectedProject?.tempo_restante &&
      Number(selectedProject?.tempo_restante.slice(0, -6)) < Number(totalProductTime.slice(0, -6))
    ) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os produtos e quantidades!'
      });
      // handleProductQuantity(1, product);
    } else {
      if (splitDeliveries) {
        // handleProductQuantityDeliveries(quantity, product);
        addProductOnDelivery(product, quantity);
      } else {
        // handleProductQuantity(quantity, product);
        addObject(product, quantity);
      }
    }
  };

  const handleOnSubmit = useCallback(async () => {
    try {
      const fileArray = uploadedFiles.map(
        (row: { bucket: any; file_name: any; key: any; size: any; original_name: any }) => ({
          file_name: row.file_name,
          original_name: row.original_name,
          bucket: row.bucket,
          key: row.key,
          size: row.size
        })
      );

      const {
        title,
        tenant_id,
        project_product_id,
        flow_id,
        user_id,
        requester_id,
        description,
        creation_description,
        creation_date_end,
        copywriting_description,
        copywriting_date_end,
        start_job,
        end_job,
        step,
        gen_ticket,
        ticket_id
      } = DTOForm;

      if (tasksType === 'livre') {
        const createNewData = {
          title,
          tenant_id,
          project_product_id,
          flow_id,
          user_id,
          requester_id,
          description,
          creation_description,
          creation_date_end,
          copywriting_description,
          step,
          end_job,
          start_job,
          files: fileArray,
          gen_ticket,
          ticket_id,
          deadlines: [
            {
              date_end: DTOForm?.creation_date_end,
              description: DTOForm?.creation_description,
              title: '1ª entrega',
              products: [
                {
                  job_service_id: '1',
                  service: 'LIVRE',
                  description: 'DESCRICAO',
                  reason_change: '1',
                  type: 'livre',
                  tenant_id: user.principalTenant,
                  size: '000x000',
                  minutes: '00:00:00',
                  minutes_creation: '00:00:00',
                  minutes_essay: '00:00:00',
                  quantity: '1',
                  flag: 'false'
                }
              ]
            }
          ]
        };

        if (end_job === '') {
          delete createNewData.end_job;
        }

        if (ticket_id === '0') {
          delete createNewData.ticket_id;
        }

        if (requester_id === '') {
          delete createNewData.requester_id;
        }

        if (ticket_id === '') {
          delete createNewData.ticket_id;
        }

        setLoadingSubmit(true);

        if (location.state !== null && location.state.task_id) {
          await api.put(`tasks/${location.state.task_id}`, createNewData);
        } else {
          await api.post(`tasks`, createNewData);
        }
      } else if (tasksType === 'produto') {
        const deadline = {
          date_end: DTOForm?.creation_date_end,
          description: DTOForm?.creation_description,
          title: '1ª entrega',
          products: productsArray
        };

        const createNewData = {
          title,
          tenant_id,
          project_product_id,
          flow_id,
          user_id,
          requester_id,
          description,
          creation_description,
          creation_date_end,
          copywriting_description,
          end_job,
          start_job,
          files: fileArray,
          deadlines: [deadline],
          step,
          gen_ticket,
          ticket_id
        };

        if (end_job === '') {
          delete createNewData.end_job;
        }

        if (ticket_id === '0') {
          delete createNewData.ticket_id;
        }

        if (requester_id === '') {
          delete createNewData.requester_id;
        }

        if (ticket_id === '') {
          delete createNewData.ticket_id;
        }

        setLoadingSubmit(true);

        if (location.state !== null && location.state.task_id) {
          await api.put(`tasks/${location.state.task_id}`, createNewData);
        } else {
          await api.post(`tasks`, createNewData);
        }
      } else {
        if (!splitDeliveries) {
          const deadlines = [
            {
              date_end: creation_date_end,
              description: creation_description,
              title: '1ª entrega',
              products: productsArray
            }
          ];

          const createNewData = {
            title,
            tenant_id,
            project_product_id,
            flow_id,
            user_id,
            requester_id,
            end_job,
            start_job,
            description,
            files: fileArray,
            creation_description,
            creation_date_end,
            copywriting_description,
            deadlines: deadlines,
            step,
            gen_ticket,
            ticket_id
          };

          if (end_job === '') {
            delete createNewData.end_job;
          }

          if (ticket_id === '0') {
            delete createNewData.ticket_id;
          }

          if (requester_id === '') {
            delete createNewData.requester_id;
          }

          if (ticket_id === '') {
            delete createNewData.requester_id;
          }

          setLoadingSubmit(true);

          if (location.state !== null && location.state.task_id) {
            await api.put(`tasks/${location.state.task_id}`, createNewData);
          } else {
            await api.post(`tasks`, createNewData);
          }
        } else {
          const deadlines = DTODelivery.map((row: DeliveryProps, index: any) => {
            return {
              date_end: row.creation_date_end,
              creation_date_end: row.creation_date_end,
              copywriting_date_end: row.copywriting_date_end,
              description: DTOForm?.creation_description,
              title: row.deliveryTitle !== '' ? row.deliveryTitle : `${index + 1}ª entrega`,
              products: row.deliveryProducts
            };
          });

          const createNewData = {
            title,
            tenant_id,
            project_product_id,
            requester_id,
            user_id,
            end_job,
            start_job,
            flow_id,
            description,
            files: fileArray,
            creation_description,
            copywriting_description,
            deadlines: deadlines,
            step,
            gen_ticket,
            ticket_id
          };

          if (end_job === '') {
            delete createNewData.end_job;
          }

          if (ticket_id === '0') {
            delete createNewData.ticket_id;
          }

          if (requester_id === '') {
            delete createNewData.requester_id;
          }

          if (ticket_id === '') {
            delete createNewData.ticket_id;
          }

          setLoadingSubmit(true);

          if (location.state !== null && location.state.task_id) {
            await api.put(`tasks/${location.state.task_id}`, createNewData);
          } else {
            await api.post(`tasks`, createNewData);
          }
        }
      }

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Tarefa criada com sucesso!'
      });
      setLoadingSubmit(false);
      navigate('/tarefas');

      // setFinishModal(true);
    } catch (e: any) {
      if (e.response.data.result.length !== 0) {
        e.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });
      }
      setLoadingSubmit(false);
    }
  }, [DTOForm]);

  const selectedProjectInfos = (e: any) => {
    if (e.name === 'tenant_id') {
      setDTOForm({ ...DTOForm, ['tenant_id']: e.infos.value });
      const selectedClient: any = dataClient?.filter((obj: any) => obj.tenant_id === e.infos.value);
      setSelectedSummaryInfos((prevState: any) => ({
        ...prevState,
        ['client']: selectedClient[0]
      }));
    } else if (e.target.name === 'project_product_id') {
      if (user?.organizations?.length > 0) {
        const id = e.target.value;
        const selectedInfos: any = organizationProjects?.filter(
          (obj: any) => obj.project_product_id === id
        );
        setSelectedProject(selectedInfos[0]);
        handleChangeInput(e);
      } else {
        const id = e.target.value;
        const selectedInfos: any = dataProjects?.filter(
          (obj: any) => obj.project_product_id === id
        );
        setSelectedProject(selectedInfos[0]);
        handleChangeInput(e);
        if (selectedInfos[0].listavel === 'false') {
          // setDisplayQuantity(true);
          setProductsArray([]);
          getSingleProduct(e.target.value);
        }
      }
    } else if (e.target.name === 'flow_id') {
      const id = e.target.value;
      const selectedFlow: any = dataFlow?.filter((obj: any) => obj.flow_id === id);
      setSelectedSummaryInfos((prevState: any) => ({
        ...prevState,
        ['flow']: selectedFlow[0]
      }));
      handleChangeInput(e);
    } else if (e.target.name === 'organization_id') {
      const id = e.target.value;
      const selectedOrganization: any = dataOrganizations?.filter(
        (obj: OrganizationsProps) => obj.organization_id === id
      );
      setSelectedSummaryInfos((prevState: any) => ({
        ...prevState,
        ['organization']: selectedOrganization[0]
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

  const handleDeleteProduct = (deliveryId: any, index: number) => {
    const newArray = [...productsArray];
    newArray.splice(index, 1);
    setProductsArray([]);
    setProductsArray(newArray);

    // const newArray = productsArray.filter((obj) => obj.job_service_id !== id);
    // setProductsArray([]);
    // setProductsArray(newArray);
    // const updatedDeliveryArray = DTODelivery.map((delivery) => {
    //   if (delivery.deliveryId === deliveryId) {
    //     return {
    //       ...delivery,
    //       deliveryProducts: delivery.deliveryProducts.filter(
    //         (product: any) => product.job_service_id !== id
    //       )
    //     };
    //   }
    //   return delivery;
    // });
    // setDTODelivery(updatedDeliveryArray);
  };

  const handleDeleteProductDelivery = (indexDelivery: any, indexProduct: any, idProduct: any) => {
    setDTODelivery((prevDeliveryArray) => {
      return prevDeliveryArray.map((delivery) => {
        if (delivery.deliveryId === indexDelivery) {
          return {
            ...delivery,
            deliveryProducts: delivery.deliveryProducts.filter(
              (_: any, i: number) => i !== indexProduct
            )
          };
        }
        return delivery;
      });
    });
  };

  const handleDeleteDelivery = (id: any) => {
    if (DTODelivery.length === 1) {
      setDeliveriesSplit('no-split');
    }
    setDTODelivery(DTODelivery.filter((obj) => obj.deliveryId !== id));
  };

  async function checkFlow() {
    try {
      const response = await api.get(`/flow-function?step=1&flow_id=${DTOForm.flow_id}`);

      if (response.data.result[0].show_hours === 'true') {
        setSelectUserModal(true);
      }
      if (response.data.result[0].show_hours === 'false') {
        handleNextUser();
      }
    } catch (error: any) {
      console.log('log do error check flow', error);
    }
  }

  async function handleNextUser() {
    try {
      const response = await api.get(
        `/task/next?project_product_id=${DTOForm.project_product_id}&flow=${DTOForm.flow_id}&step=1`
      );
      setUsersWithoutSchedule(response.data.result);
      setModalWithoutSchedule(true);
    } catch (error: any) {
      console.log('log error handleNextUser', error);
    }
  }

  const handleSetUserWithoutSchedule = () => {
    const actualDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
    setDTOForm((prevState: any) => ({ ...prevState, ['user_id']: selectedInitialUser?.user_id }));
    setDTOForm((prevState: any) => ({ ...prevState, ['start_job']: actualDate }));

    if (DTOForm.gen_ticket === '' && ticketAsk === 'never') {
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['gen_ticket']: 'false'
      }));
    }

    if (DTOForm.gen_ticket === '' && ticketAsk === 'always') {
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['gen_ticket']: 'true'
      }));
    }

    setSubmitState(new Date());
  };

  useEffect(() => {
    if (DTOForm.project_product_id !== '' && location.state === null && !user?.organizations) {
      if (infoProjects[0]?.tipo === 'product' && infoProjects[0]?.listavel === 'true') {
        setTasksType('horas');
      } else if (infoProjects[0]?.tipo === 'product' && infoProjects[0]?.listavel !== 'true') {
        setTasksType('produto');
      } else if (infoProjects[0]?.tipo !== 'product') {
        setTasksType('livre');
      }
    } else if (
      DTOForm.project_product_id &&
      location.state === null &&
      user?.organizations?.length > 0
    ) {
      if (
        infoOrganizationsProjects[0]?.tipo === 'product' &&
        infoOrganizationsProjects[0]?.listavel === 'true'
      ) {
        setTasksType('horas');
      } else if (
        infoOrganizationsProjects[0]?.tipo === 'product' &&
        infoOrganizationsProjects[0]?.listavel !== 'true'
      ) {
        setTasksType('produto');
      } else if (infoOrganizationsProjects[0]?.tipo !== 'product') {
        setTasksType('livre');
      }
    } else if (
      DTOForm.project_product_id !== '' &&
      location.state !== null &&
      !user?.organizations
    ) {
      if (infoProjects[0]?.tipo === 'product' && infoProjects[0]?.listavel === 'true') {
        setTasksType('horas');
      } else if (infoProjects[0]?.tipo === 'product' && infoProjects[0]?.listavel !== 'true') {
        setTasksType('produto');
      } else if (infoProjects[0]?.tipo !== 'product') {
        setTasksType('livre');
      }
    } else {
      if (location.state?.type === 'Produto') {
        setTasksType('produto');
      } else if (location.state?.type === 'Livre') {
        setTasksType('livre');
      } else {
        if (location.state !== null && location.state.ticket_id) {
          if (infoProjects[0]?.tipo === 'product' && infoProjects[0]?.listavel === 'true') {
            setTasksType('horas');
          } else if (infoProjects[0]?.tipo === 'product' && infoProjects[0]?.listavel !== 'true') {
            setTasksType('produto');
          } else if (infoProjects[0]?.tipo !== 'product') {
            setTasksType('livre');
          }
        }
      }
    }
  }, [DTOForm, infoProjects, infoOrganizationsProjects, location]);

  const finishCreate = () => {
    setFinishModal(false);
    navigate('/tarefas');
  };

  const handleScheduleUser = (values: any) => {
    setDTOForm((prevState: any) => ({ ...prevState, ['user_id']: values.user_id }));
    setDTOForm((prevState: any) => ({ ...prevState, ['start_job']: values.start_job }));
    setDTOForm((prevState: any) => ({ ...prevState, ['end_job']: values.end_job }));

    if (DTOForm.gen_ticket === '' && ticketAsk === 'never') {
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['gen_ticket']: 'false'
      }));
    }

    if (DTOForm.gen_ticket === '' && ticketAsk === 'always') {
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['gen_ticket']: 'true'
      }));
    }

    setSelectUserModal(false);
    setSubmitState(new Date());
  };

  useEffect(() => {
    if (DTOForm.end_job !== '' && DTOForm.start_job !== '' && DTOForm.user_id !== '') {
      handleOnSubmit();
    }

    if (
      selectedInitialUser?.user_id !== '' &&
      DTOForm.end_job === '' &&
      DTOForm.start_job !== '' &&
      DTOForm.user_id !== ''
    ) {
      handleOnSubmit();
    }
  }, [submitState]);

  const handleGenerateTicket = (value: boolean) => {
    if (value) {
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['gen_ticket']: 'true'
      }));
    }
    if (!value) {
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['gen_ticket']: 'false'
      }));
    }
  };

  const checkFlowAndProject = useCallback(async () => {
    try {
      const response = await api.get(
        `/verify-flow?project_product_id=${DTOForm.project_product_id}&flow_id=${DTOForm.flow_id}`
      );
      if (response.data.result === 'Existem divergencias entre o projeto e o fluxo alocado') {
        throw new Error('Existem divergencias entre o projeto e o fluxo alocado');
      }

      if (response.data.result.gen_ticket) {
        setWarningModal(true);
        setDTOForm((prevState: any) => ({
          ...prevState,
          ['gen_ticket']: 'true'
        }));
        setDTOForm((prevState: any) => ({
          ...prevState,
          ticket_id: '0'
        }));
      } else {
        setDTOForm((prevState: any) => ({
          ...prevState,
          ticket_id: ''
        }));
      }

      if (response.data.result === 'Fluxo ok!') {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Fluxo compativel com o projeto'
        });
        setDTOForm((prevState: any) => ({
          ...prevState,
          ticket_id: ''
        }));
      }

      if (response.data.result.length > 0) {
        response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row
          });
        });
        setDTOForm((prevState: any) => ({
          ...prevState,
          flow_id: ''
        }));
      }
    } catch (e: any) {
      if (e.message === 'Existem divergencias entre o projeto e o fluxo alocado') {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.message
        });
      } else if (e.response.data.result.length !== 0) {
        e.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });
        setDTOForm((prevState: any) => ({
          ...prevState,
          flow_id: ''
        }));
      }
    }
  }, [DTOForm.flow_id, DTOForm.project_product_id]);

  useEffect(() => {
    if (DTOForm.flow_id && DTOForm.project_product_id && createStep === 1) {
      checkFlowAndProject();
    }
  }, [DTOForm.flow_id, DTOForm.project_product_id]);

  const handleSingleProductQuantity = (e: any) => {
    setSingleProductQuantity(e.target.value);
  };

  const addProductOnDelivery = (product: any, value: number) => {
    const newProduct = {
      category: product.category,
      description: product.description,
      flag: product.flag,
      minutes: product.minutes,
      minutes_creation: product.minutes_creation,
      minutes_essay: product.minutes_essay,
      service: product.service,
      job_service_id: product.job_service_id,
      size: product.size,
      type: product.type,
      quantity: 1
    };

    const productIndex = productsDeliveriesModal.indexDelivery - 1;

    setDTODelivery((current: any) =>
      current.map((obj: DeliveryProps, index: number) => {
        if (index === productIndex) {
          const existingProductCount = obj.deliveryProducts.filter(
            (item) => item.job_service_id === newProduct.job_service_id
          ).length;

          const productsToAdd = Math.max(0, value - existingProductCount);

          const updatedProducts = [
            ...obj.deliveryProducts,
            ...Array.from({ length: productsToAdd }, (_, i) => ({ ...newProduct }))
          ];

          return { ...obj, deliveryProducts: updatedProducts };
        }
        return obj;
      })
    );
  };

  const addObject = (newObject: any, count: number) => {
    const { service_category_id, ...modifiedObject } = {
      ...newObject,
      quantity: 1,
      service_category_id: undefined
    };
    // const modifiedObject = { ...newObject, quantity: 1 };

    setProductsArray((prevObjects) => {
      const existingObjectCount = prevObjects.filter(
        (obj) => obj.job_service_id === modifiedObject.job_service_id
      ).length;

      const objectsToAdd = Math.max(0, count - existingObjectCount);

      return [
        ...prevObjects,
        ...Array.from({ length: objectsToAdd }, (_, index) => ({
          ...modifiedObject
        }))
      ];
    });
  };

  useEffect(() => {
    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = '');
    }

    window.addEventListener('beforeunload', handleOnBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      console.log('log do click =>', e.target.parentElement.href.split('/').pop());
      setPathSelected(e.target.parentElement.href.split('/').pop());
      if (
        (DTOForm.title !== '' || DTOForm.tenant_id !== '') &&
        formRef.current &&
        !formRef.current.contains(e.target)
      ) {
        setCancelModal(true);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [DTOForm]);

  // useEffect(() => {
  //   console.log('log do tipo de task', tasksType);
  // }, [tasksType]);

  // useEffect(() => {
  //   console.log('log do infoProjects =>', infoProjects);
  // }, [infoProjects]);

  // useEffect(() => {
  //   console.log('log do products Array', productsArray);
  // }, [productsArray]);

  // useEffect(() => {
  //   console.log('log do Delivery DTO', DTODelivery);
  // }, [DTODelivery]);

  // useEffect(() => {
  //   console.log('Log do DTO', DTOForm);
  // }, [DTOForm]);

  // useEffect(() => {
  //   console.log('log do selectedProject', selectedProject);
  // }, [selectedProject]);

  // useEffect(() => {
  //   console.log('log do estimated time', estimatedTime);
  // }, [estimatedTime]);

  // useEffect(() => {
  //   console.log('log errorCategory =>', errorCategory);
  // }, [errorCategory]);

  // useEffect(() => {
  //   console.log('log errorDateDelivery =>', errorDeliveryDate);
  // }, [errorDeliveryDate]);

  // useEffect(() => {
  //   console.log('log do info projects', infoProjects);
  // }, [infoProjects]);

  // useEffect(() => {
  //   console.log('log do location', location.state);
  // }, [location]);

  return (
    <>
      <ContainerWrapper ref={formRef}>
        <HeaderStepsPage
          title={
            location.state !== null && location.state.task_id
              ? 'Editar tarefa'
              : 'Criar nova tarefa'
          }
          backButton={false}
          stepSelected={createStep}
          maxStep={tasksType === 'livre' ? 4 : 5}
          backPage="/tarefas"
        />

        <FormWrapper>
          {createStep === 1 && !user.organizations && (
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
                  value={DTOForm.description}
                  handleOnDescription={(value) => handleDescription(value)}
                  mentions={[]}
                />
              </div>
            </>
          )}
          {createStep === 1 && user?.organizations?.length > 0 && (
            <>
              <FormTitle>Geral</FormTitle>
              <InfoGeral
                data={DTOForm}
                dataProjects={organizationProjects}
                dataFlow={dataFlow}
                handleInputChange={selectedProjectInfos}
                organizations={dataOrganizations}
                error={error}
              />

              <div className={error.description ? 'label-observation error' : 'label-observation'}>
                <div className="label">
                  <p>Contexto geral</p>
                  {error.description && <span>Contexto geral é obrigatório!</span>}
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
              {tasksType !== 'livre' && (
                <>
                  <FormTitle>Entregáveis</FormTitle>
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
                  <InfoDeliveries
                    data={productsArray}
                    dataTypes={dataTypes}
                    handleProducts={handleProductsDeliveries}
                    deliveriesArray={DTODelivery}
                    deliveriesSplited={splitDeliveries}
                    projectInfo={selectedProject}
                    errorCategory={errorCategory}
                    errorDelivery={errorDeliveryDate}
                    addDelivery={addDelivery}
                    addProducts={(value: any, text: any, index: any) =>
                      setProductsDeliveriesModal({
                        isOpen: value,
                        title: text,
                        indexDelivery: index
                      })
                    }
                    updateDeliveryDate={handleUpdateDeliveryDate}
                    handleTypeArt={handleDigitalPrinted}
                    handleTaskType={handleTypeProduct}
                    handleDescriptionProduct={handleDescriptionProduct}
                    handleFormatProduct={handleFormatProduct}
                    passProductProps={handleAddProductFromDeliveries}
                    updateTask={location.state !== null && location.state.task_id}
                    deleteDelivery={handleDeleteDelivery}
                    deleteProduct={handleDeleteProduct}
                    handleTitleOfDelivery={handleDeliveryTitle}
                    deleteDeliveryProduct={handleDeleteProductDelivery}
                  />
                  {!splitDeliveries && tasksType === 'horas' && (
                    <div style={{ marginBottom: '38px' }}>
                      <AddTextButton
                        title="Adicionar produto"
                        click={() => setProductsModal(true)}
                      />
                    </div>
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

              {!splitDeliveries && (
                <>
                  <FormTitle style={{ marginTop: '38px' }}>Data da entrega</FormTitle>
                  <SplitDeliveries>
                    <Deliveries>
                      {/* <InputDefault
                        label={`Entrega ${
                          parameters.input_name !== '' ? parameters.input_name : 'Pré-requisito'
                        }`}
                        // placeholder="00/00/0000"
                        name="dateStart"
                        type="date"
                        max={'9999-12-31'}
                        icon={BiCalendar}
                        onChange={(e) => handleTaskDeliveries('dateStart', e.target.value)}
                        value={DTOForm.copywriting_date_end}
                        error={error?.copywriting_date_end}
                      /> */}

                      <div style={{ width: !splitDeliveries ? '50%' : '180px' }}>
                        <InputDefault
                          label="Data final de entrega cliente"
                          placeholder="00/00/0000"
                          name="creationDate"
                          type="date"
                          max={'9999-12-31'}
                          icon={BiCalendar}
                          onChange={(e) => handleTaskDeliveries('creationDate', e.target.value)}
                          value={DTOForm.creation_date_end}
                          error={error?.creation_date_end}
                        />
                      </div>
                    </Deliveries>
                  </SplitDeliveries>
                </>
              )}
            </>
          )}
          {createStep === 3 && (
            <>
              {tasksType !== 'livre' && (
                <>
                  <FormTitle>Inputs</FormTitle>
                  <TaskInputs
                    valueFirst={DTOForm?.copywriting_description}
                    valueSecond={DTOForm?.creation_description}
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
                  <FormTitle>Arquivos</FormTitle>
                  <InfoFiles
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                    tenant={DTOForm?.tenant_id}
                  />
                  {/* <SummaryTasks
                    selectedProducts={productsArray}
                    createTasks={handleSelectUserForTask}
                    editTasks={() => {
                      setCreateStep(2);
                      setTaskEdit(true);
                    }}
                    taskSummary={DTOForm}
                    projectInfos={selectedProject}
                    summaryExtrainfos={selectedSummaryInfos}
                    taskType={tasksType}
                    updateTask={location.state !== null}
                    handleInputChange={handleChangeInput}
                    estimatedtotalTime={() => ''}
                    error={error} 
                  />*/}
                </>
              )}
            </>
          )}
          {createStep === 4 && (
            <>
              {tasksType === 'livre' && (
                <>
                  <FormTitle>Resumo da tarefa</FormTitle>
                  <SummaryTasks
                    selectedProducts={productsArray}
                    createTasks={checkFlow}
                    editTasks={() => {
                      setCreateStep(1);
                      setTaskEdit(true);
                    }}
                    taskSummary={DTOForm}
                    projectInfos={selectedProject}
                    summaryExtrainfos={selectedSummaryInfos}
                    taskType={tasksType}
                    updateTask={location.state !== null && location.state.task_id}
                    handleTicket={handleGenerateTicket}
                    estimatedtotalTime={() => ''}
                    taskFiles={uploadedFiles}
                    ticketAsk={ticketAsk}
                    error={error}
                    splitDeliveries={splitDeliveries}
                  />
                </>
              )}
              {tasksType !== 'livre' && (
                <>
                  <FormTitle>Arquivos</FormTitle>
                  <InfoFiles
                    uploadedFiles={uploadedFiles}
                    setUploadedFiles={setUploadedFiles}
                    tenant={DTOForm?.tenant_id}
                  />
                </>
              )}
            </>
          )}
          {createStep === 5 && (
            <>
              <FormTitle>Resumo da tarefa</FormTitle>
              {tasksType === 'horas' && (
                <SummaryTasks
                  selectedProducts={DTODelivery}
                  createTasks={checkFlow}
                  editTasks={() => {
                    setCreateStep(1);
                    setTaskEdit(true);
                  }}
                  taskSummary={DTOForm}
                  projectInfos={selectedProject}
                  summaryExtrainfos={selectedSummaryInfos}
                  taskType={tasksType}
                  updateTask={location.state !== null && location.state.task_id}
                  handleTicket={handleGenerateTicket}
                  estimatedtotalTime={setEstimatedTime}
                  taskFiles={uploadedFiles}
                  ticketAsk={ticketAsk}
                  splitDeliveries={splitDeliveries}
                  error={error}
                />
              )}
              {tasksType !== 'horas' && (
                <SummaryTasks
                  selectedProducts={productsArray}
                  createTasks={checkFlow}
                  editTasks={() => {
                    setCreateStep(1);
                    setTaskEdit(true);
                  }}
                  taskSummary={DTOForm}
                  projectInfos={selectedProject}
                  summaryExtrainfos={selectedSummaryInfos}
                  taskType={tasksType}
                  updateTask={location.state !== null && location.state.task_id}
                  handleTicket={handleGenerateTicket}
                  estimatedtotalTime={setEstimatedTime}
                  taskFiles={uploadedFiles}
                  ticketAsk={ticketAsk}
                  splitDeliveries={splitDeliveries}
                  error={error}
                />
              )}
            </>
          )}
        </FormWrapper>

        {createStep !== 5 && tasksType !== 'livre' && (
          <Footer>
            <>
              <ButtonDefault typeButton="primary" isOutline type="button" onClick={handleOnCancel}>
                Descartar
              </ButtonDefault>
              {/* <Link to={'/tarefas'}>
              </Link> */}

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

        {createStep !== 4 && tasksType === 'livre' && (
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

        {/* Modal product list hours */}
        <ModalDefault
          isOpen={productsModal}
          onOpenChange={() => setProductsModal(false)}
          maxWidth="900px"
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

                {createStep === 1 && tasksType === 'horas' && (
                  <ButtonDefault
                    typeButton="primary"
                    onClick={() => {
                      setProductsModal(false);
                      setCreateStep(createStep + 1);
                      setDTODelivery([{ ...DTODelivery[0], deliveryProducts: productsArray }]);
                    }}
                  >
                    Adicionar Produto
                  </ButtonDefault>
                )}
                {createStep > 1 && (
                  <ButtonDefault
                    typeButton="primary"
                    onClick={() => {
                      setProductsModal(false);
                      setDTODelivery([{ ...DTODelivery[0], deliveryProducts: productsArray }]);
                    }}
                  >
                    Adicionar Produto
                  </ButtonDefault>
                )}
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
                      name={row.job_service_id}
                      onChange={() => handleOnChangeCheckbox(row)}
                      checked={
                        productsArray?.filter((obj) => obj.job_service_id === row.job_service_id)
                          .length > 0
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
                        productsArray?.filter((obj) => obj.job_service_id === row.job_service_id)
                          .length > 0
                          ? productsArray?.filter(
                              (obj) => obj.job_service_id === row.job_service_id
                            ).length
                          : 0
                      }
                      infosReceived={row}
                      handleQuantity={(value: any) => handleCheckQuantity(value, row)}
                      clearQuantity={() => handleOnChangeCheckbox(row)}
                      // disabledInput={
                      //   productsArray?.filter((obj) => obj.job_service_id === row.job_service_id)
                      //     .length > 0
                      //     ? false
                      //     : true
                      // }
                      disabledInput={false}
                    />
                  </div>
                </Product>
              ))}
            </ProductListWrapper>

            <AddProductButton>
              {createStep === 1 && tasksType === 'horas' && (
                <ButtonDefault
                  typeButton="primary"
                  onClick={() => {
                    setProductsModal(false);
                    setCreateStep(createStep + 1);
                    setDTODelivery([{ ...DTODelivery[0], deliveryProducts: productsArray }]);
                  }}
                >
                  Adicionar Produto
                </ButtonDefault>
              )}
              {createStep > 1 && (
                <ButtonDefault
                  typeButton="primary"
                  onClick={() => {
                    setProductsModal(false);
                    setDTODelivery([{ ...DTODelivery[0], deliveryProducts: productsArray }]);
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
          maxWidth="500px"
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
              {/* <ButtonDefault typeButton="dark" isOutline onClick={() => setFinishModal(false)}>
                Cancelar
              </ButtonDefault> */}
              <ButtonDefault typeButton="primary" onClick={finishCreate}>
                Ir para tela de tarefas
              </ButtonDefault>
            </FinishModalButtons>
          </FinishModal>
        </ModalDefault>

        {/* Modal product list of Deliveries */}
        <ModalDefault
          isOpen={productsDeliveriesModal.isOpen}
          onOpenChange={() =>
            setProductsDeliveriesModal({
              isOpen: false,
              title: '',
              indexDelivery: ''
            })
          }
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
                      timeDeliveryConsumedRange === 'more than 30%'
                        ? 'info-hours more-30'
                        : timeDeliveryConsumedRange === 'more than 50%'
                        ? 'info-hours more-50'
                        : 'info-hours'
                    }
                  >
                    {checkDeliveryTimeHasBeenReached > '00:00:00'
                      ? checkDeliveryTimeHasBeenReached
                      : 'Tempo limite atingido, verifique as quantidades'}
                  </div>
                </EstimatedHoursOfProducst>
              </div>
              <CloseModalButton
                onClick={() =>
                  setProductsDeliveriesModal({
                    isOpen: false,
                    title: '',
                    indexDelivery: ''
                  })
                }
              >
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

                {tasksType === 'horas' && (
                  <ButtonDefault
                    typeButton="primary"
                    onClick={() => {
                      setProductsDeliveriesModal({
                        isOpen: false,
                        title: '',
                        indexDelivery: ''
                      });
                    }}
                  >
                    Adicionar Produto
                  </ButtonDefault>
                )}
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
                      name={row.job_service_id}
                      onChange={() =>
                        handleOnChangeCheckboxDeliveries(row, productsDeliveriesModal.indexDelivery)
                      }
                      checked={
                        DTODelivery[
                          productsDeliveriesModal.indexDelivery - 1
                        ]?.deliveryProducts?.filter(
                          (obj: any) => obj.job_service_id === row.job_service_id
                        ).length > 0
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
                        DTODelivery[
                          productsDeliveriesModal.indexDelivery - 1
                        ]?.deliveryProducts?.filter(
                          (obj: any) => obj.job_service_id === row.job_service_id
                        ).length > 0
                          ? DTODelivery[
                              productsDeliveriesModal.indexDelivery - 1
                            ]?.deliveryProducts?.filter(
                              (obj: any) => obj.job_service_id === row.job_service_id
                            ).length
                          : 0
                      }
                      infosReceived={row}
                      handleQuantity={(value: any) => handleCheckQuantity(value, row)}
                      clearQuantity={() => ''}
                      disabledInput={false}
                    />
                  </div>
                </Product>
              ))}
            </ProductListWrapper>

            <AddProductButton>
              <ButtonDefault
                typeButton="primary"
                onClick={() => {
                  setProductsDeliveriesModal({
                    isOpen: false,
                    title: '',
                    indexDelivery: ''
                  });
                }}
              >
                Adicionar Produto
              </ButtonDefault>
            </AddProductButton>
          </ProductsModalWrapper>
        </ModalDefault>

        {/* Modal to select user */}
        <ModalDefault
          isOpen={selectUserModal}
          onOpenChange={() => setSelectUserModal(false)}
          title="Selecione um usuário"
        >
          <ScheduleUser
            task_title={DTOForm.title}
            taskId={DTOForm?.task_id}
            estimated_time={allEstimatedTime}
            flow={DTOForm.flow_id}
            project_product_id={DTOForm.project_product_id}
            limitDate={DTOForm.copywriting_date_end}
            user_alocated={handleScheduleUser}
            loadingSubmit={loadingSubmit}
            closeModal={() => setSelectUserModal(false)}
          />
        </ModalDefault>

        {/* Modal to select user without schedule */}
        <ModalDefault
          isOpen={modalWithoutSchedule}
          onOpenChange={() => setModalWithoutSchedule(false)}
          title="Escolha o usuário inicial"
        >
          <UsersWrapper>
            <ProductsTable>
              <table>
                <thead>
                  <tr>
                    <th>Selecionar</th>
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Tarefas</th>
                  </tr>
                </thead>

                <tbody>
                  {usersWithoutSchedule.map((row: UsersNoSchedule) => (
                    <tr key={row.user_id}>
                      <td>
                        <CheckboxDefault
                          label=""
                          name={''}
                          onChange={() => setSelectedInitalUser(row)}
                          checked={selectedInitialUser?.user_id === row.user_id}
                        />
                      </td>
                      <td>{row.name}</td>
                      <td>{row.function}</td>
                      <td>{row.tasks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ProductsTable>

            <ModalButtons>
              <ButtonDefault
                typeButton="dark"
                isOutline
                onClick={() => {
                  setModalWithoutSchedule(false);
                  setSelectedInitalUser({
                    function: '',
                    name: '',
                    tasks: 0,
                    user_id: ''
                  });
                }}
              >
                Cancelar
              </ButtonDefault>
              <ButtonDefault
                typeButton="primary"
                onClick={() => {
                  handleSetUserWithoutSchedule();
                  setModalWithoutSchedule(false);
                }}
                loading={loadingSubmit}
              >
                Escolher
              </ButtonDefault>
            </ModalButtons>
          </UsersWrapper>
        </ModalDefault>

        {/* Modal ticket info */}
        <ModalDefault
          isOpen={warningModal}
          title="Aviso"
          onOpenChange={() => setWarningModal(false)}
        >
          <ProductsModalWrapper>
            <div>No fluxo escolhido é obrigatório gerar o ticket.</div>
            <div>Essa tarefa ficará visivel também para o seu cliente no 21Clients.</div>
            <div>Os campos disponíveis para visualização por ele serão: TÍTULO e DATAS.</div>

            <ModalButtons>
              <ButtonDefault typeButton="warning" onClick={() => setWarningModal(false)}>
                OK
              </ButtonDefault>
            </ModalButtons>
          </ProductsModalWrapper>
        </ModalDefault>

        {/* Modal product list quantity */}
        <ModalDefault isOpen={displayQuantity} onOpenChange={() => setDisplayQuantity(false)}>
          <ProductsModalWrapper>
            <ProductsModalTop>
              <ProductModalTitle>Quantidade de produtos</ProductModalTitle>
              <CloseModalButton onClick={() => setDisplayQuantity(false)}>
                <MdClose />
              </CloseModalButton>
            </ProductsModalTop>

            <ProductListWrapper>
              <ProductGridHeader>
                <div className="list-title">Produto</div>
                <div className="list-title">Descrição</div>
                <div className="list-title">Formato</div>
                <div className="list-title center">Quantidade</div>
              </ProductGridHeader>

              {productsArray?.map((row: any, index) => (
                <ProductGrid key={index}>
                  <div className="product">{row.service}</div>
                  <div className="category">{row.description}</div>
                  <div className="category">{row.size}</div>
                  <div className="quantity">
                    <SelectDefault
                      label=""
                      name="quantity_info"
                      value={singleProductQuantity}
                      onChange={handleSingleProductQuantity}
                      error={error?.quantity_info}
                    >
                      {numbers.map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </SelectDefault>
                  </div>
                </ProductGrid>
              ))}
            </ProductListWrapper>

            <AddProductButton>
              <ButtonDefault
                typeButton="primary"
                onClick={() => {
                  setDisplayQuantity(false);
                  getSingleProduct(selectedProject?.project_product_id);
                  setCreateStep(createStep + 1);
                }}
              >
                Adicionar quantidade
              </ButtonDefault>
            </AddProductButton>
          </ProductsModalWrapper>
        </ModalDefault>

        {/* Modal discard changes */}
        <ModalDefault
          isOpen={cancelModal}
          onOpenChange={() => setCancelModal(false)}
          title="Descartar alterações"
        >
          <ProductsModalWrapper>
            <div>Deseja realmente descartar as alterações?</div>

            <ModalButtons>
              <ButtonDefault typeButton="dark" isOutline onClick={() => setCancelModal(false)}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault typeButton="danger" onClick={() => navigate(`/${pathSelected}`)}>
                Descartar
              </ButtonDefault>
            </ModalButtons>
          </ProductsModalWrapper>
        </ModalDefault>

        {/* Modal loading submit */}
        <ModalLoader isOpen={loadingSubmit} />
      </ContainerWrapper>
    </>
  );
}
