// Hooks
import { useAuth } from '../../hooks/AuthContext';

// Components
import { CardDataDash } from '../../components/Cards/CardDataDash';
import { CardWelcomeDash } from '../../components/Cards/CardWelcomeDash';
import BarChartGrafic from '../../components/GraphicsChart/BarChartGrafic';
import ChartDonut from '../../components/GraphicsChart/ChartDonut';
import { TableDefault } from '../../components/TableDefault';
import { ContainerGroupTable, SectionDefault } from '../../components/UiElements/styles';
import BarChartUser from '../../components/GraphicsChart/BarChartUser';

// Styles
import {
  BlueCard,
  CardBase,
  Container,
  GraphicLine,
  GridServiceWrapper,
  JobStatus,
  MensalReport,
  ServicePerformance,
  UserCardService,
  UserInfo
} from './styles';

// Libraries
import CountUp from 'react-countup';

import PersonTest from '../../assets/person.jpg';
import { useState } from 'react';

export default function Dashboard() {
  const { user } = useAuth();
  const [dashType, setDashType] = useState<string>('manager');

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

  const dataUser = [
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

  return (
    <Container>
      {/* Dash Gestor */}
      {dashType === 'manager' && (
        <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <CardWelcomeDash user={user.name} />

          {/* Cards pequenos */}
          <div className="contentData">
            <CardDataDash data={42} type="success" description="Total de clientes" />

            <CardDataDash data={443} type="creation" description="Horas de criação" />

            <CardDataDash data={46} type="info" description="Alt. internas" />

            <CardDataDash data={56} type="danger" description="Alt. externas" />

            <CardDataDash data={52} type="warning" description="Equipes" />
          </div>

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
          <ServicePerformance>
            <div className="title-service">Performance do Atendimento</div>

            <UserCardService>
              <UserInfo>
                <div className="user-image" style={{ backgroundImage: `url(${PersonTest})` }} />
                <div className="user-name">
                  Amanda do Carmo
                  <span>12 clientes</span>
                </div>
              </UserInfo>

              <div style={{ width: '50%' }}>
                <BarChartUser data={dataUser} />
              </div>

              <MensalReport>
                <div className="report-bold">Report mensal</div>
                <div className="report-info">Balanço de ações</div>
                <div className="report-info">Mídias</div>
                <div className="report-bold">12 reuniões</div>
              </MensalReport>
            </UserCardService>
          </ServicePerformance>

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
                <BlueCard>
                  <CountUp start={0} end={87} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="blueCard-title">pautas</div>
                </BlueCard>
                <BlueCard>
                  <CountUp start={0} end={290} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="blueCard-title">horas</div>
                </BlueCard>
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
                <BlueCard className="small">
                  <CountUp start={0} end={87} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="blueCard-title">pautas</div>
                </BlueCard>

                <BlueCard className="small">
                  <CountUp start={0} end={290} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span className="numberCard" ref={countUpRef} />
                      </div>
                    )}
                  </CountUp>
                  <div className="blueCard-title">horas</div>
                </BlueCard>
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
          <div className="contentData">
            <CardDataDash data={42} type="success" description="Total de clientes" />

            <CardDataDash data={443} type="creation" description="Horas de criação" />

            <CardDataDash data={46} type="info" description="Alt. internas" />

            <CardDataDash data={56} type="danger" description="Alt. externas" />
          </div>

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
          </CardBase>
        </SectionDefault>
      )}

      {/* Dash tráfego */}
      {dashType === 'traffic' && (
        <div>
          Tráfego
          <div></div>
        </div>
      )}

      {/* Dash operador */}
      {dashType === 'operator' && (
        <div>
          Operador
          <div></div>
        </div>
      )}
    </Container>
  );
}
