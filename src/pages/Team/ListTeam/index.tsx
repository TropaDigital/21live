import { useCallback, useEffect, useState } from 'react';
import { BiCalendar, BiEdit, BiEnvelope, BiKey, BiMoney, BiPhoneCall, BiPlus, BiSearchAlt, BiUser, BiX } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

// HOOKS
import { useToast } from '../../../hooks/toast';
import { useFetch } from '../../../hooks/useFetch';

// UTILS
import { useDebounce } from '../../../utils/useDebounce';

// SERVICES
import api from '../../../services/api';

// COMPONENTS
import * as Dialog from '@radix-ui/react-dialog';
import HeaderPage from '../../../components/HeaderPage';
import ScrollAreas from '../../../components/Ui/ScrollAreas';
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import { TableDefault } from '../../../components/TableDefault';
import Paginate from '../../../components/Paginate';
import AvatarDefault from '../../../components/Ui/Avatar/avatarDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';

// STYLES
import {
  ContainerDefault,
  ContainerGroupTable,
  ContentDefault,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal,
} from '../../../components/UiElements/styles';

interface UserProps {
  name: string;
  avatar: string;
  function: string;
  function_id: number;
  birthday: string;
  email: string;
  phone: string;
  username: string;
  cost_per_hour: string;
  hiring_date: string;
  tenant_id: number;
  user_id: number;
  password: string;
  confirmPassword: string;
}

interface OfficeProps {
  function: string;
  function_id: number;
}

