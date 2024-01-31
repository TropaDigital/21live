// React
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

// Styles
import {
  ClientWrapper,
  ClientLogo,
  ReportHeader,
  ReportWrapper,
  ClientInfos,
  ReportMonth,
  ReportCards,
  InfoCards,
  BulletPointInfos,
  ReportCardTable
} from './styles';

// Components
import HeaderPage from '../../components/HeaderPage';
import { ContainerDefault } from '../../components/UiElements/styles';
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import { TableDefault } from '../../components/TableDefault';

// Icons
import { IoMdDownload } from 'react-icons/io';

// Libraries
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';

interface ReportProps {
  client: string;
  contract: string;
  date_start: string;
  date_end: string;
}

interface JobList {
  job_title: string;
  status: string;
  start_date: string;
  end_date: string;
  total_hours: string;
}

export default function MonthlyReport() {
  const location = useLocation();
  const inputRef = useRef<any>(null);

  const reportInfos: ReportProps = location.state;
  console.log('log reportInfos =>', reportInfos);

  // print Dash to PDF
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData: any = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, 'FAST');
      pdf.save('report.pdf');
    });
  };

  const jobList = [
    {
      job_title: 'Job X 1',
      status: 'concluido',
      start_date: '12/10/2023',
      end_date: '15/10/2023',
      total_hours: '01:23:26'
    },
    {
      job_title: 'Job X 2',
      status: 'concluido',
      start_date: '15/10/2023',
      end_date: '18/10/2023',
      total_hours: '03:14:33'
    },
    {
      job_title: 'Job X 3',
      status: 'concluido',
      start_date: '13/10/2023',
      end_date: '19/10/2023',
      total_hours: '12:01:41'
    },
    {
      job_title: 'Job X 4',
      status: 'concluido',
      start_date: '17/10/2023',
      end_date: '21/10/2023',
      total_hours: '07:45:22'
    },
    {
      job_title: 'Job X 5',
      status: 'concluido',
      start_date: '13/10/2023',
      end_date: '21/10/2023',
      total_hours: '05:23:26'
    },
    {
      job_title: 'Job X 6',
      status: 'concluido',
      start_date: '12/10/2023',
      end_date: '15/10/2023',
      total_hours: '01:23:26'
    },
    {
      job_title: 'Job X 7',
      status: 'concluido',
      start_date: '12/10/2023',
      end_date: '15/10/2023',
      total_hours: '01:23:26'
    },
    {
      job_title: 'Job X 8',
      status: 'concluido',
      start_date: '12/10/2023',
      end_date: '15/10/2023',
      total_hours: '01:23:26'
    },
    {
      job_title: 'Job X 9',
      status: 'concluido',
      start_date: '12/10/2023',
      end_date: '15/10/2023',
      total_hours: '01:23:26'
    },
    {
      job_title: 'Job X 10',
      status: 'concluido',
      start_date: '12/10/2023',
      end_date: '15/10/2023',
      total_hours: '01:23:26'
    }
  ];

  return (
    <ContainerDefault>
      <HeaderPage title="Relatório">
        <ButtonDefault typeButton="primary" isOutline onClick={printDocument}>
          Download
          <IoMdDownload />
        </ButtonDefault>
      </HeaderPage>

      <ReportWrapper ref={inputRef}>
        <ReportHeader>
          <ClientWrapper>
            <ClientLogo bgColor="">
              {/* <div className="logo-img" style={{ backgroundImage: `url(${Logo})` }}></div> */}
            </ClientLogo>
            <ClientInfos>
              <div className="report-title">Reporte mensal</div>
              <div className="client-name">Cliente: TEREX</div>
              <div className="infos">Contato: Bruno Picini</div>
              <div className="infos">Atendimento: Mike Magalhães</div>
            </ClientInfos>
          </ClientWrapper>

          <ReportMonth>
            <div className="title-info">21BRZ</div>
            <div className="month">
              Data inicial: {moment(reportInfos.date_start).format('DD/MM/YYYY')}
            </div>
            <div className="month">
              Data final: {moment(reportInfos.date_end).format('DD/MM/YYYY')}
            </div>
          </ReportMonth>
        </ReportHeader>

        <ReportCards>
          <InfoCards className="light">
            <div className="card-title">
              OVERVIEW PERÍODO
              <span>
                DE {moment(reportInfos.date_start).format('DD/MM/YYYY')} a{' '}
                {moment(reportInfos.date_end).format('DD/MM/YYYY')}
              </span>
            </div>

            <BulletPointInfos>
              <div className="bullet">
                Total jobs entregues: <span>32</span>
              </div>
              <div className="bullet">
                Total horas: <span>26h</span>
              </div>
              <div className="bullet">
                Jobs em andamento: <span>4</span>
              </div>
              <div className="bullet">
                Horas Jobs em andamento: <span>2:21</span>
              </div>
              <div className="bullet">
                Saldo horas contrato: <span>3:39</span>
              </div>

              <div className="bullet space">
                Reuniões realizadas: <span>3</span>
              </div>
              <div className="bullet">
                Tempo médio aprovação cliente: <span>7 dias</span>
              </div>
            </BulletPointInfos>
          </InfoCards>

          <InfoCards className="dark">
            <div className="card-title">RESUMO CONTRATO</div>
            <div className="info-line">Inicio: 01/02/2022</div>
            <div className="info-line">Tipo: FEE</div>
            <div className="info-line">Total horas contrato: 30H</div>

            <div className="card-subtitle">PRODUTOS:</div>
            <BulletPointInfos>
              <div className="bullet">Produto 01</div>
              <div className="bullet">Produto 02</div>
              <div className="bullet">Produto 03</div>
              <div className="bullet">Produto 04</div>
              <div className="bullet">Produto 05</div>
            </BulletPointInfos>
          </InfoCards>
        </ReportCards>

        <ReportCardTable>
          <div className="card-title">LISTA DE JOBS NO PERÍODO</div>

          <TableDefault title="" titleSize="14px" titleWeight="700" titleColor="#222">
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Data Inicio</th>
                <th>Data Final</th>
                <th>Total Horas</th>
              </tr>
            </thead>

            <tbody>
              {jobList.slice(0, 5).map((row: JobList, index: any) => (
                <tr key={index}>
                  <td>{row.job_title}</td>
                  <td>Entregue</td>
                  <td>{row.start_date}</td>
                  <td>{row.end_date}</td>
                  <td>{row.total_hours}</td>
                </tr>
              ))}
            </tbody>
          </TableDefault>
        </ReportCardTable>

        <ReportCardTable>
          <div className="card-title">JOBS PENDENTES DE APROVAÇÃO CLIENTE</div>

          <TableDefault title="" titleSize="14px" titleWeight="700" titleColor="#222">
            <thead>
              <tr>
                <th>Job</th>
                <th>Status</th>
                <th>Data Inicio</th>
                <th>Data Final</th>
                <th>Total Horas</th>
              </tr>
            </thead>

            <tbody>
              {jobList.slice(0, 5).map((row: JobList, index: any) => (
                <tr key={index}>
                  <td>{row.job_title}</td>
                  <td>Pendente</td>
                  <td>{row.start_date}</td>
                  <td>-</td>
                  <td>{row.total_hours}</td>
                </tr>
              ))}
            </tbody>
          </TableDefault>
        </ReportCardTable>
      </ReportWrapper>
    </ContainerDefault>
  );
}
