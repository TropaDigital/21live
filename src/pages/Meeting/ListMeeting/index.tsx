import { useState, useCallback, useEffect } from 'react';
import { BiCalendar, BiEdit, BiPlus, BiSearchAlt } from 'react-icons/bi';
import moment from 'moment';

// HOOKS
import { useToast } from '../../../hooks/toast';
import { useFetch } from '../../../hooks/useFetch';

// UTILS
import { MeetingProps, TeamProps, TenantProps } from '../../../utils/models';
import { useDebounce } from '../../../utils/useDebounce';

// COMPONENTS
import HeaderPage from '../../../components/HeaderPage';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import { TableDefault } from '../../../components/TableDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import ComponentsForms from '../../components/ComponentsForms';
import InputSwitchDefault from '../../../components/Inputs/InputSwitchDefault';
import InputMultipleSelect from '../../../components/Inputs/InputMultipleSelect';
import UploadFiles from '../../Projects/ComponentSteps/UploadFiles';
import Paginate from '../../../components/Paginate';

// STYLES
import { ContainerGroupTable, ContentDefault, FieldDefault, FieldGroupFormDefault, FooterModal } from '../../../components/UiElements/styles';
import { Container } from './styles';
import useForm from '../../../hooks/useForm';
import WrapperEditor from '../../../components/WrapperEditor';


interface UploadedFilesProps {
  file?: File;
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress?: number;
  uploaded: boolean;
  error?: boolean;
  url: string | null;
}

interface FormProps {
  title: string;
  client: any;
  email_alert: boolean;
  response: string;
  members: any;
  date: string;
  files: string;
  description: string;
}

