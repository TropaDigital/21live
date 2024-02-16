/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

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
  ReportCardTable,
  HeaderBtns
} from './styles';

// Components
import HeaderPage from '../../components/HeaderPage';
import { ContainerDefault } from '../../components/UiElements/styles';
import ButtonDefault from '../../components/Buttons/ButtonDefault';
import { TableDefault } from '../../components/TableDefault';
import Loader from '../../components/LoaderSpin';

// Icons
import { IoMdDownload } from 'react-icons/io';
import { MdOutlineImageNotSupported } from 'react-icons/md';
import { FiSend } from 'react-icons/fi';

// Libraries
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';

// Hooks
import { useToast } from '../../hooks/toast';

// Services
import api from '../../services/api';
import ModalLoader from '../../components/Ui/ModalLoader';

interface ReportProps {
  client_id: string;
  client_name: string;
  contract: string;
  date_start: string;
  date_end: string;
  requesters: [];
}

interface JobListProps {
  task_id: string;
  title: string;
  tenant_id: string;
  project_product_id: string;
  flow_id: string;
  description: string;
  creation_description: string;
  creation_date_end: string;
  copywriting_description: string;
  copywriting_date_end: string;
  step: string;
  created: string;
  updated: string;
  deleted: string;
  type: string;
  total_time: string;
  status: string;
  time_consumed: string;
  type_play: string;
  user_id: string;
  urgent: string;
  ticket_id: string;
  start_job: string;
  end_job: string;
  organization_id: string;
  requester_id: string;
  parent_id: string;
  return_id: string;
}

interface ReportFullInfoProps {
  overview_periodo: {
    tarefa_concluida_qtd: string;
    tarefa_concluida_tempo: string;
    tarefa_em_andamento_qtd: string;
    tarefa_em_andamento_tempo: string;
    projeto_tempo_consumido: string;
    reunioes_qtd: string;
  };
  resumo_contrato: {
    inicio: string;
    fim: string;
    categoria: string;
    total_horas: string;
    produtos: ProductsArray[];
  };
  lista_jobs_entregue: [];
  lista_jobs_aguardando: [];
  tenant: {
    bucket: string;
    name: string;
    colormain: string;
    colorsecond: string;
    colorhigh: string;
  };
}

interface ProductsArray {
  project_product_id: string;
  job_service_id: string;
  project_id: string;
  service: string;
  description: string;
  type: string;
  size: string;
  flag: string;
  minutes: string;
  quantity: string;
  quantity_initial: string;
  period: string;
  minutes_initial: string;
  minutes_creation: string;
  minutes_essay: string;
  minutes_total: string;
}

