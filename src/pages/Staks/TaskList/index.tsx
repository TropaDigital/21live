import { useCallback, useState } from 'react';
import { BiCalendar, BiFlag, BiPlus, BiSearchAlt } from 'react-icons/bi';

import useDebouncedCallback from '../../../hooks/useDebounced';
import useForm from '../../../hooks/useForm';
import { useSteps } from '../../../hooks/useSteps';

import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { avatarAll } from '../../../utils/dataDefault';

import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import Steps from '../../../components/Steps';
import { TableDefault } from '../../../components/TableDefault';
import Alert from '../../../components/Ui/Alert';
import Avatar from '../../../components/Ui/Avatar';
import ModalDefault from '../../../components/Ui/ModalDefault';
import ProgressBar from '../../../components/Ui/ProgressBar';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import {
  ContainerDefault,
  ContainerGroupTable,
  ContentDefault,
  FieldGroupFormDefault,
  FooterModal,
  SectionDefault
} from '../../../components/UiElements/styles';

import InfoGeral from '../ComponentSteps/InfoGeral';
import { Link } from 'react-router-dom';

export default function TaskList() {
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Criar nova Tarefa'
  });

  const [filter, setFilter] = useState({
    dateStart: '',
    dateEnd: '',
    order: '',
    search: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const { formData, handleOnChange } = useForm({
    tenant_id: '',
    title: '',
    contract_type: '',
    date_start: '',
    date_end: ''
  } as any);

  const components = [
    {
      label: 'Geral',
      success: false,
      component: (
        <InfoGeral data={formData} handleInputChange={handleOnChange} clients={[]} error={[]} />
      )
    },
    {
      label: 'Produto',
      success: false,
      component: (
        <InfoGeral data={formData} handleInputChange={handleOnChange} clients={[]} error={[]} />
      )
    },
    {
      label: 'Anexo',
      success: false,
      component: (
        <InfoGeral data={formData} handleInputChange={handleOnChange} clients={[]} error={[]} />
      )
    },
    {
      label: 'Conclusão',
      success: false,
      component: (
        <InfoGeral data={formData} handleInputChange={handleOnChange} clients={[]} error={[]} />
      )
    }
  ];

  const [steps, setSteps] = useState(() =>
    components.map((row) => ({
      label: row.label,
      success: false
    }))
  );

  const fillComponents = components.map((row: any) => row.component);
  const { changeStep, currentComponent, currentStep, isFirstStep, isLastStep } =
    useSteps(fillComponents);

  const handleOnCancel = () => {
    setModal({
      isOpen: false,
      type: 'Criar nova Tarefa'
    });
  };

  const handleOnNextStep = () => {
    changeStep(currentStep + 1);

    setSteps((prevComponents) =>
      prevComponents.map((component, i) => ({
        ...component,
        success: i <= currentStep
      }))
    );
  };

  const handleOnPrevStep = () => {
    changeStep(currentStep - 1);
    setSteps((prevComponents) => {
      return prevComponents.map((component, i) => {
        if (i === currentStep - 1) {
          return {
            ...component,
            success: false
          };
        }
        return component;
      });
    });
  };

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      console.log('SUBMIT');
    } catch (error: any) {
      console.log('ERROR', error);
    }
  }, []);

  return (
    <ContainerDefault>
      <HeaderPage title="Tarefas">
        <Link to={'/criar-tarefa'}>
          <ButtonDefault typeButton="success">
            <BiPlus color="#fff" />
            Nova tarefa
          </ButtonDefault>
        </Link>
      </HeaderPage>

      <SectionDefault>
        <ContentDefault>
          <FieldGroupFormDefault>
            <FieldGroupFormDefault>
              <InputDefault
                label="Data inicial"
                placeholder="00/00/0000"
                name="dateStart"
                type="date"
                icon={BiCalendar}
                onChange={(e) => setFilter({ ...filter, ['dateStart']: e.target.value })}
                value={filter.dateStart}
              />

              <InputDefault
                label="Data final"
                placeholder="00/00/0000"
                name="dateEnd"
                type="date"
                icon={BiCalendar}
                onChange={(e) => setFilter({ ...filter, ['dateEnd']: e.target.value })}
                value={filter.dateEnd}
              />
            </FieldGroupFormDefault>
            <SelectDefault
              label="Ordenar por"
              name="order"
              placeHolder="Ordenação"
              onChange={(e) => setFilter({ ...filter, ['order']: e.target.value })}
              value={filter.order}
            >
              <option value="asc">Mais recente</option>
              <option value="desc">Mais antigo</option>
            </SelectDefault>

            <InputDefault
              label="Busca"
              name="search"
              placeholder="Busque pelo titulo..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
                debouncedCallback(event.target.value);
              }}
              icon={BiSearchAlt}
              isLoading={isLoading}
              value={searchTerm}
            />
          </FieldGroupFormDefault>
        </ContentDefault>

        <ContainerGroupTable style={{ marginTop: '1rem' }}>
          <ScrollAreas>
            <TableDefault title="Lista de tarefas">
              <thead>
                <tr style={{ whiteSpace: 'nowrap' }}>
                  <th>ID</th>
                  <th>Titulo</th>
                  <th>Urgente</th>
                  <th>Cliente</th>
                  <th>Progresso</th>
                  <th>usuários</th>
                  <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>#336</td>
                  <td>Job 1</td>
                  <td>
                    <BiFlag size={22} />
                  </td>
                  <td>MO GROUP</td>
                  <td
                    style={{
                      padding: '14px',
                      width: '220px',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ marginBottom: '4px', display: 'block' }}>05:50:24</span>
                    <ProgressBar
                      totalHours={convertToMilliseconds('05:50:24')}
                      restHours={convertToMilliseconds('02:20:36')}
                    />
                  </td>
                  <td>
                    <Avatar data={avatarAll} />
                  </td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable typeButton="view" onClick={() => console.log('row')} />
                      <ButtonTable typeButton="edit" onClick={() => console.log('row')} />

                      <Alert
                        title="Atenção"
                        subtitle="Certeza que gostaria de deletar esta Ata/Reunião? Ao excluir a acão não poderá ser desfeita."
                        confirmButton={() => console.log('row.project_id')}
                      >
                        <ButtonTable typeButton="delete" onClick={() => console.log('row')} />
                      </Alert>
                    </div>
                  </td>
                </tr>
              </tbody>
            </TableDefault>
          </ScrollAreas>
        </ContainerGroupTable>
      </SectionDefault>

      <ModalDefault isOpen={modal.isOpen} title={modal.type} onOpenChange={handleOnCancel}>
        <form onSubmit={handleOnSubmit}>
          <Steps currentStep={currentStep} steps={steps} />

          <div>{currentComponent}</div>

          <FooterModal>
            <ButtonDefault typeButton="dark" isOutline type="button" onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>

            <div className="fieldGroup">
              {!isFirstStep && (
                <ButtonDefault typeButton="primary" isOutline onClick={handleOnPrevStep}>
                  Voltar
                </ButtonDefault>
              )}

              {!isLastStep ? (
                <ButtonDefault type="button" typeButton="primary" onClick={handleOnNextStep}>
                  Próxima etapa
                </ButtonDefault>
              ) : (
                <ButtonDefault typeButton="primary" type="button" onClick={handleOnSubmit}>
                  Salvar
                </ButtonDefault>
              )}
            </div>
          </FooterModal>
        </form>
      </ModalDefault>
    </ContainerDefault>
  );
}
