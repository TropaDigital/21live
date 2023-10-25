// React
import { useState } from 'react';

// Hooks
import { useAuth } from '../../hooks/AuthContext';

// Components
import { CardWelcomeDash } from '../../components/Cards/CardWelcomeDash';
import BarChartGrafic from '../../components/GraphicsChart/BarChartGrafic';
import ChartDonut from '../../components/GraphicsChart/ChartDonut';
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
  WrapperTeamCards,
  TeamTimeCard,
  UserTeamCard,
  UserJobs,
  OperatorTopWrapper,
  TimeChartsTopCard,
  SmallCardsWrapper,
  JobCellTable
} from './styles';

// Libraries
import CountUp from 'react-countup';

// Images
import PersonTest from '../../assets/person.jpg';

// Icons
import { FiClock } from 'react-icons/fi';
// interface DashType {
//   typeDash: 'manager' | 'executive' | 'traffic' | 'operator' | '';
// }

interface TeamDataProps {
  user_name: string;
  user_role: string;
  avatar: string;
  available_time: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [dashType, setDashType] = useState<string>('');

  const dataStatusAll = [
    {
      name: 'Entregue',
      pv: 378,
      fill: '#00A063'
    },
    {
      name: 'Aprovação',
      pv: 232,
      fill: '#0098FF'
    },
    {
      name: 'Criação',
      pv: 262,
      fill: '#0045B5'
    },
    {
      name: 'Cancelado',
      pv: 105,
      fill: '#D92D20'
    },
    {
      name: 'Pendente',
      pv: 48,
      fill: '#FDB022'
    }
  ];

  const dataDahs = [
    {
      id: 1,
      name: 'Metso',
      value: 45,
      fill: '#59B7FF',
      currency: 20.0,
      isDonut: false,
      isPadded: false
    },
    {
      id: 2,
      name: 'CNH',
      value: 28,
      fill: '#0045B5',
      currency: 20.0,
      isDonut: true,
      isPadded: false
    },
    {
      id: 3,
      name: 'Emerson',
      value: 20,
      fill: '#0077E6',
      currency: 20.0,
      isDonut: true,
      isPadded: true
    },
    {
      id: 4,
      name: 'Takao',
      value: 15,
      fill: '#E2F2FF',
      currency: 20.0,
      isDonut: true,
      isPadded: true
    },
    {
      id: 5,
      name: 'Tropa',
      value: 13,
      fill: '#0098FF',
      currency: 20.0,
      isDonut: true,
      isPadded: true
    },
    {
      id: 6,
      name: 'Outros',
      value: 5,
      fill: '#8CCBFF',
      currency: 20.0,
      isDonut: true,
      isPadded: true
    }
  ];

  const jobsData = [
    {
      id_job: 0,
      client_name: 'Metso',
      job_name: 'Planejamento',
      job_status: 'fazendo'
    },
    {
      id_job: 1,
      client_name: 'Tropa',
      job_name: 'Planejamento',
      job_status: 'na fila'
    },
    {
      id_job: 2,
      client_name: 'Takao',
      job_name: 'Planejamento',
      job_status: 'na fila'
    },
    {
      id_job: 3,
      client_name: 'Iveco',
      job_name: 'Planejamento',
      job_status: 'na fila'
    }
  ];

  const dataChanges = [
    {
      name: 'Metso',
      pv: 358,
      fill: '#59B7FF'
    },
    {
      name: 'CNH',
      pv: 209,
      fill: '#0045B5'
    },
    {
      name: 'Emerson',
      pv: 113,
      fill: '#0077E6'
    },
    {
      name: 'Takao',
      pv: 5,
      fill: '#E2F2FF'
    }
  ];

