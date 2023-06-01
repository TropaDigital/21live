/* eslint-disable import-helpers/order-imports */
//  React
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { BiPlus, BiSearchAlt } from 'react-icons/bi';

// Hooks
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/toast';

// Types
import { ITaskCreate } from '../../../types';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { Table } from '../../../components/Table';
import { FilterGroup, TableHead } from '../../../components/Table/styles';
import Alert from '../../../components/Ui/Alert';
import { ContainerDefault } from '../../../components/UiElements/styles';

// Api
import api from '../../../services/api';
import Pagination from '../../../components/Pagination';
import ModalDefault from '../../../components/Ui/ModalDefault';

export default function TaskList() {
  const { addToast } = useToast();
  const [modalViewTask, setModalViewTask] = useState({
    isOpen: false,
    type: '',
    task: {
      task_id: '',
      title: '',
      tenant_id: '',
      product_id: '',
      type: '',
      flow_id: '',
      description: '',
      creation_description: '',
      creation_date_end: '',
      copywriting_description: '',
      copywriting_date_end: '',
      deadlines: '',
      step: ''
    }
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
  const [selected, setSelected] = useState(1);
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`tasks/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Tarefa foi deletada!'
      });
      fetchData();
    } catch (error: any) {
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: error.response.data.message
      });
    }
  };

  const handleOpenModalView = (task: ITaskCreate) => {
    setModalViewTask({
      isOpen: true,
      type: `Resumo da tarefa: ${task.title}`,
      task: {
        task_id: task.task_id,
        title: task.title,
        tenant_id: task.tenant_id,
        product_id: task.product_id,
        type: task.type,
        flow_id: task.flow_id,
        description: task.description,
        creation_description: task.creation_description,
        creation_date_end: task.creation_date_end,
        copywriting_description: task.copywriting_description,
        copywriting_date_end: task.copywriting_date_end,
        deadlines: task.deadlines,
        step: task.step
      }
    });
  };

  const handleCloseModal = () => {
    setModalViewTask({
      isOpen: false,
      type: '',
      task: {
        task_id: '',
        title: '',
        tenant_id: '',
        product_id: '',
        type: '',
        flow_id: '',
        description: '',
        creation_description: '',
        creation_date_end: '',
        copywriting_description: '',
        copywriting_date_end: '',
        deadlines: '',
        step: ''
      }
    });
  };

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
              Lista de projetos <strong>{data?.length} tarefas</strong>
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

          {/* <ButtonDefault typeButton="light">
            <BiFilter />
            Filtros
          </ButtonDefault> */}
        </FilterGroup>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Cliente</th>
              {/* <th>Tempo</th>
              <th>Status</th>
              <th>Equipe</th> */}
              <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row) => (
              <tr key={row.task_id}>
                <td>#{row.task_id}</td>
                <td>{row.title}</td>
                <td>{row.tenant_id}</td>
                {/* <td>Tempo???</td> */}
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
                {/* <td>Status???</td> */}
                {/* <td>
                  <Switch
                    onChange={() => handleList(row.project_id)}
                    checked={listSelected.includes(row.project_id) ? true : false}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    onColor="#0046B5"
                  />
                </td> */}
                {/* <td>
                  <Avatar data={avatarAll} />
                </td> */}
                <td>
                  <div className="fieldTableClients">
                    <ButtonTable
                      typeButton="view"
                      onClick={() => console.log('abrir modal', row)}
                    />
                    <ButtonTable typeButton="edit" onClick={() => handleOpenModalView(row)} />
                    <Alert
                      title="Atenção"
                      subtitle="Certeza que gostaria de deletar esta Tarefa? Ao excluir esta ação não poderá ser desfeita."
                      confirmButton={() => handleOnDelete(row.task_id)}
                    >
                      <ButtonTable typeButton="delete" />
                    </Alert>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
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
          </tfoot>
        </table>
      </Table>

      <ModalDefault
        isOpen={modalViewTask.isOpen}
        title={modalViewTask.type}
        onOpenChange={handleCloseModal}
      >
        <div>teste de children</div>
      </ModalDefault>
    </ContainerDefault>
  );
}
