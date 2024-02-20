/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
// React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useAuth } from '../../hooks/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';
import useDebouncedCallback from '../../hooks/useDebounced';
import { useToast } from '../../hooks/toast';

// Components
import { CardWelcomeDash } from '../../components/Cards/CardWelcomeDash';
import BarChartGrafic from '../../components/GraphicsChart/BarChartGrafic';
import { TableDefault } from '../../components/TableDefault';
import { ContainerGroupTable, SectionDefault } from '../../components/UiElements/styles';
import TopCardsDash, { CardsData } from '../../components/Cards/DashboardTopCards';
import UserPerformanceCard, { UserCardProps } from '../../components/Cards/UserPerformanceCard';
import { CardDataDash } from '../../components/Cards/CardDataDash';
import FilterModal from '../../components/Ui/FilterModal';
import ModalDefault from '../../components/Ui/ModalDefault';
import SelectImage from '../../components/Inputs/SelectWithImage';
import { SelectDefault } from '../../components/Inputs/SelectDefault';
import { ModalButtons } from '../Tasks/ViewTask/styles';
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import TaskTable from '../../components/Ui/TaskTable';
import { InputDefault } from '../../components/Inputs/InputDefault';
import InputMultipleSelect from '../../components/Inputs/InputMultipleSelect';
import ModalLoader from '../../components/Ui/ModalLoader';

// Styles
import {
  NumberCard,
  CardBase,
  Container,
  GraphicLine,
  GridServiceWrapper,
  JobStatus,
  UserInfo,
  UserTeamCard,
  UserJobs,
  OperatorTopWrapper,
  SmallCardsWrapper,
  HoursTable,
  BulletPointInfos,
  BulletsClientWrapper,
  ModalReportWrapper,
  ModalField
} from './styles';

// Libraries
import CountUp from 'react-countup';
import moment from 'moment';

// Images
import PersonTest from '../../assets/person.jpg';

// Services
import api from '../../services/api';

// Utils
import { TenantProps } from '../../utils/models';
import { subtractTime } from '../../utils/convertTimes';

// Types
import { ServicesProps } from '../../types';

// Icons
import { BiCalendar } from 'react-icons/bi';

// interface DashType {
//   typeDash: 'admin' | 'executive' | 'traffic' | 'operator' | '';
// }

interface JobsList {
  flow: string;
  natureza: string;
  status: string;
  task: string;
  task_id: string;
  tenant: string;
  tenant_id: string;
  // id_job: number;
  // client_name: string;
  // team: string;
  // job_name: string;
  // job_status: string;
  // job_type: string;
}

interface TopFeeSpot {
  client_name: string;
  consumido: string;
  tempo_total: string;
  atendimento?: string;
}

interface TeamOverview {
  cliente: string;
  name: string;
  tarefa: string;
  trabalho: string;
  user_id: string;
}

interface TaskConclude {
  cliente: string;
  data_final: string;
  data_inicio: string;
  hora_estimada: string;
  hora_real: string;
  qts_pausas: number;
  status: string;
  tarefa: string;
  task_id: string;
  ultimo_usuario: string;
}

interface ReportForm {
  client_id: string;
  client_name: string;
  contact_names: [];
  contract: string;
  date_start: string;
  date_end: string;
  requesters: [];
}

interface OverviewTenant {
  tenant_id: string;
  name: string;
  quantidade_tarefas: string;
  total_tempo: string;
  livre: number;
  hora: number;
  produto: number;
  em_andamento: number;
  pendente: number;
  concluido: number;
  finalizada: number;
  aguardando_aprovacao: string;
  meetings: string;
  contratos_fee: {
    total_tempo: string;
    tempo_consumido: string;
    saldo: string;
  };
  contratos_spot: {
    total_tempo: string;
    tempo_consumido: string;
    saldo: string;
  };
}

interface RequesterProps {
  user_id: string;
  name: string;
  username: string;
  email: string;
  tenant_id: string;
  avatar: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [filter, setFilter] = useState({
    fromDate: '',
    toDate: ''
  });
  const { formData, handleOnChange, setData } = useForm({
    client_id: '',
    client_name: '',
    contact_name: '',
    contract: '',
    date_start: '',
    date_end: '',
    requesters: [],
    contact_names: []
  } as ReportForm);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [dataProjects, setDataProjects] = useState<ServicesProps[]>([]);
  const [dashType, setDashType] = useState<string>('admin');
  const { data, fetchData, isFetching } = useFetch<any>(
    `/dashboard?date_start=${filter.fromDate}&date_end=${filter.toDate}&dash=${dashType}`
  );
  const [modalFilters, setModalFilters] = useState<boolean>(false);
  const [modalReport, setModalReport] = useState<boolean>(false);

  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<number>(1);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const [taskOrder, setTaskOrder] = useState<string>('desc');
  const { data: dataTasks, pages } = useFetch<any[]>(
    `my-tasks?search=${search.replace(/[^\w ]/g, '')}&page=${selected}&order=${taskOrder}`
  );
  const [errorsForm, setErrorsForms] = useState<{ [key: string]: boolean }>({});
  const [requestersData, setRequestersData] = useState<RequesterProps[]>([]);

  const clientsOptions = dataClient?.map((row) => {
    return {
      value: row.tenant_id,
      label: row.name,
      image: row.bucket,
      color: row.colormain
    };
  });

  const defaultOptionsTeam = requestersData?.filter((item) =>
    formData?.requesters.some((member: any) => member.user_id === item.user_id)
  );

  const [initialValue, setInitialValue] = useState({
    value: '',
    label: '',
    image: '',
    color: ''
  });

  const handleApplyFilters = (filters: any) => {
    setFilter(filters);
    setModalFilters(false);
  };

  const handleClearFilters = () => {
    setFilter({
      fromDate: '',
      toDate: ''
    });
    setModalFilters(false);
  };

  useEffect(() => {
    function getDayFromOneMonthAgo() {
      return moment().subtract(1, 'month');
    }

    const dayFromOneMonthAgo = getDayFromOneMonthAgo();
    // console.log(`1 month ago was: ${moment(dayFromOneMonthAgo).format('YYYY-MM-DD')}`);
    // console.log(`Today is: ${moment().format('YYYY-MM-DD')}`);
    setFilter({
      fromDate: moment(dayFromOneMonthAgo).format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD')
    });
  }, []);

  useEffect(() => {
    if (user.permissions.includes('dashboard_admin')) {
      setDashType('admin');
      fetchData();
    }
    if (user.permissions.includes('dashboard_traffic')) {
      setDashType('traffic');
      fetchData();
    }
    if (user.permissions.includes('dashboard_executive')) {
      setDashType('executive');
      fetchData();
    }
    if (user.permissions.includes('dashboard_operator')) {
      setDashType('operator');
      fetchData();
    }
  }, [user]);

  // console.log('log do data dashboard =>', data);
  // console.log('log do user =>', user.permissions);

  // const monthsArray = [
  //   {
  //     id: '01',
  //     month_name: 'Janeiro'
  //   },
  //   {
  //     id: '02',
  //     month_name: 'Fevereiro'
  //   },
  //   {
  //     id: '03',
  //     month_name: 'Março'
  //   },
  //   {
  //     id: '04',
  //     month_name: 'Abril'
  //   },
  //   {
  //     id: '05',
  //     month_name: 'Maio'
  //   },
  //   {
  //     id: '06',
  //     month_name: 'Junho'
  //   },
  //   {
  //     id: '07',
  //     month_name: 'Julho'
  //   },
  //   {
  //     id: '08',
  //     month_name: 'Agosto'
  //   },
  //   {
  //     id: '09',
  //     month_name: 'Setembro'
  //   },
  //   {
  //     id: '10',
  //     month_name: 'Outubro'
  //   },
  //   {
  //     id: '11',
  //     month_name: 'Novembro'
  //   },
  //   {
  //     id: '12',
  //     month_name: 'Dezembro'
  //   }
  // ];