export default function ListMeeting() {
  const { addToast } = useToast();
  const { formData, setFormValue, handleOnChange, handleOnChangeCheckbox } = useForm({
    title: '',
    client: '',
    email_alert: false,
    response: '',
    members: [],
    date: '',
    files: '',
    description: '',
  } as FormProps)
  const [modal, setModal] = useState(false)
  const today = moment();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const [search, setSearch] = useState('');
  const [isSearching, setSearching] = useState(false);
  const [filterDate, setFilterDate] = useState('');

  const { data, pages } = useFetch<MeetingProps[]>(`meetings?search=${search}&date_start=${filterDate}&date_end=${today.format('YYYY-MM-DD')}`);
  const { data: dataClient } = useFetch<TenantProps[]>('tenant');
  const { data: dataTeam } = useFetch<TeamProps[]>('team');

  const selectedTeam = dataTeam?.filter((obj) => obj.user_id !== formData.response)
  const mentionList = dataTeam?.map((obj) => ({id: obj.user_id, label: obj.username}))

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[]>([]);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      setSearch(searchTerm);
      const handler = setTimeout(() => {
        setSearching(false);
      }, 500);
      return () => {
        clearTimeout(handler)
      }
    } else {
      setSearch('')
      setSearching(false);
    }
  }, [debouncedSearchTerm]);

  const [selectedItem, setSelectedItem] = useState<any | undefined>(undefined);
  
  const handleChangeClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedId = parseInt(event.target.options[selectedIndex].value);
    const selectedItem = dataClient?.find((item: any) => Number(item.tenant_id) === selectedId);
    setSelectedItem(selectedItem);

    const dataCliente = {
      idbucket: selectedItem?.bucket,
      name: selectedItem?.name,
      slug: selectedItem?.slug,
      tenant_id: selectedItem?.tenant_id
    } 
    setFormValue('client', dataCliente)
  };

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      // Inserir lógica

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço cadastrado com sucesso!',
      });

    } catch (e: any) {
      // Exibir erro
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });
    }
  }, []);

  const onChange = (option: any, actionMeta: any) => {
    const dataOption = option.map((row: any) => (
      {user_id: row.value}
    ))
    setFormValue('members', dataOption)
 }

  // console.log("FORMDATA", formData)
  // console.log("uploadedFiles", uploadedFiles)
  
  return (
    <Container>
      <HeaderPage title="Atas e Reuniões">
        <ButtonDefault typeButton="success" onClick={() => setModal(!modal)}>
          <BiPlus color="#fff" />
            Novo Projeto
        </ButtonDefault>
      </HeaderPage>

      <ContentDefault style={{ position: 'relative' }}>
        <FieldGroupFormDefault>
          <InputDefault
            label="Filtre por data"
            placeholder="00/00/0000"
            name="date"
            type='date'
            icon={BiCalendar}
            onChange={(e) => setFilterDate(e.target.value)}
            value={filterDate}
          />
          <SelectDefault
            label="Ordenar por"
            name="order"
            placeHolder="Ordenação"
            onChange={() => {}}
            value={''}
          >
            <option value='0'>Mais recente</option>
            <option value='1'>Mais antigo</option>
          </SelectDefault>

          <InputDefault
            label="Busca"
            name="search"
            placeholder="Busque pelo nome..."
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={BiSearchAlt}
            isLoading={isSearching}
            value={searchTerm}
          />

        </FieldGroupFormDefault>
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Todas">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>ID</th>
                <th>Titulo</th>
                <th>Cliente</th>
                <th>Responsável</th>
                <th>Data</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row) => (
                <tr key={row.meeting_id}>
                  <td>
                    {row.meeting_id}
                  </td>
                  <td>{row.title}</td>
                  <td>
                    {row.cliente}
                  </td>
                  <td>{row.responsavel}</td>
                  <td>{row.date}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonDefault typeButton="info" onClick={() => console.log(row.meeting_id)}>
                        <BiEdit />
                      </ButtonDefault>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableDefault>
        </ScrollAreas>

      </ContainerGroupTable>

      <Paginate 
        total={pages.total}
        perPage={pages.perPage}
        currentPage={selected}
        lastPage={pages.lastPage}
        onClickPage={(e) => setSelected(e)}
      />

      <ModalDefault
        isOpen={modal}
        onOpenChange={setModal}
        title='Criar nova Ata de Reunião'
      >
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Titulo"
              placeholder="Titulo da Ata/Reunião"
              name="title"
              onChange={handleOnChange}
              value={formData.title}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Cliente"
              name="client"
              placeHolder="Selecione"
              onChange={handleChangeClient}
              value={selectedItem?.tenant_id}
            >
              {dataClient?.map((row) => (
                <option key={row.tenant_id} value={row.tenant_id}>{row.name}</option>
              ))}
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputSwitchDefault 
              name="email_alert"
              label='Enviar para o cliente por e-mail'
              onChange={handleOnChangeCheckbox}
              isChecked={formData.isEmail}
            />
          </FieldDefault>

          <FieldDefault>
            <SelectDefault
              label="Responsável"
              name="response"
              placeHolder="Selecione"
              onChange={handleOnChange}
              value={formData.response}
            >
              {dataTeam?.map((row) => (
                <option key={row.user_id} value={row.user_id}>{row.name}</option>
              ))}
            </SelectDefault>
          </FieldDefault>

          <FieldDefault>
            <InputMultipleSelect 
              name='members'
              options={selectedTeam?.map((row) => (
                { value: row.user_id, label: row.username }
              ))}
              label='Membros'
              isDisabled={formData.response ? false : true}
              onChange={(option, meta) => onChange(option, meta)}
            />
          </FieldDefault>

          <FieldDefault>
            <InputDefault
              label="Data"
              placeholder="00/00/0000"
              name="date"
              type='date'
              icon={BiCalendar}
              onChange={handleOnChange}
              value={formData.data}
            />
          </FieldDefault>

          <FieldDefault>
            <UploadFiles
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              tenant={selectedItem?.tenant_id}
            />
          </FieldDefault>

          <FieldDefault>
            <WrapperEditor
              mentionData={mentionList}
              value={formData.description}
              handleOnDescription={(value: any) => setFormValue('description', value)}
            />
          </FieldDefault>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault
              typeButton="dark"
              isOutline
              onClick={() => setModal(!modal)}
            >
              Descartar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>
    </Container>
  )
}
