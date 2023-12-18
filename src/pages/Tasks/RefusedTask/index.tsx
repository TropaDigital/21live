/* eslint-disable react-hooks/exhaustive-deps */
// react
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Icons
import { BsQuestionOctagon } from 'react-icons/bs';
import { BiCalendar } from 'react-icons/bi';

// Components
import HeaderPage from '../../../components/HeaderPage';
import { useParamsHook } from '../../../hooks/useParams';
import { FileList } from '../../Projects/ListProjects/styles';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { ModalButtons } from '../ViewTask/styles';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import Loader from '../../../components/LoaderSpin';

// Styles
import {
  FormTitle,
  FormWrapper,
  RefusedWrapper,
  SummaryInfoWrapper,
  SummaryDefault,
  SummaryTaskDescription,
  SummaryTaskInfo,
  SummaryWrapper,
  SummaryLeft,
  DeliveriesTitle,
  DeliveriesWrapper,
  SummaryCardTitle,
  SummaryCardSubtitle,
  SummaryCard,
  SummaryTasksAbout,
  SummaryButtons,
  SummaryTaskTitleWithIcon,
  SummaryHoverInfo,
  ModalTaskWrapper,
  ModalField
} from './styles';

// Libraries
import moment from 'moment';

// Hooks
import useForm from '../../../hooks/useForm';
import { useFetch } from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/toast';

// Services
import api from '../../../services/api';

// Utils
import { subtractTime } from '../../../utils/convertTimes';

interface ModalProps {
  isOpen: boolean;
  typeOfField: 'title' | 'flow' | 'flowStep' | 'date' | undefined;
}

interface TaskProps {
  card_name: string;
  copywriting_date_end: string;
  copywriting_description: string;
  creation_date_end: string;
  creation_description: string;
  deliverys: [];
  description: string;
  end_job: string;
  files: [];
  flow: string;
  flow_id: string;
  organization_id: string;
  parent_id: string;
  paret_type: string;
  product_period: string;
  project: string;
  project_category: string;
  project_product_id: string;
  project_type: string;
  requester_id: string;
  start_job: string;
  status: string;
  step: string;
  task_id: string;
  tenant: string;
  tenant_id: string;
  ticket_id: string;
  time: string;
  time_consumed: string;
  title: string;
  total_time: string;
  type: string;
  type_play: string;
  urgent: string;
  user_id: string;
  name: string;
  project_id: string;
  gen_ticket: string;
}

