/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
// React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useAuth } from '../../hooks/AuthContext';
import { useFetch } from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';

// Components
import { CardWelcomeDash } from '../../components/Cards/CardWelcomeDash';
import BarChartGrafic from '../../components/GraphicsChart/BarChartGrafic';
import { TableDefault } from '../../components/TableDefault';
import { ContainerGroupTable, SectionDefault } from '../../components/UiElements/styles';
import TopCardsDash, { CardsData } from '../../components/Cards/DashboardTopCards';
import Loader from '../../components/LoaderSpin';
import UserPerformanceCard, { UserCardProps } from '../../components/Cards/UserPerformanceCard';
import { CardDataDash } from '../../components/Cards/CardDataDash';
import FilterModal from '../../components/Ui/FilterModal';
import ModalDefault from '../../components/Ui/ModalDefault';
import SelectImage from '../../components/Inputs/SelectWithImage';
import { SelectDefault } from '../../components/Inputs/SelectDefault';
import { ModalButtons } from '../Tasks/ViewTask/styles';
import ButtonDefault from '../../components/Buttons/ButtonDefault';

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
  TdColor,
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

// Types
import { ServicesProps } from '../../types';

// interface DashType {
//   typeDash: 'admin' | 'executive' | 'traffic' | 'operator' | '';
// }

