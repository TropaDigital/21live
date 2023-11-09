/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useEffect, useState } from 'react';
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
import { UploadedFilesProps } from '../../../components/Upload/UploadFiles';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import InfoDeliveries from '../ComponentSteps/InfoDeliverables';
import AddTextButton from '../../../components/Buttons/AddTextButton';
import TaskInputs from '../ComponentSteps/InfoInputs';
import SummaryTasks from '../ComponentSteps/SummaryTasks';
import QuantityInput from '../../../components/Inputs/QuantityInput';
import ScheduleUser from '../../../components/ScheduleUser';

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

// Types
import {
  IProduct,
  IProductBackend,
  ITaskCreate,
  OrganizationsProps,
  ServicesProps
} from '../../../types';

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
import InfoFiles from '../ComponentSteps/InfoFiles';

interface StateProps {
  [key: string]: any;
}

interface ProjectProductProps {
  categoria: string;
  listavel: string;
  project_product_id: string;
  produto: string;
  projeto: string;
  quantidade: string;
  select: string;
  tempo: string;
  tipo: string;
}

interface DeliveryProps {
  deliveryId: number | string;
  deliveryDescription: string;
  deliveryDate: string;
  deliveryTitle?: string;
  deliveryProducts: any[];
  showInfo: boolean;
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

interface ILocation {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: ITaskCreate;
}

interface ITicketProps {
  ticket_id: string;
  tenant_id: string;
  ticket_cat_id: string;
  ticket_status_id: string;
  user_id: string;
  organization_id: string;
  media_id: string;
  title: string;
  width: string;
  height: string;
  info: string;
  target: string;
  obs: string;
  file_format: string;
  workminutes: string;
  deadline: string;
  created: string;
  updated: string;
  finished: string;
  tenant_name: string;
  user_name: string;
  status: string;
  organization_name: string;
  media_name: string;
  measure: string;
  value: string;
  media_cat_id: string;
  midia_cat_title: string;
  files: [];
  interactions: [
    {
      ticket_interaction_id: string;
      ticket_id: string;
      reply_id: string;
      user_id: string;
      message: string;
      annex: string;
      annex_title: string;
      status: string;
      access: string;
      created: string;
      updated: string;
      user_name: string;
      avatar: string;
    }
  ];
  fields: [];
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
  const location = useLocation();

  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [error, setError] = useState<StateProps>({});
  const [errorCategory, setErrorCategory] = useState<any[]>([]);
  // const [addDeliveries, setAddDeliveries] = useState<boolean>(false);
  const newDate = new Date();
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
    copywriting_date_end: '',
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
      console.log('log get projects', error);
    }
  }

  // /project-products/199?organization_id=28786
  const { data: organizationProjects } = useFetch<ServicesProps[]>(
    `project-products/${user.principalTenant}?organization_id=${DTOForm.organization_id}`
  );
  const { data: dataFlow, fetchData: fetchFlow } = useFetch<any[]>(`/flow?perPage=1000`);
  const { data: dataTypes } = useFetch<any[]>(`/task-type`);
  const { data: dataOrganizations } = useFetch<OrganizationsProps[]>('organization');
  const [productsArray, setProductsArray] = useState<ServicesProps[]>([]);
  // const [quantityProductsArray, setQuantityProductsArray] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProductProps>({
    categoria: '',
    listavel: '',
    project_product_id: '',
    produto: '',
    projeto: '',
    quantidade: '',
    select: '',
    tempo: '',
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
    deliveryDate: '',
    deliveryTitle: '',
    deliveryProducts: productsArray,
    showInfo: false
  };
  const [DTODelivery, setDTODelivery] = useState<any[]>([DeliveryDefault]);
  // const [dataFlow, setDataFlow] = useState<any[]>();
  const [submitState, setSubmitState] = useState<Date>(new Date());

  const addDelivery = () => {
    const newDelivery: DeliveryProps = {
      deliveryId: DTODelivery.length + 1,
      deliveryDescription: '',
      deliveryDate: '',
      deliveryProducts: [],
      showInfo: false
    };
    DTODelivery.push(newDelivery);
    setDTODelivery([...DTODelivery]);
  };

  useEffect(() => {
    if (location.state !== null && location.state.ticket_id) {
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['tenant_id']: location.state.tenant_id
      }));
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['ticket_id']: location.state.ticket_id
      }));
      setDTOForm((prevState: any) => ({
        ...prevState,
        ['title']: location.state.title
      }));

      getProjects(DTOForm.tenant_id);
    }

    if (location.state !== null && location.state.task_id) {
      const selectedInfos: any = dataProjects?.filter(
        (obj: any) => obj.project_product_id === location.state.project_product_id
      );
      getProjects(location.state.tenant_id);
      setProductsArray([]);
      setDTOForm(location.state);
      setProductsArray(location.state.deliverys[0]?.products);
      setDTODelivery(location.state.deliverys);
      if (dataProjects) {
        setSelectedProject(selectedInfos[0]);
      }
      if (location.state.deliverys.length > 1) {
        setDeliveriesSplit('split');
      }
    }

    const ticketInfo = localStorage.getItem('@live:ticket');
    setTicketAsk(ticketInfo);
  }, [location]);

  useEffect(() => {
    if (DTOForm.tenant_id) {
      getProjects(DTOForm.tenant_id);
    }
  }, [DTOForm]);

  // useEffect(() => {
  //   const getDataFlow = async () => {
  //     try {
  //       const response = await api.get(`/flow/${DTOForm.flow_id}`);
  //       setDataFlow(response.data.result);
  //     } catch (error) {
  //       console.log('log Error Flow', error);
  //     }
  //   };

  //   getDataFlow();
  // }, [DTOForm]);

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

  const handleUpdateDeliveryDate = (value: any, id: any) => {
    if (location.state !== null) {
      setDTODelivery((current: any) =>
        current.map((obj: { delivery_id: any }) => {
          if (obj.delivery_id === id) {
            return { ...obj, date_end: value };
          }
          return obj;
        })
      );
    }
    setDTODelivery((current: any) =>
      current.map((obj: { deliveryId: any }) => {
        if (obj.deliveryId === id) {
          return { ...obj, deliveryDate: value };
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
    return multiplyTime(row?.minutes, row?.quantity);
  });

  const totalProductsHours = sumTimes(productsHoursArray);

  const timeConsumedRange = isTimeConsumedMoreThanPercent(
    totalProductsHours,
    selectedProject?.tempo ? selectedProject?.tempo : '00:00:00'
  );

  const checkTimeoutHasBeenReached = subtractTime(
    selectedProject?.tempo ? selectedProject?.tempo : '00:00:00',
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
    } else if (selectedProject?.tempo && product.minutes > selectedProject?.tempo) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else if (selectedProject?.tempo && selectedProject?.tempo < totalProductsHours) {
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
    } else if (selectedProject && selectedProject.tempo < product.minutes) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os horários e quantidades!'
      });
    } else if (selectedProject && selectedProject.tempo < totalProductsHours) {
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
      user_id,
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

      // if (user_id === '') {
      //   throw setErrorInput('user_id', 'Fluxo - Responsável é obrigatório!');
      // } else {
      //   setErrorInput('user_id', undefined);
      // }

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

      if (createStep === 1 && tasksType === 'horas' && !taskEdit) {
        setProductsModal(true);
      } else if (createStep === 2 && tasksType === 'horas') {
        if (DTOForm.copywriting_date_end === '') {
          throw setErrorInput('copywriting_date_end', 'Data de entrega inicial não informada!');
        } else {
          setErrorInput('copywriting_date_end', undefined);
        }

        if (creation_date_end === '') {
          throw setErrorInput('creation_date_end', 'Data de Entrega Criação é obrigatória!');
        } else {
          setErrorInput('creation_date_end', undefined);
        }

        if (splitDeliveries && location.state !== null) {
          DTODelivery.map((current: DeliveryUpdate) => {
            current.produtos.map((obj: any) => {
              if (obj.reason_change === '' || obj.reason_change === undefined) {
                setErrorCategory((errorCategory: any) => [...errorCategory, obj.job_service_id]);
                throw new Error('Existem produtos sem o "Tipo" selecionado!');
              } else if (obj.reason_change !== '' && obj.reason_change !== undefined) {
                setErrorCategory((prevState) =>
                  prevState.filter((product) => product !== obj.job_service_id)
                );
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

          DTODelivery.map((current: DeliveryProps) => {
            current.deliveryProducts.map((obj: any) => {
              if (obj.reason_change === '' || obj.reason_change === undefined) {
                // console.log('log se tiver erro', DTODelivery);
                setErrorCategory((errorCategory: any) => [...errorCategory, obj.job_service_id]);
                throw new Error('Existem produtos sem o "Tipo" selecionado!');
              } else if (obj.reason_change !== '' && obj.reason_change !== undefined) {
                setErrorCategory((prevState) =>
                  prevState.filter((product) => product !== obj.job_service_id)
                );
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

        if (!splitDeliveries && location.state !== null) {
          // console.log('log do DTODelivery', DTODelivery);
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
      } else if (createStep === 2 && tasksType === 'produto') {
        if (DTOForm.copywriting_date_end === '') {
          throw setErrorInput('copywriting_date_end', 'Data de entrega inicial não informada!');
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
            setErrorCategory((errorCategory: any) => [...errorCategory, obj.job_service_id]);
            return addToast({
              type: 'warning',
              title: 'Atenção',
              description: 'Existem produtos sem o "Tipo" selecionado!'
            });
          } else {
            setErrorCategory([]);
            // setAddDeliveries(true);
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
          if (obj.job_service_id === productId) {
            return { ...obj, description: value };
          }
          return obj;
        })
      );
    }

    if (field === 'size') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.job_service_id === productId) {
            return { ...obj, size: value };
          }
          return obj;
        })
      );
    }

    if (field === 'category') {
      setErrorCategory([]);
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.job_service_id === productId) {
            return { ...obj, reason_change: value };
          }
          return obj;
        })
      );
    }

    if (field === 'type') {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.job_service_id === productId) {
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
    if (
      selectedProject?.tempo &&
      Number(selectedProject?.tempo.slice(0, -6)) < Number(totalProductTime.slice(0, -6))
    ) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Total de horas ultrapassado, revise os produtos e quantidades!'
      });
      // handleProductQuantity(1, product);
    } else {
      if (splitDeliveries) {
        handleProductQuantityDeliveries(quantity, product);
      } else {
        handleProductQuantity(quantity, product);
      }
    }
  };

  const handleProductQuantityDeliveries = (value: any, product: any) => {
    // console.log('log do modal number', productsDeliveriesModal.indexDelivery);
    if (
      DTODelivery[productsDeliveriesModal.indexDelivery - 1]?.deliveryProducts.filter(
        (obj: any) => obj.job_service_id === product.job_service_id
      ).length > 0
    ) {
      const currentProducts =
        DTODelivery[productsDeliveriesModal.indexDelivery - 1].deliveryProducts;
      const productIndex = currentProducts.findIndex(
        (obj: any) => obj.job_service_id === product.job_service_id
      );
      const productToUpdate = currentProducts[productIndex];
      const updatedProduct = {
        ...productToUpdate,
        quantity: value
      };
      currentProducts[productIndex] = updatedProduct;
      setDTODelivery((current: any) =>
        current.map((obj: DeliveryProps) => {
          if (obj.deliveryProducts[productIndex] === productIndex) {
            return { deliveryProducts: currentProducts };
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

  const handleProductQuantity = (value: any, product: any) => {
    // console.log('log do product adicionado', value, product);
    if (productsArray.filter((obj) => obj.job_service_id === product.job_service_id).length > 0) {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.job_service_id === product.job_service_id) {
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

  // const handleClearQuantity = (value: any) => {
  //   setQuantityProductsArray((current) =>
  //     current.map((obj) => {
  //       if (obj.project_id === value.job_service_id) {
  //         return { ...obj, quantity: 0 };
  //       }
  //       return obj;
  //     })
  //   );
  // };

  // const handleDeadlines = (newDeadlines: any) => {
  //   // setProductsArray((prevState: any) => [...prevState, newDeadlines[0].deliveryProducts[0]]);

  //   let deadline = {
  //     date_end: DTOForm?.creation_date_end,
  //     description: DTOForm?.creation_description,
  //     products: newDeadlines.deliveryProducts
  //   };

  //   const deadlineArray = newDeadlines.map((row: any) => {
  //     return (deadline = {
  //       date_end: DTOForm?.creation_date_end,
  //       description: DTOForm?.creation_description,
  //       products: row.deliveryProducts
  //     });
  //   });

  //   // console.log('log do deadline Array', deadlineArray);
  //   setDTOForm({ ...DTOForm, ['deadlines']: deadlineArray });
  //   // setDTOForm((prevDTOForm) => {
  //   //   const updatedDTOForm = { ...prevDTOForm }; // Create a copy of the original object
  //   //   updatedDTOForm.deadlines.push(deadline); // Push the new value(s) into the deadlines array
  //   //   return updatedDTOForm; // Set the updated object as the new state
  //   // });
  // };

  const handleOnSubmit = useCallback(async () => {
    try {
      const fileArray = uploadedFiles.map(
        (row: { bucket: any; file_name: any; key: any; size: any }) => ({
          file_name: row.file_name,
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
          copywriting_date_end,
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

        if (requester_id === '') {
          delete createNewData.requester_id;
        }

        if (ticket_id === '') {
          delete createNewData.ticket_id;
        }

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
          copywriting_date_end,
          copywriting_description,
          end_job,
          start_job,
          files: fileArray,
          deadlines: [deadline],
          step,
          gen_ticket,
          ticket_id
        };

        if (requester_id === '') {
          delete createNewData.requester_id;
        }

        if (ticket_id === '') {
          delete createNewData.ticket_id;
        }

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
            copywriting_date_end,
            copywriting_description,
            deadlines: deadlines,
            step,
            gen_ticket,
            ticket_id
          };

          if (requester_id === '') {
            delete createNewData.requester_id;
          }

          if (ticket_id === '') {
            delete createNewData.requester_id;
          }

          if (location.state !== null && location.state.task_id) {
            await api.put(`tasks/${location.state.task_id}`, createNewData);
          } else {
            await api.post(`tasks`, createNewData);
          }
        } else {
          const deadlines = DTODelivery.map((row: any, index: any) => {
            return {
              date_end: row.deliveryDate,
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
            creation_date_end,
            copywriting_date_end,
            copywriting_description,
            deadlines: deadlines,
            step,
            gen_ticket,
            ticket_id
          };

          if (requester_id === '') {
            delete createNewData.requester_id;
          }

          if (ticket_id === '') {
            delete createNewData.ticket_id;
          }

          if (location.state !== null && location.state.task_id) {
            await api.put(`tasks/${location.state.task_id}`, createNewData);
          } else {
            console.log('log do DTO on submit errado =>', createNewData);
            await api.post(`tasks`, createNewData);
          }
        }
      }

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Tarefa criada com sucesso!'
      });
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

      // if (DTOForm.tenant_id !== '' && DTOForm.ticket_id !== '') {
      //   addToast({
      //     type: 'warning',
      //     title: 'ATENÇÃO',
      //     description: 'Não é possivel alterar o cliente ao criar tarefa com base no ticket'
      //   });
      // } else {
      //   const id = e.target.value;
      //   const selectedClient: any = dataClient?.filter((obj: any) => obj.tenant_id === id);
      //   setSelectedSummaryInfos((prevState: any) => ({
      //     ...prevState,
      //     ['client']: selectedClient[0]
      //   }));
      //   handleChangeInput(e);
      // }
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
        console.log('log do selected infos', selectedInfos);
        setSelectedProject(selectedInfos[0]);
        handleChangeInput(e);
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

  const handleDeleteProduct = (id: any, deliveryId: any) => {
    const newArray = productsArray.filter((obj) => obj.job_service_id !== id);
    setProductsArray([]);
    setProductsArray(newArray);
    const updatedDeliveryArray = DTODelivery.map((delivery) => {
      if (delivery.deliveryId === deliveryId) {
        return {
          ...delivery,
          deliveryProducts: delivery.deliveryProducts.filter(
            (product: any) => product.job_service_id !== id
          )
        };
      }
      return delivery;
    });
    setDTODelivery(updatedDeliveryArray);
  };

  const handleDeleteDelivery = (id: any) => {
    if (DTODelivery.length === 1) {
      setDeliveriesSplit('no-split');
    }
    setDTODelivery(DTODelivery.filter((obj) => obj.deliveryId !== id));
  };

  const handleSelectUserForTask = () => {
    setSelectUserModal(true);
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
    } else {
      if (location.state?.type === 'Produto') {
        setTasksType('produto');
      } else if (location.state?.type === 'Livre') {
        setTasksType('livre');
      } else {
        if (location.state !== null && location.state.ticket_id) {
          setTasksType('horas');
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

  // useEffect(() => {
  //   console.log('log do tipo de task', tasksType);
  // }, [tasksType]);

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
  //   console.log('log dos erros', errorCategory);
  // }, [errorCategory]);

  // useEffect(() => {
  //   console.log('log do info projects', infoProjects);
  // }, [infoProjects]);

  // useEffect(() => {
  //   console.log('log do location', location.state);
  // }, [location]);

  return (
    <>
      <ContainerWrapper>
        <HeaderStepsPage
          title={
            location.state !== null && location.state.task_id
              ? 'Editar tarefa'
              : 'Criar nova tarefa'
          }
          backButton={createStep <= 1}
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
                    // placeholder="00/00/0000"
                    name="dateStart"
                    type="date"
                    max={'9999-12-31'}
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
                    max={'9999-12-31'}
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
                    deliveriesArray={DTODelivery}
                    deliveriesSplited={splitDeliveries}
                    projectInfo={selectedProject}
                    errorCategory={errorCategory}
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
                    createTasks={handleSelectUserForTask}
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
                  createTasks={handleSelectUserForTask}
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
                  error={error}
                />
              )}
              {tasksType !== 'horas' && (
                <SummaryTasks
                  selectedProducts={productsArray}
                  createTasks={handleSelectUserForTask}
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
                />
              )}
            </>
          )}
        </FormWrapper>

        {createStep !== 5 && tasksType !== 'livre' && (
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

        {/* Modal product list */}
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

                {tasksType === 'horas' && (
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
                          ? row.quantity
                            ? row.quantity
                            : 1
                          : 0
                      }
                      infosReceived={row}
                      handleQuantity={(value: any) => handleCheckQuantity(value, row)}
                      clearQuantity={() => ''}
                      disabledInput={
                        productsArray?.filter((obj) => obj.job_service_id === row.job_service_id)
                          .length > 0
                          ? false
                          : true
                      }
                    />
                    {/* <QuantityCounter
                      handleQuantity={handleProductQuantity}
                      rowQuantity={row}
                      clearQuantity={handleClearQuantity}
                      receiveQuantity={
                        productsArray?.filter((obj) => obj.job_service_id === row.job_service_id).length > 0
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
                          ? 1
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
            estimated_time={tasksType === 'horas' ? estimatedTime : selectedProject?.tempo}
            flow={DTOForm.flow_id}
            project_product_id={DTOForm.project_product_id}
            limitDate={DTOForm.copywriting_date_end}
            user_alocated={handleScheduleUser}
            closeModal={() => setSelectUserModal(false)}
          />
        </ModalDefault>
      </ContainerWrapper>
    </>
  );
}
