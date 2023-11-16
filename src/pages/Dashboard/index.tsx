/* eslint-disable no-prototype-builtins */
// React
import { useEffect, useState } from 'react';

// Hooks
import { useAuth } from '../../hooks/AuthContext';

// Components
import { CardWelcomeDash } from '../../components/Cards/CardWelcomeDash';
import BarChartGrafic from '../../components/GraphicsChart/BarChartGrafic';
import { TableDefault } from '../../components/TableDefault';
import { ContainerGroupTable, SectionDefault } from '../../components/UiElements/styles';
import TopCardsDash, { CardsData } from '../../components/Cards/DashboardTopCards';
import Loader from '../../components/LoaderSpin';
import UserPerformanceCard, { UserCardProps } from '../../components/Cards/UserPerformanceCard';
import PerformanceClientCard from '../../components/Cards/PerformanceClientCard';
import ButtonTable from '../../components/Buttons/ButtonTable';
import Alert from '../../components/Ui/Alert';
import PieChartGraphic from '../../components/GraphicsChart/PieChart';
import { StatusTable } from '../Tasks/TaskList/styles';

// Styles
import {
  BaseTableGrey,
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
  TimeChartsTopCard,
  SmallCardsWrapper,
  JobCellTable,
  HoursTable,
  TdColor,
  ClientPerformanceTraffic,
  BulletPointInfos,
  BulletsWrapper
} from './styles';

// Libraries
import CountUp from 'react-countup';

// Images
import PersonTest from '../../assets/person.jpg';

// Icons
import { useFetch } from '../../hooks/useFetch';
import BarChartUser from '../../components/GraphicsChart/BarChartUser';
import { CardDataDash } from '../../components/Cards/CardDataDash';
import FilterModal from '../../components/Ui/FilterModal';
// interface DashType {
//   typeDash: 'manager' | 'executive' | 'traffic' | 'operator' | '';
// }

interface JobsList {
  id_job: number;
  client_name: string;
  team: string;
  job_name: string;
  job_status: string;
  job_type: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState({
    fromDate: '',
    toDate: ''
  });
  const [dashType, setDashType] = useState<string>('');
  const { data, fetchData, isFetching } = useFetch<any>(
    `/dashboard?date_start=${filter.fromDate}&date_end=${filter.toDate}`
  );
  const [modalFilters, setModalFilters] = useState<boolean>(false);

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

  // console.log('log do data dashboard =>', data);

  const dataStatusAll = [
    {
      name: 'Atrasada',
      Total: data ? data.tarefas_quantidade.por_status.atrasada : 0,
      fill: '#D92D20'
    },
    {
      name: 'Pendente',
      Total: data ? data.tarefas_quantidade.por_status.pendente : 0,
      fill: '#FDB022'
    },
    {
      name: 'Criação',
      Total: data ? data.tarefas_quantidade.por_status.em_andamento : 0,
      fill: '#0045B5'
    },
    {
      name: 'Entregue',
      Total: data ? data.tarefas_quantidade.por_status.concluido : 0,
      fill: '#00A063'
    }
    // {
    //   name: 'Cancelado',
    //   pv: data ? data.tarefas_quantidade.por_status.concluido : 0,
    //   fill: '#D92D20'
    // },
  ];

  const jobsData = [
    {
      id_job: 0,
      client_name: 'Metso',
      job_name: 'Planejamento',
      job_status: 'Pendente de envio'
    },
    {
      id_job: 1,
      client_name: 'Tropa',
      job_name: 'Planejamento',
      job_status: 'Pendente de envio'
    },
    {
      id_job: 2,
      client_name: 'Takao',
      job_name: 'Planejamento',
      job_status: 'Pendente de envio'
    },
    {
      id_job: 3,
      client_name: 'Iveco',
      job_name: 'Planejamento',
      job_status: 'Pendente de envio'
    },
    {
      id_job: 4,
      client_name: 'Genie',
      job_name: 'Job X',
      job_status: 'Pendente de envio'
    }
  ];

  const dataChanges = [
    {
      name: 'Metso',
      Total: 358,
      fill: '#59B7FF'
    },
    {
      name: 'CNH',
      Total: 209,
      fill: '#0045B5'
    },
    {
      name: 'Emerson',
      Total: 113,
      fill: '#0077E6'
    },
    {
      name: 'Takao',
      Total: 5,
      fill: '#E2F2FF'
    }
  ];

