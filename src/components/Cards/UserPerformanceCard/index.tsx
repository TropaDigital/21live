// Styles
import { TableDefault } from '../../TableDefault';
import { ContainerCard, GraphicsCard, MensalReport, UserInfo } from './styles';

// interface DataProps {
//   data: UserCardProps[];
// }

export interface UserCardProps {
  userInfos: UserInfos;
  tableData: TableProps;
  mensalReport: MensalReportProps;
}

interface UserInfos {
  user_name: string;
  clientsNumber: number;
  avatar: string;
}

interface TableProps {
  totalJobs: number;
  pendingSend: number;
  pendingApro: number;
  approved: number;
}

interface MensalReportProps {
  reunions: number;
  reports: string;
}

export default function UserPerformanceCard({ userInfos, tableData, mensalReport }: UserCardProps) {
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
        <TableDefault title="" titleSize="14px" titleWeight="700" titleColor="#222">
          <thead>
            <tr>
              <th>Total de Jobs</th>
              <th>Pendente (Envio)</th>
              <th>Pendente (Aprovação)</th>
              <th>Aprovados</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{tableData.totalJobs}</td>
              <td>{tableData.pendingSend}</td>
              <td>{tableData.pendingApro}</td>
              <td>{tableData.approved}</td>
            </tr>
          </tbody>
        </TableDefault>
      </GraphicsCard>

      <MensalReport>
        <div className="report-bold">Report mensal</div>
        <div className="report-info">{mensalReport.reports ? mensalReport.reports : '-----'}</div>
        <div className="report-bold">Reuniões</div>
        <div className="report-info">{mensalReport.reunions}</div>
      </MensalReport>
    </ContainerCard>
  );
}