export default function Team() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [modalUser, setModalUser] = useState(false);
  const [dataModal, setDataModal] = useState({
    text: 'Novo usuário',
    id: 0,
  })
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(0);
  const [isSearching, setSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const [formData, setFormData] = useState<UserProps>({
    name: "",
    avatar: "",
    function: '',
    function_id: 0,
    birthday: "",
    email: "",
    phone: "",
    username: "",
    cost_per_hour: "",
    hiring_date: "",
    tenant_id: 0,
    user_id: 0,
    password: "",
    confirmPassword: "",
  });

  const [selected, setSelected] = useState(1);
  const { data, pages, fetchData } = useFetch<UserProps[]>(`team?page=${selected}&search=${search}`);
  const { data: dataOffice } = useFetch<OfficeProps[]>(`function`);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      setSearch(searchTerm);
      setSearching(false);
    } else {
      setSearch('')
      setSearching(false);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (
    name: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  function handleOnModalEdit(id: number, data: UserProps) {
    setDataModal({
      text: `Alterar usuário: ${data.name}`,
      id
    })
    setFormData(data)
    setModalUser(!modalUser)
  }

  const handleOnToggleModal = (toggle: boolean) => {
    setModalUser(toggle)
    setFormData({
      name: "",
      avatar: "",
      function: '',
      function_id: 0,
      birthday: "",
      email: "",
      phone: "",
      username: "",
      cost_per_hour: "",
      hiring_date: "",
      tenant_id: 0,
      user_id: 0,
      password: "",
      confirmPassword: ""
    } as UserProps)
  }

  const handleOnSubmit = useCallback(async (event: any) => {
    try {
      event.preventDefault();

      // Inserir lógica
      const { hiring_date, birthday } = formData

      const newFormData = {
        ...formData,
        hiring_date: moment(hiring_date).utc().format('YYYY-MM-DD'),
        birthday: moment(birthday).utc().format('YYYY-MM-DD'),
      }

      if(dataModal.text === 'Novo usuário') {
        await api.post('team', newFormData);
      } else {
        await api.put(`team/${formData.user_id}`, newFormData);
      }
  
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Serviço cadastrado com sucesso!',
      });

      setModalUser(false);
      setFormData({
        name: "",
        avatar: "",
        function: "",
        function_id: 0,
        birthday: "",
        email: "",
        phone: "",
        username: "",
        cost_per_hour: "",
        hiring_date: "",
        tenant_id: 0,
        user_id: 0,
        password: "",
        confirmPassword: "",
      } as UserProps);
      fetchData();

    } catch (e: any) {
      // Exibir erro
      addToast({
        type: 'danger',
        title: 'ATENÇÃO',
        description: e.response.data.message,
      });
    }
  }, [formData, dataModal]);

  return (
    <ContainerDefault>
      <HeaderPage title="Equipe">
        <>
          <ButtonDefault typeButton="info" onClick={() => navigate('cargos')}>
            <BiEdit color="#fff" />
            Cargos
          </ButtonDefault>

          <ButtonDefault typeButton="success" onClick={() => setModalUser(!modalUser)}>
            <BiPlus color="#fff" />
            Novo Usuário
          </ButtonDefault>
        </>
      </HeaderPage>

      <ContentDefault style={{ position: 'relative' }}>
        <FieldGroupFormDefault>
          {/* <SelectDefault
            name="filter"
            label="Filtro"
            placeholder="Selecione um cargo"
            onChange={(event) => setFilter(Number(event.target.value))}
          >
            {dataOffice?.map((row) => (
              <option key={row.function_id} value={row.function_id}>
                {row.function}
              </option>
            ))}
          </SelectDefault> */}

          <InputDefault
            label="Busca"
            name="search"
            placeholder="Faça sua busca..."
            onChange={(event) => setSearchTerm(event.target.value)}
            icon={BiSearchAlt}
          />
        </FieldGroupFormDefault>
      </ContentDefault>

      <ContainerGroupTable style={{ marginTop: '1rem' }}>
        <ScrollAreas>
          <TableDefault title="Equipe">
            <thead>
              <tr style={{ whiteSpace: 'nowrap' }}>
                <th>Avatar</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Cargo</th>
                <th>Tarefas na fila</th>
                <th style={{ display: 'grid', placeItems: 'center' }}>-</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((row) => (
                <tr key={row.user_id}>
                  <td style={{ padding: '1rem'}}>
                    <AvatarDefault 
                      url={row.avatar}
                      name={row.name}
                    />
                  </td>
                  <td>{row.name}</td>
                  <td>
                    {row.email}
                  </td>
                  <td>{row.function}</td>
                  <td>{''}</td>
                  <td>
                    <div className="fieldTableClients">
                      <ButtonTable 
                        typeButton='edit'
                        onClick={() => handleOnModalEdit(row.user_id, row)}
                      />
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

      <Dialog.Root open={modalUser} onOpenChange={(open) => handleOnToggleModal(open)}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">{dataModal.text}</Dialog.Title>
            <form onSubmit={handleOnSubmit}>
              <FieldDefault>
                <InputDefault
                  label="Nome do cliente"
                  placeholder="Digite seu nome..."
                  name="name"
                  onChange={(event) => handleInputChange('name', event)}
                  value={formData.name}
                  icon={BiUser}
                />
              </FieldDefault>
              <FieldDefault>
                <InputDefault
                  label="UserName"
                  name="username"
                  onChange={(event) => handleInputChange('username', event)}
                  value={formData.username}
                  required
                  placeholder="Digite seu username..."
                  icon={BiUser}
                />
              </FieldDefault>
              <FieldDefault>
                <InputDefault
                  label="E-mail"
                  name="email"
                  onChange={(event) => handleInputChange('email', event)}
                  value={formData.email}
                  required
                  placeholder="admin@admin.com"
                  icon={BiEnvelope}
                />
              </FieldDefault>

              <FieldDefault>
                <SelectDefault
                  name="function_id"
                  label="Cargo"
                  placeholder="Selecione um cargo"
                  onChange={(event) => handleInputChange('function_id', event)}
                  value={formData.function_id}
                >
                  {dataOffice?.map((row) => (
                    <option key={row.function_id} value={row.function_id}>
                      {row.function}
                    </option>
                  ))}
                </SelectDefault>
              </FieldDefault>
              <FieldGroupFormDefault>
                <FieldDefault>
                  <InputDefault
                    label="Data nascimento"
                    name="birthday"
                    onChange={(event) => handleInputChange('birthday', event)}
                    value={formData.birthday}
                    required
                    type='date'
                    icon={BiCalendar}
                  />
                </FieldDefault>
                <FieldDefault>
                  <InputDefault
                    label="Data contratação"
                    name="hiring_date"
                    onChange={(event) => handleInputChange('hiring_date', event)}
                    value={formData.hiring_date}
                    required
                    type='date'
                    icon={BiCalendar}
                  />
                </FieldDefault>
              </FieldGroupFormDefault>
              <FieldGroupFormDefault>
                <FieldDefault>
                  <InputDefault
                    label="Telefone"
                    name="phone"
                    onChange={(event) => handleInputChange('phone', event)}
                    value={formData.phone}
                    required
                    placeholder='99 9999-9999'
                    icon={BiPhoneCall}
                  />
                </FieldDefault>
                <FieldDefault>
                  <InputDefault
                    label="Custo por hora"
                    name="cost_per_hour"
                    placeholder='Ex: 10.00'
                    onChange={(event) => handleInputChange('cost_per_hour', event)}
                    value={formData.cost_per_hour}
                    required
                    icon={BiMoney}
                  />
                </FieldDefault>
              </FieldGroupFormDefault>

              <FieldGroupFormDefault>
                <FieldDefault>
                  <InputDefault
                    label="Senha"
                    name="password"
                    onChange={(event) => handleInputChange('password', event)}
                    value={formData.password ?? ""}
                    type='password'
                    placeholder='xxxxxxx'
                    icon={BiKey}
                  />
                </FieldDefault>
                <FieldDefault>
                  <InputDefault
                    label="Confirme senha"
                    name="confirmPassword"
                    onChange={(event) => handleInputChange('confirmPassword', event)}
                    value={formData.confirmPassword ?? ""}
                    type='password'
                    placeholder='xxxxxxx'
                    icon={BiKey}
                  />
                </FieldDefault>
              </FieldGroupFormDefault>

              <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
                <ButtonDefault
                  typeButton="dark"
                  isOutline
                  onClick={() => handleOnToggleModal(!modalUser)}
                >
                  Descartar
                </ButtonDefault>
                <ButtonDefault typeButton="primary" isOutline type="submit">
                  Salvar
                </ButtonDefault>
              </FooterModal>
            </form>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <BiX size={30} color="#6C757D" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ContainerDefault>
  );
}
