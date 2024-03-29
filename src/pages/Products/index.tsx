/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
// React
import React, { useCallback, useState, useEffect, useRef } from 'react';

// Icons
import { IconArrowDown } from '../../assets/icons';
import { BiCode, BiFilter, BiPlus, BiSearchAlt, BiTime, BiX } from 'react-icons/bi';

// Libraries
import Switch from 'react-switch';

// Services
import api from '../../services/api';

// Hooks
import { useToast } from '../../hooks/toast';
import useDebouncedCallback from '../../hooks/useDebounced';
import { useFetch } from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import { useParamsHook } from '../../hooks/useParams';

// Components
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import ButtonTable from '../../components/Buttons/ButtonTable';
import HeaderPage from '../../components/HeaderPage';
import { InputDefault } from '../../components/Inputs/InputDefault';
import InputSwitchDefault from '../../components/Inputs/InputSwitchDefault';
import { SelectDefault } from '../../components/Inputs/SelectDefault';
import { TextAreaDefault } from '../../components/Inputs/TextAreaDefault';
import Pagination from '../../components/Pagination';
import { Table } from '../../components/Table';
import { FieldTogleButton, FilterGroup, TableHead } from '../../components/Table/styles';
import Alert from '../../components/Ui/Alert';
import ModalDefault from '../../components/Ui/ModalDefault';
import {
  AppliedFilter,
  ContainerDefault,
  FieldDefault,
  FieldGroup,
  FilterTotal,
  FooterModal
} from '../../components/UiElements/styles';
import { CheckboxDefault } from '../../components/Inputs/CheckboxDefault';
import {
  Summary,
  SummaryInfoWrapper,
  SummaryTaskInfo
} from '../Tasks/ComponentSteps/SummaryTasks/styles';
import FilterModal from '../../components/Ui/FilterModal';
import ModalLoader from '../../components/Ui/ModalLoader';

// Styles
import {
  EstimatedTime,
  EstimatedTimeInputs,
  ModalCategoryButtons,
  ModalProductWrapper,
  ModalSummary,
  ShowServiceData,
  ShowServiceDetails,
  ShowServicesContainer,
  TableKits
} from './styles';
import { FinishModal, FinishModalButtons } from '../Projects/CreateProject/styles';
import { useAuth } from '../../hooks/AuthContext';

interface ServicesProps {
  job_service_id?: number | string;
  service: string;
  description: string;
  type: string;
  size: string;
  minutes: string;
  minutes_creation: any;
  minutes_essay: any;
  service_category_id: string;
  category: string;
  flag: string;
}

interface FormDataProps {
  service: string;
  description: string;
  type: string;
  size: string;
  service_category_id: string;
  category: string;
  flag: string;
  minutes_creation: any;
  minutes_essay: any;
  minutes: any;
  job_service_id?: number | string;
}

interface estimatedHoursPros {
  hours: string;
  minutes: string;
}

interface IDataKit {
  pack_id: string;
  description: string;
  title: string;
  services: string[];
  serviceslist?: ServicesProps[];
}

interface IModalKit {
  isOpen: boolean;
  type: string;
  kit: IDataKit;
}

interface FilterProps {
  category: string;
  type: string;
  [key: string]: string; // Index signature
}

interface StateErrorProps {
  [key: string]: any;
}

