import { useAuth } from '../../hooks/AuthContext';

import { CardDataDash } from '../../components/Cards/CardDataDash';
import { CardWelcomeDash } from '../../components/Cards/CardWelcomeDash';
import BarChartGrafic from '../../components/GraphicsChart/BarChartGrafic';
import ChartDonut from '../../components/GraphicsChart/ChartDonut';
import { TableDefault } from '../../components/TableDefault';
import { ContainerGroupTable, SectionDefault } from '../../components/UiElements/styles';

import {
  Container,
  JobStatus,
  MensalReport,
  ServicePerformance,
  UserCardService,
  UserInfo
} from './styles';

export default function Dashboard() {
  const { user } = useAuth();

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

  return (
    <Container>
      <SectionDefault style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <CardWelcomeDash user={user.name} />

        <div className="contentData">
          <CardDataDash data={42} type="success" description="Total de clientes" />

          <CardDataDash data={443} type="creation" description="Horas de criação" />

          <CardDataDash data={46} type="info" description="Alt. internas" />

          <CardDataDash data={56} type="danger" description="Alt. externas" />

          <CardDataDash data={52} type="warning" description="Equipes" />
        </div>

        <ContainerGroupTable>
          <BarChartGrafic data={dataStatusAll} title={'Status Geral Jobs'} />
          <ChartDonut data={dataDahs} title={'Top Clientes'} dataKey="value" />
        </ContainerGroupTable>

        <ContainerGroupTable>
          <TableDefault title="Jobs Entregues">
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

          <TableDefault title="Jobs Entregues">
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

        <ServicePerformance>
          <div className="title-service">Performance do Atendimento</div>

          <UserCardService>
            <UserInfo>
              <div className="user-image" />
              <div className="user-name">
                Amanda do Carmo
                <span>12 clientes</span>
              </div>
            </UserInfo>

            <div>grafico</div>

            <MensalReport>
              <div className="report-bold">Report mensal</div>
              <div className="report-info">Balanço de ações</div>
              <div className="report-info">Mídias</div>
              <div className="report-bold">12 reuniões</div>
            </MensalReport>
          </UserCardService>
        </ServicePerformance>
      </SectionDefault>
    </Container>
  );
}
