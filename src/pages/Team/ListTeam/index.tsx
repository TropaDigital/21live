/* eslint-disable import-helpers/order-imports */
// React
import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import {
  BiCalendar,
  BiEdit,
  BiEnvelope,
  BiFilter,
  BiKey,
  BiMoney,
  BiPhoneCall,
  BiPlus,
  BiSearchAlt,
  BiTrash,
  BiUser,
  BiX
} from 'react-icons/bi';

// Services
import api from '../../../services/api';

// Hooks
import { useToast } from '../../../hooks/toast';
import useDebouncedCallback from '../../../hooks/useDebounced';
import { useFetch } from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';

// Components
import ButtonDefault from '../../../components/Buttons/ButtonDefault';
import ButtonTable from '../../../components/Buttons/ButtonTable';
import HeaderPage from '../../../components/HeaderPage';
import { InputDefault } from '../../../components/Inputs/InputDefault';
import { SelectDefault } from '../../../components/Inputs/SelectDefault';
import Alert from '../../../components/Ui/Alert';
import AvatarDefault from '../../../components/Ui/Avatar/avatarDefault';
import ModalDefault from '../../../components/Ui/ModalDefault';
import {
  ContainerDefault,
  // ContainerGroupTable,
  FieldDefault,
  FieldGroupFormDefault,
  FooterModal,
  SectionDefault
} from '../../../components/UiElements/styles';
import { Table } from '../../../components/Table';
import { TableHead } from '../../../components/Table/styles';
import Pagination from '../../../components/Pagination';
import { CheckboxDefault } from '../../../components/Inputs/CheckboxDefault';
import Loader from '../../../components/LoaderSpin';

// Libraries
import moment from 'moment';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

// Styles
import {
  BreakName,
  CardHours,
  CardTitleCheck,
  CardWorkPause,
  CardsWrapper,
  ChangeNameField,
  DivHour,
  FilterTeamWrapper,
  ModalButtons,
  ModalSubtitle,
  ModalWrapper,
  SelectedTab,
  TabsWrapper
} from './styles';
import FilterModal from '../../../components/Ui/FilterModal';

interface UserProps {
  avatar: string;
  birthday: string;
  cost_per_hour: string;
  email: string;
  friday?: any;
  function: string;
  function_id: number;
  hiring_date: string;
  monday?: any;
  name: string;
  phone: string;
  saturday?: any;
  sunday?: any;
  tasks: number;
  tenant_id: number;
  thursday?: any;
  tuesday?: any;
  user_id: number;
  username: string;
  wednesday?: any;
  journey?: string;
  password: string;
  confirmPassword: string;
}

export interface OfficeProps {
  function: string;
  function_id: number;
}

interface BreaksProps {
  id: any;
  name: string;
  end_pause: any;
  start_pause: any;
}

