import BarChartUser from '../../GraphicsChart/BarChartUser';
import { ContainerCard, GraphicsCard, JobStatusTable, MensalReport } from './styles';

interface ClientPerformance {
  data_chart?: ChartDataProps;
  data_table?: TableDataProps[];
  mensal_report?: MensalReportProps;
}

export interface ChartDataProps {
  client_name: string;
  graphics: ChartGraphic[];
}

interface ChartGraphic {
  name: string;
  pv: number;
  fill: string;
}

interface TableDataProps {
  job_name: string;
  status_job: string;
}

interface MensalReportProps {
  reunions: number;
  principalTask: string;
}

export default function PerformanceClientCard({
  data_chart,
  data_table,
  mensal_report
}: ClientPerformance) {
  return (
    <ContainerCard>
      <GraphicsCard>
        <div className="graphicTitle">{data_chart?.client_name}</div>

        <BarChartUser data={data_chart?.graphics} height={'160px'} />
      </GraphicsCard>

      <JobStatusTable>
        <table>
          <thead>
            <tr>
              <th>JOB</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data_table?.map((row, index: number) => (
              <tr key={index}>
                <td>{row.job_name}</td>
                <td>
                  <div
                    className={
                      row.status_job === 'creation'
                        ? 'status progress'
                        : row.status_job === 'waiting'
                        ? 'status'
                        : row.status_job === 'finished'
                        ? 'status finished'
                        : 'status'
                    }
                  >
                    {row.status_job === 'creation'
                      ? 'Criação'
                      : row.status_job === 'waiting'
                      ? 'Aguardando aprovação'
                      : row.status_job === 'finished'
                      ? 'Concluída'
                      : 'Pendente'}
                  </div>
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>Planejamento</td>
              <td>
                <div className="status">Pendente</div>
              </td>
            </tr>
            <tr>
              <td>Planejamento</td>
              <td>
                <div className="status">Aguardando aprovação</div>
              </td>
            </tr>
            <tr>
              <td>Planejamento</td>
              <td>
                <div className="status progress">Criação</div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </JobStatusTable>

      <MensalReport>
        <div className="report-bold">Reports enviados</div>
        <div className="report-info">{mensal_report?.principalTask}</div>
        <div className="report-bold">Reuniões</div>
        <div className="report-info">{mensal_report?.reunions}</div>
      </MensalReport>
    </ContainerCard>
  );
}
