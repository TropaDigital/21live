import BarChartUser from '../../GraphicsChart/BarChartUser';
import { ContainerCard, GraphicsCard, MensalReport, UserInfo } from './styles';

// interface DataProps {
//   data: UserCardProps[];
// }

export interface UserCardProps {
  userInfos: UserInfos;
  chartData: ChartDataProps[];
  mensalReport: MensalReportProps;
}

interface UserInfos {
  user_name: string;
  clientsNumber: number;
  avatar: string;
}

interface ChartDataProps {
  name: string;
  pv: number;
  fill: string;
}

interface MensalReportProps {
  reunions: number;
  principalTask: string;
}

export default function UserPerformanceCard({ userInfos, chartData, mensalReport }: UserCardProps) {
  return (
    <ContainerCard>
      <UserInfo>
        <div className="user-image" style={{ backgroundImage: `url(${userInfos.avatar})` }} />
        <div className="user-name">
          {userInfos.user_name}
          <span>{userInfos.clientsNumber} clientes</span>
        </div>
      </UserInfo>

      <GraphicsCard>
        <BarChartUser data={chartData} />
      </GraphicsCard>

      <MensalReport>
        <div className="report-bold">Report mensal</div>
        <div className="report-info">{mensalReport.principalTask}</div>
        <div className="report-bold">Reuniões</div>
        <div className="report-info">{mensalReport.reunions}</div>
      </MensalReport>
    </ContainerCard>
  );
}