  // const ten_years = getTenYears();

  const jobsAwaitingClientAdmin = [
    {
      id_job: 0,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[0]?.tenant_name : '???',
      job_name: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[0]?.title : '???',
      job_service: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[0]?.name : ''
    },
    {
      id_job: 1,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[1]?.tenant_name : '???',
      job_name: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[1]?.title : '???',
      job_service: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[1]?.name : ''
    },
    {
      id_job: 2,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[2]?.tenant_name : '???',
      job_name: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[2]?.title : '???',
      job_service: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[2]?.name : ''
    },
    {
      id_job: 3,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[3]?.tenant_name : '???',
      job_name: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[3]?.title : '???',
      job_service: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[3]?.name : ''
    },
    {
      id_job: 4,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[4]?.tenant_name : '???',
      job_name: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[4]?.title : '???',
      job_service: data && dashType === 'admin' ? data?.tarefas_aguardando_aprovacao[4]?.name : ''
    }
  ];

  const jobsAwaitingToBeSend = [
    {
      id_job: 0,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.tenant_name : '',
      job_name: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.title : '',
      job_service: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.name : ''
    },
    {
      id_job: 1,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.tenant_name : '',
      job_name: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.title : '',
      job_service: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.name : ''
    },
    {
      id_job: 2,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.tenant_name : '',
      job_name: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.title : '',
      job_service: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.name : ''
    },
    {
      id_job: 3,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.tenant_name : '',
      job_name: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.title : '',
      job_service: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.name : ''
    },
    {
      id_job: 4,
      client_name:
        data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.tenant_name : '',
      job_name: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.title : '',
      job_service: data && dashType === 'admin' ? data?.tarefas_pendentes_envio[0]?.name : ''
    }
  ];