export default function MonthlyReport() {
  const location = useLocation();
  const inputRef = useRef<any>(null);
  const { addToast } = useToast();

  const todayDate = new Date();
  const reportInfos: ReportProps = location.state;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [dataInfoReport, setDataInfoReport] = useState<ReportFullInfoProps>({
    overview_periodo: {
      tarefa_concluida_qtd: '',
      tarefa_concluida_tempo: '',
      tarefa_em_andamento_qtd: '',
      tarefa_em_andamento_tempo: '',
      projeto_tempo_consumido: '',
      reunioes_qtd: ''
    },
    resumo_contrato: {
      inicio: '',
      fim: '',
      categoria: '',
      total_horas: '',
      produtos: []
    },
    lista_jobs_aguardando: [],
    lista_jobs_entregue: [],
    tenant: {
      name: '',
      bucket: '',
      colorhigh: '',
      colormain: '',
      colorsecond: ''
    }
  });

  async function getReportFullInfos() {
    try {
      setLoadingData(true);
      const response = await api.get(
        `/report?tenant_id=${reportInfos.client_id}&date_start=${reportInfos.date_start}&date_end=${reportInfos.date_end}&project_id=${reportInfos.contract}`
      );

      setDataInfoReport(response.data.result);

      setLoadingData(false);
    } catch (error: any) {
      console.log('log do error getting report', error);
      addToast({
        title: 'Atenção',
        description: error.message,
        type: 'warning'
      });
      setLoadingData(false);
    }
  }

  useEffect(() => {
    // console.log('log reportInfos =>', reportInfos);
    if (reportInfos) {
      getReportFullInfos();
    }
  }, []);

  // print and download
  const printDocument = () => {
    setLoading(true);
    html2canvas(inputRef.current, { useCORS: true, allowTaint: true }).then((canvas) => {
      const imgData: any = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, 'FAST');
      pdf.save(`report-${moment(todayDate).format('YYYY-MM-DD')}.pdf`);
    });
    setLoading(false);
  };

  // print and send report
  const printAndSend = async () => {
    const canvas = await html2canvas(inputRef.current, { useCORS: true, allowTaint: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, 'FAST');

    const blob = pdf.output('blob');

    const formData = new FormData();
    formData.append('file', blob, `report-${moment(todayDate).format('YYYY-MM-DD')}.pdf`);
    formData.append('tenant_id', reportInfos.client_id);

    try {
      setLoading(true);

      const response = await api.post('/archive/report', formData);
      console.log('File uploaded successfully', response);

      const reportBody = {
        users: reportInfos.requesters,
        url: response.data.result.url,
        tenant_id: reportInfos.client_id
      };

      const responseSend = await api.post(`/report/send`, reportBody);

      if (responseSend.data.status === 'success') {
        addToast({
          type: 'success',
          title: 'SUCESSO',
          description: 'Report enviado com sucesso!'
        });
      }

      setLoading(false);
    } catch (error: any) {
      console.error('Error send report', error);
      setLoading(false);
      if (error.response.data.result.length !== 0) {
        error.response.data.result.map((row: any) => {
          addToast({
            type: 'danger',
            title: 'ATENÇÃO',
            description: row.error
          });
        });
      } else {
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: error.response.data.message
        });
      }
      setLoading(false);
    }

    // Optionally, you can download the file locally
    pdf.save(`report-${moment(todayDate).format('YYYY-MM-DD')}.pdf`);
  };

  return (
    <ContainerDefault>
      <HeaderPage title="Relatório">
        <HeaderBtns>
          <ButtonDefault typeButton="success" isOutline onClick={printAndSend} loading={loading}>
            Enviar para a área do Cliente
            <FiSend />
          </ButtonDefault>

          <ButtonDefault typeButton="primary" isOutline onClick={printDocument}>
            Download
            <IoMdDownload />
          </ButtonDefault>
        </HeaderBtns>
      </HeaderPage>

      {loadingData && <Loader />}

      {!loadingData && (
        <ReportWrapper ref={inputRef}>
          {/* Header Tenant infos */}
          <ReportHeader>
            <ClientWrapper>
              <ClientLogo bgColor={dataInfoReport.tenant.colormain}>
                {dataInfoReport.tenant.bucket !== '' &&
                dataInfoReport.tenant.bucket !== undefined ? (
                  <div
                    className="logo-img"
                    style={{
                      backgroundImage: `url(https://${dataInfoReport.tenant.bucket}.s3.amazonaws.com/tenant/logo.png)`
                    }}
                  ></div>
                ) : (
                  <MdOutlineImageNotSupported
                    size={68}
                    color={`#${dataInfoReport.tenant.colorsecond}`}
                  />
                )}
              </ClientLogo>
              <ClientInfos>
                <div className="report-title">Reporte mensal</div>
                <div className="client-name">Cliente: {reportInfos.client_name}</div>
                <div className="infos">Contato: -----</div>
                <div className="infos">Atendimento: -----</div>
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

          {/* Cards Light and Dark */}
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
                  Total jobs entregues:{' '}
                  <span>{dataInfoReport?.overview_periodo?.tarefa_concluida_qtd}</span>
                </div>
                <div className="bullet">
                  Total horas:{' '}
                  <span>
                    {dataInfoReport?.overview_periodo?.tarefa_concluida_tempo.split(':')[0]}H
                  </span>
                </div>
                <div className="bullet">
                  Jobs em andamento:{' '}
                  <span>{dataInfoReport?.overview_periodo?.tarefa_em_andamento_qtd}</span>
                </div>
                <div className="bullet">
                  Horas Jobs em andamento:{' '}
                  <span>
                    {dataInfoReport?.overview_periodo?.tarefa_em_andamento_tempo?.split(':')[0]}H
                  </span>
                </div>
                <div className="bullet">
                  Saldo horas contrato:{' '}
                  <span>
                    {dataInfoReport?.overview_periodo?.projeto_tempo_consumido?.split(':')[0]}H
                  </span>
                </div>

                <div className="bullet space">
                  Reuniões realizadas: <span>{dataInfoReport?.overview_periodo.reunioes_qtd}</span>
                </div>
                <div className="bullet">
                  Tempo médio aprovação cliente: <span>? dias</span>
                </div>
              </BulletPointInfos>
            </InfoCards>

            <InfoCards className="dark">
              <div className="card-title">RESUMO CONTRATO</div>
              <div className="info-line">
                Inicio: {moment(dataInfoReport?.resumo_contrato.inicio).format('DD/MM/YY')}
              </div>
              <div className="info-line">Tipo: {dataInfoReport?.resumo_contrato?.categoria}</div>
              <div className="info-line">
                Total horas contrato: {dataInfoReport?.resumo_contrato?.total_horas?.split(':')[0]}H
              </div>

              <div className="card-subtitle">PRODUTOS:</div>
              <BulletPointInfos>
                {dataInfoReport?.resumo_contrato?.produtos?.slice(0, 5).map((row) => (
                  <div className="bullet" key={row.project_product_id}>
                    {row.service}
                  </div>
                ))}
              </BulletPointInfos>
            </InfoCards>
          </ReportCards>

          {/* Jobs finished */}
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

              {dataInfoReport?.lista_jobs_entregue?.length > 0 && (
                <tbody>
                  {/* {jobList.slice(0, 5).map((row: JobListProps, index: any) => ( */}
                  {dataInfoReport?.lista_jobs_entregue?.map((row: JobListProps, index: any) => (
                    <tr key={index}>
                      <td>{row.title}</td>
                      <td>Entregue</td>
                      <td>{moment(row.start_job).format('DD/MM/YYYY')}</td>
                      <td>{moment(row.updated).format('DD/MM/YYYY')}</td>
                      <td>{row.time_consumed}</td>
                    </tr>
                  ))}
                </tbody>
              )}

              {dataInfoReport?.lista_jobs_entregue?.length <= 0 && (
                <tbody>
                  <tr>
                    <td colSpan={5}>Sem tarefas concluídas no período</td>
                  </tr>
                </tbody>
              )}
            </TableDefault>
          </ReportCardTable>

          {/* Jobs awaiting */}
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

              {dataInfoReport?.lista_jobs_aguardando?.length > 0 && (
                <tbody>
                  {dataInfoReport?.lista_jobs_aguardando?.map((row: JobListProps, index: any) => (
                    <tr key={index}>
                      <td>{row.title}</td>
                      <td>Pendente</td>
                      <td>{moment(row.start_job).format('DD/MM/YYYY')}</td>
                      <td>-</td>
                      <td>{row.time_consumed}</td>
                    </tr>
                  ))}
                </tbody>
              )}

              {dataInfoReport?.lista_jobs_aguardando?.length <= 0 && (
                <tbody>
                  <tr>
                    <td colSpan={6}>Sem tarefas pendentes no período</td>
                  </tr>
                </tbody>
              )}
            </TableDefault>
          </ReportCardTable>
        </ReportWrapper>
      )}

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading} />
    </ContainerDefault>
  );
}