export default function Services() {
  const { addToast } = useToast();
  const { user } = useAuth();
  const { parameters, getParams } = useParamsHook();
  const formRef = useRef<any>();
  const {
    formData,
    setData,
    setFormValue,
    handleOnChange,
    handleOnChangeSwitch,
    handleOnChangeMinutes
  } = useForm({
    service: '',
    description: '',
    type: '',
    size: '',
    minutes: '',
    minutes_creation: '',
    minutes_essay: '',
    service_category_id: '',
    flag: 'false',
    job_service_id: ''
  } as FormDataProps);
  const [modal, setModal] = useState({
    isOpen: false,
    type: ''
  });
  const [modalCategory, setModalCategory] = useState({
    isOpen: false,
    title: '',
    category_id: ''
  });
  const [modalShowProduct, setModalShowProduct] = useState({
    isOpen: false,
    type: '',
    product: {
      service: '',
      description: '',
      type: '',
      size: '',
      minutes: '',
      minutes_creation: '',
      minutes_essay: '',
      category: '',
      flag: ''
    }
  });
  const [modalKit, setModalKit] = useState<IModalKit>({
    isOpen: false,
    type: '',
    kit: {} as IDataKit
  });
  const [isOpenRowShowModalKit, setIsOpenRowShowModalKit] = useState<{ [key: string]: boolean }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [filter, setFilter] = useState<FilterProps>({
    category: '',
    type: ''
  });
  const [typeList, setTypeList] = useState('produtos');
  const [selected, setSelected] = useState(1);
  const { data, pages, fetchData, isFetching } = useFetch<ServicesProps[]>(
    `services?search=${search.replace(/[^\w ]/g, '')}&perPage=15&page=${selected}&category=${
      filter.category
    }&type=${filter.type}`
  );
  const {
    data: dataCategory,
    pages: pageCategory,
    fetchData: getCategory
  } = useFetch<any[]>(`category?search=${search.replace(/[^\w ]/g, '')}`);
  const {
    data: dataKits,
    pages: pageKits,
    fetchData: getKitData
  } = useFetch<any[]>(`pack-services?search=${search.replace(/[^\w ]/g, '')}`);
  const [selectedKitPage, setSelectedKitPage] = useState(1);
  const [listSelected, setListSelected] = useState<any[]>([]);
  const [estimatedTimeCreation, setEstimatedTimeCreation] = useState<estimatedHoursPros>({
    hours: '00',
    minutes: '00'
  });
  const [estimatedTimeEssay, setEstimatedTimeEssay] = useState<estimatedHoursPros>({
    hours: '00',
    minutes: '00'
  });
  const [category, setCategory] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const checkboxWrapperRef = useRef<HTMLDivElement>(null);
  const [modalFilters, setModalFilters] = useState<boolean>(false);
  const [error, setError] = useState<StateErrorProps>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelModal, setCancelModal] = useState<boolean>(false);

  function setErrorInput(value: any, message: any) {
    if (!message) {
      delete error[value];
    }

    setError({ ...error, [value]: message });
    return message;
  }

  const handleOnCancel = useCallback(() => {
    setModal({
      isOpen: false,
      type: 'Novo produto'
    });
    setData({
      service: '',
      description: '',
      flag: 'false',
      type: '',
      size: '',
      minutes: '',
      job_service_id: 0
    } as FormDataProps);
    setEstimatedTimeCreation({
      hours: '00',
      minutes: '00'
    });
    setEstimatedTimeEssay({
      hours: '00',
      minutes: '00'
    });
    setError({});
  }, [setData]);

  const handleOnEdit = (item: FormDataProps) => {
    setData(item);

    setEstimatedTimeCreation({
      hours: item.minutes_creation.split(':')[0],
      minutes: item.minutes_creation.split(':')[1]
    });

    setEstimatedTimeEssay({
      hours: item.minutes_essay.split(':')[0],
      minutes: item.minutes_essay.split(':')[1]
    });

    setModal({
      isOpen: true,
      type: `Editar produto: ${item.service}`
    });
  };

  const handleEditCategory = (item: any) => {
    setCategory(item.category);
    setModalCategory({
      isOpen: !modal.isOpen,
      title: 'Editar categoria',
      category_id: item.service_category_id
    });
  };

  const handleOnShowProduct = (item: FormDataProps) => {
    // console.log('log do row to show', item);

    setModalShowProduct({
      isOpen: true,
      type: `Produto: ${item.service}`,
      product: {
        category: item.category,
        description: item.description,
        flag: item.flag,
        minutes: item.minutes,
        minutes_creation: item.minutes_creation,
        minutes_essay: item.minutes_essay,
        service: item.service,
        size: item.size,
        type: item.type
      }
    });
  };

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`services/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Produto foi deletado!'
      });

      fetchData();
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleDeleteCategory = async (id: any) => {
    try {
      await api.delete(`category/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Categoria foi deletada!'
      });

      fetchData();
      getCategory();
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleOnTypeList = (type: string) => {
    setTypeList(type);
  };

  const handleOnOpenCreateModal = (): void => {
    if (typeList === 'produtos') {
      setModal({
        isOpen: true,
        type: 'Novo produto'
      });
      return;
    }

    setSelectedServices([]);
    setModalKit({ type: 'Novo kit', isOpen: true, kit: {} as IDataKit });
  };

  const handleOnDeleteKit = async (row: IDataKit): Promise<void> => {
    try {
      await api.delete(`pack-services/${row.pack_id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Kit foi deletado!'
      });

      getKitData();
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleOnEditKit = (item: IDataKit): void => {
    setSelectedServices(item?.services);

    setModalKit({
      isOpen: true,
      type: `Editar Kit: ${item.title}`,
      kit: item
    });
  };

  const handleOnSelectAllServices = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e?.currentTarget?.checked) {
      const list = data?.map((item) => item.job_service_id);
      setSelectedServices(list as string[]);
      return;
    }

    setSelectedServices([]);
  };

  const handleOnSelectService = (e: React.ChangeEvent<HTMLInputElement>, id: string): void => {
    if (typeof window === 'undefined') return;

    if (e?.currentTarget?.checked) {
      setSelectedServices([...selectedServices, id]);
      return;
    }

    const mainCheckbox: HTMLInputElement | null = document.querySelector('#main-checkbox');

    if (mainCheckbox) mainCheckbox.checked = false;

    const list = selectedServices.filter((item) => item !== id);
    setSelectedServices(list);
  };

  const handleOnCreateKit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e?.currentTarget);
      const data = Object.fromEntries(formData);

      const newData: { [key: string]: any } = { ...data };
      newData.services = selectedServices;

      const validateResponse = validateForm(newData);

      if (typeof validateResponse === 'string') throw new Error(validateResponse);

      await api?.post(`/pack-services`, newData);

      setModalKit({ ...modalKit, isOpen: false });

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Kit foi criado!'
      });

      getKitData();

      setLoading(false);
    } catch (err: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: err.message
      });

      setLoading(false);
    }
  };

  const handleOnUpdateKit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e?.currentTarget);
      const data = Object.fromEntries(formData);

      const newData: { [key: string]: FormDataEntryValue | FormDataEntryValue[] } = { ...data };
      newData.services = selectedServices;

      const validateResponse = validateForm(newData);

      if (typeof validateResponse === 'string') throw new Error(validateResponse);

      api?.put(`/pack-services/${modalKit.kit.pack_id}`, newData)?.then(() => {
        getKitData();
      });

      setModalKit({ type: '', isOpen: false, kit: {} as IDataKit });
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Kit foi atualizado!'
      });

      setLoading(false);
    } catch (err: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: err.message
      });
      setLoading(false);
    }
  };

  const validateForm = (formData: Partial<IDataKit>): string | void => {
    if (!formData?.title) return 'Título é obrigatório';
    // if (!formData?.description?.trim()) return 'Descrição é obrigatória';
    if (!formData?.services) return 'Produtos é obrigatório';

    // if (formData?.description?.length < 3) {
    //   return 'Descrição deve ter no mínimo 3 caracteres';
    // }

    if (formData?.services?.length <= 1) {
      return 'Selecione pelo menos dois produtos';
    }
  };

  const handleOnOpenChangeViewKit = (): void => {
    setModalKit({
      isOpen: false,
      type: '',
      kit: {} as IDataKit
    });

    setIsOpenRowShowModalKit({});
  };

  const handleOnViewKit = (row: IDataKit): void => {
    setModalKit({
      isOpen: true,
      type: 'view kit',
      kit: row
    });
  };

  const handleOnShowKitDetails = (currentRow: string): void => {
    const cloneOpenRows = { ...isOpenRowShowModalKit };

    if (cloneOpenRows[currentRow] === true) {
      cloneOpenRows[currentRow] = false;
      setIsOpenRowShowModalKit(cloneOpenRows);
      return;
    }

    for (const item in cloneOpenRows) {
      cloneOpenRows[item] = false;
    }

    cloneOpenRows[currentRow] = true;

    setIsOpenRowShowModalKit(cloneOpenRows);
  };

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        setLoading(true);
        console.log('log do submit =>', loading);

        event.preventDefault();

        const {
          service,
          description,
          type,
          minutes_creation,
          minutes_essay,
          service_category_id,
          flag,
          size,
          tenant_id
        } = formData;

        if (flag === '') {
          setFormValue('flag', 'false');
        }

        if (formData.flag === 'true' && modal.type === 'Novo produto') {
          const newFormData = {
            service,
            description,
            service_category_id,
            flag,
            type,
            size,
            minutes_creation: '00:00:00',
            minutes_essay: '00:00:00',
            tenant_id
          };

          await api.post('services', newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Produto criado com sucesso!'
          });
        } else if (formData.flag === 'true' && modal.type !== 'Novo produto') {
          const updateFormData = {
            service,
            description,
            service_category_id,
            flag,
            type,
            size,
            minutes_creation: '00:00:00',
            minutes_essay: '00:00:00',
            tenant_id
          };

          await api.put(`services/${formData.job_service_id}`, updateFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Produto salvo com sucesso!'
          });
        } else if (formData.flag === 'false' && modal.type === 'Novo produto') {
          const newFormData = {
            service,
            description,
            service_category_id,
            flag,
            type,
            size,
            minutes_creation,
            minutes_essay,
            tenant_id
          };

          if (minutes_creation === undefined || minutes_creation === '') {
            throw setErrorInput('minutes_creation', 'Campo Tempo Atividade é obrigatório!');
          } else {
            setErrorInput('minutes_creation', undefined);
          }

          if (minutes_essay === undefined || minutes_essay === '' || minutes_essay === '00:00:00') {
            throw setErrorInput(
              'minutes_essay',
              `Campo Tempo ${parameters.input_name} é obrigatório!`
            );
          } else {
            setErrorInput('minutes_essay', undefined);
          }

          console.log('log newFormData - flag false =>', newFormData);
          await api.post('services', newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Produto criado com sucesso!'
          });
        } else {
          const newFormData = {
            service,
            description,
            service_category_id,
            flag,
            type,
            size,
            minutes_creation,
            minutes_essay,
            tenant_id
          };

          await api.put(`services/${formData.job_service_id}`, newFormData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Produto salvo com sucesso!'
          });
        }

        handleOnCancel();
        fetchData();

        setLoading(false);
      } catch (e: any) {
        // Exibir erro
        console.log('log do erro', e);
        setLoading(false);

        if (e === 'Campo é obrigatório!') {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: e
          });
        } else if (e === `Campo Tempo ${parameters.input_name} é obrigatório!`) {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: e
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
            title: 'Atenção',
            description: e.response.data.message,
            type: 'danger'
          });
        }

        setLoading(false);
        // addToast({
        //   type: 'danger',
        //   title: 'ATENÇÃO',
        //   description: e.response.data.message
        // });
      }
    },
    [formData, addToast, fetchData, handleOnCancel, modal]
  );

  function handleList(value: any) {
    if (listSelected.includes(value)) {
      setListSelected(listSelected.filter((obj) => obj !== value));
    } else {
      setListSelected((obj) => [...obj, value]);
    }
  }

  const handleAddHours = (event: any) => {
    const { name, value } = event.target;
    if (name === 'hours_creation') {
      setEstimatedTimeCreation({ hours: value, minutes: estimatedTimeCreation.minutes });
      setErrorInput('minutes_creation', undefined);
    }
    if (name === 'minutes_creation') {
      if (value > 59) {
        setEstimatedTimeCreation({ hours: estimatedTimeCreation.hours, minutes: '59' });
        setErrorInput('minutes_creation', undefined);
      } else {
        setEstimatedTimeCreation({ hours: estimatedTimeCreation.hours, minutes: value });
        setErrorInput('minutes_creation', undefined);
      }
    }
    if (name === 'hours_essay') {
      setEstimatedTimeEssay({ hours: value, minutes: estimatedTimeEssay.minutes });
      setErrorInput('minutes_essay', undefined);
    }
    if (name === 'minutes_essay') {
      if (value > 59) {
        setEstimatedTimeEssay({ hours: estimatedTimeEssay.hours, minutes: '59' });
        setErrorInput('minutes_essay', undefined);
      } else {
        setEstimatedTimeEssay({ hours: estimatedTimeEssay.hours, minutes: value });
        setErrorInput('minutes_essay', undefined);
      }
    }
  };

  useEffect(() => {
    handleOnChangeMinutes({
      name: 'minutes_creation',
      value: `${estimatedTimeCreation.hours}:${estimatedTimeCreation.minutes}:00`
    });
  }, [estimatedTimeCreation]);

  useEffect(() => {
    handleOnChangeMinutes({
      name: 'minutes_essay',
      value: `${estimatedTimeEssay.hours}:${estimatedTimeEssay.minutes}:00`
    });
  }, [estimatedTimeEssay]);

  useEffect(() => {
    setTypeList('produtos');
  }, []);

  useEffect(() => {
    function handleCheckbox(): void {
      if (data?.length === selectedServices?.length) {
        const { current } = checkboxWrapperRef;

        const mainCheckbox = current?.querySelector('#main-checkbox') as HTMLInputElement;
        if (mainCheckbox) mainCheckbox.checked = true;
      }
    }

    handleCheckbox();
  }, [selectedServices, data, modalKit.isOpen]);

  const createCategory = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();
        setLoading(true);

        const newCategory = {
          category: category
        };

        await api.post('category', newCategory);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Categoria criada com sucesso!'
        });

        setModalCategory({
          isOpen: false,
          title: '',
          category_id: ''
        });

        setCategory('');
        fetchData();
        getCategory();

        setLoading(false);
      } catch (e: any) {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });

        setLoading(false);
      }
    },
    [addToast, category]
  );

  const editCategory = useCallback(
    async (event: any) => {
      try {
        setLoading(true);

        event.preventDefault();

        const newCategory = {
          service_category_id: modalCategory.category_id,
          category: category
        };

        await api.put('category', newCategory);

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Categoria editada com sucesso!'
        });

        setModalCategory({
          isOpen: false,
          title: '',
          category_id: ''
        });

        setCategory('');
        fetchData();
        getCategory();

        setLoading(false);
      } catch (e: any) {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });

        setLoading(false);
      }
    },
    [addToast, category]
  );

  const handleApplyFilters = (filters: any) => {
    setFilter(filters);
    setModalFilters(false);
  };

  const handleClearFilters = () => {
    setFilter({
      category: '',
      type: ''
    });
    setModalFilters(false);
  };

  const hasFilters = Object.values(filter).every((obj) => obj === null || obj === '');

  const countNonEmptyProperties = () => {
    let count = 0;
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        // Check if the property is not empty or null
        if (filter[key] !== '' && filter[key] !== null) {
          count++;
        }
      }
    }
    return count;
  };

  const checkIfClickedOutside = (e: any) => {
    if (formData.service !== '' && formRef.current && !formRef.current.contains(e.target)) {
      setCancelModal(true);
    }
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
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [formData]);

  return (
    <ContainerDefault>
      {user?.permissions?.includes('jobs_products_add') && (
        <HeaderPage title="Produtos">
          <>
            <ButtonDefault
              typeButton="primary"
              onClick={() =>
                setModalCategory({
                  isOpen: !modal.isOpen,
                  title: 'Cadastrar nova categoria',
                  category_id: ''
                })
              }
            >
              <BiPlus color="#fff" />
              Adicionar categoria
            </ButtonDefault>
            <ButtonDefault typeButton="success" onClick={handleOnOpenCreateModal}>
              <BiPlus color="#fff" />
              Adicionar {typeList === 'produtos' ? 'produto' : 'kit'}
            </ButtonDefault>
          </>
        </HeaderPage>
      )}

      {!user?.permissions?.includes('jobs_products_add') && <HeaderPage title="Produtos" />}

      {!isFetching && (
        <Table>
          <TableHead>
            <div className="groupTable">
              {typeList === 'produtos' && (
                <h2>
                  Lista de produtos{' '}
                  {pages !== null && pages?.total > 0 ? (
                    <strong>
                      {pages?.total <= 1 ? `${pages?.total} produto` : `${pages?.total} produtos`}
                    </strong>
                  ) : (
                    <strong>0 produto</strong>
                  )}
                </h2>
              )}
              {typeList === 'kits' && (
                <h2>
                  Lista de kits{' '}
                  <strong>
                    {pageKits.total} {pageKits.total === 1 ? 'kit' : 'kits'}
                  </strong>
                </h2>
              )}
              {typeList === 'categories' && (
                <h2>
                  Lista de categorias{' '}
                  <strong>
                    {pageCategory.total} {pageCategory.total === 1 ? 'categoria' : 'categorias'}
                  </strong>
                </h2>
              )}
              {/* <span>Acompanhe seus produtos e serviços pré-cadastrados</span> */}
            </div>

            <FieldGroup style={{ justifyContent: 'flex-end' }}>
              <FieldTogleButton>
                <ButtonDefault
                  onClick={() => handleOnTypeList('produtos')}
                  typeButton={typeList === 'produtos' ? 'lightWhite' : 'light'}
                  style={{ height: '100%', fontSize: '12px' }}
                >
                  Produtos
                </ButtonDefault>
                <ButtonDefault
                  onClick={() => handleOnTypeList('kits')}
                  typeButton={typeList === 'kits' ? 'lightWhite' : 'light'}
                  style={{ height: '100%', fontSize: '12px' }}
                >
                  Kits
                </ButtonDefault>
                <ButtonDefault
                  onClick={() => handleOnTypeList('categories')}
                  typeButton={typeList === 'categories' ? 'lightWhite' : 'light'}
                  style={{ height: '100%', fontSize: '12px' }}
                >
                  Categorias
                </ButtonDefault>
              </FieldTogleButton>

              <div style={{ maxWidth: '280px' }}>
                <InputDefault
                  label=""
                  name="search"
                  placeholder="Buscar..."
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    debouncedCallback(event.target.value);
                  }}
                  value={searchTerm}
                  icon={BiSearchAlt}
                  isLoading={isLoading}
                />
              </div>

              {!hasFilters && (
                <ButtonDefault typeButton="danger" isOutline onClick={handleClearFilters}>
                  <div className="close-icon">
                    <BiX size={30} />
                  </div>
                  Limpar filtros
                </ButtonDefault>
              )}

              <ButtonDefault
                typeButton="lightWhite"
                isOutline
                onClick={() => setModalFilters(true)}
              >
                <BiFilter />
                Filtros
              </ButtonDefault>
            </FieldGroup>
          </TableHead>
          {!hasFilters && (
            <FilterGroup>
              <FilterTotal>
                <div className="filter-title">Filtros ({countNonEmptyProperties()}):</div>
                {filter.category !== '' ? <span>Categoria</span> : ''}
                {filter.type !== '' ? <span>Tipo</span> : ''}
              </FilterTotal>

              <AppliedFilter>
                {filter.category !== '' ? (
                  <div className="filter-title">
                    Categoria: <span>{filter.category}</span>
                  </div>
                ) : (
                  ''
                )}

                {filter.type !== '' ? (
                  <div className="filter-title">
                    Tipo: <span>{filter.type}</span>
                  </div>
                ) : (
                  ''
                )}
              </AppliedFilter>
            </FilterGroup>
          )}
          {typeList === 'produtos' && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Chamar produtos</th>
                  <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((row) => (
                  <tr key={row.job_service_id}>
                    <td style={{ cursor: 'pointer' }} onClick={() => handleOnShowProduct(row)}>
                      #{String(row.job_service_id).padStart(5, '0')}
                    </td>
                    <td style={{ cursor: 'pointer' }} onClick={() => handleOnShowProduct(row)}>
                      {row.service}
                    </td>
                    <td
                      style={{ textTransform: 'capitalize', cursor: 'pointer' }}
                      onClick={() => handleOnShowProduct(row)}
                    >
                      {row.category}
                    </td>
                    <td>
                      <Switch
                        onChange={() => handleList(row.job_service_id)}
                        // checked={
                        //   listSelected.includes(row.job_service_id) || row.flag === 'true' ? true : false
                        // }
                        checked={row.flag === 'true' ? true : false}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#0046B5"
                      />
                    </td>
                    <td>
                      <div className="fieldTableClients">
                        <ButtonTable typeButton="view" onClick={() => handleOnShowProduct(row)} />
                        {user?.permissions?.includes('jobs_products_edit') && (
                          <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />
                        )}

                        {user?.permissions?.includes('jobs_projects_delete') && (
                          <Alert
                            title="Atenção"
                            subtitle="Certeza que gostaria de deletar este Produto? Ao excluir a ação não poderá ser desfeita."
                            confirmButton={() => handleOnDelete(row.job_service_id)}
                          >
                            <ButtonTable typeButton="delete" />
                          </Alert>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {data && data.length <= 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                      Sem produtos
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot>
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
              </tfoot>
            </table>
          )}
          {typeList === 'kits' && (
            <TableKits>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Título</th>
                  <th>Qtd. Produtos</th>
                  <th>Descrição</th>
                  <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {dataKits?.map((row) => (
                  <tr key={row.pack_id}>
                    <td>{row.pack_id}</td>
                    <td>{row.title}</td>
                    <td>{row?.services?.length}</td>
                    <td className="fieldLongText">
                      {/* <Switch
                        onChange={() => handleList(row.job_service_id)}
                        // checked={
                        //   listSelected.includes(row.job_service_id) || row.flag === 'true' ? true : false
                        // }
                        checked={row.flag === 'true' ? true : false}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        onColor="#0046B5"
                      /> */}
                      {row?.description}
                    </td>
                    <td>
                      <div className="fieldTableClients">
                        <ButtonTable typeButton="view" onClick={() => handleOnViewKit(row)} />
                        <ButtonTable typeButton="edit" onClick={() => handleOnEditKit(row)} />
                        <Alert
                          title="Atenção"
                          subtitle="Certeza que gostaria de deletar este Kit? Ao excluir a ação não poderá ser desfeita."
                          confirmButton={() => handleOnDeleteKit(row)}
                        >
                          <ButtonTable typeButton="delete" />
                        </Alert>
                      </div>
                    </td>
                  </tr>
                ))}

                {dataKits && dataKits.length <= 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center' }}>
                      Sem kits
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={100}>
                    <Pagination
                      total={pageKits.total}
                      perPage={pageKits.perPage}
                      currentPage={selectedKitPage}
                      lastPage={pageKits.lastPage}
                      onClickPage={(e) => setSelectedKitPage(e)}
                    />
                  </td>
                </tr>
              </tfoot>
            </TableKits>
          )}
          {typeList === 'categories' && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  {/* <th>Categoria</th>
                  <th>Listar produtos</th> */}
                  <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {dataCategory?.map((row) => (
                  <tr key={row.service_category_id}>
                    <td>#{String(row.service_category_id).padStart(5, '0')}</td>
                    <td style={{ cursor: 'pointer' }} onClick={() => ''}>
                      {row.category}
                    </td>
                    {/* <td style={{ textTransform: 'capitalize' }}>{row.category}</td> */}
                    {/* <td></td> */}
                    <td>
                      <div className="fieldTableClients">
                        {/* <ButtonTable typeButton="view" onClick={() => handleOnShowProduct(row)} /> */}
                        <ButtonTable typeButton="edit" onClick={() => handleEditCategory(row)} />
                        <Alert
                          title="Atenção"
                          subtitle="Certeza que gostaria de deletar este Produto? Ao excluir a ação não poderá ser desfeita."
                          confirmButton={() => handleDeleteCategory(row.service_category_id)}
                        >
                          <ButtonTable typeButton="delete" />
                        </Alert>
                      </div>
                    </td>
                  </tr>
                ))}

                {dataCategory && dataCategory.length <= 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center' }}>
                      Sem categorias
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={100}>
                    <Pagination
                      total={pageCategory.total}
                      perPage={pageCategory.perPage}
                      currentPage={selected}
                      lastPage={pageCategory.lastPage}
                      onClickPage={(e) => setSelected(e)}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </Table>
      )}

      {/* Modal create product*/}
      <ModalDefault
        isOpen={modal.isOpen}
        title={modal.type}
        onOpenChange={() => (formData.service !== '' ? checkIfClickedOutside : handleOnCancel())}
      >
        <form onSubmit={handleOnSubmit} style={{ minWidth: '500px' }} ref={formRef}>
          <FieldDefault>
            <InputDefault
              label="Produto"
              placeholder="Digite aqui..."
              name="service"
              onChange={handleOnChange}
              value={formData.service}
              required
            />
          </FieldDefault>

          <FieldDefault>
            <TextAreaDefault
              label="Descrição"
              placeholder="Digite aqui..."
              name="description"
              onChange={handleOnChange}
              value={formData.description}
              // required
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Tipo"
              placeholder="Tipo"
              name="type"
              onChange={handleOnChange}
              value={formData.type}
              required
            >
              <option key={'impresso'} value={'impresso'}>
                Impresso
              </option>
              <option key={'digital'} value={'digital'}>
                Digital
              </option>
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputDefault
              label="Tamanho"
              placeholder="Ex: 170x80"
              name="size"
              onChange={handleOnChange}
              value={formData.size}
              icon={BiCode}
              required
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Categoria"
              placeholder="Selecione aqui..."
              name="service_category_id"
              onChange={handleOnChange}
              value={formData.service_category_id}
              required
            >
              {modal.type.includes('Editar servico') && (
                <option selected={true} value={formData.service_category_id}>
                  {formData.category}
                </option>
              )}
              {dataCategory?.map((row) => (
                <option key={row.service_category_id} value={row.service_category_id}>
                  {row.category}
                </option>
              ))}
            </SelectDefault>
            {/* <InputDefault
              label="Categoria"
              placeholder="Teste"
              name="category"
              onChange={handleOnChange}
              value={formData.category}
              required
            /> */}
          </FieldDefault>

          <FieldDefault>
            <InputSwitchDefault
              onChange={(e) => handleOnChangeSwitch({ name: 'flag', value: e.target.checked })}
              isChecked={formData.flag === 'true' ? true : false}
              label="Chamar produtos"
            />
          </FieldDefault>

          {formData.flag === 'false' && (
            <div>
              {modal.type.includes('Editar produto') && (
                <FieldDefault>
                  <EstimatedTime>
                    <span>Tempo total do produto</span>
                    <EstimatedTimeInputs>
                      <div>{formData?.minutes}</div>
                    </EstimatedTimeInputs>
                  </EstimatedTime>
                </FieldDefault>
              )}

              <FieldDefault>
                <EstimatedTime>
                  <span>Tempo estimado de Atividade (Horas : Minutos)</span>
                  <EstimatedTimeInputs className={error.minutes_creation ? 'error' : ''}>
                    <InputDefault
                      label=""
                      name="hours_creation"
                      onChange={handleAddHours}
                      value={estimatedTimeCreation.hours}
                      type="number"
                      min="0"
                      step="1"
                      icon={BiTime}
                      required
                    />
                    :
                    <InputDefault
                      label=""
                      name="minutes_creation"
                      onChange={handleAddHours}
                      value={estimatedTimeCreation.minutes}
                      type="number"
                      min="0"
                      max="59"
                      step="1"
                      icon={BiTime}
                      required
                    />
                    {error.minutes_creation && (
                      <div className="error-creation">Campo obrigatório</div>
                    )}
                  </EstimatedTimeInputs>
                </EstimatedTime>
              </FieldDefault>

              <FieldDefault>
                <EstimatedTime>
                  <span>
                    Tempo estimado de{' '}
                    {parameters.input_name !== '' ? parameters.input_name : 'redação'} (Horas :
                    Minutos)
                  </span>
                  <EstimatedTimeInputs className={error.minutes_essay ? 'error' : ''}>
                    <InputDefault
                      label=""
                      name="hours_essay"
                      onChange={handleAddHours}
                      value={estimatedTimeEssay.hours}
                      type="number"
                      min="0"
                      step="1"
                      icon={BiTime}
                      required
                    />
                    :
                    <InputDefault
                      label=""
                      name="minutes_essay"
                      onChange={handleAddHours}
                      value={estimatedTimeEssay.minutes}
                      type="number"
                      min="0"
                      max="59"
                      step="1"
                      icon={BiTime}
                      required
                    />
                    {error.minutes_essay && <div className="error-creation">Campo obrigatório</div>}
                  </EstimatedTimeInputs>
                </EstimatedTime>
              </FieldDefault>
            </div>
          )}

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>
            <ButtonDefault loading={loading} typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>

      {/* Modal show product */}
      <ModalDefault
        isOpen={modalShowProduct.isOpen}
        title={modalShowProduct.type}
        onOpenChange={() =>
          setModalShowProduct({
            isOpen: false,
            type: '',
            product: {
              service: '',
              description: '',
              type: '',
              size: '',
              minutes: '',
              minutes_creation: '',
              minutes_essay: '',
              category: '',
              flag: ''
            }
          })
        }
      >
        <ModalProductWrapper>
          <Summary>
            <SummaryInfoWrapper>
              <SummaryTaskInfo>
                <div className="title-info">Descrição:</div>
                <div className="info">{modalShowProduct.product.description}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Total de horas:</div>
                <div className="info">{modalShowProduct.product.minutes}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Total de horas de atividade:</div>
                <div className="info">{modalShowProduct.product.minutes_creation}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">
                  Total de horas de{' '}
                  {parameters.input_name !== '' ? parameters.input_name : 'Pré-requisito'}:
                </div>
                <div className="info">{modalShowProduct.product.minutes_essay}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Categoria:</div>
                <div className="info">{modalShowProduct.product.category}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Tamanho:</div>
                <div className="info">{modalShowProduct.product.size}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Tipo:</div>
                <div className="info">{modalShowProduct.product.type}</div>
              </SummaryTaskInfo>
            </SummaryInfoWrapper>
          </Summary>
        </ModalProductWrapper>
      </ModalDefault>

      {/* Modal create kit */}
      <ModalDefault
        isOpen={
          modalKit?.type?.includes('Editar') ||
          (modalKit?.type?.includes('Novo') && modalKit.isOpen)
        }
        title={modalKit.type}
        onOpenChange={handleOnOpenChangeViewKit}
      >
        <form onSubmit={modalKit?.type?.includes('Editar') ? handleOnUpdateKit : handleOnCreateKit}>
          <FieldDefault>
            <InputDefault
              label="Nome do Kit"
              placeholder="Digite aqui..."
              name="title"
              defaultValue={modalKit?.kit?.title}
            />
          </FieldDefault>

          <FieldDefault>
            <TextAreaDefault
              label="Descrição"
              name="description"
              placeholder="Digite aqui..."
              style={{ resize: 'none', width: '100%', height: '80px' }}
              defaultValue={modalKit?.kit?.description}
            />
          </FieldDefault>

          <ModalSummary>
            <div className="title">
              Selecione os Produtos
              <div>
                <InputDefault
                  label=""
                  placeholder="Pesquise o produto..."
                  onChange={(e) => setSearch(e?.target?.value)}
                />
              </div>
            </div>
            <ShowServicesContainer>
              <ShowServiceData>
                <div className="service-show-row">
                  <p className="service-data header">Produtos</p>
                  <p className="service-data header">Categoria</p>
                  <p className="service-data header">Listável</p>
                  <p className="service-data header">Tempo</p>
                  <div className="service-data center header" ref={checkboxWrapperRef}>
                    <CheckboxDefault
                      label=""
                      id="main-checkbox"
                      checked={
                        data?.length === selectedServices?.length && data?.length !== 0
                          ? true
                          : false
                      }
                      onChange={handleOnSelectAllServices}
                    />
                  </div>
                </div>
              </ShowServiceData>
              <ShowServiceData>
                {data?.map((row) => (
                  <div className="service-show-row" key={row?.job_service_id}>
                    <p className="service-data service" title={row?.service}>
                      {row?.service}
                    </p>
                    <p className="service-data">{row?.service_category_id}</p>
                    <p className="service-data">{row?.flag === 'true' ? 'Sim' : 'Não'}</p>
                    <p className="service-data">{row?.minutes}</p>
                    <div className="service-data center">
                      <CheckboxDefault
                        label=""
                        checked={
                          selectedServices?.includes(row?.job_service_id as string) ? true : false
                        }
                        onChange={(e) => handleOnSelectService(e, row?.job_service_id as string)}
                      />
                    </div>
                  </div>
                ))}
                {!data?.length && <p style={{ padding: '15px' }}>Nenhum produto encontado!</p>}
              </ShowServiceData>
            </ShowServicesContainer>
          </ModalSummary>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault typeButton="dark" isOutline onClick={handleOnOpenChangeViewKit}>
              Descartar
            </ButtonDefault>
            <ButtonDefault loading={loading} typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>

      {/* Modal show kit */}
      <ModalDefault
        isOpen={modalKit?.type === 'view kit' && modalKit.isOpen}
        title={modalKit?.kit?.title}
        onOpenChange={handleOnOpenChangeViewKit}
      >
        <ModalProductWrapper>
          <Summary>
            <div className="title">Informações do Kit</div>
            <SummaryInfoWrapper>
              <SummaryTaskInfo>
                <div className="title-info">Descrição:</div>
                <div className="info">{modalKit?.kit?.description}</div>
              </SummaryTaskInfo>

              <SummaryTaskInfo>
                <div className="title-info">Qtd. de Produtos:</div>
                <div className="info">{modalKit?.kit?.services?.length}</div>
              </SummaryTaskInfo>
            </SummaryInfoWrapper>
          </Summary>

          <Summary>
            <div className="title">Lista de Produtos</div>
            <ShowServicesContainer>
              <ShowServiceData>
                <div className="service-show-row">
                  <p className="service-data center header">Produtos</p>
                  <p className="service-data center header">Categoria</p>
                  <p className="service-data center header">Tipo</p>
                  <p className="service-data center header">-</p>
                </div>
              </ShowServiceData>
              {modalKit?.kit?.serviceslist?.map((row) => (
                <ShowServiceData key={row?.job_service_id}>
                  <div
                    className="service-show-row"
                    onClick={() => handleOnShowKitDetails(row?.service)}
                  >
                    <p className="service-data center">{row?.service}</p>
                    <p className="service-data center">{row?.service_category_id}</p>
                    <p className="service-data center">{row?.type}</p>
                    <p
                      className={`service-data center chevron ${
                        isOpenRowShowModalKit?.[row?.service] === true ? 'show' : ''
                      }`}
                    >
                      <IconArrowDown />
                    </p>
                  </div>
                  <ShowServiceDetails
                    className={isOpenRowShowModalKit?.[row?.service] === true ? 'isOpen' : 'hidden'}
                  >
                    <div className="detailsContainer">
                      <p className="detailTitle">Descrição:</p>
                      <p className="detailValue">{row?.description}</p>
                    </div>
                    <div className="detailsContainer">
                      <p className="detailTitle">Tamanho:</p>
                      <p className="detailValue">{row?.size}</p>
                    </div>
                    <div className="detailsContainer">
                      <p className="detailTitle">Tempo:</p>
                      <p className="detailValue">{row?.minutes}</p>
                    </div>
                  </ShowServiceDetails>
                </ShowServiceData>
              ))}
            </ShowServicesContainer>
          </Summary>
        </ModalProductWrapper>
      </ModalDefault>

      {/* Modal create category */}
      <ModalDefault
        isOpen={modalCategory.isOpen}
        title={modalCategory.title}
        onOpenChange={() =>
          setModalCategory({
            isOpen: false,
            title: '',
            category_id: ''
          })
        }
      >
        <ModalProductWrapper>
          <InputDefault
            label="Categoria"
            placeholder="Digite aqui..."
            name="category"
            onChange={(e: any) => setCategory(e.target.value)}
            value={category}
            className="category-input"
          />
          <ModalCategoryButtons>
            <ButtonDefault
              typeButton="dark"
              isOutline
              onClick={() => {
                setModalCategory({
                  isOpen: false,
                  title: '',
                  category_id: ''
                });
                setCategory('');
              }}
            >
              Descartar
            </ButtonDefault>

            {modalCategory.title !== 'Editar categoria' && (
              <ButtonDefault
                typeButton="primary"
                isOutline
                type="button"
                loading={loading}
                onClick={(e: any) => createCategory(e)}
              >
                Salvar
              </ButtonDefault>
            )}

            {modalCategory.title === 'Editar categoria' && (
              <ButtonDefault
                typeButton="primary"
                isOutline
                type="button"
                loading={loading}
                onClick={(e: any) => editCategory(e)}
              >
                Atualizar
              </ButtonDefault>
            )}
          </ModalCategoryButtons>
        </ModalProductWrapper>
      </ModalDefault>

      {/* Modal filters */}
      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={handleApplyFilters}
        clearFilters={handleClearFilters}
        filterType="product"
      />

      {/* Modal discard changes */}
      <ModalDefault isOpen={cancelModal} onOpenChange={() => ''} title="Descartar alterações">
        <FinishModal>
          <div>Deseja realmente descartar as alterações?</div>

          <FinishModalButtons>
            <ButtonDefault typeButton="dark" isOutline onClick={() => setCancelModal(false)}>
              Cancelar
            </ButtonDefault>
            <ButtonDefault
              typeButton="danger"
              onClick={() => {
                handleOnCancel();
                setCancelModal(false);
              }}
            >
              Descartar
            </ButtonDefault>
          </FinishModalButtons>
        </FinishModal>
      </ModalDefault>

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading || isFetching} />
    </ContainerDefault>
  );
}