export default function CreateTaksWithRefused() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parameters, getParams } = useParamsHook();
  const { addToast } = useToast();
  const { formData, handleOnChange, setData } = useForm({
    card_name: '',
    copywriting_date_end: '',
    copywriting_description: '',
    creation_date_end: '',
    creation_description: '',
    deliverys: [],
    description: '',
    end_job: '',
    files: [],
    flow: '',
    flow_id: '',
    organization_id: '',
    parent_id: '',
    paret_type: '',
    product_period: '',
    project: 'Projeto genérico',
    project_category: '',
    project_product_id: '',
    project_type: '',
    requester_id: '',
    start_job: '',
    status: '',
    step: '',
    task_id: '',
    tenant: '',
    tenant_id: '',
    ticket_id: '',
    time: '',
    time_consumed: '',
    title: 'Título genérico',
    total_time: '',
    type: '',
    type_play: '',
    urgent: '',
    user_id: '',
    name: '',
    project_id: '',
    gen_ticket: ''
  } as TaskProps);
  const [modalEdit, setModalEdit] = useState<ModalProps>({
    isOpen: false,
    typeOfField: undefined
  });
  const [loading, setLoading] = useState<boolean>(false);

  const { data: dataFlow } = useFetch<any[]>(`/flow?perPage=1000`);
  const selectedProducts: any[] = [];

  // async function getTimelineData() {
  //   try {
  //     const response = await api.get(`task/timeline/${location.state.task.task_id}`);
  //     setTimelineData(response.data.result);
  //   } catch (error: any) {
  //     console.log('log timeline error', error);
  //   }
  // }

  // async function checkFlow(checkType: string) {
  //   try {
  //     setLoading(true);

  //       const response = await api.get(
  //         `/flow-function?step=${Number(actualStep) + 1}&flow_id=${dataTask?.flow_id}`
  //       );

  //       if (response.data.result[0].show_hours === 'true') {
  //         setModalSendToUser(true);
  //         // console.log('log do checkFlow to show hours');
  //       }
  //       if (response.data.result[0].show_hours === 'false') {
  //         handleNextUser('next');
  //         // console.log('log do checkFlow to show schedule');
  //       }

  //     setLoading(false);
  //   } catch (error: any) {
  //     console.log('log do error check flow', error);
  //     setLoading(false);
  //   }
  // }

  async function getTaskInfos(id: any) {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/${id}`);
      // console.log('log do response get task', response.data.result);

      if (response.data.result.length > 0) {
        setData(response.data.result[0]);
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log do error getting task', error);
      addToast({
        title: 'Atenção',
        description: error.message,
        type: 'warning'
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    getParams();
    if (location.state.id) {
      getTaskInfos(location.state.id);
    }
  }, []);

  const handleOnSubmit = useCallback(async () => {
    try {
      const {
        card_name,
        copywriting_date_end,
        copywriting_description,
        creation_date_end,
        creation_description,
        deliverys,
        description,
        end_job,
        files,
        flow,
        flow_id,
        organization_id,
        parent_id,
        paret_type,
        product_period,
        project,
        project_category,
        project_product_id,
        project_type,
        requester_id,
        start_job,
        status,
        step,
        task_id,
        tenant,
        tenant_id,
        ticket_id,
        time,
        time_consumed,
        title,
        total_time,
        type,
        type_play,
        urgent,
        user_id,
        name,
        project_id,
        gen_ticket
      } = formData;

      const createNewData = {
        card_name,
        copywriting_date_end,
        copywriting_description,
        creation_date_end,
        creation_description,
        deliverys,
        description,
        end_job,
        files,
        flow,
        flow_id,
        organization_id,
        parent_id,
        paret_type,
        product_period,
        project,
        project_category,
        project_product_id,
        project_type,
        requester_id,
        start_job,
        status,
        step,
        task_id,
        tenant,
        tenant_id,
        ticket_id,
        time,
        time_consumed,
        title,
        total_time,
        type,
        type_play,
        urgent,
        user_id,
        name,
        project_id,
        gen_ticket
      };

      await api.put(`tasks/${location.state.task_id}`, createNewData);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Tarefa criada com sucesso!'
      });
      navigate('/tarefas');
    } catch (e: any) {
      if (e.response.data.result.length !== 0) {
        e.response.data.result.map((row: any) => {
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
          description: e.response.data.message
        });
      }
    }
  }, [formData]);

  // useEffect(() => {
  //   console.log('log do formData =>', formData);
  // }, [formData]);

  return (
    <RefusedWrapper>
      <HeaderPage title="Criar tarefa (com produtos recusados)" />

      {loading && <Loader />}

      {!loading && (
        <FormWrapper>
          <FormTitle>Resumo da tarefa</FormTitle>

          <SummaryWrapper>
            <SummaryLeft>
              <SummaryDefault className="big">
                <div className="title">Informações da tarefa</div>

                <SummaryInfoWrapper>
                  {/* Edit title */}
                  <SummaryTaskInfo>
                    <SummaryTaskTitleWithIcon
                      onClick={() =>
                        setModalEdit({
                          isOpen: true,
                          typeOfField: 'title'
                        })
                      }
                    >
                      Título da tarefa
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsQuestionOctagon />:
                      </div>
                      <SummaryHoverInfo>Clique para editar o título</SummaryHoverInfo>
                    </SummaryTaskTitleWithIcon>
                    <div className="info">{formData.title}</div>
                  </SummaryTaskInfo>

                  <SummaryTaskInfo>
                    <div className="title-info">Cliente:</div>
                    <div className="info">
                      {formData.tenant_id ? formData.tenant_id : 'Cliente'}
                    </div>
                  </SummaryTaskInfo>

                  <SummaryTaskInfo>
                    <div className="title-info">Projeto/Contrato:</div>
                    <div className="info">{formData.project}</div>
                  </SummaryTaskInfo>

                  {/* Edit flow */}
                  <SummaryTaskInfo>
                    <SummaryTaskTitleWithIcon
                      onClick={() =>
                        setModalEdit({
                          isOpen: true,
                          typeOfField: 'flow'
                        })
                      }
                    >
                      Fluxo
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsQuestionOctagon />:
                      </div>
                      <SummaryHoverInfo>Clique para editar o fluxo</SummaryHoverInfo>
                    </SummaryTaskTitleWithIcon>
                    <div className="info">{formData.flow_id}</div>
                  </SummaryTaskInfo>

                  {/* Edit flow step */}
                  <SummaryTaskInfo>
                    <SummaryTaskTitleWithIcon
                      onClick={() =>
                        setModalEdit({
                          isOpen: true,
                          typeOfField: 'flowStep'
                        })
                      }
                    >
                      Etapa do fluxo
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <BsQuestionOctagon />:
                      </div>
                      <SummaryHoverInfo>Clique para editar a etapa do fluxo</SummaryHoverInfo>
                    </SummaryTaskTitleWithIcon>
                    <div className="info">{formData.step}</div>
                  </SummaryTaskInfo>

                  <SummaryTaskInfo>
                    <div className="title-info">
                      Input {parameters.input_name !== '' ? parameters.input_name : 'Pré-requisito'}
                      :
                    </div>
                    <div className="info">
                      <div
                        className="description-info"
                        dangerouslySetInnerHTML={{ __html: formData.copywriting_description }}
                      />
                    </div>
                  </SummaryTaskInfo>

                  <SummaryTaskInfo>
                    <div className="title-info">Input de atividade:</div>
                    <div className="info">
                      <div
                        className="description-info"
                        dangerouslySetInnerHTML={{
                          __html: formData.creation_description
                        }}
                      />
                    </div>
                  </SummaryTaskInfo>

                  <SummaryTaskDescription>
                    <div className="description-title">Contexto geral</div>
                    <div
                      className="description-info"
                      dangerouslySetInnerHTML={{ __html: formData.description }}
                    ></div>
                  </SummaryTaskDescription>

                  {formData.files.length > 0 && (
                    <SummaryTaskDescription>
                      <div className="description-title">Arquivos:</div>
                      {formData.files.map((row: any) => (
                        <FileList key={row.task_file_id}>&#x2022; {row.file_name}</FileList>
                      ))}
                      {/* {taskFiles.map((row: any) => (
                                <FileList key={row.file_id}>&#x2022; {row.file_name}</FileList>
                            ))} */}
                    </SummaryTaskDescription>
                  )}
                </SummaryInfoWrapper>
              </SummaryDefault>

              <SummaryDefault className="big">
                <div className="title">Produtos selecionados</div>

                {selectedProducts?.map((row: any, index: any) => (
                  <DeliveriesWrapper key={index}>
                    <DeliveriesTitle>
                      {row.title ? row.title : `${index + 1}ª Entrega`}

                      {row.date_end && <span>- {moment(row.date_end).format('DD/MM/YYYY')}</span>}
                    </DeliveriesTitle>
                    {row?.products.map((products: any, index: number) => (
                      <SummaryCard key={index} style={{ height: 'fit-content' }}>
                        <SummaryCardTitle>
                          #{index + 1} - {products.service}
                        </SummaryCardTitle>
                        <SummaryCardSubtitle
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: 'fit-content'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%'
                            }}
                          >
                            <div className="description-wrap">
                              Descrição: <span>{products.description}</span>
                            </div>
                            <div>
                              Tipo: <span>{products.category}</span>
                            </div>
                            <div>
                              Horas: <span>{products.minutes}</span>
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%'
                            }}
                          >
                            <div>
                              I/D: <span>{products.type}</span>
                            </div>
                            <div>
                              Formato: <span>{products.size}</span>
                            </div>
                            <div>
                              Quantidade: <span>{products.quantity}</span>
                            </div>
                          </div>
                        </SummaryCardSubtitle>
                      </SummaryCard>
                    ))}
                  </DeliveriesWrapper>
                ))}
              </SummaryDefault>
            </SummaryLeft>

            <SummaryTasksAbout>
              <div className="title">Sobre a tarefa</div>
              <div className="item-hours">
                Total de itens: <span>1</span>
              </div>
              <div className="splitter"></div>
              <div className="item-hours">
                Horas estimadas: <span>{formData.total_time}</span>
              </div>
              <div className="item-hours">
                Horas disponíveis:
                {subtractTime(formData.tempo, formData.total_time).includes('-') ? (
                  <div className="negative">
                    {subtractTime(formData.tempo, formData.total_time)}
                  </div>
                ) : (
                  <span>{subtractTime(formData.tempo, formData.total_time)}</span>
                )}
              </div>

              <SummaryButtons>
                <ButtonDefault onClick={handleOnSubmit}>Criar tarefa</ButtonDefault>
              </SummaryButtons>
            </SummaryTasksAbout>
          </SummaryWrapper>
        </FormWrapper>
      )}

      {/* Modal edit fields */}
      <ModalDefault
        isOpen={modalEdit.isOpen}
        title={
          modalEdit.typeOfField === 'date'
            ? 'Editar data da entrega'
            : modalEdit.typeOfField === 'flow'
            ? 'Editar fluxo'
            : modalEdit.typeOfField === 'flowStep'
            ? 'Editar etapa do fluxo'
            : modalEdit.typeOfField === 'title'
            ? 'Editar título da tarefa'
            : ''
        }
        onOpenChange={() =>
          setModalEdit({
            isOpen: false,
            typeOfField: undefined
          })
        }
      >
        <ModalTaskWrapper>
          {/* Title */}
          {modalEdit.typeOfField === 'title' && (
            <ModalField>
              <InputDefault
                label="Titulo da tarefa"
                placeholder="Nome da tarefa"
                name="title"
                value={formData.title}
                onChange={handleOnChange}
                error={''}
              />
            </ModalField>
          )}

          {/* Flow */}
          {modalEdit.typeOfField === 'flow' && (
            <>
              <ModalField>
                <SelectDefault
                  label="Fluxo"
                  name="flow_id"
                  value={formData.flow_id}
                  onChange={handleOnChange}
                >
                  {dataFlow?.map((row: any) => (
                    <option key={row.flow_id} value={row.flow_id}>
                      {row.name}
                    </option>
                  ))}
                </SelectDefault>
              </ModalField>

              <ModalField>
                <SelectDefault
                  label="Etapas do Fluxo"
                  name="step"
                  value={formData.step}
                  onChange={handleOnChange}
                >
                  {/* {dataFlow?.map((row: any) => (
                  <option key={row.flow_id} value={row.flow_id}>
                    {row.name}
                  </option>
                ))} */}
                  <option value={'Etapa 1'}>Etapa 1</option>
                </SelectDefault>
              </ModalField>
            </>
          )}

          {/* Flow step */}
          {modalEdit.typeOfField === 'flowStep' && (
            <ModalField>
              <SelectDefault
                label="Etapas do Fluxo"
                name="step"
                value={formData.step}
                onChange={handleOnChange}
              >
                {/* {dataFlow?.map((row: any) => (
                  <option key={row.flow_id} value={row.flow_id}>
                    {row.name}
                  </option>
                ))} */}
                <option value={'Etapa 1'}>Etapa 1</option>
              </SelectDefault>
            </ModalField>
          )}

          {/* Date */}
          {modalEdit.typeOfField === 'date' && (
            <ModalField>
              <InputDefault
                label="Data"
                placeholder="00/00/0000"
                name="copywriting_date_end"
                type="date"
                max={'9999-12-31'}
                icon={BiCalendar}
                onChange={handleOnChange}
                value={formData.copywriting_date_end}
              />
            </ModalField>
          )}

          <ModalButtons>
            <ButtonDefault
              typeButton="dark"
              isOutline
              onClick={() =>
                setModalEdit({
                  isOpen: false,
                  typeOfField: undefined
                })
              }
            >
              Descartar
            </ButtonDefault>

            <ButtonDefault
              typeButton="primary"
              onClick={() =>
                setModalEdit({
                  isOpen: false,
                  typeOfField: undefined
                })
              }
            >
              Salvar
            </ButtonDefault>
          </ModalButtons>
        </ModalTaskWrapper>
      </ModalDefault>

      {/* Modal Schedule user */}
      {/* <ModalDefault
        isOpen={modalSendToUser}
        title="Lista de pessoas"
        onOpenChange={() => setModalSendToUser(false)}
      >
        <ScheduleUser
          task_title={dataTask?.title}
          estimated_time={location.state.task.total_time}
          flow={location.state.task.flow_id}
          project_product_id={location.state.task.project_product_id}
          step={Number(location.state.task.step) + 1}
          user_alocated={handleAssignTask}
          closeModal={() => setModalSendToUser(false)}
          manualOverrideDate={showHoursBack}
        />
      </ModalDefault> */}
    </RefusedWrapper>
  );
}
