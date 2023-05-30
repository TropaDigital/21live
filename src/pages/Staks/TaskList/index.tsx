import { useCallback, useState } from 'react';
import { BiCalendar, BiFilter, BiFlag, BiPlus, BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';
import { useSteps } from '../../../hooks/useSteps';

import { convertToMilliseconds } from '../../../utils/convertToMilliseconds';
import { avatarAll } from '../../../utils/dataDefault';

import { ITaskCreate } from '../../../types';

import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import Pagination from '../../../components/Pagination';
import Steps from '../../../components/Steps';
import { Table } from '../../../components/Table';
import { FilterGroup, TableHead } from '../../../components/Table/styles';
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
  const [search, setSearch] = useState('');
  const { data, pages, fetchData } = useFetch<ITaskCreate[]>(`tasks?search=${search}`);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  // const { formData, handleOnChange } = useForm({
  //   tenant_id: '',
  //   title: '',
  //   contract_type: '',
  //   date_start: '',
  //   date_end: ''
  // } as any);

  // const components = [
  //   {
  //     label: 'Geral',
  //     success: false,
  //     component: (
  //       <InfoGeral data={formData} handleInputChange={handleOnChange} clients={[]} error={[]} />
  //     )
  //   },
  //   {
  //     label: 'Produto',
  //     success: false,
  //     component: (
  //       <InfoGeral data={formData} handleInputChange={handleOnChange} clients={[]} error={[]} />
  //     )
  //   },
  //   {
  //     label: 'Anexo',
  //     success: false,
  //     component: (
  //       <InfoGeral data={formData} handleInputChange={handleOnChange} clients={[]} error={[]} />
  //     )
  //   },
  //   {
  //     label: 'Conclusão',
  //     success: false,
  //     component: (
  //       <InfoGeral data={formData} handleInputChange={handleOnChange} clients={[]} error={[]} />
  //     )
  //   }
  // ];

  // const [steps, setSteps] = useState(() =>
  //   components.map((row) => ({
  //     label: row.label,
  //     success: false
  //   }))
  // );

  // const fillComponents = components.map((row: any) => row.component);
  // const { changeStep, currentComponent, currentStep, isFirstStep, isLastStep } =
  //   useSteps(fillComponents);

  // const handleOnCancel = () => {
  //   setModal({
  //     isOpen: false,
  //     type: 'Criar nova Tarefa'
  //   });
  // };

  // const handleOnNextStep = () => {
  //   changeStep(currentStep + 1);

  //   setSteps((prevComponents) =>
  //     prevComponents.map((component, i) => ({
  //       ...component,
  //       success: i <= currentStep
  //     }))
  //   );
  // };

  // const handleOnPrevStep = () => {
  //   changeStep(currentStep - 1);
  //   setSteps((prevComponents) => {
  //     return prevComponents.map((component, i) => {
  //       if (i === currentStep - 1) {
  //         return {
  //           ...component,
  //           success: false
  //         };
  //       }
  //       return component;
  //     });
  //   });
  // };

  // const handleOnSubmit = useCallback(async (event: any) => {
  //   try {
  //     event.preventDefault();

  //     console.log('SUBMIT');
  //   } catch (error: any) {
  //     console.log('ERROR', error);
  //   }
  // }, []);

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

      <Table>
        <TableHead>
          <div className="groupTable">
            <h2>
              Lista de projetos <strong>40 tarefas</strong>
            </h2>
          </div>
        </TableHead>
        <FilterGroup>
          <InputDefault
            label=""
            name="search"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
              debouncedCallback(event.target.value);
            }}
            value={searchTerm}
            icon={BiSearchAlt}
            isLoading={isLoading}
            className="search-field"
          />

          <ButtonDefault typeButton="light">
            <BiFilter />
            Filtros
          </ButtonDefault>
        </FilterGroup>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Cliente</th>
              <th>Tempo</th>
              <th>Status</th>
              <th>Equipe</th>
              <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr key={row.task_id}>
                <td>#{row.task_id}</td>
                <td>{row.title}</td>
                <td>
                  Cliente???
                  {/* {row.client_name} */}
                </td>
                <td>Tempo???</td>
                {/* <td
                  style={{
                    padding: '14px',
                    width: '220px',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ marginBottom: '4px', display: 'block' }}>
                    {row.time?.replace('0', '')}
                  </span>
                  <ProgressBar
                    totalHours={convertToMilliseconds(row.time)}
                    restHours={convertToMilliseconds('02:20:36')}
                  />
                </td> */}
                <td>Status???</td>
                {/* <td>
                  <Switch
                    onChange={() => handleList(row.project_id)}
                    checked={listSelected.includes(row.project_id) ? true : false}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#0046B5"
                  />
                </td> */}
                <td>
                  <Avatar data={avatarAll} />
                </td>
                <td>
                  <div className="fieldTableClients">
                    <ButtonTable
                      typeButton="view"
                      onClick={() => console.log('abrir modal', row)}
                    />
                    <ButtonTable
                      typeButton="edit"
                      onClick={() => console.log('log da tarefa a editar', row)}
                    />
                    <Alert
                      title="Atenção"
                      subtitle="Certeza que gostaria de deletar esta Tarefa? Ao excluir esta ação não poderá ser desfeita."
                      confirmButton={() => console.log('log da task a deletar', row)}
                    >
                      <ButtonTable typeButton="delete" />
                    </Alert>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* <tfoot>
            <tr>
              <td colSpan={100}>
                <Pagination
                  total={pages.total}
                  perPage={pages.perPage}
                  currentPage={selected}
                  lastPage={pages.lastPage}
                  onClickPage={(e) => setSelected(e)}
                />
              </td>
            </tr>
          </tfoot> */}
        </table>
      </Table>

      {/* <ModalDefault isOpen={modal.isOpen} title={modal.type} onOpenChange={handleOnCancel}>
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
      </ModalDefault> */}
    </ContainerDefault>
  );
}