  const topCardsDataManager: CardsData[] = [
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
      title: 'Alt. externas'
    },
    {
      data: 52,
      type: 'warning',
      title: 'Equipes'
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
      title: 'Alt. externas'
    }
  ];

  const userCards: UserCardProps[] = [
    {
      userInfos: {
        user_name: 'John Doe',
        clientsNumber: 10,
        avatar: 'avatar1.jpg'
      },
      chartData: [
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
      ],
      mensalReport: {
        reunions: 5,
        principalTask: 'Project report',
        secondaryTask: 'Marketing strategy'
      }
    },
    {
      userInfos: {
        user_name: 'Alice Smith',
        clientsNumber: 15,
        avatar: 'avatar2.jpg'
      },
      chartData: [
        {
          name: 'Entregue',
          pv: 28,
          fill: '#00A063'
        },
        {
          name: 'Aprovação',
          pv: 16,
          fill: '#0098FF'
        },
        {
          name: 'Criação',
          pv: 22,
          fill: '#0045B5'
        },
        {
          name: 'Cancelado',
          pv: 15,
          fill: '#D92D20'
        },
        {
          name: 'Pendente',
          pv: 5,
          fill: '#FDB022'
        }
      ],
      mensalReport: {
        reunions: 8,
        principalTask: 'Presentation X',
        secondaryTask: 'Brainstorm ideas'
      }
    },
    {
      userInfos: {
        user_name: 'Bob Johnson',
        clientsNumber: 8,
        avatar: 'avatar3.jpg'
      },
      chartData: [
        {
          name: 'Entregue',
          pv: 28,
          fill: '#00A063'
        },
        {
          name: 'Aprovação',
          pv: 16,
          fill: '#0098FF'
        },
        {
          name: 'Criação',
          pv: 22,
          fill: '#0045B5'
        },
        {
          name: 'Cancelado',
          pv: 15,
          fill: '#D92D20'
        },
        {
          name: 'Pendente',
          pv: 5,
          fill: '#FDB022'
        }
      ],
      mensalReport: {
        reunions: 3,
        principalTask: 'Attend client meetings',
        secondaryTask: 'Update data'
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
    principalTask: 'Attend client meetings',
    secondaryTask: 'Update data'
  };

  const teamTimeData: TeamDataProps[] = [
    {
      user_name: 'Daniela Silva Ferreira',
      user_role: 'Criação',
      avatar: 'foto.jpg',
      available_time: '12:46:00'
    },
    {
      user_name: 'Fernanda Melo Favero',
      user_role: 'Redação',
      avatar: 'picture.jpg',
      available_time: '6:22:00'
    },
    {
      user_name: 'Marina Chriguer',
      user_role: 'Gestor',
      avatar: 'avatar.jpeg',
      available_time: '25:13:00'
    }
  ];

  const dataPieGraphic = [
    { name: 'Disponiveis', value: 800 },
    { name: 'Utilizados', value: 200 }
  ];

  return (
    <Container>
      {dashType === '' && (
        <div>
          <Loader />
        </div>
      )}

      {/* Dash Gestor */}
      {dashType === 'manager' && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash user={user.name} />

          {/* Cards pequenos */}
          <TopCardsDash typeCards="manager" cardsData={topCardsDataManager} />

          {/* Status geral dos jobs + Pizza top clientes */}
          <GraphicLine>
            <BarChartGrafic data={dataStatusAll} title={'Status Geral Jobs'} />
            <ChartDonut data={dataDahs} title={'Top Clientes'} dataKey="value" />
          </GraphicLine>

          {/* Jobs entregues */}
          <ContainerGroupTable>
            <TableDefault
              title="Jobs Entregues"
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
                          row.job_status === 'fazendo'
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
              title="Jobs Entregues"
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
                          row.job_status === 'fazendo'
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
          <ContainerGroupTable>
            <TableDefault
              title="Clientes detalhado"
              titleSize="14px"
              titleWeight="700"
              titleColor="#222"
            >
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Atendimento</th>
                  <th style={{ backgroundColor: '#00BFA5' }}>Entregue</th>
                  <th>Aprovação</th>
                  <th>Criação</th>
                  <th>Cancelado</th>
                  <th style={{ backgroundColor: '#FFAB00' }}>Pendente</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Terex</td>
                  <td>Amanda</td>
                  <td style={{ color: '#00BFA5' }}>123</td>
                  <td>3</td>
                  <td>4</td>
                  <td>1</td>
                  <td style={{ color: '#FFAB00' }}>3</td>
                </tr>
              </tbody>
            </TableDefault>
          </ContainerGroupTable>

          {/* Alterações interna e externa */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <CardBase>
              <div className="card-title">Alterações Internas</div>
              <BarChartGrafic data={dataChanges} isVertical={true} />
            </CardBase>
            <CardBase>
              <div className="card-title">Alterações Externas</div>
              <BarChartGrafic data={dataChanges} isVertical={true} />
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
                      <td>Terex</td>
                      <td>Job 1</td>
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
        </SectionDefault>
      )}

      {/* Dash executivo */}
      {dashType === 'executive' && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash user={user.name} />

          {/* Cards pequenos */}
          <TopCardsDash typeCards="executive" cardsData={topCardsDataExecutive} />

          {/* Performance Cliente */}
          <CardBase>
            <div className="card-title">Performance clientes</div>
            <ContainerGroupTable>
              <TableDefault title="" titleSize="14px" titleWeight="700" titleColor="#222">
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
                        <JobStatus
                          className={
                            row.job_status === 'fazendo'
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
          </CardBase>

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

          {/* Status geral dos jobs + Pizza top clientes */}
          <GraphicLine>
            <BarChartGrafic data={dataStatusAll} title={'Status Geral Jobs'} />
            <ChartDonut data={dataDahs} title={'Top Clientes'} dataKey="value" />
          </GraphicLine>
        </SectionDefault>
      )}

      {/* Dash tráfego */}
      {dashType === 'traffic' && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash user={user.name} />

          {/* Monitoramento do time */}
          <CardBase>
            <div className="card-title">Monitoramento do time</div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
              <BaseTableGrey>
                <table>
                  <thead>
                    <tr>
                      <th>CLIENTE</th>
                      <th>TIME</th>
                      <th>JOB</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Metso</td>
                      <td>Time 1</td>
                      <td>Planejamento</td>
                      <td>
                        <div
                          className="status"
                          // row.status_job === 'creation'
                          //     ? 'status progress'
                          //     : row.status_job === 'waiting'
                          //       ? 'status'
                          //       : row.status_job === 'finished'
                          //         ? 'status finished'
                          //         : 'status'
                        >
                          Criação
                          {
                            // row.status_job === 'creation'
                            //   ? 'Criação'
                            //   : row.status_job === 'waiting'
                            //   ? 'Aguardando aprovação'
                            //   : row.status_job === 'finished'
                            //   ? 'Concluída'
                            //   : 'Pendente'
                          }
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Metso</td>
                      <td>Time 2</td>
                      <td>Desenvolvimento</td>
                      <td>
                        <div
                          className="status"
                          // row.status_job === 'creation'
                          //     ? 'status progress'
                          //     : row.status_job === 'waiting'
                          //       ? 'status'
                          //       : row.status_job === 'finished'
                          //         ? 'status finished'
                          //         : 'status'
                        >
                          Criação
                          {
                            // row.status_job === 'creation'
                            //   ? 'Criação'
                            //   : row.status_job === 'waiting'
                            //   ? 'Aguardando aprovação'
                            //   : row.status_job === 'finished'
                            //   ? 'Concluída'
                            //   : 'Pendente'
                          }
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </BaseTableGrey>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <NumberCard height_size={'110px'} className="white">
                  <CountUp start={0} end={87} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="numberCard-title">pautas</div>
                </NumberCard>
                <NumberCard height_size={'110px'} className="white">
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

          {/* Monitoramento do time por horas */}
          <CardBase>
            <div className="card-title">Monitoramento do time por horas disponíveis</div>
            <WrapperTeamCards>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', width: '100%' }}>
                {teamTimeData.map((row: TeamDataProps, index: number) => (
                  <TeamTimeCard key={index}>
                    <div
                      className="avatar-user"
                      style={{ backgroundImage: `url(${PersonTest})` }}
                    />
                    <div className="user-name">
                      {row.user_name.split(' ').slice(0, 2).join(' ')}
                    </div>
                    <div className="user-role">{row.user_role}</div>
                    <div className="free-time">
                      <FiClock color="#FFF" />
                      {row.available_time} disponíveis
                    </div>
                  </TeamTimeCard>
                ))}
              </div>
              <NumberCard height_size={'220px'}>
                <CountUp start={0} end={290} delay={0}>
                  {({ countUpRef }) => (
                    <div>
                      <span className="numberCard" ref={countUpRef} />
                    </div>
                  )}
                </CountUp>
                <div className="numberCard-title">horas disponíveis</div>
              </NumberCard>
            </WrapperTeamCards>
          </CardBase>

          {/* Monitoramento do time individual */}
          <CardBase>
            <div className="card-title">Monitoramento do time individual</div>
            {[0, 1].map((row: any, index: number) => (
              <UserTeamCard key={index}>
                <div className="user-section">
                  <div className="user-image" style={{ backgroundImage: `url(${PersonTest})` }} />
                  <div className="user-infos">
                    Marina Chriguer
                    <span>12 Clientes</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <BaseTableGrey>
                    <table>
                      <thead>
                        <tr style={{ height: '48px' }}>
                          <th>CLIENTE</th>
                          <th>JOB</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>

                      <tbody>
                        {[0, 1, 2, 3].map((row, index: number) => (
                          <tr key={index} style={{ height: '48px' }}>
                            <td>Metso</td>
                            <td>Time 1</td>
                            <td>
                              <div
                                className="status"
                                // row.status_job === 'creation'
                                //     ? 'status progress'
                                //     : row.status_job === 'waiting'
                                //       ? 'status'
                                //       : row.status_job === 'finished'
                                //         ? 'status finished'
                                //         : 'status'
                              >
                                Criação
                                {
                                  // row.status_job === 'creation'
                                  //   ? 'Criação'
                                  //   : row.status_job === 'waiting'
                                  //   ? 'Aguardando aprovação'
                                  //   : row.status_job === 'finished'
                                  //   ? 'Concluída'
                                  //   : 'Pendente'
                                }
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </BaseTableGrey>
                </div>

                <UserJobs>
                  <div className="job-card">
                    22 <span>pautas alocadas</span>
                  </div>
                  <div className="job-card">
                    2 <span>pautas na semana</span>
                  </div>
                  <div className="job-card">
                    12 <span>pautas no mês</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div className="small-number-card worked">
                      <CountUp start={0} end={290} delay={0}>
                        {({ countUpRef }) => (
                          <div>
                            <span className="numberCard" ref={countUpRef} />
                          </div>
                        )}
                      </CountUp>
                      horas trabalhadas
                    </div>
                    <div className="small-number-card free">
                      <CountUp start={0} end={12} delay={0}>
                        {({ countUpRef }) => (
                          <div>
                            <span className="numberCard" ref={countUpRef} />
                          </div>
                        )}
                      </CountUp>
                      horas disponíveis
                    </div>
                  </div>
                </UserJobs>
              </UserTeamCard>
            ))}
          </CardBase>
        </SectionDefault>
      )}

      {/* Dash operador */}
      {dashType === 'operator' && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash user={user.name} />

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
              <div className="small-card">
                Total de clientes
                <div className="big-number">7</div>
              </div>
              <div className="small-card">
                Horas de criação
                <div className="big-number">112</div>
              </div>
              <div className="small-card">
                Alt. Clientes
                <div className="big-number">8</div>
              </div>
              <div className="small-card">
                Alt. Internas <div className="big-number">6</div>
              </div>
              <div className="small-card">
                Pautas <div className="big-number">32</div>
              </div>
              <div className="small-card">
                Horas <div className="big-number">78</div>
              </div>
            </SmallCardsWrapper>
          </OperatorTopWrapper>

          {/* Clients & jobs table */}
          <BaseTableGrey>
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Job</th>
                  <th>Status</th>
                  <th style={{ color: '#F9FAFB' }}>-</th>
                </tr>
              </thead>

              <tbody>
                {[0, 1, 2, 3].map((row, index: number) => (
                  <tr key={index}>
                    <td>Metso</td>
                    <td>
                      <JobCellTable>
                        <div className="top-cell">Planejamento de Marketing</div>
                        <div className="bottom-cell">001 - Cronograma - Julho 2023</div>
                      </JobCellTable>
                    </td>
                    <td>
                      <StatusTable
                      // className={
                      //   row.status === 'Em Andamento'
                      //     ? 'status progress'
                      //     : row.status === 'Concluida'
                      //       ? 'status finished'
                      //       : 'status'
                      // }
                      >
                        {/* {row.status === 'Em Andamento'
                          ? 'Em progresso'
                          : row.status === 'Concluida'
                            ? 'Concluída'
                            : row.status === 'Aguardando Aprovação'
                              ? 'Aguardando Aprovação'
                              : 'Pendente'} */}
                        Pendente
                      </StatusTable>
                    </td>
                    <td>
                      <div className="fieldTableClients">
                        <ButtonTable typeButton="view" onClick={() => ''} />
                        <ButtonTable typeButton="edit" onClick={() => ''} />
                        <Alert
                          title="Atenção"
                          subtitle="Certeza que gostaria de deletar este Projeto? Ao excluir a ação não poderá ser desfeita."
                          confirmButton={() => ''}
                        >
                          <ButtonTable typeButton="delete" />
                        </Alert>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BaseTableGrey>

          {/* Status jobs overall */}
          <BarChartGrafic data={dataStatusAll} title={'Status Geral Jobs'} />
        </SectionDefault>
      )}
    </Container>
  );
}