  const topFeeTenantJobs = [
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee[0]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data?.clientes_fee?.top_tenant_fee[0]?.quantidade_tarefas
          : 0,
      fill: '#59B7FF'
    },
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee[1]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data?.clientes_fee?.top_tenant_fee[1]?.quantidade_tarefas
          : 0,
      fill: '#0045B5'
    },
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee[2]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data?.clientes_fee?.top_tenant_fee[2]?.quantidade_tarefas
          : 0,
      fill: '#0077E6'
    },
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee[3]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data?.clientes_fee?.top_tenant_fee[3]?.quantidade_tarefas
          : 0,
      fill: '#c8e5fd'
    },
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee[4]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data?.clientes_fee?.top_tenant_fee[4]?.quantidade_tarefas
          : 0,
      fill: '#0065D4'
    }
  ];

  const topFeeTenantHours = [
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[0]?.name : '',
      Total:
        data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[0]?.total_tempo : 0,
      fill: '#59B7FF'
    },
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[1]?.name : '',
      Total:
        data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[1]?.total_tempo : 0,
      fill: '#0045B5'
    },
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[2]?.name : '',
      Total:
        data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[2]?.total_tempo : 0,
      fill: '#0077E6'
    },
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[3]?.name : '',
      Total:
        data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[3]?.total_tempo : 0,
      fill: '#E2F2FF'
    },
    {
      name: data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[4]?.name : '',
      Total:
        data && dashType === 'admin' ? data?.clientes_fee?.top_tenant_fee_horas[4]?.total_tempo : 0,
      fill: '#0065D4'
    }
  ];

  const topInternalChangesHours = [
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[0]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna_horas[0]?.total_time : 0,
      fill: '#59B7FF'
    },
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[1]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna_horas[1]?.total_time : 0,
      fill: '#0045B5'
    },
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[2]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna_horas[2]?.total_time : 0,
      fill: '#0077E6'
    },
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[3]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna_horas[3]?.total_time : 0,
      fill: '#E2F2FF'
    },
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[4]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna_horas[4]?.total_time : 0,
      fill: '#0065D4'
    }
  ];

  const topExternalChangeHours = [
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[0]?.name : '???',
      Total:
        data && dashType === 'admin' ? data.top_alteracao_externa_horas[0]?.total_tempo : '-----',
      fill: '#59B7FF'
    },
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[1]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa_horas[1]?.total_tempo : 0,
      fill: '#0045B5'
    },
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[2]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa_horas[2]?.total_tempo : 0,
      fill: '#0077E6'
    },
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[3]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa_horas[3]?.total_tempo : 0,
      fill: '#E2F2FF'
    },
    {
      name: data && dashType === 'admin' ? data.top_alteracao_interna_horas[4]?.name : '???',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa_horas[4]?.total_tempo : 0,
      fill: '#0065D4'
    }
  ];

  const topSpotJobs = [
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[0]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot[0]?.quantidade_tarefas
          : 0,
      fill: '#59B7FF'
    },
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[1]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot[1]?.quantidade_tarefas
          : 0,
      fill: '#0045B5'
    },
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[2]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot[2]?.quantidade_tarefas
          : 0,
      fill: '#0077E6'
    },
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[3]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot[3]?.quantidade_tarefas
          : 0,
      fill: '#E2F2FF'
    },
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[4]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot[4]?.quantidade_tarefas
          : 0,
      fill: '#0065D4'
    }
  ];

  const topTenantJobs = [
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_qtd[0]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_qtd[0]?.quantidade_tarefas
          : 0,
      fill: '#59B7FF'
    },
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_qtd[1]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_qtd[1]?.quantidade_tarefas
          : 0,
      fill: '#0045B5'
    },
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_qtd[2]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_qtd[2]?.quantidade_tarefas
          : 0,
      fill: '#0077E6'
    },
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_qtd[3]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_qtd[3]?.quantidade_tarefas
          : 0,
      fill: '#E2F2FF'
    },
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_qtd[4]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_qtd[4]?.quantidade_tarefas
          : 0,
      fill: '#0065D4'
    }
  ];

  const topTenantHours = [
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_horas[0]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_horas[0]?.quantidade_tarefas
          : 0,
      fill: '#59B7FF'
    },
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_horas[1]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_horas[1]?.quantidade_tarefas
          : 0,
      fill: '#0045B5'
    },
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_horas[2]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_horas[2]?.quantidade_tarefas
          : 0,
      fill: '#0077E6'
    },
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_horas[3]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_horas[3]?.quantidade_tarefas
          : 0,
      fill: '#E2F2FF'
    },
    {
      name: data && dashType === 'executive' ? data?.top_clientes.top_tenant_horas[4]?.name : '???',
      Total:
        data && dashType === 'executive'
          ? data?.top_clientes.top_tenant_horas[4]?.quantidade_tarefas
          : 0,
      fill: '#0065D4'
    }
  ];

  const topInternalChange = [
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_interna[0]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_interna[0]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna[0]?.qtd_tarefas : 0,
      fill: '#59B7FF'
    },
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_interna[1]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_interna[1]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna[1]?.qtd_tarefas : 0,
      fill: '#0045B5'
    },
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_interna[2]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_interna[2]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna[2]?.qtd_tarefas : 0,
      fill: '#0077E6'
    },
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_interna[3]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_interna[3]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna[3]?.qtd_tarefas : 0,
      fill: '#E2F2FF'
    },
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_interna[4]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_interna[4]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_interna[4]?.qtd_tarefas : 0,
      fill: '#0065D4'
    }
  ];

  const topExternalChange = [
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_externa[0]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_externa[0]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa[0]?.qtd_tarefas : 0,
      fill: '#59B7FF'
    },
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_externa[1]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_externa[1]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa[1]?.qtd_tarefas : 0,
      fill: '#0045B5'
    },
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_externa[2]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_externa[2]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa[2]?.qtd_tarefas : 0,
      fill: '#0077E6'
    },
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_externa[3]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_externa[3]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa[3]?.qtd_tarefas : 0,
      fill: '#E2F2FF'
    },
    {
      tenant_id: data && dashType === 'admin' ? data.top_alteracao_externa[4]?.tenant_id : 0,
      name: data && dashType === 'admin' ? data.top_alteracao_externa[4]?.name : '----',
      Total: data && dashType === 'admin' ? data.top_alteracao_externa[4]?.qtd_tarefas : 0,
      fill: '#0065D4'
    }
  ];

  const topSpotTenantHours = [
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[0]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot_horas[0]?.total_tempo
          : 0,
      fill: '#59B7FF'
    },
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[1]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot_horas[1]?.total_tempo
          : 0,
      fill: '#0045B5'
    },
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[2]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot_horas[2]?.total_tempo
          : 0,
      fill: '#0077E6'
    },
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[3]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot_horas[3]?.total_tempo
          : 0,
      fill: '#E2F2FF'
    },
    {
      name: data && dashType === 'admin' ? data.clientes_spot?.top_tenant_spot[4]?.name : '???',
      Total:
        data && dashType === 'admin'
          ? data.clientes_spot?.top_tenant_spot_horas[4]?.quantidade_tarefas
          : 0,
      fill: '#0065D4'
    }
  ];

  const topCardsDataManager: CardsData[] = [
    {
      data: data ? data.total_clientes : 0,
      type: 'success',
      title: 'Total de clientes'
    },
    {
      data: data ? data.total_jobs : 0,
      type: 'jobs',
      title: 'Total Jobs'
    },
    {
      data: data ? data.alteracao_interna : 0,
      type: 'info',
      title: 'Alt. internas'
    },
    {
      data: data ? data.alteracao_externa : 0,
      type: 'danger',
      title: 'Alt. externas'
    },
    {
      data: data ? data.equipe : 0,
      type: 'team',
      title: 'Equipes'
    },
    {
      data: data ? data.contratos_fee : 0,
      type: 'jobFee',
      title: 'Jobs FEE contrato'
    },
    {
      data: data ? data.contratos_spot : 0,
      type: 'jobSpot',
      title: 'Jobs SPOT'
    },
    {
      data: data ? data.novos_contratos_fee : 0,
      type: 'newFee',
      title: 'Novos FEE contrato'
    },
    {
      data: data ? data.novos_contratos_spot : 0,
      type: 'newSpot',
      title: 'Novos Jobs SPOT'
    }
  ];

  const topCardsDataExecutive: CardsData[] = [
    {
      data: dashType === 'executive' && data ? data.total_clientes : 0,
      type: 'success',
      title: 'Total de clientes'
    },
    {
      data: dashType === 'executive' && data ? data.tarefas_pendentes_envio_qtd : 0,
      type: 'danger',
      title: 'Pendentes de envio'
    },
    {
      data: dashType === 'executive' && data ? data.tarefas_aguardando_aprovacao_qtd : 0,
      type: 'info',
      title: 'Aguardando aprovação'
    },
    {
      data: dashType === 'executive' && data ? data.ticket_pendentes : 0,
      type: 'warning',
      title: 'Tick. pendentes'
    }
  ];

  const topCardsDataTrafic: CardsData[] = [
    {
      data: dashType === 'traffic' && data ? data?.tarefas_totais : 0,
      type: 'jobs',
      title: 'Total de pautas'
    },
    {
      data: dashType === 'traffic' && data ? data?.horas_totais : 0,
      type: 'warning',
      title: 'Total de horas'
    },
    {
      data: dashType === 'traffic' && data ? data?.tempo_disponivel : 0,
      type: 'warning',
      title: 'Total de horas disponíveis'
    }
  ];

  const userCards: UserCardProps[] = [
    {
      userInfos: {
        user_name: data && dashType === 'admin' ? data.top_users[0]?.name : '',
        clientsNumber: data && dashType === 'admin' ? data.top_users[0]?.clientes : 0,
        avatar: PersonTest
      },
      tableData: {
        totalJobs: data && dashType === 'admin' ? data.top_users[0]?.tarefas_total : 0,
        pendingSend: data && dashType === 'admin' ? data.top_users[0]?.pendente : 0,
        pendingApro: data && dashType === 'admin' ? data.top_users[0]?.aguardando_aprovacao : 0,
        approved: data && dashType === 'admin' ? data.top_users[0]?.entregue : 0
      },
      mensalReport: {
        reunions: data && dashType === 'admin' ? data.top_users[0]?.reuniao : 0,
        reports: '4'
      }
    },
    {
      userInfos: {
        user_name: data && dashType === 'admin' ? data.top_users[1]?.name : '',
        clientsNumber: data && dashType === 'admin' ? data.top_users[1]?.clientes : 0,
        avatar: PersonTest
      },
      tableData: {
        totalJobs: data && dashType === 'admin' ? data.top_users[1]?.tarefas_total : 0,
        pendingSend: data && dashType === 'admin' ? data.top_users[1]?.pendente : 0,
        pendingApro: data && dashType === 'admin' ? data.top_users[1]?.aguardando_aprovacao : 0,
        approved: data && dashType === 'admin' ? data.top_users[1]?.entregue : 0
      },

      mensalReport: {
        reunions: data && dashType === 'admin' ? data.top_users[1]?.reuniao : 0,
        reports: '1'
      }
    },
    {
      userInfos: {
        user_name: data && dashType === 'admin' ? data.top_users[2]?.name : '',
        clientsNumber: data && dashType === 'admin' ? data.top_users[2]?.clientes : 0,
        avatar: PersonTest
      },
      tableData: {
        totalJobs: data && dashType === 'admin' ? data.top_users[2]?.tarefas_total : 0,
        pendingSend: data && dashType === 'admin' ? data.top_users[2]?.pendente : 0,
        pendingApro: data && dashType === 'admin' ? data.top_users[2]?.aguardando_aprovacao : 0,
        approved: data && dashType === 'admin' ? data.top_users[2]?.entregue : 0
      },
      mensalReport: {
        reunions: data && dashType === 'admin' ? data.top_users[2]?.reuniao : 0,
        reports: '1'
      }
    }
  ];

  async function getProjects(tenantId: string) {
    try {
      const response = await api.get(`/project/tenant/${tenantId}`);

      if (response.data.status === 'success') {
        setDataProjects(response.data.result);
      }
    } catch (error: any) {
      console.log('log get projects', error);
    }
  }

  async function getRequesters(tenantId: string) {
    try {
      const response = await api.get(`/user/${tenantId}`);

      if (response.data.status === 'success') {
        setRequestersData(response.data.result);
      }
    } catch (error: any) {
      console.log('log get projects', error);
    }
  }

  const handleClientSelected = (select: any) => {
    getProjects(select.value);
    getRequesters(select.value);
    setInitialValue(select);
    setData({
      client_id: select.value,
      client_name: select.label,
      contract: formData.contract,
      date_start: formData.date_start,
      date_end: formData.date_end,
      requesters: formData.requesters,
      contact_names: formData.contact_names
    });
    setErrorsForms({});
  };

  const onChange = (option: any) => {
    const dataOption = option.map((row: any) => ({ user_id: row.value }));
    const dataNames = option.map((row: any) => ({ name: row.label }));

    setData({
      client_id: formData.client_id,
      client_name: formData.client_name,
      contract: formData.contract,
      date_start: formData.date_start,
      date_end: formData.date_end,
      requesters: dataOption,
      contact_names: dataNames
    });
  };

  const removeError = (fieldName: string) => {
    setErrorsForms((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const addError = (fieldName: string, errorMessage: string) => {
    setErrorsForms((prevErrors) => ({
      ...prevErrors,
      [fieldName]: true
    }));

    addToast({
      title: 'Atenção',
      description: errorMessage,
      type: 'warning'
    });
  };

  const handleGenerateReport = () => {
    try {
      if (formData.client_id === '') {
        throw addError('client', 'Cliente é obrigatório!');
      } else {
        removeError('client');
      }

      if (formData.contract === '') {
        throw addError('contract', 'Projeto/Contrato é obrigatório!');
      } else {
        removeError('contract');
      }

      if (formData.date_start === '') {
        throw addError('date_start', 'Data inicial é obrigatória!');
      } else {
        removeError('date_start');
      }

      if (formData.date_end === '') {
        throw addError('date_end', 'Data final é obrigatória!');
      } else {
        removeError('date_end');
      }

      if (formData.requesters.length === 0) {
        throw addError('requesters', 'Clientes solicitante são obrigatórios!');
      } else {
        removeError('requesters');
      }

      if (Object.keys(errorsForm).length === 0) {
        navigate('/relatorio', { state: formData });

        setModalReport(false);

        setInitialValue({
          value: '',
          label: '',
          image: '',
          color: ''
        });

        setData({
          client_id: '',
          client_name: '',
          contact_name: '',
          contract: '',
          date_start: '',
          date_end: '',
          requesters: [],
          contact_names: []
        });
      }
    } catch (error: any) {
      console.log('log error report', error);
      // if (error.message) {
      //   addToast({
      //     title: 'Atenção',
      //     description: error?.message,
      //     type: 'warning'
      //   });
      // } else {
      //   addToast({
      //     title: 'Atenção',
      //     description: error,
      //     type: 'warning'
      //   });
      // }
    }
  };

  const handleCancelReport = () => {
    setModalReport(false);
    setData({
      client_id: '',
      client_name: '',
      contract: '',
      date_start: '',
      date_end: ''
    });
    setInitialValue({
      value: '',
      label: '',
      image: '',
      color: ''
    });
    setErrorsForms({});
  };

  // function getTenYears() {
  //   const currentYear = new Date().getFullYear();
  //   const lastTenYears = [];

  //   for (let i = currentYear; i > currentYear - 10; i--) {
  //     lastTenYears.push(i);
  //   }
  //   return lastTenYears;
  // }

  const handleNavigateTask = (infos: any) => {
    const taskId = infos?.task?.task_id;
    navigate(`/entregas/${infos.task.task_id}`, { state: taskId });
  };

  const handlePreviousPeriod = (period: string) => {
    if (period === 'year') {
      setData({
        client_id: formData.client_id,
        client_name: formData.client_name,
        contract: formData.contract,
        date_start: moment().subtract(1, 'year').format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD'),
        requesters: formData.requesters,
        contact_names: formData.contact_names
      });
    }
    if (period === 'month') {
      setData({
        client_id: formData.client_id,
        client_name: formData.client_name,
        contract: formData.contract,
        date_start: moment().subtract(1, 'month').format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD'),
        requesters: formData.requesters,
        contact_names: formData.contact_names
      });
    }
    if (period === 'week') {
      setData({
        client_id: formData.client_id,
        client_name: formData.client_name,
        contract: formData.contract,
        date_start: moment().subtract(1, 'week').format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD'),
        requesters: formData.requesters,
        contact_names: formData.contact_names
      });
    }
  };

  const hasFilters = Object.values(filter).every((obj) => obj === null || obj === '');

  // useEffect(() => {
  //   console.log('log do formData =>', formData);
  //   console.log('log errorForm =>', errorsForm);
  // }, [formData, errorsForm]);

  return (
    <Container>
      {/* {dashType === '' && (
        <div>
          <Loader />
        </div>
      )} */}

      {/* Dash Gestor */}
      {dashType === 'admin' && !isFetching && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash
            user={user.name}
            clearFilter={handleClearFilters}
            openFilter={() => setModalFilters(true)}
            openReport={() => setModalReport(true)}
            hasFilters={hasFilters}
            hasReport={true}
            filtersApplieds={filter}
          />

          {/* Cards pequenos */}
          <TopCardsDash typeCards="manager" cardsData={topCardsDataManager} />

          {/* Top clientes FEE/SPOT */}
          <GraphicLine>
            <CardBase>
              <div className="card-title">Clientes (FEE)</div>

              <BarChartGrafic
                data={topFeeTenantJobs}
                isVertical={true}
                title="Top clientes (Jobs)"
                height=""
              />

              <TableDefault
                title="Top clientes (Horas)"
                titleSize="14px"
                titleWeight="700"
                titleColor="#222"
              >
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tempo total</th>
                  </tr>
                </thead>

                <tbody>
                  {topFeeTenantHours.map((row, index: number) => (
                    <tr key={index}>
                      <td>{row.name ? row.name : ' '}</td>
                      <td>{row.Total ? row.Total : ' '}</td>
                    </tr>
                  ))}
                </tbody>
              </TableDefault>
            </CardBase>

            <CardBase>
              <div className="card-title">Clientes (SPOT)</div>

              <BarChartGrafic
                data={topSpotJobs}
                isVertical={true}
                title="Top clientes (Jobs)"
                height=""
              />

              <TableDefault
                title="Top clientes (Horas)"
                titleSize="14px"
                titleWeight="700"
                titleColor="#222"
              >
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tempo total</th>
                  </tr>
                </thead>

                <tbody>
                  {topSpotTenantHours.map((row, index: number) => (
                    <tr key={index}>
                      <td>{row.name ? row.name : ''}</td>
                      <td>{row.Total ? row.Total : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </TableDefault>

              {/* <BarChartGrafic
                data={topSpotTenantHours}
                isVertical={true}
                title="Top clientes (Horas)"
                height=""
              /> */}
            </CardBase>
          </GraphicLine>

          {/* Jobs pendentes */}
          <ContainerGroupTable>
            <TableDefault
              title="Jobs pendentes de envio"
              titleSize="14px"
              titleWeight="700"
              titleColor="#222"
            >
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Atendimento</th>
                  <th>Job</th>
                </tr>
              </thead>

              <tbody>
                {jobsAwaitingToBeSend?.slice(0, 5).map((row) => (
                  <tr key={row.id_job}>
                    <td>{row.client_name ? row.client_name : ''}</td>
                    <td>
                      {row.job_service ? row.job_service : ''}
                      {/* {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(15000)} */}
                    </td>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 12px',
                        height: '49px'
                      }}
                    >
                      {row.job_name ? row.job_name : ''}
                      {/* <JobStatus
                        className={
                          row.job_status === 'Pendente de envio'
                            ? 'status progress'
                            : row.job_status === 'na fila'
                            ? 'status'
                            : 'status finished'
                        }
                      >
                        {row.job_status}
                      </JobStatus> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableDefault>

            <TableDefault
              title="Jobs pendentes de aprovação"
              titleSize="14px"
              titleWeight="700"
              titleColor="#222"
            >
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Atendimento</th>
                  <th>Job</th>
                </tr>
              </thead>

              <tbody>
                {jobsAwaitingClientAdmin.slice(0, 5).map((row) => (
                  <tr key={row.id_job}>
                    <td>{row.client_name ? row.client_name : ''}</td>
                    <td>
                      {row.job_service ? row.job_service : ''}
                      {/* {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(15000)} */}
                    </td>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 12px',
                        height: '49px'
                      }}
                    >
                      {row.job_name ? row.job_name : ''}
                      {/* <JobStatus
                        className={
                          row.job_status === 'Pendente de envio'
                            ? 'status progress'
                            : row.job_status === 'na fila'
                            ? 'status'
                            : 'status finished'
                        }
                      >
                        {row.job_status}
                      </JobStatus> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableDefault>
          </ContainerGroupTable>

          {/* Performance de atendimento */}
          <CardBase>
            <div className="card-title">Performance do Atendimento</div>

            {userCards?.map((row: UserCardProps, index: any) => (
              <UserPerformanceCard
                key={index}
                userInfos={row.userInfos}
                tableData={row.tableData}
                mensalReport={row.mensalReport}
              />
            ))}
          </CardBase>

          {/* Detalhes dos clientes */}
          <TableDefault
            title="Clientes detalhado - (Fee)"
            titleSize="14px"
            titleWeight="700"
            titleColor="#222"
          >
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>Cliente</th>
                <th>Atendimento</th>
                <th>Horas contrato</th>
                <th>Horas trabalhadas</th>
                <th>Saldo de horas</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                dashType === 'admin' &&
                data?.top_fee_inverso.slice(0, 10).map((row: TopFeeSpot, index: number) => (
                  <tr key={index}>
                    <td>{row.client_name}</td>
                    <td>{row.atendimento ? row.atendimento : '-----'}</td>
                    <td style={{ color: '#00BFA5', fontWeight: '700' }}>{row.tempo_total}</td>
                    <td>
                      <HoursTable>{row.consumido}</HoursTable>
                    </td>
                    <td>
                      <HoursTable
                        className={
                          subtractTime(row.tempo_total, row.consumido).includes('-') ? 'minus' : ''
                        }
                      >
                        {subtractTime(row.tempo_total, row.consumido)}
                      </HoursTable>
                    </td>
                  </tr>
                ))}
            </tbody>
          </TableDefault>

          <TableDefault
            title="Clientes detalhado - (Spot)"
            titleSize="14px"
            titleWeight="700"
            titleColor="#222"
          >
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>Cliente</th>
                <th>Atendimento</th>
                <th>Horas contrato</th>
                <th>Horas trabalhadas</th>
                <th>Saldo de horas</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                dashType === 'admin' &&
                data.top_spot_inverso.map((row: TopFeeSpot, index: number) => (
                  <tr key={index}>
                    <td>{row.client_name}</td>
                    <td>{row.atendimento ? row.atendimento : '-----'}</td>
                    <td style={{ color: '#00BFA5', fontWeight: '700' }}>{row.tempo_total}</td>
                    <td>
                      <HoursTable>{row.consumido}</HoursTable>
                    </td>
                    <td>
                      <HoursTable
                        className={
                          subtractTime(row.tempo_total, row.consumido).includes('-') ? 'minus' : ''
                        }
                      >
                        {subtractTime(row.tempo_total, row.consumido)}
                      </HoursTable>
                    </td>
                  </tr>
                ))}
            </tbody>
          </TableDefault>

          {/* Alterações interna e externa */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <CardBase>
              <div className="card-title">Alterações Internas (Jobs)</div>
              <BarChartGrafic data={topInternalChange} isVertical={true} height="" />
            </CardBase>

            <CardBase>
              <div className="card-title">Alterações Clientes (Jobs)</div>
              <BarChartGrafic data={topExternalChange} isVertical={true} height="" />
            </CardBase>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <CardBase>
              <TableDefault
                title="Alterações Internas (Horas)"
                titleSize="14px"
                titleWeight="700"
                titleColor="#222"
              >
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tempo total</th>
                  </tr>
                </thead>

                <tbody>
                  {topInternalChangesHours.map((row, index: number) => (
                    <tr key={index}>
                      <td>{row.name ? row.name : ''}</td>
                      <td>{row.Total ? row.Total : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </TableDefault>
            </CardBase>
            {/* <CardBase>
              <div className="card-title"></div>
              <BarChartGrafic data={topTenantJobs} isVertical={true} height="" />
            </CardBase> */}

            <CardBase>
              <TableDefault
                title="Alterações Clientes (Horas)"
                titleSize="14px"
                titleWeight="700"
                titleColor="#222"
              >
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tempo total</th>
                  </tr>
                </thead>

                <tbody>
                  {topExternalChangeHours.map((row, index: number) => (
                    <tr key={index}>
                      <td>{row.name ? row.name : ''}</td>
                      <td>{row.Total ? row.Total : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </TableDefault>
            </CardBase>

            {/* <CardBase>
              <div className="card-title">Alterações Clientes (Horas)</div>
              <BarChartGrafic data={topTenantJobs} isVertical={true} height="" />
            </CardBase> */}
          </div>

          {/* Monitoramento do time - tabela */}
          <CardBase>
            <div className="card-title">Monitoramento do time</div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <ContainerGroupTable style={{ width: '100%' }}>
                <TableDefault title="">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Time</th>
                      <th>Job</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data &&
                      dashType === 'admin' &&
                      data?.top_team.usuarios.map((row: TeamOverview) => (
                        <tr key={row.user_id}>
                          <td>{row.cliente}</td>
                          <td>{row.name}</td>
                          <td>{row.tarefa}</td>
                          {row.trabalho !== 'Na Fila' && (
                            <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                              {row.trabalho}
                            </td>
                          )}
                          {row.trabalho === 'Na Fila' && (
                            <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                              {row.trabalho}
                            </td>
                          )}
                        </tr>
                      ))}
                  </tbody>
                </TableDefault>
              </ContainerGroupTable>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <NumberCard>
                  <CountUp
                    start={0}
                    end={
                      data && dashType === 'admin' && data?.top_team?.total?.total_tarefas !== 0
                        ? data?.top_team?.total?.total_tarefas
                        : 0
                    }
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">pautas</div>
                </NumberCard>
                <NumberCard>
                  <CountUp
                    start={0}
                    end={
                      data && dashType === 'admin' && data?.top_team?.total?.total_horas !== 0
                        ? data?.top_team?.total?.total_horas.split(':')[0]
                        : 0
                    }
                    delay={0}
                  >
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">horas</div>
                </NumberCard>
              </div>
            </div>
          </CardBase>

          {/* Monitoramente do time - users */}
          <CardBase>
            <div className="card-title">Monitoramento do time</div>
            <GridServiceWrapper>
              <UserInfo>
                <div className="user-image" style={{ backgroundImage: `url(${PersonTest})` }} />
                <div className="user-name">
                  Mike
                  <span>12 clientes</span>
                </div>
              </UserInfo>

              <ContainerGroupTable style={{ width: '100%' }}>
                <TableDefault title="">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Job</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>CNH</td>
                      <td>Posts</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Terex</td>
                      <td>Banners</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td> */}
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Metso</td>
                      <td>Tarefa 01</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>21BRZ</td>
                      <td>Posts agendados</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>LinkBelt</td>
                      <td>Banners</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                  </tbody>
                </TableDefault>
              </ContainerGroupTable>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <NumberCard height_size={'82px'}>
                  <CountUp start={0} end={87} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">pautas</div>
                </NumberCard>

                <NumberCard height_size={'82px'}>
                  <CountUp start={0} end={290} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">horas</div>
                </NumberCard>

                <NumberCard height_size={'82px'}>
                  <CountUp start={0} end={12} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">horas disponíveis</div>
                </NumberCard>
              </div>
            </GridServiceWrapper>

            <GridServiceWrapper>
              <UserInfo>
                <div className="user-image" style={{ backgroundImage: `url(${PersonTest})` }} />
                <div className="user-name">
                  Fernanda
                  <span>10 clientes</span>
                </div>
              </UserInfo>

              <ContainerGroupTable style={{ width: '100%' }}>
                <TableDefault title="">
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Job</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>CNH</td>
                      <td>Posts</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td> */}
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>21BRZ</td>
                      <td>Post Instagram</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Diolaser</td>
                      <td>Redes Sociais</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Terex</td>
                      <td>Tarefa X</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td> */}
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Blue Dental</td>
                      <td>Posts agendados</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                  </tbody>
                </TableDefault>
              </ContainerGroupTable>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <NumberCard height_size={'76px'}>
                  <CountUp start={0} end={87} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">pautas</div>
                </NumberCard>

                <NumberCard height_size={'76px'}>
                  <CountUp start={0} end={290} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">horas</div>
                </NumberCard>

                <NumberCard height_size={'82px'}>
                  <CountUp start={0} end={12} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">horas disponíveis</div>
                </NumberCard>
              </div>
            </GridServiceWrapper>
          </CardBase>

          {/* Monitoramento Atendimento */}
          <CardBase>
            <div className="card-title">Monitoramento Do Time - Ranking Atendimento</div>

            <TableDefault title="" titleSize="14px" titleWeight="700" titleColor="#222">
              <thead>
                <tr>
                  <th style={{ minWidth: '180px' }}>Ranking</th>
                  <th>Atendimento</th>
                  <th>Jobs totais</th>
                  <th>Horas totais</th>
                  <th>Jobs sem alteração</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1º</td>
                  <td>?????</td>
                  <td>?????</td>
                  <td>?????</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>2º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>??</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>3º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>4º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>5º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
              </tbody>
            </TableDefault>
          </CardBase>

          {/* Monitoramento criativo */}
          <CardBase>
            <div className="card-title">Monitoramento Do Time - Ranking Criativo</div>

            <TableDefault title="" titleSize="14px" titleWeight="700" titleColor="#222">
              <thead>
                <tr>
                  <th style={{ minWidth: '180px' }}>Ranking</th>
                  <th>Criativo</th>
                  <th>Jobs totais</th>
                  <th>Horas totais</th>
                  <th>Jobs sem alteração</th>
                </tr>
              </thead>

              <tbody>
                {data.time_criacao.map((row: any, index: number) => (
                  <tr key={row.user_id}>
                    <td>{index + 1}º</td>
                    <td>{row.name}</td>
                    <td>{row.total_tarefas}</td>
                    <td>{row.total_tempo}</td>
                    <td style={{ color: '#00BFA5', fontWeight: '700' }}>
                      {row.aprovadas_sem_revisao}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableDefault>
          </CardBase>

          {/* Monitoramento jobs entregues */}
          <TableDefault
            title="Monitoramento jobs entregues"
            titleSize="14px"
            titleWeight="700"
            titleColor="#222"
          >
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Criativo</th>
                <th>Job</th>
                <th>Status</th>
                <th>Pausas</th>
                <th>Hora - Plan</th>
                <th>Hora - Real</th>
                <th>Data início</th>
                <th>Data final</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                dashType === 'admin' &&
                data?.task_conclude.map((row: TaskConclude) => (
                  <tr key={row.task_id}>
                    <td>{row.cliente}</td>
                    <td>{row.ultimo_usuario}</td>
                    <td>{row.tarefa}</td>
                    <td>{row.status}</td>
                    <td>{row.qts_pausas}</td>
                    <td style={{ minWidth: '125px' }}>{row.hora_estimada}</td>
                    <td style={{ minWidth: '125px' }}>{row.hora_real}</td>
                    <td>{moment(row.data_inicio).format('DD/MM/YYYY')}</td>
                    <td>{moment(row.data_final).format('DD/MM/YYYY')}</td>
                  </tr>
                ))}
            </tbody>
          </TableDefault>

          {/* Performance por cliente - Tabela */}
          <TableDefault
            title="Performance por cliente"
            titleSize="14px"
            titleWeight="700"
            titleColor="#222"
          >
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Atendimento</th>
                <th>Contrato (fee)</th>
                <th>Realizado (jobs)</th>
                <th>Realizado (horas)</th>
                <th>Saldo Horas</th>
                <th>Reuniões</th>
                <th>Reportes</th>
                <th>Tempo médio</th>
                <th>Pendentes aprov.</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
              </tr>
              <tr>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
                <td>?????</td>
              </tr>
            </tbody>
          </TableDefault>

          {/* Performance por cliente */}
          {data?.overview_best_tenants.map((row: OverviewTenant, index: number) => (
            <CardBase key={index}>
              <div className="title-with-back">CLIENTE: {row.name}</div>

              <BulletsClientWrapper>
                <BulletPointInfos>
                  <div className="bullet">
                    Total jobs: <span>{row.quantidade_tarefas}</span>
                  </div>
                  <div className="bullet">
                    Total horas: <span>{row.hora}</span>
                  </div>
                  <div className="bullet">
                    Alteração interna: <span>???</span>
                  </div>
                  <div className="bullet">
                    Alteração cliente: <span>???</span>
                  </div>
                  <div className="bullet">
                    Reuniões: <span>{row.meetings}</span>
                  </div>
                  <div className="bullet">
                    Reports enviados: <span>???</span>
                  </div>
                </BulletPointInfos>

                <BulletPointInfos>
                  <div className="bullet">
                    Jobs em andamento: <span>{row.em_andamento}</span>
                  </div>
                  <div className="bullet">
                    Pendente de aprovação: <span>{row.aguardando_aprovacao}</span>
                  </div>
                  <div className="bullet">
                    Pendente de envio: <span>{row.pendente}</span>
                  </div>
                  <div className="bullet">
                    Tempo médio de aprovação: <span>??? dias</span>
                  </div>
                </BulletPointInfos>

                <BulletPointInfos>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginBottom: '22px'
                    }}
                  >
                    <div className="bullet">
                      Contrato Fee: <span>{row.contratos_fee.total_tempo}</span>
                    </div>
                    <div className="bullet">
                      Saldo Contrato: <span>{row.contratos_fee.saldo}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="bullet">
                      Contrato Spot: <span>{row.contratos_spot.total_tempo}</span>
                    </div>
                    <div className="bullet">
                      Saldo Spot: <span>{row.contratos_spot.saldo}</span>
                    </div>
                  </div>
                </BulletPointInfos>
              </BulletsClientWrapper>
            </CardBase>
          ))}
        </SectionDefault>
      )}

      {/* Dash executivo */}
      {dashType === 'executive' && !isFetching && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash
            user={user.name}
            clearFilter={handleClearFilters}
            openFilter={() => setModalFilters(true)}
            hasFilters={hasFilters}
            hasReport={false}
            filtersApplieds={filter}
          />

          {/* Cards pequenos */}
          <TopCardsDash typeCards="executive" cardsData={topCardsDataExecutive} />

          {/* Jobs pendentes e aprovações */}
          <ContainerGroupTable>
            <TableDefault
              title="Jobs pendentes de envio"
              titleSize="14px"
              titleWeight="700"
              titleColor="#222"
            >
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Job</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data?.tarefas_pendentes_envio.slice(0, 5).map((row: any) => (
                  <tr key={row.id_job}>
                    <td>{row.client_name}</td>
                    <td>{row.job_name}</td>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 12px',
                        height: '49px'
                      }}
                    >
                      {row.job_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableDefault>

            <TableDefault
              title="Jobs aguardando aprovação do cliente"
              titleSize="14px"
              titleWeight="700"
              titleColor="#222"
            >
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Job</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data?.tarefas_aguardando_aprovacao.slice(0, 5).map((row: any) => (
                  <tr key={row.id_job}>
                    <td>{row.client_name}</td>
                    <td>{row.job_name}</td>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 12px',
                        height: '49px'
                      }}
                    >
                      {row.job_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableDefault>
          </ContainerGroupTable>

          {/* Performance cliente - tabela */}
          <CardBase>
            <div className="card-title">Performance por cliente</div>

            <TableDefault title="" titleSize="14px" titleWeight="700" titleColor="#222">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Job</th>
                  <th>Fluxo</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data.performace_tenant.map((row: any, index: number) => (
                  <tr key={index}>
                    <td>{row.tenant}</td>
                    <td>{row.task}</td>
                    <td>{row.flow}</td>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 12px',
                        height: '49px'
                      }}
                    >
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableDefault>
          </CardBase>

          {/* Performance por Cliente */}
          {data?.overview_best_tenants.map((row: OverviewTenant, index: number) => (
            <CardBase key={index}>
              <div className="title-with-back">CLIENTE: {row.name}</div>

              <BulletsClientWrapper>
                <BulletPointInfos>
                  <div className="bullet">
                    Total jobs: <span>{row.quantidade_tarefas}</span>
                  </div>
                  <div className="bullet">
                    Total horas: <span>{row.hora}</span>
                  </div>
                  <div className="bullet">
                    Alteração interna: <span>???</span>
                  </div>
                  <div className="bullet">
                    Alteração cliente: <span>???</span>
                  </div>
                  <div className="bullet">
                    Reuniões: <span>{row.meetings}</span>
                  </div>
                  <div className="bullet">
                    Reports enviados: <span>???</span>
                  </div>
                </BulletPointInfos>

                <BulletPointInfos>
                  <div className="bullet">
                    Jobs em andamento: <span>{row.em_andamento}</span>
                  </div>
                  <div className="bullet">
                    Pendente de aprovação: <span>{row.aguardando_aprovacao}</span>
                  </div>
                  <div className="bullet">
                    Pendente de envio: <span>{row.pendente}</span>
                  </div>
                  <div className="bullet">
                    Tempo médio de aprovação: <span>??? dias</span>
                  </div>
                </BulletPointInfos>

                <BulletPointInfos>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginBottom: '22px'
                    }}
                  >
                    <div className="bullet">
                      Contrato Fee: <span>{row.contratos_fee.total_tempo}</span>
                    </div>
                    <div className="bullet">
                      Saldo Contrato: <span>{row.contratos_fee.saldo}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="bullet">
                      Contrato Spot: <span>{row.contratos_spot.total_tempo}</span>
                    </div>
                    <div className="bullet">
                      Saldo Spot: <span>{row.contratos_spot.saldo}</span>
                    </div>
                  </div>
                </BulletPointInfos>
              </BulletsClientWrapper>
            </CardBase>
          ))}

          {/* Top clientes Jobs/Horas */}
          <CardBase>
            <div className="card-title">Top Clientes</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BarChartGrafic
                data={topTenantJobs}
                isVertical={true}
                title="Top clientes (Jobs)"
                height=""
              />
              <BarChartGrafic
                data={topTenantHours}
                isVertical={true}
                title="Top clientes (Horas)"
                height=""
              />
            </div>
          </CardBase>
        </SectionDefault>
      )}

      {/* Dash tráfego */}
      {dashType === 'traffic' && !isFetching && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash
            user={user.name}
            clearFilter={handleClearFilters}
            openFilter={() => setModalFilters(true)}
            hasFilters={hasFilters}
            hasReport={false}
            filtersApplieds={filter}
          />

          {/* Cards pequenos */}
          <TopCardsDash typeCards="traffic" cardsData={topCardsDataTrafic} />

          {/* Listagem de jobs */}
          <ContainerGroupTable>
            <TableDefault
              title="Lista de Jobs"
              titleSize="14px"
              titleWeight="700"
              titleColor="#222"
            >
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Time</th>
                  <th>Job</th>
                  <th>Status</th>
                  <th>Natureza</th>
                </tr>
              </thead>

              <tbody>
                {data.listagem_de_jobs?.map((row: JobsList) => (
                  <tr key={row.task_id}>
                    <td>{row.tenant}</td>
                    <td>???</td>
                    <td>{row.task}</td>
                    <td
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '6px 12px',
                        height: '49px'
                      }}
                    >
                      <JobStatus
                        className={
                          row.status === 'Em andamento'
                            ? 'status progress'
                            : row.status === 'Na Fila'
                            ? 'status'
                            : 'status finished'
                        }
                      >
                        {row.status}
                      </JobStatus>
                    </td>
                    <td>{row.natureza}</td>
                  </tr>
                ))}
              </tbody>
            </TableDefault>
          </ContainerGroupTable>

          {/* Monitoramento do time individual */}
          <CardBase>
            <div className="card-title">Monitoramento do time individual</div>
            {data?.monitoramento_time_individual.map((row: any, index: number) => (
              <UserTeamCard key={index}>
                <div className="user-section">
                  <div className="user-image" style={{ backgroundImage: `url(${PersonTest})` }} />
                  <div className="user-infos">
                    {row.name}
                    {/* <span>Clientes alocados: {row.alocados}</span> */}
                    <span>Clientes alocados: ??</span>
                  </div>
                </div>

                <ContainerGroupTable>
                  <TableDefault title="" titleSize="14px" titleWeight="700" titleColor="#222">
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Job</th>
                        <th>Status</th>
                        <th>Natureza</th>
                      </tr>
                    </thead>

                    <tbody>
                      {row.tarefas?.map((row: any) => (
                        <tr key={row.id_job}>
                          <td>{row.client_name}</td>
                          <td>{row.job_name}</td>
                          <td
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '6px 12px',
                              height: '49px'
                            }}
                          >
                            <JobStatus
                              className={
                                row.job_status === 'Em andamento'
                                  ? 'status progress'
                                  : row.job_status === 'Na fila'
                                  ? 'status'
                                  : 'status finished'
                              }
                            >
                              {row.job_status}
                            </JobStatus>
                          </td>
                          <td>{row.job_type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </TableDefault>
                </ContainerGroupTable>

                <UserJobs>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <NumberCard height_size={'155px'}>
                      <CountUp start={0} end={row.total_hours} delay={0}>
                        {({ countUpRef }) => (
                          <div>
                            <span className="numberCard" ref={countUpRef} />
                          </div>
                        )}
                      </CountUp>
                      <div className="numberCard-title">Total horas trabalhadas</div>
                    </NumberCard>

                    <NumberCard height_size={'155px'}>
                      <CountUp start={0} end={18} delay={0}>
                        {({ countUpRef }) => (
                          <div>
                            <span className="numberCard" ref={countUpRef} />
                          </div>
                        )}
                      </CountUp>
                      <div className="numberCard-title">Total horas disponíveis</div>
                    </NumberCard>
                  </div>
                </UserJobs>
              </UserTeamCard>
            ))}
          </CardBase>

          {/* Monitoramento jobs entregues */}
          <TableDefault
            title="Monitoramento jobs entregues"
            titleSize="14px"
            titleWeight="700"
            titleColor="#222"
          >
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Criativo</th>
                <th>Job</th>
                <th>Status</th>
                <th>Pausas</th>
                <th>Hora - Plan</th>
                <th>Hora - Real</th>
                <th>Data início</th>
                <th>Data final</th>
              </tr>
            </thead>

            <tbody>
              {data?.jobs_finalizados.map((row: any, index: number) => (
                <tr key={index}>
                  <td>21 Live | Cliente</td>
                  <td>Amanda</td>
                  <td>Teste</td>
                  <td>Entregue</td>
                  <td>3</td>
                  <td>5H</td>
                  <td>4H</td>
                  <td>15/10/2023</td>
                  <td>17/10/2023</td>
                </tr>
              ))}
            </tbody>
          </TableDefault>

          {/* Performance por cliente */}
          {data?.overview_best_tenants.map((row: OverviewTenant, index: number) => (
            <CardBase key={index}>
              <div className="title-with-back">CLIENTE: {row.name}</div>

              <BulletsClientWrapper>
                <BulletPointInfos>
                  <div className="bullet">
                    Total jobs: <span>{row.quantidade_tarefas}</span>
                  </div>
                  <div className="bullet">
                    Total horas: <span>{row.hora}</span>
                  </div>
                  <div className="bullet">
                    Alteração interna: <span>???</span>
                  </div>
                  <div className="bullet">
                    Alteração cliente: <span>???</span>
                  </div>
                  <div className="bullet">
                    Reuniões: <span>{row.meetings}</span>
                  </div>
                  <div className="bullet">
                    Reports enviados: <span>???</span>
                  </div>
                </BulletPointInfos>

                <BulletPointInfos>
                  <div className="bullet">
                    Jobs em andamento: <span>{row.em_andamento}</span>
                  </div>
                  <div className="bullet">
                    Pendente de aprovação: <span>{row.aguardando_aprovacao}</span>
                  </div>
                  <div className="bullet">
                    Pendente de envio: <span>{row.pendente}</span>
                  </div>
                  <div className="bullet">
                    Tempo médio de aprovação: <span>??? dias</span>
                  </div>
                </BulletPointInfos>

                <BulletPointInfos>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginBottom: '22px'
                    }}
                  >
                    <div className="bullet">
                      Contrato Fee: <span>{row.contratos_fee.total_tempo}</span>
                    </div>
                    <div className="bullet">
                      Saldo Contrato: <span>{row.contratos_fee.saldo}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="bullet">
                      Contrato Spot: <span>{row.contratos_spot.total_tempo}</span>
                    </div>
                    <div className="bullet">
                      Saldo Spot: <span>{row.contratos_spot.saldo}</span>
                    </div>
                  </div>
                </BulletPointInfos>
              </BulletsClientWrapper>
            </CardBase>
          ))}
        </SectionDefault>
      )}

      {/* Dash operador */}
      {dashType === 'operator' && !isFetching && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash
            user={user.name}
            clearFilter={handleClearFilters}
            openFilter={() => setModalFilters(true)}
            hasFilters={hasFilters}
            hasReport={false}
            filtersApplieds={filter}
          />

          {/* Top cards */}
          <OperatorTopWrapper>
            <SmallCardsWrapper>
              <CardDataDash data={999} type="jobSpot" description="Pautas entregues" />
              <CardDataDash
                data={data?.horas_realizadas}
                type="creation"
                description="Horas de criação"
              />
              <CardDataDash
                data={data?.alteracao_interna}
                type="info"
                description="Alt. Internas"
              />
              <CardDataDash
                data={data?.alteracao_externa}
                type="danger"
                description="Alt. Clientes"
              />
              <CardDataDash data={999} type="warning" description="Horas disponíveis" />
              <CardDataDash data={data?.jobs_na_fila} type="jobs" description="Jobs na fila" />
              <CardDataDash data={data?.produtos} type="newFee" description="Total de produtos" />
              <CardDataDash
                data={data?.horas_na_fila}
                type="warning"
                description="Total horas na fila"
              />
            </SmallCardsWrapper>
          </OperatorTopWrapper>

          {/* Listagem de jobs */}
          <TaskTable
            data={dataTasks ? dataTasks : []}
            loading={isLoading}
            searchInput={(value: any) => {
              setSearchTerm(value);
              debouncedCallback(value);
            }}
            searchInfo={searchTerm}
            addFilter={''}
            taskSelected={handleNavigateTask}
            pages={pages}
            pageSelected={setSelected}
            orderSelected={setTaskOrder}
          />
        </SectionDefault>
      )}

      {/* Modal filters */}
      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={handleApplyFilters}
        clearFilters={handleClearFilters}
        filterType="dash"
      />

      {/* Modal loading submit */}
      <ModalLoader isOpen={isFetching} />

      {/* Modal report */}
      <ModalDefault isOpen={modalReport} onOpenChange={handleCancelReport} title="Gerar relatório">
        <ModalReportWrapper>
          <ModalField>
            <SelectImage
              label={'Cliente'}
              dataOptions={clientsOptions}
              value={initialValue.value !== '' ? initialValue : null}
              onChange={handleClientSelected}
              placeholder={'Selecione o cliente...'}
              error={
                errorsForm.client || errorsForm.allFields ? 'Cliente é obrigatório!' : undefined
              }
            />
          </ModalField>

          <ModalField>
            <SelectDefault
              label="Projeto/Contrato"
              name="contract"
              value={formData.contract}
              onChange={(e) => {
                handleOnChange(e);
                removeError('contract');
              }}
              error={errorsForm.contract || errorsForm.allFields ? 'Contrato é obrigatório!' : ''}
            >
              {dataProjects?.map((row: any) => (
                <option key={row.project_id} value={row.project_id}>
                  {row.title}
                </option>
              ))}
            </SelectDefault>
          </ModalField>

          <ModalField>
            <InputMultipleSelect
              name="members"
              options={requestersData?.map((row) => ({
                value: row.user_id,
                label: row.name
              }))}
              label="Cliente solicitante"
              isDisabled={formData.requesters ? false : true}
              onChange={(option) => onChange(option)}
              defaultValue={defaultOptionsTeam?.map((row) => ({
                value: row.user_id,
                label: row.name
              }))}
              alert="Selecione pelo menos um Responsável"
              error={
                errorsForm.requesters || errorsForm.allFields
                  ? 'Clientes solicitantes são obrigatórios!'
                  : ''
              }
            />
            {/* <SelectDefault
              label="Solicitante"
              name="requesters"
              value={formData.requesters}
              onChange={(e) => {
                handleOnChange(e);
                removeError('requesters');
              }}
              error={
                errorsForm.requesters || errorsForm.allFields ? 'Solicitante é obrigatório!' : ''
              }
            >
              {requestersData?.map((row) => (
                <option key={row.user_id} value={row.tenant_id}>
                  {row.name}
                </option>
              ))}
            </SelectDefault> */}
          </ModalField>

          <ModalField>
            <div className="period">Sugestões de período:</div>
            <ButtonDefault
              typeButton="primary"
              isOutline
              onClick={() => handlePreviousPeriod('year')}
            >
              Ultimo ano
            </ButtonDefault>

            <ButtonDefault
              typeButton="primary"
              isOutline
              onClick={() => handlePreviousPeriod('month')}
            >
              Ultimo Mês
            </ButtonDefault>

            <ButtonDefault
              typeButton="primary"
              isOutline
              onClick={() => handlePreviousPeriod('week')}
            >
              Ultima Semana
            </ButtonDefault>
          </ModalField>

          <ModalField>
            <InputDefault
              label="Data inicial"
              placeholder="00/00/0000"
              name="date_start"
              type="date"
              max={'9999-12-31'}
              icon={BiCalendar}
              onChange={(e) => {
                handleOnChange(e);
                removeError('date_start');
              }}
              value={formData.date_start}
              // onKeyDown={handleKeyDown}
              error={
                errorsForm.date_start || errorsForm.allFields ? 'Data inicial é obrigatória!' : ''
              }
            />

            <InputDefault
              label="Data final"
              placeholder="00/00/0000"
              name="date_end"
              type="date"
              max={'9999-12-31'}
              icon={BiCalendar}
              onChange={(e) => {
                handleOnChange(e);
                removeError('date_end');
              }}
              value={formData.date_end}
              // onKeyDown={handleKeyDown}
              error={errorsForm.date_end || errorsForm.allFields ? 'Data final obrigatória' : ''}
            />
          </ModalField>

          <ModalButtons>
            <ButtonDefault typeButton="dark" isOutline onClick={handleCancelReport}>
              Descartar
            </ButtonDefault>

            <ButtonDefault typeButton="primary" onClick={handleGenerateReport}>
              Gerar
            </ButtonDefault>
          </ModalButtons>
        </ModalReportWrapper>
      </ModalDefault>
    </Container>
  );
}