export default function Team() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { formData, setData, handleOnChange } = useForm({
    name: '',
    avatar: '',
    function: '',
    function_id: 0,
    birthday: '',
    email: '',
    phone: '',
    username: '',
    cost_per_hour: '',
    hiring_date: '',
    tenant_id: 0,
    user_id: 0,
    password: '',
    confirmPassword: ''
  } as UserProps);
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'Novo Usuário'
  });
  const [filter, setFilter] = useState({
    role: ''
  });
  const weekdays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const [modalWorkDays, setModalWorkDays] = useState({
    isOpen: false,
    title: 'Carga horária',
    user: ''
  });
  const [selected, setSelected] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const { isLoading, debouncedCallback } = useDebouncedCallback(
    (search: string) => setSearch(search),
    700
  );
  const { data, pages, fetchData, isFetching } = useFetch<UserProps[]>(
    `team?page=${selected}&search=${search.replace('#', '')}&perPage=15&filter=${filter.role}`
  );
  const { data: dataOffice } = useFetch<OfficeProps[]>(`function`);
  const [selectedTab, setSelectedTab] = useState<string>('Jornada');
  const [workDays, setWorkDays] = useState<any[]>([]);
  const [selectedBreaks, setSelectedBreaks] = useState<any[]>([]);
  const [selectedBreakDay, setSelectedBreakDay] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [changeBreakName, setChangeBreakName] = useState<string>('');
  const [modalFilters, setModalFilters] = useState<boolean>(false);

  const handleOnCancel = useCallback(() => {
    setModal({
      isOpen: false,
      type: 'Novo serviço'
    });
    setData({
      name: '',
      avatar: '',
      function: '',
      function_id: 0,
      birthday: '',
      email: '',
      phone: '',
      username: '',
      cost_per_hour: '',
      hiring_date: '',
      tenant_id: 0,
      user_id: 0,
      password: '',
      confirmPassword: ''
    } as UserProps);
  }, [setData]);

  const handleOnEdit = (item: UserProps) => {
    setData(item);

    setModal({
      isOpen: true,
      type: `Alterar usuário: ${item.name}`
    });
  };

  const handleOnDelete = async (id: any) => {
    try {
      await api.delete(`team/${id}`);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Equipe foi deletada!'
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

  const handleOnSubmit = useCallback(
    async (event: any) => {
      try {
        event.preventDefault();

        // Inserir lógica
        const { hiring_date, birthday } = formData;
        if (formData.journey === '') {
          delete formData.journey;
        }

        const newFormData = {
          ...formData,
          hiring_date: moment(hiring_date).utc().format('YYYY-MM-DD'),
          birthday: moment(birthday).utc().format('YYYY-MM-DD')
        };

        if (modal.type === 'Novo Usuário') {
          await api.post('team', newFormData);
        } else {
          await api.put(`team/${formData.user_id}`, newFormData);
        }

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Serviço cadastrado com sucesso!'
        });
        handleOnCancel();
        fetchData();
      } catch (e: any) {
        // Exibir erro
        addToast({
          type: 'danger',
          title: 'ATENÇÃO',
          description: e.response.data.message
        });
      }
    },
    [formData, addToast, fetchData, handleOnCancel, modal]
  );

  const handleEditWorkload = (userInfos: any) => {
    const workdaysArray: any = [];

    weekdays.forEach((day) => {
      const workingHours = userInfos[day];

      workdaysArray.push({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        start_work: workingHours.start_work,
        end_work: workingHours.end_work,
        pause: workingHours.pause
      });
    });

    setWorkDays(workdaysArray);

    setModalWorkDays({
      isOpen: true,
      title: 'Carga horária',
      user: userInfos.user_id
    });
  };

  const handleCheckDay = (value: any) => {
    if (value.start_work === undefined) {
      const newValue = {
        day: value.day,
        start_work: '00:00',
        end_work: '00:00',
        pause: value.pause ? value.pause : []
      };
      setWorkDays((prevState) =>
        prevState.map((obj) => {
          if (obj.day === value.day) {
            return {
              ...obj,
              start_work: newValue.start_work,
              end_work: newValue.end_work,
              pause: newValue.pause
            };
          }
          return obj;
        })
      );
    } else {
      setWorkDays((prevState) =>
        prevState.map((obj) => {
          if (obj.day === value.day) {
            return {
              ...obj,
              start_work: undefined,
              end_work: undefined,
              pause: undefined
            };
          }
          return obj;
        })
      );
    }
  };

  const handleChangeHours = (dayName: string, type: string, value: any) => {
    console.log('log do change Hours', dayName, type, value);

    if (type === 'start') {
      setWorkDays((prevState) =>
        prevState.map((obj) => {
          if (obj.day === dayName) {
            return {
              ...obj,
              start_work: value
            };
          }
          return obj;
        })
      );
    }

    if (type === 'end') {
      setWorkDays((prevState) =>
        prevState.map((obj) => {
          if (obj.day === dayName) {
            return {
              ...obj,
              end_work: value
            };
          }
          return obj;
        })
      );
    }
  };

  const handleSelectedBreakDay = (dayIndex: any) => {
    const breaks: any[] = [];

    if (workDays[dayIndex].start_work !== undefined) {
      setSelectedBreakDay(dayIndex);

      workDays[dayIndex]?.pause?.forEach((obj: any) => {
        breaks.push({
          id: breaks.length + 1,
          name: obj.name,
          end_pause: obj.end_pause,
          start_pause: obj.start_pause
        });
      });
    } else {
      addToast({
        type: 'warning',
        title: 'Aviso!',
        description: 'Dia não selecionado na jornada, não possível adicionar pausa'
      });

      //   setSelectedTab('Jornada');
    }

    setSelectedBreaks(breaks);
  };

  const addNewBreak = () => {
    const newBreak = {
      id: selectedBreaks.length + 1,
      name: '',
      end_pause: '00:00:00',
      start_pause: '00:00:00'
    };

    setSelectedBreaks((selectedBreaks) => [...selectedBreaks, newBreak]);
  };

  const deleteBreak = (breakId: any) => {
    setSelectedBreaks((prevState) => prevState.filter((obj) => obj.id !== breakId));
  };

  const handleTimeChange = (timeId: number, field: string, value: any) => {
    setSelectedBreaks((prevState) =>
      prevState.map((obj) => {
        if (obj.id === timeId) {
          return { ...obj, [field]: value };
        }
        return obj;
      })
    );
  };

  const handleNameChange = (timeId: number, field: string, value: any) => {
    console.log('log do changeName', timeId, field, value);
    setSelectedBreaks((prevState) =>
      prevState.map((obj) => {
        if (obj.id === timeId) {
          return { ...obj, [field]: value };
        }
        return obj;
      })
    );
  };

  function transformState(initialState: any) {
    const day = initialState.day.toLowerCase();
    const transformedState: any = {};

    transformedState[day] = {
      start_work: initialState.start_work,
      end_work: initialState.end_work,
      pause: []
    };

    for (let i = 0; i < selectedBreaks.length; i++) {
      transformedState[day].pause.push({
        start_pause: selectedBreaks[i].start_pause,
        end_pause: selectedBreaks[i].end_pause,
        name: selectedBreaks[i].name
      });
    }

    // console.log('log do transformedState', transformedState);
    return transformedState;
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const selectedWorkDay = workDays[Number(selectedBreakDay)];

      const updateTeam = transformState(selectedWorkDay);

      console.log('log do updateTeam', updateTeam);

      const response = await api.put(`/team/${modalWorkDays.user}`, updateTeam);
      console.log('log do response', response.data);

      if (response.data.status === 'success') {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Pausas salvas com sucesso!'
        });

        setModalWorkDays({
          isOpen: false,
          title: 'Carga horária',
          user: ''
        });

        setSelectedBreaks([]);
        setWorkDays([]);
        setSelectedBreakDay('');
        setSelectedTab('Jornada');
        fetchData();
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log do erro', error);
      setLoading(false);
    }
  }

  async function handleSubmitWorkDays() {
    try {
      setLoading(true);

      const outputObject: any = {};

      for (let i = 0; i < workDays.length; i++) {
        const currentDay = workDays[i];
        // const nextDay = workDays[i + 1];

        if (currentDay.day && currentDay.start_work !== undefined) {
          const dayName = currentDay.day.toLowerCase();
          outputObject[dayName] = {
            start_work: currentDay.start_work,
            end_work: currentDay.end_work,
            pause: currentDay.pause !== undefined ? currentDay.pause : []
          };

          // if (nextDay && nextDay.day) {
          //   addPause(outputObject[dayName], nextDay.start_work, nextDay.end_work);
          // }
        }

        if (currentDay.day && currentDay.start_work === undefined) {
          const dayName = currentDay.day.toLowerCase();
          outputObject[dayName] = {};
        }
      }

      // console.log('log do object', outputObject);

      const response = await api.put(`/team/${modalWorkDays.user}`, outputObject);
      console.log('log do response', response.data);
      if (response.data.status === 'success') {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Carga horária salva com sucesso!'
        });

        setModalWorkDays({
          isOpen: false,
          title: 'Carga horária',
          user: ''
        });

        setSelectedBreaks([]);
        setWorkDays([]);
        setSelectedBreakDay('');
        setSelectedTab('Jornada');
        fetchData();
      }

      setLoading(false);
    } catch (error: any) {
      console.log('log do erro', error);
      setLoading(false);
    }
  }

  const handleOnCancelWorkload = () => {
    setModalWorkDays({
      isOpen: false,
      title: '',
      user: ''
    });
    setSelectedBreaks([]);
    setWorkDays([]);
    setSelectedBreakDay('');
    setSelectedTab('Jornada');
  };

  const handleApplyFilters = (filters: any) => {
    setFilter(filters);
    setModalFilters(false);
  };

  const handleClearFilters = () => {
    setFilter({
      role: ''
    });
    setModalFilters(false);
  };

  // useEffect(() => {
  //   console.log('log das pausas', selectedBreaks);
  //   console.log('log dos workdays', workDays);
  //   console.log('log do dia selecionado', selectedBreakDay);
  // }, [selectedBreaks, workDays, selectedBreakDay]);

  return (
    <ContainerDefault>
      <HeaderPage title="Equipe">
        <>
          <ButtonDefault typeButton="info" onClick={() => navigate('cargos')}>
            <BiEdit color="#fff" />
            Cargos
          </ButtonDefault>

          {/* <ButtonDefault
            typeButton="success"
            onClick={() =>
              setModal({
                isOpen: !modal.isOpen,
                type: 'Novo serviço'
              })
            }
          >
            <BiPlus color="#fff" />
            Novo Usuário
          </ButtonDefault> */}
        </>
      </HeaderPage>

      {isFetching && <Loader />}

      {!isFetching && (
        <SectionDefault>
          {/* <ContentDefault>
            <FieldGroupFormDefault>
              <SelectDefault
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
              </SelectDefault>

              <InputDefault
                label=""
                name="search"
                placeholder="Buscar..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  debouncedCallback(event.target.value);
                }}
                value={searchTerm}
                icon={BiSearchAlt}
                isLoading={isLoading}
              />
            </FieldGroupFormDefault>
          </ContentDefault> */}

          <div style={{ margin: '-24px -30px' }}>
            <Table>
              <TableHead>
                <div className="groupTable">
                  <h2>Equipes</h2>
                </div>

                <FilterTeamWrapper>
                  <InputDefault
                    label=""
                    name="search"
                    placeholder="Buscar..."
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      debouncedCallback(event.target.value);
                    }}
                    value={searchTerm}
                    icon={BiSearchAlt}
                    isLoading={isLoading}
                  />

                  <ButtonDefault typeButton="danger" isOutline onClick={handleClearFilters}>
                    <div className="close-icon">
                      <BiX size={30} />
                    </div>
                    Limpar filtros
                  </ButtonDefault>

                  <ButtonDefault
                    typeButton="lightWhite"
                    isOutline
                    onClick={() => setModalFilters(true)}
                  >
                    <BiFilter />
                    Filtros
                  </ButtonDefault>
                </FilterTeamWrapper>
              </TableHead>
              <table>
                <thead>
                  <tr style={{ whiteSpace: 'nowrap' }}>
                    <th>Avatar</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Cargo</th>
                    <th>Jornada</th>
                    <th style={{ display: 'grid', placeItems: 'center', color: '#F9FAFB' }}>-</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((row) => (
                    <tr key={row.user_id}>
                      <td style={{ padding: '1rem' }}>
                        <AvatarDefault url={row.avatar} name={row.name} />
                      </td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.function}</td>
                      <td>
                        {row.journey
                          ? `${row.journey.split(':')[0]}h${row.journey.split(':')[1]}`
                          : ''}
                      </td>
                      <td>
                        <div className="fieldTableClients">
                          <ButtonTable typeButton="edit" onClick={() => handleOnEdit(row)} />
                          <ButtonTable typeButton="work" onClick={() => handleEditWorkload(row)} />
                          <Alert
                            title="Atenção"
                            subtitle="Certeza que gostaria de deletar esta Equipe? Ao excluir a acão não poderá ser desfeita."
                            confirmButton={() => handleOnDelete(row.function_id)}
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
          </div>
        </SectionDefault>
      )}

      {/* Modal edit user */}
      <ModalDefault isOpen={modal.isOpen} title={modal.type} onOpenChange={handleOnCancel}>
        <form onSubmit={handleOnSubmit}>
          <FieldDefault>
            <InputDefault
              label="Nome do usuário"
              placeholder="Digite seu nome..."
              name="name"
              onChange={handleOnChange}
              value={formData.name}
              icon={BiUser}
            />
          </FieldDefault>
          <FieldDefault>
            <InputDefault
              label="UserName (utilizado para logar na plataforma)"
              name="username"
              onChange={handleOnChange}
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
              onChange={handleOnChange}
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
              onChange={handleOnChange}
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
                onChange={handleOnChange}
                value={formData.birthday}
                required
                type="date"
                max={'9999-12-31'}
                icon={BiCalendar}
              />
            </FieldDefault>
            <FieldDefault>
              <InputDefault
                label="Data contratação"
                name="hiring_date"
                onChange={handleOnChange}
                value={formData.hiring_date}
                required
                type="date"
                max={'9999-12-31'}
                icon={BiCalendar}
              />
            </FieldDefault>
          </FieldGroupFormDefault>
          <FieldGroupFormDefault>
            <FieldDefault>
              <InputDefault
                label="Telefone"
                name="phone"
                onChange={handleOnChange}
                value={formData.phone}
                required
                placeholder="99 9999-9999"
                icon={BiPhoneCall}
              />
            </FieldDefault>
            <FieldDefault>
              <InputDefault
                label="Custo por hora"
                name="cost_per_hour"
                placeholder="Ex: 10.00"
                onChange={handleOnChange}
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
                onChange={handleOnChange}
                value={formData.password ?? ''}
                type="password"
                placeholder="xxxxxxx"
                icon={BiKey}
              />
            </FieldDefault>
            <FieldDefault>
              <InputDefault
                label="Confirme senha"
                name="confirmPassword"
                onChange={handleOnChange}
                value={formData.confirmPassword ?? ''}
                type="password"
                placeholder="xxxxxxx"
                icon={BiKey}
              />
            </FieldDefault>
          </FieldGroupFormDefault>

          <FooterModal style={{ justifyContent: 'flex-end', gap: '16px' }}>
            <ButtonDefault typeButton="dark" isOutline onClick={handleOnCancel}>
              Descartar
            </ButtonDefault>
            <ButtonDefault typeButton="primary" isOutline type="submit">
              Salvar
            </ButtonDefault>
          </FooterModal>
        </form>
      </ModalDefault>

      {/* Modal weekly workload */}
      <ModalDefault
        isOpen={modalWorkDays.isOpen}
        title={modalWorkDays.title}
        onOpenChange={() => {
          setModalWorkDays({
            isOpen: false,
            title: '',
            user: ''
          });
          setSelectedBreaks([]);
          setWorkDays([]);
          setSelectedBreakDay('');
          setSelectedTab('Jornada');
        }}
      >
        <ModalWrapper>
          <ModalSubtitle>
            Defina a agenda do usuário, escolha os dias e quantidade de horas que o usuário irá
            trabalhar
          </ModalSubtitle>

          <TabsWrapper>
            <SelectedTab
              onClick={(e: any) => {
                setSelectedTab(e.target.innerText);
              }}
              className={selectedTab === 'Jornada' ? 'active' : ''}
            >
              Jornada
            </SelectedTab>
            <SelectedTab
              onClick={(e: any) => {
                setSelectedTab(e.target.innerText);
              }}
              className={selectedTab === 'Pausas' ? 'active' : ''}
            >
              Pausas
            </SelectedTab>
          </TabsWrapper>

          <CardsWrapper>
            {selectedTab === 'Jornada' && (
              <>
                <CardWorkPause className={workDays[0]?.start_work !== undefined ? 'selected' : ''}>
                  <CardTitleCheck>
                    Domingo
                    <CheckboxDefault
                      label=""
                      name="day_selected"
                      onChange={() => handleCheckDay(workDays[0])}
                      checked={workDays[0]?.start_work !== undefined ? true : false}
                    />
                  </CardTitleCheck>

                  <CardHours>
                    <DivHour>
                      Início
                      <TimePicker
                        onChange={(value) => handleChangeHours('Sunday', 'start', value)}
                        value={workDays[0]?.start_work ? workDays[0]?.start_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[0]?.start_work === undefined ? true : false}
                      />
                    </DivHour>

                    <DivHour>
                      Fim
                      <TimePicker
                        onChange={(value) => handleChangeHours('Sunday', 'end', value)}
                        value={workDays[0]?.end_work ? workDays[0]?.end_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[0]?.start_work === undefined ? true : false}
                      />
                    </DivHour>
                  </CardHours>
                </CardWorkPause>

                <CardWorkPause className={workDays[1]?.start_work !== undefined ? 'selected' : ''}>
                  <CardTitleCheck>
                    Segunda-feira
                    <CheckboxDefault
                      label=""
                      name="day_selected"
                      onChange={() => handleCheckDay(workDays[1])}
                      checked={workDays[1]?.start_work !== undefined ? true : false}
                    />
                  </CardTitleCheck>

                  <CardHours>
                    <DivHour>
                      Início
                      <TimePicker
                        onChange={(value) => handleChangeHours('Monday', 'start', value)}
                        value={workDays[1]?.start_work ? workDays[1]?.start_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[1]?.start_work === undefined ? true : false}
                      />
                    </DivHour>

                    <DivHour>
                      Fim
                      <TimePicker
                        onChange={(value) => handleChangeHours('Monday', 'end', value)}
                        value={workDays[1]?.end_work ? workDays[1]?.end_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[1]?.start_work === undefined ? true : false}
                      />
                    </DivHour>
                  </CardHours>
                </CardWorkPause>

                <CardWorkPause className={workDays[2]?.start_work !== undefined ? 'selected' : ''}>
                  <CardTitleCheck>
                    Terça-feira
                    <CheckboxDefault
                      label=""
                      name="day_selected"
                      onChange={() => handleCheckDay(workDays[2])}
                      checked={workDays[2]?.start_work !== undefined ? true : false}
                    />
                  </CardTitleCheck>

                  <CardHours>
                    <DivHour>
                      Início
                      <TimePicker
                        onChange={(value) => handleChangeHours('Tuesday', 'start', value)}
                        value={workDays[2]?.start_work ? workDays[2]?.start_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[2]?.start_work === undefined ? true : false}
                      />
                    </DivHour>

                    <DivHour>
                      Fim
                      <TimePicker
                        onChange={(value) => handleChangeHours('Tuesday', 'end', value)}
                        value={workDays[2]?.end_work ? workDays[2]?.end_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[2]?.start_work === undefined ? true : false}
                      />
                    </DivHour>
                  </CardHours>
                </CardWorkPause>

                <CardWorkPause className={workDays[3]?.start_work !== undefined ? 'selected' : ''}>
                  <CardTitleCheck>
                    Quarta-feira
                    <CheckboxDefault
                      label=""
                      name="day_selected"
                      onChange={() => handleCheckDay(workDays[3])}
                      checked={workDays[3]?.start_work !== undefined ? true : false}
                    />
                  </CardTitleCheck>

                  <CardHours>
                    <DivHour>
                      Início
                      <TimePicker
                        onChange={(value) => handleChangeHours('Wednesday', 'start', value)}
                        value={workDays[3]?.start_work ? workDays[3]?.start_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[3]?.start_work === undefined ? true : false}
                      />
                    </DivHour>

                    <DivHour>
                      Fim
                      <TimePicker
                        onChange={(value) => handleChangeHours('Wednesday', 'end', value)}
                        value={workDays[3]?.end_work ? workDays[3]?.end_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[3]?.start_work === undefined ? true : false}
                      />
                    </DivHour>
                  </CardHours>
                </CardWorkPause>

                <CardWorkPause className={workDays[4]?.start_work !== undefined ? 'selected' : ''}>
                  <CardTitleCheck>
                    Quinta-feira
                    <CheckboxDefault
                      label=""
                      name="day_selected"
                      onChange={() => handleCheckDay(workDays[4])}
                      checked={workDays[4]?.start_work !== undefined ? true : false}
                    />
                  </CardTitleCheck>

                  <CardHours>
                    <DivHour>
                      Início
                      <TimePicker
                        onChange={(value) => handleChangeHours('Thursday', 'start', value)}
                        value={workDays[4]?.start_work ? workDays[4]?.start_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[4]?.start_work === undefined ? true : false}
                      />
                    </DivHour>

                    <DivHour>
                      Fim
                      <TimePicker
                        onChange={(value) => handleChangeHours('Thursday', 'end', value)}
                        value={workDays[4]?.end_work ? workDays[4]?.end_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[4]?.start_work === undefined ? true : false}
                      />
                    </DivHour>
                  </CardHours>
                </CardWorkPause>

                <CardWorkPause className={workDays[5]?.start_work !== undefined ? 'selected' : ''}>
                  <CardTitleCheck>
                    Sexta-feira
                    <CheckboxDefault
                      label=""
                      name="day_selected"
                      onChange={() => handleCheckDay(workDays[5])}
                      checked={workDays[5]?.start_work !== undefined ? true : false}
                    />
                  </CardTitleCheck>

                  <CardHours>
                    <DivHour>
                      Início
                      <TimePicker
                        onChange={(value) => handleChangeHours('Friday', 'start', value)}
                        value={workDays[5]?.start_work ? workDays[5]?.start_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[5]?.start_work === undefined ? true : false}
                      />
                    </DivHour>

                    <DivHour>
                      Fim
                      <TimePicker
                        onChange={(value) => handleChangeHours('Friday', 'end', value)}
                        value={workDays[5]?.end_work ? workDays[5]?.end_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[5]?.start_work === undefined ? true : false}
                      />
                    </DivHour>
                  </CardHours>
                </CardWorkPause>

                <CardWorkPause className={workDays[6]?.start_work !== undefined ? 'selected' : ''}>
                  <CardTitleCheck>
                    Sabado
                    <CheckboxDefault
                      label=""
                      name="day_selected"
                      onChange={() => handleCheckDay(workDays[6])}
                      checked={workDays[6]?.start_work !== undefined ? true : false}
                    />
                  </CardTitleCheck>

                  <CardHours>
                    <DivHour>
                      Início
                      <TimePicker
                        onChange={(value) => handleChangeHours('Saturday', 'start', value)}
                        value={workDays[6]?.start_work ? workDays[6]?.start_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[6]?.start_work === undefined ? true : false}
                      />
                    </DivHour>

                    <DivHour>
                      Fim
                      <TimePicker
                        onChange={(value) => handleChangeHours('Saturday', 'end', value)}
                        value={workDays[6]?.end_work ? workDays[6]?.end_work : '00:00'}
                        clearIcon={null}
                        clockIcon={null}
                        locale="pt-BR"
                        disableClock={true}
                        maxDetail="minute"
                        disabled={workDays[6]?.start_work === undefined ? true : false}
                      />
                    </DivHour>
                  </CardHours>
                </CardWorkPause>
              </>
            )}

            {selectedTab === 'Pausas' && (
              <>
                <SelectDefault
                  label="Dia"
                  name="tenant_id"
                  placeHolder="Selecione"
                  onChange={(e) => handleSelectedBreakDay(e.target.value)}
                  value={selectedBreakDay}
                  alert="Para qual dia deseja criar as pausas?"
                >
                  {workDays?.map((row, index: number) => (
                    <option key={index} value={index}>
                      {row.day === 'Sunday'
                        ? 'Domingo'
                        : row.day === 'Monday'
                        ? 'Segunda-feira'
                        : row.day === 'Tuesday'
                        ? 'Terça-feira'
                        : row.day === 'Wednesday'
                        ? 'Quarta-feira'
                        : row.day === 'Thursday'
                        ? 'Quinta-feira'
                        : row.day === 'Friday'
                        ? 'Sexta-feira'
                        : row.day === 'Saturday'
                        ? 'Sábado'
                        : ''}
                    </option>
                  ))}
                </SelectDefault>

                {selectedBreaks &&
                  selectedBreaks?.map((row: BreaksProps, index: number) => (
                    <CardWorkPause key={index}>
                      <CardTitleCheck>
                        <BreakName
                          onClick={() => setChangeBreakName(changeBreakName === '' ? row.id : '')}
                        >
                          {changeBreakName !== row.id &&
                            (row.name !== '' ? row.name : `Pausa ${index + 1}`)}
                        </BreakName>
                        {changeBreakName === row.id && (
                          <ChangeNameField>
                            <InputDefault
                              label=""
                              placeholder="Digite o nome da pausa"
                              name="name"
                              onChange={(e) => handleNameChange(row.id, 'name', e.target.value)}
                              value={row.name}
                            />
                            <ButtonDefault
                              onClick={() => setChangeBreakName('')}
                              typeButton="secondary"
                            >
                              OK
                            </ButtonDefault>
                          </ChangeNameField>
                        )}
                        <div className="trash-icon" onClick={() => deleteBreak(row.id)}>
                          <BiTrash />
                        </div>
                      </CardTitleCheck>

                      <CardHours>
                        <DivHour>
                          Início
                          <TimePicker
                            onChange={(value: any) =>
                              handleTimeChange(row.id, 'start_pause', value)
                            }
                            // onChange={() => ''}
                            value={row?.start_pause}
                            clearIcon={null}
                            clockIcon={null}
                            locale="pt-BR"
                            disableClock={true}
                            maxDetail="minute"
                          />
                        </DivHour>

                        <DivHour>
                          Fim
                          <TimePicker
                            onChange={(value: any) => handleTimeChange(row.id, 'end_pause', value)}
                            value={row?.end_pause}
                            clearIcon={null}
                            clockIcon={null}
                            locale="pt-BR"
                            disableClock={true}
                            maxDetail="minute"
                          />
                        </DivHour>
                      </CardHours>
                    </CardWorkPause>
                  ))}

                {selectedBreakDay.length > 0 && (
                  <ButtonDefault typeButton="lightWhite" isOutline onClick={addNewBreak}>
                    <BiPlus />
                    Adicionar Pausa
                  </ButtonDefault>
                )}
              </>
            )}
          </CardsWrapper>

          {selectedTab === 'Jornada' && (
            <ModalButtons>
              <ButtonDefault typeButton="lightWhite" isOutline onClick={handleOnCancelWorkload}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={handleSubmitWorkDays}>
                Salvar
              </ButtonDefault>
            </ModalButtons>
          )}

          {selectedTab === 'Pausas' && (
            <ModalButtons>
              <ButtonDefault typeButton="lightWhite" isOutline onClick={handleOnCancelWorkload}>
                Cancelar
              </ButtonDefault>
              <ButtonDefault typeButton="primary" onClick={handleSubmit}>
                Salvar
              </ButtonDefault>
            </ModalButtons>
          )}
        </ModalWrapper>
      </ModalDefault>

      {/* Modal filters */}
      <FilterModal
        isOpen={modalFilters}
        closeBtn={true}
        onOpenChange={() => setModalFilters(!modalFilters)}
        applyFilters={handleApplyFilters}
        clearFilters={handleClearFilters}
        filterType="team"
      />
    </ContainerDefault>
  );
}