interface JobsList {
  id_job: number;
  client_name: string;
  team: string;
  job_name: string;
  job_status: string;
  job_type: string;
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
  client: string;
  contract: string;
  month: string;
  year: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    fromDate: '',
    toDate: ''
  });
  const { formData, handleOnChange, setFormValue, setData } = useForm({
    client: '',
    contract: '',
    month: '',
    year: ''
  } as ReportForm);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [dataProjects, setDataProjects] = useState<ServicesProps[]>([]);
  const [dashType, setDashType] = useState<string>('admin');
  const { data, fetchData, isFetching } = useFetch<any>(
    `/dashboard?date_start=${filter.fromDate}&date_end=${filter.toDate}&dash=${dashType}`
  );
  const [modalFilters, setModalFilters] = useState<boolean>(false);
  const [modalReport, setModalReport] = useState<boolean>(false);

  const clientsOptions = dataClient?.map((row) => {
    return {
      value: row.tenant_id,
      label: row.name,
      image: row.bucket,
      color: row.colormain
    };
  });

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

  const monthsArray = [
    {
      id: '01',
      month_name: 'Janeiro'
    },
    {
      id: '02',
      month_name: 'Fevereiro'
    },
    {
      id: '03',
      month_name: 'Março'
    },
    {
      id: '04',
      month_name: 'Abril'
    },
    {
      id: '05',
      month_name: 'Maio'
    },
    {
      id: '06',
      month_name: 'Junho'
    },
    {
      id: '07',
      month_name: 'Julho'
    },
    {
      id: '08',
      month_name: 'Agosto'
    },
    {
      id: '09',
      month_name: 'Setembro'
    },
    {
      id: '10',
      month_name: 'Outubro'
    },
    {
      id: '11',
      month_name: 'Novembro'
    },
    {
      id: '12',
      month_name: 'Dezembro'
    }
  ];

  const ten_years = getTenYears();

  // const dataStatusAll = [
  //   {
  //     name: 'Atrasada',
  //     Total: data ? data.tarefas_quantidade.por_status.atrasada : 0,
  //     fill: '#D92D20'
  //   },
  //   {
  //     name: 'Pendente',
  //     Total: data ? data.tarefas_quantidade.por_status.pendente : 0,
  //     fill: '#FDB022'
  //   },
  //   {
  //     name: 'Criação',
  //     Total: data ? data.tarefas_quantidade.por_status.em_andamento : 0,
  //     fill: '#0045B5'
  //   },
  //   {
  //     name: 'Entregue',
  //     Total: data ? data.tarefas_quantidade.por_status.concluido : 0,
  //     fill: '#00A063'
  //   }
  //   // {
  //   //   name: 'Cancelado',
  //   //   pv: data ? data.tarefas_quantidade.por_status.concluido : 0,
  //   //   fill: '#D92D20'
  //   // },
  // ];

  const jobsData = [
    {
      id_job: 0,
      client_name: '?????',
      job_name: '?????',
      job_flow: '?????',
      job_status: '?????'
    },
    {
      id_job: 1,
      client_name: '?????',
      job_name: '?????',
      job_flow: '?????',
      job_status: '?????'
    },
    {
      id_job: 2,
      client_name: '?????',
      job_name: '?????',
      job_flow: 'Mídia',
      job_status: '?????'
    },
    {
      id_job: 3,
      client_name: '?????',
      job_name: '?????',
      job_flow: '?????',
      job_status: '?????'
    },
    {
      id_job: 4,
      client_name: '?????',
      job_name: '?????',
      job_flow: '?????',
      job_status: '?????'
    },
    {
      id_job: 7,
      client_name: 'Phoenix Co.',
      job_name: 'Project Alpha',
      job_flow: 'Development',
      job_status: 'In Progress'
    },
    {
      id_job: 12,
      client_name: 'Stellar Innovations',
      job_name: 'Design Challenge',
      job_flow: 'Creative',
      job_status: 'Pending Approval'
    },
    {
      id_job: 19,
      client_name: 'Quantum Dynamics',
      job_name: 'Quantum Research',
      job_flow: 'Research',
      job_status: 'Awaiting Review'
    },
    {
      id_job: 25,
      client_name: 'Galactic Systems',
      job_name: 'Space Exploration',
      job_flow: 'Mission Planning',
      job_status: 'Scheduled'
    },
    {
      id_job: 31,
      client_name: 'Tech Nexus',
      job_name: 'AI Integration',
      job_flow: 'Implementation',
      job_status: 'Completed'
    }
  ];

  const jobsAwaitingClient = [
    {
      id_job: 0,
      client_name:
        data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[0]?.name : '',
      job_name: data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[0]?.title : '',
      job_status: 'Pendente de envio'
    },
    {
      id_job: 1,
      client_name:
        data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[1]?.name : '',
      job_name: data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[1]?.title : '',
      job_status: 'Pendente de envio'
    },
    {
      id_job: 2,
      client_name:
        data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[2]?.name : '',
      job_name: data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[2]?.title : '',
      job_status: 'Pendente de envio'
    },
    {
      id_job: 3,
      client_name:
        data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[3]?.name : '',
      job_name: data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[3]?.title : '',
      job_status: 'Pendente de envio'
    },
    {
      id_job: 4,
      client_name:
        data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[4]?.name : '',
      job_name: data && dashType === 'executive' ? data.tarefas_aguardando_aprovacao[4]?.title : '',
      job_status: 'Pendente de envio'
    }
  ];

  const topTenantJobs = [
    {
      name: data ? data.top_tenant[0]?.name : '',
      Total: data ? data.top_tenant[0]?.total : 0,
      fill: '#59B7FF'
    },
    {
      name: data ? data.top_tenant[1]?.name : '',
      Total: data ? data.top_tenant[1]?.total : 0,
      fill: '#0045B5'
    },
    {
      name: data ? data.top_tenant[2]?.name : '',
      Total: data ? data.top_tenant[2]?.total : 0,
      fill: '#0077E6'
    },
    {
      name: data ? data.top_tenant[3]?.name : '',
      Total: data ? data.top_tenant[3]?.total : 0,
      fill: '#E2F2FF'
    },
    {
      name: data ? data.top_tenant[4]?.name : '',
      Total: data ? data.top_tenant[4]?.total : 0,
      fill: '#0065D4'
    }
  ];

  const topTenantHours = [
    {
      name: data ? data.top_horas[0]?.name : '',
      Total: data ? Number(data.top_horas[0]?.totalTimeSum.split(':')[0]) : 0,
      fill: '#59B7FF'
    },
    {
      name: data ? data.top_horas[1]?.name : '',
      Total: data ? Number(data.top_horas[1]?.totalTimeSum.split(':')[0]) : 0,
      fill: '#0045B5'
    },
    {
      name: data ? data.top_horas[2]?.name : '',
      Total: data ? Number(data.top_horas[2]?.totalTimeSum.split(':')[0]) : 0,
      fill: '#0077E6'
    },
    {
      name: data ? data.top_horas[3]?.name : '',
      Total: data ? Number(data.top_horas[3]?.totalTimeSum.split(':')[0]) : 0,
      fill: '#E2F2FF'
    },
    {
      name: data ? data.top_horas[4]?.name : '',
      Total: data ? Number(data.top_horas[4]?.totalTimeSum.split(':')[0]) : 0,
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
      data: data ? data.tarefas_quantidade.total : 0,
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
      data: 42,
      type: 'success',
      title: 'Total de clientes'
    },
    {
      data: 443,
      type: 'danger',
      title: 'Pendentes de envio'
    },
    {
      data: 46,
      type: 'info',
      title: 'Aguardando aprovação'
    },
    {
      data: 12,
      type: 'warning',
      title: 'Tick. pendentes'
    }
  ];

  const topCardsDataTrafic: CardsData[] = [
    {
      data: 554,
      type: 'jobs',
      title: 'Total de pautas'
    },
    {
      data: 290,
      type: 'warning',
      title: 'Total de horas'
    },
    {
      data: 130,
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
        reports: '???'
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
        reports: '???'
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
        reports: '???'
      }
    }
  ];

  const jobsDataList: JobsList[] = [
    {
      id_job: 0,
      client_name: 'Terex',
      team: 'Marina',
      job_name: 'Post no Insta',
      job_status: 'Em andamento',
      job_type: 'Criação do zero'
    },
    {
      id_job: 1,
      client_name: 'Tropa',
      team: 'Daniel',
      job_name: 'Planejamento',
      job_status: 'Em andamento',
      job_type: 'Alteração cliente'
    },
    {
      id_job: 2,
      client_name: 'Takao',
      team: 'Marcos',
      job_name: 'Planejamento',
      job_status: 'Em andamento',
      job_type: 'Alteração interna'
    },
    {
      id_job: 3,
      client_name: 'Iveco',
      team: 'Milena',
      job_name: 'Projeto X',
      job_status: 'Em andamento',
      job_type: 'Criação do zero'
    },
    {
      id_job: 4,
      client_name: 'Emerson',
      team: 'Derick',
      job_name: 'Job X',
      job_status: 'Em andamento',
      job_type: 'Criação do zero'
    },
    {
      id_job: 5,
      client_name: 'Emerson',
      team: 'Beatriz',
      job_name: 'Post no Insta',
      job_status: 'Em andamento',
      job_type: 'Criação do zero'
    },
    {
      id_job: 6,
      client_name: 'Tropa',
      team: 'Derick',
      job_name: 'Planejamento',
      job_status: 'Na fila',
      job_type: 'Criação do zero'
    },
    {
      id_job: 7,
      client_name: 'Takao',
      team: 'Milena',
      job_name: 'Planejamento',
      job_status: 'Na fila',
      job_type: 'Alteração interna'
    },
    {
      id_job: 8,
      client_name: 'Iveco',
      team: 'Daniel',
      job_name: 'Planejamento',
      job_status: 'Na fila',
      job_type: 'Criação do zero'
    },
    {
      id_job: 9,
      client_name: 'Genie',
      team: 'Marina',
      job_name: 'Job Y',
      job_status: 'Na fila',
      job_type: 'Criação do zero'
    }
  ];

  const jobsListIndividual = [
    {
      id_job: 0,
      client_name: 'Terex',
      job_name: 'Post no Insta',
      job_status: 'Em andamento',
      job_type: 'Criação do zero'
    },
    {
      id_job: 1,
      client_name: 'Tropa',
      job_name: 'Planejamento',
      job_status: 'Em andamento',
      job_type: 'Alteração cliente'
    },
    {
      id_job: 2,
      client_name: 'Takao',
      job_name: 'Planejamento',
      job_status: 'Em andamento',
      job_type: 'Alteração interna'
    },
    {
      id_job: 3,
      client_name: 'Iveco',
      job_name: 'Projeto X',
      job_status: 'Em andamento',
      job_type: 'Criação do zero'
    },
    {
      id_job: 4,
      client_name: 'Emerson',
      job_name: 'Job X',
      job_status: 'Em andamento',
      job_type: 'Criação do zero'
    }
  ];

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

  const handleClientSelected = (select: any) => {
    getProjects(select.value);
    setInitialValue(select);
    setFormValue('client', select.value);
  };

  const handleGenerateReport = () => {
    console.log('log para gerar relatório', formData);
    navigate('/relatorio', { state: formData });
    setModalReport(false);
    setData({
      client: '',
      contract: '',
      month: '',
      year: ''
    });
    setInitialValue({
      value: '',
      label: '',
      image: '',
      color: ''
    });
  };

  const handleCancelReport = () => {
    setModalReport(false);
    setData({
      client: '',
      contract: '',
      month: '',
      year: ''
    });
    setInitialValue({
      value: '',
      label: '',
      image: '',
      color: ''
    });
  };

  function getTenYears() {
    const currentYear = new Date().getFullYear();
    const lastTenYears = [];

    for (let i = currentYear; i > currentYear - 10; i--) {
      lastTenYears.push(i);
    }
    return lastTenYears;
  }

  const hasFilters = Object.values(filter).every((obj) => obj === null || obj === '');

  // useEffect(() => {
  //   console.log('log do formData =>', formData);
  // }, [formData]);

  return (
    <Container>
      {dashType === '' && (
        <div>
          <Loader />
        </div>
      )}

      {isFetching && <Loader />}

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

            <CardBase>
              <div className="card-title">Clientes (SPOT)</div>

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
                {jobsData.slice(0, 5).map((row) => (
                  <tr key={row.id_job}>
                    <td>{row.client_name}</td>
                    <td>
                      {row.job_name}
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
                      <JobStatus
                        className={
                          row.job_status === 'Pendente de envio'
                            ? 'status progress'
                            : row.job_status === 'na fila'
                            ? 'status'
                            : 'status finished'
                        }
                      >
                        {row.job_status}
                      </JobStatus>
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
                {jobsData.slice(0, 5).map((row) => (
                  <tr key={row.id_job}>
                    <td>{row.client_name}</td>
                    <td>
                      {row.job_name}
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
                      <JobStatus
                        className={
                          row.job_status === 'Pendente de envio'
                            ? 'status progress'
                            : row.job_status === 'na fila'
                            ? 'status'
                            : 'status finished'
                        }
                      >
                        {row.job_status}
                      </JobStatus>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableDefault>
          </ContainerGroupTable>

          {/* Performance de atendimento */}
          <CardBase>
            <div className="card-title">Performance do Atendimento</div>

            {userCards.map((row: UserCardProps, index: any) => (
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
                data.top_fee_inverso.map((row: TopFeeSpot, index: number) => (
                  <tr key={index}>
                    <td>{row.client_name}</td>
                    <td>{row.atendimento ? row.atendimento : '?????'}</td>
                    <td style={{ color: '#00BFA5', fontWeight: '700' }}>
                      {row.tempo_total.split(':')[0]}H
                    </td>
                    <td>
                      <HoursTable>{row.consumido.split(':')[0]}H</HoursTable>
                    </td>
                    <td>
                      <HoursTable className="minus">?????</HoursTable>
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
                    <td>{row.atendimento ? row.atendimento : '?????'}</td>
                    <td style={{ color: '#00BFA5', fontWeight: '700' }}>
                      {row.tempo_total.split(':')[0]}H
                    </td>
                    <td>
                      <HoursTable>{row.consumido.split(':')[0]}H</HoursTable>
                    </td>
                    <td>
                      <HoursTable className="minus">?????</HoursTable>
                    </td>
                  </tr>
                ))}
            </tbody>
          </TableDefault>

          {/* Alterações interna e externa */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <CardBase>
              <div className="card-title">Alterações Internas (Jobs)</div>
              <BarChartGrafic data={topTenantJobs} isVertical={true} height="" />
            </CardBase>
            <CardBase>
              <div className="card-title">Alterações Clientes (Jobs)</div>
              <BarChartGrafic data={topTenantJobs} isVertical={true} height="" />
            </CardBase>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <CardBase>
              <div className="card-title">Alterações Internas (Horas)</div>
              <BarChartGrafic data={topTenantJobs} isVertical={true} height="" />
            </CardBase>
            <CardBase>
              <div className="card-title">Alterações Clientes (Horas)</div>
              <BarChartGrafic data={topTenantJobs} isVertical={true} height="" />
            </CardBase>
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
                  ?????
                  <span>?? clientes</span>
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
                      <td>?????</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Terex</td>
                      <td>?????</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td> */}
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Metso</td>
                      <td>?????</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Metso</td>
                      <td>?????</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Metso</td>
                      <td>?????</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
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
                  ?????
                  <span>?? clientes</span>
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
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>?????</td>
                      <td>?????</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td> */}
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>?????</td>
                      <td>?????</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>?????</td>
                      <td>?????</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>?????</td>
                      <td>?????</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        ?????
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td> */}
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>?????</td>
                      <td>?????</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        ?????
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
                  <th>Criativo</th>
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
                  <td>?????H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>2º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>??H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>3º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>4º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>5º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???H</td>
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
                <tr>
                  <td>1º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>2º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>3º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>4º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
                <tr>
                  <td>5º</td>
                  <td>?????</td>
                  <td>??</td>
                  <td>???H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>??</td>
                </tr>
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
                    <td style={{ minWidth: '125px' }}>
                      {row.hora_estimada.split(':')[0] === '00'
                        ? 0
                        : row.hora_estimada.split(':')[0]}
                      H
                    </td>
                    <td style={{ minWidth: '125px' }}>
                      {row.hora_real.split(':')[0] === '00' ? 0 : row.hora_real.split(':')[0]}H:
                      {row.hora_real.split(':')[1]}m
                    </td>
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
          <CardBase>
            <div className="title-with-back">CLIENTE: JEEP</div>

            <BulletsClientWrapper>
              <BulletPointInfos>
                <div className="bullet">
                  Total jobs: <span>??</span>
                </div>
                <div className="bullet">
                  Total horas: <span>??h</span>
                </div>
                <div className="bullet">
                  Alteração interna: <span>??</span>
                </div>
                <div className="bullet">
                  Alteração cliente: <span>??</span>
                </div>
                <div className="bullet">
                  Reuniões: <span>??</span>
                </div>
                <div className="bullet">
                  Reposts enviados: <span>??</span>
                </div>
              </BulletPointInfos>

              <BulletPointInfos>
                <div className="bullet">
                  Jobs em andamento: <span>??</span>
                </div>
                <div className="bullet">
                  Pendente de aprovação: <span>??</span>
                </div>
                <div className="bullet">
                  Pendente de envio: <span>??</span>
                </div>
                <div className="bullet">
                  Tempo médio de aprovação: <span>?? dias</span>
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
                    Contrato Fee: <span>??h</span>
                  </div>
                  <div className="bullet">
                    Saldo Contrato: <span>??h</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="bullet">
                    Contrato Spot: <span>?h</span>
                  </div>
                  <div className="bullet">
                    Saldo Spot: <span>?h</span>
                  </div>
                </div>
              </BulletPointInfos>
            </BulletsClientWrapper>
          </CardBase>
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
                {jobsData.slice(0, 5).map((row) => (
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
                {jobsAwaitingClient.map((row) => (
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
                {jobsData.map((row) => (
                  <tr key={row.id_job}>
                    <td>{row.client_name}</td>
                    <td>{row.job_name}</td>
                    <td>{row.job_flow}</td>
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
          </CardBase>

          {/* Performance por Cliente */}
          <CardBase>
            <div className="title-with-back">CLIENTE: JEEP</div>

            <BulletsClientWrapper>
              <BulletPointInfos>
                <div className="bullet">
                  Total jobs: <span>32</span>
                </div>
                <div className="bullet">
                  Total horas: <span>26h</span>
                </div>
                <div className="bullet">
                  Alteração interna: <span>12</span>
                </div>
                <div className="bullet">
                  Alteração cliente: <span>11</span>
                </div>
                <div className="bullet">
                  Reuniões: <span>3</span>
                </div>
                <div className="bullet">
                  Reposts enviados: <span>3</span>
                </div>
              </BulletPointInfos>

              <BulletPointInfos>
                <div className="bullet">
                  Jobs em andamento: <span>3</span>
                </div>
                <div className="bullet">
                  Pendente de aprovação: <span>21</span>
                </div>
                <div className="bullet">
                  Pendente de envio: <span>11</span>
                </div>
                <div className="bullet">
                  Tempo médio de aprovação: <span>3 dias</span>
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
                    Contrato Fee: <span>40h</span>
                  </div>
                  <div className="bullet">
                    Saldo Contrato: <span>14h</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="bullet">
                    Contrato Spot: <span>4h</span>
                  </div>
                  <div className="bullet">
                    Saldo Spot: <span>1h</span>
                  </div>
                </div>
              </BulletPointInfos>
            </BulletsClientWrapper>
          </CardBase>

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
                {jobsDataList.map((row: JobsList) => (
                  <tr key={row.id_job}>
                    <td>{row.client_name}</td>
                    <td>{row.team}</td>
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

          {/* Monitoramento do time individual */}
          <CardBase>
            <div className="card-title">Monitoramento do time individual</div>
            {[0, 1].map((row: any, index: number) => (
              <UserTeamCard key={index}>
                <div className="user-section">
                  <div className="user-image" style={{ backgroundImage: `url(${PersonTest})` }} />
                  <div className="user-infos">
                    Marina Chriguer
                    <span>Clientes alocados: 12</span>
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
                      {jobsListIndividual.map((row) => (
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
                      <CountUp start={0} end={122} delay={0}>
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
              <tr>
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
              <tr>
                <td>Metso</td>
                <td>Beatriz</td>
                <td>Ticket teste</td>
                <td>Entregue</td>
                <td>2</td>
                <td>3H</td>
                <td>3H</td>
                <td>15/10/2023</td>
                <td>18/10/2023</td>
              </tr>
              <tr>
                <td>Iveco</td>
                <td>Luana</td>
                <td>TS-TSK-02-TICKET</td>
                <td>Entregue</td>
                <td>5</td>
                <td>1H</td>
                <td>
                  <TdColor className="color">3H</TdColor>
                </td>
                <td>12/10/2023</td>
                <td>16/10/2023</td>
              </tr>
            </tbody>
          </TableDefault>

          {/* Performance por cliente */}
          <CardBase>
            <div className="title-with-back">CLIENTE: JEEP</div>

            <BulletsClientWrapper>
              <BulletPointInfos>
                <div className="bullet">
                  Total jobs: <span>32</span>
                </div>
                <div className="bullet">
                  Total horas: <span>26h</span>
                </div>
                <div className="bullet">
                  Alteração interna: <span>12</span>
                </div>
                <div className="bullet">
                  Alteração cliente: <span>11</span>
                </div>
                <div className="bullet">
                  Reuniões: <span>3</span>
                </div>
                <div className="bullet">
                  Reposts enviados: <span>3</span>
                </div>
              </BulletPointInfos>

              <BulletPointInfos>
                <div className="bullet">
                  Jobs em andamento: <span>3</span>
                </div>
                <div className="bullet">
                  Pendente de aprovação: <span>21</span>
                </div>
                <div className="bullet">
                  Pendente de envio: <span>11</span>
                </div>
                <div className="bullet">
                  Tempo médio de aprovação: <span>3 dias</span>
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
                    Contrato Fee: <span>40h</span>
                  </div>
                  <div className="bullet">
                    Saldo Contrato: <span>14h</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="bullet">
                    Contrato Spot: <span>4h</span>
                  </div>
                  <div className="bullet">
                    Saldo Spot: <span>1h</span>
                  </div>
                </div>
              </BulletPointInfos>
            </BulletsClientWrapper>
          </CardBase>
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
              <CardDataDash data={32} type="jobSpot" description="Pautas entregues" />
              <CardDataDash data={112} type="creation" description="Horas de criação" />
              <CardDataDash data={6} type="info" description="Alt. Internas" />
              <CardDataDash data={8} type="danger" description="Alt. Clientes" />
              <CardDataDash data={12} type="warning" description="Horas disponíveis" />
              <CardDataDash data={4} type="jobs" description="Jobs na fila" />
              <CardDataDash data={12} type="newFee" description="Total de produtos" />
              <CardDataDash data={23} type="warning" description="Total horas na fila" />
            </SmallCardsWrapper>
          </OperatorTopWrapper>

          {/* Listagem de jobs */}
          <div>
            Aqui vão as tarefas iguais ao <strong>MINHAS TAREFAS</strong>
          </div>
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
            />
          </ModalField>

          <ModalField>
            <SelectDefault
              label="Projeto/Contrato"
              name="contract"
              value={formData.contract}
              onChange={handleOnChange}
            >
              {dataProjects?.map((row: any) => (
                <option key={row.project_product_id} value={row.project_product_id}>
                  {row.select}
                </option>
              ))}
            </SelectDefault>
          </ModalField>

          <ModalField>
            <SelectDefault
              label="Mês"
              name="month"
              value={formData.month}
              onChange={handleOnChange}
            >
              {monthsArray?.map((row: any) => (
                <option key={row.id} value={row.month_name}>
                  {row.month_name}
                </option>
              ))}
            </SelectDefault>

            <SelectDefault label="Ano" name="year" value={formData.year} onChange={handleOnChange}>
              {ten_years?.map((row: any) => (
                <option key={row} value={row}>
                  {row}
                </option>
              ))}
            </SelectDefault>
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
