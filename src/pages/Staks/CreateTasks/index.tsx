/* eslint-disable import-helpers/order-imports */
// React
import { useState } from 'react';

// Hooks
import useForm from '../../../hooks/useForm';

// components
import HeaderStepsPage from '../../../components/HeaderStepsPage';
import InfoGeral from '../ComponentSteps/InfoGeral';

// Styles
import {
  CloseModalButton,
  ContainerWrapper,
  Footer,
  FormTitle,
  FormWrapper,
  ProductListWrapper,
  ProductModalTitle,
  ProductsModalTop,
  ProductsModalWrapper,
  SearchProductsModal
} from './styles';
import InfoDescription from '../ComponentSteps/InfoDescription';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { Link } from 'react-router-dom';
import { useToast } from '../../../hooks/toast';
import { ITaskCreate } from '../../../types';
import { useFetch } from '../../../hooks/useFetch';
import { TenantProps } from '../../../utils/models';
import ModalDefault from '../../../components/Ui/ModalDefault';
import { IconClose } from '../../../assets/icons';

interface StateProps {
  [key: string]: any;
}

type HandleOnChange = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

export default function CreateTasks() {
  const [createStep, setCreateStep] = useState<number>(1);
  const { addToast } = useToast();

  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const [error, setError] = useState<StateProps>({});
  const [DTOForm, setDTOForm] = useState<any>({
    title: '',
    tenant_id: '',
    product_id: '',
    contract: '',
    flow: '',
    description: ''
  });
  const [productsModal, setProductsModal] = useState<boolean>(true);

  const handleDescription = (value: any) => {
    // setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
    console.log('Log do description', value);
    setDTOForm((prevState: any) => ({ ...prevState, ['description']: value }));
  };

  function setErrorInput(value: any, message: any) {
    if (!message) {
      delete error[value];
    }

    setError({ ...error, [value]: message });
    return message;
  }

  const handleChangeInput: HandleOnChange = (event) => {
    const { name, value } = event.target;
    setDTOForm({ ...DTOForm, [name]: value });
  };

  const handleOnNextStep = () => {
    const { title, tenant_id, contract, flow, description } = DTOForm;

    try {
      if (title === '') {
        throw setErrorInput('title', 'Titulo é obrigatório!');
      } else {
        setErrorInput('title', undefined);
      }

      if (tenant_id === '') {
        throw setErrorInput('tenant_id', 'Cliente é obrigatório!');
      } else {
        setErrorInput('tenant_id', undefined);
      }

      if (contract === '') {
        throw setErrorInput('contract', 'Contrato é obrigatório!');
      } else {
        setErrorInput('contract', undefined);
      }

      if (flow === '') {
        throw setErrorInput('flow', 'Fluxo é obrigatório!');
      } else {
        setErrorInput('flow', undefined);
      }

      if (description === '') {
        throw setErrorInput('description', 'Contexto geral é obrigatório!');
      } else {
        setErrorInput('description', undefined);
      }

      setProductsModal(true);
      // setCreateStep(createStep + 1);
    } catch (error: any) {
      addToast({
        title: 'Atenção',
        description: error,
        type: 'warning'
      });
    }
  };

  const handleOnPrevStep = () => {
    setCreateStep(createStep - 1);
  };

  const handleOnCancel = () => {
    // setDTOForm({
    //   tenant_id: '',
    //   project_id: '',
    //   title: '',
    //   contract_type: '',
    //   date_start: '',
    //   date_end: '',
    //   description: '',
    //   products: [],
    //   files: []
    // } as IProjectCreate);
    // setUploadedFiles([]);
    // setProductsArray([]);
    setError({});
  };

  return (
    <>
      <ContainerWrapper>
        <HeaderStepsPage
          title="Criar nova tarefa"
          backButton={createStep <= 1}
          stepSelected={createStep}
          backPage="/tarefas"
        />

        <FormWrapper>
          {createStep === 1 && (
            <>
              <FormTitle>Geral</FormTitle>
              <InfoGeral
                data={DTOForm}
                handleInputChange={handleChangeInput}
                clients={dataClient}
                error={error}
              />

              <div className={error.description ? 'label-observation error' : 'label-observation'}>
                <div className="label">
                  <p>Contexto geral</p>
                  {error.description && <span>Contexto geral é obrigatório!</span>}
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
            <div>
              teste
              <div>sei lá</div>
            </div>
          )}
        </FormWrapper>

        {createStep !== 4 && (
          <Footer>
            <>
              <Link to={'/tarefas'}>
                <ButtonDefault
                  typeButton="primary"
                  isOutline
                  type="button"
                  onClick={handleOnCancel}
                >
                  Descartar
                </ButtonDefault>
              </Link>

              <div className="fieldGroup">
                {createStep !== 1 && (
                  <ButtonDefault typeButton="primary" isOutline onClick={handleOnPrevStep}>
                    Voltar
                  </ButtonDefault>
                )}

                <ButtonDefault type="button" typeButton="primary" onClick={handleOnNextStep}>
                  Continuar
                </ButtonDefault>
              </div>
            </>
          </Footer>
        )}

        <ModalDefault
          isOpen={productsModal}
          onOpenChange={() => setProductsModal(false)}
          maxWidth="848px"
        >
          <ProductsModalWrapper>
            <ProductsModalTop>
              <ProductModalTitle>Lista de produtos</ProductModalTitle>
              <CloseModalButton onClick={() => setProductsModal(false)}>
                <IconClose />
              </CloseModalButton>
            </ProductsModalTop>

            <ProductListWrapper>
              <SearchProductsModal></SearchProductsModal>
            </ProductListWrapper>
          </ProductsModalWrapper>
        </ModalDefault>
      </ContainerWrapper>
    </>
  );
}