  const topCardsDataManager: CardsData[] = [
    {
      data: data ? data.total_clientes : 0,
      type: 'success',
      title: 'Total de clientes'
    },
    {
      data: data ? Number(data.horas_criacao.split(':')[0]) : 0,
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
      type: 'creation',
      title: 'Horas de criação'
    },
    {
      data: 46,
      type: 'info',
      title: 'Alt. internas'
    },
    {
      data: 56,
      type: 'danger',
      title: 'Alt. clientes'
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
        user_name: data ? data.top_users[0].name : '',
        clientsNumber: 10,
        avatar: PersonTest
      },
      chartData: [
        {
          name: 'Total de Jobs',
          pv: data ? data.top_users[0].task_count : 0,
          fill: '#0045B5'
        },
        {
          name: 'Pendente',
          pv: 5,
          fill: '#FDB022'
        },
        {
          name: 'Aprovação',
          pv: 15,
          fill: '#0098FF'
        },
        {
          name: 'Aprovados',
          pv: 25,
          fill: '#00A063'
        }
      ],
      mensalReport: {
        reunions: 5,
        principalTask: '2'
      }
    },
    {
      userInfos: {
        user_name: data ? data.top_users[1].name : '',
        clientsNumber: 15,
        avatar: PersonTest
      },
      chartData: [
        {
          name: 'Total de Jobs',
          pv: data ? data.top_users[1].task_count : 0,
          fill: '#0045B5'
        },
        {
          name: 'Pendente',
          pv: 5,
          fill: '#FDB022'
        },
        {
          name: 'Aprovação',
          pv: 15,
          fill: '#0098FF'
        },
        {
          name: 'Aprovados',
          pv: 25,
          fill: '#00A063'
        }
      ],
      mensalReport: {
        reunions: 8,
        principalTask: '4'
      }
    },
    {
      userInfos: {
        user_name: data ? data.top_users[2].name : '',
        clientsNumber: 8,
        avatar: PersonTest
      },
      chartData: [
        {
          name: 'Total de Jobs',
          pv: data ? data.top_users[2].task_count : 0,
          fill: '#0045B5'
        },
        {
          name: 'Pendente',
          pv: 5,
          fill: '#FDB022'
        },
        {
          name: 'Aprovação',
          pv: 15,
          fill: '#0098FF'
        },
        {
          name: 'Aprovados',
          pv: 25,
          fill: '#00A063'
        }
      ],
      mensalReport: {
        reunions: 3,
        principalTask: '5'
      }
    }
  ];

  const mockDataPerformanceClient = {
    client_name: 'Terex',
    graphics: [
      {
        name: 'Entregue',
        pv: 25,
        fill: '#00A063'
      },
      {
        name: 'Aprovação',
        pv: 15,
        fill: '#0098FF'
      },
      {
        name: 'Criação',
        pv: 20,
        fill: '#0045B5'
      },
      {
        name: 'Cancelado',
        pv: 13,
        fill: '#D92D20'
      },
      {
        name: 'Pendente',
        pv: 5,
        fill: '#FDB022'
      }
    ]
  };

  const TablePerformanceData = [
    {
      job_name: 'Planejamento',
      status_job: 'creation'
    },
    {
      job_name: 'Planejamento',
      status_job: 'pending'
    },
    {
      job_name: 'Planejamento',
      status_job: 'waiting'
    },
    {
      job_name: 'Planejamento',
      status_job: 'finished'
    }
  ];

  const MensalReportPerfData = {
    reunions: 3,
    principalTask: 'Update data'
  };

  const dataPieGraphic = [
    { name: 'Disponiveis', value: 800 },
    { name: 'Utilizados', value: 200 }
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

  const fiveJobs = jobsDataList.slice(0, 5);

  return (
    <Container>
      {dashType === '' && (
        <div>
          <Loader />
        </div>
      )}

      {isFetching && <Loader />}

      {/* Dash Gestor */}
      {dashType === 'manager' && !isFetching && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash
            user={user.name}
            clearFilter={handleClearFilters}
            openFilter={() => setModalFilters(true)}
          />

          {/* Cards pequenos */}
          <TopCardsDash typeCards="manager" cardsData={topCardsDataManager} />

          {/* Status geral dos jobs + Pizza top clientes */}
          <GraphicLine>
            <BarChartGrafic data={dataStatusAll} title={'Status Geral Jobs'} height="" />
            {/* <ChartDonut data={dataDahs} title={'Top Clientes'} dataKey="value" /> */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BarChartGrafic
                data={dataChanges}
                isVertical={true}
                title="Top clientes (Jobs)"
                height=""
              />
              <BarChartGrafic
                data={dataChanges}
                isVertical={true}
                title="Top clientes (Horas)"
                height=""
              />
            </div>
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
                {jobsData.map((row) => (
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
                {jobsData.map((row) => (
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
                chartData={row.chartData}
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
                <th>Total de horas</th>
                <th>Saldo de horas</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>21 Live | Cliente</td>
                <td>Amanda</td>
                <td style={{ color: '#00BFA5', fontWeight: '700' }}>123H</td>
                <td>
                  <HoursTable>3H</HoursTable>
                </td>
              </tr>
              <tr>
                <td>Metso</td>
                <td>Beatriz</td>
                <td style={{ color: '#00BFA5', fontWeight: '700' }}>83H</td>
                <td>
                  <HoursTable>7H</HoursTable>
                </td>
              </tr>
              <tr>
                <td>Iveco</td>
                <td>Amanda</td>
                <td style={{ color: '#00BFA5', fontWeight: '700' }}>135H</td>
                <td>
                  <HoursTable className="minus">-5H</HoursTable>
                </td>
              </tr>
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
                <th>Total de horas</th>
                <th>Saldo de horas</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>21 Live | Cliente</td>
                <td>Amanda</td>
                <td style={{ color: '#00BFA5', fontWeight: '700' }}>123H</td>
                <td>
                  <HoursTable className="minus">-3H</HoursTable>
                </td>
              </tr>
              <tr>
                <td>Metso</td>
                <td>Beatriz</td>
                <td style={{ color: '#00BFA5', fontWeight: '700' }}>83H</td>
                <td>
                  <HoursTable>7H</HoursTable>
                </td>
              </tr>
              <tr>
                <td>Iveco</td>
                <td>Amanda</td>
                <td style={{ color: '#00BFA5', fontWeight: '700' }}>135H</td>
                <td>
                  <HoursTable>9H</HoursTable>
                </td>
              </tr>
            </tbody>
          </TableDefault>

          {/* Alterações interna e externa */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <CardBase>
              <div className="card-title">Alterações Internas (Jobs)</div>
              <BarChartGrafic data={dataChanges} isVertical={true} height="" />
            </CardBase>
            <CardBase>
              <div className="card-title">Alterações Clientes (Jobs)</div>
              <BarChartGrafic data={dataChanges} isVertical={true} height="" />
            </CardBase>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <CardBase>
              <div className="card-title">Alterações Internas (Horas)</div>
              <BarChartGrafic data={dataChanges} isVertical={true} height="" />
            </CardBase>
            <CardBase>
              <div className="card-title">Alterações Clientes (Horas)</div>
              <BarChartGrafic data={dataChanges} isVertical={true} height="" />
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
                    <tr>
                      <td>Terex</td>
                      <td>Marina</td>
                      <td>Job 1</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>Na fila</td> */}
                    </tr>
                    <tr>
                      <td>Metso</td>
                      <td>Fernanda</td>
                      <td>Job 5</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                    <tr>
                      <td>Iveco</td>
                      <td>Thiago</td>
                      <td>Job 3</td>
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
                <NumberCard>
                  <CountUp start={0} end={87} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">pautas</div>
                </NumberCard>
                <NumberCard>
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
            </div>
          </CardBase>

          {/* Monitoramente do time - users */}
          <CardBase>
            <div className="card-title">Monitoramento do time</div>
            <GridServiceWrapper>
              <UserInfo>
                <div className="user-image" style={{ backgroundImage: `url(${PersonTest})` }} />
                <div className="user-name">
                  Amanda do Carmo
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
                      <td>Job 11</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Terex</td>
                      <td>Job 12</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td> */}
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Metso</td>
                      <td>Job 13</td>
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
              </div>
            </GridServiceWrapper>

            <GridServiceWrapper>
              <UserInfo>
                <div className="user-image" style={{ backgroundImage: `url(${PersonTest})` }} />
                <div className="user-name">
                  Derick Silveira
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
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Terex</td>
                      <td>Job 1</td>
                      <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td>
                      {/* <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td> */}
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Metso</td>
                      <td>Job 2</td>
                      {/* <td style={{ color: '#2979FF', fontSize: '14px', fontWeight: '400' }}>
                        Trabalhando agora
                      </td> */}
                      <td style={{ color: '#FFAB00', fontSize: '14px', fontWeight: '400' }}>
                        Na fila
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: '#6C757D', fontWeight: '700' }}>Iveco</td>
                      <td>Job 3</td>
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
              </div>
            </GridServiceWrapper>
          </CardBase>

          {/* Monitoramento criativo */}
          <CardBase>
            <div className="card-title">Monitoramento Do Time - Criativo</div>

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
                  <td>Amanda</td>
                  <td>21</td>
                  <td>123H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>18</td>
                </tr>
                <tr>
                  <td>2º</td>
                  <td>Beatriz</td>
                  <td>19</td>
                  <td>83H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>15</td>
                </tr>
                <tr>
                  <td>3º</td>
                  <td>Felipe</td>
                  <td>15</td>
                  <td>135H</td>
                  <td style={{ color: '#00BFA5', fontWeight: '700' }}>11</td>
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
                  <TdColor>3H</TdColor>
                </td>
                <td>12/10/2023</td>
                <td>16/10/2023</td>
              </tr>
            </tbody>
          </TableDefault>
        </SectionDefault>
      )}

      {/* Dash executivo */}
      {dashType === 'executive' && !isFetching && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash
            user={user.name}
            clearFilter={handleClearFilters}
            openFilter={() => setModalFilters(true)}
          />

          {/* Cards pequenos */}
          <TopCardsDash typeCards="executive" cardsData={topCardsDataExecutive} />

          {/* Performance Cliente */}
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
                {jobsData.map((row) => (
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
                {jobsData.map((row) => (
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

          {/* Performance Geral Jobs */}
          <BarChartGrafic data={dataStatusAll} title={'Status Geral Jobs'} height="" />

          {/* Top clientes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BarChartGrafic
              data={dataChanges}
              isVertical={true}
              title="Top clientes (Jobs)"
              height=""
            />
            <BarChartGrafic
              data={dataChanges}
              isVertical={true}
              title="Top clientes (Horas)"
              height=""
            />
          </div>

          {/* Performance por Cliente */}
          <CardBase>
            <div className="card-title">Performance por cliente</div>

            {[0, 1, 2].map((row: any, index: number) => (
              <PerformanceClientCard
                key={index}
                data_chart={mockDataPerformanceClient}
                data_table={TablePerformanceData}
                mensal_report={MensalReportPerfData}
              />
            ))}
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
            {/* <div className="card-title">Performance por cliente</div> */}

            <ClientPerformanceTraffic>
              <div>
                <BarChartGrafic data={dataStatusAll} title={'CLIENTE: TEREX'} height="260px" />
              </div>
              <BulletsWrapper>
                <BulletPointInfos>
                  <div className="bullet">
                    Total jobs: <span>32</span>
                  </div>
                  <div className="bullet">
                    Total horas: <span>26h</span>
                  </div>
                  <div className="bullet">
                    Jobs em andamento: <span>3</span>
                  </div>
                  <div className="bullet">
                    Alteração interna: <span>12</span>
                  </div>
                  <div className="bullet">
                    Alteração cliente: <span>11</span>
                  </div>
                </BulletPointInfos>

                <BulletPointInfos>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
              </BulletsWrapper>
            </ClientPerformanceTraffic>
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
          />

          {/* Top cards */}
          <OperatorTopWrapper>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <TimeChartsTopCard>
                <div className="card-title">
                  Horas disponíveis
                  <span>12</span>
                </div>

                <PieChartGraphic data={dataPieGraphic} />
              </TimeChartsTopCard>

              <TimeChartsTopCard>
                <div className="card-title">
                  Previsão de horas
                  <span>43</span>
                </div>

                <PieChartGraphic data={dataPieGraphic} />
              </TimeChartsTopCard>
            </div>

            <SmallCardsWrapper>
              <CardDataDash data={32} type="jobSpot" description="Pautas entregues" />
              <CardDataDash data={112} type="creation" description="Horas de criação" />
              <CardDataDash data={8} type="danger" description="Alt. Clientes" />
              <CardDataDash data={6} type="info" description="Alt. Internas" />
              <CardDataDash data={4} type="jobs" description="Jobs na fila" />
            </SmallCardsWrapper>
          </OperatorTopWrapper>

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
                  <th>Job</th>
                  <th>Status</th>
                  <th>Natureza</th>
                </tr>
              </thead>

              <tbody>
                {fiveJobs.map((row: JobsList) => (
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
    </Container>
  );
}
