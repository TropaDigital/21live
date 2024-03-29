/* eslint-disable import-helpers/order-imports */
/* eslint-disable react-hooks/exhaustive-deps */
// React
import { useState, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Hooks
import { useToast } from '../../../hooks/toast';
import { useFetch } from '../../../hooks/useFetch';
import { useAuth } from '../../../hooks/AuthContext';

// Utils
import { TeamProps, TenantProps } from '../../../utils/models';
import { multiplyTime, sumTimes } from '../../../utils/convertTimes';

// Types
import { IProduct, OrganizationsProps } from '../../../types';

// Icons
import { IconMail } from '../../../assets/icons';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import HeaderStepsPage from '../../../components/HeaderStepsPage';
import { UploadedFilesProps } from '../../../components/Upload/UploadFiles';
import InfoDescription from '../ComponentSteps/InfoDescription';
import InfoFiles from '../ComponentSteps/InfoFiles';
import InfoGeral from '../ComponentSteps/InfoGeral';
import InfoProducts from '../ComponentSteps/InfoProducts/InfoProducts';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { SaveButton } from '../ComponentSteps/InfoProducts/styles';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import {
  SummaryInfoWrapper,
  SummaryTaskDescription,
  SummaryTaskInfo
} from '../../Tasks/ComponentSteps/SummaryTasks/styles';
import InputMultipleSelect from '../../../components/Inputs/InputMultipleSelect';
import ModalLoader from '../../../components/Ui/ModalLoader';

// Styles
import {
  Container,
  EmailButton,
  FinishButtons,
  FinishModal,
  FinishModalButtons,
  FinishModalMessage,
  FinishModalTitle,
  Footer,
  FormTitle,
  FormWrapper,
  Summary,
  SummaryCard,
  SummaryCardSubtitle,
  SummaryCardTitle,
  SummaryContractCard,
  SummaryWrapper,
  TeamInput
} from './styles';

// Services
import api from '../../../services/api';

// Libraries
import moment from 'moment';

interface StateProps {
  [key: string]: any;
}

interface DTOProps {
  tenant_id: string;
  organization_id?: string;
  title: string;
  contract_type: string;
  project_id: string;
  date_start: string;
  date_end: string;
  description: string;
  category: string;
  products: [];
  time: string;
  email: string;
  client_name?: string;
  team: [];
}

type HandleOnChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

export default function CreateProject() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user } = useAuth();
  const location = useLocation();
  const formRef = useRef<any>();

  const [createStep, setCreateStep] = useState<number>(1);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataOrganizations } = useFetch<OrganizationsProps[]>('organization');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [error, setError] = useState<StateProps>({});
  const [loading, setLoading] = useState(false);
  const [finishModal, setFinishModal] = useState<boolean>(false);
  const [showSave, setShowSave] = useState<any>(false);
  const [saveProducts, setSaveProducts] = useState<any>('');
  const [editSelectedProducts, setEditSelectedProducts] = useState<boolean>(false);
  const [DTOForm, setDTOForm] = useState<DTOProps>({
    tenant_id: '',
    organization_id: '',
    title: '',
    contract_type: '',
    project_id: '',
    date_start: '',
    date_end: '',
    description: '',
    category: '',
    products: [],
    time: '',
    email: '',
    team: []
  });
  const [productsArray, setProductsArray] = useState<IProduct[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>('');
  const [sendFiles, setSendFiles] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>('');
  const [editProject, setEditProject] = useState<boolean>(false);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const { data: dataTeam } = useFetch<TeamProps[]>('team');
  const [pathSelected, setPathSelected] = useState<string>('');

  const defaultOptionsTeam = dataTeam?.filter((item) =>
    DTOForm.team.some((member: any) => member.user_id === item.user_id)
  );

  const onChange = (option: any) => {
    const dataOption = option.map((row: any) => ({ user_id: row.value }));
    setDTOForm((prevState: any) => ({ ...prevState, ['team']: dataOption }));
  };

  useEffect(() => {
    if (location.state !== null) {
      setDTOForm(location.state);
      setProductsArray(location.state.products);
      setEditSelectedProducts(true);
      setEditProject(true);
    }
  }, [location]);

  const productsHours = productsArray?.map((row) => {
    return multiplyTime(row?.minutes, row?.quantity);
  });

  const handleOnAddProducts = (items: IProduct) => {
    setProductsArray((prevState: any) => [...prevState, items]);
  };

  const handleDescription = (value: any) => {
    setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
  };

  const handleChangeInput: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setDTOForm({ ...DTOForm, [name]: value });
  };

  const handleOnPeriod = (value: any, product: any) => {
    if (editSelectedProducts) {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.job_service_id === product.project_product_id) {
            return { ...obj, period: value.contractType };
          }
          return obj;
        })
      );
    } else {
      setProductsArray((current) =>
        current.map((obj) => {
          if (obj.job_service_id === product.job_service_id) {
            return { ...obj, period: value.contractType };
          }
          return obj;
        })
      );
    }
  };

  const handleDeleteProducts = (id: any) => {
    if (editSelectedProducts) {
      setProductsArray(productsArray.filter((obj: any) => obj.job_service_id !== id));
      if (productsArray.length <= 1) {
        setEditSelectedProducts(false);
      }
    } else {
      setProductsArray(productsArray.filter((obj) => obj.job_service_id !== id));
      if (productsArray.length <= 1) {
        setEditSelectedProducts(false);
      }
    }
  };

  const editProductQuantity = (product: any) => {
    setProductsArray((current) =>
      current.map((obj) => {
        if (obj.job_service_id === product.job_service_id) {
          return { ...obj, quantity: product.quantity };
        }
        return obj;
      })
    );
    // if (editSelectedProducts) {
    //   setProductsArray((current) =>
    //     current.map((obj) => {
    //       if (obj.job_service_id === product.job_service_id) {
    //         return { ...obj, quantity: product.quantity };
    //       }
    //       return obj;
    //     })
    //   );
    // } else {
    //   setProductsArray((current) =>
    //     current.map((obj) => {
    //       if (obj.job_service_id === product.job_service_id) {
    //         return { ...obj, quantity: product.quantity };
    //       }
    //       return obj;
    //     })
    //   );
    // }
  };

  function setErrorInput(value: any, message: any) {
    if (!message) {
      delete error[value];
    }

    setError({ ...error, [value]: message });
    return message;
  }

  const handleOnNextStep = () => {
    const {
      title,
      tenant_id,
      organization_id,
      category,
      contract_type,
      date_start,
      date_end,
      description
    } = DTOForm;

    try {
      if (title === '') {
        throw setErrorInput('title', 'Titulo é obrigatório!');
      } else {
        setErrorInput('title', undefined);
      }

      if (user?.organizations?.length > 0) {
        if (organization_id === '') {
          throw setErrorInput('organization_id', 'Cliente é obrigatório!');
        } else {
          setErrorInput('organization_id', undefined);
        }
      } else {
        if (tenant_id === '') {
          throw setErrorInput('tenant_id', 'Cliente é obrigatório!');
        } else {
          setErrorInput('tenant_id', undefined);
        }
      }

      if (category === '') {
        throw setErrorInput('category', 'Campo é obrigatório!');
      } else {
        setErrorInput('category', undefined);
      }
      if (contract_type === '') {
        throw setErrorInput('contract_type', 'Contrato é obrigatório!');
      } else {
        setErrorInput('contract_type', undefined);
      }

      if (date_start === '') {
        throw setErrorInput('date_start', 'Data inicial é obrigatório!');
      } else {
        setErrorInput('date_start', undefined);
      }

      if (moment(date_start).isBefore('2020-01-01')) {
        throw setErrorInput('date_start', 'Data inicial não permitida');
      } else {
        setErrorInput('date_start', undefined);
      }

      if (moment(date_end).isBefore('2020-01-01')) {
        throw setErrorInput('date_end', 'Data final não permitida');
      } else {
        setErrorInput('date_end', undefined);
      }

      if (date_end === '') {
        throw setErrorInput('date_end', 'Data final é obrigatório!');
      } else {
        setErrorInput('date_end', undefined);
      }

      if (moment(date_end).isSameOrBefore(date_start)) {
        throw setErrorInput('date_end', 'Data final precisa ser maior que a data inicial');
      } else {
        setErrorInput('date_end', undefined);
      }

      // if (description === '') {
      //   throw setErrorInput('description', 'Observações são obrigatórias!');
      // } else {
      //   setErrorInput('description', undefined);
      // }

      if (createStep === 2 && productsArray.length === 0) {
        throw 'Escolha pelo menos um produto antes de avançar';
      }

      if (createStep < 3 && DTOForm.contract_type === 'free') {
        // console.log('log de um produto livre');
        setCreateStep(3);
      } else if (
        createStep === 2 &&
        productsArray.length < 1 &&
        DTOForm?.contract_type !== 'free'
      ) {
        throw 'Escolha pelo menos um produto antes de avançar';
      } else {
        setCreateStep(createStep + 1);
      }
    } catch (error: any) {
      // console.log('error', error);
      addToast({
        title: 'Atenção',
        description: error,
        type: 'warning'
      });
    }
  };

  const handleOnPrevStep = () => {
    if (createStep > 2 && DTOForm.contract_type === 'free') {
      setCreateStep(1);
    } else {
      setCreateStep(createStep - 1);
    }
  };

  const handleOnCancel = () => {
    setCancelModal(true);
    // setDTOForm({
    //   tenant_id: '',
    //   project_id: '',
    //   title: '',
    //   contract_type: '',
    //   date_start: '',
    //   date_end: '',
    //   description: '',
    //   products: []
    // } as DTOProps);
    // setUploadedFiles([]);
    // setProductsArray([]);
    // setError({});
    setPathSelected('projetos');
  };

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();

        // if (DTOForm.team.length < 1) {
        //   throw new Error();
        // }

        // Inserir lógica
        // const files = uploadedFiles.map(
        //   (row: { bucket: any; file_name: any; key: any; size: any; }) => ({
        //     bucket: row.bucket,
        //     file_name: row.file_name,
        //     // file_id: row.file_id,
        //     key: row.key,
        //     size: row.size,
        //   })
        // );

        setLoading(true);

        const totalTime = sumTimes(productsHours);
        if (editProject) {
          const teamFiltered = DTOForm?.team.map((row: any) => ({
            user_id: row.user_id
          }));

          const updateData = {
            title: DTOForm?.title,
            description: DTOForm?.description,
            team: teamFiltered
          };

          await api.put(`project/${DTOForm?.project_id}`, updateData);
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Projeto editado com sucesso!'
          });
          navigate('/projetos');
        } else if (DTOForm.contract_type === 'free') {
          if (user?.organizations?.length > 0) {
            const createNewData = {
              title: DTOForm.title,
              tenant_id: user.principalTenant,
              organization_id: DTOForm.organization_id,
              products: [
                {
                  job_service_id: '1',
                  service: 'LIVRE',
                  description: 'DESCRICAO',
                  type: 'livre',
                  size: '000x000',
                  minutes: '00:00:00',
                  flag: 'false',
                  quantity: '1'
                }
              ],
              description: DTOForm.description,
              category: DTOForm.category,
              date_start: DTOForm.date_start,
              date_end: DTOForm.date_end,
              contract_type: DTOForm.contract_type,
              // files,
              time: totalTime,
              email: DTOForm.email,
              team: DTOForm.team
            };

            const response = await api.post(`project`, createNewData);
            setProjectId(response.data.result);
            setFinishModal(true);
            // addToast({
            //   type: 'success',
            //   title: 'Sucesso',
            //   description: 'Projeto cadastrado com sucesso!'
            // });
          } else {
            const createNewData = {
              title: DTOForm.title,
              tenant_id: DTOForm.tenant_id,
              products: [
                {
                  job_service_id: '1',
                  service: 'LIVRE',
                  description: 'DESCRICAO',
                  type: 'livre',
                  size: '000x000',
                  minutes: '00:00:00',
                  flag: 'false',
                  quantity: '1'
                }
              ],
              description: DTOForm.description,
              category: DTOForm.category,
              date_start: DTOForm.date_start,
              date_end: DTOForm.date_end,
              contract_type: DTOForm.contract_type,
              // files,
              time: totalTime,
              email: DTOForm.email,
              team: DTOForm.team
            };

            const response = await api.post(`project`, createNewData);
            setProjectId(response.data.result);
            setFinishModal(true);
            // addToast({
            //   type: 'success',
            //   title: 'Sucesso',
            //   description: 'Projeto cadastrado com sucesso!'
            // });
          }
        } else {
          if (user?.organizations?.length > 0) {
            const createNewData = {
              title: DTOForm.title,
              tenant_id: user.principalTenant,
              organization_id: DTOForm.organization_id,
              products: productsArray,
              description: DTOForm.description,
              category: DTOForm.category,
              date_start: DTOForm.date_start,
              date_end: DTOForm.date_end,
              contract_type: DTOForm.contract_type,
              // files,
              time: totalTime,
              email: DTOForm.email,
              team: DTOForm.team
            };

            const response = await api.post(`project`, createNewData);
            setProjectId(response.data.result);
            setFinishModal(true);
            // addToast({
            //   type: 'success',
            //   title: 'Sucesso',
            //   description: 'Projeto cadastrado com sucesso!'
            // });
          } else {
            const createNewData = {
              title: DTOForm.title,
              tenant_id: DTOForm.tenant_id,
              products: productsArray,
              description: DTOForm.description,
              category: DTOForm.category,
              date_start: DTOForm.date_start,
              date_end: DTOForm.date_end,
              contract_type: DTOForm.contract_type,
              // files,
              time: totalTime,
              email: DTOForm.email,
              team: DTOForm.team
            };

            const response = await api.post(`project`, createNewData);
            setProjectId(response.data.result);
            setFinishModal(true);
            // addToast({
            //   type: 'success',
            //   title: 'Sucesso',
            //   description: 'Projeto cadastrado com sucesso!'
            // });
          }
        }
        setLoading(false);
        // console.log('log do post project', DTOForm);
        // console.log('log do post new data', createNewData);
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
        setLoading(false);
        // setErros(getValidationErrors(e.response.data.result))
      }
    },
    [uploadedFiles, DTOForm, productsArray, productsHours]
  );

  const handleSwitchEmail = (value: any) => {
    const emailSwitch: string = value.toString();
    setDTOForm((prevState: any) => ({ ...prevState, ['email']: emailSwitch }));
  };

  const finishCreate = () => {
    addToast({
      type: 'success',
      title: 'Sucesso',
      description: 'Projeto criado com sucesso!'
    });
    setFinishModal(false);
    setSendFiles(false);
    sendFilesOfProject();
    // navigate('/projetos');
  };

  async function sendFilesOfProject() {
    try {
      const files = uploadedFiles.map((row: any) => ({
        file_name: row.file_name,
        original_name: row.original_name,
        bucket: row.bucket,
        key: row.key,
        size: row.size
      }));

      // const upload = {
      //   folder: 'projects',
      //   id: projectId,
      //   archives: files
      // };

      const teamFiltered = DTOForm?.team.map((row: any) => ({
        user_id: row.user_id
      }));

      const updateData = {
        title: DTOForm?.title,
        description: DTOForm?.description,
        team: teamFiltered,
        files: files
      };

      setLoading(true);
      const response = await api.put(`project/${projectId}`, updateData);

      if (response.data.status === 'success') {
        navigate('/projetos');
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log error upload', error);
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
  }

  const ifIsSelectedClient = (e: any) => {
    if (e.name === 'tenant_id') {
      const selectedClientInfos: any = dataClient?.filter(
        (obj: any) => obj.tenant_id === e.infos.value
      );
      setSelectedClient(selectedClientInfos[0]);
      setDTOForm({ ...DTOForm, ['tenant_id']: e.infos.value });
    } else if (e.target.name === 'organization_id') {
      const id = e.target.value;
      const selectedClientInfos: any = dataOrganizations?.filter(
        (obj: OrganizationsProps) => obj.organization_id === id
      );
      setSelectedClient(selectedClientInfos[0]);
      handleChangeInput(e);
    } else if (e.target.name === 'date_start' || e.target.name === 'date_end') {
      if (moment(e.target.value).isAfter('2019-12-31')) {
        handleChangeInput(e);
      } else {
        addToast({
          type: 'danger',
          title: 'Atenção',
          description: 'Data não permitida!'
        });
        handleChangeInput(e);
        // setDTOForm({ ...DTOForm, [e.target.name]: '0000-00-00' });
      }
      // console.log(`log ${e.target.name}`, e.target.value, e.target.name);
    } else {
      handleChangeInput(e);
    }
  };

  const handleFinishWithoutFiles = () => {
    addToast({
      type: 'success',
      title: 'Sucesso',
      description: 'Projeto criado com sucesso!'
    });
    setFinishModal(false);
    navigate('/projetos');
  };

  useEffect(() => {
    function handleOnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      return (event.returnValue = '');
    }

    window.addEventListener('beforeunload', handleOnBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleOnBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // console.log('log do DTO FORM =>', DTOForm);
    // console.log('log do Data team =>', dataTeam);
  }, [DTOForm, dataTeam]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      console.log('log do click =>', e.target.parentElement.href.split('/').pop());
      setPathSelected(e.target.parentElement.href.split('/').pop());
      if (
        (DTOForm.title !== '' || DTOForm.tenant_id !== '') &&
        formRef.current &&
        !formRef.current.contains(e.target)
      ) {
        setCancelModal(true);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [DTOForm]);

  return (
    <Container ref={formRef}>
      <HeaderStepsPage
        title="Criar novo projeto/contrato"
        backButton={createStep <= 1}
        stepSelected={createStep}
        maxStep={3}
        backPage="/projetos"
      />

      <FormWrapper>
        {createStep === 1 && !user?.organizations && (
          <>
            <FormTitle>Geral</FormTitle>
            <InfoGeral
              data={DTOForm}
              handleInputChange={ifIsSelectedClient}
              clients={dataClient}
              editProject={editProject}
              error={error}
            />

            <div className={error.description ? 'label-observation error' : 'label-observation'}>
              <div className="label">
                <p>Observações</p>
                {error.description && <span>Observações são obrigatórias</span>}
              </div>
              <InfoDescription
                value={DTOForm?.description}
                handleOnDescription={(value) => handleDescription(value)}
                mentions={[]}
              />
            </div>
          </>
        )}
        {createStep === 1 && user?.organizations?.length > 0 && (
          <>
            <FormTitle>Geral</FormTitle>
            <InfoGeral
              data={DTOForm}
              handleInputChange={ifIsSelectedClient}
              organizations={dataOrganizations}
              editProject={editProject}
              error={error}
            />

            <div className={error.description ? 'label-observation error' : 'label-observation'}>
              <div className="label">
                <p>Observações</p>
                {error.description && <span>Observações são obrigatórias</span>}
              </div>
              <InfoDescription
                value={DTOForm?.description}
                handleOnDescription={(value) => handleDescription(value)}
                mentions={[]}
              />
            </div>
          </>
        )}
        {createStep === 2 && (
          <>
            <FormTitle>Produtos</FormTitle>
            <InfoProducts
              handleOnAddProducts={handleOnAddProducts}
              dataFilter={productsArray}
              handleOnPeriod={(value, id) => handleOnPeriod(value, id)}
              handleOnDeleteProduct={(id) => handleDeleteProducts(id)}
              handleEditProductQuantity={(value) => editProductQuantity(value)}
              okToSave={setShowSave}
              editProducts={editSelectedProducts}
              editProject={editProject}
              hideSwitch={DTOForm.category}
              tenant_id={DTOForm.tenant_id}
            />
          </>
        )}
        {createStep === 3 && (
          <>
            {/* <FormTitle>Anexos</FormTitle>
            <InfoFiles
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={DTOForm?.tenant_id}
              // isDisabed={!formData?.tenant_id}
              isDisabed={false}
              loading={loading}
              setLoading={setLoading}
            /> */}
            <div className="flex-title">
              <FormTitle>Resumo do projeto</FormTitle>
              <EmailButton>
                <InputSwitchDefault
                  onChange={(e) => {
                    handleSwitchEmail(e.target.checked);
                  }}
                  isChecked={DTOForm.email === 'true' ? true : false}
                />
                <IconMail />
                Enviar resumo por email
              </EmailButton>
            </div>
            <SummaryWrapper>
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '792px' }}
              >
                <Summary>
                  <div className="title">Informações do projeto</div>
                  <SummaryInfoWrapper>
                    <SummaryTaskInfo>
                      <div className="title-info">Título da tarefa:</div>
                      <div className="info">{DTOForm?.title}</div>
                    </SummaryTaskInfo>

                    <SummaryTaskInfo>
                      <div className="title-info">Cliente:</div>
                      <div className="info">
                        {selectedClient?.name ? selectedClient?.name : DTOForm?.client_name}
                      </div>
                    </SummaryTaskInfo>

                    <SummaryTaskInfo>
                      <div className="title-info">Fee ou Spot:</div>
                      <div className="info">{DTOForm?.category}</div>
                    </SummaryTaskInfo>

                    <SummaryTaskInfo>
                      <div className="title-info">Tipo do contrato:</div>
                      <div className="info">
                        {DTOForm?.contract_type === 'product' ? 'PRODUTO' : DTOForm?.contract_type}
                      </div>
                    </SummaryTaskInfo>

                    <SummaryTaskInfo>
                      <div className="title-info">Data inicial:</div>
                      <div className="info">{moment(DTOForm?.date_start).format('DD/MM/YYYY')}</div>
                    </SummaryTaskInfo>

                    <SummaryTaskInfo>
                      <div className="title-info">Data final:</div>
                      <div className="info">{moment(DTOForm?.date_end).format('DD/MM/YYYY')}</div>
                    </SummaryTaskInfo>

                    <SummaryTaskDescription>
                      <div className="description-title">Observações</div>
                      <div
                        className="description-info"
                        dangerouslySetInnerHTML={{ __html: DTOForm?.description }}
                      ></div>
                    </SummaryTaskDescription>
                  </SummaryInfoWrapper>
                </Summary>
                {DTOForm.contract_type !== 'free' && (
                  <Summary>
                    <div className="title">Produtos contratados</div>
                    {productsArray.map((row: IProduct, index: number) => (
                      <SummaryCard
                        key={index}
                        style={{ background: 'var(--background-primary)', height: 'fit-content' }}
                      >
                        <SummaryCardTitle>
                          #{index + 1} - {row.service}
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
                            <div>Horas estimadas: {multiplyTime(row?.minutes, row?.quantity)}</div>
                            <div style={{ textTransform: 'capitalize' }}>Categoria: {row.type}</div>
                            <div>Quantidade: {row.quantity}</div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              width: '100%'
                            }}
                          >
                            <div style={{ textTransform: 'capitalize' }}>Tempo: {row.period}</div>
                            <div style={{ textTransform: 'capitalize' }}>Tamanho: {row.size}</div>
                            <div style={{ textTransform: 'capitalize' }}>
                              Descrição: {row.description}
                            </div>
                          </div>
                        </SummaryCardSubtitle>
                      </SummaryCard>
                    ))}
                  </Summary>
                )}
              </div>

              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '446px' }}
              >
                {DTOForm.contract_type !== 'free' && (
                  <Summary className="small" style={{ background: 'var(--background-primary)' }}>
                    <div className="title small">Resumo do contrato</div>
                    <SummaryContractCard>
                      <div className="products">
                        {productsArray.length >= 2
                          ? `${productsArray.length} Produtos`
                          : `${productsArray.length} Produto`}
                      </div>
                    </SummaryContractCard>
                    <SummaryContractCard>
                      <div className="hours">
                        Horas por produto
                        <strong>{sumTimes(productsHours)}</strong>
                      </div>
                    </SummaryContractCard>
                    {/* {productsArray.some((obj) => obj.service.toLowerCase() === 'hora de criação') && (
                      <SummaryContractCard>
                        <div className="hours">
                          Horas de criação
                          <strong>
                            {totalCreateHours > 9 ? totalCreateHours : `0${totalCreateHours}`}
                            :00:00
                          </strong>
                        </div>
                      </SummaryContractCard>
                    )} */}
                    <SummaryContractCard>
                      <div className="total">
                        Total <div>{sumTimes(productsHours)}</div>
                      </div>
                    </SummaryContractCard>
                  </Summary>
                )}

                <TeamInput>
                  <InputMultipleSelect
                    name="members"
                    options={dataTeam?.map((row) => ({
                      value: row.user_id,
                      label: `${row.name} - ${row.function}`
                    }))}
                    label="Equipe do projeto"
                    onChange={(option) => onChange(option)}
                    defaultValue={defaultOptionsTeam?.map((row) => ({
                      value: row.user_id,
                      label: `${row.name} - ${row.function}`
                    }))}
                    alert="Selecione pelo menos um membro para a equipe"
                  />
                </TeamInput>

                <FinishButtons>
                  <ButtonDefault
                    typeButton="primary"
                    isOutline
                    onClick={() => {
                      setCreateStep(1);
                      setEditSelectedProducts(true);
                    }}
                  >
                    Editar projeto/contrato
                  </ButtonDefault>
                  <ButtonDefault
                    onClick={handleOnSubmit}
                    loading={loading}
                    typeButton={loading ? 'blocked' : 'primary'}
                    disabled={loading}
                  >
                    Salvar Projeto/Contrato
                  </ButtonDefault>
                </FinishButtons>
              </div>
            </SummaryWrapper>
          </>
        )}
      </FormWrapper>

      {createStep !== 3 && (
        <Footer>
          {showSave && (
            <>
              {createStep === 2 && (
                <ButtonDefault
                  typeButton="primary"
                  isOutline
                  onClick={() => {
                    handleOnPrevStep();
                    setShowSave(false);
                  }}
                  style={{ marginLeft: '88%' }}
                >
                  Voltar
                </ButtonDefault>
              )}
              <SaveButton
                onClick={() => {
                  setSaveProducts('Go');
                  setTimeout(() => {
                    setShowSave(false);
                    setSaveProducts('');
                    setCreateStep(productsArray.length > 0 ? createStep + 1 : createStep);
                    setEditSelectedProducts(true);
                  }, 500);
                }}
              >
                <ButtonDefault typeButton="primary">Salvar</ButtonDefault>
              </SaveButton>
            </>
          )}

          {!showSave && (
            <>
              <ButtonDefault typeButton="primary" isOutline type="button" onClick={handleOnCancel}>
                Descartar
              </ButtonDefault>

              <div className="fieldGroup">
                {createStep !== 1 && (
                  <ButtonDefault typeButton="primary" isOutline onClick={handleOnPrevStep}>
                    Voltar
                  </ButtonDefault>
                )}

                <ButtonDefault type="button" typeButton="primary" onClick={handleOnNextStep}>
                  Continuar
                </ButtonDefault>
                {/* {createStep < 4 ? (
                ) : (
                  <ButtonDefault
                    typeButton="primary"
                    type="button"
                    onClick={handleOnSubmit}
                    loading={loading}
                  >
                    Salvar
                  </ButtonDefault>
                )} */}
              </div>
            </>
          )}
        </Footer>
      )}

      {/* Modal send files */}
      <ModalDefault
        isOpen={finishModal}
        onOpenChange={() => setFinishModal(false)}
        maxWidth="1200px"
      >
        <FinishModal>
          {/* <div>
            <IconChecked />
          </div>
          <FinishModalMessage>
            <div className="modal-title">Projeto criado com sucesso</div>
            <div className="modal-subtitle">
              O projeto foi criado com êxito, visualize os detalhes na página de projetos salvos.
            </div>
          </FinishModalMessage> */}
          {!sendFiles && (
            <>
              <FinishModalTitle>Enviar anexos</FinishModalTitle>
              <FinishModalMessage>
                <div className="modal-title">Projeto criado com sucesso</div>
                <div className="modal-subtitle">Deseja enviar arquivos para esse projeto?</div>
              </FinishModalMessage>
              <FinishModalButtons>
                <ButtonDefault typeButton="dark" isOutline onClick={handleFinishWithoutFiles}>
                  Não enviar
                </ButtonDefault>
                <ButtonDefault typeButton="primary" onClick={() => setSendFiles(true)}>
                  Enviar
                </ButtonDefault>
              </FinishModalButtons>
            </>
          )}

          {sendFiles && (
            <>
              <FinishModalTitle>Anexos</FinishModalTitle>
              <InfoFiles
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                tenant={DTOForm?.tenant_id}
                // isDisabed={!formData?.tenant_id}
                isDisabed={false}
                loading={loading}
                setLoading={setLoading}
                project_id={projectId}
              />
              <FinishModalButtons>
                <ButtonDefault
                  typeButton="dark"
                  isOutline
                  onClick={() => {
                    setFinishModal(false);
                    setSendFiles(false);
                    navigate('/projetos');
                  }}
                >
                  Cancelar
                </ButtonDefault>
                <ButtonDefault typeButton="primary" onClick={finishCreate}>
                  Confirmar
                </ButtonDefault>
              </FinishModalButtons>
            </>
          )}
        </FinishModal>
      </ModalDefault>

      {/* Modal discard changes */}
      <ModalDefault
        isOpen={cancelModal}
        onOpenChange={() => setCancelModal(false)}
        title="Descartar alterações"
      >
        <FinishModal>
          <div>Deseja realmente descartar as alterações?</div>

          <FinishModalButtons>
            <ButtonDefault typeButton="dark" isOutline onClick={() => setCancelModal(false)}>
              Cancelar
            </ButtonDefault>
            <ButtonDefault typeButton="danger" onClick={() => navigate(`/${pathSelected}`)}>
              Descartar
            </ButtonDefault>
          </FinishModalButtons>
        </FinishModal>
      </ModalDefault>

      {/* Modal loading submit */}
      <ModalLoader isOpen={loading} />
    </Container>
  );
}
